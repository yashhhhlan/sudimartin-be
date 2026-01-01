/**
 * Menghitung umur dari tanggal lahir
 * @param {string|Date} tanggalLahir - Format: DD-MM-YYYY atau YYYY-MM-DD
 * @param {string|Date} tanggalMeninggal - Format: DD-MM-YYYY atau YYYY-MM-DD (opsional)
 * @returns {number} - Umur dalam tahun
 */
const hitungUmur = (tanggalLahir, tanggalMeninggal = null) => {
  if (!tanggalLahir) return null;

  // Helper function to parse date string or Date object
  const parseDate = (dateInput) => {
    if (!dateInput) return null;

    // If it's already a Date object, return it
    if (dateInput instanceof Date) {
      return dateInput;
    }

    // Convert string to Date
    const dateStr = String(dateInput).trim();
    const parts = dateStr.split("-").map(Number);

    if (parts.length === 3) {
      // Check if format is YYYY-MM-DD (database format)
      if (parts[0] > 31) {
        return new Date(parts[0], parts[1] - 1, parts[2]);
      }
      // Otherwise assume DD-MM-YYYY format
      return new Date(parts[2], parts[1] - 1, parts[0]);
    }

    return new Date(dateStr);
  };

  const lahir = parseDate(tanggalLahir);
  if (!lahir || isNaN(lahir.getTime())) return null;

  const referensiTanggal = tanggalMeninggal
    ? parseDate(tanggalMeninggal)
    : new Date();

  let umur = referensiTanggal.getFullYear() - lahir.getFullYear();
  const bulanSekarang = referensiTanggal.getMonth();
  const bulanLahir = lahir.getMonth();

  if (
    bulanSekarang < bulanLahir ||
    (bulanSekarang === bulanLahir &&
      referensiTanggal.getDate() < lahir.getDate())
  ) {
    umur--;
  }

  return umur < 0 ? null : umur;
};

/**
 * Menentukan generasi berdasarkan ayah/ibu dan anak
 * @param {Object} user - Data user
 * @param {Array} allUsers - Semua data user
 * @returns {number} - Nomor generasi (1, 2, 3, dst)
 */
const hitungGenerasi = (user, allUsers) => {
  // Jika user adalah root (isRoot true)
  if (user.isRoot) return 1;

  // Cari generasi dari ayah atau ibu
  let maxGenesiAyahIbu = 0;

  if (user.ayahId) {
    const ayah = allUsers.find((u) => u.id === user.ayahId);
    if (ayah) {
      maxGenesiAyahIbu = Math.max(
        maxGenesiAyahIbu,
        hitungGenerasi(ayah, allUsers)
      );
    }
  }

  if (user.ibuId) {
    const ibu = allUsers.find((u) => u.id === user.ibuId);
    if (ibu) {
      maxGenesiAyahIbu = Math.max(
        maxGenesiAyahIbu,
        hitungGenerasi(ibu, allUsers)
      );
    }
  }

  return maxGenesiAyahIbu > 0 ? maxGenesiAyahIbu + 1 : 1;
};

/**
 * Format tanggal dari string ke format yang lebih readable
 * @param {string} tanggal - Format: DD-MM-YYYY
 * @returns {string} - Format: 01 Januari 2021
 */
const formatTanggal = (tanggal) => {
  if (!tanggal) return null;

  const bulanIndonesia = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const [hari, bulan, tahun] = tanggal.split("-");
  return `${hari} ${bulanIndonesia[parseInt(bulan) - 1]} ${tahun}`;
};

/**
 * Generate nama file export database dengan timestamp
 * @returns {string} - Format: db_silsilah_21 Desember 2025.json
 */
const generateFileNameExport = () => {
  const bulanIndonesia = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const now = new Date();
  const hari = now.getDate();
  const bulan = bulanIndonesia[now.getMonth()];
  const tahun = now.getFullYear();

  return `db_silsilah_${hari} ${bulan} ${tahun}.json`;
};

/**
 * Mencari saudara user (berbagi ayah/ibu yang sama)
 * @param {string} userId - ID user
 * @param {Array} allUsers - Semua data user
 * @returns {Array} - Daftar saudara (filter diri sendiri)
 */
const cariSaudara = (userId, allUsers) => {
  const user = allUsers.find((u) => u.id === userId);
  if (!user) return [];

  const saudara = [];

  // Cari dari anak ayah
  if (user.ayahId) {
    const ayah = allUsers.find((u) => u.id === user.ayahId);
    if (ayah && ayah.anak) {
      ayah.anak.forEach((anakId) => {
        if (anakId !== userId) {
          const sdr = allUsers.find((u) => u.id === anakId);
          if (sdr) saudara.push(sdr);
        }
      });
    }
  }

  // Cari dari anak ibu (jika belum ada)
  if (user.ibuId) {
    const ibu = allUsers.find((u) => u.id === user.ibuId);
    if (ibu && ibu.anak) {
      ibu.anak.forEach((anakId) => {
        if (anakId !== userId && !saudara.find((s) => s.id === anakId)) {
          const sdr = allUsers.find((u) => u.id === anakId);
          if (sdr) saudara.push(sdr);
        }
      });
    }
  }

  // Remove duplikat jika ada
  return Array.from(new Map(saudara.map((item) => [item.id, item])).values());
};

module.exports = {
  hitungUmur,
  hitungGenerasi,
  formatTanggal,
  generateFileNameExport,
  cariSaudara,
};
