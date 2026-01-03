# 🌳 Family Tree Application - Canvas Editor v2.0

Complete family tree application with **canvas-based editor**, privacy controls, rich member data, and interactive visualization.

**Status**: ✅ Production Ready v2.0  
**Last Updated**: January 2025

---

## 📚 Documentation Index

**Choose based on your needs:**

| Document                                                 | Purpose              | Time   | Audience   |
| -------------------------------------------------------- | -------------------- | ------ | ---------- |
| **[QUICK_START.md](./QUICK_START.md)**                   | Installation & setup | 10 min | Everyone   |
| **[IMPLEMENTATION_GUIDE.md](./IMPLEMENTATION_GUIDE.md)** | Technical details    | 20 min | Developers |
| **[DELIVERY_SUMMARY.md](./DELIVERY_SUMMARY.md)**         | What was built       | 5 min  | Managers   |
| **[TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md)**       | QA & verification    | 15 min | QA/Testers |

---

## ⚡ 60-Second Start

```bash
# Terminal 1: Backend
cd be && npm install && npm run migrate && npm start

# Terminal 2: Frontend
cd fe && npm install && npm start

# Login: admin@family.com / admin123
# Visit: http://localhost:3000/families
```

---

## 🎯 What's New in v2.0

### Previous Version (v1.0)

- Basic admin CRUD dashboard
- Simple 2D visualization
- User management
- Basic family relationships

### New in v2.0 ✨

- **Canvas-based editor** with pan/zoom
- **Multi-family support** per admin
- **Privacy controls** (PUBLIC/PRIVATE)
- **Rich member data**: Contact, biography, photos, status
- **Generation tracking** with visual markers
- **Hover tooltips** for quick info
- **29 API endpoints** with full auth/authz
- **3 new database tables**: families, family_members, relationships
- **Responsive UI** with comprehensive forms

---

## 🏗️ Project Structure

```
tree_fams/
├── be/                                  # Backend
│   ├── src/models/
│   │   ├── Family.js                   ✨ New
│   │   ├── FamilyMember.js             ✨ New
│   │   └── Relationship.js             ✨ New
│   ├── src/routes/
│   │   └── familyRoutes.js             ✨ New (29 endpoints)
│   └── src/config/constants.js         ✨ Updated
│
├── fe/                                  # Frontend
│   ├── src/pages/
│   │   └── FamilyDashboard.jsx         ✨ New
│   ├── src/components/
│   │   ├── FamilyTreeVisualization.jsx ✨ Redesigned
│   │   ├── NodeEditForm.jsx            ✨ New
│   │   ├── AddMemberForm.jsx           ✨ New
│   │   └── TooltipPreview.jsx          ✨ New
│   ├── src/context/
│   │   └── WorkspaceContext.jsx        ✨ New
│   └── src/App.jsx                     ✨ Updated
│
├── 📄 QUICK_START.md
├── 📄 IMPLEMENTATION_GUIDE.md
├── 📄 DELIVERY_SUMMARY.md
├── 📄 TESTING_CHECKLIST.md
└── 📄 README.md                        ← You are here
```

---

## ✨ Core Features

# Edit .env dengan konfigurasi database Anda

# 3. Create database & tables

npm run migrate

# 4. Run development server

npm run dev

# Server berjalan di: http://localhost:5200

````

### Frontend (React + Vite)

```bash
cd fe

# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# Client berjalan di: http://localhost:3000
````

---

## 📁 Project Structure

```
tree_fams/
├── be/                          # Backend (Node.js + Express + MySQL)
│   ├── src/
│   │   ├── config/              # Configuration files
│   │   │   ├── database.js      # MySQL connection pool
│   │   │   └── constants.js     # App constants
│   │   ├── controllers/         # Business logic
│   │   │   └── userController.js
│   │   ├── models/              # Database models
│   │   │   └── User.js          # User model dengan query builder
│   │   ├── routes/              # API routes
│   │   │   └── userRoutes.js    # User endpoints
│   │   ├── middleware/          # Middlewares (empty for now)
│   │   ├── validators/          # Input validators
│   │   │   └── userValidator.js # Express-validator rules
│   │   ├── utils/               # Utility functions
│   │   │   ├── familyLogic.js   # umur, generasi, saudara logic
│   │   │   └── helpers.js       # ID generator, validators, etc
│   │   ├── database/            # Database setup
│   │   │   └── createDatabase.js # Auto-create DB & tables
│   │   └── index.js             # Main app entry
│   ├── package.json
│   ├── .env.example
│   ├── README.md
│   └── .gitignore
│
├── fe/                          # Frontend (React + Vite + Tailwind)
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   │   ├── UserCard.jsx     # Card component untuk user
│   │   │   ├── UserForm.jsx     # Form untuk create/edit
│   │   │   └── UI.jsx           # Modal, Alert, Skeleton, etc
│   │   ├── pages/               # Page components
│   │   │   ├── HomePage.jsx     # List semua user
│   │   │   └── UserDetailPage.jsx # Detail user
│   │   ├── services/            # API integration
│   │   │   └── api.js           # Axios API client
│   │   ├── hooks/               # Custom React hooks
│   │   │   └── index.js         # useFetch, useForm
│   │   ├── utils/               # Utility functions
│   │   │   └── helpers.js       # Format, calculate helpers
│   │   ├── types/               # TypeScript types
│   │   │   └── User.ts          # User interfaces
│   │   ├── styles/              # Global styles
│   │   │   └── index.css        # Tailwind + custom CSS
│   │   ├── assets/              # Static assets
│   │   ├── App.jsx              # Main app component
│   │   └── main.jsx             # Entry point
│   ├── public/                  # Static files
│   ├── index.html               # HTML template
│   ├── vite.config.js           # Vite config
│   ├── tailwind.config.js       # Tailwind config
│   ├── postcss.config.js        # PostCSS config
│   ├── package.json
│   ├── README.md
│   └── .gitignore
│
└── README.md                    # This file
```

---

## 🗄️ Database Schema

### users table

| Field          | Type                   | Description           |
| -------------- | ---------------------- | --------------------- |
| id             | VARCHAR(36)            | UUID primary key      |
| namaDepan      | VARCHAR(100)           | Nama depan (required) |
| namaBelakang   | VARCHAR(100)           | Nama belakang         |
| gender         | ENUM('Pria', 'Wanita') | Default: Pria         |
| wafat          | BOOLEAN                | Default: false        |
| photoUrl       | VARCHAR(500)           | URL foto profil       |
| tanggalLahir   | VARCHAR(10)            | Format: DD-MM-YYYY    |
| tanggalMenikah | VARCHAR(10)            | Format: DD-MM-YYYY    |
| tanggalWafat   | VARCHAR(10)            | Format: DD-MM-YYYY    |
| isRoot         | BOOLEAN                | Penanda root (Gen 1)  |
| menikah        | BOOLEAN                | Status pernikahan     |
| alamat         | VARCHAR(255)           | Alamat tinggal        |
| tempatLahir    | VARCHAR(100)           | Tempat lahir          |
| pekerjaan      | VARCHAR(100)           | Pekerjaan             |
| pasanganId     | VARCHAR(36)            | FK (relasi 2-way)     |
| ayahId         | VARCHAR(36)            | FK (ayah)             |
| ibuId          | VARCHAR(36)            | FK (ibu)              |
| anak           | JSON                   | Array of user IDs     |
| createdAt      | TIMESTAMP              | Auto timestamp        |
| updatedAt      | TIMESTAMP              | Auto update           |

---

## 🔌 API Endpoints

### User Endpoints

| Method | Endpoint                 | Description     |
| ------ | ------------------------ | --------------- |
| GET    | `/api/users`             | Get all users   |
| GET    | `/api/users/:id`         | Get user by ID  |
| POST   | `/api/users`             | Create new user |
| PUT    | `/api/users/:id`         | Update user     |
| DELETE | `/api/users/:id`         | Delete user     |
| GET    | `/api/users/search`      | Search user     |
| GET    | `/api/users/export/json` | Export database |

**Contoh Request:**

```bash
# Get all users
curl http://localhost:5200/api/users

# Create user
curl -X POST http://localhost:5200/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "namaDepan": "John",
    "namaBelakang": "Doe",
    "gender": "Pria",
    "tanggalLahir": "01-12-1990",
    "isRoot": true
  }'

# Update user
curl -X PUT http://localhost:5200/api/users/user-id \
  -H "Content-Type: application/json" \
  -d '{"namaDepan": "Jane"}'

# Delete user
curl -X DELETE http://localhost:5200/api/users/user-id

# Export database
curl http://localhost:5200/api/users/export/json -o db.json
```

---

## 🎯 Features

### ✅ Implemented

**Backend:**

- [x] User CRUD operations
- [x] Database integration dengan MySQL
- [x] MVC architecture
- [x] Input validation
- [x] Error handling
- [x] Auto-calculate umur (age)
- [x] Auto-calculate generasi (generation)
- [x] Cari saudara logic
- [x] Export database ke JSON
- [x] Two-way relationship management

**Frontend:**

- [x] List view semua user
- [x] Create user form
- [x] User detail page
- [x] Edit user profile
- [x] Delete user
- [x] Display relasi keluarga
- [x] Responsive design
- [x] Gender icons & badges
- [x] Generasi display

### 🔄 Upcoming Features

- [ ] Search & filter user
- [ ] Set relasi (pasangan, ayah, ibu)
- [ ] Bulk add anak
- [ ] Family tree diagram/visualization
- [ ] Import database dari JSON
- [ ] Dark mode
- [ ] Authentication & authorization
- [ ] Photo upload (bukan URL)
- [ ] Offline support
- [ ] Mobile app version
- [ ] Advanced filtering & sorting

---

## 🧮 Business Logic

### Umur (Age) Calculation

```javascript
hitungUmur(tanggalLahir, tanggalWafat?)
// Returns: age in years
// Jika wafat, dihitung umur saat meninggal
// Jika masih hidup, dihitung dari hari ini
```

### Generasi (Generation) Calculation

```javascript
hitungGenerasi(user, allUsers);
// Returns: 1, 2, 3, ... n
// Gen 1: isRoot = true
// Gen 2+: Generasi(ayah/ibu) + 1
```

### Cari Saudara (Find Siblings)

```javascript
cariSaudara(userId, allUsers);
// Returns: array of siblings
// Berbagi ayah dan/atau ibu yang sama
// Filter diri sendiri
```

---

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js 16+
- **Framework**: Express.js
- **Database**: MySQL 5.7+
- **Validation**: express-validator
- **ID Generator**: uuid

### Frontend

- **Library**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: TailwindCSS 3
- **CSS Processing**: PostCSS + Autoprefixer

---

## 📦 Dependencies

### Backend

```json
{
  "express": "^4.18.2",
  "mysql2": "^3.6.0",
  "cors": "^2.8.5",
  "dotenv": "^16.0.3",
  "express-validator": "^7.0.0",
  "uuid": "^9.0.0"
}
```

### Frontend

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.18.0",
  "axios": "^1.6.0"
}
```

---

## 🚀 Deployment

### Backend (Node.js Server)

```bash
# Build/prepare
npm install

# Run production
NODE_ENV=production npm start
```

**Recommended Hosting:**

- Heroku
- Railway.app
- Render
- DigitalOcean App Platform

### Frontend (Static Files)

```bash
# Build
npm run build

# Output: dist/ folder
```

**Recommended Hosting:**

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

### Database

**MySQL Hosting:**

- AWS RDS
- Google Cloud SQL
- PlanetScale
- DigitalOcean Managed DB

---

## 📝 Development Notes

### Date Format

- Format: **DD-MM-YYYY**
- Contoh: 01-12-1990, 15-06-2020

### Gender Values

- `'Pria'` atau `'Wanita'`
- Default: `'Pria'`

### ID Format

- UUID v4
- Contoh: `550e8400-e29b-41d4-a716-446655440000`

### CORS Setup

- Frontend: http://localhost:3000
- Backend: http://localhost:5200
- Production: Update di `.env`

---

## 🐛 Troubleshooting

### Database Connection Error

```
1. Check MySQL server is running
2. Verify credentials in .env
3. Create database manually if needed
4. Run: npm run migrate
```

### Port Already in Use

```bash
# Backend (change PORT in .env)
# Frontend (change port in vite.config.js)

# Or kill existing process:
# macOS/Linux: lsof -i :5200 | grep LISTEN | awk '{print $2}' | xargs kill -9
# Windows: netstat -ano | findstr :5200 > taskkill /PID <PID> /F
```

### API Not Responding

```
1. Check backend is running (npm run dev)
2. Check CORS settings in index.js
3. Check API_URL in frontend (vite config / .env)
4. Check browser console for errors
```

---

## 📚 Resources & References

- [Express.js Docs](https://expressjs.com)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [MySQL Documentation](https://dev.mysql.com/doc)
- [Vite Guide](https://vitejs.dev)
- [React Router](https://reactrouter.com)

---

## 👨‍💻 Development Workflow

### 1. Setup

```bash
git clone <repo>
cd tree_fams

# Backend
cd be && npm install && npm run migrate

# Frontend (buka terminal baru)
cd fe && npm install
```

### 2. Development

```bash
# Terminal 1: Backend
cd be && npm run dev

# Terminal 2: Frontend
cd fe && npm run dev
```

### 3. Testing

```bash
# Test API dengan Postman atau curl
# Test UI dengan browser dev tools
```

### 4. Build

```bash
# Backend: already ready (just deploy src folder)
# Frontend: npm run build (generates dist folder)
```

---

## 📞 Support & Contribution

- **Issues**: Report di issue tracker
- **Questions**: Check Notion documentation
- **Contributions**: PR welcome!

---

## 📄 License

ISC

---

## 👤 Authors

Created for Family Tree Project 2025

---

## 🗓️ Project Status

**Status**: 🟢 In Development

**Last Updated**: 23 December 2025

**Next Tasks**:

- [ ] Setup database dengan migration script
- [ ] Add more validation & error handling
- [ ] Frontend: Search & filter functionality
- [ ] Frontend: Add relasi form
- [ ] Frontend: Family tree visualization
- [ ] Testing (unit, integration)
- [ ] Deployment setup

---

**Happy coding! 🚀**
