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
-- ENUMS
-- ============================================================================
CREATE TYPE user_role AS ENUM ('admin', 'agent', 'viewer');

-- ============================================================================
-- PROFILES TABLE (linked to Supabase Auth users)
-- ============================================================================
CREATE TABLE profiles (
  id          uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       text        NOT NULL,
  full_name   text        NOT NULL,
  role        user_role   NOT NULL DEFAULT 'viewer',
  agent_id    uuid        UNIQUE REFERENCES agents(id) ON DELETE SET NULL,
  avatar_url  text,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

COMMENT ON TABLE profiles IS 'User profiles linked to Supabase Auth, with role-based access';

-- ============================================================================
-- NEWSLETTER SUBSCRIPTIONS TABLE
-- ============================================================================
CREATE TABLE newsletter_subscriptions (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email         text        UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now()
);

COMMENT ON TABLE newsletter_subscriptions IS 'Email newsletter subscriptions';

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
CREATE INDEX idx_profiles_role           ON profiles(role);
CREATE INDEX idx_newsletter_email        ON newsletter_subscriptions(email);

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

CREATE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE neighborhoods ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Public read access for content tables (no auth required)
CREATE POLICY "Public read: agents"
  ON agents FOR SELECT USING (true);

CREATE POLICY "Public read: properties"
  ON properties FOR SELECT USING (true);

CREATE POLICY "Public read: neighborhoods"
  ON neighborhoods FOR SELECT USING (true);

CREATE POLICY "Public read: testimonials"
  ON testimonials FOR SELECT USING (true);

CREATE POLICY "Public read: faq"
  ON faq FOR SELECT USING (true);

-- Leads: anyone can insert (contact forms), only authenticated users can read
CREATE POLICY "Anyone can submit leads"
  ON leads FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can read leads"
  ON leads FOR SELECT USING (auth.role() = 'authenticated');

-- Newsletter: anyone can subscribe
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter_subscriptions FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can read subscriptions"
  ON newsletter_subscriptions FOR SELECT USING (auth.role() = 'authenticated');

-- Profiles: users can read their own profile, admins can read all
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- ============================================================================
-- AUTO-CREATE PROFILE ON SIGNUP (trigger on auth.users)
-- ============================================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    'viewer'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
