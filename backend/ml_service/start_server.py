#!/usr/bin/env python3
"""
Startup script for the ML service
"""
import os
import uvicorn
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

if __name__ == "__main__":
    port = int(os.getenv('PORT', 8000))
    host = os.getenv('HOST', 'localhost')
    
    print(f"Starting ML service on {host}:{port}")
    print(f"Gemini API Key configured: {'Yes' if os.getenv('GEMINI_API_KEY') else 'No (using placeholder)'}")
    
    uvicorn.run(
        "api:app",
        host=host,
        port=port,
        reload=True,
        log_level="info"
    )
