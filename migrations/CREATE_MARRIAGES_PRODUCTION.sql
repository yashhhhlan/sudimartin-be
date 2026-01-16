-- ============================================
-- CREATE MARRIAGES TABLE - PRODUCTION
-- ============================================
-- Database: sql12814227
-- Host: sql12.freesqldatabase.com
-- 
-- CARA JALANKAN:
-- 1. Buka phpMyAdmin
-- 2. Pilih database: sql12814227
-- 3. Klik tab "SQL"
-- 4. Copy-paste SELURUH SCRIPT INI
-- 5. Klik tombol "Execute" / "Go"
-- 6. Tunggu sampai berhasil
-- ============================================

-- ============================================
-- 1. CREATE MARRIAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS marriages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  family_id INT NOT NULL COMMENT 'Reference ke families table',
  suami_id INT COMMENT 'Husband ID - reference ke family_members (optional)',
  istri_id INT COMMENT 'Wife ID - reference ke family_members (optional)',
  status ENUM('MENIKAH', 'CERAI HIDUP', 'CERAI MATI') DEFAULT 'MENIKAH' COMMENT 'Marriage status',
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Record created time',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Record updated time',
  
  -- Indexes untuk query performa
  INDEX idx_family_id (family_id),
  INDEX idx_suami_id (suami_id),
  INDEX idx_istri_id (istri_id),
  INDEX idx_status (status),
  
  -- Foreign Keys untuk data integrity
  FOREIGN KEY (family_id) REFERENCES families(id) ON DELETE CASCADE,
  FOREIGN KEY (suami_id) REFERENCES family_members(id) ON DELETE SET NULL,
  FOREIGN KEY (istri_id) REFERENCES family_members(id) ON DELETE SET NULL
  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Table untuk hubungan pernikahan antara member keluarga';

-- ✅ TABLE CREATED SUCCESSFULLY!
-- ============================================

-- ============================================
-- 2. VERIFY HASIL PEMBUATAN
-- ============================================
-- Run query ini untuk verify table sudah created:

-- Lihat struktur table:
-- DESCRIBE marriages;

-- Lihat data di marriages table (seharusnya kosong):
-- SELECT * FROM marriages;

-- Lihat relasi antara tables:
-- SELECT 
--   m.id, m.family_id, m.status,
--   s.nama_depan as suami_nama,
--   i.nama_depan as istri_nama,
--   f.nama_keluarga
-- FROM marriages m
-- LEFT JOIN family_members s ON m.suami_id = s.id
-- LEFT JOIN family_members i ON m.istri_id = i.id
-- LEFT JOIN families f ON m.family_id = f.id;

-- ============================================
-- 3. SAMPLE DATA (OPSIONAL - untuk testing)
-- ============================================
-- Uncomment query dibawah jika ingin insert sample data:

-- INSERT INTO marriages (family_id, suami_id, istri_id, status) VALUES
-- (1, 1, 2, 'MENIKAH'),
-- (1, 3, 4, 'MENIKAH');

-- ============================================
-- CATATAN PENTING:
-- ============================================
-- 1. Pastikan family_members table sudah ada dengan data
-- 2. suami_id & istri_id BOLEH NULL (untuk single parent cases)
-- 3. Tapi minimal 1 dari keduanya harus ada (validation di backend)
-- 4. status enum values: MENIKAH, CERAI HIDUP, CERAI MATI
-- 5. ON DELETE CASCADE: Jika family dihapus, marriages ikut terhapus
-- 6. ON DELETE SET NULL: Jika family_member dihapus, suami_id/istri_id jadi NULL
-- 7. Indexes untuk mempercepat query saat mencari by family_id/status
