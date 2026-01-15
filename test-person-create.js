const pool = require("./src/config/database");
const Person = require("./src/models/Person");

async function testCreatePerson() {
  try {
    console.log("Testing Person.create()...");
    
    const testData = {
      family_id: 5,
      nama_depan: "Test",
      nama_panggilan: "Tst",
      nama_belakang: "User",
      gender: "M",
      tanggal_lahir: "2000-01-01",
      status: "Hidup",
    };

    console.log("Payload:", testData);
    
    const result = await Person.create(testData);
    
    console.log("✅ Success! Person created:");
    console.log(result);
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error("Stack:", error.stack);
  } finally {
    process.exit(0);
  }
}

testCreatePerson();
