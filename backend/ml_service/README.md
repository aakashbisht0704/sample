# ML Service Setup Guide

This guide explains how to set up and run the ML-based adaptive learning service for math questions.

## Prerequisites

1. Python 3.8 or higher
2. Node.js 14 or higher
3. A Gemini API key from Google AI Studio (https://makersuite.google.com/app/apikey)

## Setup Steps

1. Install Python dependencies:
   ```bash
   cd backend/ml_service
   pip install -r requirements.txt
   ```

2. Configure Gemini API:
   - Create a `.env` file in the `backend/ml_service` directory
   - Add your Gemini API key:
     ```
     GEMINI_API_KEY=your_api_key_here
     ```

3. Start the ML service:
   ```bash
   cd backend/ml_service
   python start_server.py
   ```
   
   Or alternatively:
   ```bash
   cd backend/ml_service
   uvicorn api:app --reload --port 8000
   ```

4. Configure frontend:
   - Create a `.env.local` file in the root directory
   - Add the ML service URL:
     ```
     NEXT_PUBLIC_ML_SERVICE_URL=http://localhost:8000
     ```

## Features

- Adaptive difficulty adjustment based on user performance
- ML-powered question generation using Gemini AI
- Real-time performance tracking
- Smart difficulty prediction using Random Forest classifier

## API Endpoints

### POST /api/next-question

Generates the next question based on user performance.

Request body:
```json
{
  "user_id": "string",
  "current_difficulty": "easy",
  "response_time_ms": 5000,
  "hints_used": 1,
  "correct": true,
  "last_scores": [1, 1, 0, 1]
}
```

Response:
```json
{
  "question": {
    "type": "mcq",
    "prompt": "string",
    "choices": ["string"],
    "answer": "string",
    "difficulty": "string",
    "hint": "string"
  },
  "next_difficulty": "string"
}
```
