@echo off
REM Silsilah Keluarga - Automated Setup for Windows

echo.
echo 🌳 Silsilah Keluarga - Windows Setup
echo ====================================
echo.

REM Check if Node.js is installed
echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ✗ Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js found: %NODE_VERSION%

echo.
echo 🔧 Setting up Backend...
echo Installing backend dependencies...
cd be
call npm install
if %errorlevel% neq 0 (
    echo ✗ Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed

REM Create .env file if it doesn't exist
if not exist .env (
    echo Creating .env file...
    (
        echo DB_HOST=localhost
        echo DB_USER=root
        echo DB_PASSWORD=root1234
        echo DB_NAME=tree_family_db
        echo JWT_SECRET=your-secret-key-change-in-production
        echo PORT=5200
        echo NODE_ENV=development
    ) > .env
    echo ✓ .env file created
) else (
    echo ! .env file already exists
)

cd ..

echo.
echo 🎨 Setting up Frontend...
echo Installing frontend dependencies...
cd fe
call npm install
if %errorlevel% neq 0 (
    echo ✗ Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed

cd ..

echo.
echo 📊 Database Setup
echo Ready to initialize database...
echo.
echo To set up the database, run:
echo   cd be
echo   npm run migrate
echo.

echo 🚀 Starting Servers
echo.
echo In separate terminals (PowerShell or Command Prompt), run:
echo.
echo Terminal 1 - Backend:
echo   cd be
echo   npm start
echo.
echo Terminal 2 - Frontend:
echo   cd fe
echo   npm start
echo.

echo 📱 Access Points
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5200
echo.

echo 🔐 Default Credentials
echo Email:    admin@family.com
echo Password: admin123
echo.

echo ✓ Setup complete!
pause
