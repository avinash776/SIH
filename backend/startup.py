import asyncio
import uvicorn
from pathlib import Path
from app.database import engine, Base
from app.services.indictrans import get_indictrans_service
from app.services.audio import get_whisper_service, get_tts_service
from config import settings

async def initialize_models():
    """Initialize ML models"""
    print("Initializing machine learning models...")
    
    try:
        print("Loading IndicTrans2...")
        indictrans_service = get_indictrans_service()
        print("IndicTrans2 loaded successfully!")
        
        print("Loading Whisper...")
        whisper_service = get_whisper_service()
        print("Whisper loaded successfully!")
        
        print("Loading TTS service...")
        tts_service = get_tts_service()
        print("TTS service initialized!")
        
        print("All models loaded successfully!")
        
    except Exception as e:
        print(f"Error loading models: {e}")
        raise e

def create_sample_data():
    """Create sample courses and lessons for testing"""
    from sqlalchemy.orm import sessionmaker
    from app.database import User, Course, Lesson
    from passlib.context import CryptContext
    
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    db = SessionLocal()
    
    try:
        # Create admin user if not exists
        admin_user = db.query(User).filter(User.username == "admin").first()
        if not admin_user:
            pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
            admin_user = User(
                username="admin",
                email="admin@example.com",
                hashed_password=pwd_context.hash("admin123"),
                full_name="Admin User",
                preferred_language="en",
                is_admin=True
            )
            db.add(admin_user)
            db.commit()
            print("Created admin user (username: admin, password: admin123)")
        
        # Create sample course if not exists
        sample_course = db.query(Course).filter(Course.title_en == "Basic Electronics").first()
        if not sample_course:
            sample_course = Course(
                title_en="Basic Electronics",
                title_hi="बुनियादी इलेक्ट्रॉनिक्स",
                description_en="Learn fundamental concepts of electronics and circuit design",
                description_hi="इलेक्ट्रॉनिक्स और सर्किट डिज़ाइन की बुनियादी अवधारणाएं सीखें",
                category="Technology",
                level="Beginner",
                duration_hours=4.0,
                rating=4.8,
                is_published=True
            )
            db.add(sample_course)
            db.commit()
            db.refresh(sample_course)
            
            # Add sample lesson
            sample_lesson = Lesson(
                course_id=sample_course.id,
                title_en="Introduction to Circuits",
                title_hi="सर्किट का परिचय",
                content_en="Welcome to Basic Electronics! In this lesson, we'll explore the fundamental concepts of electrical circuits. A circuit is a complete path that allows electric current to flow from a power source, through various components, and back to the source.",
                content_hi="बुनियादी इलेक्ट्रॉनिक्स में आपका स्वागत है! इस पाठ में, हम विद्युत सर्किट की बुनियादी अवधारणाओं का पता लगाएंगे। एक सर्किट एक पूरा मार्ग है जो विद्युत प्रवाह को एक शक्ति स्रोत से, विभिन्न घटकों के माध्यम से, और वापस स्रोत तक प्रवाहित होने की अनुमति देता है।",
                lesson_order=1,
                duration_minutes=15.0
            )
            db.add(sample_lesson)
            db.commit()
            print("Created sample course and lesson")
        
    except Exception as e:
        print(f"Error creating sample data: {e}")
        db.rollback()
    finally:
        db.close()

def setup_database():
    """Setup database tables and sample data"""
    print("Setting up database...")
    Base.metadata.create_all(bind=engine)
    print("Database tables created!")
    
    create_sample_data()

async def main():
    """Main startup function"""
    print(f"Starting {settings.APP_NAME}...")
    
    # Setup database
    setup_database()
    
    # Initialize models
    await initialize_models()
    
    print("Setup complete! Starting server...")
    
    # Start the server
    config = uvicorn.Config(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level="info"
    )
    server = uvicorn.Server(config)
    await server.serve()

if __name__ == "__main__":
    asyncio.run(main())