const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const {
  validateUser,
  validateSearchUser,
  validateUserId,
  handleValidationErrors,
} = require("../validators/userValidator");

/**
 * User Routes
 */

// GET - Dapatkan semua user
router.get("/", userController.getAllUsers);

// GET - Search user
router.get(
  "/search",
  validateSearchUser,
  handleValidationErrors,
  userController.searchUser
);

// GET - Export database
router.get("/export/json", userController.exportDatabase);

// GET - Dapatkan user by ID
router.get(
  "/:id",
  validateUserId,
  handleValidationErrors,
  userController.getUserById
);

// POST - Buat user baru
router.post(
  "/",
  validateUser,
  handleValidationErrors,
  userController.createUser
);

// PUT - Update user
router.put(
  "/:id",
  validateUserId,
  validateUser,
  handleValidationErrors,
  userController.updateUser
);

// DELETE - Hapus user
router.delete(
  "/:id",
  validateUserId,
  handleValidationErrors,
  userController.deleteUser
);

module.exports = router;
