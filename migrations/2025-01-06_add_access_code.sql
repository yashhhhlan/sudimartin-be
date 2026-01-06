-- Migration: Add access_code field to families table
-- Date: 2025-01-06
-- Description: Add access_code column for family tree sharing verification

-- Add access_code column
ALTER TABLE families 
ADD COLUMN access_code VARCHAR(20) 
COMMENT 'Access code for shared family tree viewing'
AFTER privacy_type;

-- Add index for faster lookups
ALTER TABLE families 
ADD INDEX idx_access_code (access_code);

-- Generate random access codes for existing families (6 digits)
UPDATE families 
SET access_code = LPAD(FLOOR(RAND() * 1000000), 6, '0')
WHERE access_code IS NULL OR access_code = '';

-- Verify the migration
SELECT 
    id, 
    nama_keluarga, 
    privacy_type, 
    access_code,
    created_at
FROM families
ORDER BY created_at DESC
LIMIT 10;
