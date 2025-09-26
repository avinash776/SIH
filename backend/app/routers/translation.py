from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional

from app.database import get_db, Translation
from app.routers.auth import get_current_user
from app.services.indictrans import get_indictrans_service
from config import settings

router = APIRouter()

# Pydantic models
class TranslationRequest(BaseModel):
    text: str
    target_language: str
    source_language: str = "en"

class BatchTranslationRequest(BaseModel):
    texts: List[str]
    target_language: str
    source_language: str = "en"

class TranslationResponse(BaseModel):
    translated_text: str
    source_language: str
    target_language: str
    confidence: float
    original_text: str

class BatchTranslationResponse(BaseModel):
    translations: List[TranslationResponse]
    success_count: int
    total_count: int

class SupportedLanguagesResponse(BaseModel):
    languages: dict
    
# Routes
@router.post("/translate", response_model=TranslationResponse)
async def translate_text(
    request: TranslationRequest,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Translate text from source language to target language"""
    try:
        # Get translation service
        translation_service = get_indictrans_service()
        
        # Perform translation
        result = translation_service.translate(
            text=request.text,
            target_language=request.target_language,
            source_language=request.source_language
        )
        
        if "error" in result:
            raise HTTPException(status_code=400, detail=result["error"])
        
        # Save translation to database for caching
        translation_record = Translation(
            source_text=request.text,
            source_language=request.source_language,
            target_language=request.target_language,
            translated_text=result["translated_text"],
            confidence_score=result["confidence"]
        )
        db.add(translation_record)
        db.commit()
        
        return TranslationResponse(**result)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Translation failed: {str(e)}")

@router.post("/translate/batch", response_model=BatchTranslationResponse)
async def translate_batch(
    request: BatchTranslationRequest,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Translate multiple texts in batch"""
    try:
        # Get translation service
        translation_service = get_indictrans_service()
        
        # Perform batch translation
        results = translation_service.translate_batch(
            texts=request.texts,
            target_language=request.target_language,
            source_language=request.source_language
        )
        
        # Save successful translations to database
        translations = []
        success_count = 0
        
        for i, result in enumerate(results):
            if "error" not in result:
                # Save to database
                translation_record = Translation(
                    source_text=request.texts[i],
                    source_language=request.source_language,
                    target_language=request.target_language,
                    translated_text=result["translated_text"],
                    confidence_score=result["confidence"]
                )
                db.add(translation_record)
                
                translations.append(TranslationResponse(**result))
                success_count += 1
            else:
                # Add error result
                translations.append(TranslationResponse(
                    translated_text="",
                    source_language=request.source_language,
                    target_language=request.target_language,
                    confidence=0.0,
                    original_text=request.texts[i]
                ))
        
        db.commit()
        
        return BatchTranslationResponse(
            translations=translations,
            success_count=success_count,
            total_count=len(request.texts)
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Batch translation failed: {str(e)}")

@router.get("/translate/cached")
async def get_cached_translation(
    text: str,
    target_language: str,
    source_language: str = "en",
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Get cached translation if available"""
    cached = db.query(Translation).filter(
        Translation.source_text == text,
        Translation.source_language == source_language,
        Translation.target_language == target_language
    ).first()
    
    if cached:
        return TranslationResponse(
            translated_text=cached.translated_text,
            source_language=cached.source_language,
            target_language=cached.target_language,
            confidence=cached.confidence_score,
            original_text=cached.source_text
        )
    
    return {"message": "Translation not found in cache"}

@router.get("/languages", response_model=SupportedLanguagesResponse)
async def get_supported_languages():
    """Get list of supported languages for translation"""
    try:
        translation_service = get_indictrans_service()
        languages = translation_service.get_supported_languages()
        return SupportedLanguagesResponse(languages=languages)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get languages: {str(e)}")

@router.delete("/translate/cache")
async def clear_translation_cache(
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Clear translation cache (admin only)"""
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    
    deleted_count = db.query(Translation).delete()
    db.commit()
    
    return {"message": f"Cleared {deleted_count} cached translations"}