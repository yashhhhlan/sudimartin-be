# Tree Family Frontend - React + Vite + TailwindCSS

Frontend untuk aplikasi Family Tree menggunakan React, Vite, dan TailwindCSS

## Setup

### 1. Install Dependencies

```bash
cd fe
npm install
```

### 2. Setup Environment (opsional)

```bash
# .env atau .env.local
VITE_API_URL=http://localhost:5200/api
```

### 3. Run Development Server

```bash
npm run dev
```

Frontend akan berjalan di: `http://localhost:3000`

### 4. Build untuk Production

```bash
npm run build
```

---

## Project Structure

```
fe/
├── src/
│   ├── components/        # Reusable components
│   │   ├── UserCard.jsx       # Card untuk display user
│   │   ├── UserForm.jsx       # Form untuk create/edit user
│   │   └── UI.jsx             # UI components (Modal, Alert, dll)
│   ├── pages/            # Page components
│   │   ├── HomePage.jsx       # Home page - list semua user
│   │   └── UserDetailPage.jsx # Detail page - info lengkap user
│   ├── services/         # API calls
│   │   └── api.js             # Axios API client
│   ├── hooks/            # Custom React hooks
│   │   └── index.js           # useFetch, useForm
│   ├── utils/            # Utility functions
│   │   └── helpers.js         # Format tanggal, umur, dll
│   ├── types/            # TypeScript types (optional)
│   ├── styles/           # Global styles
│   │   └── index.css          # Tailwind + custom styles
│   ├── assets/           # Static assets (images, etc)
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── public/               # Static files
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
├── package.json
└── .gitignore
```

---

## Pages & Components

### 📄 Pages

#### HomePage (`/`)

- Menampilkan list semua anggota keluarga dalam grid card
- Fitur: Tambah anggota baru, search, filter
- Shows: Nama, gender, generasi, umur, foto
- Clickable untuk navigate ke detail

#### UserDetailPage (`/user/:id`)

- Menampilkan detail lengkap 1 user
- Fitur: Edit, delete, view relasi (ayah, ibu, anak, saudara, pasangan)
- Shows: Semua info pribadi, pernikahan, relasi keluarga
- Relasi clickable untuk navigate ke user lain

### 🎨 Components

#### UserCard

- Menampilkan user dalam bentuk card
- Bisa single person atau couple view
- Responsive & clickable

#### UserForm

- Form untuk create/edit user
- Validasi input basic
- Support semua field (nama, tgl lahir, tgl menikah, etc)

#### UI Components

- Modal, Alert, LoadingSkeleton
- ErrorAlert, SuccessAlert, NoData
- Pagination (opsional untuk di-extend)

---

## Features

### ✅ Implemented

- [x] List semua user dengan grid layout
- [x] Create user baru via modal form
- [x] View detail user lengkap
- [x] Edit user profile
- [x] Delete user
- [x] Display relasi keluarga (ayah, ibu, anak, saudara, pasangan)
- [x] Calculate dan display umur otomatis
- [x] Display generasi otomatis
- [x] Gender icon & badge
- [x] Foto profil support
- [x] Responsive design dengan Tailwind

### 🔄 Upcoming/Optional

- [ ] Search & filter user
- [ ] Export database ke JSON
- [ ] Import database dari JSON
- [ ] Visual family tree diagram
- [ ] Add relasi (set pasangan, ayah, ibu)
- [ ] Undo/Redo actions
- [ ] Dark mode
- [ ] Offline support (IndexedDB)

---

## API Integration

All API calls go through `/src/services/api.js` using axios:

```javascript
import { userAPI } from "../services/api";

// Get all users
const users = await userAPI.getAllUsers();

// Get user by ID
const user = await userAPI.getUserById(userId);

// Create user
await userAPI.createUser(userData);

// Update user
await userAPI.updateUser(userId, userData);

// Delete user
await userAPI.deleteUser(userId);

// Search
const results = await userAPI.searchUser(namaDepan, namaBelakang);

// Export
await userAPI.exportDatabase();
```

---

## Custom Hooks

### useFetch(fetchFunction)

```javascript
const { data, loading, error, refetch } = useFetch(() => userAPI.getAllUsers());
```

### useForm(initialValues, onSubmit)

```javascript
const { values, handleChange, handleSubmit, loading, error } = useForm(
  { namaDepan: "" },
  (values) => userAPI.createUser(values)
);
```

---

## Styling

- **Framework**: TailwindCSS 3
- **Custom Colors**: primary (blue), secondary (green), danger (red), warning (amber)
- **Responsive**: Mobile-first approach
- **Dark Mode**: Optional (config ready)

### Utility Classes

```css
.card          /* Card styling */
/* Card styling */
/* Card styling */
/* Card styling */
.btn           /* Button base */
.btn-primary   /* Primary button */
.btn-secondary /* Secondary button */
.btn-danger    /* Danger button */
.input-field   /* Input styling */
.text-gradient; /* Gradient text */
```

---

## Development Notes

### Environment Variables

```
VITE_API_URL=http://localhost:5200/api
```

### Hot Reload

Vite provides fast refresh by default. Changes to component files will auto-reload browser.

### Build

```bash
npm run build    # Build untuk production
npm run preview  # Preview build locally
```

### Linting (optional)

```bash
npm run lint     # Run ESLint (setup required)
```

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## License

ISC

---

## Notes

- Format tanggal: DD-MM-YYYY
- Gender: 'Pria' atau 'Wanita'
- API base URL dapat di-override via environment variable
