#!/usr/bin/env python3
"""
Test script for the ML service API
"""
import requests
import json

def test_ml_service():
    url = "http://localhost:8000/api/next-question"
    
    # Test data
    test_performance = {
        "user_id": "test_user_123",
        "current_difficulty": "easy",
        "response_time_ms": 5000,
        "hints_used": 0,
        "correct": True,
        "last_scores": [1, 1, 0, 1, 1]
    }
    
    try:
        print("Testing ML service...")
        print(f"Sending request to: {url}")
        print(f"Payload: {json.dumps(test_performance, indent=2)}")
        
        response = requests.post(url, json=test_performance)
        
        if response.status_code == 200:
            result = response.json()
            print("\n✅ Success! Response:")
            print(json.dumps(result, indent=2))
            
            # Validate response structure
            if "question" in result and "next_difficulty" in result:
                question = result["question"]
                required_fields = ["id", "type", "prompt", "choices", "answer", "difficulty", "hint"]
                
                missing_fields = [field for field in required_fields if field not in question]
                if missing_fields:
                    print(f"\n⚠️  Warning: Missing fields in question: {missing_fields}")
                else:
                    print("\n✅ Question structure is valid!")
                    
                print(f"\n📊 Next difficulty: {result['next_difficulty']}")
                print(f"📝 Question: {question['prompt']}")
                print(f"🎯 Answer: {question['answer']}")
                
        else:
            print(f"\n❌ Error: {response.status_code}")
            print(f"Response: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("\n❌ Connection Error: Make sure the ML service is running on port 8000")
        print("Run: python start_server.py")
    except Exception as e:
        print(f"\n❌ Error: {e}")

if __name__ == "__main__":
    test_ml_service()
