import google.generativeai as genai
from sklearn.ensemble import RandomForestClassifier
import numpy as np
import json
import os
import time
from typing import Dict, List

# Initialize Gemini API
api_key = os.getenv('GEMINI_API_KEY', 'YOUR_GEMINI_API_KEY')
genai.configure(api_key="AIzaSyCvbUiBJDCbTQprdydxmBbRQE8pwjFE8DY")
model = genai.GenerativeModel('gemini-2.5-flash')

class AdaptiveLearningSystem:
    def __init__(self):
        self.model = RandomForestClassifier()
        self.difficulty_levels = {
            "very_easy": 1,
            "easy": 2,
            "medium": 3,
            "hard": 4,
            "very_hard": 5
        }
        # Features: [current_difficulty, avg_response_time, hints_used, last_n_scores]
        self.X_train = []  
        self.y_train = []  # Labels: 1 for correct, 0 for incorrect

    def generate_fraction_question(self, difficulty_level: str) -> dict:
        prompt = f"""Generate a {difficulty_level} difficulty math fraction question for grade 5-8 students.
        
        Difficulty guidelines:
        - easy: Basic addition/subtraction with same denominators (e.g., 1/4 + 2/4)
        - medium: Different denominators, simple LCM (e.g., 1/3 + 1/6)
        - hard: Complex fractions, mixed numbers, or comparison (e.g., 2/3 + 1/4, which is larger: 3/5 or 2/3)
        
        Return ONLY valid JSON with these exact fields:
        {{
            "question": "The fraction problem as a clear question",
            "choices": ["option1", "option2", "option3", "option4"],
            "correct_answer": "the correct answer",
            "hint": "A helpful hint for students"
        }}
        
        Make sure the correct_answer matches one of the choices exactly."""

        response = model.generate_content(prompt)
        try:
            question_data = json.loads(response.text)
            return {
                "id": f"ai_q_{int(time.time() * 1000)}",  # Generate unique ID
                "type": "mcq",
                "prompt": question_data["question"],
                "choices": question_data["choices"],
                "answer": question_data["correct_answer"],
                "difficulty": difficulty_level,
                "hint": question_data["hint"]
            }
        except:
            # Fallback question if API fails
            return {
                "id": f"fallback_q_{int(time.time() * 1000)}",
                "type": "mcq",
                "prompt": "What is 1/2 + 1/4?",
                "choices": ["3/4", "2/6", "1/6", "5/4"],
                "answer": "3/4",
                "difficulty": "medium",
                "hint": "Convert fractions to same denominator"
            }

    def update_model(self, user_data: Dict):
        """Update the ML model with new user performance data"""
        features = [
            self.difficulty_levels[user_data["current_difficulty"]],
            user_data["response_time_ms"] / 1000,  # convert to seconds
            user_data["hints_used"],
            sum(user_data["last_scores"]) / len(user_data["last_scores"])
        ]
        
        self.X_train.append(features)
        self.y_train.append(1 if user_data["correct"] else 0)
        
        if len(self.X_train) > 10:  # Only train after collecting enough data
            self.model.fit(np.array(self.X_train), np.array(self.y_train))

    def predict_next_difficulty(self, user_data: Dict) -> str:
        """Predict appropriate difficulty for next question"""
        if len(self.X_train) < 10:
            # Not enough data for ML prediction, use simple logic
            current_level = self.difficulty_levels[user_data["current_difficulty"]]
            if user_data["correct"]:
                new_level = min(current_level + 1, 5)
            else:
                new_level = max(current_level - 1, 1)
            
            return [k for k, v in self.difficulty_levels.items() if v == new_level][0]
        
        features = np.array([[
            self.difficulty_levels[user_data["current_difficulty"]],
            user_data["response_time_ms"] / 1000,
            user_data["hints_used"],
            sum(user_data["last_scores"]) / len(user_data["last_scores"])
        ]])
        
        # Predict success probability at each difficulty level
        best_difficulty = "medium"  # default
        best_prob = 0
        target_prob = 0.7  # We want questions where student has ~70% chance of success
        
        for diff, level in self.difficulty_levels.items():
            features[0][0] = level
            prob = self.model.predict_proba(features)[0][1]  # Probability of correct answer
            if abs(prob - target_prob) < abs(best_prob - target_prob):
                best_prob = prob
                best_difficulty = diff
                
        return best_difficulty
