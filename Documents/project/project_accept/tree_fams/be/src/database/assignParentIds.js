const mysql = require("mysql2/promise");
require("dotenv").config();

async function assignParentIds() {
  let connection;

  try {
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

    // Get all families
    const [families] = await connection.execute(
      "SELECT DISTINCT family_id FROM family_members"
    );
    console.log(`Found ${families.length} families`);

    for (const fam of families) {
      const family_id = fam.family_id;
      console.log(`\n🔄 Processing family ${family_id}...`);

      // Get all members ordered by generation
      const [members] = await connection.execute(
        "SELECT * FROM family_members WHERE family_id = ? ORDER BY generation ASC",
        [family_id]
      );

      console.log(`  - Found ${members.length} members`);

      // For each couple (married status), assign children to them
      for (const member of members) {
        // Find spouse
        if (member.status_menikah === "Menikah") {
          const [spouse] = await connection.execute(
            "SELECT * FROM family_members WHERE family_id = ? AND generation = ? AND status_menikah = 'Menikah' AND id != ? LIMIT 1",
            [family_id, member.generation, member.id]
          );

          if (spouse.length > 0) {
            const spouseId = spouse[0].id;
            const fatherId = member.gender === "Pria" ? member.id : spouseId;
            const motherId = member.gender === "Wanita" ? member.id : spouseId;

            // Find children (next generation)
            const [children] = await connection.execute(
              "SELECT * FROM family_members WHERE family_id = ? AND generation = ? AND (ayah_id IS NULL OR ibu_id IS NULL)",
              [family_id, member.generation + 1]
            );

            for (const child of children) {
              // Assign to both parents if not yet assigned
              const updates = [];
              if (child.ayah_id === null)
                updates.push({ field: "ayah_id", value: fatherId });
              if (child.ibu_id === null)
                updates.push({ field: "ibu_id", value: motherId });

              for (const update of updates) {
                await connection.execute(
                  `UPDATE family_members SET ${update.field} = ? WHERE id = ?`,
                  [update.value, child.id]
                );
                console.log(
                  `  ✓ Updated child ${child.nama_depan} (ID: ${child.id}): ${update.field} = ${update.value}`
                );
              }
            }
          }
        }
      }
    }

    console.log("\n✅ Parent IDs assignment completed!");
    await connection.release();
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

assignParentIds();
