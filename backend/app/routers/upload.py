from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
import os
import shutil
from pathlib import Path
import uuid
from datetime import datetime

from app.database import get_db, UploadedFile
from app.routers.auth import get_current_user
from config import settings

router = APIRouter()

# Pydantic models
class FileUploadResponse(BaseModel):
    id: int
    filename: str
    original_filename: str
    file_size: int
    file_type: str
    upload_status: str
    uploaded_at: datetime
    file_url: str

class FileListResponse(BaseModel):
    files: List[FileUploadResponse]
    total_count: int

# Helper functions
def get_file_extension(filename: str) -> str:
    """Get file extension"""
    return Path(filename).suffix.lower()

def generate_unique_filename(original_filename: str) -> str:
    """Generate unique filename to prevent conflicts"""
    ext = get_file_extension(original_filename)
    unique_id = str(uuid.uuid4())
    return f"{unique_id}{ext}"

def validate_file_type(filename: str) -> bool:
    """Validate if file type is allowed"""
    ext = get_file_extension(filename)
    return ext in settings.ALLOWED_FILE_TYPES

def save_uploaded_file(file: UploadFile) -> str:
    """Save uploaded file to disk"""
    # Create upload directory if it doesn't exist
    Path(settings.UPLOAD_DIR).mkdir(parents=True, exist_ok=True)
    
    # Generate unique filename
    unique_filename = generate_unique_filename(file.filename)
    file_path = Path(settings.UPLOAD_DIR) / unique_filename
    
    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return str(file_path)

# Routes
@router.post("/file", response_model=FileUploadResponse)
async def upload_file(
    file: UploadFile = File(...),
    description: Optional[str] = Form(None),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Upload a single file"""
    try:
        # Validate file type
        if not validate_file_type(file.filename):
            raise HTTPException(
                status_code=400, 
                detail=f"File type not allowed. Supported types: {settings.ALLOWED_FILE_TYPES}"
            )
        
        # Check file size
        if file.size > settings.MAX_FILE_SIZE:
            raise HTTPException(
                status_code=400,
                detail=f"File size too large. Maximum size: {settings.MAX_FILE_SIZE / (1024*1024)} MB"
            )
        
        # Save file
        file_path = save_uploaded_file(file)
        
        # Save to database
        db_file = UploadedFile(
            filename=Path(file_path).name,
            original_filename=file.filename,
            file_path=file_path,
            file_type=file.content_type,
            file_size=file.size,
            upload_status="uploaded"
        )
        db.add(db_file)
        db.commit()
        db.refresh(db_file)
        
        return FileUploadResponse(
            id=db_file.id,
            filename=db_file.filename,
            original_filename=db_file.original_filename,
            file_size=db_file.file_size,
            file_type=db_file.file_type,
            upload_status=db_file.upload_status,
            uploaded_at=db_file.uploaded_at,
            file_url=f"/static/{db_file.filename}"
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"File upload failed: {str(e)}")

@router.post("/files", response_model=List[FileUploadResponse])
async def upload_multiple_files(
    files: List[UploadFile] = File(...),
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Upload multiple files"""
    results = []
    
    for file in files:
        try:
            # Validate file type
            if not validate_file_type(file.filename):
                results.append({
                    "filename": file.filename,
                    "status": "error",
                    "message": "File type not allowed"
                })
                continue
            
            # Check file size
            if file.size > settings.MAX_FILE_SIZE:
                results.append({
                    "filename": file.filename,
                    "status": "error",
                    "message": "File size too large"
                })
                continue
            
            # Save file
            file_path = save_uploaded_file(file)
            
            # Save to database
            db_file = UploadedFile(
                filename=Path(file_path).name,
                original_filename=file.filename,
                file_path=file_path,
                file_type=file.content_type,
                file_size=file.size,
                upload_status="uploaded"
            )
            db.add(db_file)
            db.commit()
            db.refresh(db_file)
            
            results.append(FileUploadResponse(
                id=db_file.id,
                filename=db_file.filename,
                original_filename=db_file.original_filename,
                file_size=db_file.file_size,
                file_type=db_file.file_type,
                upload_status=db_file.upload_status,
                uploaded_at=db_file.uploaded_at,
                file_url=f"/static/{db_file.filename}"
            ))
            
        except Exception as e:
            results.append({
                "filename": file.filename,
                "status": "error",
                "message": str(e)
            })
    
    return results

@router.get("/files", response_model=FileListResponse)
async def get_uploaded_files(
    skip: int = 0,
    limit: int = 50,
    file_type: Optional[str] = None,
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Get list of uploaded files"""
    query = db.query(UploadedFile)
    
    # Apply filters
    if file_type:
        query = query.filter(UploadedFile.file_type.contains(file_type))
    if status:
        query = query.filter(UploadedFile.upload_status == status)
    
    # Get total count
    total_count = query.count()
    
    # Get paginated results
    files = query.offset(skip).limit(limit).all()
    
    file_responses = []
    for file in files:
        file_responses.append(FileUploadResponse(
            id=file.id,
            filename=file.filename,
            original_filename=file.original_filename,
            file_size=file.file_size,
            file_type=file.file_type,
            upload_status=file.upload_status,
            uploaded_at=file.uploaded_at,
            file_url=f"/static/{file.filename}"
        ))
    
    return FileListResponse(
        files=file_responses,
        total_count=total_count
    )

@router.delete("/files/{file_id}")
async def delete_file(
    file_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Delete uploaded file"""
    # Get file record
    db_file = db.query(UploadedFile).filter(UploadedFile.id == file_id).first()
    if not db_file:
        raise HTTPException(status_code=404, detail="File not found")
    
    # Delete physical file
    try:
        if os.path.exists(db_file.file_path):
            os.remove(db_file.file_path)
    except Exception as e:
        print(f"Warning: Could not delete physical file: {e}")
    
    # Delete database record
    db.delete(db_file)
    db.commit()
    
    return {"message": "File deleted successfully"}

@router.get("/files/{file_id}/status")
async def get_file_status(
    file_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    """Get processing status of a file"""
    db_file = db.query(UploadedFile).filter(UploadedFile.id == file_id).first()
    if not db_file:
        raise HTTPException(status_code=404, detail="File not found")
    
    return {
        "id": db_file.id,
        "filename": db_file.filename,
        "status": db_file.upload_status,
        "progress": db_file.processing_progress,
        "uploaded_at": db_file.uploaded_at,
        "processed_at": db_file.processed_at
    }