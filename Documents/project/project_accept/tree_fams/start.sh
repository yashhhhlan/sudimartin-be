#!/bin/bash

# Tree Family - Start Services
# Usage: ./start.sh

set -e

echo "🚀 Starting Tree Family Services..."
echo ""

# Check if Docker is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed."
    exit 1
fi

# Start services
docker-compose up -d

echo ""
echo "✅ Services started!"
echo ""
echo "📊 Service Status:"
docker-compose ps
echo ""
echo "🌐 Access:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5200"
echo "   MySQL:    localhost:3306"
echo ""
echo "📝 View logs:"
echo "   docker-compose logs -f"
echo ""
echo "⏹️  Stop services:"
echo "   docker-compose down"
