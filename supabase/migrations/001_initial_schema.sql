-- Tauro Real Estate — Initial Database Schema
-- Run in Supabase SQL Editor or via supabase db push

-- ============================================================================
-- EXTENSIONS
-- ============================================================================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- AGENTS TABLE
-- ============================================================================
CREATE TABLE agents (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          text        UNIQUE NOT NULL,
  first_name    text        NOT NULL,
  last_name     text        NOT NULL,
  full_name     text        GENERATED ALWAYS AS (first_name || ' ' || last_name) STORED,
  title         text        NOT NULL,
  email         text        UNIQUE NOT NULL,
  phone         text        NOT NULL,
  photo         text,
  bio           text,
  short_bio     text,
  specialties   text[]      DEFAULT '{}',
  neighborhoods text[]      DEFAULT '{}',
  stats         jsonb       DEFAULT '{}',
  awards        jsonb       DEFAULT '[]',
  video_intro_url text,
  social        jsonb       DEFAULT '{}',
  languages     text[]      DEFAULT '{}',
  license_number text,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

COMMENT ON TABLE agents IS 'Real estate agents in the Tauro brokerage';

-- ============================================================================
-- PROPERTIES TABLE
-- ============================================================================
CREATE TABLE properties (
  id                uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  slug              text          UNIQUE NOT NULL,
  address           text          NOT NULL,
  city              text          NOT NULL DEFAULT 'Philadelphia',
  state             text          NOT NULL DEFAULT 'PA',
  zip               text          NOT NULL,
  neighborhood      text          NOT NULL,
  price             integer       NOT NULL,
  beds              smallint      NOT NULL,
  baths             numeric(3,1)  NOT NULL,
  sqft              integer       NOT NULL,
  lot_sqft          integer       NOT NULL DEFAULT 0,
  year_built        smallint,
  status            text          NOT NULL DEFAULT 'Active',
  property_type     text          NOT NULL,
  images            text[]        NOT NULL DEFAULT '{}',
  description       text          NOT NULL,
  features_interior text[]        DEFAULT '{}',
  features_exterior text[]        DEFAULT '{}',
  features_community text[]       DEFAULT '{}',
  listing_agent_id  uuid          REFERENCES agents(id) ON DELETE SET NULL,
  lat               double precision,
  lng               double precision,
  open_house        text,
  video_url         text,
  virtual_tour_url  text,
  featured          boolean       DEFAULT false,
  created_at        timestamptz   DEFAULT now(),
  updated_at        timestamptz   DEFAULT now()
);

COMMENT ON TABLE properties IS 'Property listings managed by Tauro agents';

-- ============================================================================
-- NEIGHBORHOODS TABLE
-- ============================================================================
CREATE TABLE neighborhoods (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            text        UNIQUE NOT NULL,
  name            text        NOT NULL,
  tagline         text,
  description     text,
  selling_points  text[]      DEFAULT '{}',
  lifestyle       jsonb       DEFAULT '{}',
  stats           jsonb       DEFAULT '{}',
  image           text,
  card_image      text,
  map_center      jsonb,
  property_filter text,
  featured        boolean     DEFAULT false,
  created_at      timestamptz DEFAULT now(),
  updated_at      timestamptz DEFAULT now()
);

COMMENT ON TABLE neighborhoods IS 'Philadelphia neighborhoods served by Tauro';

-- ============================================================================
-- LEADS TABLE
-- ============================================================================
CREATE TABLE leads (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  type          text        NOT NULL,
  first_name    text        NOT NULL,
  last_name     text        NOT NULL,
  email         text        NOT NULL,
  phone         text        NOT NULL,
  message       text,
  property_id   uuid        REFERENCES properties(id) ON DELETE SET NULL,
  agent_id      uuid        REFERENCES agents(id) ON DELETE SET NULL,
  status        text        NOT NULL DEFAULT 'new',
  metadata      jsonb       DEFAULT '{}',
  ghl_synced    boolean     DEFAULT false,
  created_at    timestamptz DEFAULT now(),
  updated_at    timestamptz DEFAULT now()
);

COMMENT ON TABLE leads IS 'Inbound lead submissions from the website';

-- ============================================================================
-- TESTIMONIALS TABLE
-- ============================================================================
CREATE TABLE testimonials (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  quote       text        NOT NULL,
  name        text        UNIQUE NOT NULL,
  role        text,
  rating      smallint    DEFAULT 5,
  sort_order  smallint    DEFAULT 0,
  created_at  timestamptz DEFAULT now()
);

COMMENT ON TABLE testimonials IS 'Client testimonials displayed on the website';

-- ============================================================================
-- FAQ TABLE
-- ============================================================================
CREATE TABLE faq (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  question    text        UNIQUE NOT NULL,
  answer      text        NOT NULL,
  category    text        NOT NULL DEFAULT 'general',
  sort_order  smallint    DEFAULT 0,
  created_at  timestamptz DEFAULT now()
);

COMMENT ON TABLE faq IS 'Frequently asked questions for buyers and sellers';

-- ============================================================================
-- INDEXES
-- ============================================================================
CREATE INDEX idx_properties_slug         ON properties(slug);
CREATE INDEX idx_properties_neighborhood ON properties(neighborhood);
CREATE INDEX idx_properties_status       ON properties(status);
CREATE INDEX idx_agents_slug             ON agents(slug);
CREATE INDEX idx_agents_email            ON agents(email);
CREATE INDEX idx_neighborhoods_slug      ON neighborhoods(slug);
CREATE INDEX idx_leads_status            ON leads(status);
CREATE INDEX idx_leads_type              ON leads(type);
CREATE INDEX idx_leads_created_at        ON leads(created_at);

-- ============================================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables with updated_at
CREATE TRIGGER set_updated_at_properties
  BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_agents
  BEFORE UPDATE ON agents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_neighborhoods
  BEFORE UPDATE ON neighborhoods
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER set_updated_at_leads
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
