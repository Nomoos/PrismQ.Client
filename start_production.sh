#!/bin/bash
# Production startup script for PrismQ Client
# This script builds the frontend and starts the backend with static file serving

set -e

echo "🚀 Starting PrismQ Client in production mode..."

# Check if we're in the project root
if [ ! -d "Frontend" ] || [ ! -d "Backend" ]; then
    echo "❌ Error: Must be run from project root directory"
    exit 1
fi

# Build frontend if not already built
if [ ! -d "Backend/static" ]; then
    echo "📦 Building frontend..."
    cd Frontend
    npm ci
    npm run build
    
    # Copy built files to backend static directory
    echo "📋 Copying static files to backend..."
    cd ..
    mkdir -p Backend/static
    
    # Copy all files including hidden ones; handle empty directory case
    if [ -d "Frontend/dist" ] && [ "$(ls -A Frontend/dist)" ]; then
        cp -r Frontend/dist/. Backend/static/
        echo "✅ Frontend built and copied to Backend/static/"
    else
        echo "❌ Error: Frontend/dist is empty or doesn't exist"
        exit 1
    fi
else
    echo "✅ Frontend already built (Backend/static exists)"
fi

# Start the backend
echo "🔥 Starting backend server..."
cd Backend

# Install Python dependencies if needed
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
else
    source venv/bin/activate
fi

# Set production environment
export ENVIRONMENT=production
export LOG_LEVEL=info

# Start uvicorn
echo "✨ Server starting on http://0.0.0.0:8000"
uvicorn src.main:app --host 0.0.0.0 --port 8000
