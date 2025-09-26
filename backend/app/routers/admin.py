from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional, Dict
import logging
from datetime import datetime

from app.database import get_db, Course, Lesson, User, UploadedFile
from app.routers.auth import get_current_user
from app.services.indictrans import get_indictrans_service
from app.services.audio import get_tts_service

logger = logging.getLogger(__name__)
router = APIRouter()

# Pydantic models
class CourseCreate(BaseModel):
    title_en: str
    description_en: str
    category: str
    level: str = "Beginner"
    thumbnail_url: Optional[str] = None

class LessonCreate(BaseModel):
    title_en: str
    content_en: str
    lesson_order: int
    video_url: Optional[str] = None
    duration_minutes: float = 0.0

class TranslationPipelineRequest(BaseModel):
    content_id: int
    content_type: str  # "course" or "lesson"
    target_languages: List[str]

class PipelineStatus(BaseModel):
    id: str
    status: str  # "queued", "processing", "completed", "error"
    progress: int
    current_step: str
    started_at: datetime
    completed_at: Optional[datetime] = None
    error_message: Optional[str] = None

class AdminStats(BaseModel):
    total_courses: int
    published_courses: int
    total_lessons: int
    total_users: int
    total_translations: int
    total_uploads: int
    recent_uploads: List[Dict]

# Helper function to check admin access
def require_admin(current_user: User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user

# Background task functions
def process_translation_pipeline(
    content_id: int, 
    content_type: str, 
    target_languages: List[str], 
    db: Session
):
    """Background task to process translation pipeline"""
    try:
        translation_service = get_indictrans_service()
        tts_service = get_tts_service()
        
        if content_type == "course":
            course = db.query(Course).filter(Course.id == content_id).first()
            if not course:
                return
            
            # Translate course title and description
            for lang in target_languages:
                if lang != "en":
                    # Translate title
                    title_result = translation_service.translate(course.title_en, lang)
                    setattr(course, f"title_{lang}", title_result.get("translated_text", ""))
                    
                    # Translate description
                    desc_result = translation_service.translate(course.description_en, lang)
                    setattr(course, f"description_{lang}", desc_result.get("translated_text", ""))
            
            db.commit()
            
        elif content_type == "lesson":
            lesson = db.query(Lesson).filter(Lesson.id == content_id).first()
            if not lesson:
                return
            
            # Translate lesson title and content
            for lang in target_languages:
                if lang != "en":
                    # Translate title
                    title_result = translation_service.translate(lesson.title_en, lang)
                    setattr(lesson, f"title_{lang}", title_result.get("translated_text", ""))
                    
                    # Translate content
                    content_result = translation_service.translate(lesson.content_en, lang)
                    translated_content = content_result.get("translated_text", "")
                    setattr(lesson, f"content_{lang}", translated_content)
                    
                    # Generate TTS audio
                    try:
                        audio_bytes = tts_service.generate_speech(translated_content, lang)
                        # TODO: Save audio file and set URL
                        # audio_url = f"/static/audio/lesson_{lesson.id}_{lang}.mp3"
                        # setattr(lesson, f"audio_url_{lang}", audio_url)
                    except Exception as e:
                        logger.error(f"TTS generation failed for lesson {lesson.id}, language {lang}: {e}")
            
            db.commit()
            
    except Exception as e:
        logger.error(f"Translation pipeline error: {e}")

# Routes
@router.get("/stats", response_model=AdminStats)
async def get_admin_stats(
    admin_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Get admin dashboard statistics"""
    from app.database import Translation
    
    # Get counts
    total_courses = db.query(Course).count()
    published_courses = db.query(Course).filter(Course.is_published == True).count()
    total_lessons = db.query(Lesson).count()
    total_users = db.query(User).count()
    total_translations = db.query(Translation).count()
    total_uploads = db.query(UploadedFile).count()
    
    # Get recent uploads
    recent_uploads = db.query(UploadedFile).order_by(UploadedFile.uploaded_at.desc()).limit(5).all()
    recent_uploads_data = [
        {
            "id": upload.id,
            "filename": upload.original_filename,
            "status": upload.upload_status,
            "uploaded_at": upload.uploaded_at
        }
        for upload in recent_uploads
    ]
    
    return AdminStats(
        total_courses=total_courses,
        published_courses=published_courses,
        total_lessons=total_lessons,
        total_users=total_users,
        total_translations=total_translations,
        total_uploads=total_uploads,
        recent_uploads=recent_uploads_data
    )

@router.post("/courses", response_model=Dict)
async def create_course(
    course_data: CourseCreate,
    admin_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Create a new course"""
    course = Course(
        title_en=course_data.title_en,
        description_en=course_data.description_en,
        category=course_data.category,
        level=course_data.level,
        thumbnail_url=course_data.thumbnail_url,
        is_published=False
    )
    
    db.add(course)
    db.commit()
    db.refresh(course)
    
    return {"id": course.id, "message": "Course created successfully"}

@router.post("/courses/{course_id}/lessons")
async def create_lesson(
    course_id: int,
    lesson_data: LessonCreate,
    admin_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Create a new lesson for a course"""
    # Verify course exists
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    lesson = Lesson(
        course_id=course_id,
        title_en=lesson_data.title_en,
        content_en=lesson_data.content_en,
        lesson_order=lesson_data.lesson_order,
        video_url=lesson_data.video_url,
        duration_minutes=lesson_data.duration_minutes
    )
    
    db.add(lesson)
    db.commit()
    db.refresh(lesson)
    
    return {"id": lesson.id, "message": "Lesson created successfully"}

@router.post("/courses/{course_id}/publish")
async def publish_course(
    course_id: int,
    admin_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Publish a course to make it available to learners"""
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    course.is_published = True
    course.updated_at = datetime.utcnow()
    db.commit()
    
    return {"message": "Course published successfully"}

@router.post("/translation-pipeline")
async def start_translation_pipeline(
    request: TranslationPipelineRequest,
    background_tasks: BackgroundTasks,
    admin_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Start translation pipeline for course or lesson content"""
    # Verify content exists
    if request.content_type == "course":
        content = db.query(Course).filter(Course.id == request.content_id).first()
    elif request.content_type == "lesson":
        content = db.query(Lesson).filter(Lesson.id == request.content_id).first()
    else:
        raise HTTPException(status_code=400, detail="Invalid content type")
    
    if not content:
        raise HTTPException(status_code=404, detail=f"{request.content_type} not found")
    
    # Start background translation task
    background_tasks.add_task(
        process_translation_pipeline,
        request.content_id,
        request.content_type,
        request.target_languages,
        db
    )
    
    return {
        "message": "Translation pipeline started",
        "content_id": request.content_id,
        "content_type": request.content_type,
        "target_languages": request.target_languages
    }

@router.get("/users")
async def get_users(
    skip: int = 0,
    limit: int = 50,
    admin_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Get list of users for admin management"""
    users = db.query(User).offset(skip).limit(limit).all()
    
    return [
        {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "full_name": user.full_name,
            "preferred_language": user.preferred_language,
            "is_admin": user.is_admin,
            "is_active": user.is_active,
            "created_at": user.created_at
        }
        for user in users
    ]

@router.put("/users/{user_id}/admin")
async def toggle_admin_status(
    user_id: int,
    admin_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Toggle admin status for a user"""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.is_admin = not user.is_admin
    db.commit()
    
    return {"message": f"Admin status {'granted' if user.is_admin else 'revoked'} for user {user.username}"}

@router.delete("/courses/{course_id}")
async def delete_course(
    course_id: int,
    admin_user: User = Depends(require_admin),
    db: Session = Depends(get_db)
):
    """Delete a course and all its lessons"""
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # Delete associated lessons
    db.query(Lesson).filter(Lesson.course_id == course_id).delete()
    
    # Delete course
    db.delete(course)
    db.commit()
    
    return {"message": "Course deleted successfully"}