const pool = require("./src/config/database");

async function testPersonInsert() {
  try {
    console.log("Testing Person INSERT...\n");

    const query = `
      INSERT INTO family_members (
        family_id, nama_depan, nama_belakang, nama_panggilan, gender,
        tanggal_lahir, tempat_lahir, tanggal_meninggal, status,
        ayah_id, ibu_id, pekerjaan, alamat, biografi, photo_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      5, // family_id
      "teest", // nama_depan
      "dv", // nama_belakang
      "vd", // nama_panggilan
      "M", // gender
      "1991-02-15", // tanggal_lahir (converted from 15/02/1991)
      null, // tempat_lahir
      null, // tanggal_meninggal
      "Hidup", // status
      null, // ayah_id
      null, // ibu_id
      "zfghrh", // pekerjaan
      "fqhhij", // alamat
      null, // biografi
      null, // photo_url
    ];

    console.log("Query:", query);
    console.log("\nValues:", values);
    console.log("\n");

    const [result] = await pool.execute(query, values);

    console.log("✅ INSERT SUCCESS!");
    console.log("Insert ID:", result.insertId);
    console.log("Affected rows:", result.affectedRows);

    // Now fetch the inserted record
    const fetchQuery = "SELECT * FROM family_members WHERE id = ?";
    const [rows] = await pool.execute(fetchQuery, [result.insertId]);

    console.log("\nFetched record:", rows[0]);

    process.exit(0);
  } catch (error) {
    console.error("❌ ERROR:", error.message);
    console.error("\nFull error:", error);
    process.exit(1);
  }
}

testPersonInsert();
