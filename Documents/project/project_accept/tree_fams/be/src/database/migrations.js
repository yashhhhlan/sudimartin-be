const mysql = require("mysql2/promise");
require("dotenv").config();

async function runMigrations() {
  let connection;

  try {
    // Connect to MySQL without specifying database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "root1234",
      port: process.env.DB_PORT || 3306,
    });

    console.log("✅ Connected to MySQL");

    // Create database if not exists
    await connection.execute(
      "CREATE DATABASE IF NOT EXISTS `tree_family_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci"
    );
    console.log("✅ Database created/exists");

    // Use the database
    await connection.execute("USE `tree_family_db`");

    // Create users table with role field
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        namaDepan VARCHAR(100) NOT NULL,
        namaBelakang VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        gender ENUM('Pria', 'Wanita') NOT NULL,
        tanggalLahir VARCHAR(20),
        tempatLahir VARCHAR(200),
        alamat TEXT,
        pekerjaan VARCHAR(100),
        photoUrl VARCHAR(500),
        wafat BOOLEAN DEFAULT false,
        tanggalWafat VARCHAR(20),
        menikah BOOLEAN DEFAULT false,
        tanggalMenikah VARCHAR(20),
        pasanganId VARCHAR(36),
        ayahId VARCHAR(36),
        ibuId VARCHAR(36),
        anak JSON DEFAULT '[]',
        role ENUM('admin', 'user') DEFAULT 'user',
        isRoot BOOLEAN DEFAULT false,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_isRoot (isRoot),
        INDEX idx_ayahId (ayahId),
        INDEX idx_ibuId (ibuId),
        INDEX idx_pasanganId (pasanganId),
        INDEX idx_role (role),
        INDEX idx_email (email),
        FOREIGN KEY (ayahId) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (ibuId) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (pasanganId) REFERENCES users(id) ON DELETE SET NULL
      )
    `);
    console.log("✅ Users table created/exists");

    // Add parent ID fields to family_members table if they don't exist
    try {
      await connection.execute(`
        ALTER TABLE family_members 
        ADD COLUMN ayah_id INT
      `);
      console.log("✅ ayah_id field added to family_members table");
    } catch (err) {
      console.log("ℹ️ ayah_id might already exist:", err.code);
    }

    try {
      await connection.execute(`
        ALTER TABLE family_members 
        ADD COLUMN ibu_id INT
      `);
      console.log("✅ ibu_id field added to family_members table");
    } catch (err) {
      console.log("ℹ️ ibu_id might already exist:", err.code);
    }

    // Add foreign key for ayah_id
    try {
      await connection.execute(`
        ALTER TABLE family_members 
        ADD CONSTRAINT fk_ayah_id 
        FOREIGN KEY (ayah_id) REFERENCES family_members(id) ON DELETE SET NULL
      `);
      console.log("✅ Foreign key for ayah_id added");
    } catch (err) {
      console.log("ℹ️ Foreign key for ayah_id might already exist:", err.code);
    }

    // Add foreign key for ibu_id
    try {
      await connection.execute(`
        ALTER TABLE family_members 
        ADD CONSTRAINT fk_ibu_id 
        FOREIGN KEY (ibu_id) REFERENCES family_members(id) ON DELETE SET NULL
      `);
      console.log("✅ Foreign key for ibu_id added");
    } catch (err) {
      console.log("ℹ️ Foreign key for ibu_id might already exist:", err.code);
    }

    console.log("✅ All migrations completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Migration error:", error.message);
    process.exit(1);
  } finally {
    if (connection) await connection.end();
  }
}

runMigrations();
