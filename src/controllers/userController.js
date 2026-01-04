const User = require("../models/User");
const {
  hitungUmur,
  hitungGenerasi,
  cariSaudara,
} = require("../utils/familyLogic");
const { HTTP_STATUS } = require("../config/constants");

/**
 * Dapatkan semua user dengan kalkulasi umur dan generasi
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();

    // Tambahkan kalkulasi umur dan generasi
    const usersWithCalcs = users.map((user) => ({
      ...user,
      umur: hitungUmur(user.tanggalLahir, user.tanggalWafat),
      generasi: hitungGenerasi(user, users),
    }));

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: usersWithCalcs,
    });
  } catch (error) {
    console.error("Error getAllUsers:", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Gagal mengambil data user",
    });
  }
};

/**
 * Dapatkan user berdasarkan ID dengan detail lengkap
 */
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    // Ambil semua user untuk kalkulasi
    const allUsers = await User.findAll();

    // Ambil data relasi
    const ayah = user.ayahId ? await User.findById(user.ayahId) : null;
    const ibu = user.ibuId ? await User.findById(user.ibuId) : null;
    const pasangan = user.pasanganId
      ? await User.findById(user.pasanganId)
      : null;

    const anak = user.anak
      ? await Promise.all(user.anak.map((id) => User.findById(id)))
      : [];

    const saudara = cariSaudara(id, allUsers);

    const response = {
      ...user,
      umur: hitungUmur(user.tanggalLahir, user.tanggalWafat),
      generasi: hitungGenerasi(user, allUsers),
      relasi: {
        ayah,
        ibu,
        pasangan,
        anak,
        saudara,
      },
    };

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error("Error getUserById:", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Gagal mengambil data user",
    });
  }
};

/**
 * Buat user baru
 */
exports.createUser = async (req, res) => {
  try {
    const userData = req.body;
    console.log("📝 Creating user with data:", userData);

    const user = await User.create(userData);
    console.log("✅ User created:", user);

    // Jika ada pasangan, update relasi dua arah
    if (userData.pasanganId) {
      await User.update(userData.pasanganId, { pasanganId: user.id });
    }

    // Jika ada ayah/ibu, tambahkan sebagai anak mereka
    if (userData.ayahId) {
      await User.addChild(userData.ayahId, user.id);
    }
    if (userData.ibuId) {
      await User.addChild(userData.ibuId, user.id);
    }

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      message: "User berhasil dibuat",
      data: user,
    });
  } catch (error) {
    console.error("❌ Error createUser:", error.message);
    console.error("Error details:", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Gagal membuat user",
      error: error.message,
    });
  }
};

/**
 * Update user
 */
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    // Handle perubahan pasangan
    if (userData.pasanganId && userData.pasanganId !== user.pasanganId) {
      // Hapus relasi lama
      if (user.pasanganId) {
        await User.update(user.pasanganId, { pasanganId: null });
      }
      // Buat relasi baru
      await User.update(userData.pasanganId, { pasanganId: id });
    }

    const success = await User.update(id, userData);

    if (!success) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Gagal update user",
      });
    }

    const updatedUser = await User.findById(id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "User berhasil diupdate",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updateUser:", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Gagal update user",
    });
  }
};

/**
 * Hapus user
 */
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    // Cleanup relasi jika ada
    if (user.pasanganId) {
      await User.update(user.pasanganId, { pasanganId: null });
    }

    if (user.ayahId) {
      await User.removeChild(user.ayahId, id);
    }

    if (user.ibuId) {
      await User.removeChild(user.ibuId, id);
    }

    // Hapus dari anak orang tua
    const allUsers = await User.findAll();
    for (const otherUser of allUsers) {
      if (otherUser.anak && otherUser.anak.includes(id)) {
        await User.removeChild(otherUser.id, id);
      }
    }

    const success = await User.delete(id);

    if (!success) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Gagal hapus user",
      });
    }

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "User berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleteUser:", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Gagal hapus user",
    });
  }
};

/**
 * Cari user berdasarkan nama
 */
exports.searchUser = async (req, res) => {
  try {
    const { namaDepan, namaBelakang = "" } = req.query;

    if (!namaDepan) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: "Parameter namaDepan diperlukan",
      });
    }

    const users = await User.findByName(namaDepan, namaBelakang);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error searchUser:", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Gagal mencari user",
    });
  }
};

/**
 * Export database ke JSON
 */
exports.exportDatabase = async (req, res) => {
  try {
    const users = await User.findAll();
    const { generateFileNameExport } = require("../utils/familyLogic");
    const allUsers = users.map((user) => ({
      ...user,
      umur: hitungUmur(user.tanggalLahir, user.tanggalWafat),
      generasi: hitungGenerasi(user, users),
    }));

    const filename = generateFileNameExport();

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.json({
      exportDate: new Date().toISOString(),
      users: allUsers,
    });
  } catch (error) {
    console.error("Error exportDatabase:", error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Gagal export database",
    });
  }
};
