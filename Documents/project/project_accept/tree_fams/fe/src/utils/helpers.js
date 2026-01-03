/**
 * Hitung umur dari tanggal lahir
 */
export const hitungUmur = (tanggalLahir, tanggalMeninggal = null) => {
  if (!tanggalLahir) return null;

  const [hari, bulan, tahun] = tanggalLahir.split("-").map(Number);
  const lahir = new Date(tahun, bulan - 1, hari);

  const referensiTanggal = tanggalMeninggal
    ? (() => {
        const [hMeninggal, bulanMeninggal, tahunMeninggal] = tanggalMeninggal
          .split("-")
          .map(Number);
        return new Date(tahunMeninggal, bulanMeninggal - 1, hMeninggal);
      })()
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
 * Format tanggal dari DD-MM-YYYY ke format readable
 */
export const formatTanggal = (tanggal) => {
  if (!tanggal) return "-";

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
 * Format tanggal ke input date format (YYYY-MM-DD)
 */
export const formatTanggalToInput = (tanggal) => {
  if (!tanggal) return "";
  const [hari, bulan, tahun] = tanggal.split("-");
  return `${tahun}-${bulan}-${hari}`;
};

/**
 * Convert input date (YYYY-MM-DD) ke format DB (DD-MM-YYYY)
 */
export const convertInputDateToDB = (date) => {
  if (!date) return null;
  const [tahun, bulan, hari] = date.split("-");
  return `${hari}-${bulan}-${tahun}`;
};

/**
 * Get gender icon/emoji
 */
export const getGenderIcon = (gender) => {
  return gender === "Pria" ? "👨" : "👩";
};

/**
 * Get generation label
 */
export const getGenerasiLabel = (generasi) => {
  const labels = {
    1: "Gen I",
    2: "Gen II",
    3: "Gen III",
    4: "Gen IV",
    5: "Gen V",
  };
  return labels[generasi] || `Gen ${generasi}`;
};
