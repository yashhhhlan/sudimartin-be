# 🔐 Security & Best Practices Guide

Panduan lengkap untuk security dan best practices dalam Tree Family Project.

---

## 🔒 Security Checklist

### Backend Security

#### Environment Variables

- ✅ Database credentials di `.env`
- ✅ `.env` tidak commit ke git
- ✅ `.env.example` untuk template
- ✅ `DB_PASSWORD` tidak hardcoded
- ✅ `API_KEY` dapat di-add jika diperlukan

#### Input Validation

- ✅ `express-validator` untuk validate input
- ✅ Sanitize string input
- ✅ Validate email format
- ✅ Validate date format (DD-MM-YYYY)
- ✅ Validate gender values (Pria/Wanita)

#### Error Handling

- ✅ Custom error responses
- ✅ No sensitive data in errors
- ✅ Proper HTTP status codes
- ✅ Error logging without leaking info

#### Database Security

- ✅ Parameterized queries (prevent SQL injection)
- ✅ Foreign key constraints
- ✅ Proper indexing
- ✅ Database user permissions

#### CORS Configuration

- ✅ CORS enabled for frontend only
- ✅ Credentials allowed when needed
- ✅ Specific origins whitelist

### Frontend Security

#### Input Handling

- ✅ Form validation
- ✅ Sanitize user input
- ✅ XSS prevention
- ✅ CSRF tokens (when needed)

#### API Calls

- ✅ HTTPS only (production)
- ✅ No sensitive data in URLs
- ✅ Secure headers
- ✅ Error handling

#### Data Storage

- ✅ Never store passwords
- ✅ Never store sensitive tokens
- ✅ Use localStorage carefully
- ✅ Clear sensitive data on logout

#### Code Security

- ✅ Dependency updates
- ✅ Remove console.log in production
- ✅ No hardcoded credentials
- ✅ Validate external libraries

---

## 📝 Best Practices

### Backend Best Practices

#### Code Organization

```
✅ Separation of Concerns
   - Controllers: Request handling
   - Models: Database operations
   - Routes: Endpoint definitions
   - Validators: Input validation
   - Utils: Helper functions

✅ DRY Principle
   - Reusable functions
   - No code duplication
   - Shared utilities

✅ Naming Conventions
   - camelCase for variables
   - PascalCase for classes
   - UPPER_CASE for constants
   - Descriptive names
```

#### Error Handling

```javascript
// ✅ Good
try {
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User tidak ditemukan",
    });
  }
  res.json({ success: true, data: user });
} catch (error) {
  console.error("Error:", error);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}

// ❌ Bad
const user = User.findById(id);
res.json(user);
```

#### Validation

```javascript
// ✅ Good
[
  body("namaDepan")
    .trim()
    .notEmpty()
    .withMessage("Nama depan tidak boleh kosong")
    .isLength({ min: 2 })
    .withMessage("Minimal 2 karakter"),
  body("gender").isIn(["Pria", "Wanita"]).withMessage("Gender tidak valid"),
];

// ❌ Bad
if (data.namaDepan) {
  // process
}
```

### Frontend Best Practices

#### Component Structure

```javascript
// ✅ Good - Functional component with hooks
function UserCard({ user, onClick }) {
  return (
    <div onClick={onClick} className="card">
      {/* JSX */}
    </div>
  );
}

// ❌ Bad - Class component (outdated)
class UserCard extends React.Component {
  // ...
}
```

#### State Management

```javascript
// ✅ Good - Use hooks
const [users, setUsers] = useState([]);
const [loading, setLoading] = useState(false);

// ❌ Bad - State in parent, drill props
function App() {
  const [users, setUsers] = useState([]);
  return <Child users={users} setUsers={setUsers} />;
}
```

#### API Integration

```javascript
// ✅ Good - Centralized API client
const userAPI = {
  getAllUsers: () => apiClient.get("/users"),
  getUserById: (id) => apiClient.get(`/users/${id}`),
  createUser: (data) => apiClient.post("/users", data),
};

// ❌ Bad - Fetch in component
function HomePage() {
  useEffect(() => {
    fetch("/api/users").then(/* ... */);
  }, []);
}
```

#### Form Handling

```javascript
// ✅ Good - Controlled inputs
<input
  name="namaDepan"
  value={formData.namaDepan}
  onChange={handleChange}
/>

// ❌ Bad - Uncontrolled inputs
<input name="namaDepan" />
```

#### Error Handling

```javascript
// ✅ Good
const { data, loading, error } = useFetch(() => userAPI.getAllUsers());
if (error) return <ErrorAlert message={error} />;

// ❌ Bad
const users = await userAPI.getAllUsers();
// No error handling
```

### Database Best Practices

#### Schema Design

```sql
-- ✅ Good
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  namaDepan VARCHAR(100) NOT NULL,
  ayahId VARCHAR(36),
  FOREIGN KEY (ayahId) REFERENCES users(id),
  INDEX idx_ayahId (ayahId)
);

-- ❌ Bad
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(255),
  data TEXT
);
```

#### Queries

```javascript
// ✅ Good - Parameterized query
const [rows] = await pool.execute("SELECT * FROM users WHERE id = ?", [userId]);

// ❌ Bad - SQL injection vulnerable
const rows = pool.query(`SELECT * FROM users WHERE id = '${userId}'`);
```

#### Performance

```sql
-- ✅ Good - Use indexes
INDEX idx_isRoot (isRoot)
INDEX idx_ayahId (ayahId)

-- ✅ Good - Limit results
SELECT * FROM users LIMIT 10;

-- ❌ Bad - No indexes
-- ❌ Bad - Load all data
SELECT * FROM users;
```

---

## 🛡️ Security Hardening

### Development

- [ ] Use `.env` for credentials
- [ ] Enable CORS only for frontend
- [ ] Validate all inputs
- [ ] Use HTTPS (even in dev with self-signed cert)
- [ ] Keep dependencies updated

### Testing

- [ ] Test error scenarios
- [ ] Test with invalid inputs
- [ ] Test with large datasets
- [ ] Test with concurrent requests
- [ ] Check error messages don't leak info

### Staging

- [ ] Use production-like environment
- [ ] Test with real data volume
- [ ] Load testing
- [ ] Security scanning
- [ ] Penetration testing (optional)

### Production

- [ ] Use strong database passwords
- [ ] Enable database backups
- [ ] Use HTTPS only
- [ ] Enable logging & monitoring
- [ ] Regular security audits
- [ ] Keep dependencies updated
- [ ] Implement rate limiting
- [ ] Setup firewalls
- [ ] Use WAF (Web Application Firewall)

---

## 🔍 Code Review Checklist

### Before Commit

#### Code Quality

- [ ] Code is clean & readable
- [ ] No console.log() in production code
- [ ] No hardcoded credentials
- [ ] No commented code
- [ ] No TODOs without context
- [ ] Consistent naming
- [ ] DRY principle followed

#### Error Handling

- [ ] Try-catch blocks where needed
- [ ] Error messages are user-friendly
- [ ] No sensitive data in errors
- [ ] Proper HTTP status codes
- [ ] Logging for debugging

#### Security

- [ ] Input validation present
- [ ] No SQL injection possible
- [ ] No XSS vulnerabilities
- [ ] Credentials in .env
- [ ] No sensitive data logged

#### Performance

- [ ] Database queries optimized
- [ ] No N+1 queries
- [ ] Proper indexing
- [ ] No memory leaks
- [ ] Efficient algorithms

#### Testing

- [ ] Manual testing done
- [ ] Edge cases tested
- [ ] Error scenarios tested
- [ ] UI responsive tested
- [ ] API endpoints tested

---

## 🚀 Deployment Checklist

### Pre-Deployment

#### Environment

- [ ] Production database created
- [ ] Database backups configured
- [ ] Environment variables set
- [ ] Logging configured
- [ ] Monitoring configured

#### Code

- [ ] All tests passing
- [ ] Code reviewed
- [ ] Dependencies updated
- [ ] Build successful
- [ ] No errors in console

#### Security

- [ ] HTTPS enabled
- [ ] Credentials secured
- [ ] CORS properly configured
- [ ] Rate limiting configured
- [ ] WAF rules set (if using)

#### Performance

- [ ] Frontend built & minified
- [ ] Assets optimized
- [ ] Caching configured
- [ ] CDN setup (if using)
- [ ] Load testing done

### Post-Deployment

#### Monitoring

- [ ] Check application logs
- [ ] Monitor error rates
- [ ] Monitor performance
- [ ] Check database
- [ ] Monitor resources

#### Validation

- [ ] Test all features
- [ ] Test on different browsers
- [ ] Test on mobile
- [ ] Verify API endpoints
- [ ] Check database integrity

---

## 📊 Monitoring & Logging

### What to Log

#### Application Events

```javascript
// ✅ Good logging
console.log(`[${timestamp}] User ${userId} created`);
console.error(`[${timestamp}] Database connection failed: ${error.message}`);

// ❌ Bad logging
console.log(user); // Can leak sensitive data
console.log(error); // Full error stack
```

### Metrics to Monitor

#### Backend

- Request rate
- Response time
- Error rate
- Database query time
- Memory usage
- CPU usage

#### Frontend

- Page load time
- API call duration
- JavaScript errors
- User interactions
- Performance metrics

#### Database

- Query performance
- Connection count
- Slow queries
- Disk usage
- Backup status

---

## 🔄 Update & Maintenance

### Regular Tasks

#### Weekly

- [ ] Check application logs
- [ ] Monitor error rates
- [ ] Verify backups

#### Monthly

- [ ] Update dependencies
- [ ] Security audit
- [ ] Performance review
- [ ] Database cleanup

#### Quarterly

- [ ] Full security scan
- [ ] Disaster recovery test
- [ ] Load testing
- [ ] Code review

#### Annually

- [ ] Penetration testing
- [ ] Architecture review
- [ ] Scalability assessment
- [ ] Team training

---

## 📚 Resources

### Security

- OWASP Top 10: https://owasp.org/www-project-top-ten/
- Express Security: https://expressjs.com/en/advanced/best-practice-security.html
- React Security: https://snyk.io/blog/10-react-security-best-practices/

### Best Practices

- Node.js Best Practices: https://github.com/goldbergyoni/nodebestpractices
- Express Performance: https://expressjs.com/en/advanced/best-practice-performance.html
- REST API Design: https://restfulapi.net/

### Tools

- npm audit: Check for vulnerabilities
- Snyk: Vulnerability scanning
- ESLint: Code linting
- SonarQube: Code quality

---

## ✅ Security Checklist for Code

Before pushing code:

```javascript
// ✅ Never do this:
const password = "hardcoded123";
const apiKey = "sk_live_...";
const database = "user=root password=123";

// ✅ Always do this:
const password = process.env.DB_PASSWORD;
const apiKey = process.env.API_KEY;
const database = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

// ✅ Validate & sanitize:
const namaDepan = req.body.namaDepan?.trim();
if (!namaDepan || namaDepan.length < 2) {
  return res.status(400).json({ error: "Invalid name" });
}

// ✅ Handle errors gracefully:
try {
  const user = await User.findById(id);
  res.json({ success: true, data: user });
} catch (error) {
  console.error("Error:", error);
  res.status(500).json({ error: "Internal server error" });
}

// ❌ Never log sensitive data:
console.log(req.body.password); // ❌ DON'T
console.log(user.password); // ❌ DON'T
console.log(error); // ❌ Be careful with full errors
```

---

## 🎯 Summary

Security is ongoing process:

1. **Develop Securely** - Follow best practices
2. **Test Thoroughly** - Test all scenarios
3. **Deploy Carefully** - Follow checklist
4. **Monitor Always** - Watch for issues
5. **Update Regularly** - Keep dependencies fresh

**Remember**: Security by default, not by accident! 🔐

---

**Created**: 23 December 2025  
**Version**: 1.0  
**Status**: Ready for Development
