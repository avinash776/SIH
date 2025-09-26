import logging
from typing import Dict, List, Optional, Tuple
from pathlib import Path
import tempfile
import os
import io
from config import settings

logger = logging.getLogger(__name__)

class WhisperService:
    def __init__(self):
        self.model = None
        self.device = "cpu"  # Default to CPU
        self.model_size = settings.WHISPER_MODEL
    
    def load_model(self):
        """Load Whisper model (lazy loading)"""
        try:
            import whisper
            import torch
            
            logger.info(f"Loading Whisper {self.model_size} model...")
            self.device = "cuda" if torch.cuda.is_available() else "cpu"
            self.model = whisper.load_model(self.model_size, device=self.device)
            logger.info(f"Whisper model loaded successfully on {self.device}")
        except Exception as e:
            logger.error(f"Failed to load Whisper model: {e}")
            self.model = None
    
    def preprocess_audio(self, audio_data: bytes, target_sample_rate: int = 16000):
        """
        Preprocess audio data for Whisper
        
        Args:
            audio_data: Raw audio bytes
            target_sample_rate: Target sample rate for Whisper (16kHz)
            
        Returns:
            Preprocessed audio array
        """
        try:
            import numpy as np
            from pydub import AudioSegment
            
            # Convert bytes to audio segment
            audio = AudioSegment.from_file(io.BytesIO(audio_data))
            
            # Convert to mono and resample
            audio = audio.set_channels(1).set_frame_rate(target_sample_rate)
            
            # Convert to numpy array
            audio_array = np.array(audio.get_array_of_samples(), dtype=np.float32)
            audio_array = audio_array / np.iinfo(audio.array_type).max  # Normalize
            
            return audio_array
            
        except Exception as e:
            logger.error(f"Audio preprocessing error: {e}")
            raise e
    
    def transcribe(self, audio_data: bytes, language: str = None) -> Dict:
        """
        Transcribe audio to text using Whisper
        
        Args:
            audio_data: Raw audio bytes
            language: Language hint for transcription
            
        Returns:
            Dictionary with transcription results
        """
        try:
            # Load model if not already loaded
            if not self.model:
                self.load_model()
            
            # If model still not available, return mock transcription
            if not self.model:
                logger.warning("Whisper model not available, returning mock transcription")
                return {
                    "text": "[MOCK TRANSCRIPTION] This is a placeholder transcription result.",
                    "language": language or "en",
                    "segments": [
                        {
                            "start": 0.0,
                            "end": 1.0,
                            "text": "[MOCK TRANSCRIPTION] This is a placeholder transcription result."
                        }
                    ],
                    "confidence": 0.5
                }
            
            # Preprocess audio
            audio_array = self.preprocess_audio(audio_data)
            
            # Transcribe
            result = self.model.transcribe(
                audio_array,
                language=language,
                fp16=False if self.device == "cpu" else True,
                verbose=False
            )
            
            return {
                "text": result["text"].strip(),
                "language": result["language"],
                "segments": [
                    {
                        "start": seg["start"],
                        "end": seg["end"],
                        "text": seg["text"].strip()
                    }
                    for seg in result["segments"]
                ],
                "confidence": self._calculate_confidence(result)
            }
            
        except Exception as e:
            logger.error(f"Transcription error: {e}")
            return {
                "text": "[ERROR] Could not transcribe audio",
                "language": "unknown",
                "segments": [],
                "confidence": 0.0,
                "error": str(e)
            }
    
    def _calculate_confidence(self, result: Dict) -> float:
        """Calculate average confidence from segments"""
        if "segments" not in result or not result["segments"]:
            return 0.0
        
        try:
            import numpy as np
            confidences = []
            for segment in result["segments"]:
                if "avg_logprob" in segment:
                    # Convert log probability to confidence score
                    confidence = np.exp(segment["avg_logprob"])
                    confidences.append(confidence)
            
            return float(np.mean(confidences)) if confidences else 0.0
        except Exception:
            return 0.5  # Default confidence

class TTSService:
    def __init__(self):
        self.cache_dir = Path(settings.TTS_CACHE_DIR)
        self.cache_dir.mkdir(parents=True, exist_ok=True)
        
        # Language mapping for gTTS
        self.language_mapping = {
            "en": "en",
            "hi": "hi",
            "bn": "bn", 
            "te": "te",
            "ta": "ta",
            "mr": "mr",
            "gu": "gu",
            "ml": "ml",
            "kn": "kn",
            "pa": "pa",
            "ur": "ur"
        }
    
    def generate_speech(self, text: str, language: str = "en", slow: bool = False) -> bytes:
        """
        Generate speech from text using gTTS
        
        Args:
            text: Text to convert to speech
            language: Language code
            slow: Whether to generate slow speech
            
        Returns:
            Audio bytes (MP3 format)
        """
        try:
            from gtts import gTTS
            
            # Check if language is supported
            if language not in self.language_mapping:
                language = "en"  # Fallback to English
            
            # Generate cache key
            cache_key = f"{hash(text)}_{language}_{slow}.mp3"
            cache_path = self.cache_dir / cache_key
            
            # Check cache
            if cache_path.exists():
                logger.info(f"Loading TTS from cache: {cache_key}")
                return cache_path.read_bytes()
            
            # Generate speech
            tts = gTTS(
                text=text,
                lang=self.language_mapping[language],
                slow=slow
            )
            
            # Save to temporary file first
            with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as tmp_file:
                tts.save(tmp_file.name)
                audio_bytes = Path(tmp_file.name).read_bytes()
                os.unlink(tmp_file.name)
            
            # Cache the result
            cache_path.write_bytes(audio_bytes)
            logger.info(f"Generated and cached TTS: {cache_key}")
            
            return audio_bytes
            
        except Exception as e:
            logger.error(f"TTS generation error: {e}")
            # Return a simple error audio or empty bytes
            return b""
    
    def get_supported_languages(self) -> Dict[str, str]:
        """Get supported languages for TTS"""
        return {
            code: settings.SUPPORTED_LANGUAGES.get(code, code)
            for code in self.language_mapping.keys()
        }

# Global instances
whisper_service = None
tts_service = None

def get_whisper_service() -> WhisperService:
    """Get or create Whisper service instance"""
    global whisper_service
    if whisper_service is None:
        whisper_service = WhisperService()
    return whisper_service

def get_tts_service() -> TTSService:
    """Get or create TTS service instance"""
    global tts_service
    if tts_service is None:
        tts_service = TTSService()
    return tts_service