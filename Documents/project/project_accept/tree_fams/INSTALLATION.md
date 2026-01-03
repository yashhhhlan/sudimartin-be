# 📦 Installation & Setup Guide

Panduan lengkap untuk setup project Tree Family dari nol sampai bisa jalan.

---

## 🔧 Prerequisites

Pastikan sudah terinstall:

- **Node.js** v16+ ([Download](https://nodejs.org))
- **npm** atau **yarn** (biasanya include dengan Node.js)
- **MySQL** 5.7+ ([Download](https://dev.mysql.com/downloads/mysql/))
- **Git** (optional, untuk version control)
- **Code Editor**: VS Code, WebStorm, atau editor pilihan Anda

### Verifikasi Installation

```bash
# Check Node.js
node --version      # Seharusnya v16.x atau lebih tinggi

# Check npm
npm --version       # Seharusnya 7.x atau lebih tinggi

# Check MySQL
mysql --version     # Seharusnya MySQL 5.7 atau lebih tinggi
```

---

## 🗄️ Setup Database

### 1. Start MySQL Server

**macOS (dengan Homebrew):**

```bash
brew services start mysql
# Atau
mysql.server start
```

**Windows:**

- Buka Task Scheduler atau Services
- Cari MySQL dan start

**Linux:**

```bash
sudo systemctl start mysql
```

### 2. Login MySQL

```bash
mysql -u root -p
# Password: (kosongkan jika tidak ada password)
```

### 3. Create Database & User (Optional)

```sql
CREATE DATABASE tree_family_db;

CREATE USER 'tree_user'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON tree_family_db.* TO 'tree_user'@'localhost';
FLUSH PRIVILEGES;

EXIT;
```

---

## 🚀 Backend Setup

### 1. Navigate ke Backend Folder

```bash
cd tree_fams/be
```

### 2. Install Dependencies

```bash
npm install
```

**Output seharusnya:**

```
added 123 packages in 15.23s
```

### 3. Setup Environment Variables

```bash
# Copy template
cp .env.example .env

# Edit .env dengan text editor
# nano .env         (Linux/macOS)
# notepad .env      (Windows)
```

**Isi .env:**

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=tree_family_db
DB_PORT=3306

NODE_ENV=development
PORT=5200

FRONTEND_URL=http://localhost:3000
```

**Jika membuat user baru di step 3:**

```
DB_HOST=localhost
DB_USER=tree_user
DB_PASSWORD=password123
DB_NAME=tree_family_db
DB_PORT=3306

NODE_ENV=development
PORT=5200

FRONTEND_URL=http://localhost:3000
```

### 4. Create Database & Tables

```bash
npm run migrate
# Atau
node src/database/createDatabase.js
```

**Output seharusnya:**

```
✓ Connected to MySQL Server
✓ Database 'tree_family_db' created/exists
✓ Table users created/exists

✨ Database setup completed successfully!
```

### 5. (Optional) Import Sample Data

```bash
mysql -u root -p tree_family_db < SAMPLE_DATA.json
# Note: Ini untuk seed data, lihat dokumentasi untuk import JSON
```

### 6. Run Development Server

```bash
npm run dev
```

**Output seharusnya:**

```
✨ Backend Server Running on http://localhost:5200
📝 API Documentation: http://localhost:5200/api
🏥 Health Check: http://localhost:5200/api/health
```

### ✅ Verify Backend

Buka browser ke:

```
http://localhost:5200/api/health
```

Seharusnya return:

```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2025-01-20T10:30:00.000Z"
}
```

---

## 🎨 Frontend Setup

### 1. Navigate ke Frontend Folder (Terminal Baru)

```bash
cd tree_fams/fe
```

### 2. Install Dependencies

```bash
npm install
```

**Output seharusnya:**

```
added 456 packages in 45.23s
```

### 3. (Optional) Setup Environment

Untuk menggunakan API custom URL, buat file `.env.local`:

```bash
VITE_API_URL=http://localhost:5200/api
```

### 4. Run Development Server

```bash
npm run dev
```

**Output seharusnya:**

```
  ➜  Local:   http://localhost:5200
  ➜  press h to show help
```

Jika port 5200 sudah dipakai, akan suggest port lain (3000, 3001, dll).

### 5. Open Browser

```
http://localhost:3000
```

Seharusnya melihat halaman Family Tree dengan interface yang cantik.

---

## ✅ Verification Checklist

Pastikan semua ini sudah berjalan:

- [ ] Backend server berjalan di `http://localhost:5200`
- [ ] Frontend server berjalan di `http://localhost:3000`
- [ ] Database MySQL terkoneksi
- [ ] Bisa akses `/api/health` dan return JSON
- [ ] Bisa buka frontend di browser tanpa error

---

## 🧪 Testing

### Test Backend dengan cURL

```bash
# Get all users (seharusnya empty array awal)
curl http://localhost:5200/api/users

# Create user
curl -X POST http://localhost:5200/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "namaDepan": "Test User",
    "namaBelakang": "Tester",
    "gender": "Pria",
    "tanggalLahir": "01-01-1990",
    "isRoot": true
  }'
```

### Test Frontend

1. Buka `http://localhost:3000`
2. Klik "Tambah Anggota Keluarga"
3. Isi form dan submit
4. User seharusnya muncul di grid

---

## 🐛 Troubleshooting

### Error: Cannot find module 'express'

**Solution:**

```bash
cd be
npm install
```

### Error: connect ECONNREFUSED localhost:3306

**Solution:**

```bash
# Check MySQL running
mysql -u root -p
# atau start MySQL service
brew services start mysql  # macOS
```

### Error: Port 5200 already in use

**Solution:**

```bash
# Option 1: Change port in .env
# PORT=5001

# Option 2: Kill process using port
# macOS/Linux:
lsof -i :5200 | grep LISTEN | awk '{print $2}' | xargs kill -9

# Windows:
netstat -ano | findstr :5200
taskkill /PID <PID> /F
```

### Error: Cannot GET /api/users

**Solution:**

```bash
# Check backend is running
# Check CORS is enabled
# Check frontend is pointing to correct API URL
# Check .env FRONTEND_URL matches frontend URL
```

### Error: CORS issue on frontend

**Solution:**
Ensure in backend `be/src/index.js`:

```javascript
app.use(
  cors({
    origin: "http://localhost:3000", // or process.env.FRONTEND_URL
    credentials: true,
  })
);
```

### Frontend shows blank page

**Solution:**

```bash
# Check console for errors (F12)
# Check if backend API is running
# Clear browser cache (Ctrl+Shift+Delete)
# Restart both servers
```

---

## 📁 Folder Structure Quick Reference

```
tree_fams/
├── be/                  # Backend
│   ├── src/
│   │   ├── config/      # DB config, constants
│   │   ├── controllers/ # Business logic
│   │   ├── models/      # Database models
│   │   ├── routes/      # API routes
│   │   ├── utils/       # Helper functions
│   │   └── index.js     # Main app
│   ├── .env.example     # Environment template
│   └── package.json
│
├── fe/                  # Frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API calls
│   │   ├── utils/       # Helper functions
│   │   └── App.jsx      # Main component
│   ├── index.html       # HTML template
│   └── package.json
│
└── README.md            # Main documentation
```

---

## 🔄 Daily Development Workflow

### Terminal 1: Backend

```bash
cd tree_fams/be
npm run dev
# Output: Server running on http://localhost:5200
```

### Terminal 2: Frontend

```bash
cd tree_fams/fe
npm run dev
# Output: Local: http://localhost:3000
```

### Terminal 3: MySQL (jika diperlukan)

```bash
mysql -u root -p
# Masukkan password
# Type: show databases;
# Exit: EXIT;
```

---

## 📦 Installing Additional Packages

### Backend

```bash
cd be
npm install <package-name>
# Contoh:
# npm install lodash
# npm install moment
```

### Frontend

```bash
cd fe
npm install <package-name>
# Contoh:
# npm install framer-motion
# npm install zustand
```

---

## 🚀 Building for Production

### Backend

Sudah ready to deploy, tinggal:

```bash
cd be
npm install
npm start  # or NODE_ENV=production npm start
```

### Frontend

```bash
cd fe
npm install
npm run build
# Output: dist/ folder - upload ke hosting
```

---

## 📚 Useful Commands

### Backend

```bash
npm run dev       # Run with hot reload
npm start         # Run production
npm run migrate   # Create database
```

### Frontend

```bash
npm run dev       # Run development
npm run build     # Build for production
npm run preview   # Preview build locally
```

### MySQL

```bash
mysql -u root -p                    # Connect
show databases;                     # List DB
use tree_family_db;                 # Select DB
show tables;                        # List tables
SELECT * FROM users;                # Query users
```

---

## 🎓 Next Steps

1. **Read Documentation**

   - [API Documentation](./API_DOCUMENTATION.md)
   - [Backend README](./be/README.md)
   - [Frontend README](./fe/README.md)

2. **Understand Code**

   - Review backend models & controllers
   - Review frontend components & pages
   - Understand API flow

3. **Add Features**

   - Search functionality
   - Export/Import features
   - Family tree visualization
   - Advanced filtering

4. **Deploy**
   - Deploy backend to cloud
   - Deploy frontend to CDN
   - Setup database hosting

---

## 📞 Getting Help

1. Check [Troubleshooting](#troubleshooting) section
2. Read error messages carefully
3. Check browser console (F12)
4. Check server terminal logs
5. Check MySQL status
6. Ask in repository issues

---

## ✅ Success Checklist

Jika semua checkbox ini sudah ✅, project siap untuk development:

- [ ] Node.js v16+ terinstall
- [ ] MySQL running
- [ ] Backend folder punya .env
- [ ] `npm run migrate` berhasil
- [ ] Backend berjalan (`npm run dev`)
- [ ] Frontend berjalan (`npm run dev`)
- [ ] Bisa akses http://localhost:3000
- [ ] Bisa create user dari UI
- [ ] User muncul di list

---

**Selamat! Project Tree Family siap digunakan! 🎉**

Untuk pertanyaan lebih lanjut, baca README.md di root folder atau lihat API_DOCUMENTATION.md untuk detail API.
