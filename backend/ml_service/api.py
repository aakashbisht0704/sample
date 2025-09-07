from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from adaptive_learning import AdaptiveLearningSystem
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# Get CORS origins from environment
allowed_origins = os.getenv('ALLOWED_ORIGINS', 'http://localhost:3000').split(',')

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize our adaptive learning system
learning_system = AdaptiveLearningSystem()

class UserPerformance(BaseModel):
    user_id: str
    current_difficulty: str
    response_time_ms: int
    hints_used: int
    correct: bool
    last_scores: List[int]

class QuestionResponse(BaseModel):
    question: dict
    next_difficulty: str

@app.post("/api/next-question", response_model=QuestionResponse)
async def get_next_question(performance: UserPerformance):
    try:
        # Update the ML model with the user's performance
        learning_system.update_model({
            "current_difficulty": performance.current_difficulty,
            "response_time_ms": performance.response_time_ms,
            "hints_used": performance.hints_used,
            "correct": performance.correct,
            "last_scores": performance.last_scores
        })
        
        # Predict the next appropriate difficulty level
        next_difficulty = learning_system.predict_next_difficulty({
            "current_difficulty": performance.current_difficulty,
            "response_time_ms": performance.response_time_ms,
            "hints_used": performance.hints_used,
            "last_scores": performance.last_scores
        })
        
        # Generate a new question at the predicted difficulty
        question = learning_system.generate_fraction_question(next_difficulty)
        
        return QuestionResponse(
            question=question,
            next_difficulty=next_difficulty
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
