#!/bin/bash

# Tree Family - Production Deployment to Ubuntu Server
# Prerequisites:
# - SSH access to server
# - Domain name configured
# - Ubuntu 20.04+ with sudo access
#
# Usage: ./deploy-production.sh user@server.com /path/to/app

if [ $# -lt 1 ]; then
    echo "Usage: $0 user@server.com [app_path]"
    echo "Example: $0 deploy@myserver.com /home/deploy/tree-family"
    exit 1
fi

SERVER=$1
APP_PATH=${2:-/home/deploy/tree-family}

echo "🚀 Deploying Tree Family to Production..."
echo "Server: $SERVER"
echo "Path: $APP_PATH"
echo ""

# Step 1: Connect and setup directory
echo "📁 Setting up application directory..."
ssh $SERVER "mkdir -p $APP_PATH && cd $APP_PATH"

# Step 2: Clone or pull code
echo "📥 Pulling latest code..."
ssh $SERVER "cd $APP_PATH && git pull origin main || git clone https://github.com/your-repo/tree-family.git ."

# Step 3: Install dependencies
echo "📦 Installing dependencies..."
ssh $SERVER "cd $APP_PATH/be && npm install"
ssh $SERVER "cd $APP_PATH/fe && npm install"

# Step 4: Build frontend
echo "🔨 Building frontend..."
ssh $SERVER "cd $APP_PATH/fe && npm run build"

# Step 5: Setup environment
echo "⚙️  Configuring environment..."
ssh $SERVER "cd $APP_PATH && cat > .env << EOF
NODE_ENV=production
DB_HOST=localhost
DB_USER=tree_user
DB_PASSWORD=your_secure_password
DB_NAME=tree_family_db
PORT=5200
FRONTEND_URL=https://your-domain.com
JWT_SECRET=$(openssl rand -base64 32)
EOF"

# Step 6: Restart services
echo "🔄 Restarting services..."
ssh $SERVER "sudo pm2 restart tree-family-api || sudo pm2 start $APP_PATH/be/src/index.js --name tree-family-api"
ssh $SERVER "sudo systemctl restart nginx"

# Step 7: Verify deployment
echo "✅ Verifying deployment..."
ssh $SERVER "curl -s http://localhost:5200/api/health | head -20"

echo ""
echo "✅ Deployment complete!"
echo "Visit: https://your-domain.com"
