from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from pydantic import BaseModel
import io
import logging
from typing import Optional

from app.database import get_db
from app.routers.auth import get_current_user
from app.services.audio import get_whisper_service, get_tts_service

logger = logging.getLogger(__name__)
router = APIRouter()

# Pydantic models
class TranscriptionResponse(BaseModel):
    text: str
    language: str
    confidence: float
    segments: list

class TTSRequest(BaseModel):
    text: str
    language: str = "en"
    slow: bool = False

class SupportedLanguagesResponse(BaseModel):
    languages: dict

# Routes
@router.post("/transcribe", response_model=TranscriptionResponse)
async def transcribe_audio(
    file: UploadFile = File(...),
    language: Optional[str] = None,
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Transcribe audio file to text using Whisper"""
    try:
        # Validate file type
        if not file.content_type.startswith("audio/"):
            raise HTTPException(status_code=400, detail="File must be an audio file")
        
        # Read audio data
        audio_data = await file.read()
        
        # Get transcription service
        whisper_service = get_whisper_service()
        
        # Transcribe audio
        result = whisper_service.transcribe(audio_data, language)
        
        if "error" in result:
            raise HTTPException(status_code=400, detail=result["error"])
        
        return TranscriptionResponse(**result)
        
    except Exception as e:
        logger.error(f"Transcription error: {e}")
        raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")

@router.post("/tts")
async def text_to_speech(
    request: TTSRequest,
    current_user = Depends(get_current_user)
):
    """Convert text to speech using TTS service"""
    try:
        # Get TTS service
        tts_service = get_tts_service()
        
        # Generate speech
        audio_bytes = tts_service.generate_speech(
            text=request.text,
            language=request.language,
            slow=request.slow
        )
        
        # Return audio as streaming response
        return StreamingResponse(
            io.BytesIO(audio_bytes),
            media_type="audio/mpeg",
            headers={"Content-Disposition": "attachment; filename=speech.mp3"}
        )
        
    except Exception as e:
        logger.error(f"TTS error: {e}")
        raise HTTPException(status_code=500, detail=f"TTS generation failed: {str(e)}")

@router.post("/tts/lesson/{lesson_id}")
async def generate_lesson_audio(
    lesson_id: int,
    language: str = "en",
    current_user = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Generate audio for a specific lesson"""
    from app.database import Lesson
    
    try:
        # Get lesson content
        lesson = db.query(Lesson).filter(Lesson.id == lesson_id).first()
        if not lesson:
            raise HTTPException(status_code=404, detail="Lesson not found")
        
        # Get content in requested language
        content_field = f"content_{language}"
        if hasattr(lesson, content_field):
            content = getattr(lesson, content_field)
        else:
            content = lesson.content_en
        
        if not content:
            raise HTTPException(status_code=400, detail="No content available for this language")
        
        # Generate TTS
        tts_service = get_tts_service()
        audio_bytes = tts_service.generate_speech(
            text=content,
            language=language
        )
        
        # TODO: Save audio URL to lesson record
        # audio_url_field = f"audio_url_{language}"
        # setattr(lesson, audio_url_field, f"/static/audio/lesson_{lesson_id}_{language}.mp3")
        # db.commit()
        
        return StreamingResponse(
            io.BytesIO(audio_bytes),
            media_type="audio/mpeg",
            headers={"Content-Disposition": f"attachment; filename=lesson_{lesson_id}_{language}.mp3"}
        )
        
    except Exception as e:
        logger.error(f"Lesson TTS error: {e}")
        raise HTTPException(status_code=500, detail=f"Lesson audio generation failed: {str(e)}")

@router.post("/voice-query")
async def voice_query(
    file: UploadFile = File(...),
    target_language: str = "en",
    current_user = Depends(get_current_user)
):
    """Handle voice query - transcribe, process, and optionally respond with audio"""
    try:
        # Transcribe audio
        audio_data = await file.read()
        whisper_service = get_whisper_service()
        transcription_result = whisper_service.transcribe(audio_data)
        
        if "error" in transcription_result:
            raise HTTPException(status_code=400, detail=transcription_result["error"])
        
        query_text = transcription_result["text"]
        
        # TODO: Process query (search courses, answer questions, etc.)
        # For now, just return a simple response
        response_text = f"I understood your query: {query_text}. This is a placeholder response."
        
        # Generate response audio
        tts_service = get_tts_service()
        response_audio = tts_service.generate_speech(
            text=response_text,
            language=target_language
        )
        
        return {
            "transcription": transcription_result,
            "query_text": query_text,
            "response_text": response_text,
            "response_audio_url": "/api/v1/audio/tts"  # URL to get the audio
        }
        
    except Exception as e:
        logger.error(f"Voice query error: {e}")
        raise HTTPException(status_code=500, detail=f"Voice query failed: {str(e)}")

@router.get("/languages/tts", response_model=SupportedLanguagesResponse)
async def get_tts_languages():
    """Get supported languages for TTS"""
    try:
        tts_service = get_tts_service()
        languages = tts_service.get_supported_languages()
        return SupportedLanguagesResponse(languages=languages)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get TTS languages: {str(e)}")

@router.get("/languages/whisper")
async def get_whisper_languages():
    """Get supported languages for Whisper transcription"""
    # Whisper supports many languages, here are the most common ones
    languages = {
        "auto": "Auto-detect",
        "en": "English",
        "hi": "Hindi",
        "bn": "Bengali",
        "te": "Telugu",
        "ta": "Tamil",
        "mr": "Marathi",
        "gu": "Gujarati",
        "kn": "Kannada",
        "ml": "Malayalam",
        "pa": "Punjabi",
        "ur": "Urdu",
        "or": "Odia",
        "as": "Assamese"
    }
    return SupportedLanguagesResponse(languages=languages)