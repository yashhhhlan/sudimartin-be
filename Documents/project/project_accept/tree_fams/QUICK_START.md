# 🚀 Quick Start Guide - Family Tree Application

## Prerequisites

- **Node.js** v14+ installed
- **MySQL** server running
- **npm** or **yarn** installed

---

## 🔧 Setup Instructions

### Step 1: Clone/Extract Project

```bash
cd /Users/m/Documents/project/project_accept/tree_fams
```

### Step 2: Install Dependencies

#### Backend

```bash
cd be
npm install
```

#### Frontend

```bash
cd ../fe
npm install
```

### Step 3: Configure Environment Variables

#### Backend (.env)

Create `be/.env` file:

```env
PORT=5200
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root1234
DB_NAME=tree_family_db
FRONTEND_URL=http://localhost:3000
JWT_SECRET=your_secret_key_here_change_in_production
```

#### Frontend (.env)

Create `fe/.env` file:

```env
REACT_APP_API_URL=http://localhost:5200
```

### Step 4: Initialize Database

```bash
cd be
npm run migrate
```

This will:

- Create database `tree_family_db`
- Create all tables (users, families, family_members, relationships)
- Create default admin user

---

## ▶️ Running the Application

### Terminal 1: Backend Server

```bash
cd be
npm start
```

Expected output:

```
✓ Server is running on port 5200
✓ Database connected
```

### Terminal 2: Frontend Development Server

```bash
cd fe
npm start
```

Expected output:

```
✓ Webpack compiled successfully
✓ App running on http://localhost:3000
```

---

## 🔑 Default Admin Credentials

**Email**: `admin@family.com`  
**Password**: `admin123`

---

## 📍 Important URLs

| Page             | URL                                       | Access         |
| ---------------- | ----------------------------------------- | -------------- |
| Login            | `http://localhost:3000/login`             | Public         |
| Home             | `http://localhost:3000/`                  | Login Required |
| Admin Dashboard  | `http://localhost:3000/admin`             | Admin Only     |
| Family Dashboard | `http://localhost:3000/families`          | Admin Only     |
| Family Editor    | `http://localhost:3000/family/:id/editor` | Admin Only     |

---

## 🎯 First-Time Usage Workflow

### 1. Login

```
URL: http://localhost:3000/login
Email: admin@family.com
Password: admin123
```

### 2. Create Your First Family

```
1. Click "Kelola Keluarga" or go to /families
2. Click "Buat Keluarga Baru"
3. Enter family name (e.g., "Keluarga Sutrisno")
4. Choose privacy type (PRIVATE/PUBLIC)
5. Click "Buat Keluarga"
```

### 3. Add Family Members

```
1. Click "Edit" on your family card
2. Click "Add Member" button in sidebar
3. Enter member details:
   - Nama Depan (First Name) *
   - Nama Belakang (Last Name)
   - Gender (Pria/Wanita)
   - Generation (Root=0, Children=1, etc.)
4. Click "Add Member"
```

### 4. Edit Member Information

```
1. Click on member node in canvas (circle)
2. Click "Edit Member" button
3. Update information:
   - Contact: Phone, Email, Address
   - Personal: Job, Biography, Photo URL
   - Dates: Birth date, Status (Alive/Deceased)
4. Click "Simpan Perubahan"
```

### 5. Create Relationships

```
Backend Support: Ready
Frontend Enhancement Needed:
- Implement drag-to-connect nodes
- Create relationship type modal
- Link members together
```

---

## 📊 API Testing

### Quick API Test with curl

#### 1. Get All Families (Admin)

```bash
curl -X GET http://localhost:5200/api/families \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

#### 2. Create New Family

```bash
curl -X POST http://localhost:5200/api/families \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nama_keluarga": "Keluarga Besar",
    "deskripsi": "My family tree",
    "privacy_type": "PRIVATE"
  }'
```

#### 3. Add Family Member

```bash
curl -X POST http://localhost:5200/api/families/{familyId}/members \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nama_depan": "John",
    "nama_belakang": "Doe",
    "gender": "Pria",
    "generation": 0
  }'
```

---

## 🐛 Troubleshooting

### Issue: "Cannot GET /api/families"

**Solution**: Ensure server is running and family routes are registered in `be/src/index.js`

### Issue: "JWT token is invalid"

**Solution**:

- Clear localStorage cookies
- Login again
- Token should be saved after login

### Issue: "Database connection failed"

**Solution**:

- Check MySQL is running: `mysql -u root -p`
- Verify credentials in `.env`
- Run migration: `npm run migrate`

### Issue: "CORS error in browser"

**Solution**:

- Check `FRONTEND_URL` in backend `.env`
- Ensure it matches frontend URL (http://localhost:3000)
- Restart backend server

### Issue: "Canvas not rendering"

**Solution**:

- Check browser console for errors
- Verify familyId in URL is valid
- Ensure members are loaded from API

---

## 📦 Project Structure

```
tree_fams/
├── be/                          # Backend (Express.js)
│   ├── src/
│   │   ├── config/              # Database & constants
│   │   ├── database/            # Migration scripts
│   │   ├── middleware/          # Auth middleware
│   │   ├── models/              # Database models
│   │   │   ├── Family.js        # ✨ NEW
│   │   │   ├── FamilyMember.js  # ✨ NEW
│   │   │   ├── Relationship.js  # ✨ NEW
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── familyRoutes.js  # ✨ NEW
│   │   │   ├── authRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   └── adminRoutes.js
│   │   └── index.js             # Server entry
│   └── package.json
│
├── fe/                          # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── FamilyTreeVisualization.jsx # ✨ REDESIGNED
│   │   │   ├── NodeEditForm.jsx             # ✨ NEW
│   │   │   ├── AddMemberForm.jsx            # ✨ NEW
│   │   │   ├── TooltipPreview.jsx           # ✨ NEW
│   │   │   └── ...
│   │   ├── context/
│   │   │   └── WorkspaceContext.jsx         # ✨ NEW
│   │   ├── pages/
│   │   │   ├── FamilyDashboard.jsx          # ✨ NEW
│   │   │   └── ...
│   │   ├── App.jsx              # ✨ UPDATED
│   │   └── index.js
│   └── package.json
│
└── IMPLEMENTATION_GUIDE.md      # ✨ NEW - Full documentation
```

---

## 🔄 Development Workflow

### Make Changes to Backend

```bash
# 1. Edit files in be/src/
# 2. Backend auto-restarts (if using nodemon)
# 3. Test API with curl or Postman

npm start --watch  # Auto-restart on changes
```

### Make Changes to Frontend

```bash
# 1. Edit files in fe/src/
# 2. Browser auto-refreshes
# 3. Check console for errors

npm start  # Auto-reload on changes
```

---

## 📈 Performance Tips

### Frontend

- Use React DevTools to check re-renders
- Memoize expensive components
- Lazy load canvas images
- Debounce zoom/pan events

### Backend

- Add database indexes for `family_id` queries
- Use connection pooling for multiple users
- Cache public family lists
- Implement pagination for large member lists

---

## 🚀 Production Deployment

### Backend

```bash
# Build
npm run build

# Use process manager
npm install -g pm2
pm2 start src/index.js --name "family-tree-api"

# Set environment
pm2 set environment NODE_ENV=production
```

### Frontend

```bash
# Build optimized bundle
npm run build

# Deploy dist/ folder to:
# - Vercel, Netlify, GitHub Pages
# - OR Nginx/Apache on same server as backend

# Update API_URL to production backend URL
```

---

## 📞 Support & Next Steps

### Immediate Next Tasks

1. ✅ Database schema
2. ✅ Backend models & API
3. ✅ Frontend components & context
4. ⏳ Photo upload integration
5. ⏳ Full canvas drag-to-position
6. ⏳ Drag-to-connect relationships

### Advanced Features

- Batch member import from CSV/JSON
- Family tree export as PDF/Image
- Share links for public families
- Member timeline/history
- Advanced search & filtering
- Mobile app version

---

## 📚 Additional Resources

**Backend Documentation**: See comments in `/be/src/routes/familyRoutes.js`  
**Frontend Documentation**: See comments in `/fe/src/context/WorkspaceContext.jsx`  
**Database Schema**: See `/be/src/database/initialize.js`

---

**Last Updated**: 2025  
**Version**: 2.0 (Canvas Editor Implementation)
