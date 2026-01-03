#!/bin/bash

# Tree Family Project - Quick Start Script
# Platform: macOS/Linux
# Usage: chmod +x quick-start.sh && ./quick-start.sh

echo "🌳 Tree Family - Quick Start Setup"
echo "=================================="
echo ""

# Check prerequisites
echo "✓ Checking prerequisites..."
command -v node >/dev/null 2>&1 || { echo "❌ Node.js not found. Please install Node.js v16+"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm not found. Please install npm v7+"; exit 1; }
command -v mysql >/dev/null 2>&1 || { echo "⚠️  MySQL not found. Please install MySQL 5.7+"; }

echo "✓ Prerequisites check passed"
echo ""

# Setup Backend
echo "📦 Setting up Backend..."
cd be

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo "Backend dependencies already installed"
fi

# Create .env if not exists
if [ ! -f ".env" ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update .env with your database credentials"
else
    echo ".env already exists"
fi

echo "✓ Backend setup complete"
echo ""

# Go back to root
cd ..

# Setup Frontend
echo "🎨 Setting up Frontend..."
cd fe

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo "Frontend dependencies already installed"
fi

echo "✓ Frontend setup complete"
echo ""

# Go back to root
cd ..

echo "=================================="
echo "✅ Setup Complete!"
echo "=================================="
echo ""
echo "Next steps:"
echo ""
echo "1. Update database credentials in be/.env"
echo ""
echo "2. Create database and tables:"
echo "   cd be && npm run migrate"
echo ""
echo "3. Start backend (Terminal 1):"
echo "   cd be && npm run dev"
echo ""
echo "4. Start frontend (Terminal 2):"
echo "   cd fe && npm run dev"
echo ""
echo "5. Open browser:"
echo "   http://localhost:3000"
echo ""
echo "📖 For detailed setup, see INSTALLATION.md"
echo ""
