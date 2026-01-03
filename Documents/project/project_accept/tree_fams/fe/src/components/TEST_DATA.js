/**
 * TESTING & DEMO DATA untuk Pro Family Tree Components
 * Gunakan data ini untuk testing dan development
 */

/**
 * SCENARIO 1: Simple Family (Basic Structure)
 * - 1 pasangan utama
 * - 2 anak
 * - No multi-spouse
 */
export const SimpleFamily = [
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
    tanggal_meninggal: null,
    ayah_id: null,
    ibu_id: null,
    partners: [{ spouseId: 2, children: [{ id: 3 }, { id: 4 }] }],
  },
  {
    id: 2,
    nama_depan: "Siti",
    nama_belakang: "Rahman",
    gender: "F",
    status_hidup: "Hidup",
    status_menikah: "Menikah",
    generation: 1,
    photo_url: null,
    tanggal_lahir: "1972-05-20",
    tanggal_meninggal: null,
    ayah_id: null,
    ibu_id: null,
    partners: [{ spouseId: 1, children: [{ id: 3 }, { id: 4 }] }],
  },
  {
    id: 3,
    nama_depan: "Hasan",
    nama_belakang: "Hassan",
    gender: "M",
    status_hidup: "Hidup",
    status_menikah: "Belum Menikah",
    generation: 2,
    photo_url: null,
    tanggal_lahir: "1990-03-10",
    tanggal_meninggal: null,
    ayah_id: 1,
    ibu_id: 2,
    partners: [],
  },
  {
    id: 4,
    nama_depan: "Nur",
    nama_belakang: "Hassan",
    gender: "F",
    status_hidup: "Hidup",
    status_menikah: "Menikah",
    generation: 2,
    photo_url: null,
    tanggal_lahir: "1992-07-22",
    tanggal_meninggal: null,
    ayah_id: 1,
    ibu_id: 2,
    partners: [{ spouseId: 5, children: [{ id: 6 }] }],
  },
  {
    id: 5,
    nama_depan: "Ali",
    nama_belakang: "Husein",
    gender: "M",
    status_hidup: "Hidup",
    status_menikah: "Menikah",
    generation: 2,
    photo_url: null,
    tanggal_lahir: "1991-04-12",
    tanggal_meninggal: null,
    ayah_id: null,
    ibu_id: null,
    partners: [{ spouseId: 4, children: [{ id: 6 }] }],
  },
  {
    id: 6,
    nama_depan: "Zahra",
    nama_belakang: "Hassan",
    gender: "F",
    status_hidup: "Hidup",
    status_menikah: "Belum Menikah",
    generation: 3,
    photo_url: null,
    tanggal_lahir: "2015-09-05",
    tanggal_meninggal: null,
    ayah_id: 5,
    ibu_id: 4,
    partners: [],
  },
];

/**
 * SCENARIO 2: Multi-Spouse Family (Polygon Marriage)
 * - 1 pria dengan 2 istri
 * - Anak dari istri 1 dan istri 2
 * - Demonstrasi grouping children by mother
 */
export const MultiSpouseFamily = [
  // Generation 1 - Suami
  {
    id: 101,
    nama_depan: "Ibrahim",
    nama_belakang: "Khalaf",
    gender: "M",
    status_hidup: "Hidup",
    status_menikah: "Menikah",
    generation: 1,
    photo_url: null,
    tanggal_lahir: "1965-06-20",
    tanggal_meninggal: null,
    ayah_id: null,
    ibu_id: null,
    partners: [
      { spouseId: 102, children: [{ id: 104 }, { id: 105 }] },
      { spouseId: 103, children: [{ id: 106 }] },
    ],
  },

  // Generation 1 - Istri 1
  {
    id: 102,
    nama_depan: "Lena",
    nama_belakang: "Mirza",
    gender: "F",
    status_hidup: "Hidup",
    status_menikah: "Menikah",
    generation: 1,
    photo_url: null,
    tanggal_lahir: "1968-03-15",
    tanggal_meninggal: null,
    ayah_id: null,
    ibu_id: null,
    partners: [{ spouseId: 101, children: [{ id: 104 }, { id: 105 }] }],
  },

  // Generation 1 - Istri 2
  {
    id: 103,
    nama_depan: "Mariam",
    nama_belakang: "Omar",
    gender: "F",
    status_hidup: "Hidup",
    status_menikah: "Menikah",
    generation: 1,
    photo_url: null,
    tanggal_lahir: "1975-11-08",
    tanggal_meninggal: null,
    ayah_id: null,
    ibu_id: null,
    partners: [{ spouseId: 101, children: [{ id: 106 }] }],
  },

  // Generation 2 - Anak dari Istri 1 & Ibrahim
  {
    id: 104,
    nama_depan: "Hassan",
    nama_belakang: "Ibrahim",
    gender: "M",
    status_hidup: "Hidup",
    status_menikah: "Belum Menikah",
    generation: 2,
    photo_url: null,
    tanggal_lahir: "1990-02-10",
    tanggal_meninggal: null,
    ayah_id: 101,
    ibu_id: 102,
    partners: [],
  },

  // Generation 2 - Anak dari Istri 1 & Ibrahim
  {
    id: 105,
    nama_depan: "Fatma",
    nama_belakang: "Ibrahim",
    gender: "F",
    status_hidup: "Hidup",
    status_menikah: "Menikah",
    generation: 2,
    photo_url: null,
    tanggal_lahir: "1992-07-22",
    tanggal_meninggal: null,
    ayah_id: 101,
    ibu_id: 102,
    partners: [{ spouseId: 107, children: [{ id: 108 }] }],
  },

  // Generation 2 - Anak dari Istri 2 & Ibrahim
  {
    id: 106,
    nama_depan: "Mohammed",
    nama_belakang: "Ibrahim",
    gender: "M",
    status_hidup: "Hidup",
    status_menikah: "Belum Menikah",
    generation: 2,
    photo_url: null,
    tanggal_lahir: "1996-09-14",
    tanggal_meninggal: null,
    ayah_id: 101,
    ibu_id: 103,
    partners: [],
  },

  // Generation 2 - Pasangan Fatma
  {
    id: 107,
    nama_depan: "Karim",
    nama_belakang: "Sayid",
    gender: "M",
    status_hidup: "Hidup",
    status_menikah: "Menikah",
    generation: 2,
    photo_url: null,
    tanggal_lahir: "1991-05-18",
    tanggal_meninggal: null,
    ayah_id: null,
    ibu_id: null,
    partners: [{ spouseId: 105, children: [{ id: 108 }] }],
  },

  // Generation 3 - Cucu
  {
    id: 108,
    nama_depan: "Amir",
    nama_belakang: "Karim",
    gender: "M",
    status_hidup: "Hidup",
    status_menikah: "Belum Menikah",
    generation: 3,
    photo_url: null,
    tanggal_lahir: "2018-04-10",
    tanggal_meninggal: null,
    ayah_id: 107,
    ibu_id: 105,
    partners: [],
  },
];

/**
 * SCENARIO 3: Large Extended Family
 * - 4 generasi
 * - Beberapa deceased members
 * - Complex relationships
 */
export const LargeExtendedFamily = [
  // Generation 1 - Kakek/Nenek
  {
    id: 201,
    nama_depan: "Abdullah",
    nama_belakang: "Amr",
    gender: "M",
    status_hidup: "Meninggal",
    status_menikah: "Menikah",
    generation: 1,
    photo_url: null,
    tanggal_lahir: "1940-01-01",
    tanggal_meninggal: "2010-12-25",
    ayah_id: null,
    ibu_id: null,
    partners: [
      { spouseId: 202, children: [{ id: 203 }, { id: 204 }, { id: 205 }] },
    ],
  },

  {
    id: 202,
    nama_depan: "Samira",
    nama_belakang: "Hassan",
    gender: "F",
    status_hidup: "Meninggal",
    status_menikah: "Menikah",
    generation: 1,
    photo_url: null,
    tanggal_lahir: "1945-06-15",
    tanggal_meninggal: "2015-03-10",
    ayah_id: null,
    ibu_id: null,
    partners: [
      { spouseId: 201, children: [{ id: 203 }, { id: 204 }, { id: 205 }] },
    ],
  },

  // Generation 2
  {
    id: 203,
    nama_depan: "Tariq",
    nama_belakang: "Abdullah",
    gender: "M",
    status_hidup: "Hidup",
    status_menikah: "Menikah",
    generation: 2,
    photo_url: null,
    tanggal_lahir: "1965-03-20",
    tanggal_meninggal: null,
    ayah_id: 201,
    ibu_id: 202,
    partners: [
      { spouseId: 206, children: [{ id: 208 }, { id: 209 }] },
      { spouseId: 207, children: [{ id: 210 }] },
    ],
  },

  {
    id: 204,
    nama_depan: "Yasmin",
    nama_belakang: "Abdullah",
    gender: "F",
    status_hidup: "Hidup",
    status_menikah: "Menikah",
    generation: 2,
    photo_url: null,
    tanggal_lahir: "1968-08-10",
    tanggal_meninggal: null,
    ayah_id: 201,
    ibu_id: 202,
    partners: [{ spouseId: 211, children: [{ id: 212 }, { id: 213 }] }],
  },

  {
    id: 205,
    nama_depan: "Rashid",
    nama_belakang: "Abdullah",
    gender: "M",
    status_hidup: "Hidup",
    status_menikah: "Menikah",
    generation: 2,
    photo_url: null,
    tanggal_lahir: "1970-11-05",
    tanggal_meninggal: null,
    ayah_id: 201,
    ibu_id: 202,
    partners: [{ spouseId: 214, children: [{ id: 215 }, { id: 216 }] }],
  },

  // Spouses of Generation 2
  {
    id: 206,
    nama_depan: "Layla",
    nama_belakang: "Noor",
    gender: "F",
    status_hidup: "Hidup",
    status_menikah: "Menikah",
    generation: 2,
    photo_url: null,
    tanggal_lahir: "1967-05-12",
    tanggal_meninggal: null,
    ayah_id: null,
    ibu_id: null,
    partners: [{ spouseId: 203, children: [{ id: 208 }, { id: 209 }] }],
  },

  {
    id: 207,
    nama_depan: "Dina",
    nama_belakang: "Salim",
    gender: "F",
    status_hidup: "Hidup",
    status_menikah: "Menikah",
    generation: 2,
    photo_url: null,
    tanggal_lahir: "1972-09-20",
    tanggal_meninggal: null,
    ayah_id: null,
    ibu_id: null,
    partners: [{ spouseId: 203, children: [{ id: 210 }] }],
  },

  {
    id: 211,
    nama_depan: "Sami",
    nama_belakang: "Kazim",
    gender: "M",
    status_hidup: "Hidup",
    status_menikah: "Menikah",
    generation: 2,
    photo_url: null,
    tanggal_lahir: "1966-02-14",
    tanggal_meninggal: null,
    ayah_id: null,
    ibu_id: null,
    partners: [{ spouseId: 204, children: [{ id: 212 }, { id: 213 }] }],
  },

  {
    id: 214,
    nama_depan: "Amina",
    nama_belakang: "Karim",
    gender: "F",
    status_hidup: "Hidup",
    status_menikah: "Menikah",
    generation: 2,
    photo_url: null,
    tanggal_lahir: "1971-07-30",
    tanggal_meninggal: null,
    ayah_id: null,
    ibu_id: null,
    partners: [{ spouseId: 205, children: [{ id: 215 }, { id: 216 }] }],
  },

  // Generation 3
  {
    id: 208,
    nama_depan: "Karim",
    nama_belakang: "Tariq",
    gender: "M",
    status_hidup: "Hidup",
    status_menikah: "Menikah",
    generation: 3,
    photo_url: null,
    tanggal_lahir: "1990-04-15",
    tanggal_meninggal: null,
    ayah_id: 203,
    ibu_id: 206,
    partners: [{ spouseId: 217, children: [{ id: 220 }] }],
  },

  {
    id: 209,
    nama_depan: "Rida",
    nama_belakang: "Tariq",
    gender: "F",
    status_hidup: "Hidup",
    status_menikah: "Menikah",
    generation: 3,
    photo_url: null,
    tanggal_lahir: "1992-10-20",
    tanggal_meninggal: null,
    ayah_id: 203,
    ibu_id: 206,
    partners: [{ spouseId: 218, children: [{ id: 221 }] }],
  },

  {
    id: 210,
    nama_depan: "Omar",
    nama_belakang: "Tariq",
    gender: "M",
    status_hidup: "Hidup",
    status_menikah: "Belum Menikah",
    generation: 3,
    photo_url: null,
    tanggal_lahir: "1995-08-08",
    tanggal_meninggal: null,
    ayah_id: 203,
    ibu_id: 207,
    partners: [],
  },

  {
    id: 212,
    nama_depan: "Hana",
    nama_belakang: "Sami",
    gender: "F",
    status_hidup: "Hidup",
    status_menikah: "Menikah",
    generation: 3,
    photo_url: null,
    tanggal_lahir: "1991-01-25",
    tanggal_meninggal: null,
    ayah_id: 211,
    ibu_id: 204,
    partners: [{ spouseId: 219, children: [{ id: 222 }] }],
  },

  {
    id: 213,
    nama_depan: "Liam",
    nama_belakang: "Sami",
    gender: "M",
    status_hidup: "Hidup",
    status_menikah: "Belum Menikah",
    generation: 3,
    photo_url: null,
    tanggal_lahir: "1993-11-30",
    tanggal_meninggal: null,
    ayah_id: 211,
    ibu_id: 204,
    partners: [],
  },

  {
    id: 215,
    nama_depan: "Jamal",
    nama_belakang: "Rashid",
    gender: "M",
    status_hidup: "Hidup",
    status_menikah: "Menikah",
    generation: 3,
    photo_url: null,
    tanggal_lahir: "1994-05-10",
    tanggal_meninggal: null,
    ayah_id: 205,
    ibu_id: 214,
    partners: [{ spouseId: 223, children: [] }],
  },

  {
    id: 216,
    nama_depan: "Noor",
    nama_belakang: "Rashid",
    gender: "F",
    status_hidup: "Hidup",
    status_menikah: "Belum Menikah",
    generation: 3,
    photo_url: null,
    tanggal_lahir: "1996-09-18",
    tanggal_meninggal: null,
    ayah_id: 205,
    ibu_id: 214,
    partners: [],
  },

  // Spouses of Generation 3
  {
    id: 217,
    nama_depan: "Hiba",
    nama_belakang: "Nabil",
    gender: "F",
    status_hidup: "Hidup",
    status_menikah: "Menikah",
    generation: 3,
    photo_url: null,
    tanggal_lahir: "1991-06-22",
    tanggal_meninggal: null,
    ayah_id: null,
    ibu_id: null,
    partners: [{ spouseId: 208, children: [{ id: 220 }] }],
  },

  {
    id: 218,
    nama_depan: "Khalil",
    nama_belakang: "Habib",
    gender: "M",
    status_hidup: "Hidup",
    status_menikah: "Menikah",
    generation: 3,
    photo_url: null,
    tanggal_lahir: "1990-03-12",
    tanggal_meninggal: null,
    ayah_id: null,
    ibu_id: null,
    partners: [{ spouseId: 209, children: [{ id: 221 }] }],
  },

  {
    id: 219,
    nama_depan: "Amin",
    nama_belakang: "Rashid",
    gender: "M",
    status_hidup: "Hidup",
    status_menikah: "Menikah",
    generation: 3,
    photo_url: null,
    tanggal_lahir: "1989-12-05",
    tanggal_meninggal: null,
    ayah_id: null,
    ibu_id: null,
    partners: [{ spouseId: 212, children: [{ id: 222 }] }],
  },

  {
    id: 223,
    nama_depan: "Sara",
    nama_belakang: "Malik",
    gender: "F",
    status_hidup: "Hidup",
    status_menikah: "Menikah",
    generation: 3,
    photo_url: null,
    tanggal_lahir: "1995-08-15",
    tanggal_meninggal: null,
    ayah_id: null,
    ibu_id: null,
    partners: [{ spouseId: 215, children: [] }],
  },

  // Generation 4 - Cucu Cicit
  {
    id: 220,
    nama_depan: "Zain",
    nama_belakang: "Karim",
    gender: "M",
    status_hidup: "Hidup",
    status_menikah: "Belum Menikah",
    generation: 4,
    photo_url: null,
    tanggal_lahir: "2018-02-14",
    tanggal_meninggal: null,
    ayah_id: 208,
    ibu_id: 217,
    partners: [],
  },

  {
    id: 221,
    nama_depan: "Mina",
    nama_belakang: "Khalil",
    gender: "F",
    status_hidup: "Hidup",
    status_menikah: "Belum Menikah",
    generation: 4,
    photo_url: null,
    tanggal_lahir: "2019-07-20",
    tanggal_meninggal: null,
    ayah_id: 218,
    ibu_id: 209,
    partners: [],
  },

  {
    id: 222,
    nama_depan: "Elias",
    nama_belakang: "Amin",
    gender: "M",
    status_hidup: "Hidup",
    status_menikah: "Belum Menikah",
    generation: 4,
    photo_url: null,
    tanggal_lahir: "2020-11-10",
    tanggal_meninggal: null,
    ayah_id: 219,
    ibu_id: 212,
    partners: [],
  },
];

/**
 * Mock handler functions untuk testing
 */
export const mockHandlers = {
  handleEdit: (member) => {
    console.log("✏️ Edit:", member);
    alert(`Editing ${member.nama_depan} (ID: ${member.id})`);
  },

  handleDelete: (member) => {
    console.log("🗑️ Delete:", member);
    if (window.confirm(`Delete ${member.nama_depan}?`)) {
      alert(`Deleted ${member.nama_depan}`);
    }
  },

  handleAddSpouse: (member) => {
    console.log("💕 Add Spouse:", member);
    alert(`Add spouse form for ${member.nama_depan}`);
  },

  handleAddChild: (member) => {
    console.log("➕ Add Child:", member);
    alert(`Add child form for ${member.nama_depan}`);
  },
};

/**
 * Export all test scenarios
 */
export default {
  SimpleFamily,
  MultiSpouseFamily,
  LargeExtendedFamily,
  mockHandlers,
};

/**
 * TESTING GUIDELINES:
 *
 * 1. SimpleFamily - Gunakan untuk basic testing
 *    - Validasi layout sederhana
 *    - Test generation filtering
 *    - Test connector lines
 *
 * 2. MultiSpouseFamily - Gunakan untuk multi-spouse testing
 *    - Validasi multi-spouse layout: [Wife1] ♥ [Husband] ♥ [Wife2]
 *    - Test children grouping by mother
 *    - Test connector lines dari different mothers
 *
 * 3. LargeExtendedFamily - Gunakan untuk performance testing
 *    - 22 members, 4 generations
 *    - Multiple deceased members
 *    - Complex relationships
 *    - Test responsiveness dengan data besar
 *
 * 4. Checklist Testing:
 *    ☐ Hover effects muncul
 *    ☐ Action buttons berfungsi
 *    ☐ Generation filter bekerja
 *    ☐ Connector lines tampil
 *    ☐ Deceased badge tampil
 *    ☐ Multi-spouse layout correct
 *    ☐ Children grouped by mother
 *    ☐ Avatar fallback works
 *    ☐ Responsive mobile/tablet/desktop
 *    ☐ Animation smooth
 */
