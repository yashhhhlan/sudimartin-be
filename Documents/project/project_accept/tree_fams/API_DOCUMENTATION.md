# Tree Family API Documentation

Complete API reference untuk Backend Tree Family

**Base URL**: `http://localhost:5200/api`

---

## 📊 User Endpoints

### 1. GET /users

Dapatkan semua user dengan kalkulasi umur dan generasi.

**Request:**

```bash
GET /api/users
```

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "namaDepan": "John",
      "namaBelakang": "Doe",
      "gender": "Pria",
      "wafat": false,
      "photoUrl": "https://example.com/john.jpg",
      "tanggalLahir": "01-12-1960",
      "tanggalMenikah": "15-06-1985",
      "tanggalWafat": null,
      "isRoot": true,
      "menikah": true,
      "alamat": "Jln. Example No. 123",
      "tempatLahir": "Jakarta",
      "pekerjaan": "Engineer",
      "pasanganId": "uuid-pasangan",
      "ayahId": null,
      "ibuId": null,
      "anak": ["uuid-anak1", "uuid-anak2"],
      "umur": 63,
      "generasi": 1,
      "createdAt": "2025-01-01T00:00:00Z",
      "updatedAt": "2025-01-01T00:00:00Z"
    }
  ]
}
```

---

### 2. GET /users/:id

Dapatkan detail user lengkap dengan relasi keluarga.

**Request:**

```bash
GET /api/users/550e8400-e29b-41d4-a716-446655440000
```

**Response (200):**

```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "namaDepan": "John",
    "namaBelakang": "Doe",
    "gender": "Pria",
    "wafat": false,
    "photoUrl": "https://example.com/john.jpg",
    "tanggalLahir": "01-12-1960",
    "tanggalMenikah": "15-06-1985",
    "tanggalWafat": null,
    "isRoot": true,
    "menikah": true,
    "alamat": "Jln. Example No. 123",
    "tempatLahir": "Jakarta",
    "pekerjaan": "Engineer",
    "pasanganId": "uuid-pasangan",
    "ayahId": null,
    "ibuId": null,
    "anak": ["uuid-anak1", "uuid-anak2"],
    "umur": 63,
    "generasi": 1,
    "relasi": {
      "ayah": null,
      "ibu": null,
      "pasangan": {
        "id": "uuid-pasangan",
        "namaDepan": "Jane",
        "namaBelakang": "Doe",
        "gender": "Wanita",
        "umur": 61,
        "generasi": 1
      },
      "anak": [
        {
          "id": "uuid-anak1",
          "namaDepan": "Jim",
          "namaBelakang": "Doe",
          "gender": "Pria",
          "umur": 35,
          "generasi": 2
        }
      ],
      "saudara": []
    }
  }
}
```

**Response (404):**

```json
{
  "success": false,
  "message": "User tidak ditemukan"
}
```

---

### 3. POST /users

Buat user baru. Otomatis handle relasi dua arah.

**Request:**

```bash
POST /api/users
Content-Type: application/json

{
  "namaDepan": "John",
  "namaBelakang": "Doe",
  "gender": "Pria",
  "tanggalLahir": "01-12-1960",
  "tanggalMenikah": "15-06-1985",
  "photoUrl": "https://example.com/john.jpg",
  "isRoot": true,
  "menikah": true,
  "alamat": "Jln. Example No. 123",
  "tempatLahir": "Jakarta",
  "pekerjaan": "Engineer",
  "pasanganId": "uuid-pasangan",
  "ayahId": null,
  "ibuId": null,
  "anak": []
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "User berhasil dibuat",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "namaDepan": "John",
    "namaBelakang": "Doe",
    "gender": "Pria",
    ...
  }
}
```

**Response (400) - Validation Error:**

```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "namaDepan",
      "message": "Nama depan tidak boleh kosong"
    }
  ]
}
```

---

### 4. PUT /users/:id

Update user. Support partial update.

**Request:**

```bash
PUT /api/users/550e8400-e29b-41d4-a716-446655440000
Content-Type: application/json

{
  "namaDepan": "Johnny",
  "pekerjaan": "Senior Engineer",
  "tanggalMenikah": "20-06-1985"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "User berhasil diupdate",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "namaDepan": "Johnny",
    "pekerjaan": "Senior Engineer",
    "tanggalMenikah": "20-06-1985",
    ...
  }
}
```

---

### 5. DELETE /users/:id

Hapus user dan cleanup semua relasi otomatis.

**Request:**

```bash
DELETE /api/users/550e8400-e29b-41d4-a716-446655440000
```

**Response (200):**

```json
{
  "success": true,
  "message": "User berhasil dihapus"
}
```

**Response (404):**

```json
{
  "success": false,
  "message": "User tidak ditemukan"
}
```

---

### 6. GET /users/search?namaDepan=John&namaBelakang=Doe

Cari user berdasarkan nama.

**Request:**

```bash
GET /api/users/search?namaDepan=John&namaBelakang=Doe
```

**Response (200):**

```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "namaDepan": "John",
      "namaBelakang": "Doe",
      ...
    }
  ]
}
```

**Response (400):**

```json
{
  "success": false,
  "message": "Parameter namaDepan diperlukan"
}
```

---

### 7. GET /users/export/json

Export seluruh database ke file JSON dengan kalkulasi.

**Request:**

```bash
GET /api/users/export/json
```

**Response (200):**

```json
{
  "exportDate": "2025-01-20T10:30:00.000Z",
  "users": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "namaDepan": "John",
      "namaBelakang": "Doe",
      "umur": 63,
      "generasi": 1,
      ...
    },
    ...
  ]
}
```

**File Download:**

- Filename: `db_silsilah_20 Januari 2025.json`
- Content-Type: `application/json`

---

## 🔍 Query Parameters

### Search Query

| Parameter    | Type   | Required | Description                |
| ------------ | ------ | -------- | -------------------------- |
| namaDepan    | string | Yes      | Nama depan untuk dicari    |
| namaBelakang | string | No       | Nama belakang untuk dicari |

---

## ✅ Validation Rules

### namaDepan

- Required
- Min length: 2 karakter
- Type: string

### namaBelakang

- Optional
- Min length: 2 karakter
- Type: string

### gender

- Optional
- Values: `'Pria'` atau `'Wanita'`
- Default: `'Pria'`

### tanggalLahir, tanggalMenikah, tanggalWafat

- Optional
- Format: `DD-MM-YYYY`
- Contoh: `01-12-1990`

### photoUrl

- Optional
- Must be valid URL

### menikah, wafat, isRoot

- Optional
- Type: boolean

### anak

- Optional
- Type: array of UUID strings

### pasanganId, ayahId, ibuId

- Optional
- Type: UUID string

---

## 🔐 Error Handling

### Status Codes

| Code | Meaning      | Example                                   |
| ---- | ------------ | ----------------------------------------- |
| 200  | OK           | Successful GET/PUT/DELETE                 |
| 201  | Created      | Successful POST                           |
| 400  | Bad Request  | Validation error, missing required fields |
| 404  | Not Found    | User ID tidak ada                         |
| 500  | Server Error | Database error, unexpected error          |

### Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Error detail"
    }
  ]
}
```

---

## 📋 User Data Model

### Complete User Object

```typescript
interface User {
  // Identity
  id: string; // UUID, auto-generated
  namaDepan: string; // Required
  namaBelakang: string; // Optional, default: ''
  gender: "Pria" | "Wanita"; // Default: 'Pria'
  photoUrl: string; // Optional, URL format

  // Personal Info
  tanggalLahir: string; // DD-MM-YYYY format
  tanggalMenikah: string; // DD-MM-YYYY format
  tanggalWafat: string; // DD-MM-YYYY format
  tempatLahir: string; // Optional
  alamat: string; // Optional
  pekerjaan: string; // Optional

  // Status
  wafat: boolean; // Default: false
  menikah: boolean; // Default: false
  isRoot: boolean; // Default: false (Gen 1 marker)

  // Relations (IDs)
  pasanganId: string; // Optional, UUID
  ayahId: string; // Optional, UUID
  ibuId: string; // Optional, UUID
  anak: string[]; // Array of UUIDs

  // Calculated Fields
  umur: number; // Auto-calculated
  generasi: number; // Auto-calculated (1, 2, 3, ...)

  // Metadata
  createdAt: string; // ISO 8601 timestamp
  updatedAt: string; // ISO 8601 timestamp
}
```

---

## 💡 Usage Examples

### JavaScript/Node.js

```javascript
const axios = require("axios");

const API = axios.create({
  baseURL: "http://localhost:5200/api",
});

// Get all users
const allUsers = await API.get("/users");

// Get user by ID
const user = await API.get("/users/550e8400-e29b-41d4-a716-446655440000");

// Create user
const newUser = await API.post("/users", {
  namaDepan: "John",
  namaBelakang: "Doe",
  tanggalLahir: "01-12-1990",
});

// Update user
const updated = await API.put("/users/550e8400-e29b-41d4-a716-446655440000", {
  pekerjaan: "Engineer",
});

// Delete user
await API.delete("/users/550e8400-e29b-41d4-a716-446655440000");

// Search
const results = await API.get("/users/search", {
  params: { namaDepan: "John", namaBelakang: "Doe" },
});

// Export
const exported = await API.get("/users/export/json");
```

### cURL

```bash
# Get all
curl http://localhost:5200/api/users

# Get by ID
curl http://localhost:5200/api/users/550e8400-e29b-41d4-a716-446655440000

# Create
curl -X POST http://localhost:5200/api/users \
  -H "Content-Type: application/json" \
  -d '{"namaDepan":"John","namaBelakang":"Doe"}'

# Update
curl -X PUT http://localhost:5200/api/users/550e8400-e29b-41d4-a716-446655440000 \
  -H "Content-Type: application/json" \
  -d '{"pekerjaan":"Engineer"}'

# Delete
curl -X DELETE http://localhost:5200/api/users/550e8400-e29b-41d4-a716-446655440000

# Search
curl "http://localhost:5200/api/users/search?namaDepan=John"

# Export
curl http://localhost:5200/api/users/export/json -o db.json
```

### React

```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5200/api'
});

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Get all users
    API.get('/users')
      .then(res => setUsers(res.data.data))
      .catch(err => console.error(err));
  }, []);

  const createUser = async (userData) => {
    const res = await API.post('/users', userData);
    return res.data.data;
  };

  const updateUser = async (id, userData) => {
    const res = await API.put(`/users/${id}`, userData);
    return res.data.data;
  };

  const deleteUser = async (id) => {
    await API.delete(`/users/${id}`);
  };

  return (
    // ... component
  );
}
```

---

## 🧪 Testing dengan Postman

### Import Collection

1. Open Postman
2. Create new Collection "Tree Family API"
3. Add requests:
   - GET /api/users
   - GET /api/users/:id
   - POST /api/users
   - PUT /api/users/:id
   - DELETE /api/users/:id
   - GET /api/users/search
   - GET /api/users/export/json

### Variables

Set environment variables:

```
{{base_url}} = http://localhost:5200/api
{{user_id}} = 550e8400-e29b-41d4-a716-446655440000
```

---

## 📞 Troubleshooting

### 500 Internal Server Error

- Check database connection
- Check error logs in terminal
- Verify SQL syntax

### 400 Validation Error

- Check required fields
- Validate date format (DD-MM-YYYY)
- Check gender value ('Pria' or 'Wanita')

### CORS Error

- Check CORS configuration in backend
- Verify Frontend URL in .env

### Connection Refused

- Check backend is running
- Verify port number
- Check firewall settings

---

## 🚀 Best Practices

1. **Always validate input** on frontend before sending
2. **Handle errors** gracefully with try-catch
3. **Check response.success** before using data
4. **Use pagination** for large datasets (future feature)
5. **Cache data** when possible to reduce API calls
6. **Log errors** for debugging

---

## 📚 Related Documentation

- [Backend README](../be/README.md)
- [Frontend README](../fe/README.md)
- [Main README](../README.md)
