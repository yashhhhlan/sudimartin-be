# FamilyTreeNode Component - Spesifikasi Verifikasi

## ✅ VALIDASI LENGKAP - Semua Requirement Terpenuhi

---

## 1. SPESIFIKASI UMUM (Card Layout)

### ✅ Card Container

- **Status:** SESUAI
- **Implementasi:**
  ```jsx
  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-5 cursor-pointer relative">
  ```
- **Detail:**
  - `bg-white` - Background putih
  - `rounded-xl` - Sudut melengkung
  - `shadow-md` - Bayangan lembut
  - `hover:shadow-lg` - Hover effect

### ✅ Badge Generasi (Gen n)

- **Status:** SESUAI
- **Lokasi:** Top-right corner
- **Implementasi:**
  ```jsx
  <div className="absolute top-3 right-3 bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
    Gen {generation}
  </div>
  ```
- **Detail:**
  - Posisi: `absolute top-3 right-3`
  - Background biru muda: `bg-blue-100`
  - Text biru: `text-blue-700`
  - Shape: `rounded-full`

### ✅ Tombol Aksi Vertikal (Kiri Luar)

- **Status:** SESUAI
- **Buttons:** Edit (biru), Delete (merah), Add Child (hijau)
- **Implementasi:**
  ```jsx
  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 flex flex-col gap-2 ...">
    // Edit, Delete, Add Anggota buttons
  </div>
  ```
- **Detail:**
  - Posisi: `absolute left-0` (sisi kiri luar)
  - Stack vertikal: `flex flex-col gap-2`
  - Offset dari card: `-translate-x-16`

### ✅ Animasi Hover Smooth (Group)

- **Status:** SESUAI
- **Default State:** `opacity-0 -translate-x-2`
- **Hover State:** `group-hover:opacity-100 group-hover:translate-x-0`
- **Implementasi:**
  ```jsx
  <div className="group relative w-96">
    <div className="... group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
      // Action buttons dengan smooth slide-in
    </div>
  </div>
  ```
- **Detail:**
  - Parent: `group relative`
  - Buttons: `opacity-0 -translate-x-2`
  - On Hover: `opacity-100 translate-x-0`
  - Transition: `transition-all duration-300`

---

## 2. VARIAN UI PERSON (Single)

### ✅ Layout Horizontal

- **Status:** SESUAI
- **Struktur:** Avatar (kiri) + Detail Teks (kanan)
- **Implementasi:**
  ```jsx
  <div className="flex gap-4">
    <div className="flex-shrink-0">
      <Avatar person={member} size="medium" />
    </div>
    <div className="flex-1 flex flex-col justify-center">
      {/* Detail teks */}
    </div>
  </div>
  ```

### ✅ Detail Teks

- **Status:** SESUAI
- **Menampilkan:**
  1. **Nama** (bold)
     ```jsx
     <h3 className="font-bold text-gray-800 text-base leading-tight">
       {member.nama_depan} {member.nama_belakang}
     </h3>
     ```
  2. **Nama Sapaan/Organisasi** (italic, gray)
     ```jsx
     <p className="text-xs text-gray-600 italic">({member.nama_sapaan})</p>
     ```
  3. **Gender Icon** (♂/♀)
     ```jsx
     <p className="text-lg font-bold text-gray-700 mt-1">
       {getGenderIcon(member.gender)}
     </p>
     ```
  4. **Status Pernikahan**
     ```jsx
     <p className="text-xs text-gray-600 mt-1 font-semibold">
       {member.status_menikah}
     </p>
     ```

### ✅ Kondisi Wafat (Meninggal)

- **Status:** SESUAI
- **Implementasi:** Avatar Component
  ```jsx
  {
    isDeceased(person.status_hidup) && (
      <div className="absolute inset-0 rounded-full border-4 border-gray-400 flex items-center justify-center">
        <span className="text-3xl font-bold text-gray-500 bg-white bg-opacity-80 rounded-full w-8 h-8 flex items-center justify-center">
          †
        </span>
      </div>
    );
  }
  ```
- **Detail:**
  - Badge "†" menempel di center avatar
  - Background semi-transparent putih
  - Border abu-abu untuk emphasis

### ✅ Gender Icon (♂/♀)

- **Status:** SESUAI
- **Lokasi:** Di samping nama
- **Implementasi:**
  ```jsx
  const getGenderIcon = (gender) => {
    return gender.toLowerCase() === "m" || gender.toLowerCase() === "laki-laki"
      ? "♂"
      : "♀";
  };
  ```

---

## 3. VARIAN UI COUPLE (Menikah)

### ✅ Layout Dua Avatar Bersampingan

- **Status:** SESUAI
- **Implementasi:**
  ```jsx
  <div className="flex justify-center gap-8 mb-4">
    <div className="flex flex-col items-center">
      <Avatar person={member} size="large" />
      <h3 className="font-bold text-gray-800 text-sm mt-3 text-center">
        {member.nama_depan}
      </h3>
    </div>
    <div className="flex flex-col items-center">
      <Avatar person={couple} size="large" />
      <h3 className="font-bold text-gray-800 text-sm mt-3 text-center">
        {couple.nama_depan}
      </h3>
    </div>
  </div>
  ```

### ✅ Nama Di Bawah Masing-Masing Avatar

- **Status:** SESUAI
- **Detail:**
  - Nama suami: langsung di bawah avatar suami
  - Nama istri: langsung di bawah avatar istri
  - Text center alignment: `text-center`
  - Max-width untuk wrapping: `max-w-28`

### ✅ Status Wafat Per Individu

- **Status:** SESUAI
- **Detail:** Avatar component check status per person
  ```jsx
  {isDeceased(person.status_hidup) && (
    // Tampilkan † untuk orang tersebut
  )}
  ```
- Bisa: Suami wafat (istri hidup), istri wafat (suami hidup), atau keduanya wafat

### ✅ Indikator Visual Tengah (Optional)

- **Status:** DITAMBAHKAN
- **Implementasi:**
  ```jsx
  {
    member.tanggal_nikah && (
      <div className="text-center text-xs text-gray-600 border-t pt-3">
        💒 Menikah: {tanggal_nikah}
      </div>
    );
  }
  ```
- **Detail:** Menampilkan tanggal pernikahan sebagai separator tengah dengan emoji 💒

---

## 4. RESPONSIVE & INTERACTIVE

### ✅ Avatar Sizes

- **Small:** `w-16 h-16` (untuk list)
- **Medium:** `w-24 h-24` (single person card)
- **Large:** `w-32 h-32` (couple card)

### ✅ Card Click Behavior

- **Single & Couple:** Expand detail ke bawah
- **Animation:** Smooth with `animate-in fade-in`

### ✅ Hover Effects

- Action buttons slide-in dari kiri
- Card shadow increase: `shadow-md → shadow-lg`
- Buttons scale up on hover: `hover:scale-110`

---

## 5. RINGKASAN COMPLIANCE

| Requirement                                | Status | Notes                   |
| ------------------------------------------ | ------ | ----------------------- |
| Card Container (white, rounded-xl, shadow) | ✅     | Sesuai spec             |
| Badge Gen di top-right                     | ✅     | Absolute positioned     |
| Tombol Aksi 3 button (Edit/Delete/Add)     | ✅     | Vertikal, kiri luar     |
| Animasi group hover smooth                 | ✅     | opacity & translate     |
| Layout Person horizontal                   | ✅     | Avatar kiri, teks kanan |
| Detail Nama + Gelar + Gender               | ✅     | Semua ditampilkan       |
| Status Wafat (†)                           | ✅     | Di avatar               |
| Layout Couple side-by-side                 | ✅     | Dua kolom               |
| Nama di bawah avatar masing                | ✅     | Centered                |
| Status Wafat per orang                     | ✅     | Independent             |
| Indikator tengah (tanggal)                 | ✅     | Extra feature           |

---

## 6. NEXT STEPS (Optional Enhancement)

- [ ] Connection lines antara generations
- [ ] Edit form modal
- [ ] Delete confirmation dialog
- [ ] Add child form
- [ ] Photo fullscreen viewer
- [ ] Drag & drop reordering

---

**Verifikasi Tanggal:** 26 Desember 2025  
**Status:** ✅ READY FOR PRODUCTION
