from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum
from uuid import uuid4, UUID

app = FastAPI(title="Feedback API")

origins = [
    "http://localhost:3000",  # React dev server
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Enum for feedback types matching your UI icons (ThumbsUp, ThumbsDown, AlertTriangle, Star)
class FeedbackType(str, Enum):
    thumbs_up = "thumbs_up"
    thumbs_down = "thumbs_down"
    alert = "alert"
    star = "star"

# Feedback data model
class Feedback(BaseModel):
    id: UUID = Field(default_factory=uuid4)
    type: FeedbackType
    message: Optional[str] = None

# In-memory store for feedbacks (replace with DB in production)
feedback_db: List[Feedback] = []

@app.get("/")
async def root():
    return {"message": "Feedback API is running"}

@app.post("/feedback", response_model=Feedback, status_code=201)
async def submit_feedback(feedback: Feedback):
    feedback_db.append(feedback)
    return feedback

@app.get("/feedback", response_model=List[Feedback])
async def get_feedback():
    return feedback_db

@app.get("/feedback/{feedback_id}", response_model=Feedback)
async def get_feedback_by_id(feedback_id: UUID):
    for fb in feedback_db:
        if fb.id == feedback_id:
            return fb
    raise HTTPException(status_code=404, detail="Feedback not found")

@app.delete("/feedback/{feedback_id}", status_code=204)
async def delete_feedback(feedback_id: UUID):
    global feedback_db
    feedback_db = [fb for fb in feedback_db if fb.id != feedback_id]
    return