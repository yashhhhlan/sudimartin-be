# 🚀 DEPLOYMENT GUIDE - Tree Family Project

## Prerequisites

- Node.js v16+
- npm atau yarn
- MySQL Server
- Git

---

## 📋 SETUP LENGKAP UNTUK DEPLOYMENT

### STEP 1: Persiapan Server

**Untuk Linux Server (Ubuntu/Debian):**

```bash
# Update sistem
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MySQL
sudo apt install -y mysql-server

# Install PM2 (untuk production process manager)
sudo npm install -g pm2
```

**Untuk macOS:**

```bash
# Install Homebrew jika belum ada
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Install MySQL
brew install mysql
brew services start mysql
```

---

## 📦 BACKEND DEPLOYMENT

### 1. Setup Backend Directory

```bash
cd be
npm install
```

### 2. Configure Environment (PENTING!)

Edit file `.env` dengan konfigurasi server Anda:

```env
# Database Configuration
DB_HOST=your_database_host
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=tree_family_db
DB_PORT=3306

# Server Configuration
NODE_ENV=production
PORT=5200

# Frontend URL (update dengan domain Anda)
FRONTEND_URL=https://your-domain.com

# JWT Secret (ubah dengan kunci yang aman!)
JWT_SECRET=generate_random_secret_key_min_32_chars

# Admin credentials
ADMIN_EMAIL=silsilah.keluarga.sp@gmail.com
ADMIN_PASSWORD=#Pagelaran2025
```

### 3. Setup Database

```bash
# Jalankan migration untuk membuat database dan tables
npm run migrate

# Verify database
mysql -u root -p
# SELECT * FROM tree_family_db.users;
```

### 4. Test Backend Locally

```bash
npm run dev
# Akses: http://localhost:5200/api/health
```

### 5. Deploy ke Production

**Menggunakan PM2:**

```bash
# Start dengan PM2
pm2 start src/index.js --name "tree-family-api"

# Save PM2 configuration
pm2 save

# Setup PM2 startup
pm2 startup
pm2 save

# Restart API
pm2 restart tree-family-api

# Check status
pm2 status
pm2 logs tree-family-api
```

**Menggunakan Docker (Optional):**

```bash
# Build Docker image
docker build -t tree-family-api .

# Run container
docker run -d \
  --name tree-family-api \
  -p 5200:5200 \
  --env-file .env \
  tree-family-api
```

---

## 🎨 FRONTEND DEPLOYMENT

### 1. Setup Frontend Directory

```bash
cd fe
npm install
```

### 2. Configure Environment

Edit file `.env`:

```env
# Update dengan URL backend Anda
VITE_API_URL=https://your-api-domain.com/api
VITE_APP_NAME=Tree Family
VITE_APP_VERSION=1.0.0
```

### 3. Build Frontend

```bash
npm run build
# Hasil build: dist/ folder
```

### 4. Deploy ke Hosting

**Option A: Vercel (Recommended - Free & Easy)**

```bash
# Install Vercel CLI
npm install -g vercel

# Login ke Vercel
vercel login

# Deploy
cd fe
vercel
```

**Option B: Netlify**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd fe
netlify deploy --prod --dir=dist
```

**Option C: Manual ke Shared Hosting (cPanel)**

1. Build: `npm run build`
2. Upload folder `dist/` ke public_html via FTP/cPanel File Manager
3. Configure .htaccess jika perlu (React Router)

**.htaccess untuk React Router:**

```htaccess
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

**Option D: VPS/Server Sendiri**

```bash
# Build
npm run build

# Transfer ke server
scp -r dist/ user@your-server:/var/www/html/

# Install web server
sudo apt install -y nginx

# Configure nginx (lihat section dibawah)
```

### 5. Nginx Configuration (untuk VPS)

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    root /var/www/html/dist;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Proxy API requests ke backend
    location /api/ {
        proxy_pass http://localhost:5200/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 🔒 SSL Certificate (HTTPS)

```bash
# Menggunakan Let's Encrypt + Certbot
sudo apt install -y certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --nginx -d your-domain.com -d www.your-domain.com

# Auto-renew (Certbot handles this automatically)
sudo systemctl enable certbot.timer
```

---

## 🧪 Testing Deployment

### Test Backend API

```bash
# Health check
curl http://your-domain.com:5200/api/health

# Login test
curl -X POST http://your-domain.com:5200/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "silsilah.keluarga.sp@gmail.com",
    "password": "#Pagelaran2025"
  }'
```

### Test Frontend

1. Akses https://your-domain.com
2. Test login dengan credentials
3. Verifikasi API calls di DevTools Network tab

---

## 📊 Monitoring & Maintenance

### PM2 Monitoring

```bash
# Real-time monitoring
pm2 monit

# View logs
pm2 logs tree-family-api

# Restart jika error
pm2 restart tree-family-api

# Update code dan restart
git pull origin main
pm2 restart tree-family-api
```

### Database Backup

```bash
# Daily backup
mysqldump -u root -p tree_family_db > backup_$(date +%Y%m%d).sql

# Restore dari backup
mysql -u root -p tree_family_db < backup_20240101.sql
```

### Update Code

```bash
# Backend
cd be
git pull origin main
npm install
pm2 restart tree-family-api

# Frontend
cd fe
git pull origin main
npm install
npm run build
# Upload dist/ folder ke hosting
```

---

## ❌ Troubleshooting

### Backend error "Cannot find module"

```bash
cd be
rm -rf node_modules package-lock.json
npm install
npm run migrate
```

### Frontend blank page

1. Check `.env` VITE_API_URL is correct
2. Rebuild: `npm run build`
3. Clear browser cache (Ctrl+Shift+Delete)
4. Check DevTools Console for errors

### Database connection failed

```bash
# Test MySQL connection
mysql -h your-db-host -u db-user -p

# Check .env database credentials
# Verify MySQL service running: sudo systemctl status mysql
```

### CORS error di frontend

- Update BE `.env` FRONTEND_URL dengan domain yang benar
- Restart backend: `pm2 restart tree-family-api`

---

## 📋 Checklist Deployment

- [ ] Node.js v16+ terinstall
- [ ] MySQL server aktif dan ter-setup
- [ ] Database `tree_family_db` sudah dibuat
- [ ] Backend `.env` dikonfigurasi dengan benar
- [ ] Frontend `.env` dikonfigurasi dengan benar
- [ ] Backend migration sudah dijalankan
- [ ] Backend bisa diakses dari public
- [ ] Frontend bisa diakses dari public
- [ ] SSL/HTTPS ter-setup
- [ ] Domain sudah menunjuk ke server
- [ ] PM2 atau systemd service sudah setup
- [ ] Database backup strategy sudah ada
- [ ] Monitoring tools sudah setup (PM2, Nginx logs)

---

## 📞 Support & Help

Jika ada error saat deployment:

1. Cek logs: `pm2 logs tree-family-api`
2. Cek MySQL: `mysql -u root -p`
3. Test endpoint: `curl http://localhost:5200/api/health`
4. Check .env files: verify semua environment variables

---

**Happy Deployment! 🎉**
