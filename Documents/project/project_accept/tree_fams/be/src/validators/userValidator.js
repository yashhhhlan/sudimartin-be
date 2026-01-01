const { body, query, param, validationResult } = require("express-validator");
const { validateDateFormat } = require("../utils/helpers");

/**
 * Validate create/update user
 */
const validateUser = [
  body("namaDepan")
    .trim()
    .notEmpty()
    .withMessage("Nama depan tidak boleh kosong")
    .isLength({ min: 2 })
    .withMessage("Nama depan minimal 2 karakter"),

  body("namaBelakang")
    .trim()
    .optional()
    .isLength({ min: 2 })
    .withMessage("Nama belakang minimal 2 karakter"),

  body("gender")
    .optional()
    .isIn(["Pria", "Wanita"])
    .withMessage("Gender harus Pria atau Wanita"),

  body("wafat").optional().isBoolean().withMessage("Wafat harus boolean"),

  body("tanggalLahir")
    .optional()
    .custom((value) => {
      if (value && !validateDateFormat(value)) {
        throw new Error("Format tanggal harus DD-MM-YYYY");
      }
      return true;
    }),

  body("tanggalMenikah")
    .optional()
    .custom((value) => {
      if (value && !validateDateFormat(value)) {
        throw new Error("Format tanggal harus DD-MM-YYYY");
      }
      return true;
    }),

  body("tanggalWafat")
    .optional()
    .custom((value) => {
      if (value && !validateDateFormat(value)) {
        throw new Error("Format tanggal harus DD-MM-YYYY");
      }
      return true;
    }),

  body("photoUrl")
    .optional()
    .custom((value) => {
      // Allow both regular URLs and base64 data URLs
      if (value && !value.startsWith("data:") && !value.startsWith("http")) {
        throw new Error("PhotoUrl harus URL atau data URL");
      }
      return true;
    }),

  body("menikah").optional().isBoolean().withMessage("Menikah harus boolean"),

  body("alamat").optional().trim(),

  body("tempatLahir").optional().trim(),

  body("pekerjaan").optional().trim(),

  body("pasanganId").optional().trim(),

  body("ayahId").optional().trim(),

  body("ibuId").optional().trim(),

  body("anak").optional().isArray().withMessage("Anak harus array"),

  body("isRoot").optional().isBoolean().withMessage("isRoot harus boolean"),
];

/**
 * Validate search user
 */
const validateSearchUser = [
  query("namaDepan")
    .trim()
    .notEmpty()
    .withMessage("Parameter namaDepan diperlukan"),

  query("namaBelakang").optional().trim(),
];

/**
 * Validate user ID params
 */
const validateUserId = [
  param("id").trim().notEmpty().withMessage("ID tidak boleh kosong"),
];

/**
 * Middleware untuk handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: errors.array(),
    });
  }
  next();
};

module.exports = {
  validateUser,
  validateSearchUser,
  validateUserId,
  handleValidationErrors,
};
