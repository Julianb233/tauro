-- Add HOA/maintenance fee fields to properties table
ALTER TABLE properties ADD COLUMN hoa_fee decimal(10,2);
ALTER TABLE properties ADD COLUMN hoa_frequency text DEFAULT 'monthly'
  CHECK (hoa_frequency IN ('monthly', 'quarterly', 'annual'));
ALTER TABLE properties ADD COLUMN has_hoa boolean DEFAULT false;

-- Add index for filtering properties by HOA status
CREATE INDEX idx_properties_has_hoa ON properties (has_hoa) WHERE has_hoa = true;

COMMENT ON COLUMN properties.hoa_fee IS 'HOA/maintenance fee amount per period';
COMMENT ON COLUMN properties.hoa_frequency IS 'Payment frequency: monthly, quarterly, or annual';
COMMENT ON COLUMN properties.has_hoa IS 'Whether property is subject to HOA fees';
