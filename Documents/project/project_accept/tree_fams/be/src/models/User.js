const pool = require("../config/database");
const { generateUserId } = require("../utils/helpers");

class User {
  /**
   * Buat user baru
   */
  static async create(userData) {
    // Convert DD-MM-YYYY to YYYY-MM-DD for database
    const convertDate = (dateStr) => {
      if (!dateStr) return null;
      const [day, month, year] = dateStr.split("-");
      return `${year}-${month}-${day}`;
    };

    const query = `
      INSERT INTO users (
        namaDepan, namaBelakang, email, password, gender, 
        tanggalLahir, isRoot, tempatLahir, pekerjaan,
        pasanganId, ayahId, ibuId, role
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      userData.namaDepan,
      userData.namaBelakang || "",
      userData.email || null,
      userData.password || null,
      userData.gender || "Pria",
      convertDate(userData.tanggalLahir),
      userData.isRoot || false,
      userData.tempatLahir || null,
      userData.pekerjaan || null,
      userData.pasanganId || null,
      userData.ayahId || null,
      userData.ibuId || null,
      userData.role || "user",
    ];

    const [result] = await pool.execute(query, values);
    const returnUser = { id: result.insertId, ...userData };
    console.log("📦 Returning user with ID:", returnUser.id);
    return returnUser;
  }

  /**
   * Dapatkan user berdasarkan ID
   */
  static async findById(id) {
    const query = "SELECT * FROM users WHERE id = ?";
    const [rows] = await pool.execute(query, [id]);

    if (rows.length === 0) return null;

    const user = rows[0];
    // Parse anak jika string
    if (typeof user.anak === "string") {
      try {
        user.anak = JSON.parse(user.anak);
      } catch {
        user.anak = [];
      }
    }

    return user;
  }

  /**
   * Dapatkan semua user
   */
  static async findAll() {
    const query = "SELECT * FROM users ORDER BY isRoot DESC, createdAt ASC";
    const [rows] = await pool.execute(query);

    return rows.map((user) => {
      if (typeof user.anak === "string") {
        try {
          user.anak = JSON.parse(user.anak);
        } catch {
          user.anak = [];
        }
      }
      return user;
    });
  }

  /**
   * Update user
   */
  static async update(id, userData) {
    const fields = [];
    const values = [];

    for (const [key, value] of Object.entries(userData)) {
      if (key === "id") continue;

      fields.push(`${key} = ?`);
      if (key === "anak" && Array.isArray(value)) {
        values.push(JSON.stringify(value));
      } else {
        values.push(value);
      }
    }

    values.push(id);

    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    const [result] = await pool.execute(query, values);

    return result.affectedRows > 0;
  }

  /**
   * Hapus user
   */
  static async delete(id) {
    const query = "DELETE FROM users WHERE id = ?";
    const [result] = await pool.execute(query, [id]);

    return result.affectedRows > 0;
  }

  /**
   * Cari user berdasarkan nama
   */
  static async findByName(namaDepan, namaBelakang = "") {
    const query =
      "SELECT * FROM users WHERE namaDepan LIKE ? AND namaBelakang LIKE ?";
    const [rows] = await pool.execute(query, [
      `%${namaDepan}%`,
      `%${namaBelakang}%`,
    ]);

    return rows;
  }

  /**
   * Update anak dari user (tambah/remove dari array)
   */
  static async addChild(parentId, childId) {
    const parent = await this.findById(parentId);
    if (!parent) return false;

    let anak = parent.anak || [];
    if (typeof anak === "string") {
      try {
        anak = JSON.parse(anak);
      } catch {
        anak = [];
      }
    }

    if (!anak.includes(childId)) {
      anak.push(childId);
    }

    return await this.update(parentId, { anak });
  }

  /**
   * Hapus anak dari array
   */
  static async removeChild(parentId, childId) {
    const parent = await this.findById(parentId);
    if (!parent) return false;

    let anak = parent.anak || [];
    if (typeof anak === "string") {
      try {
        anak = JSON.parse(anak);
      } catch {
        anak = [];
      }
    }

    anak = anak.filter((id) => id !== childId);

    return await this.update(parentId, { anak });
  }

  /**
   * Dapatkan user berdasarkan email
   */
  static async findByEmail(email) {
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await pool.execute(query, [email]);

    if (rows.length === 0) return null;

    const user = rows[0];
    // Parse anak jika string
    if (typeof user.anak === "string") {
      try {
        user.anak = JSON.parse(user.anak);
      } catch {
        user.anak = [];
      }
    }

    return user;
  }

  /**
   * Update role user (only for admin)
   */
  static async updateRole(userId, role) {
    const query = "UPDATE users SET role = ? WHERE id = ?";
    const [result] = await pool.execute(query, [role, userId]);
    return result.affectedRows > 0;
  }

  /**
   * Dapatkan semua users dengan filter role
   */
  static async findAllByRole(role) {
    const query = "SELECT * FROM users WHERE role = ?";
    const [rows] = await pool.execute(query, [role]);

    return rows.map((user) => {
      if (typeof user.anak === "string") {
        try {
          user.anak = JSON.parse(user.anak);
        } catch {
          user.anak = [];
        }
      }
      return user;
    });
  }
}

module.exports = User;
