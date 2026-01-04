const { v4: uuidv4 } = require("uuid");

/**
 * Generate ID unik untuk user
 * @returns {string} - ID dalam format uuid
 */
const generateUserId = () => {
  return uuidv4();
};

/**
 * Validasi format tanggal DD-MM-YYYY
 * @param {string} tanggal - Format: DD-MM-YYYY
 * @returns {boolean}
 */
const validateDateFormat = (tanggal) => {
  const regex = /^\d{2}-\d{2}-\d{4}$/;
  if (!regex.test(tanggal)) return false;

  const [hari, bulan, tahun] = tanggal.split("-").map(Number);

  if (bulan < 1 || bulan > 12) return false;
  if (hari < 1 || hari > 31) return false;

  return true;
};

/**
 * Cleanup response dari database (remove null values atau format khusus)
 * @param {Object} data - Data user
 * @returns {Object}
 */
const cleanupUserData = (data) => {
  const cleaned = { ...data };

  // Parse anak jika string JSON
  if (typeof cleaned.anak === "string") {
    try {
      cleaned.anak = JSON.parse(cleaned.anak);
    } catch {
      cleaned.anak = [];
    }
  }

  return cleaned;
};

module.exports = {
  generateUserId,
  validateDateFormat,
  cleanupUserData,
};
