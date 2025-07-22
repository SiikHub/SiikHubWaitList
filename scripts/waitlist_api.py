from fastapi import FastAPI, HTTPException, Depends, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Boolean, DateTime, func
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel, EmailStr, validator, Field
from datetime import datetime, timedelta
from typing import Optional, List
import re
import uvicorn
import os

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./siikhub_waitlist.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database Models
class WaitlistEntry(Base):
    __tablename__ = "waitlist_entries"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    source = Column(String, default="website")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = Column(Boolean, default=True)
    position = Column(Integer, nullable=True)
    ip_address = Column(String, nullable=True)
    user_agent = Column(String, nullable=True)

# Create tables
Base.metadata.create_all(bind=engine)

# Pydantic Models
class WaitlistSignupRequest(BaseModel):
    email: EmailStr
    source: str = Field(default="website", max_length=50)
    
    @validator('email')
    def validate_email_format(cls, v):
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, str(v)):
            raise ValueError('Invalid email format')
        return str(v).lower().strip()
    
    @validator('source')
    def validate_source(cls, v):
        allowed_sources = ['website', 'mobile', 'social', 'referral', 'api']
        if v not in allowed_sources:
            raise ValueError(f'Source must be one of: {", ".join(allowed_sources)}')
        return v

class WaitlistResponse(BaseModel):
    success: bool
    message: str
    email: Optional[str] = None
    position: Optional[int] = None
    total_signups: Optional[int] = None

class WaitlistStats(BaseModel):
    total_signups: int
    active_signups: int
    inactive_signups: int
    recent_signups: int
    today_signups: int
    average_daily_signups: float
    top_sources: List[dict]

class WaitlistEntryResponse(BaseModel):
    id: int
    email: str
    source: str
    created_at: datetime
    is_active: bool
    position: Optional[int]
    
    class Config:
        from_attributes = True

class HealthResponse(BaseModel):
    status: str
    timestamp: datetime
    database_status: str
    total_entries: int
    version: str

# FastAPI app initialization
app = FastAPI(
    title="SiikHub Waitlist API",
    description="Professional waitlist management system for SiikHub platform",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://v0.dev",
        "https://siikhub.com",
        "https://*.siikhub.com"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Utility functions
def update_positions(db: Session):
    """Update position numbers for all active entries"""
    active_entries = db.query(WaitlistEntry).filter(
        WaitlistEntry.is_active == True
    ).order_by(WaitlistEntry.created_at.asc()).all()
    
    for i, entry in enumerate(active_entries, 1):
        entry.position = i
    
    db.commit()

def get_client_info(request: Request):
    """Extract client information from request"""
    return {
        "ip_address": request.client.host if hasattr(request, 'client') else None,
        "user_agent": request.headers.get("user-agent", "")[:500]
    }

# API Endpoints

@app.get("/", response_model=dict)
async def root():
    """Root endpoint with API information"""
    return {
        "message": "SiikHub Waitlist API v2.0",
        "status": "operational",
        "documentation": "/docs",
        "health_check": "/health"
    }

@app.get("/health", response_model=HealthResponse)
async def health_check(db: Session = Depends(get_db)):
    """Comprehensive health check endpoint"""
    try:
        # Test database connection
        total_entries = db.query(WaitlistEntry).count()
        db_status = "healthy"
    except Exception as e:
        db_status = f"error: {str(e)}"
        total_entries = 0
    
    return HealthResponse(
        status="healthy" if db_status == "healthy" else "degraded",
        timestamp=datetime.utcnow(),
        database_status=db_status,
        total_entries=total_entries,
        version="2.0.0"
    )

@app.post("/api/waitlist/signup", response_model=WaitlistResponse)
async def signup_waitlist(
    signup_data: WaitlistSignupRequest,
    request: Request,
    db: Session = Depends(get_db)
):
    """Add email to waitlist with comprehensive validation"""
    try:
        # Check if email already exists
        existing_entry = db.query(WaitlistEntry).filter(
            WaitlistEntry.email == signup_data.email
        ).first()
        
        if existing_entry:
            if existing_entry.is_active:
                return WaitlistResponse(
                    success=False,
                    message="You're already on our waitlist! We'll notify you when SiikHub launches.",
                    email=signup_data.email,
                    position=existing_entry.position,
                    total_signups=db.query(WaitlistEntry).filter(WaitlistEntry.is_active == True).count()
                )
            else:
                # Reactivate inactive entry
                existing_entry.is_active = True
                existing_entry.updated_at = datetime.utcnow()
                existing_entry.source = signup_data.source
                db.commit()
                
                update_positions(db)
                db.refresh(existing_entry)
                
                total_active = db.query(WaitlistEntry).filter(WaitlistEntry.is_active == True).count()
                
                return WaitlistResponse(
                    success=True,
                    message=f"🎉 Welcome back! You're #{existing_entry.position} on the SiikHub waitlist.",
                    email=signup_data.email,
                    position=existing_entry.position,
                    total_signups=total_active
                )
        
        # Create new entry
        client_info = get_client_info(request)
        
        new_entry = WaitlistEntry(
            email=signup_data.email,
            source=signup_data.source,
            **client_info
        )
        
        db.add(new_entry)
        db.commit()
        
        # Update positions
        update_positions(db)
        db.refresh(new_entry)
        
        total_active = db.query(WaitlistEntry).filter(WaitlistEntry.is_active == True).count()
        
        return WaitlistResponse(
            success=True,
            message=f"🎉 You're in! You're #{new_entry.position} on the SiikHub waitlist. We'll notify you when we launch!",
            email=signup_data.email,
            position=new_entry.position,
            total_signups=total_active
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

@app.get("/api/waitlist/stats", response_model=WaitlistStats)
async def get_waitlist_stats(db: Session = Depends(get_db)):
    """Get comprehensive waitlist statistics"""
    try:
        # Basic counts
        total_signups = db.query(WaitlistEntry).count()
        active_signups = db.query(WaitlistEntry).filter(WaitlistEntry.is_active == True).count()
        inactive_signups = total_signups - active_signups
        
        # Recent signups (last 7 days)
        week_ago = datetime.utcnow() - timedelta(days=7)
        recent_signups = db.query(WaitlistEntry).filter(
            WaitlistEntry.is_active == True,
            WaitlistEntry.created_at >= week_ago
        ).count()
        
        # Today's signups
        today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
        today_signups = db.query(WaitlistEntry).filter(
            WaitlistEntry.created_at >= today_start
        ).count()
        
        # Average daily signups (last 30 days)
        thirty_days_ago = datetime.utcnow() - timedelta(days=30)
        signups_last_30_days = db.query(WaitlistEntry).filter(
            WaitlistEntry.created_at >= thirty_days_ago
        ).count()
        average_daily_signups = signups_last_30_days / 30.0
        
        # Top sources
        source_stats = db.query(
            WaitlistEntry.source,
            func.count(WaitlistEntry.id).label('count')
        ).filter(
            WaitlistEntry.is_active == True
        ).group_by(WaitlistEntry.source).order_by(
            func.count(WaitlistEntry.id).desc()
        ).limit(5).all()
        
        top_sources = [{"source": stat.source, "count": stat.count} for stat in source_stats]
        
        return WaitlistStats(
            total_signups=total_signups,
            active_signups=active_signups,
            inactive_signups=inactive_signups,
            recent_signups=recent_signups,
            today_signups=today_signups,
            average_daily_signups=round(average_daily_signups, 2),
            top_sources=top_sources
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch statistics: {str(e)}")

@app.get("/api/waitlist/entries", response_model=List[WaitlistEntryResponse])
async def get_waitlist_entries(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    active_only: bool = Query(True),
    db: Session = Depends(get_db)
):
    """Get paginated waitlist entries (admin endpoint)"""
    try:
        query = db.query(WaitlistEntry)
        
        if active_only:
            query = query.filter(WaitlistEntry.is_active == True)
        
        entries = query.order_by(WaitlistEntry.position.asc()).offset(skip).limit(limit).all()
        
        return entries
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch entries: {str(e)}")

@app.delete("/api/waitlist/unsubscribe/{email}")
async def unsubscribe_email(email: str, db: Session = Depends(get_db)):
    """Unsubscribe email from waitlist (GDPR compliance)"""
    try:
        # Validate email format
        email = email.lower().strip()
        if not re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', email):
            raise HTTPException(status_code=400, detail="Invalid email format")
        
        # Find entry
        entry = db.query(WaitlistEntry).filter(
            WaitlistEntry.email == email,
            WaitlistEntry.is_active == True
        ).first()
        
        if not entry:
            raise HTTPException(status_code=404, detail="Email not found in active waitlist")
        
        # Soft delete - mark as inactive
        entry.is_active = False
        entry.updated_at = datetime.utcnow()
        db.commit()
        
        # Update positions for remaining entries
        update_positions(db)
        
        return {
            "success": True,
            "message": "Successfully unsubscribed from waitlist",
            "email": email
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to unsubscribe: {str(e)}")

@app.get("/api/waitlist/export")
async def export_waitlist(
    format: str = Query("json", regex="^(json|csv)$"),
    active_only: bool = Query(True),
    db: Session = Depends(get_db)
):
    """Export waitlist data (admin endpoint)"""
    try:
        query = db.query(WaitlistEntry)
        
        if active_only:
            query = query.filter(WaitlistEntry.is_active == True)
        
        entries = query.order_by(WaitlistEntry.position.asc()).all()
        
        if format == "json":
            export_data = []
            for entry in entries:
                export_data.append({
                    "email": entry.email,
                    "source": entry.source,
                    "created_at": entry.created_at.isoformat(),
                    "position": entry.position,
                    "is_active": entry.is_active
                })
            
            return {
                "success": True,
                "format": "json",
                "data": export_data,
                "count": len(export_data),
                "exported_at": datetime.utcnow().isoformat()
            }
        
        elif format == "csv":
            from io import StringIO
            import csv
            
            output = StringIO()
            writer = csv.writer(output)
            
            # Write header
            writer.writerow(["Email", "Source", "Created At", "Position", "Is Active"])
            
            # Write data
            for entry in entries:
                writer.writerow([
                    entry.email,
                    entry.source,
                    entry.created_at.isoformat(),
                    entry.position,
                    entry.is_active
                ])
            
            csv_content = output.getvalue()
            output.close()
            
            return {
                "success": True,
                "format": "csv",
                "data": csv_content,
                "count": len(entries),
                "exported_at": datetime.utcnow().isoformat()
            }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to export data: {str(e)}")

@app.get("/api/waitlist/position/{email}")
async def get_position(email: str, db: Session = Depends(get_db)):
    """Get specific user's position in waitlist"""
    try:
        email = email.lower().strip()
        
        entry = db.query(WaitlistEntry).filter(
            WaitlistEntry.email == email,
            WaitlistEntry.is_active == True
        ).first()
        
        if not entry:
            raise HTTPException(status_code=404, detail="Email not found in waitlist")
        
        total_active = db.query(WaitlistEntry).filter(WaitlistEntry.is_active == True).count()
        
        return {
            "success": True,
            "email": email,
            "position": entry.position,
            "total_signups": total_active,
            "joined_at": entry.created_at.isoformat(),
            "source": entry.source
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get position: {str(e)}")

if __name__ == "__main__":
    print("🚀 Starting SiikHub Waitlist API v2.0...")
    print("=" * 60)
    print("📚 API Documentation: http://localhost:8000/docs")
    print("📖 ReDoc Documentation: http://localhost:8000/redoc")
    print("❤️  Health Check: http://localhost:8000/health")
    print("📊 Statistics: http://localhost:8000/api/waitlist/stats")
    print("=" * 60)
    
    uvicorn.run(
        app, 
        host="0.0.0.0", 
        port=8000, 
        reload=True,
        log_level="info"
    )
