import logging
from typing import List, Dict, Optional
from config import settings

logger = logging.getLogger(__name__)

class IndicTrans2Service:
    def __init__(self):
        self.model = None
        self.tokenizer = None
        self.device = "cpu"  # Default to CPU
        self.supported_languages = {
            "hi": "hin_Deva",   # Hindi
            "bn": "ben_Beng",   # Bengali
            "te": "tel_Telu",   # Telugu
            "ta": "tam_Taml",   # Tamil
            "mr": "mar_Deva",   # Marathi
            "gu": "guj_Gujr",   # Gujarati
            "kn": "kan_Knda",   # Kannada
            "ml": "mal_Mlym",   # Malayalam
            "pa": "pan_Guru",   # Punjabi
            "ur": "urd_Arab",   # Urdu
            "or": "ory_Orya",   # Odia
            "as": "asm_Beng",   # Assamese
        }
        self.model_name = "ai4bharat/indictrans2-en-indic-1B"
        self.load_model()
    
    def load_model(self):
        """Load IndicTrans2 model and tokenizer (lazy loading)"""
        try:
            # Lazy import to avoid loading at startup
            import torch
            from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
            
            logger.info("Loading IndicTrans2 model...")
            self.device = "cuda" if torch.cuda.is_available() else "cpu"
            self.tokenizer = AutoTokenizer.from_pretrained(self.model_name, trust_remote_code=True)
            self.model = AutoModelForSeq2SeqLM.from_pretrained(
                self.model_name, 
                trust_remote_code=True,
                torch_dtype=torch.float16 if self.device == "cuda" else torch.float32
            )
            self.model = self.model.to(self.device)
            logger.info(f"IndicTrans2 model loaded successfully on {self.device}")
        except Exception as e:
            logger.error(f"Failed to load IndicTrans2 model: {e}")
            # Don't raise exception, allow server to start without ML models
            self.model = None
            self.tokenizer = None
    
    def preprocess_text(self, text: str) -> str:
        """Clean and preprocess text for translation"""
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text.strip())
        # Handle newlines
        text = text.replace('\n', ' ')
        return text
    
    def translate(self, text: str, target_language: str, source_language: str = "en") -> Dict:
        """
        Translate text from source language to target language
        
        Args:
            text: Text to translate
            target_language: Target language code (hi, bn, te, etc.)
            source_language: Source language code (default: en)
            
        Returns:
            Dictionary with translated text and metadata
        """
        try:
            # Load model if not already loaded
            if not self.model or not self.tokenizer:
                self.load_model()
            
            # If model still not available, return mock translation
            if not self.model or not self.tokenizer:
                logger.warning("Model not available, returning mock translation")
                return {
                    "translated_text": f"[MOCK TRANSLATION TO {target_language.upper()}] {text}",
                    "source_language": source_language,
                    "target_language": target_language,
                    "confidence": 0.5,
                    "original_text": text
                }
            
            if target_language not in self.supported_languages:
                raise ValueError(f"Unsupported target language: {target_language}")
            
            # Preprocess text
            cleaned_text = self.preprocess_text(text)
            
            if not cleaned_text.strip():
                return {
                    "translated_text": "",
                    "source_language": source_language,
                    "target_language": target_language,
                    "confidence": 0.0,
                    "error": "Empty text provided"
                }
            
            # Import torch here for actual translation
            import torch
            
            # Get language code for model
            tgt_lang = self.supported_languages[target_language]
            
            # Prepare input
            inputs = self.tokenizer(
                cleaned_text,
                return_tensors="pt",
                padding=True,
                truncation=True,
                max_length=512
            ).to(self.device)
            
            # Generate translation
            with torch.no_grad():
                generated_tokens = self.model.generate(
                    **inputs,
                    forced_bos_token_id=self.tokenizer.lang_code_to_id[tgt_lang],
                    max_new_tokens=512,
                    num_beams=5,
                    do_sample=False,
                    early_stopping=True
                )
            
            # Decode translation
            translated_text = self.tokenizer.decode(
                generated_tokens[0], 
                skip_special_tokens=True
            )
            
            # Calculate confidence (simplified approach)
            confidence = min(1.0, max(0.1, len(translated_text) / len(cleaned_text)))
            
            return {
                "translated_text": translated_text,
                "source_language": source_language,
                "target_language": target_language,
                "confidence": confidence,
                "original_text": text
            }
            
        except Exception as e:
            logger.error(f"Translation error: {e}")
            return {
                "translated_text": f"[ERROR TRANSLATION TO {target_language.upper()}] {text}",
                "source_language": source_language,
                "target_language": target_language,
                "confidence": 0.0,
                "error": str(e)
            }
    
    def translate_batch(self, texts: List[str], target_language: str, source_language: str = "en") -> List[Dict]:
        """Translate multiple texts in batch"""
        results = []
        for text in texts:
            result = self.translate(text, target_language, source_language)
            results.append(result)
        return results
    
    def get_supported_languages(self) -> Dict[str, str]:
        """Get list of supported languages"""
        return {
            code: settings.SUPPORTED_LANGUAGES.get(code, lang_code)
            for code, lang_code in self.supported_languages.items()
        }

# Global instance
indictrans_service = None

def get_indictrans_service() -> IndicTrans2Service:
    """Get or create IndicTrans2 service instance"""
    global indictrans_service
    if indictrans_service is None:
        indictrans_service = IndicTrans2Service()
    return indictrans_service