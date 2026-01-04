# Tree Family Backend - API Documentation

Backend untuk aplikasi Family Tree menggunakan Node.js + Express + MySQL

## Setup

### 1. Install Dependencies

```bash
cd be
npm install
```

### 2. Setup Environment

```bash
cp .env.example .env
# Edit .env dengan konfigurasi database Anda
```

### 3. Create Database

```bash
npm run migrate
# atau
node src/database/createDatabase.js
```

### 4. Run Server

```bash
npm run dev    # Development (dengan auto-reload)
npm start      # Production
```

Server akan berjalan di: `http://localhost:5200`

---

## API Endpoints

### 📊 User Endpoints

#### GET `/api/users`

Dapatkan semua user dengan kalkulasi umur dan generasi

```bash
curl http://localhost:5200/api/users
```

#### GET `/api/users/:id`

Dapatkan detail user dengan relasi lengkap (ayah, ibu, pasangan, anak, saudara)

```bash
curl http://localhost:5200/api/users/{userId}
```

#### GET `/api/users/search?namaDepan=John&namaBelakang=Doe`

Cari user berdasarkan nama

```bash
curl "http://localhost:5200/api/users/search?namaDepan=John"
```

#### POST `/api/users`

Buat user baru

```bash
curl -X POST http://localhost:5200/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "namaDepan": "John",
    "namaBelakang": "Doe",
    "gender": "Pria",
    "tanggalLahir": "01-12-1990",
    "isRoot": true,
    "menikah": false
  }'
```

#### PUT `/api/users/:id`

Update user

```bash
curl -X PUT http://localhost:5200/api/users/{userId} \
  -H "Content-Type: application/json" \
  -d '{
    "namaDepan": "Jane",
    "tanggalMenikah": "15-06-2020"
  }'
```

#### DELETE `/api/users/:id`

Hapus user dan cleanup relasi

```bash
curl -X DELETE http://localhost:5200/api/users/{userId}
```

#### GET `/api/users/export/json`

Export seluruh database ke file JSON

```bash
curl http://localhost:5200/api/users/export/json -o db_backup.json
```

---

## User Data Model

```json
{
  "id": "uuid-string",
  "namaDepan": "John",
  "namaBelakang": "Doe",
  "gender": "Pria",
  "wafat": false,
  "photoUrl": "https://...",
  "tanggalLahir": "01-12-1990",
  "tanggalMenikah": "15-06-2020",
  "tanggalWafat": null,
  "isRoot": true,
  "menikah": false,
  "alamat": "Jln. Example No. 123",
  "tempatLahir": "Jakarta",
  "pekerjaan": "Engineer",
  "pasanganId": "uuid-string",
  "ayahId": "uuid-string",
  "ibuId": "uuid-string",
  "anak": ["uuid-1", "uuid-2"],
  "umur": 33,
  "generasi": 1,
  "createdAt": "2025-01-01T00:00:00Z",
  "updatedAt": "2025-01-01T00:00:00Z"
}
```

---

## Folder Structure

```
be/
├── src/
│   ├── config/          # Configuration files
│   │   ├── database.js
│   │   └── constants.js
│   ├── controllers/     # Business logic
│   │   └── userController.js
│   ├── models/          # Database models
│   │   └── User.js
│   ├── routes/          # API routes
│   │   └── userRoutes.js
│   ├── middleware/      # Middlewares
│   ├── validators/      # Input validators
│   │   └── userValidator.js
│   ├── utils/           # Utility functions
│   │   ├── familyLogic.js   # Logic: umur, generasi, saudara
│   │   └── helpers.js       # Helper functions
│   ├── database/        # Database setup
│   │   └── createDatabase.js
│   └── index.js         # Main app file
├── package.json
├── .env.example
└── .gitignore
```

---

## Database Schema

### users table

| Field          | Type         | Description                   |
| -------------- | ------------ | ----------------------------- |
| id             | VARCHAR(36)  | Primary key (UUID)            |
| namaDepan      | VARCHAR(100) | Required                      |
| namaBelakang   | VARCHAR(100) | Optional                      |
| gender         | ENUM         | 'Pria' atau 'Wanita'          |
| wafat          | BOOLEAN      | Default: false                |
| photoUrl       | VARCHAR(500) | URL foto profil               |
| tanggalLahir   | VARCHAR(10)  | Format: DD-MM-YYYY            |
| tanggalMenikah | VARCHAR(10)  | Format: DD-MM-YYYY            |
| tanggalWafat   | VARCHAR(10)  | Format: DD-MM-YYYY            |
| isRoot         | BOOLEAN      | Penanda akar keluarga (Gen 1) |
| menikah        | BOOLEAN      | Default: false                |
| alamat         | VARCHAR(255) | Alamat tinggal                |
| tempatLahir    | VARCHAR(100) | Tempat lahir                  |
| pekerjaan      | VARCHAR(100) | Pekerjaan                     |
| pasanganId     | VARCHAR(36)  | FK ke user (pasangan)         |
| ayahId         | VARCHAR(36)  | FK ke user (ayah)             |
| ibuId          | VARCHAR(36)  | FK ke user (ibu)              |
| anak           | JSON         | Array of user IDs             |
| createdAt      | TIMESTAMP    | Auto timestamp                |
| updatedAt      | TIMESTAMP    | Auto update timestamp         |

---

## Logic & Calculations

### Umur (Age)

Dihitung dari `tanggalLahir` ke tanggal sekarang, atau ke `tanggalWafat` jika sudah wafat.

```javascript
hitungUmur("01-12-1990"); // return 33 (jika hari ini 2023)
```

### Generasi (Generation)

Ditentukan secara otomatis berdasarkan relasi ayah/ibu:

- Gen 1: isRoot = true
- Gen 2+: Generasi (ayah/ibu) + 1

```javascript
hitungGenerasi(user, allUsers); // return 1, 2, 3, dst
```

### Saudara (Siblings)

Dicari berdasarkan ayah dan ibu yang sama, filter diri sendiri.

```javascript
cariSaudara(userId, allUsers); // return array saudara
```

---

## Notes

- Format tanggal: **DD-MM-YYYY**
- ID menggunakan UUID v4
- Relasi two-way: jika A adalah pasangan B, otomatis B adalah pasangan A
- Anak array akan otomatis diupdate saat menambah relasi ayah/ibu
- Export JSON mencakup kalkulasi umur & generasi

---

## Development

### Available Scripts

```bash
npm run dev       # Run dengan nodemon (auto-reload)
npm start         # Run production
npm run migrate   # Create database & tables
```

### Environment Variables

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=tree_family_db
DB_PORT=3306
NODE_ENV=development
PORT=5200
FRONTEND_URL=http://localhost:3000
```

---

## License

ISC
