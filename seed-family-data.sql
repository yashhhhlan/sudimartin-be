-- Database Seeding Script - Contoh Data Keluarga yang Proper
-- Jalankan query ini di Railway MySQL Database
-- Ini akan membuat data keluarga dengan gender, parent-child relationships yang jelas

USE railway;

-- ==================== CLEAR DATA (Optional - jika ingin reset) ====================
-- Uncomment jika ingin menghapus data lama terlebih dahulu:
-- DELETE FROM marriages WHERE family_id = 8;
-- DELETE FROM persons WHERE family_id = 8;

-- ==================== CONTOH 1: Keluarga Rapi dengan 3 Generasi ====================

-- Generasi 1 (Kakek-Nenek)
INSERT INTO persons (
  id, family_id, user_id, nama_depan, nama_panggilan, nama_belakang, 
  gender, status_hidup, tanggal_lahir, tempat_lahir, pekerjaan, alamat, 
  ayah_id, ibu_id, status_menikah
) VALUES (
  101, 8, NULL, 'Bapak Kakek', 'Pak Kakek', 'Salim', 
  'M', 'Hidup', '1950-05-10', 'Jakarta', 'Pensiunan', 'Jl. Merdeka 123, Jakarta',
  NULL, NULL, 'Menikah'
), (
  102, 8, NULL, 'Ibu Nenek', 'Nenek', 'Salim', 
  'F', 'Hidup', '1955-08-20', 'Bandung', 'Ibu Rumah Tangga', 'Jl. Merdeka 123, Jakarta',
  NULL, NULL, 'Menikah'
);

-- Generasi 2 (Ayah-Ibu)
INSERT INTO persons (
  id, family_id, user_id, nama_depan, nama_panggilan, nama_belakang, 
  gender, status_hidup, tanggal_lahir, tempat_lahir, pekerjaan, alamat, 
  ayah_id, ibu_id, status_menikah
) VALUES (
  201, 8, NULL, 'Slamet', 'Pak Slamet', 'Salim', 
  'M', 'Hidup', '1975-03-15', 'Jakarta', 'Karyawan Bank', 'Jl. Sudirman 456, Jakarta',
  101, 102, 'Menikah'
), (
  202, 8, NULL, 'Siti Nurhaliza', 'Siti', 'Rahman', 
  'F', 'Hidup', '1978-06-22', 'Surabaya', 'Guru SD', 'Jl. Sudirman 456, Jakarta',
  NULL, NULL, 'Menikah'
);

-- Generasi 3 (Anak-anak)
INSERT INTO persons (
  id, family_id, user_id, nama_depan, nama_panggilan, nama_belakang, 
  gender, status_hidup, tanggal_lahir, tempat_lahir, pekerjaan, alamat, 
  ayah_id, ibu_id, status_menikah
) VALUES (
  301, 8, NULL, 'Raka Pratama', 'Raka', 'Salim', 
  'M', 'Hidup', '2000-01-10', 'Jakarta', 'Mahasiswa', 'Jl. Sudirman 456, Jakarta',
  201, 202, 'Belum Menikah'
), (
  302, 8, NULL, 'Dina Putri', 'Dina', 'Salim', 
  'F', 'Hidup', '2003-07-25', 'Jakarta', 'Pelajar', 'Jl. Sudirman 456, Jakarta',
  201, 202, 'Belum Menikah'
), (
  303, 8, NULL, 'Yuni Astuti', 'Yuni', 'Salim', 
  'F', 'Hidup', '2005-11-30', 'Jakarta', 'Pelajar', 'Jl. Sudirman 456, Jakarta',
  201, 202, 'Belum Menikah'
);

-- Pasangan (Marriages)
INSERT INTO marriages (family_id, suami_id, istri_id, status)
VALUES (8, 101, 102, 'MENIKAH'), (8, 201, 202, 'MENIKAH');

-- ==================== CONTOH 2: Keluarga dengan Multiple Spouse ====================

-- Generasi 1 (Kakek dengan 2 Istri - Poligami)
INSERT INTO persons (
  id, family_id, user_id, nama_depan, nama_panggilan, nama_belakang, 
  gender, status_hidup, tanggal_lahir, tempat_lahir, pekerjaan, alamat, 
  ayah_id, ibu_id, status_menikah
) VALUES (
  401, 8, NULL, 'Haji Ahmad', 'Pak Ahmad', 'Habib', 
  'M', 'Hidup', '1945-02-08', 'Mekah', 'Pedagang', 'Jl. Arab 789, Jakarta',
  NULL, NULL, 'Menikah'
), (
  402, 8, NULL, 'Nurkhalisa', 'Nurkhalisa', 'Aziz', 
  'F', 'Hidup', '1950-04-12', 'Jakarta', 'Ibu Rumah Tangga', 'Jl. Arab 789, Jakarta',
  NULL, NULL, 'Menikah'
), (
  403, 8, NULL, 'Nur Aini', 'Aini', 'Rahman', 
  'F', 'Hidup', '1958-09-18', 'Bandung', 'Ibu Rumah Tangga', 'Jl. Arab 789, Jakarta',
  NULL, NULL, 'Menikah'
);

-- Anak dari Istri 1 (Nurkhalisa)
INSERT INTO persons (
  id, family_id, user_id, nama_depan, nama_panggilan, nama_belakang, 
  gender, status_hidup, tanggal_lahir, tempat_lahir, pekerjaan, alamat, 
  ayah_id, ibu_id, status_menikah
) VALUES (
  501, 8, NULL, 'Fatimah', 'Tuti', 'Habib', 
  'F', 'Hidup', '1975-05-10', 'Jakarta', 'Ibu Rumah Tangga', 'Jl. Arab 789, Jakarta',
  401, 402, 'Menikah'
), (
  502, 8, NULL, 'Mahmud', 'Mahmud', 'Habib', 
  'M', 'Hidup', '1977-08-20', 'Jakarta', 'Pedagang Emas', 'Jl. Arab 789, Jakarta',
  401, 402, 'Menikah'
);

-- Anak dari Istri 2 (Nur Aini)
INSERT INTO persons (
  id, family_id, user_id, nama_depan, nama_panggilan, nama_belakang, 
  gender, status_hidup, tanggal_lahir, tempat_lahir, pekerjaan, alamat, 
  ayah_id, ibu_id, status_menikah
) VALUES (
  503, 8, NULL, 'Aisyah', 'Aish', 'Habib', 
  'F', 'Hidup', '1982-03-15', 'Jakarta', 'Guru Agama', 'Jl. Arab 789, Jakarta',
  401, 403, 'Belum Menikah'
);

-- Pasangan untuk multiple spouse (Haji Ahmad dengan 2 istri)
INSERT INTO marriages (family_id, suami_id, istri_id, status)
VALUES (8, 401, 402, 'MENIKAH'), (8, 401, 403, 'MENIKAH');

-- ==================== VERIFIKASI DATA ====================

SELECT '===== PERSONS DATA =====' AS info;
SELECT id, nama_depan, gender, ayah_id, ibu_id, status_menikah 
FROM persons 
WHERE family_id = 8 
ORDER BY id;

SELECT '===== MARRIAGES DATA =====' AS info;
SELECT id, suami_id, istri_id, status 
FROM marriages 
WHERE family_id = 8;

SELECT '===== STATISTIK =====' AS info;
SELECT 
  'Total Persons' AS metric, COUNT(*) AS nilai
FROM persons WHERE family_id = 8
UNION ALL
SELECT 
  'Total Marriages' AS metric, COUNT(*) AS nilai
FROM marriages WHERE family_id = 8
UNION ALL
SELECT 
  'Males (M)' AS metric, COUNT(*) AS nilai
FROM persons WHERE family_id = 8 AND gender = 'M'
UNION ALL
SELECT 
  'Females (F)' AS metric, COUNT(*) AS nilai
FROM persons WHERE family_id = 8 AND gender = 'F';

SELECT '===== SETUP COMPLETE =====' AS status;
SELECT 'Data keluarga sudah siap di database dengan gender yang jelas!' AS message;

