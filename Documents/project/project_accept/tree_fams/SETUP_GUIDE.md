# 🌳 Silsilah Keluarga - Family Tree Application

Complete role-based family tree management application with interactive 2D visualization, admin dashboard, and family connections.

## ✨ Features

### Authentication & Authorization

- ✅ JWT-based authentication with 7-day token expiration
- ✅ Password hashing with bcryptjs
- ✅ Role-based access control (Admin & User)
- ✅ Protected routes and admin-only pages
- ✅ Login/Register with email validation

### Admin Features

- ✅ Complete user management (CRUD operations)
- ✅ Role assignment and modification
- ✅ Dashboard with statistics
- ✅ User creation and editing
- ✅ Bulk user operations

### Family Tree Features

- ✅ Interactive 2D canvas-based family tree visualization
- ✅ Animated connections between family members
- ✅ Pan and zoom controls
- ✅ Color-coded nodes (Blue: Male, Pink: Female)
- ✅ Click to view user details
- ✅ Family relationship navigation (parents, children, siblings, spouse)
- ✅ Clickable family connections for easy navigation

### User Features

- ✅ View personal details and family history
- ✅ Navigate to related family members
- ✅ Edit personal information (if own profile)
- ✅ View extended family relationships
- ✅ Interactive family tree visualization

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn package manager

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd be

# Install dependencies
npm install

# Create .env file in be directory
cat > .env << EOF
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root1234
DB_NAME=tree_family_db
JWT_SECRET=your-secret-key-change-in-production
PORT=5200
EOF

# Run database migrations (first time only)
npm run migrate

# Start backend server
npm start
# Or for development with hot reload:
npm run dev
```

### 2. Frontend Setup

```bash
cd fe

# Install dependencies
npm install

# Start frontend development server
npm start
```

Frontend will open at: `http://localhost:3000`
Backend API at: `http://localhost:5200`

## 🔐 Default Credentials

After running migrations, you have:

| Field        | Value            |
| ------------ | ---------------- |
| **Email**    | admin@family.com |
| **Password** | admin123         |
| **Role**     | Admin            |

## 📚 API Endpoints

### Authentication

```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - Login and get JWT token
GET    /api/auth/me            - Get current user (requires token)
```

### Users (Everyone)

```
GET    /api/users              - Get all users
GET    /api/users/:id          - Get specific user
```

### Admin Only

```
GET    /api/admin/users        - List all users with details
GET    /api/admin/users/:id    - Get user details
POST   /api/admin/users        - Create new user
PUT    /api/admin/users/:id    - Update user
DELETE /api/admin/users/:id    - Delete user
PUT    /api/admin/users/:id/role - Change user role
GET    /api/admin/stats        - Get dashboard statistics
```

## 🎨 Frontend Routes

```
/login                 - Login/Register page (public)
/                      - Home page with family tree (protected)
/family-tree          - Family tree visualization (protected)
/user/:id             - User detail page with family connections (protected)
/admin                - Admin dashboard (admin only)
```

## 🔄 Database Schema

### Users Table

```sql
- id (INT, PRIMARY KEY)
- namaDepan (VARCHAR 100)
- namaBelakang (VARCHAR 100)
- gender (ENUM: Pria, Wanita)
- tempatLahir (VARCHAR 100)
- tanggalLahir (DATE)
- pekerjaan (VARCHAR 100)
- email (VARCHAR 255, UNIQUE) ← Auth field
- password (VARCHAR 255) ← Auth field (hashed)
- role (ENUM: admin, user) ← Auth field
- isRoot (BOOLEAN)
- ayahId (INT, FK to users)
- ibuId (INT, FK to users)
- pasanganId (INT, FK to users)
- keterangan (TEXT)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
```

## 🔐 Security Features

1. **Password Security**

   - Bcryptjs hashing with 10 rounds
   - Passwords never stored in plain text
   - Never sent in API responses

2. **JWT Tokens**

   - 7-day expiration
   - Renewed on each login
   - Stored in localStorage (frontend)
   - Sent in Authorization header: `Bearer {token}`

3. **Role-Based Access Control**

   - Admin: Full system access
   - User: Limited to own data (future implementation)
   - Protected routes verify token and role

4. **Database Security**
   - UTF8MB4 character set
   - Foreign key constraints
   - Unique email constraint
   - Indexed columns for performance

## 🎯 File Structure

### Backend

```
be/
├── src/
│   ├── config/
│   │   ├── database.js         (DB connection)
│   │   └── constants.js        (App constants)
│   ├── middleware/
│   │   └── authMiddleware.js   (JWT verification)
│   ├── controllers/
│   │   ├── authController.js   (Login/Register logic)
│   │   └── userController.js   (User CRUD)
│   ├── models/
│   │   └── User.js             (User database model)
│   ├── routes/
│   │   ├── authRoutes.js       (Auth endpoints)
│   │   ├── adminRoutes.js      (Admin endpoints)
│   │   └── userRoutes.js       (User endpoints)
│   ├── database/
│   │   └── initialize.js       (Migration script)
│   └── index.js                (Main server)
├── package.json
└── .env

### Frontend
fe/
├── src/
│   ├── pages/
│   │   ├── LoginPage.jsx       (Login/Register UI)
│   │   ├── HomePage.jsx        (Home with family tree)
│   │   ├── UserDetailPage.jsx  (User details)
│   │   └── AdminDashboard.jsx  (Admin management)
│   ├── components/
│   │   ├── Header.jsx          (Navigation)
│   │   ├── FamilyTreeVisualization.jsx (2D canvas)
│   │   └── ProtectedRoute.jsx  (Route protection)
│   ├── contexts/
│   │   └── AuthContext.jsx     (Global auth state)
│   ├── services/
│   │   └── api.js              (API client)
│   └── App.jsx                 (Main app)
├── package.json
└── public/

## 🚨 Troubleshooting

### Database Connection Failed
```

Error: connect ECONNREFUSED 127.0.0.1:3306

Solution:

1. Make sure MySQL is running: sudo systemctl start mysql
2. Check DB credentials in .env file
3. Verify MySQL is listening on localhost:3306

```

### Migration Script Error
```

Error: Table already exists

Solution:

1. The migration script drops existing users table
2. Run: npm run migrate
3. Check console for any SQL errors

```

### Login Not Working
```

Error: Invalid credentials

Solution:

1. Use default admin@family.com / admin123
2. Check backend is running: http://localhost:5200
3. Verify JWT_SECRET in .env
4. Check browser console for detailed errors

```

### Family Tree Not Showing
```

Frontend shows empty tree

Solution:

1. Make sure users exist in database
2. Admin can add users in dashboard
3. Users must have proper family relationships (ayahId, ibuId, etc.)
4. Check browser console for API errors

```

## 📝 Usage Examples

### Creating a Family Structure

1. **Login as Admin**
   - Email: admin@family.com
   - Password: admin123

2. **Go to Admin Dashboard**
   - Create root ancestor (no parent)
   - Create their children (set parent IDs)
   - Create grandchildren
   - Set spouses using pasanganId

3. **View Family Tree**
   - Go to Home page
   - See interactive 2D visualization
   - Click nodes to view details
   - Navigate between family members

### Managing Users

1. **Add User**
   - Click "Tambah Pengguna" button
   - Fill in details
   - Assign role (admin/user)
   - Save

2. **Edit User**
   - Click "Edit" button in user row
   - Modify details
   - Click "Update" to save

3. **Change Role**
   - Select role from dropdown
   - Automatically updates

4. **Delete User**
   - Click "Hapus" button
   - Confirm deletion

## 🎨 Technology Stack

### Backend
- Express.js - Web framework
- MySQL2 - Database driver
- JWT (jsonwebtoken) - Authentication
- Bcryptjs - Password hashing
- CORS - Cross-origin requests
- Compression - Response compression

### Frontend
- React.js - UI library
- React Router - Navigation
- Axios - HTTP client
- TailwindCSS - Styling
- Framer Motion - Animations
- HTML5 Canvas - 2D visualization

## 📊 Performance Notes

- JWT tokens cached in localStorage
- Database queries indexed for speed
- Canvas rendering optimized (60fps)
- API responses compressed with gzip

## 🔄 Workflow Example

1. User registers → Password hashed → User created with 'user' role
2. User logs in → Email/password verified → JWT token generated
3. Token stored in localStorage → Sent with all protected requests
4. Admin visits dashboard → Middleware verifies role → Admin data shown
5. User clicks family member → Navigates to detail page → Shows connections

## 🤝 Contributing

To add new features:
1. Create new routes in be/src/routes/
2. Create controllers in be/src/controllers/
3. Create React components in fe/src/components/
4. Test authentication flow
5. Update this README

## 📄 License

MIT License - Feel free to use for personal or commercial projects

## 💬 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review console logs (browser and terminal)
3. Verify all credentials are correct
4. Ensure MySQL and Node.js are properly installed

---

**Happy Family Tree Building! 🌳👨‍👩‍👧‍👦**
```
