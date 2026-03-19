-- Fix infinite recursion in RLS policies
-- The admin policies query profiles table which itself has RLS, causing recursion.
-- Solution: Use a SECURITY DEFINER function that bypasses RLS.

-- Create a security definer function to check admin role without triggering RLS
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid()
    AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Drop and recreate admin policies using the security definer function

DROP POLICY IF EXISTS "profiles_admin_read" ON profiles;
CREATE POLICY "profiles_admin_read" ON profiles
  FOR SELECT
  USING (is_admin());

DROP POLICY IF EXISTS "agents_admin_write" ON agents;
CREATE POLICY "agents_admin_write" ON agents
  FOR ALL
  USING (is_admin());

DROP POLICY IF EXISTS "properties_admin_write" ON properties;
CREATE POLICY "properties_admin_write" ON properties
  FOR ALL
  USING (is_admin());

DROP POLICY IF EXISTS "neighborhoods_admin_write" ON neighborhoods;
CREATE POLICY "neighborhoods_admin_write" ON neighborhoods
  FOR ALL
  USING (is_admin());

DROP POLICY IF EXISTS "testimonials_admin_write" ON testimonials;
CREATE POLICY "testimonials_admin_write" ON testimonials
  FOR ALL
  USING (is_admin());

DROP POLICY IF EXISTS "faq_admin_write" ON faq;
CREATE POLICY "faq_admin_write" ON faq
  FOR ALL
  USING (is_admin());

DROP POLICY IF EXISTS "leads_admin_all" ON leads;
CREATE POLICY "leads_admin_all" ON leads
  FOR ALL
  USING (is_admin());
