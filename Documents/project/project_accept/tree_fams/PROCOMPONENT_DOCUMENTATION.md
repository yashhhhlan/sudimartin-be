# 📊 Pro Family Tree Visualization - Dokumentasi

## 🎯 Deskripsi Komponen

Sistem komponen React + Tailwind CSS yang powerful untuk membuat diagram silsilah keluarga dinamis dengan support **multi-spouse system**. Dirancang dengan estetika modern, animasi smooth, dan responsivitas mobile.

---

## 📦 Komponen-Komponen

### 1. **ProFamilyTreeVisualization** (Main Container)

Komponen utama yang mengelola keseluruhan diagram silsilah.

**Props:**

```javascript
{
  members: Array,           // Array dari semua anggota keluarga
  onEdit: Function,        // Callback saat edit member
  onDelete: Function,      // Callback saat hapus member
  onAddSpouse: Function,   // Callback saat tambah pasangan
  onAddChild: Function,    // Callback saat tambah anak
}
```

**Features:**

- ✅ Filter berdasarkan rentang generasi
- ✅ Toggle garis keturunan (connector lines)
- ✅ Layout responsive untuk mobile
- ✅ SVG connector lines yang dinamis
- ✅ Grouping anak berdasarkan ibu

---

### 2. **ProFamilyTreeCard** (Member Card)

Kartu individual untuk menampilkan member dengan support multi-spouse.

**Props:**

```javascript
{
  member: Object,           // Member primary
  spouses: Array,          // Array pasangan
  generation: Number,      // Nomor generasi
  onEdit: Function,        // Callback edit
  onDelete: Function,      // Callback hapus
  onAddSpouse: Function,   // Callback tambah pasangan
  onAddChild: Function,    // Callback tambah anak
}
```

**Layout Variants:**

- 🔹 **Single**: Member tanpa pasangan
- 🔹 **Couple**: Member dengan 1 pasangan → `[Istri] ♥ [Suami]`
- 🔹 **Multi-Spouse**: Member dengan 2+ pasangan → `[Istri 1] ♥ [Suami] ♥ [Istri 2]`

**Features:**

- ✅ Avatar dengan gender badge
- ✅ Status wafat (deceased indicator)
- ✅ Generation badge (Gen 1, 2, 3...)
- ✅ Sidebar action buttons (Edit, Delete, Add)
- ✅ Hover animations smooth

---

### 3. **FamilyMemberAvatar** (Avatar Component)

Komponen reusable untuk menampilkan avatar member.

**Props:**

```javascript
{
  member: Object,    // Member object
  size: String,      // 'small' | 'medium' | 'large' | 'xlarge'
  onClick: Function, // Callback click
}
```

**Features:**

- ✅ Photo display atau fallback avatar
- ✅ Deceased indicator (†)
- ✅ Gender badge
- ✅ Hover scale animation

---

## 📊 Data Model

### Member Object Structure

```javascript
{
  id: Number,                      // Unique identifier
  nama_depan: String,             // First name
  nama_belakang: String,          // Last name
  gender: String,                 // 'M' | 'Pria' | 'Laki-laki' | 'F' | 'Wanita' | 'Perempuan'
  status_hidup: String,           // 'Hidup' | 'Meninggal'
  status_menikah: String,         // 'Menikah' | 'Belum Menikah'
  photo_url: String,              // URL or base64 data
  tanggal_lahir: String,          // ISO date string
  tanggal_meninggal: String,      // ISO date string (optional)
  generation: Number,             // 1, 2, 3, ...
  ayah_id: Number,                // Father's ID
  ibu_id: Number,                 // Mother's ID

  // MODERN FORMAT - Partners with Children
  partners: [
    {
      spouseId: Number,           // ID of spouse
      children: [
        { id: Number }            // Children IDs from this union
      ]
    }
  ]
}
```

### Relationship Logic

1. **Multi-Spouse Support**: Seorang pria dapat memiliki multiple istri
2. **Children Grouping**: Anak dikelompokkan berdasarkan ibu mereka
3. **Connector Lines**: Garis keturunan ditarik dari pasangan menuju anak mereka

---

## 🎨 Styling & Colors

### Action Buttons Colors

| Aksi       | Warna | Gradient                      |
| ---------- | ----- | ----------------------------- |
| Edit       | Biru  | `from-blue-400 to-blue-600`   |
| Delete     | Merah | `from-red-400 to-red-600`     |
| Add Spouse | Pink  | `from-pink-400 to-pink-600`   |
| Add Child  | Hijau | `from-green-400 to-green-600` |

### Card Design

- **Border Radius**: `rounded-2xl`
- **Shadow**: `shadow-lg` (default), `shadow-2xl` (hover)
- **Border**: `border-2 border-gray-200` (default), `border-blue-400` (hover)
- **Transition**: `transition-all duration-300 ease-in-out`

### Deceased Member

- **Background**: `bg-gray-100`
- **Border**: `border-gray-400`
- **Opacity**: `opacity-70`
- **Indicator**: Simbol † di avatar

---

## 🔄 Responsive Behavior

### Mobile (< 768px)

- Single column layout
- Compact card spacing (gap-3)
- Smaller avatars
- Action buttons at bottom of card

### Tablet (768px - 1024px)

- Flexible wrap layout
- Medium spacing (gap-6)
- Normal avatars

### Desktop (> 1024px)

- Full responsive layout
- Large spacing (gap-8)
- Sidebar action buttons visible on hover

---

## 🛠️ Usage Example

### Import

```javascript
import ProFamilyTreeVisualization from "./components/ProFamilyTreeVisualization";
```

### Basic Usage

```jsx
function FamilyDashboard() {
  const [members, setMembers] = useState([
    {
      id: 1,
      nama_depan: "Ahmad",
      nama_belakang: "Hassan",
      gender: "M",
      status_hidup: "Hidup",
      status_menikah: "Menikah",
      generation: 1,
      photo_url: null,
      tanggal_lahir: "1970-01-15",
      partners: [
        { spouseId: 2, children: [{ id: 3 }, { id: 4 }] },
        { spouseId: 5, children: [{ id: 6 }] },
      ],
    },
    {
      id: 2,
      nama_depan: "Siti",
      gender: "F",
      generation: 1,
      ayah_id: null,
      ibu_id: null,
      status_hidup: "Hidup",
    },
    // ... more members
  ]);

  const handleEdit = (member) => {
    console.log("Edit:", member);
    // Navigate to edit page
  };

  const handleDelete = (member) => {
    console.log("Delete:", member);
    // Show confirmation & delete
  };

  const handleAddSpouse = (member) => {
    console.log("Add spouse for:", member);
    // Open form for adding spouse
  };

  const handleAddChild = (member) => {
    console.log("Add child for:", member);
    // Open form for adding child
  };

  return (
    <ProFamilyTreeVisualization
      members={members}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onAddSpouse={handleAddSpouse}
      onAddChild={handleAddChild}
    />
  );
}
```

---

## 🔧 Advanced Features

### 1. **Multi-Spouse Layout**

Otomatis menampilkan layout optimal berdasarkan jumlah pasangan:

```
0 Spouses:  [Member]
1 Spouse:   [Spouse 1] ♥ [Member]
2+ Spouses: [Spouse 1] ♥ [Member] ♥ [Spouse 2]
```

### 2. **Smart Connector Lines**

- Garis vertikal dari orang tua
- Garis horizontal menghubungkan semua anak
- Garis vertikal ke masing-masing anak
- Grouping otomatis berdasarkan ibu

### 3. **Generation Filtering**

User dapat memilih rentang generasi untuk fokus pada bagian keluarga tertentu.

### 4. **Hover Effects**

- Card scale-up dengan shadow enhancement
- Sidebar buttons fade-in dengan slide animation
- Button scale pada click

---

## ⚙️ Customization

### Mengubah Warna Button

Edit di `ProFamilyTreeCard.jsx`:

```jsx
// Edit Button
className = "... from-blue-400 to-blue-600 ...";

// Delete Button
className = "... from-red-400 to-red-600 ...";

// Add Spouse Button
className = "... from-pink-400 to-pink-600 ...";

// Add Child Button
className = "... from-green-400 to-green-600 ...";
```

### Mengubah Layout Spacing

Edit di `ProFamilyTreeVisualization.jsx`:

```jsx
<div className="... space-y-12 md:space-y-16 ..."> {/* Gap antar generasi */}
<div className="... gap-4 md:gap-6 lg:gap-8 ..."> {/* Gap antar member */}
```

### Mengubah Card Border Radius

Edit di `ProFamilyTreeCard.jsx`:

```jsx
className="... rounded-2xl ..." {/* Ubah ke rounded-xl, rounded-3xl, dll */}
```

---

## 🐛 Troubleshooting

### Garis Keturunan Tidak Muncul

1. Pastikan `showConnectorLines` state `true`
2. Pastikan node refs terdaftar (check console.log)
3. Pastikan member memiliki `ayah_id` atau `ibu_id`

### Multi-Spouse Tidak Menampil Dengan Benar

1. Pastikan member memiliki `partners` array yang properly structured
2. Atau gunakan `status_menikah: 'Menikah'` dengan relasi di database
3. Check console untuk errors

### Card Tidak Responsive

1. Pastikan container memiliki `overflow-auto`
2. Check media query breakpoints (768px, 1024px)
3. Pastikan Tailwind CSS config included

---

## 📝 Notes

- Komponen fully compatible dengan data lama (menggunakan fallback logic)
- Support untuk base64 photo_url (data URIs)
- Automatic gender icon display (♂/♀)
- Deceased members tampil dengan style berbeda
- All animations use Tailwind CSS transitions untuk performance optimal

---

## 🚀 Future Enhancements

- [ ] Export diagram ke PNG/SVG
- [ ] Print-friendly layout
- [ ] Full-screen diagram mode
- [ ] Search/filter members
- [ ] Undo/Redo untuk edit
- [ ] Collaboration features
- [ ] Dark mode support
