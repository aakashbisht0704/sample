# AI-Charya Setup Guide

This guide will help you set up the complete AI-Charya adaptive learning system with ML-powered question generation.

## 🚀 Quick Start

### 1. Frontend Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create environment file:
   ```bash
   cp env.local.example .env.local
   ```

3. Start the frontend:
   ```bash
   npm run dev
   ```

### 2. ML Service Setup

1. Navigate to ML service directory:
   ```bash
   cd backend/ml_service
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Get a Gemini API key:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key

4. Create environment file:
   ```bash
   cp env.example .env
   ```

5. Edit `.env` file and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=8000
   HOST=localhost
   ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
   ```

6. Start the ML service:
   ```bash
   python start_server.py
   ```

### 3. Test the System

1. Open your browser to `http://localhost:3000`
2. Click "Login" and use the demo credentials:
   - Email: `demo@ai-charya.com`
   - Password: `demo123`
3. You should be redirected to the session page
4. Start a session and answer questions to see adaptive learning in action!

## 🔧 System Architecture

### Frontend (Next.js)
- **Login System**: Demo authentication with localStorage
- **Session Management**: Adaptive learning session with 8 questions
- **ML Integration**: Sends performance data to ML service
- **Rewards System**: Badge-based gamification

### ML Service (Python/FastAPI)
- **Adaptive Learning**: Random Forest classifier for difficulty prediction
- **Question Generation**: Gemini AI for creating math questions
- **Performance Tracking**: Real-time user performance analysis

### Key Features
- ✅ Adaptive difficulty adjustment
- ✅ ML-powered question generation
- ✅ Real-time performance tracking
- ✅ Gamification with badges
- ✅ Session analytics and reporting

## 🐛 Troubleshooting

### Common Issues

1. **ML Service not starting**:
   - Check if Python dependencies are installed
   - Verify Gemini API key is correct
   - Ensure port 8000 is available

2. **Frontend can't connect to ML service**:
   - Check if ML service is running on port 8000
   - Verify `.env.local` has correct ML service URL
   - Check browser console for CORS errors

3. **Questions not generating**:
   - Verify Gemini API key is valid
   - Check ML service logs for errors
   - Ensure API key has proper permissions

4. **Still seeing dummy questions**:
   - Check browser console for ML service errors
   - Verify ML service is running: `python test_api.py`
   - Check if fallback to dummy questions is happening

### Testing the ML Service

Run the test script to verify everything is working:
```bash
cd backend/ml_service
python test_api.py
```

This will test the API and show you if questions are being generated correctly.

### Logs and Debugging

- **Frontend logs**: Check browser console
- **ML service logs**: Check terminal where `python start_server.py` is running
- **API testing**: Visit `http://localhost:8000/docs` for FastAPI documentation

## 📊 How It Works

1. **User logs in** with demo credentials
2. **Session starts** with an easy question
3. **User answers** and performance data is collected
4. **ML service analyzes** performance and predicts next difficulty
5. **Gemini AI generates** appropriate question
6. **Process repeats** for 8 questions total
7. **Session ends** with analytics and rewards

## 🎯 Next Steps

- Add more question types and subjects
- Implement user accounts and progress tracking
- Add more sophisticated ML models
- Create teacher dashboard for monitoring
- Add collaborative features

## 📝 API Documentation

The ML service provides a REST API:

- **POST /api/next-question**: Get next adaptive question
- **GET /docs**: Interactive API documentation

See `backend/ml_service/README.md` for detailed API documentation.
