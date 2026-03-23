-- Supabase Storage: buckets and policies for Tauro image uploads
-- Run this in the Supabase SQL Editor after project creation.

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('agent-photos', 'agent-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access
CREATE POLICY "Public read access on property-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'property-images');

CREATE POLICY "Public read access on agent-photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'agent-photos');

-- Allow authenticated uploads (for dashboard use in Phase 11)
CREATE POLICY "Authenticated upload to property-images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'property-images');

CREATE POLICY "Authenticated upload to agent-photos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'agent-photos');

-- Allow authenticated deletes
CREATE POLICY "Authenticated delete from property-images"
ON storage.objects FOR DELETE
USING (bucket_id = 'property-images');

CREATE POLICY "Authenticated delete from agent-photos"
ON storage.objects FOR DELETE
USING (bucket_id = 'agent-photos');
