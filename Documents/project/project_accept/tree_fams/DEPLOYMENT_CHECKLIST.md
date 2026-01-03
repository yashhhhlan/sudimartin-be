# DEPLOYMENT CHECKLIST & VERIFICATION

## ✅ SETUP COMPLETION STATUS

### Dependencies

- [x] Backend Node modules installed (10 packages)
- [x] Frontend Node modules installed (12 packages)
- [x] All npm scripts available

### Environment Configuration

- [x] Backend `.env` configured

  - DB_HOST: localhost
  - DB_USER: root
  - DB_PASSWORD: root1234
  - PORT: 5200
  - Admin Email: silsilah.keluarga.sp@gmail.com
  - Admin Pass: #Pagelaran2025

- [x] Frontend `.env` configured
  - VITE_API_URL: http://localhost:5200/api

### Docker & Containers

- [x] Dockerfile created (Backend)
- [x] Dockerfile created (Frontend)
- [x] nginx.conf created (React routing)
- [x] docker-compose.yml created (3 services: MySQL, BE, FE)

### Deployment Scripts

- [x] build.sh - Build Docker images
- [x] start.sh - Start all services
- [x] stop.sh - Stop all services
- [x] deploy-production.sh - Deploy ke VPS

### Documentation

- [x] DEPLOYMENT_GUIDE.md - Complete reference
- [x] DEPLOYMENT_QUICKSTART.md - 4 deployment options
- [x] DEPLOYMENT_READY_SUMMARY.md - This summary

---

## 🚀 HOW TO START DEPLOYMENT

### STEP 1: Choose Your Deployment Method

```
┌─────────────────────────────────────────────────────────┐
│ 4 DEPLOYMENT OPTIONS AVAILABLE:                         │
├─────────────────────────────────────────────────────────┤
│ 1. DOCKER (Recommended)                                │
│    Easiest, containerized, production-ready            │
│                                                         │
│ 2. MANUAL SETUP (Local Dev/Testing)                    │
│    Direct npm install & run                             │
│                                                         │
│ 3. CLOUD (Render/Vercel/Netlify)                       │
│    Deploy to platform cloud (free tier available)      │
│                                                         │
│ 4. VPS/SERVER (Self-hosted)                            │
│    Ubuntu server, PM2, Nginx                           │
└─────────────────────────────────────────────────────────┘
```

---

## 🐳 OPTION 1: DOCKER (Recommended)

**Best for**: Production, cross-platform compatibility

### Prerequisites

```bash
# Check Docker installed
docker --version
docker-compose --version
```

### Deployment

```bash
cd /Users/m/Documents/project/project_accept/tree_fams

# Step 1: Build images (takes 2-5 minutes)
./build.sh

# Step 2: Start services
./start.sh

# Step 3: Wait 30 seconds for MySQL startup
# Step 4: Access:
#   Frontend: http://localhost:3000
#   Backend: http://localhost:5200
#   API Health: http://localhost:5200/api/health

# Step 5: Stop when done
./stop.sh
```

### View Logs

```bash
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose ps
```

---

## 📝 OPTION 2: MANUAL SETUP

**Best for**: Local development, testing

### Terminal 1 - Backend

```bash
cd /Users/m/Documents/project/project_accept/tree_fams/be

# Install deps
npm install

# Run migration (creates database)
npm run migrate

# Start server
npm run dev
# Output: Server running on port 5200
```

### Terminal 2 - Frontend

```bash
cd /Users/m/Documents/project/project_accept/tree_fams/fe

# Install deps
npm install

# Start dev server
npm run dev
# Output: VITE v5.4.21 ready in 500 ms
#         ➜  Local:   http://localhost:5173
```

### Access

- Frontend: http://localhost:5173 (or 3000 if configured)
- Backend: http://localhost:5200

---

## ☁️ OPTION 3: CLOUD DEPLOYMENT

### 3A. Deploy Backend to Render.com

1. Go to https://render.com
2. Connect your GitHub repo
3. Create New Web Service
4. Configure:
   ```
   Name: tree-family-api
   Root directory: be
   Build: npm install
   Start: npm start
   Environment:
   - DB_HOST: (MySQL host)
   - DB_USER: root
   - DB_PASSWORD: #Pagelaran2025
   - FRONTEND_URL: https://your-frontend.com
   - JWT_SECRET: (generate random 32 chars)
   ```
5. Deploy!

### 3B. Deploy Frontend to Vercel

```bash
npm install -g vercel

cd /Users/m/Documents/project/project_accept/tree_fams/fe

# Login with GitHub
vercel login

# Deploy
vercel --prod
```

Or use Netlify:

```bash
npm install -g netlify-cli
cd fe
netlify login
netlify deploy --prod --dir=dist
```

---

## 🖥️ OPTION 4: VPS/SERVER DEPLOYMENT

**Best for**: Full control, production-grade

### 4A. Server Setup (Ubuntu 20.04+)

```bash
# On your VPS:
ssh user@your-server.com

# Update
sudo apt update && sudo apt upgrade -y

# Install Node
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MySQL
sudo apt install -y mysql-server

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install -y nginx
```

### 4B. Deploy Code

```bash
# Method 1: Clone from Git
mkdir -p ~/tree-family
cd ~/tree-family
git clone your-repo .

# Method 2: Copy files via SCP
# scp -r /Users/m/Documents/project/project_accept/tree_fams/* user@server:/home/user/tree-family
```

### 4C. Setup & Start

```bash
# Backend
cd ~/tree-family/be
npm install
npm run migrate

pm2 start src/index.js --name "tree-family-api"
pm2 save
pm2 startup
sudo systemctl restart pm2-root

# Frontend
cd ../fe
npm install
npm run build
sudo cp -r dist/* /var/www/html/
```

### 4D. Configure Nginx

```bash
sudo tee /etc/nginx/sites-available/default > /dev/null << 'EOF'
server {
    listen 80 default_server;
    server_name _;

    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5200/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

sudo systemctl restart nginx
```

### 4E. Setup SSL (HTTPS)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot certonly --nginx -d your-domain.com
sudo systemctl restart nginx
```

---

## 🧪 TEST CREDENTIALS

Use these to test the application after deployment:

```
Email:    silsilah.keluarga.sp@gmail.com
Password: #Pagelaran2025
```

### Test API Manually

```bash
curl -X POST http://localhost:5200/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "silsilah.keluarga.sp@gmail.com",
    "password": "#Pagelaran2025"
  }'
```

Expected response:

```json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "namaDepan": "Admin",
    "email": "silsilah.keluarga.sp@gmail.com"
  }
}
```

---

## 📊 VERIFICATION TESTS

After deployment, verify with these tests:

### Test 1: Backend Health

```bash
curl http://localhost:5200/api/health
# Expected: 200 OK response
```

### Test 2: Database Connection

```bash
curl http://localhost:5200/api/users
# Expected: 200 OK with user list or login required
```

### Test 3: Frontend Loading

```
Open browser: http://localhost:3000
Expected: Login page loads
```

### Test 4: Login Flow

1. Go to http://localhost:3000
2. Enter credentials:
   - Email: silsilah.keluarga.sp@gmail.com
   - Password: #Pagelaran2025
3. Click Login
4. Expected: Redirected to dashboard/family tree page

### Test 5: API Integration

1. Open DevTools (F12)
2. Go to Network tab
3. Login again
4. Check:
   - POST /api/auth/login (should be 200)
   - Response includes JWT token
   - Subsequent API calls include Authorization header

---

## 🔧 TROUBLESHOOTING

### Docker Issues

```bash
# Reset everything
docker-compose down
docker system prune -a

# Rebuild
./build.sh
./start.sh
```

### Database Connection Error

```bash
# Check MySQL running
docker-compose ps

# Reset database
docker-compose down
docker volume rm tree_family_db

# Restart
docker-compose up -d
```

### Port Already in Use

```bash
# Find process using port
lsof -i :5200  # Backend
lsof -i :3000  # Frontend
lsof -i :3306  # MySQL

# Kill process
kill -9 <PID>
```

### Frontend Blank Page

```bash
# Clear cache and rebuild
cd fe
rm -rf dist node_modules
npm install
npm run build

# Check .env
cat .env
```

### Login Not Working

```bash
# Verify admin user exists
docker-compose exec mysql mysql -u root -proot1234 -e "USE tree_family_db; SELECT * FROM users;"

# Check backend logs
docker-compose logs backend

# Test API directly
curl -X POST http://localhost:5200/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"silsilah.keluarga.sp@gmail.com","password":"#Pagelaran2025"}'
```

---

## 📋 PRODUCTION CHECKLIST

Before going live:

- [ ] Change JWT_SECRET in .env (min 32 chars)
- [ ] Change MySQL password in .env
- [ ] Enable HTTPS/SSL
- [ ] Setup database backups
- [ ] Configure domain/DNS
- [ ] Setup monitoring (PM2, Datadog, New Relic)
- [ ] Test error handling
- [ ] Test database failover
- [ ] Setup CI/CD pipeline
- [ ] Document deployment process
- [ ] Create runbooks for common issues

---

## 📚 DOCUMENTATION FILES

All documentation files are ready:

1. **DEPLOYMENT_QUICKSTART.md** ← Start here!
   - 4 quick options
   - Step-by-step instructions
2. **DEPLOYMENT_GUIDE.md**
   - Complete reference
   - All deployment methods
   - Troubleshooting guide
3. **DEPLOYMENT_CHECKLIST.md** ← You are here
   - Verification steps
   - Test cases
   - Troubleshooting

---

## ✨ NEXT ACTIONS

### Immediate (Now)

1. Read: `DEPLOYMENT_QUICKSTART.md`
2. Pick deployment option (1-4)
3. Verify prerequisites

### Short Term (Today)

1. Run deployment
2. Test login with provided credentials
3. Verify frontend & API working

### Medium Term (This Week)

1. Configure domain/DNS
2. Setup SSL/HTTPS
3. Setup monitoring
4. Create backup strategy

---

## 🎯 QUICK COMMAND REFERENCE

```bash
# Docker (Recommended)
./build.sh && ./start.sh

# Backend only
cd be && npm install && npm run migrate && npm start

# Frontend only
cd fe && npm install && npm run dev

# Production build (Frontend)
cd fe && npm run build

# View Docker logs
docker-compose logs -f

# Stop everything
./stop.sh

# Full reset
docker-compose down
docker system prune -a
```

---

## 💬 NEED HELP?

| Issue              | File                     | Command                       |
| ------------------ | ------------------------ | ----------------------------- |
| Deployment steps   | DEPLOYMENT_QUICKSTART.md | Read first!                   |
| Complete reference | DEPLOYMENT_GUIDE.md      | Details for all options       |
| Backend error      | Backend logs             | `docker-compose logs backend` |
| Frontend error     | DevTools Console         | F12 → Console tab             |
| Database issue     | MySQL logs               | `docker-compose logs mysql`   |
| Port conflicts     | Terminal                 | `lsof -i :PORT_NUMBER`        |

---

## 🎉 YOU'RE READY!

All setup is complete. Everything you need is prepared:

✅ Code configured
✅ Dependencies installed
✅ Docker ready
✅ Environment variables set
✅ Scripts created
✅ Documentation complete

**Pick your deployment option and go live!**

Questions? Check DEPLOYMENT_GUIDE.md for comprehensive troubleshooting.

---

**Status: READY FOR DEPLOYMENT ✨**

_Last updated: 31 Dec 2025_
