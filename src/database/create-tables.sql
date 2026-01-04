-- Create database if not exists
CREATE DATABASE IF NOT EXISTS railway
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE railway;

-- Drop existing tables if exists (for clean migration)
DROP TABLE IF EXISTS relationships;
DROP TABLE IF EXISTS family_members;
DROP TABLE IF EXISTS families;
DROP TABLE IF EXISTS users;

-- Create users table with all fields including authentication
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  namaDepan VARCHAR(100) NOT NULL,
  namaBelakang VARCHAR(100) NOT NULL,
  gender ENUM('Pria', 'Wanita') DEFAULT 'Pria',
  tempatLahir VARCHAR(100),
  tanggalLahir DATE,
  pekerjaan VARCHAR(100),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  role ENUM('admin', 'user') DEFAULT 'user',
  isRoot BOOLEAN DEFAULT FALSE,
  ayahId INT,
  ibuId INT,
  pasanganId INT,
  keterangan TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_email (email),
  INDEX idx_role (role),
  INDEX idx_isRoot (isRoot),
  INDEX idx_ayahId (ayahId),
  INDEX idx_ibuId (ibuId),
  INDEX idx_pasanganId (pasanganId),
  
  FOREIGN KEY (ayahId) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (ibuId) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (pasanganId) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create families table for multi-family support
CREATE TABLE families (
  id INT AUTO_INCREMENT PRIMARY KEY,
  admin_id INT NOT NULL,
  nama_keluarga VARCHAR(255) NOT NULL,
  deskripsi TEXT,
  privacy_type ENUM('PUBLIC', 'PRIVATE') DEFAULT 'PRIVATE',
  photo_url LONGTEXT,
  canvas_layout_data LONGTEXT COMMENT 'JSON: stores node positions and custom layout',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_admin_id (admin_id),
  INDEX idx_privacy_type (privacy_type),
  FOREIGN KEY (admin_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create family_members table for rich member data
CREATE TABLE family_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  family_id INT NOT NULL,
  user_id INT,
  nama_depan VARCHAR(100) NOT NULL,
  nama_belakang VARCHAR(100),
  nama_sapaan VARCHAR(100),
  gender ENUM('Pria', 'Wanita') DEFAULT 'Pria',
  tanggal_lahir DATE,
  tempat_lahir VARCHAR(100),
  tanggal_meninggal DATE,
  status ENUM('Hidup', 'Meninggal') DEFAULT 'Hidup',
  status_menikah VARCHAR(50) DEFAULT 'Single',
  nama_display VARCHAR(50) DEFAULT 'nama_depan',
  hubungan_keluarga VARCHAR(50),
  photo_url LONGTEXT,
  generation INT DEFAULT 0 COMMENT 'Generation level (0=root, 1=children, etc)',
  pekerjaan VARCHAR(100),
  biography TEXT,
  contact_phone VARCHAR(20),
  contact_email VARCHAR(255),
  contact_address TEXT,
  node_position_x FLOAT DEFAULT 0 COMMENT 'Custom canvas X position',
  node_position_y FLOAT DEFAULT 0 COMMENT 'Custom canvas Y position',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_family_id (family_id),
  INDEX idx_user_id (user_id),
  INDEX idx_generation (generation),
  INDEX idx_status (status),
  FOREIGN KEY (family_id) REFERENCES families(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create relationships table for family connections
CREATE TABLE relationships (
  id INT AUTO_INCREMENT PRIMARY KEY,
  family_id INT NOT NULL,
  member1_id INT NOT NULL,
  member2_id INT NOT NULL,
  relationship_type VARCHAR(50) NOT NULL COMMENT 'parent, spouse, sibling, child, custom',
  direction VARCHAR(20) DEFAULT 'both' COMMENT 'mother, father, child, spouse, both',
  custom_label VARCHAR(100) COMMENT 'For custom relationships',
  custom_connector BOOLEAN DEFAULT FALSE COMMENT 'User-drawn custom connector',
  connector_x1 FLOAT,
  connector_y1 FLOAT,
  connector_x2 FLOAT,
  connector_y2 FLOAT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_family_id (family_id),
  INDEX idx_member1_id (member1_id),
  INDEX idx_member2_id (member2_id),
  INDEX idx_relationship_type (relationship_type),
  FOREIGN KEY (family_id) REFERENCES families(id) ON DELETE CASCADE,
  FOREIGN KEY (member1_id) REFERENCES family_members(id) ON DELETE CASCADE,
  FOREIGN KEY (member2_id) REFERENCES family_members(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create a default admin user
INSERT INTO users (namaDepan, namaBelakang, email, password, role, isRoot)
VALUES ('Admin', 'System', 'admin@family.com', '$2a$10$Zp3IKNVh8N6c0Z.F6v6mxO0B6.DfPnYkDM5mKvFZE5X4KzJ2O2YdG', 'admin', TRUE)
ON DUPLICATE KEY UPDATE password = '$2a$10$Zp3IKNVh8N6c0Z.F6v6mxO0B6.DfPnYkDM5mKvFZE5X4KzJ2O2YdG';
