#!/bin/bash

echo "🌳 Silsilah Keluarga - Automated Setup"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}→${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}!${NC} $1"
}

# Check if Node.js is installed
print_status "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi
print_success "Node.js found: $(node --version)"

# Check if MySQL is installed
print_status "Checking MySQL installation..."
if ! command -v mysql &> /dev/null; then
    print_warning "MySQL not found. Make sure MySQL server is installed and running."
else
    print_success "MySQL found"
fi

echo ""
echo "🔧 Setting up Backend..."
print_status "Installing backend dependencies..."
cd be
npm install > /dev/null 2>&1
if [ $? -eq 0 ]; then
    print_success "Backend dependencies installed"
else
    print_error "Failed to install backend dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    print_status "Creating .env file..."
    cat > .env << EOF
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root1234
DB_NAME=tree_family_db
JWT_SECRET=your-secret-key-change-in-production
PORT=5200
NODE_ENV=development
EOF
    print_success ".env file created"
else
    print_warning ".env file already exists"
fi

cd ..

echo ""
echo "🎨 Setting up Frontend..."
print_status "Installing frontend dependencies..."
cd fe
npm install > /dev/null 2>&1
if [ $? -eq 0 ]; then
    print_success "Frontend dependencies installed"
else
    print_error "Failed to install frontend dependencies"
    exit 1
fi

cd ..

echo ""
echo "📊 Database Setup"
print_status "Ready to initialize database..."
echo ""
echo "To set up the database, run:"
echo -e "${BLUE}  cd be${NC}"
echo -e "${BLUE}  npm run migrate${NC}"
echo ""

echo "🚀 Starting Servers"
echo ""
echo "In separate terminals, run:"
echo ""
echo -e "${GREEN}Terminal 1 - Backend:${NC}"
echo -e "${BLUE}  cd be${NC}"
echo -e "${BLUE}  npm start${NC}"
echo ""
echo -e "${GREEN}Terminal 2 - Frontend:${NC}"
echo -e "${BLUE}  cd fe${NC}"
echo -e "${BLUE}  npm start${NC}"
echo ""

echo "📱 Access Points"
echo -e "${BLUE}Frontend:${NC} http://localhost:3000"
echo -e "${BLUE}Backend:${NC} http://localhost:5200"
echo ""

echo "🔐 Default Credentials"
echo -e "${BLUE}Email:${NC} admin@family.com"
echo -e "${BLUE}Password:${NC} admin123"
echo ""

print_success "Setup complete! Follow the instructions above to start your servers."
