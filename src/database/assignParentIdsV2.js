const mysql = require("mysql2/promise");
require("dotenv").config();

async function assignParentIdsV2() {
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
    console.log(`\n📊 Found ${families.length} families\n`);

    for (const fam of families) {
      const family_id = fam.family_id;
      console.log(`🔄 Processing family ${family_id}...`);

      // Strategy: For each generation, pair up couples and assign their children
      const [allGenerations] = await connection.execute(
        "SELECT DISTINCT generation FROM family_members WHERE family_id = ? ORDER BY generation ASC",
        [family_id]
      );

      for (const genObj of allGenerations) {
        const generation = genObj.generation;

        // Get all couples in this generation
        const [couples] = await connection.execute(
          "SELECT * FROM family_members WHERE family_id = ? AND generation = ? AND status_menikah = 'Menikah' ORDER BY id ASC",
          [family_id, generation]
        );

        console.log(
          `  Generation ${generation}: ${couples.length} members (married)`
        );

        // For each couple, assign children
        // Pair them up: male + female
        for (let i = 0; i < couples.length; i += 2) {
          if (i + 1 < couples.length) {
            const male =
              couples[i].gender === "Pria" ? couples[i] : couples[i + 1];
            const female =
              couples[i].gender === "Wanita" ? couples[i] : couples[i + 1];

            if (
              male &&
              female &&
              male.gender === "Pria" &&
              female.gender === "Wanita"
            ) {
              console.log(
                `    👨 ${male.nama_depan} + 👩 ${female.nama_depan}`
              );

              // Get all children of this generation couple
              const [children] = await connection.execute(
                "SELECT * FROM family_members WHERE family_id = ? AND generation = ?",
                [family_id, generation + 1]
              );

              // Assign to children who don't have parents yet
              let assignedCount = 0;
              for (const child of children) {
                if (child.ayah_id === null || child.ibu_id === null) {
                  if (child.ayah_id === null) {
                    await connection.execute(
                      "UPDATE family_members SET ayah_id = ? WHERE id = ?",
                      [male.id, child.id]
                    );
                    assignedCount++;
                  }
                  if (child.ibu_id === null) {
                    await connection.execute(
                      "UPDATE family_members SET ibu_id = ? WHERE id = ?",
                      [female.id, child.id]
                    );
                    assignedCount++;
                  }
                }
              }
              console.log(
                `      ✓ Assigned parents to ${children.length} children`
              );
            }
          }
        }
      }
    }

    console.log("\n✅ Parent IDs assignment completed!");

    // Verify
    const [result] = await connection.execute(
      "SELECT COUNT(*) as total, SUM(IF(ayah_id IS NOT NULL, 1, 0)) as with_father, SUM(IF(ibu_id IS NOT NULL, 1, 0)) as with_mother FROM family_members"
    );
    console.log(`\n📈 Summary:`);
    console.log(`  Total members: ${result[0].total}`);
    console.log(`  With father: ${result[0].with_father}`);
    console.log(`  With mother: ${result[0].with_mother}`);

    await connection.release();
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

assignParentIdsV2();
