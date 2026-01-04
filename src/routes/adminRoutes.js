const express = require("express");
const router = express.Router();
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");
const User = require("../models/User");
const { HTTP_STATUS, USER_ROLE } = require("../config/constants");

// Get all users (admin only)
router.get("/users", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.findAll();

    // Remove password from response
    const safeUsers = users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    res.json({
      success: true,
      data: safeUsers,
      total: safeUsers.length,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error mengambil data users",
      error: error.message,
    });
  }
});

// Get user by ID (admin only)
router.get("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    const { password, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error mengambil data user",
      error: error.message,
    });
  }
});

// Create user (admin only)
router.post("/users", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { namaDepan, namaBelakang, gender, email, role } = req.body;

    if (!namaDepan || !namaBelakang) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Nama depan dan nama belakang harus diisi",
      });
    }

    const newUser = {
      namaDepan,
      namaBelakang,
      gender: gender || "Pria",
      email: email || null,
      role: role || USER_ROLE.USER,
    };

    const user = await User.create(newUser);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "User berhasil dibuat",
      data: user,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error membuat user",
      error: error.message,
    });
  }
});

// Update user (admin only)
router.put("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { namaDepan, namaBelakang, gender, role, email } = req.body;

    const updateData = {};
    if (namaDepan) updateData.namaDepan = namaDepan;
    if (namaBelakang) updateData.namaBelakang = namaBelakang;
    if (gender) updateData.gender = gender;
    if (role) updateData.role = role;
    if (email) updateData.email = email;

    await User.update(req.params.id, updateData);

    const updatedUser = await User.findById(req.params.id);

    res.json({
      success: true,
      message: "User berhasil diupdate",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error mengupdate user",
      error: error.message,
    });
  }
});

// Delete user (admin only)
router.delete("/users/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const success = await User.delete(req.params.id);

    if (!success) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "User berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error menghapus user",
      error: error.message,
    });
  }
});

// Change user role (admin only)
router.put("/users/:id/role", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { role } = req.body;

    if (!role || ![USER_ROLE.ADMIN, USER_ROLE.USER].includes(role)) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Role tidak valid",
      });
    }

    await User.updateRole(req.params.id, role);
    const updatedUser = await User.findById(req.params.id);

    res.json({
      success: true,
      message: "Role user berhasil diubah",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error changing role:", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error mengubah role",
      error: error.message,
    });
  }
});

// Get statistics (admin only)
router.get("/stats", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const allUsers = await User.findAll();
    const admins = await User.findAllByRole(USER_ROLE.ADMIN);
    const regularUsers = await User.findAllByRole(USER_ROLE.USER);

    res.json({
      success: true,
      data: {
        totalUsers: allUsers.length,
        totalAdmins: admins.length,
        totalRegularUsers: regularUsers.length,
        createdToday: allUsers.filter((u) => {
          const createdDate = new Date(u.createdAt).toDateString();
          const todayDate = new Date().toDateString();
          return createdDate === todayDate;
        }).length,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error mengambil statistik",
      error: error.message,
    });
  }
});

module.exports = router;
