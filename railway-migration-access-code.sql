-- Railway Production Migration: Add access_code field
-- Copy and paste ALL commands below to Railway MySQL Query Console
-- Date: 2025-01-06

-- IMPORTANT: Run these commands ONE BY ONE in Railway Console

-- Command 1: Add access_code column
ALTER TABLE families ADD COLUMN access_code VARCHAR(20) AFTER privacy_type;

-- Command 2: Add index
ALTER TABLE families ADD INDEX idx_access_code (access_code);

-- Command 3: Generate codes for existing families
UPDATE families SET access_code = LPAD(FLOOR(RAND() * 1000000), 6, '0') WHERE access_code IS NULL;

-- Command 4: Verify (check if column exists)
SHOW COLUMNS FROM families LIKE 'access_code';

-- Command 5: See data
SELECT id, nama_keluarga, privacy_type, access_code FROM families LIMIT 5;
