-- AI-3891: Add comprehensive property details fields
ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS heating        text,
  ADD COLUMN IF NOT EXISTS cooling        text,
  ADD COLUMN IF NOT EXISTS garage         text,
  ADD COLUMN IF NOT EXISTS parking_spaces smallint,
  ADD COLUMN IF NOT EXISTS stories        smallint,
  ADD COLUMN IF NOT EXISTS construction   text,
  ADD COLUMN IF NOT EXISTS flooring       text[]    DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS roof_type      text,
  ADD COLUMN IF NOT EXISTS rooms          jsonb     DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS tax_annual     integer   DEFAULT 0,
  ADD COLUMN IF NOT EXISTS tax_year       smallint  DEFAULT 2025,
  ADD COLUMN IF NOT EXISTS mls_number     text;

COMMENT ON COLUMN properties.rooms IS 'Array of {name, size, level, description} objects';
