from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import uvicorn

from config import settings
from app.database import engine, Base
from app.routers import courses, translation, audio, upload, admin, auth

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("Starting up...")
    # Create database tables
    Base.metadata.create_all(bind=engine)
    yield
    # Shutdown
    print("Shutting down...")

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION,
    debug=settings.DEBUG,
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files
app.mount("/static", StaticFiles(directory="uploads"), name="static")

# Include routers
app.include_router(auth.router, prefix=f"{settings.API_PREFIX}/auth", tags=["auth"])
app.include_router(courses.router, prefix=f"{settings.API_PREFIX}/courses", tags=["courses"])
app.include_router(translation.router, prefix=f"{settings.API_PREFIX}/translation", tags=["translation"])
app.include_router(audio.router, prefix=f"{settings.API_PREFIX}/audio", tags=["audio"])
app.include_router(upload.router, prefix=f"{settings.API_PREFIX}/upload", tags=["upload"])
app.include_router(admin.router, prefix=f"{settings.API_PREFIX}/admin", tags=["admin"])

@app.get("/")
async def root():
    return {"message": f"Welcome to {settings.APP_NAME} API v{settings.VERSION}"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": settings.VERSION}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level="info"
    )