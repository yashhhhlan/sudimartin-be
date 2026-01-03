#!/bin/bash

# Tree Family - Build & Deploy Script
# Usage: ./build.sh

set -e

echo "🔨 Building Tree Family Docker Images..."
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Build images
echo "📦 Building backend image..."
docker build -t tree-family-api:latest ./be

echo "📦 Building frontend image..."
docker build -t tree-family-web:latest ./fe

echo ""
echo "✅ Build completed successfully!"
echo ""
echo "Next steps:"
echo "1. Run: docker-compose up -d"
echo "2. Access frontend at http://localhost:3000"
echo "3. Backend API at http://localhost:5200"
