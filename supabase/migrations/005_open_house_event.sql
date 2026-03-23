-- Migration: Add structured open house date/time columns
-- These three columns replace the free-text open_house column for calendar generation.
-- The text column is kept for display purposes.

ALTER TABLE properties
  ADD COLUMN IF NOT EXISTS open_house_date date,
  ADD COLUMN IF NOT EXISTS open_house_start time,
  ADD COLUMN IF NOT EXISTS open_house_end time;

COMMENT ON COLUMN properties.open_house_date IS 'Structured open house date (YYYY-MM-DD)';
COMMENT ON COLUMN properties.open_house_start IS 'Open house start time (HH:MM, 24h local)';
COMMENT ON COLUMN properties.open_house_end IS 'Open house end time (HH:MM, 24h local)';
