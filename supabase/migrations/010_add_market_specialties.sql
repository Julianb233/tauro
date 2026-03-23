-- Add market_specialties column to agents table
-- Market specialty tags (e.g., Luxury, Investment, New Development, Relocation)
ALTER TABLE agents ADD COLUMN IF NOT EXISTS market_specialties text[] DEFAULT '{}';
