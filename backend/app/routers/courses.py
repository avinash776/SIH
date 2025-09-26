from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional, Dict
import logging

from app.database import get_db, Course, Lesson, Enrollment, Progress, User
from app.routers.auth import get_current_user
from app.services.indictrans import get_indictrans_service
from app.services.audio import get_tts_service

logger = logging.getLogger(__name__)
router = APIRouter()

# Pydantic models
class CourseBase(BaseModel):
    title_en: str
    description_en: str
    category: str
    level: str = "Beginner"
    thumbnail_url: Optional[str] = None

class CourseCreate(CourseBase):
    pass

class CourseResponse(BaseModel):
    id: int
    title: str
    description: str
    category: str
    level: str
    duration_hours: float
    rating: float
    thumbnail_url: Optional[str]
    is_enrolled: bool = False
    progress_percentage: float = 0.0
    language: str

    class Config:
        from_attributes = True

class LessonResponse(BaseModel):
    id: int
    title: str
    content: str
    lesson_order: int
    duration_minutes: float
    video_url: Optional[str]
    audio_url: Optional[str]
    completed: bool = False

    class Config:
        from_attributes = True

class CourseDetailResponse(BaseModel):
    id: int
    title: str
    description: str
    category: str
    level: str
    duration_hours: float
    rating: float
    thumbnail_url: Optional[str]
    lessons: List[LessonResponse]
    is_enrolled: bool = False
    progress_percentage: float = 0.0
    total_lessons: int
    completed_lessons: int

# Helper functions
def get_localized_content(obj, field: str, language: str) -> str:
    """Get content in specified language, fallback to English"""
    lang_field = f"{field}_{language}"
    if hasattr(obj, lang_field):
        content = getattr(obj, lang_field)
        if content:
            return content
    
    # Fallback to English
    en_field = f"{field}_en"
    if hasattr(obj, en_field):
        return getattr(obj, en_field) or ""
    
    return ""

def translate_content_if_needed(content: str, target_language: str) -> str:
    """Translate content if not available in target language"""
    if target_language == "en" or not content:
        return content
    
    try:
        translation_service = get_indictrans_service()
        result = translation_service.translate(content, target_language)
        return result.get("translated_text", content)
    except Exception as e:
        logger.error(f"Translation error: {e}")
        return content

# Routes
@router.get("/", response_model=List[CourseResponse])
async def get_courses(
    language: str = "en",
    category: Optional[str] = None,
    search: Optional[str] = None,
    level: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get list of courses with filters"""
    query = db.query(Course).filter(Course.is_published == True)
    
    # Apply filters
    if category:
        query = query.filter(Course.category == category)
    if level:
        query = query.filter(Course.level == level)
    
    courses = query.all()
    
    # Get user enrollments
    enrollments = {e.course_id: e for e in db.query(Enrollment).filter(Enrollment.user_id == current_user.id).all()}
    
    result = []
    for course in courses:
        # Get localized content
        title = get_localized_content(course, "title", language)
        description = get_localized_content(course, "description", language)
        
        # Translate if needed
        if not title or title == course.title_en:
            title = translate_content_if_needed(course.title_en, language)
        if not description or description == course.description_en:
            description = translate_content_if_needed(course.description_en, language)
        
        # Search filter
        if search and search.lower() not in title.lower() and search.lower() not in description.lower():
            continue
        
        # Get enrollment info
        enrollment = enrollments.get(course.id)
        is_enrolled = enrollment is not None
        progress_percentage = enrollment.progress_percentage if enrollment else 0.0
        
        result.append(CourseResponse(
            id=course.id,
            title=title,
            description=description,
            category=course.category,
            level=course.level,
            duration_hours=course.duration_hours,
            rating=course.rating,
            thumbnail_url=course.thumbnail_url,
            is_enrolled=is_enrolled,
            progress_percentage=progress_percentage,
            language=language
        ))
    
    return result

@router.get("/{course_id}", response_model=CourseDetailResponse)
async def get_course_detail(
    course_id: int,
    language: str = "en",
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get detailed course information with lessons"""
    course = db.query(Course).filter(Course.id == course_id, Course.is_published == True).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # Get lessons
    lessons = db.query(Lesson).filter(Lesson.course_id == course_id).order_by(Lesson.lesson_order).all()
    
    # Get user progress
    enrollment = db.query(Enrollment).filter(
        Enrollment.user_id == current_user.id,
        Enrollment.course_id == course_id
    ).first()
    
    progress_dict = {}
    if enrollment:
        progress_list = db.query(Progress).filter(Progress.user_id == current_user.id).all()
        progress_dict = {p.lesson_id: p for p in progress_list}
    
    # Prepare lesson responses
    lesson_responses = []
    for lesson in lessons:
        title = get_localized_content(lesson, "title", language)
        content = get_localized_content(lesson, "content", language)
        
        # Translate if needed
        if not title or title == lesson.title_en:
            title = translate_content_if_needed(lesson.title_en, language)
        if not content or content == lesson.content_en:
            content = translate_content_if_needed(lesson.content_en, language)
        
        # Get audio URL for language
        audio_url = None
        if hasattr(lesson, f"audio_url_{language}"):
            audio_url = getattr(lesson, f"audio_url_{language}")
        
        progress = progress_dict.get(lesson.id)
        completed = progress.completed if progress else False
        
        lesson_responses.append(LessonResponse(
            id=lesson.id,
            title=title,
            content=content,
            lesson_order=lesson.lesson_order,
            duration_minutes=lesson.duration_minutes,
            video_url=lesson.video_url,
            audio_url=audio_url,
            completed=completed
        ))
    
    # Course details
    title = get_localized_content(course, "title", language)
    description = get_localized_content(course, "description", language)
    
    # Translate if needed
    if not title or title == course.title_en:
        title = translate_content_if_needed(course.title_en, language)
    if not description or description == course.description_en:
        description = translate_content_if_needed(course.description_en, language)
    
    is_enrolled = enrollment is not None
    progress_percentage = enrollment.progress_percentage if enrollment else 0.0
    completed_lessons = len([l for l in lesson_responses if l.completed])
    
    return CourseDetailResponse(
        id=course.id,
        title=title,
        description=description,
        category=course.category,
        level=course.level,
        duration_hours=course.duration_hours,
        rating=course.rating,
        thumbnail_url=course.thumbnail_url,
        lessons=lesson_responses,
        is_enrolled=is_enrolled,
        progress_percentage=progress_percentage,
        total_lessons=len(lessons),
        completed_lessons=completed_lessons
    )

@router.post("/{course_id}/enroll")
async def enroll_in_course(
    course_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Enroll user in a course"""
    course = db.query(Course).filter(Course.id == course_id, Course.is_published == True).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # Check if already enrolled
    existing_enrollment = db.query(Enrollment).filter(
        Enrollment.user_id == current_user.id,
        Enrollment.course_id == course_id
    ).first()
    
    if existing_enrollment:
        raise HTTPException(status_code=400, detail="Already enrolled in this course")
    
    # Create enrollment
    enrollment = Enrollment(
        user_id=current_user.id,
        course_id=course_id
    )
    db.add(enrollment)
    db.commit()
    
    return {"message": "Successfully enrolled in course"}

@router.post("/{course_id}/lessons/{lesson_id}/complete")
async def mark_lesson_complete(
    course_id: int,
    lesson_id: int,
    time_spent: float = 0.0,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Mark lesson as completed"""
    # Verify enrollment
    enrollment = db.query(Enrollment).filter(
        Enrollment.user_id == current_user.id,
        Enrollment.course_id == course_id
    ).first()
    
    if not enrollment:
        raise HTTPException(status_code=400, detail="Not enrolled in this course")
    
    # Check if lesson exists
    lesson = db.query(Lesson).filter(Lesson.id == lesson_id, Lesson.course_id == course_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    
    # Update or create progress
    progress = db.query(Progress).filter(
        Progress.user_id == current_user.id,
        Progress.lesson_id == lesson_id
    ).first()
    
    if progress:
        progress.completed = True
        progress.completion_time = datetime.utcnow()
        progress.time_spent_minutes += time_spent
    else:
        progress = Progress(
            user_id=current_user.id,
            lesson_id=lesson_id,
            completed=True,
            completion_time=datetime.utcnow(),
            time_spent_minutes=time_spent
        )
        db.add(progress)
    
    db.commit()
    
    # Update enrollment progress
    total_lessons = db.query(Lesson).filter(Lesson.course_id == course_id).count()
    completed_lessons = db.query(Progress).filter(
        Progress.user_id == current_user.id,
        Progress.lesson_id.in_(
            db.query(Lesson.id).filter(Lesson.course_id == course_id)
        ),
        Progress.completed == True
    ).count()
    
    enrollment.progress_percentage = (completed_lessons / total_lessons) * 100 if total_lessons > 0 else 0
    
    if enrollment.progress_percentage >= 100:
        enrollment.completed_at = datetime.utcnow()
    
    db.commit()
    
    return {"message": "Lesson marked as completed", "progress_percentage": enrollment.progress_percentage}

@router.get("/categories")
async def get_categories(db: Session = Depends(get_db)):
    """Get list of course categories"""
    categories = db.query(Course.category).filter(Course.is_published == True).distinct().all()
    return [cat[0] for cat in categories if cat[0]]