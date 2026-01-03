# ⚡ Performance Optimization Guide

Panduan lengkap untuk optimize performa Tree Family Project.

---

## 🚀 Quick Performance Wins

### Backend Optimization

#### 1. Database Query Optimization

```javascript
// ❌ Bad - N+1 queries
const users = await User.findAll();
for (let user of users) {
  user.ayah = await User.findById(user.ayahId);
  user.ibu = await User.findById(user.ibuId);
}

// ✅ Good - Single query with JOIN
const users = await pool.execute(`
  SELECT u.*, 
         a.namaDepan as ayahNama,
         i.namaDepan as ibuNama
  FROM users u
  LEFT JOIN users a ON u.ayahId = a.id
  LEFT JOIN users i ON u.ibuId = i.id
`);
```

#### 2. Caching Frequently Accessed Data

```javascript
// Add simple caching layer
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function getUsersWithCache() {
  const cacheKey = "all_users";

  // Check cache
  if (cache.has(cacheKey)) {
    const { data, timestamp } = cache.get(cacheKey);
    if (Date.now() - timestamp < CACHE_TTL) {
      return data;
    }
  }

  // Fetch from DB
  const users = await User.findAll();
  cache.set(cacheKey, { data: users, timestamp: Date.now() });

  return users;
}
```

#### 3. Pagination for Large Datasets

```javascript
// In controller
async function getAllUsers(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const users = await User.findAll(limit, offset);
  const total = await User.count();

  res.json({
    success: true,
    data: users,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
}
```

#### 4. Connection Pooling

```javascript
// Already configured in config/database.js
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // ✅ Good
  queueLimit: 0,
});
```

#### 5. Response Compression

```javascript
// In src/index.js
const compression = require("compression");

app.use(compression());

// Before routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
```

#### 6. Error Handling Performance

```javascript
// ❌ Slow - Catches all errors
try {
  // Large block of code
} catch (error) {
  // Slow error processing
}

// ✅ Fast - Specific error handling
const user = await User.findById(id);
if (!user) {
  return res.status(404).json({ error: "Not found" });
}

try {
  await User.update(id, data);
} catch (error) {
  return res.status(500).json({ error: "Update failed" });
}
```

### Frontend Optimization

#### 1. Code Splitting with React

```javascript
// ✅ Lazy load pages
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/HomePage"));
const UserDetailPage = lazy(() => import("./pages/UserDetailPage"));

function App() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/:id" element={<UserDetailPage />} />
      </Routes>
    </Suspense>
  );
}
```

#### 2. Optimize Renders with useMemo & useCallback

```javascript
// ✅ Prevent unnecessary re-renders
import { useMemo, useCallback } from "react";

function HomePage() {
  const [users, setUsers] = useState([]);

  // Memoize expensive computation
  const filteredUsers = useMemo(() => {
    return users.filter((u) => u.isRoot);
  }, [users]);

  // Memoize callback to pass to child
  const handleCreate = useCallback((data) => {
    // Create user
  }, []);

  return <UserList users={filteredUsers} onCreate={handleCreate} />;
}
```

#### 3. Virtual Scrolling for Long Lists

```javascript
// Install: npm install react-window
import { FixedSizeList as List } from "react-window";

function UserList({ users }) {
  return (
    <List height={600} itemCount={users.length} itemSize={100} width="100%">
      {({ index, style }) => (
        <div style={style}>
          <UserCard user={users[index]} />
        </div>
      )}
    </List>
  );
}
```

#### 4. Image Optimization

```javascript
// ✅ Use responsive images
<img
  src={user.photoUrl}
  alt={user.namaDepan}
  loading="lazy"
  width="200"
  height="200"
/>

// ✅ Consider using WebP with fallback
<picture>
  <source srcSet={user.photoUrl + '.webp'} type="image/webp" />
  <img src={user.photoUrl} alt={user.namaDepan} />
</picture>
```

#### 5. Minimize Bundle Size

```javascript
// ✅ Good - Only import what you need
import { debounce } from "lodash-es";

// ❌ Bad - Imports entire library
import _ from "lodash";

// Use built-in alternatives where possible
// Instead of moment.js, use built-in Date or date-fns
const formatted = new Intl.DateTimeFormat("id-ID").format(new Date());
```

#### 6. Optimize Network Requests

```javascript
// ✅ Debounce search requests
const handleSearch = useCallback(
  debounce(async (query) => {
    const results = await userAPI.searchUser(query);
    setResults(results);
  }, 300),
  []
);

// ✅ Request only needed fields
userAPI.getAllUsers({ fields: "id,namaDepan,namaBelakang" });

// ✅ Batch multiple requests
const [users, relationships] = await Promise.all([
  userAPI.getAllUsers(),
  userAPI.getRelationships(),
]);
```

---

## 📊 Performance Metrics

### What to Measure

#### Backend Metrics

```javascript
// Track response time
const start = Date.now();
const users = await User.findAll();
const duration = Date.now() - start;
console.log(`Query took ${duration}ms`);

// Monitor memory usage
const used = process.memoryUsage();
console.log(`Heap used: ${Math.round(used.heapUsed / 1024 / 1024)} MB`);

// Track request rate
let requestCount = 0;
app.use((req, res, next) => {
  requestCount++;
  next();
});
```

#### Frontend Metrics

```javascript
// Web Vitals
npm install web-vitals

import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### Performance Targets

| Metric                   | Target  | Good    | Poor    |
| ------------------------ | ------- | ------- | ------- |
| Time to Interactive      | < 3.8s  | < 3.8s  | > 7.3s  |
| First Contentful Paint   | < 1.8s  | < 1.8s  | > 3.0s  |
| Largest Contentful Paint | < 2.5s  | < 2.5s  | > 4.0s  |
| Cumulative Layout Shift  | < 0.1   | < 0.1   | > 0.25  |
| API Response Time        | < 200ms | < 200ms | > 500ms |
| Database Query           | < 100ms | < 100ms | > 500ms |

---

## 🛠️ Performance Tools

### Development Tools

#### 1. Chrome DevTools

```
1. Open Developer Tools (F12)
2. Go to Performance tab
3. Click Record button
4. Use your app
5. Click Stop
6. Analyze the timeline
```

#### 2. Lighthouse

```
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Select "Generate report"
4. Review performance score
5. Follow recommendations
```

#### 3. React DevTools Profiler

```
1. Install React DevTools extension
2. Go to Profiler tab
3. Click Record button
4. Use your app
5. Check which components re-render
```

### Production Monitoring

#### 1. Application Performance Monitoring (APM)

```javascript
// Setup basic APM
const startTime = Date.now();

app.get("/api/users", async (req, res) => {
  const queryStart = Date.now();

  try {
    const users = await User.findAll();
    const duration = Date.now() - queryStart;

    // Log performance
    console.log(`Users API - Duration: ${duration}ms, Count: ${users.length}`);

    res.json({ success: true, data: users });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
```

#### 2. Sentry for Error Tracking

```bash
npm install @sentry/node

# In src/index.js
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0
});

app.use(Sentry.Handlers.errorHandler());
```

---

## 🔍 Performance Checklist

### Before Production

#### Backend

- [ ] Database queries optimized
- [ ] Proper indexing added
- [ ] Connection pooling configured
- [ ] Compression enabled
- [ ] Caching implemented
- [ ] Error handling efficient
- [ ] No N+1 queries
- [ ] Response times < 200ms
- [ ] Memory leaks tested
- [ ] Load testing done

#### Frontend

- [ ] Code splitting configured
- [ ] Lazy loading implemented
- [ ] Images optimized
- [ ] Bundle size < 100KB (gzipped)
- [ ] Unused dependencies removed
- [ ] CSS unused classes removed
- [ ] Minification enabled
- [ ] No memory leaks
- [ ] Lighthouse score > 90
- [ ] Web Vitals good

#### Network

- [ ] Gzip compression enabled
- [ ] Caching headers set
- [ ] CDN configured
- [ ] API endpoints optimized
- [ ] Batch requests where possible
- [ ] Pagination implemented
- [ ] HTTPS enforced
- [ ] HTTP/2 enabled (if possible)
- [ ] DNS prefetch added
- [ ] Preload critical resources

---

## 💡 Advanced Optimization

### Database Level

#### 1. Query Optimization Example

```sql
-- ❌ Slow - Scans entire table
SELECT * FROM users WHERE namaDepan LIKE '%Ahmad%';

-- ✅ Fast - Uses index
SELECT * FROM users WHERE namaDepan = 'Ahmad'
LIMIT 10;

-- ✅ Good - Add index
ALTER TABLE users ADD INDEX idx_namaDepan (namaDepan);
```

#### 2. Materialized Views for Complex Queries

```javascript
// Create cached results for expensive queries
async function getFamilyTree(userId) {
  const cacheKey = `family_tree_${userId}`;

  // Check cache first
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  // Build tree (expensive operation)
  const tree = await buildFamilyTree(userId);

  // Cache for 1 hour
  cache.set(cacheKey, tree);
  setTimeout(() => cache.delete(cacheKey), 60 * 60 * 1000);

  return tree;
}
```

### Application Level

#### 1. Worker Threads for Heavy Operations

```javascript
// For heavy calculations in background
const { Worker } = require("worker_threads");

async function calculateGenerationAsync(userId) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./workers/generationCalculator.js");

    worker.on("message", resolve);
    worker.on("error", reject);

    worker.postMessage({ userId });
  });
}
```

#### 2. Rate Limiting

```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use("/api/", limiter);
```

---

## 📈 Scaling Strategy

### Phase 1: Single Server

- Current architecture
- Suitable for < 10k users
- 1 backend, 1 database

### Phase 2: Load Balancing

```nginx
# Add load balancer (nginx)
upstream backend {
  server backend1:5200;
  server backend2:5200;
  server backend3:5200;
}

server {
  listen 80;

  location /api/ {
    proxy_pass http://backend;
  }
}
```

### Phase 3: Database Replication

```
Master Database (writes)
  ↓
Slave Database 1 (reads)
Slave Database 2 (reads)
```

### Phase 4: Microservices

```
API Gateway
  ├── User Service
  ├── Family Service
  └── Report Service
```

---

## 🎯 Summary

Performance optimization is ongoing:

1. **Measure First** - Know your bottlenecks
2. **Optimize Smart** - Focus on high-impact areas
3. **Test Thoroughly** - Verify improvements
4. **Monitor Always** - Keep watching metrics
5. **Iterate Continuously** - Keep improving

### Key Areas to Focus

1. **Database**: Optimize queries, add indexes, use caching
2. **Frontend**: Code splitting, lazy loading, image optimization
3. **Network**: Compression, caching, CDN
4. **Monitoring**: Track metrics, set alerts
5. **Scaling**: Plan for growth

---

**Created**: 23 December 2025  
**Version**: 1.0  
**Status**: Ready for Development

Remember: _"Premature optimization is the root of all evil" - Donald Knuth_

But _measuring first_ and then optimizing high-impact areas is key! ⚡
