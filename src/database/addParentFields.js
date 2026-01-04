const mysql = require("mysql2/promise");
require("dotenv").config();

async function addParentFields() {
  let connection;

  try {
    // Connect using mysql2 regular pool instead of promise
    const pool = mysql.createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "root1234",
      port: process.env.DB_PORT || 3306,
      database: process.env.DB_NAME || "tree_family_db",
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    connection = await pool.getConnection();
    console.log("✅ Connected to MySQL");

    // Check if columns exist first
    const [columns] = await connection.execute(
      "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='family_members' AND COLUMN_NAME IN ('ayah_id', 'ibu_id')"
    );

    if (columns.length < 2) {
      // Add columns one by one
      if (!columns.find(c => c.COLUMN_NAME === 'ayah_id')) {
        try {
          await connection.execute("ALTER TABLE family_members ADD COLUMN ayah_id INT");
          console.log("✅ ayah_id column added");
        } catch (err) {
          console.log("ℹ️ ayah_id already exists or error:", err.code);
        }
      }

      if (!columns.find(c => c.COLUMN_NAME === 'ibu_id')) {
        try {
          await connection.execute("ALTER TABLE family_members ADD COLUMN ibu_id INT");
          console.log("✅ ibu_id column added");
        } catch (err) {
          console.log("ℹ️ ibu_id already exists or error:", err.code);
        }
      }
    } else {
      console.log("✅ Parent ID columns already exist");
    }

    // Try adding foreign keys
    try {
      await connection.execute(
        "ALTER TABLE family_members ADD CONSTRAINT fk_ayah_id FOREIGN KEY (ayah_id) REFERENCES family_members(id) ON DELETE SET NULL"
      );
      console.log("✅ Foreign key for ayah_id added");
    } catch (err) {
      console.log("ℹ️ Foreign key for ayah_id:", err.code);
    }

    try {
      await connection.execute(
        "ALTER TABLE family_members ADD CONSTRAINT fk_ibu_id FOREIGN KEY (ibu_id) REFERENCES family_members(id) ON DELETE SET NULL"
      );
      console.log("✅ Foreign key for ibu_id added");
    } catch (err) {
      console.log("ℹ️ Foreign key for ibu_id:", err.code);
    }

    console.log("✅ All operations completed successfully!");
    await connection.release();
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

addParentFields();
