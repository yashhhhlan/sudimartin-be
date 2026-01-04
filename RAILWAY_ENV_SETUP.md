# Railway Environment Setup Guide

## Langkah-langkah Setup Environment Variables di Railway Backend:

### 1. Masuk ke Railway Dashboard

- Buka https://railway.app
- Pilih project "sudimartin-be"
- Klik tab "Variables"

### 2. Environment Variables yang Harus Diset:

#### Database Connection

```
DATABASE_URL=mysql://root:r1gMeekR0lUi2vRUNVG51HfTftaFQM@mysql.railway.internal:3306/railway
```

Atau gunakan format alternatif:

```
MYSQL_URL=mysql://root:r1gMeekR0lUi2vRUNVG51HfTftaFQM@mysql.railway.internal:3306/railway
DB_HOST=mysql.railway.internal
DB_USER=root
DB_PASSWORD=r1gMeekR0lUi2vRUNVG51HfTftaFQM
DB_NAME=railway
DB_PORT=3306
```

#### Application Configuration

```
NODE_ENV=production
PORT=8080
FRONTEND_URL=https://sudimartin-fe.vercel.app
JWT_SECRET=your_jwt_secret_key_here_min_32_chars_1234567890
ADMIN_EMAIL=silsilah.keluarga.sp@gmail.com
ADMIN_PASSWORD=#Pagelaran2025
```

### 3. Copy-Paste ke Railway Variables:

Masukkan setiap key-value pair di Railway Variables section:

| Key            | Value                                                                           |
| -------------- | ------------------------------------------------------------------------------- |
| DATABASE_URL   | mysql://root:r1gMeekR0lUi2vRUNVG51HfTftaFQM@mysql.railway.internal:3306/railway |
| NODE_ENV       | production                                                                      |
| PORT           | 8080                                                                            |
| FRONTEND_URL   | https://sudimartin-fe.vercel.app                                                |
| JWT_SECRET     | your_jwt_secret_key_here_min_32_chars_1234567890                                |
| ADMIN_EMAIL    | silsilah.keluarga.sp@gmail.com                                                  |
| ADMIN_PASSWORD | #Pagelaran2025                                                                  |

### 4. Deploy

- Setelah set semua variables, Railway akan otomatis redeploy
- Check deployment logs untuk memastikan berhasil
- Cek health endpoint: https://sudimartin-be.railway.app/api/health

### 5. Test Connection

```bash
curl https://sudimartin-be.railway.app/api/health
```

Expected response:

```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2026-01-04T12:00:00.000Z"
}
```

## Troubleshooting

### Jika connection error:

1. Pastikan DATABASE_URL format benar
2. Pastikan MySQL service di Railway sedang running
3. Check logs di Railway dashboard untuk error detail

### Jika CORS error:

1. Verifikasi FRONTEND_URL di code sudah match dengan Vercel FE URL
2. Pastikan CORS config di index.js sudah update

### Database tidak terisi:

1. Jalankan initialization script jika diperlukan
2. Check apakah migration scripts berjalan otomatis atau manual
