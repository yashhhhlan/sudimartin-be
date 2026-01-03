# 🌳 Pro Family Tree Components - Quick Start Guide

## 📋 Overview

Paket komponen React + Tailwind CSS modern untuk membuat **diagram silsilah keluarga interaktif** dengan dukungan sistem multi-spouse (satu pria dapat memiliki multiple istri).

### ✨ Key Features

- ✅ **Multi-Spouse Support**: Layout otomatis untuk satu orang dengan multiple pasangan
- ✅ **Interactive Cards**: Edit, delete, add spouse/children dengan smooth animations
- ✅ **Smart Connector Lines**: SVG lines yang menghubungkan parent-child secara otomatis
- ✅ **Generation Filtering**: Filter berdasarkan rentang generasi
- ✅ **Responsive Design**: Mobile-first design yang bekerja di semua ukuran layar
- ✅ **Deceased Indicators**: Badge khusus untuk anggota yang sudah meninggal
- ✅ **Avatar System**: Photo display dengan fallback avatar
- ✅ **Smooth Animations**: Semua transisi menggunakan Tailwind CSS

---

## 🎯 Komponen Utama

### 1. ProFamilyTreeVisualization (Main)

Container utama untuk diagram silsilah dengan generation filtering.

```jsx
<ProFamilyTreeVisualization
  members={members}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onAddSpouse={handleAddSpouse}
  onAddChild={handleAddChild}
/>
```

### 2. ProFamilyTreeCard (Display Card)

Kartu individual untuk setiap member dengan multi-spouse layout.

```jsx
<ProFamilyTreeCard
  member={member}
  spouses={[spouse1, spouse2]}
  generation={1}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onAddSpouse={handleAddSpouse}
  onAddChild={handleAddChild}
/>
```

### 3. FamilyMemberAvatar (Avatar)

Avatar component reusable dengan size variants.

```jsx
<FamilyMemberAvatar member={member} size="large" onClick={handleClick} />
```

---

## 🚀 Quick Start

### Step 1: Import Components

```jsx
import ProFamilyTreeVisualization from "./components/ProFamilyTreeVisualization";
import ProFamilyTreeCard from "./components/ProFamilyTreeCard";
import FamilyMemberAvatar from "./components/FamilyMemberAvatar";
```

### Step 2: Prepare Data

```javascript
const members = [
  {
    id: 1,
    nama_depan: "Ahmad",
    nama_belakang: "Hassan",
    gender: "M",
    status_hidup: "Hidup",
    generation: 1,
    photo_url: null,
    tanggal_lahir: "1970-01-15",
    partners: [
      { spouseId: 2, children: [{ id: 3 }] },
      { spouseId: 5, children: [{ id: 6 }] },
    ],
  },
  // ... more members
];
```

### Step 3: Handle Events

```jsx
const handleEdit = (member) => {
  console.log("Edit:", member);
  // Navigate to edit page
};

const handleDelete = (member) => {
  console.log("Delete:", member);
  // Delete logic
};

const handleAddSpouse = (member) => {
  console.log("Add spouse for:", member);
  // Open form
};

const handleAddChild = (member) => {
  console.log("Add child for:", member);
  // Open form
};
```

### Step 4: Render Component

```jsx
<ProFamilyTreeVisualization
  members={members}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onAddSpouse={handleAddSpouse}
  onAddChild={handleAddChild}
/>
```

---

## 📊 Data Format

### Minimal Example

```javascript
{
  id: 1,
  nama_depan: 'Ahmad',
  gender: 'M',
  generation: 1
}
```

### Complete Format

```javascript
{
  // Identity
  id: Number,
  nama_depan: String,
  nama_belakang: String,

  // Personal Info
  gender: 'M' | 'F',
  status_hidup: 'Hidup' | 'Meninggal',
  status_menikah: 'Menikah' | 'Belum Menikah',
  photo_url: String,

  // Dates
  tanggal_lahir: '1970-01-15',
  tanggal_meninggal: '2020-06-15',

  // Family Relationships
  generation: 1,
  ayah_id: Number,
  ibu_id: Number,

  // Multi-Spouse Relationships
  partners: [
    {
      spouseId: Number,
      children: [{ id: Number }]
    }
  ]
}
```

---

## 🎨 Layout Variants

### Single Member

```
┌─────────────┐
│   Avatar    │
│   Name      │
└─────────────┘
```

### Couple (1 Spouse)

```
┌──────────────────────┐
│ Avatar ♥ Avatar      │
│ Name       Name      │
└──────────────────────┘
```

### Multi-Spouse (2+)

```
┌────────────────────────────────────┐
│ Avatar ♥ Avatar ♥ Avatar          │
│ Wife1  Husband  Wife2              │
└────────────────────────────────────┘
```

---

## 🎮 Interactive Features

### Hover Effects

- Card scales up
- Shadow enhances
- Action sidebar appears
- Buttons glow

### Sidebar Action Buttons (Left Side)

| Button        | Color    | Action                      |
| ------------- | -------- | --------------------------- |
| ✏️ Edit       | 🔵 Blue  | Edit member info            |
| 🗑️ Delete     | 🔴 Red   | Remove member               |
| 💕 Add Spouse | 🩷 Pink   | Add spouse (if single male) |
| ➕ Add Child  | 🟢 Green | Add child                   |

### Connector Lines

- Vertical line dari parent
- Horizontal line antar children
- Vertical lines ke each child
- Auto-grouped by mother (ibu_id)

---

## 📱 Responsive Breakpoints

| Screen              | Layout   | Features               |
| ------------------- | -------- | ---------------------- |
| Mobile (< 768px)    | Stack    | Bottom action buttons  |
| Tablet (768-1024px) | 2-Column | Sidebar buttons appear |
| Desktop (> 1024px)  | Full     | All features active    |

---

## 🔧 Common Customizations

### Change Button Colors

Edit `ProFamilyTreeCard.jsx`:

```jsx
// Edit button - ubah dari blue ke purple
className = "... from-purple-400 to-purple-600 ...";
```

### Change Card Styling

Edit `ProFamilyTreeCard.jsx`:

```jsx
// Ubah rounded-2xl ke rounded-xl untuk corners yang lebih tajam
className = "... rounded-xl ...";
```

### Change Spacing

Edit `ProFamilyTreeVisualization.jsx`:

```jsx
// Ubah gap antar members
<div className="... gap-8 ...">
```

### Change Animation Speed

Edit Tailwind classes:

```jsx
// Ubah duration-300 ke duration-500 untuk slower animation
className = "... transition-all duration-500 ...";
```

---

## 🐛 Troubleshooting

### Garis Keturunan Tidak Muncul

✅ Solusi:

1. Pastikan `ayah_id` dan `ibu_id` set dengan benar
2. Pastikan child `generation = parent.generation + 1`
3. Klik tombol toggle "Tampilkan Garis"
4. Check browser console untuk errors

### Multi-Spouse Tidak Menampil

✅ Solusi:

1. Pastikan member memiliki `partners` array
2. Atau gunakan `status_menikah: 'Menikah'`
3. Pastikan spouse ada di members array dengan `id` yang sesuai

### Card Tidak Responsive

✅ Solusi:

1. Pastikan TailwindCSS dikonfigurasi dengan benar
2. Pastikan file CSS di-import
3. Check browser dev tools untuk CSS loading

### Avatar Tidak Muncul

✅ Solusi:

1. Pastikan `photo_url` valid (data URI atau URL)
2. Jika URL, pastikan CORS enabled
3. Fallback avatar akan muncul otomatis

---

## 📚 File Structure

```
components/
├── ProFamilyTreeVisualization.jsx    (Main container)
├── ProFamilyTreeCard.jsx             (Card component)
├── FamilyMemberAvatar.jsx            (Avatar component)
├── USAGE_EXAMPLES.jsx                (Usage examples)
└── (existing components)

docs/
├── PROCOMPONENT_DOCUMENTATION.md     (Full documentation)
└── QUICK_START_GUIDE.md              (This file)

config/
└── tailwind-custom.config.js         (Custom utilities)
```

---

## 🚀 Integration dengan Existing Code

### Mengganti FamilyTreeVisualization

```jsx
// OLD
import FamilyTreeVisualization from "./FamilyTreeVisualization";

// NEW
import ProFamilyTreeVisualization from "./ProFamilyTreeVisualization";
```

### Backward Compatibility

Komponen baru masih support format data lama:

```javascript
// Format lama (dengan status_menikah)
{ id: 1, nama_depan: 'Ahmad', status_menikah: 'Menikah' }

// Format baru (dengan partners array)
{ id: 1, nama_depan: 'Ahmad', partners: [...] }

// Kedua format akan bekerja!
```

---

## 💡 Best Practices

1. **Always provide generation field**

   ```javascript
   generation: 1, // Required untuk connector lines
   ```

2. **Use consistent gender format**

   ```javascript
   gender: "M"; // atau 'Pria', 'Laki-laki', 'F', 'Wanita'
   ```

3. **Provide tanggal_lahir for date display**

   ```javascript
   tanggal_lahir: '1970-01-15', // ISO format
   ```

4. **Group spouses properly**

   ```javascript
   partners: [
     { spouseId: 2, children: [{ id: 3 }] },
     { spouseId: 5, children: [{ id: 6 }] },
   ];
   ```

5. **Handle callbacks properly**
   ```javascript
   onEdit={async (member) => {
     // Your edit logic
     // Update state or fetch
   }}
   ```

---

## 📖 Full Documentation

Lihat `PROCOMPONENT_DOCUMENTATION.md` untuk dokumentasi lengkap tentang:

- Semua props yang tersedia
- Data model details
- Styling dan customization
- Advanced features
- API integration examples

---

## 🎓 Examples

### Example 1: Simple Usage

Lihat `USAGE_EXAMPLES.jsx` → `SimpleExample`

### Example 2: API Integration

Lihat `USAGE_EXAMPLES.jsx` → `IntegratedExample`

### Example 3: Standalone Cards

Lihat `USAGE_EXAMPLES.jsx` → `CustomCardExample`

### Example 4: Avatar Showcase

Lihat `USAGE_EXAMPLES.jsx` → `AvatarShowcaseExample`

---

## ⚡ Performance Tips

1. **Memoize member list**

   ```jsx
   const members = useMemo(() => fetchMembers(), []);
   ```

2. **Use React.memo for cards**

   ```jsx
   const MemoCard = React.memo(ProFamilyTreeCard);
   ```

3. **Implement virtual scrolling for > 100 members**

   ```jsx
   import { FixedSizeList } from "react-window";
   ```

4. **Optimize SVG rendering**
   ```jsx
   const lines = useMemo(() => generateConnectorLines(), [members]);
   ```

---

## 🌟 Key Improvements vs Previous Version

| Feature           | Old     | New         |
| ----------------- | ------- | ----------- |
| Multi-Spouse      | ❌      | ✅          |
| Responsive        | Partial | ✅ Full     |
| Sidebar Buttons   | Fixed   | ✅ Hover    |
| Animations        | Basic   | ✅ Smooth   |
| Mobile Support    | Limited | ✅ Full     |
| Generation Filter | ✅      | ✅ Improved |
| Connector Lines   | ✅      | ✅ Smarter  |

---

## 📞 Support

Untuk pertanyaan atau issue:

1. Check `PROCOMPONENT_DOCUMENTATION.md`
2. Check `USAGE_EXAMPLES.jsx`
3. Check Tailwind CSS docs
4. Check browser console untuk errors

---

## 📄 License

Bagian dari Family Tree Application project.

---

## 🎉 Ready to Use!

Copy 3 file component ke folder `components/`:

- `ProFamilyTreeVisualization.jsx`
- `ProFamilyTreeCard.jsx`
- `FamilyMemberAvatar.jsx`

Kemudian import dan gunakan dalam aplikasi Anda!

```jsx
import ProFamilyTreeVisualization from "./components/ProFamilyTreeVisualization";

function MyFamilyPage() {
  return <ProFamilyTreeVisualization members={members} {...handlers} />;
}
```

Happy coding! 🚀
