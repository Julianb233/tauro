-- Add video_intro_id column to agents table
-- Stores the YouTube/Vimeo video ID separately from the full URL,
-- enabling embed URL construction without client-side parsing.
ALTER TABLE agents ADD COLUMN IF NOT EXISTS video_intro_id text;

COMMENT ON COLUMN agents.video_intro_id IS 'YouTube or Vimeo video ID for the agent intro video (e.g. dQw4w9WgXcQ)';
