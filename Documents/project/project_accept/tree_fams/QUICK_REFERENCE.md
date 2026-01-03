# 📋 Quick Reference Card - Silsilah Keluarga

## 🚀 Quick Start Commands

### Initial Setup (One Time)

```bash
# macOS/Linux
bash setup.sh

# Windows
setup.bat
```

### Database Migration (One Time)

```bash
cd be
npm run migrate
```

### Start Development Servers

```bash
# Terminal 1 - Backend
cd be
npm start          # Production
npm run dev        # Development with auto-reload

# Terminal 2 - Frontend
cd fe
npm start
```

### Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5200
- **Admin Dashboard**: http://localhost:3000/admin

## 🔐 Default Credentials

```
Email:    admin@family.com
Password: admin123
```

## 📂 Directory Structure

```
tree_fams/
├── be/                    Backend (Express.js)
│   ├── src/
│   │   ├── config/       Configuration files
│   │   ├── controllers/  Business logic
│   │   ├── middleware/   Auth & other middleware
│   │   ├── models/       Database models
│   │   ├── routes/       API routes
│   │   ├── database/     DB migrations
│   │   └── index.js      Main server
│   ├── package.json
│   ├── .env             Database config
│   └── .env.example     Template
├── fe/                    Frontend (React)
│   ├── src/
│   │   ├── components/  Reusable components
│   │   ├── contexts/    Auth context
│   │   ├── pages/       Page components
│   │   ├── services/    API calls
│   │   ├── hooks/       Custom hooks
│   │   ├── App.jsx      Main app
│   │   └── index.js     Entry point
│   └── package.json
├── SETUP_GUIDE.md        Complete setup guide
├── DEVELOPMENT.md        Development guide
├── IMPLEMENTATION_SUMMARY.md
└── This file
```

## 🔌 API Endpoints Cheatsheet

### Auth (Public)

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me              ← requires token
```

### Users (Public)

```
GET    /api/users
GET    /api/users/:id
```

### Admin (Protected)

```
GET    /api/admin/users          ← admin only
GET    /api/admin/users/:id      ← admin only
POST   /api/admin/users          ← admin only
PUT    /api/admin/users/:id      ← admin only
DELETE /api/admin/users/:id      ← admin only
PUT    /api/admin/users/:id/role ← admin only
GET    /api/admin/stats          ← admin only
```

## 🔄 Typical Workflows

### Adding a New User

```
1. Login: http://localhost:3000/login
2. Go to: http://localhost:3000/admin
3. Click: "+ Tambah Pengguna"
4. Fill form (Nama, Email, Gender, Role)
5. Click: "Tambah"
```

### Viewing Family Tree

```
1. Login
2. Go to: http://localhost:3000
3. Click: "🌳 Lihat Tree" toggle
4. See interactive visualization
5. Click nodes to view details
```

### Managing User

```
1. Go to Admin Dashboard
2. Find user in table
3. Click "Edit" to modify
4. Click "Hapus" to delete
5. Click role dropdown to change role
```

### Viewing Family Connections

```
1. Click user card or node
2. View detail page
3. Click family members (parents, children, etc.)
4. Navigate through relationships
```

## 🛠️ Troubleshooting Quick Fixes

### Port Already in Use

```bash
# Kill process on port 5200
lsof -ti:5200 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :5200
taskkill /PID <PID> /F
```

### Database Connection Error

```
1. Check MySQL is running
2. Verify .env credentials
3. Check DB_HOST, DB_USER, DB_PASSWORD
4. Run: npm run migrate
```

### Login Not Working

```
1. Use: admin@family.com / admin123
2. Check backend running (http://localhost:5200)
3. Check browser console for errors
4. Verify .env JWT_SECRET is set
```

### Frontend Not Loading

```
1. Clear browser cache
2. Kill npm process: Ctrl+C
3. npm start again
4. Check http://localhost:3000
```

## 📊 Database Quick Commands

### Connect to MySQL

```bash
mysql -u root -p root1234
```

### Inside MySQL

```sql
-- Show databases
SHOW DATABASES;

-- Use family database
USE tree_family_db;

-- Show tables
SHOW TABLES;

-- View all users
SELECT * FROM users;

-- View user with ID
SELECT * FROM users WHERE id = 1;

-- Check admin users
SELECT * FROM users WHERE role = 'admin';

-- Count users
SELECT COUNT(*) FROM users;
```

## 🎨 Main Pages & Routes

| Page            | Route          | Auth Required | Role   |
| --------------- | -------------- | ------------- | ------ |
| Login           | `/login`       | No            | Public |
| Home            | `/`            | Yes           | User+  |
| Family Tree     | `/family-tree` | Yes           | User+  |
| User Detail     | `/user/:id`    | Yes           | User+  |
| Admin Dashboard | `/admin`       | Yes           | Admin  |

## 📦 Key Technologies

### Backend

- **Express.js** - REST API framework
- **MySQL2** - Database driver
- **JWT** - Authentication tokens
- **Bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

### Frontend

- **React** - UI framework
- **React Router** - Navigation
- **Axios** - HTTP client
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **HTML5 Canvas** - 2D visualization

## 🔑 Environment Variables

### Backend (.env)

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root1234
DB_NAME=tree_family_db
JWT_SECRET=your-secret-key
PORT=5200
```

### Optional Settings

```
NODE_ENV=development
SESSION_EXPIRY=604800000
CORS_ORIGIN=http://localhost:3000
API_RATE_LIMIT=100
```

## 💡 Tips & Tricks

### Speed Up Development

```bash
# Use nodemon for auto-reload
cd be && npm run dev

# Use React Fast Refresh
cd fe && npm start
```

### Debug Authentication

```javascript
// In browser console
localStorage.getItem("token");
JSON.parse(localStorage.getItem("user"));
```

### Check API Calls

```bash
# Install curl or use Postman
curl -X GET http://localhost:5200/api/users

# With token
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:5200/api/admin/users
```

### Reset Database

```bash
# Drop and recreate
cd be
npm run migrate
```

## 📱 Responsive Design

- **Mobile**: Full-screen optimized
- **Tablet**: 2-column layouts
- **Desktop**: 3+ column layouts
- All components adapt automatically

## ⚡ Performance Tips

1. **Database**: Indexed on email, role, ayahId, ibuId, pasanganId
2. **Frontend**: Canvas rendering at 60fps
3. **API**: Gzip compression enabled
4. **Caching**: JWT tokens in localStorage
5. **Lazy Loading**: Component code splitting ready

## 🔒 Security Reminders

- ✅ Change JWT_SECRET in production
- ✅ Update admin password after first login
- ✅ Use HTTPS in production
- ✅ Enable database backups
- ✅ Implement rate limiting
- ✅ Monitor failed login attempts
- ✅ Regular security audits

## 📞 Support Resources

- **Setup**: See `SETUP_GUIDE.md`
- **Development**: See `DEVELOPMENT.md`
- **Implementation**: See `IMPLEMENTATION_SUMMARY.md`
- **Backend**: `be/src/` directory
- **Frontend**: `fe/src/` directory

## 🎯 Project Status

- ✅ Authentication system - COMPLETE
- ✅ Role-based access control - COMPLETE
- ✅ Admin dashboard - COMPLETE
- ✅ 2D family tree visualization - COMPLETE
- ✅ User detail pages - COMPLETE
- ✅ Family navigation - COMPLETE
- ✅ Documentation - COMPLETE

## 🚀 Ready to Deploy!

Once verified locally:

1. Update JWT_SECRET in .env
2. Update database credentials for production
3. Set NODE_ENV=production
4. Deploy backend to server
5. Build frontend: npm run build
6. Deploy frontend to hosting

---

**Last Updated**: 2025
**Version**: 1.0.0
**Status**: Production Ready ✨
