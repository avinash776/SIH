from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, Float, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from datetime import datetime
from config import settings

engine = create_engine(settings.DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database Models
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String)
    preferred_language = Column(String, default="en")
    is_admin = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    enrollments = relationship("Enrollment", back_populates="user")
    progress = relationship("Progress", back_populates="user")

class Course(Base):
    __tablename__ = "courses"
    
    id = Column(Integer, primary_key=True, index=True)
    title_en = Column(String, nullable=False)
    title_hi = Column(String)
    title_te = Column(String)
    title_bn = Column(String)
    description_en = Column(Text, nullable=False)
    description_hi = Column(Text)
    description_te = Column(Text)
    description_bn = Column(Text)
    thumbnail_url = Column(String)
    category = Column(String, nullable=False)
    level = Column(String, default="Beginner")  # Beginner, Intermediate, Advanced
    duration_hours = Column(Float, default=0.0)
    rating = Column(Float, default=0.0)
    is_published = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    lessons = relationship("Lesson", back_populates="course")
    enrollments = relationship("Enrollment", back_populates="course")

class Lesson(Base):
    __tablename__ = "lessons"
    
    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    title_en = Column(String, nullable=False)
    title_hi = Column(String)
    title_te = Column(String)
    title_bn = Column(String)
    content_en = Column(Text, nullable=False)
    content_hi = Column(Text)
    content_te = Column(Text)
    content_bn = Column(Text)
    lesson_order = Column(Integer, default=1)
    video_url = Column(String)
    audio_url_en = Column(String)
    audio_url_hi = Column(String)
    audio_url_te = Column(String)
    audio_url_bn = Column(String)
    duration_minutes = Column(Float, default=0.0)
    
    # Relationships
    course = relationship("Course", back_populates="lessons")
    progress = relationship("Progress", back_populates="lesson")

class Enrollment(Base):
    __tablename__ = "enrollments"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    enrolled_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    progress_percentage = Column(Float, default=0.0)
    
    # Relationships
    user = relationship("User", back_populates="enrollments")
    course = relationship("Course", back_populates="enrollments")

class Progress(Base):
    __tablename__ = "progress"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    lesson_id = Column(Integer, ForeignKey("lessons.id"), nullable=False)
    completed = Column(Boolean, default=False)
    completion_time = Column(DateTime, nullable=True)
    time_spent_minutes = Column(Float, default=0.0)
    
    # Relationships
    user = relationship("User", back_populates="progress")
    lesson = relationship("Lesson", back_populates="progress")

class Translation(Base):
    __tablename__ = "translations"
    
    id = Column(Integer, primary_key=True, index=True)
    source_text = Column(Text, nullable=False)
    source_language = Column(String, nullable=False)
    target_language = Column(String, nullable=False)
    translated_text = Column(Text, nullable=False)
    confidence_score = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)

class UploadedFile(Base):
    __tablename__ = "uploaded_files"
    
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    original_filename = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    file_type = Column(String, nullable=False)
    file_size = Column(Integer, nullable=False)
    upload_status = Column(String, default="uploaded")  # uploaded, processing, completed, error
    processing_progress = Column(Integer, default=0)
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    processed_at = Column(DateTime, nullable=True)

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()