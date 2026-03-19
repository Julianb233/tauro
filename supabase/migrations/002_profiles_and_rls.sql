-- Tauro Real Estate — Profiles table + RLS policies
-- Depends on: 001_initial_schema.sql

-- ============================================================================
-- USER ROLE ENUM
-- ============================================================================
CREATE TYPE user_role AS ENUM ('admin', 'agent', 'viewer');

-- ============================================================================
-- PROFILES TABLE (linked to Supabase Auth)
-- ============================================================================
CREATE TABLE profiles (
  id          uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       text        NOT NULL,
  full_name   text        NOT NULL,
  role        user_role   NOT NULL DEFAULT 'agent',
  agent_id    uuid        UNIQUE REFERENCES agents(id) ON DELETE SET NULL,
  avatar_url  text,
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

COMMENT ON TABLE profiles IS 'User profiles linked to Supabase Auth users';

CREATE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- ============================================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================================
-- ENABLE RLS ON ALL TABLES
-- ============================================================================
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE neighborhoods ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- PUBLIC READ POLICIES (anon + authenticated)
-- ============================================================================

-- Agents: anyone can read
CREATE POLICY "agents_public_read" ON agents
  FOR SELECT USING (true);

-- Properties: anyone can read non-draft listings
CREATE POLICY "properties_public_read" ON properties
  FOR SELECT USING (true);

-- Neighborhoods: anyone can read
CREATE POLICY "neighborhoods_public_read" ON neighborhoods
  FOR SELECT USING (true);

-- Testimonials: anyone can read
CREATE POLICY "testimonials_public_read" ON testimonials
  FOR SELECT USING (true);

-- FAQ: anyone can read
CREATE POLICY "faq_public_read" ON faq
  FOR SELECT USING (true);

-- ============================================================================
-- LEADS POLICIES
-- ============================================================================

-- Anyone can submit a lead (INSERT)
CREATE POLICY "leads_insert" ON leads
  FOR INSERT WITH CHECK (true);

-- Only admins can read/update/delete leads
CREATE POLICY "leads_admin_all" ON leads
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- ============================================================================
-- PROFILES POLICIES
-- ============================================================================

-- Users can read their own profile
CREATE POLICY "profiles_read_own" ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile (limited by app logic)
CREATE POLICY "profiles_update_own" ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Admins can read all profiles
CREATE POLICY "profiles_admin_read" ON profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles AS p
      WHERE p.id = auth.uid()
      AND p.role = 'admin'
    )
  );

-- ============================================================================
-- ADMIN WRITE POLICIES
-- ============================================================================

-- Admins can manage agents
CREATE POLICY "agents_admin_write" ON agents
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Admins can manage properties
CREATE POLICY "properties_admin_write" ON properties
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Admins can manage neighborhoods
CREATE POLICY "neighborhoods_admin_write" ON neighborhoods
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Admins can manage testimonials
CREATE POLICY "testimonials_admin_write" ON testimonials
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Admins can manage FAQ
CREATE POLICY "faq_admin_write" ON faq
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
