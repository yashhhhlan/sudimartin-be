# 🚀 DEPLOYMENT QUICK START - Tree Family Project

Semua setup sudah siap! Pilih cara deployment yang sesuai:

---

## ⚡ OPTION 1: Docker (RECOMMENDED - Paling Mudah)

### Persyaratan:

- Docker & Docker Compose terinstall
- RAM minimal 2GB
- Storage minimal 5GB

### Langkah-langkah:

```bash
# 1. Build Docker images
chmod +x build.sh
./build.sh

# 2. Start services (MySQL, Backend, Frontend)
chmod +x start.sh
./start.sh

# 3. Tunggu ~30 detik untuk MySQL startup
# 4. Akses aplikasi:
#    - Frontend: http://localhost:3000
#    - Backend: http://localhost:5200
#    - MySQL: localhost:3306

# 5. Stop services
chmod +x stop.sh
./stop.sh
```

**Credentials (sudah tersimpan):**

- Email: `silsilah.keluarga.sp@gmail.com`
- Password: `#Pagelaran2025`

---

## 🖥️ OPTION 2: Manual Setup (Linux/Mac)

### A. Setup Backend

```bash
# 1. Install dependencies
cd be
npm install

# 2. Configure .env (sudah ada di be/.env)
# Verify credentials ada di file:
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=root1234
# ADMIN_EMAIL=silsilah.keluarga.sp@gmail.com
# ADMIN_PASSWORD=#Pagelaran2025

# 3. Setup database
npm run migrate

# 4. Start backend
npm run dev
# Atau production mode:
npm start
```

### B. Setup Frontend

```bash
# 1. Buka terminal baru
cd fe

# 2. Install dependencies
npm install

# 3. Development mode
npm run dev
# Frontend akan di: http://localhost:5173

# Atau production build
npm run build
# Hasilnya di folder: dist/
```

---

## 📱 OPTION 3: Deploy ke Cloud (Heroku / Render)

### Deploy Backend ke Render.com

```bash
# 1. Create account di https://render.com
# 2. Connect GitHub repo
# 3. Create New Web Service:
#    - Root directory: be
#    - Build command: npm install
#    - Start command: npm start
#    - Add environment variables:
#      DB_HOST = your_mysql_host
#      DB_USER = root
#      DB_PASSWORD = #Pagelaran2025
#      FRONTEND_URL = https://your-frontend.com
#      JWT_SECRET = random_string_32_chars

# 4. Deploy!
```

### Deploy Frontend ke Vercel / Netlify

#### Vercel:

```bash
npm install -g vercel
cd fe
vercel --prod
```

#### Netlify:

```bash
npm install -g netlify-cli
cd fe
netlify deploy --prod --dir=dist
```

---

## 🌐 OPTION 4: VPS/Server Sendiri (Ubuntu 20.04+)

### A. Initial Setup

```bash
# SSH ke server
ssh user@your-server.com

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MySQL
sudo apt install -y mysql-server

# Install PM2 (process manager)
sudo npm install -g pm2

# Install Nginx (web server)
sudo apt install -y nginx
```

### B. Deploy Code

```bash
# Create app directory
mkdir -p ~/tree-family
cd ~/tree-family

# Clone repository atau copy files
git clone your-repo .

# Atau manual copy via SCP:
# scp -r . user@server:/home/user/tree-family
```

### C. Configure & Start

```bash
# Backend setup
cd be
npm install
npm run migrate

# Start dengan PM2
pm2 start src/index.js --name "tree-family-api"
pm2 save
pm2 startup
sudo systemctl restart pm2-root

# Frontend build
cd ../fe
npm install
npm run build

# Copy ke Nginx
sudo cp -r dist/* /var/www/html/
```

### D. Configure Nginx

```bash
# Edit Nginx config
sudo nano /etc/nginx/sites-available/default
```

Paste ini:

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;

    root /var/www/html;
    index index.html index.htm index.nginx-debian.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5200/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

Restart Nginx:

```bash
sudo systemctl restart nginx
```

---

## ✅ DEPLOYMENT CHECKLIST

### Pre-Deployment

- [ ] Node.js v16+ terinstall
- [ ] npm/yarn terinstall
- [ ] MySQL server running
- [ ] `.env` files sudah dikonfigurasi
- [ ] Backend migration sudah jalan (npm run migrate)

### Testing Lokal

```bash
# Terminal 1: Backend
cd be && npm run dev

# Terminal 2: Frontend
cd fe && npm run dev

# Buka http://localhost:5173
# Test login dengan credentials yang disediakan
```

### Production Checklist

- [ ] Backend startup error-free
- [ ] Frontend build success
- [ ] Database migration complete
- [ ] Environment variables correct
- [ ] SSL/HTTPS configured
- [ ] Firewall rules allowing traffic
- [ ] Backup system in place
- [ ] Monitoring tools setup

---

## 🧪 TEST CREDENTIALS

```
Email: silsilah.keluarga.sp@gmail.com
Password: #Pagelaran2025
```

### Testing API Backend

```bash
curl -X POST http://localhost:5200/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "silsilah.keluarga.sp@gmail.com",
    "password": "#Pagelaran2025"
  }'
```

Expect response dengan token JWT.

---

## 📊 MONITORING & LOGS

### Docker

```bash
# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Container status
docker-compose ps

# Stop all
docker-compose down
```

### PM2

```bash
# View all processes
pm2 list

# Real-time monitoring
pm2 monit

# View logs
pm2 logs tree-family-api

# Restart
pm2 restart tree-family-api
```

### Nginx

```bash
# Check status
sudo systemctl status nginx

# View logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Test config
sudo nginx -t

# Restart
sudo systemctl restart nginx
```

---

## 🔧 TROUBLESHOOTING

### Backend tidak bisa konek database

```bash
# Check MySQL running
mysql -u root -p

# Verify .env
cat be/.env

# Check port 3306
netstat -tuln | grep 3306

# Restart MySQL
sudo systemctl restart mysql
```

### Frontend blank page

```bash
# Clear build
rm -rf fe/dist
npm run build

# Check .env VITE_API_URL
cat fe/.env

# Clear browser cache (Ctrl+Shift+Delete)
```

### Docker error "port already in use"

```bash
# Stop existing containers
docker-compose down

# Or kill process
sudo lsof -i :3000
sudo kill -9 <PID>
```

---

## 🔒 SECURITY TIPS

1. **Change passwords** sebelum production:

   - Database password
   - JWT_SECRET

2. **Enable SSL/HTTPS**:

   - Gunakan Let's Encrypt
   - `sudo certbot certonly --nginx`

3. **Backup database regularly**:

   ```bash
   mysqldump -u root -p tree_family_db > backup.sql
   ```

4. **Update dependencies**:

   ```bash
   npm update
   npm audit fix
   ```

5. **Set proper permissions**:
   ```bash
   chmod 600 be/.env
   chmod 600 fe/.env
   ```

---

## 📞 QUICK HELP

Perintah berguna:

```bash
# View all environment variables
cat be/.env
cat fe/.env

# Make scripts executable
chmod +x *.sh

# Check Node version
node --version
npm --version

# Check ports
sudo lsof -i -P -n | grep LISTEN

# Kill process on port
sudo kill -9 $(lsof -t -i:5200)  # Port 5200
sudo kill -9 $(lsof -t -i:3000)  # Port 3000
```

---

**Status: ✅ SIAP DEPLOYMENT**

Pilih salah satu dari 4 opsi di atas dan mulai!

Jika ada pertanyaan, refer ke `DEPLOYMENT_GUIDE.md` untuk detail lengkap.

**Happy Deploying! 🎉**
