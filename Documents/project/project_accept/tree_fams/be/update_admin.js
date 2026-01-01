const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

async function updateAdminPassword() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tree_family_db'
  });

  const newHash = await bcrypt.hash('admin123', 10);
  console.log('New hash:', newHash);
  
  await connection.execute(
    'UPDATE users SET password = ? WHERE email = ?',
    [newHash, 'admin@family.com']
  );
  
  console.log('Admin password updated successfully!');
  await connection.end();
}

updateAdminPassword().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
