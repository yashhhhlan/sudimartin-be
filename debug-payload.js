// Debug script untuk log detail POST request payload
console.log("=== ADD PERSON PAYLOAD DEBUG ===\n");

const formData = {
  nama_depan: "teest",
  nama_panggilan: "vd",
  nama_belakang: "dv",
  gender: "M", // Selected from dropdown value
  ayah_id: null,
  ibu_id: null,
  tanggal_lahir: "1991-02-15", // From HTML5 date input
  tanggal_meninggal: null,
  alamat: "fqhhij",
  pekerjaan: "zfghrh",
  photo_url: null,
};

const payload = {
  nama_depan: formData.nama_depan,
  nama_panggilan: formData.nama_panggilan,
  nama_belakang: formData.nama_belakang || null,
  gender: formData.gender,
  ayah_id: formData.ayah_id || null,
  ibu_id: formData.ibu_id || null,
  tanggal_lahir: formData.tanggal_lahir || null,
  tanggal_meninggal: formData.tanggal_meninggal || null, // NOTE: Form uses tanggal_wafat!
  alamat: formData.alamat || null,
  pekerjaan: formData.pekerjaan || null,
  photo_url: formData.photo_url || null,
};

console.log("Payload yang akan dikirim ke backend:");
console.log(JSON.stringify(payload, null, 2));

console.log("\n\n=== DATABASE INSERT QUERY ===\n");

const query = `
INSERT INTO family_members (
  family_id, nama_depan, nama_belakang, nama_panggilan, gender,
  tanggal_lahir, tempat_lahir, tanggal_meninggal, status,
  ayah_id, ibu_id, pekerjaan, alamat, biografi, photo_url
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`;

const values = [
  5, // family_id
  payload.nama_depan, // nama_depan
  payload.nama_belakang || null, // nama_belakang
  payload.nama_panggilan || null, // nama_panggilan
  payload.gender || "M", // gender
  payload.tanggal_lahir || null, // tanggal_lahir
  null, // tempat_lahir (NOT IN FORM)
  payload.tanggal_meninggal || null, // tanggal_meninggal
  "Hidup", // status (HARDCODED)
  payload.ayah_id || null, // ayah_id
  payload.ibu_id || null, // ibu_id
  payload.pekerjaan || null, // pekerjaan
  payload.alamat || null, // alamat
  null, // biografi (NOT IN FORM)
  payload.photo_url || null, // photo_url
];

console.log("Query:");
console.log(query);
console.log("\nValues array:");
console.log(values);

console.log("\n\n=== POTENTIAL ISSUES ===\n");

const issues = [];

if (!payload.nama_depan) issues.push("❌ nama_depan is empty!");
if (!payload.nama_panggilan) issues.push("❌ nama_panggilan is empty!");
if (!payload.gender || !["M", "F"].includes(payload.gender)) {
  issues.push(`❌ gender invalid: "${payload.gender}" (must be M or F)`);
}
if (
  payload.tanggal_lahir &&
  !/^\d{4}-\d{2}-\d{2}$/.test(payload.tanggal_lahir)
) {
  issues.push(
    `❌ tanggal_lahir format invalid: "${payload.tanggal_lahir}" (must be YYYY-MM-DD)`
  );
}

if (issues.length === 0) {
  issues.push("✅ All fields look valid!");
}

issues.forEach((issue) => console.log(issue));
