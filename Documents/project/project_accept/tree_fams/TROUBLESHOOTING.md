# 🔧 Troubleshooting Guide

Panduan lengkap untuk mengatasi masalah yang mungkin terjadi di Tree Family Project.

---

## 🎯 Common Issues & Solutions

### Backend Issues

#### 1. Port 5200 Already in Use

```bash
# Error: listen EADDRINUSE: address already in use :::5200

# Solution 1: Kill process on port 5200
lsof -ti:5200 | xargs kill -9

# Solution 2: Use different port
# In .env
PORT=5001

# Solution 3: Check what's using port
lsof -i :5200
netstat -tulpn | grep 5200

# For Windows:
netstat -ano | findstr :5200
taskkill /PID <PID> /F
```

#### 2. Cannot Connect to MySQL Database

```
Error: ER_ACCESS_DENIED_FOR_USER 'root'@'localhost'
```

**Solutions:**

```bash
# 1. Check MySQL is running
# macOS
brew services list | grep mysql

# Linux
sudo systemctl status mysql

# Windows
sc query MySQL

# 2. Verify credentials in .env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=tree_family

# 3. Test MySQL connection
mysql -u root -p

# 4. Check if database exists
SHOW DATABASES;

# 5. Reset MySQL password
# macOS:
/usr/local/mysql/bin/mysqld_safe --skip-grant-tables &
mysql -u root
FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
```

#### 3. Database Table Not Created

```
Error: Table 'tree_family.users' doesn't exist
```

**Solutions:**

```bash
# 1. Run migration script
cd be
npm run migrate

# 2. Manually create database
mysql -u root -p tree_family < database/schema.sql

# 3. Check if table exists
mysql -u root -p tree_family
SHOW TABLES;
DESC users;

# 4. Drop and recreate
mysql -u root -p tree_family
DROP TABLE IF EXISTS users;
# Then run migration again
npm run migrate
```

#### 4. CORS Error

```
Error: Access to XMLHttpRequest blocked by CORS policy
```

**Solutions:**

```javascript
// Check CORS configuration in src/index.js
const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// For development, use flexible CORS:
app.use(cors({
  origin: '*', // ⚠️ Only for development!
  credentials: false
}));

// In .env
FRONTEND_URL=http://localhost:3000

// Verify CORS headers in response
# Use curl to test
curl -H "Origin: http://localhost:3000" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     http://localhost:5200/api/users
```

#### 5. Node Modules Not Installed

```
Error: Cannot find module 'express'
```

**Solutions:**

```bash
# 1. Install dependencies
cd be
npm install

# 2. Check node_modules exists
ls -la node_modules/

# 3. Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# 4. Check npm version
npm --version
# Should be >= 6.0.0

# 5. Check Node version
node --version
# Should be >= 14.0.0
```

#### 6. Validation Errors

```
Error: Validation error for field 'tanggalLahir'
```

**Solutions:**

```javascript
// Check date format is DD-MM-YYYY
const tanggalLahir = '01-12-1990'; // ✅ Correct
const tanggalLahir = '1990-12-01'; // ❌ Wrong
const tanggalLahir = '12/01/1990'; // ❌ Wrong

// Check gender values
const gender = 'Pria';   // ✅ Correct
const gender = 'pria';   // ❌ Wrong (case-sensitive)
const gender = 'Male';   // ❌ Wrong

// Validate in request body
{
  "namaDepan": "Ahmad",     // ✅ Required, 2+ chars
  "namaBelakang": "Dahlan", // ✅ Required, 2+ chars
  "gender": "Pria",         // ✅ Required
  "tanggalLahir": "01-12-1990" // ✅ Required, DD-MM-YYYY
}
```

### Frontend Issues

#### 1. Port 3000 Already in Use

```bash
# Error: Port 3000 already in use

# Solution 1: Kill process
lsof -ti:3000 | xargs kill -9

# Solution 2: Use different port
# In vite.config.js
export default {
  server: {
    port: 3001
  }
}

# Solution 3: Run with different port
npm run dev -- --port 3001
```

#### 2. Cannot Connect to Backend API

```
Error: Failed to fetch from http://localhost:5200/api/users
```

**Solutions:**

```javascript
// 1. Check API_URL in fe/src/services/api.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5200';

// 2. Check vite.config.js proxy configuration
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5200',
        changeOrigin: true
      }
    }
  }
}

// 3. Ensure backend is running
curl http://localhost:5200/api/health

// 4. Check browser console for errors
# Open DevTools (F12) → Console tab

// 5. Check CORS is enabled (see Backend Issues #4)

// 6. Verify API endpoints exist
curl -X GET http://localhost:5200/api/users
```

#### 3. React Components Not Rendering

```
Error: Components are blank or not showing
```

**Solutions:**

```javascript
// 1. Check console for JavaScript errors
# F12 → Console tab

// 2. Check if data is fetching
# F12 → Network tab
# Look for API requests

// 3. Verify API responses
# Check if you get data from backend

// 4. Check component state
# F12 → React DevTools Profiler tab

// 5. Check file paths in imports
import UserCard from '../components/UserCard'; // ✅ Correct path
import UserCard from './UserCard'; // ❌ Wrong

// 6. Verify exports in components
export default function UserCard() { } // ✅ Correct
export const UserCard = () => { } // ❌ Incorrect usage in import

// 7. Check CSS is imported
import './styles/index.css'; // ✅ Required
```

#### 4. Styling Not Applied

```
Problem: TailwindCSS classes not working
```

**Solutions:**

```bash
# 1. Check TailwindCSS is installed
npm list tailwindcss

# 2. Check tailwind.config.js content paths
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}" // ✅ Must match your files
  ]
}

# 3. Check styles/index.css has Tailwind directives
@tailwind base;
@tailwind components;
@tailwind utilities;

# 4. Verify PostCSS config
# postcss.config.js should have:
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
}

# 5. Rebuild CSS
npm run dev

# 6. Clear cache
rm -rf .next node_modules/.cache
npm run dev
```

#### 5. Form Not Submitting

```
Problem: Form data not being sent to backend
```

**Solutions:**

```javascript
// 1. Check form onChange handler
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value // ✅ Correct
  }));
}

// 2. Check form onSubmit handler
const handleSubmit = async (e) => {
  e.preventDefault(); // ✅ Required

  try {
    const response = await userAPI.createUser(formData);
    // Handle success
  } catch (error) {
    console.error('Error:', error);
  }
}

// 3. Check input names match formData keys
<input
  name="namaDepan" // ✅ Must match formData key
  value={formData.namaDepan}
  onChange={handleChange}
/>

// 4. Verify API endpoint is correct
const response = await axios.post('/api/users', formData);

// 5. Check Network tab for request
# F12 → Network tab
# Look for POST request to /api/users
# Check request payload and response
```

#### 6. Images Not Displaying

```
Problem: User photos not showing
```

**Solutions:**

```javascript
// 1. Check photoUrl is valid URL
const user = {
  photoUrl: 'https://example.com/image.jpg' // ✅ Valid URL
};

// 2. Add error handling for images
<img
  src={user.photoUrl || '/default-avatar.png'}
  alt={user.namaDepan}
  onError={(e) => e.target.src = '/default-avatar.png'}
/>

// 3. Check image URL is accessible
# Try in browser: https://example.com/image.jpg

// 4. Check CORS for external images
# May need server-side proxy if CORS blocked

// 5. Use local images
// Place images in fe/public/images/
<img src="/images/user-photo.jpg" alt="User" />
```

### Database Issues

#### 1. MySQL Service Not Running

```bash
# macOS
brew services restart mysql

# Linux
sudo systemctl restart mysql

# Windows
net start MySQL

# Verify running
mysql -u root -p
# Should connect successfully
```

#### 2. Out of Disk Space

```bash
# Check disk usage
df -h

# Clean up old logs
rm /var/log/mysql/*.log

# Check MySQL data folder size
du -sh /var/lib/mysql/

# Archive old data
SELECT * INTO OUTFILE '/tmp/users_backup.csv'
FROM users
WHERE createdAt < DATE_SUB(NOW(), INTERVAL 1 YEAR);
```

#### 3. Database Corruption

```sql
-- Check table integrity
CHECK TABLE users;

-- Repair if needed
REPAIR TABLE users;

-- Full optimization
OPTIMIZE TABLE users;

-- Backup before repair
mysqldump -u root -p tree_family > backup.sql
```

#### 4. Slow Queries

```sql
-- Enable slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;

-- Find slow queries
SELECT * FROM mysql.slow_log;

-- Add indexes for slow queries
ALTER TABLE users ADD INDEX idx_namaDepan (namaDepan);
ALTER TABLE users ADD INDEX idx_ayahId (ayahId);
ALTER TABLE users ADD INDEX idx_ibuId (ibuId);
```

---

## 🚨 Error Messages Reference

### Backend Errors

| Error                       | Cause                   | Solution                           |
| --------------------------- | ----------------------- | ---------------------------------- |
| `EADDRINUSE`                | Port in use             | Kill process or use different port |
| `ER_ACCESS_DENIED_FOR_USER` | Wrong DB credentials    | Check .env DATABASE_URL            |
| `ER_NO_REFERENCED_TABLE`    | Foreign key constraint  | Ensure parent table exists         |
| `ValidationError`           | Invalid input           | Check request body format          |
| `CORS Error`                | CORS not configured     | Enable CORS for frontend URL       |
| `Cannot find module`        | Missing dependency      | Run `npm install`                  |
| `Pool exhausted`            | Too many DB connections | Increase pool size in config       |

### Frontend Errors

| Error                  | Cause               | Solution                               |
| ---------------------- | ------------------- | -------------------------------------- |
| `Cannot find module`   | Missing import      | Check file path and import statement   |
| `Module parse failed`  | Syntax error        | Check for typos in code                |
| `Unexpected token`     | JSX/syntax issue    | Check brackets, commas, imports        |
| `React Hook error`     | Hook rules violated | Use hooks only in components           |
| `Cannot read property` | Undefined variable  | Check if state/props initialized       |
| `Failed to fetch`      | API unreachable     | Check backend is running, CORS enabled |
| `Element not found`    | DOM query failed    | Check element ID/class exists          |

---

## 📋 Diagnostic Checklist

### Before Troubleshooting

- [ ] Read error message completely
- [ ] Check browser console (F12)
- [ ] Check terminal logs
- [ ] Check .env file is created
- [ ] Check backend is running
- [ ] Check database is running
- [ ] Check ports are available

### For Backend Issues

- [ ] Check Node.js version `node -v`
- [ ] Check npm version `npm -v`
- [ ] Check MySQL is running
- [ ] Check database exists
- [ ] Check table exists
- [ ] Check .env has correct credentials
- [ ] Check all dependencies installed
- [ ] Check no syntax errors `npm run lint`

### For Frontend Issues

- [ ] Check browser console for errors
- [ ] Check Network tab for failed requests
- [ ] Check React DevTools for component state
- [ ] Check all imports are correct
- [ ] Check all dependencies installed
- [ ] Clear browser cache (Ctrl+Shift+Delete)
- [ ] Try incognito window
- [ ] Check node_modules installed

### For Database Issues

- [ ] Verify MySQL is running
- [ ] Test connection `mysql -u root -p`
- [ ] Check database exists `SHOW DATABASES;`
- [ ] Check tables exist `SHOW TABLES;`
- [ ] Check table structure `DESC users;`
- [ ] Check table has data `SELECT COUNT(*) FROM users;`
- [ ] Check no table locks `SHOW PROCESSLIST;`
- [ ] Check disk space `df -h`

---

## 🔍 Debugging Techniques

### Backend Debugging

#### 1. Add Console Logs

```javascript
console.log("Starting server...");

app.get("/api/users", async (req, res) => {
  console.log("Fetching users...");

  try {
    const users = await User.findAll();
    console.log(`Found ${users.length} users`);

    res.json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
```

#### 2. Use Debugger

```javascript
// In src/index.js
debugger; // Code will pause here

// Run with debugger
node --inspect-brk src/index.js

// Then open chrome://inspect in Chrome
```

#### 3. Check Request Body

```javascript
app.use(express.json());
app.use((req, res, next) => {
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Body:", req.body);
  next();
});
```

### Frontend Debugging

#### 1. React DevTools

```
Chrome → Extensions → React DevTools
Then: DevTools → Components tab
See component tree and props/state
```

#### 2. Console Debugging

```javascript
useEffect(() => {
  console.log("Component mounted");
  console.log("Users:", users);

  return () => console.log("Component unmounted");
}, [users]);
```

#### 3. Network Tab Debugging

```
DevTools → Network tab
1. Reload page
2. Look for failed requests (red)
3. Click request to see details
4. Check Response tab for data
5. Check Headers tab for headers
```

#### 4. Application Tab Debugging

```
DevTools → Application tab
1. Check localStorage/sessionStorage
2. Check cookies
3. Look for stored API responses
```

---

## 🎓 Getting Help

### Resources

1. **Official Documentation**

   - Node.js: https://nodejs.org/docs/
   - Express: https://expressjs.com/
   - React: https://react.dev/
   - MySQL: https://dev.mysql.com/doc/
   - TailwindCSS: https://tailwindcss.com/docs

2. **Community**

   - Stack Overflow: https://stackoverflow.com/
   - GitHub Issues: Check project GitHub
   - Reddit: r/webdev, r/learnprogramming
   - Discord: Various dev communities

3. **Tools**
   - Chrome DevTools: F12
   - VS Code Debugger: Built-in
   - Postman: API testing
   - MySQL Workbench: Database GUI

### When Asking for Help

Provide:

1. **Error message** - Full error text
2. **Steps to reproduce** - How to trigger bug
3. **Expected behavior** - What should happen
4. **Actual behavior** - What actually happens
5. **Environment** - OS, Node version, npm version
6. **Code snippet** - Relevant code section
7. **Screenshots** - If visual issue

---

## 💡 Tips & Tricks

### Quick Fixes

```bash
# Clear npm cache
npm cache clean --force

# Reinstall all dependencies
rm -rf node_modules package-lock.json
npm install

# Kill all Node processes
killall node

# Check what's using ports
lsof -i :3000
lsof -i :5200
lsof -i :3306

# Create database backup
mysqldump -u root -p tree_family > backup-$(date +%Y%m%d).sql

# Restore database
mysql -u root -p tree_family < backup-20231223.sql
```

### Development Shortcuts

```bash
# Open frontend in browser
npm run dev # Then visit http://localhost:3000

# Test API endpoints
curl http://localhost:5200/api/users

# Export database
npm run export-db

# Watch for changes
npm run watch
```

---

**Created**: 23 December 2025  
**Version**: 1.0  
**Status**: Ready for Use

Remember: **Google is your friend!** Most errors have been encountered before. 🔍
