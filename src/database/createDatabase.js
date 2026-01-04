const mysql = require("mysql2/promise");
require("dotenv").config();

/**
 * Script untuk membuat database dan table
 * Run: node src/database/createDatabase.js
 */

const createDatabase = async () => {
  try {
    // Connect ke MySQL tanpa database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "root1234",
      port: process.env.DB_PORT || 3306,
    });

    console.log("✓ Connected to MySQL Server");

    // Create database
    const dbName = process.env.DB_NAME || "tree_family_db";
    await connection.execute(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`✓ Database '${dbName}' created/exists`);

    // Use database
    await connection.execute(`USE ${dbName}`);

    // Create users table
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        namaDepan VARCHAR(100) NOT NULL,
        namaBelakang VARCHAR(100) DEFAULT '',
        gender ENUM('Pria', 'Wanita') DEFAULT 'Pria',
        wafat BOOLEAN DEFAULT false,
        photoUrl VARCHAR(500),
        tanggalLahir VARCHAR(10),
        tanggalMenikah VARCHAR(10),
        tanggalWafat VARCHAR(10),
        isRoot BOOLEAN DEFAULT false,
        menikah BOOLEAN DEFAULT false,
        alamat VARCHAR(255),
        tempatLahir VARCHAR(100),
        pekerjaan VARCHAR(100),
        pasanganId VARCHAR(36),
        ayahId VARCHAR(36),
        ibuId VARCHAR(36),
        anak JSON DEFAULT '[]',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        KEY idx_isRoot (isRoot),
        KEY idx_ayahId (ayahId),
        KEY idx_ibuId (ibuId),
        KEY idx_pasanganId (pasanganId),
        FOREIGN KEY (ayahId) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (ibuId) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (pasanganId) REFERENCES users(id) ON DELETE SET NULL
      )
    `;

    await connection.execute(createTableSQL);
    console.log("✓ Table users created/exists");

    await connection.end();
    console.log("\n✨ Database setup completed successfully!");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

createDatabase();
