# 🎓 Getting Started Guide - Panduan Lengkap

Panduan step-by-step untuk memulai Tree Family Project dari nol. Cocok untuk developer pemula maupun experienced.

---

## ⚡ TL;DR (Super Quick Start)

Ingin start sekarang? Cukup ini:

```bash
# 1. Setup backend
cd be
npm install
npm run migrate
npm run dev

# 2. Di terminal baru, setup frontend
cd fe
npm install
npm run dev

# 3. Open browser
http://localhost:3000
```

Done! ✅

---

## 🏃 5-Minute Quick Start

### Step 1: Prerequisites ✅

Pastikan sudah install:

- **Node.js** (v14 or higher): https://nodejs.org/
- **npm** atau **yarn**
- **MySQL** (v5.7 or higher): https://www.mysql.com/

```bash
# Verify installations
node --version    # Should be >= 14.0.0
npm --version     # Should be >= 6.0.0
mysql --version   # Should be installed
```

### Step 2: Backend Setup 🔧

```bash
# Go to backend folder
cd be

# Install dependencies
npm install

# Create .env file (copy dari .env.example)
cp .env.example .env

# Edit .env dengan database credentials Anda
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password

# Create database dan tables
npm run migrate

# Start backend server
npm run dev
```

✅ Backend running pada http://localhost:5200

### Step 3: Frontend Setup 🎨

```bash
# Di terminal baru, go to frontend folder
cd fe

# Install dependencies
npm install

# Start frontend server
npm run dev
```

✅ Frontend running pada http://localhost:3000

### Step 4: Start Using 🚀

Buka browser → http://localhost:3000

Selesai! Aplikasi sudah siap digunakan.

---

## 📚 Understanding the Project Structure

```
tree_fams/
├── be/                    # Backend (Node.js + Express)
│   ├── src/
│   │   ├── config/        # Database & app config
│   │   ├── models/        # Database models
│   │   ├── controllers/   # Business logic
│   │   ├── routes/        # API endpoints
│   │   ├── validators/    # Input validation
│   │   ├── utils/         # Helper functions
│   │   └── index.js       # Server entry
│   ├── database/
│   │   └── createDatabase.js  # Auto-create DB
│   └── package.json
│
├── fe/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Pages/routes
│   │   ├── services/      # API calls
│   │   ├── hooks/         # Custom hooks
│   │   ├── utils/         # Helper functions
│   │   ├── styles/        # CSS & Tailwind
│   │   ├── types/         # TypeScript types
│   │   └── App.jsx        # Main component
│   ├── index.html
│   └── package.json
│
└── Documentation files (README.md, etc)
```

**Key Points:**

- Backend handles database & API
- Frontend handles UI & user interaction
- Communication via REST API endpoints

---

## 🔄 Workflow Overview

Berikut cara aplikasi bekerja:

```
User (Browser)
     ↓
React App (Frontend)
     ↓
Axios API Call
     ↓
Express Server (Backend)
     ↓
Database (MySQL)
     ↓
Response JSON
     ↓
Update UI
     ↓
User sees result
```

---

## 📱 Main Features

### 1. User Management

- **Create User** - Tambah anggota keluarga baru
- **View Users** - Lihat daftar semua anggota
- **Edit User** - Update informasi anggota
- **Delete User** - Hapus anggota dari database

### 2. Relationships

- **Parents** (Ayah, Ibu) - Define orangtua
- **Spouse** (Pasangan) - Define spouse
- **Children** (Anak) - Define children
- **Auto Siblings** - Siblings auto-calculated
- **Auto Generation** - Generasi auto-calculated

### 3. Advanced Features

- **Family Tree** - View complete family structure
- **Age Calculation** - Auto-calculated dari DOB
- **Death Date** - Support untuk tracking wafat
- **Export Database** - Export data ke JSON
- **Search** - Cari anggota keluarga

---

## 🎯 Common Tasks

### Task 1: Add New User

1. Click "+" atau "Add User" button
2. Fill form dengan data:
   - Nama Depan (first name)
   - Nama Belakang (last name)
   - Gender (Pria/Wanita)
   - Tanggal Lahir (DD-MM-YYYY format)
   - Optional: Tempat Lahir, Alamat, Pekerjaan
3. Click Save
4. User akan muncul di list

### Task 2: Link Family Relationships

1. Click user card untuk buka detail
2. Scroll ke "Relationships" section
3. Click "Edit"
4. Select parents, spouse, children dari dropdown
5. Click Save
6. Relationships akan auto-update

### Task 3: View Family Tree

1. Click any user card
2. Lihat "Family Relationships" di page
3. Klik nama keluarga untuk navigate
4. Generasi auto-shown (Gen 1, Gen 2, etc)
5. Umur auto-calculated

### Task 4: Search User

1. Gunakan search bar di top
2. Type nama depan atau nama belakang
3. Results akan auto-filter
4. Click result untuk view detail

### Task 5: Export Database

1. Click menu → Export
2. Database akan di-download sebagai JSON
3. Simpan file untuk backup

---

## 🔑 Important Concepts

### Date Format

Semua tanggal harus dalam format **DD-MM-YYYY**

```javascript
01-12-1990  ✅ Correct
1990-12-01  ❌ Wrong
12/01/1990  ❌ Wrong
```

### Gender Values

Gender hanya bisa:

- `Pria` (male)
- `Wanita` (female)

### IDs

- User IDs adalah UUID (auto-generated)
- Jangan ubah secara manual
- Used untuk relationships & lookups

### Relationships

Relationships adalah **two-way automatic**:

- Jika A adalah ayah dari B
- Otomatis B adalah anak dari A
- Jangan duplicate manual entry

### Generation (Generasi)

Dihitung otomatis berdasarkan parents:

- Gen 0 = Root (no parents)
- Gen 1 = Children of Gen 0
- Gen 2 = Children of Gen 1
- And so on...

---

## 🛠️ Customization

### Change Frontend Title

Edit `fe/index.html`:

```html
<title>Silsilah Keluarga</title>
```

### Change Colors

Edit `fe/tailwind.config.js`:

```javascript
colors: {
  primary: '#3B82F6',    // Blue
  secondary: '#10B981',  // Green
  danger: '#EF4444'      // Red
}
```

### Change API Port

Edit `be/.env`:

```
PORT=5001  # Default is 5200
```

### Change Database

Edit `be/.env`:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=tree_family
```

---

## 🐛 Common Issues & Quick Fixes

### "Port 5200 already in use"

```bash
# Kill the process
lsof -ti:5200 | xargs kill -9

# Or use different port
# Edit be/.env: PORT=5001
```

### "Cannot connect to MySQL"

```bash
# Make sure MySQL is running
mysql -u root -p

# Check credentials in be/.env
# Make sure database 'tree_family' exists
SHOW DATABASES;
```

### "Cannot find module 'express'"

```bash
# Install dependencies
cd be
npm install
```

### "Frontend can't connect to backend API"

```bash
# Make sure backend is running
curl http://localhost:5200/api/health

# Check CORS in be/src/index.js
# Should have: app.use(cors({ origin: 'http://localhost:3000' }));
```

### "TailwindCSS not working"

```bash
# Rebuild CSS
npm run dev

# Clear cache
rm -rf node_modules
npm install
npm run dev
```

---

## 📖 Next Steps

### For Learning

1. Read [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md) - Understand file organization
2. Read [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - See all available endpoints
3. Check source code comments - Banyak penjelasan di kode

### For Development

1. Use [DEVELOPMENT_CHECKLIST.md](DEVELOPMENT_CHECKLIST.md) - Track tasks
2. Follow [SECURITY_AND_BEST_PRACTICES.md](SECURITY_AND_BEST_PRACTICES.md) - Code standards
3. Reference [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - When building features

### For Optimization

1. Check [PERFORMANCE_OPTIMIZATION.md](PERFORMANCE_OPTIMIZATION.md)
2. Profile your code
3. Optimize bottlenecks

### For Debugging

1. Bookmark [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
2. Check browser console (F12)
3. Check terminal logs
4. Use DevTools

---

## 🎓 Learning Path

### Week 1: Setup & Basics

- [ ] Day 1: Install & run project
- [ ] Day 2: Understand folder structure
- [ ] Day 3: Create test users
- [ ] Day 4: Link relationships
- [ ] Day 5: Explore UI features

### Week 2: Backend Development

- [ ] Day 1: Read API documentation
- [ ] Day 2: Understand models & controllers
- [ ] Day 3: Try API endpoints with Postman
- [ ] Day 4: Study database schema
- [ ] Day 5: Add new field to database

### Week 3: Frontend Development

- [ ] Day 1: Read component structure
- [ ] Day 2: Study React hooks
- [ ] Day 3: Modify a component
- [ ] Day 4: Add a new page
- [ ] Day 5: Style with TailwindCSS

### Week 4: Advanced

- [ ] Day 1: Security review
- [ ] Day 2: Performance optimization
- [ ] Day 3: Add new feature
- [ ] Day 4: Write tests
- [ ] Day 5: Deploy to production

---

## 🚀 Development Commands

### Backend Commands

```bash
cd be

# Install dependencies
npm install

# Create database & tables
npm run migrate

# Start development server
npm run dev

# Start with nodemon (auto-restart on changes)
npm run start

# View logs
npm run logs
```

### Frontend Commands

```bash
cd fe

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Database Commands

```bash
# Connect to MySQL
mysql -u root -p

# List databases
SHOW DATABASES;

# Use database
USE tree_family;

# View all users
SELECT * FROM users;

# Count users
SELECT COUNT(*) FROM users;

# Backup database
mysqldump -u root -p tree_family > backup.sql

# Restore database
mysql -u root -p tree_family < backup.sql
```

---

## 🔐 Security Basics

Sebelum production:

1. **Change default credentials**

   - MySQL password
   - Database name (optional)
   - API keys (if added)

2. **Enable HTTPS**

   - Use SSL certificates
   - Configure secure headers
   - Set secure cookies

3. **Validate inputs**

   - Server-side validation ✅ (sudah ada)
   - Client-side validation ✅ (sudah ada)
   - Sanitize database queries ✅ (sudah ada)

4. **Protect data**

   - Never hardcode credentials
   - Use environment variables ✅ (sudah ada)
   - Backup database regularly
   - Monitor access logs

5. **Update dependencies**
   - Keep npm packages updated
   - Run `npm audit` regularly
   - Fix vulnerabilities ASAP

---

## 📞 Getting Help

### If You're Stuck

1. **Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)**

   - Most common issues are documented
   - Solutions provided for each

2. **Check source code comments**

   - Banyak penjelasan di kode
   - Understand logic ini

3. **Read API documentation**

   - See expected request/response formats
   - Check status codes & errors

4. **Check browser console**

   - Press F12 → Console tab
   - Look for JavaScript errors
   - Network tab untuk API calls

5. **Check terminal logs**
   - Backend errors akan logged
   - Check timestamps untuk context

### Resources

- **Node.js Docs**: https://nodejs.org/docs/
- **Express Docs**: https://expressjs.com/
- **React Docs**: https://react.dev/
- **MySQL Docs**: https://dev.mysql.com/doc/
- **TailwindCSS Docs**: https://tailwindcss.com/docs/
- **Stack Overflow**: https://stackoverflow.com/

---

## ✅ Checklist

Before consider project "ready":

Backend:

- [ ] Server starts without errors
- [ ] Database connects successfully
- [ ] All 7 API endpoints respond
- [ ] CORS working with frontend
- [ ] Validation working
- [ ] Error handling working

Frontend:

- [ ] Page loads without errors
- [ ] Can create new users
- [ ] Can view users list
- [ ] Can search users
- [ ] Can edit users
- [ ] Can delete users
- [ ] Responsive on mobile
- [ ] Styling looks good

Full Stack:

- [ ] Create → Read → Update → Delete all working
- [ ] Relationships working correctly
- [ ] Age calculation working
- [ ] Generation calculation working
- [ ] No console errors
- [ ] No network errors
- [ ] Database backup ready

---

## 🎉 Congratulations!

Anda sudah setup Tree Family Project! 🎊

### Yang Bisa Anda Lakukan Sekarang:

✅ Create & manage family members
✅ Link family relationships
✅ View family tree
✅ Search & filter users
✅ Export database
✅ Develop new features
✅ Customize styling
✅ Deploy to production

### Selanjutnya:

1. **Explore the code** - Understand how it works
2. **Add features** - Build what you need
3. **Customize** - Make it your own
4. **Share** - Share dengan team/family
5. **Maintain** - Keep it updated & secure

---

## 📚 Full Documentation

Untuk informasi lebih detail, check:

- [DOCUMENTATION_MAP.md](DOCUMENTATION_MAP.md) - Guide ke semua docs
- [README.md](README.md) - Project overview
- [INSTALLATION.md](INSTALLATION.md) - Detailed setup
- [API_DOCUMENTATION.md](API_DOCUMENTATION.md) - API reference
- [FOLDER_STRUCTURE.md](FOLDER_STRUCTURE.md) - File organization
- [SECURITY_AND_BEST_PRACTICES.md](SECURITY_AND_BEST_PRACTICES.md) - Code standards
- [PERFORMANCE_OPTIMIZATION.md](PERFORMANCE_OPTIMIZATION.md) - Optimization
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Problem solving
- [DEVELOPMENT_CHECKLIST.md](DEVELOPMENT_CHECKLIST.md) - Task tracking

---

**Created**: 23 December 2025  
**Version**: 1.0  
**Status**: Ready for Learning

**Happy Coding!** 🚀

---

### Quick Command Reference

```bash
# Backend
cd be && npm install && npm run migrate && npm run dev

# Frontend (new terminal)
cd fe && npm install && npm run dev

# Open browser
http://localhost:3000

# Database management
mysql -u root -p tree_family

# Kill stuck processes
lsof -ti:5200 | xargs kill -9    # Port 5200
lsof -ti:3000 | xargs kill -9    # Port 3000

# View logs
tail -f server.log

# Backup database
mysqldump -u root -p tree_family > backup-$(date +%Y%m%d).sql
```

**Semua siap! Selamat mengembangkan!** 🎓
