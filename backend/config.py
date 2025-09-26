import os
from pathlib import Path
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # API Settings
    APP_NAME: str = "SIH Learning Platform API"
    VERSION: str = "1.0.0"
    API_PREFIX: str = "/api/v1"
    DEBUG: bool = True
    
    # Server Settings
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # Database Settings
    DATABASE_URL: str = "sqlite:///./learning_platform.db"
    
    # Security Settings
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # File Upload Settings
    MAX_FILE_SIZE: int = 100 * 1024 * 1024  # 100MB
    UPLOAD_DIR: str = "./uploads"
    ALLOWED_FILE_TYPES: list = [".pdf", ".docx", ".txt", ".mp3", ".wav", ".mp4", ".avi"]
    
    # Model Settings
    WHISPER_MODEL: str = "base"  # tiny, base, small, medium, large
    INDICTRANS2_MODEL_DIR: str = "./models/indictrans2"
    TTS_CACHE_DIR: str = "./cache/tts"
    
    # Redis Settings (for caching and task queue)
    REDIS_URL: str = "redis://localhost:6379"
    
    # Language Settings
    SUPPORTED_LANGUAGES: dict = {
        "en": "English",
        "hi": "Hindi", 
        "te": "Telugu",
        "bn": "Bengali",
        "ta": "Tamil",
        "mr": "Marathi",
        "gu": "Gujarati",
        "kn": "Kannada",
        "ml": "Malayalam",
        "pa": "Punjabi",
        "ur": "Urdu",
        "or": "Odia",
        "as": "Assamese",
        "mai": "Maithili",
        "bho": "Bhojpuri"
    }
    
    class Config:
        env_file = ".env"

# Create directories if they don't exist
def create_directories():
    dirs = [
        Settings().UPLOAD_DIR,
        Settings().INDICTRANS2_MODEL_DIR,
        Settings().TTS_CACHE_DIR,
        "./models",
        "./cache"
    ]
    for directory in dirs:
        Path(directory).mkdir(parents=True, exist_ok=True)

settings = Settings()
create_directories()