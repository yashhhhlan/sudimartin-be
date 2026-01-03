#!/bin/bash

# Tree Family - Stop Services
# Usage: ./stop.sh

echo "🛑 Stopping Tree Family Services..."
echo ""

docker-compose down

echo "✅ Services stopped!"
