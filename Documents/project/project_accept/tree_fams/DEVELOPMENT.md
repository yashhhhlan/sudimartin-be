# 🚀 Development Guide - Silsilah Keluarga

This guide will help you understand and develop the Family Tree application.

## 📚 Project Architecture

### Backend Architecture (Express.js)

```
Routes → Controllers → Models → Database
  ↓
Middleware (Auth, CORS, etc.)
```

**Flow Example:**

```
POST /api/auth/login
  ↓
authRoutes.js → authController.login()
  ↓
User.findByEmail() → Database query
  ↓
bcrypt.compare() → Password verification
  ↓
generateToken() → JWT creation
  ↓
Response: {token, user}
```

### Frontend Architecture (React)

```
App.jsx (with AuthProvider)
  ├── Header.jsx (Navigation)
  ├── LoginPage.jsx (Auth)
  ├── HomePage.jsx
  │   └── FamilyTreeVisualization.jsx
  ├── UserDetailPage.jsx
  └── AdminDashboard.jsx
```

**State Management:**

- AuthContext: Global authentication state
- Component useState: Local component state
- API calls via axios with JWT headers

## 🔧 Development Workflow

### Adding a New Feature

#### Example: Add "Phone Number" Field

1. **Database Migration**

```javascript
// be/src/database/initialize.js
// Add to users table:
ALTER TABLE users ADD COLUMN phone VARCHAR(20);
```

2. **Backend Model Update**

```javascript
// be/src/models/User.js
static create(data) {
  const sql = `INSERT INTO users (..., phone) VALUES (..., ?)`;
  const values = [..., data.phone]; // Add to array
}
```

3. **Controller Update**

```javascript
// be/src/controllers/userController.js
if (!data.phone) {
  return res.status(400).json({ error: "Phone required" });
}
// Process phone...
```

4. **API Update**

```javascript
// be/src/routes/userRoutes.js or adminRoutes.js
// If admin only: require middleware.verifyAdmin()
```

5. **Frontend Form Update**

```javascript
// fe/src/pages/AdminDashboard.jsx or UserDetailPage.jsx
<input
  type="tel"
  placeholder="Phone"
  value={formData.phone}
  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
/>
```

6. **Test**

- Use Postman or curl to test API
- Test form submission in UI
- Verify data saved to database

### Adding a New Page

#### Example: Add "Family Reports" Page

1. **Create Component**

```bash
mkdir -p fe/src/pages
# Create: fe/src/pages/FamilyReportsPage.jsx
```

2. **Create Component File**

```javascript
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

export default function FamilyReportsPage() {
  const { token } = useAuth();
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get("/api/reports", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(res.data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Laporan Keluarga</h1>
      {/* Your UI here */}
    </div>
  );
}
```

3. **Add Route in App.jsx**

```javascript
import FamilyReportsPage from "./pages/FamilyReportsPage";

// In Routes:
<Route
  path="/reports"
  element={
    <ProtectedRoute>
      <FamilyReportsPage />
    </ProtectedRoute>
  }
/>;
```

4. **Add Navigation Link in Header.jsx**

```javascript
<Link to="/reports" className="...">
  📊 Laporan
</Link>
```

5. **Create Backend API** (if needed)

```javascript
// be/src/routes/reportRoutes.js
router.get("/reports", verifyToken, (req, res) => {
  // Get reports from database
});
```

## 🔐 Authentication Flow

### Login Flow

```
1. User enters email & password
   ↓
2. Frontend: POST /api/auth/login
   ↓
3. Backend:
   - Find user by email
   - Compare password with hash
   - Generate JWT token
   ↓
4. Frontend:
   - Save token to localStorage
   - Save user data to context
   - Redirect to home
   ↓
5. Subsequent requests:
   - Include: Authorization: Bearer {token}
   - Backend verifies token
```

### Route Protection

```javascript
// Public Route
<Route path="/login" element={<LoginPage />} />

// Protected Route (requires authentication)
<Route
  path="/"
  element={
    <ProtectedRoute>
      <HomePage />
    </ProtectedRoute>
  }
/>

// Admin Only Route
<Route
  path="/admin"
  element={
    <ProtectedRoute requireAdmin={true}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
```

## 💾 Database Operations

### Basic SQL Queries

**Create User:**

```sql
INSERT INTO users (namaDepan, namaBelakang, email, password, role)
VALUES ('John', 'Doe', 'john@example.com', 'hashed_password', 'user');
```

**Get All Users:**

```sql
SELECT * FROM users WHERE role = 'user' ORDER BY createdAt DESC;
```

**Update User:**

```sql
UPDATE users SET namaDepan = 'Jane' WHERE id = 1;
```

**Get Family Relationships:**

```sql
SELECT u1.*, u2.namaDepan as ayahNama, u3.namaDepan as ibuNama
FROM users u1
LEFT JOIN users u2 ON u1.ayahId = u2.id
LEFT JOIN users u3 ON u1.ibuId = u3.id
WHERE u1.id = 5;
```

## 🐛 Debugging Tips

### Backend Debugging

```javascript
// Add console logs
console.log("User data:", userData);
console.error("Error details:", error);

// Use try-catch
try {
  // risky operation
} catch (error) {
  console.error("Operation failed:", error.message);
}

// Check middleware order (in index.js)
app.use(authMiddleware); // Must be before routes that use it
```

### Frontend Debugging

```javascript
// Check AuthContext
const { isAuthenticated, token, user } = useAuth();
console.log("Auth:", { isAuthenticated, token, user });

// Check API calls
axios.interceptors.response.use(
  (res) => {
    console.log("API Response:", res);
    return res;
  },
  (err) => {
    console.error("API Error:", err);
    return Promise.reject(err);
  }
);

// Check component state
console.log("Component state:", { users, loading, error });
```

### Database Debugging

```bash
# Connect to MySQL
mysql -u root -p

# Show all databases
SHOW DATABASES;

# Use family tree database
USE tree_family_db;

# Show all tables
SHOW TABLES;

# Describe users table
DESCRIBE users;

# Check data
SELECT * FROM users LIMIT 5;
```

## 📦 Dependencies Overview

### Backend

- **express**: Web framework
- **mysql2**: Database connection
- **jsonwebtoken**: JWT creation/verification
- **bcryptjs**: Password hashing
- **cors**: Cross-origin requests
- **compression**: Response compression

### Frontend

- **react**: UI library
- **react-router-dom**: Client-side routing
- **axios**: HTTP client
- **tailwindcss**: CSS framework
- **framer-motion**: Animations

## ✅ Testing Checklist

Before pushing code, verify:

### Backend

- [ ] All routes respond correctly
- [ ] Authentication middleware works
- [ ] Role-based access control works
- [ ] Database queries return correct data
- [ ] Error handling returns proper HTTP status
- [ ] No console errors or warnings

### Frontend

- [ ] Components render without errors
- [ ] Forms submit correctly
- [ ] Authentication flow works
- [ ] Protected routes redirect properly
- [ ] API calls include JWT token
- [ ] Error messages display correctly

### Integration

- [ ] Login flow works end-to-end
- [ ] Admin can manage users
- [ ] Regular users see limited access
- [ ] Family tree visualization works
- [ ] Family relationships display correctly
- [ ] Navigation between pages works

## 🚀 Deployment Checklist

### Backend (.env)

- [ ] Change JWT_SECRET to strong random string
- [ ] Set DB credentials for production
- [ ] Set NODE_ENV=production
- [ ] Set proper CORS_ORIGIN values
- [ ] Update database credentials

### Frontend (.env.local)

- [ ] Set REACT_APP_API_URL to production backend
- [ ] Test all API calls against production backend
- [ ] Verify JWT token handling

### Database

- [ ] Run migrations on production database
- [ ] Create production admin account
- [ ] Backup database regularly

### Monitoring

- [ ] Set up error logging
- [ ] Monitor API response times
- [ ] Track user authentication failures
- [ ] Monitor database performance

## 📝 Common Issues & Solutions

### Issue: 401 Unauthorized

```javascript
// Solution: Check token in localStorage
localStorage.getItem("token");

// Verify token is sent in headers
headers: {
  Authorization: `Bearer ${token}`;
}
```

### Issue: CORS Error

```javascript
// Solution: Check backend CORS config
// be/src/index.js
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
```

### Issue: Password Not Hashing

```javascript
// Solution: Use bcrypt before saving
const hashedPassword = await bcrypt.hash(password, 10);
// Then save hashedPassword to DB
```

### Issue: Family Tree Not Displaying

```javascript
// Solution: Ensure users have family relationships
// In admin dashboard, set ayahId, ibuId for users
// Verify data in database
```

## 🔄 Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
git add .
git commit -m "Add: new feature description"

# Push to remote
git push origin feature/new-feature

# Create pull request
# Merge after review
```

## 📚 Additional Resources

- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev/)
- [MySQL Docs](https://dev.mysql.com/doc/)
- [JWT Tutorial](https://jwt.io/introduction)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

Happy coding! 🚀
