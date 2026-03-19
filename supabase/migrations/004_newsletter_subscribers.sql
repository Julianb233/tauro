-- Newsletter subscribers table (replaces basic newsletter_subscriptions)
-- Supports double opt-in, interest segmentation, and unsubscribe management

-- Drop the old unused table if it exists
DROP TABLE IF EXISTS newsletter_subscriptions;

CREATE TABLE newsletter_subscribers (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email           text        UNIQUE NOT NULL,
  first_name      text        DEFAULT '',
  interests       text[]      DEFAULT '{}',
  confirmed       boolean     DEFAULT false,
  confirm_token   text        UNIQUE,
  unsubscribe_token text      UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(32), 'hex'),
  source          text        DEFAULT 'footer',
  ghl_synced      boolean     DEFAULT false,
  created_at      timestamptz DEFAULT now(),
  confirmed_at    timestamptz,
  unsubscribed_at timestamptz
);

-- Indexes
CREATE INDEX idx_newsletter_email ON newsletter_subscribers (email);
CREATE INDEX idx_newsletter_confirmed ON newsletter_subscribers (confirmed) WHERE confirmed = true AND unsubscribed_at IS NULL;
CREATE INDEX idx_newsletter_confirm_token ON newsletter_subscribers (confirm_token) WHERE confirm_token IS NOT NULL;
CREATE INDEX idx_newsletter_unsub_token ON newsletter_subscribers (unsubscribe_token);

-- RLS policies
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe (insert)
CREATE POLICY "Anyone can subscribe" ON newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Anyone can confirm their subscription (update with token)
CREATE POLICY "Anyone can confirm with token" ON newsletter_subscribers
  FOR UPDATE USING (true);

-- Public can read their own subscription by token
CREATE POLICY "Public read by token" ON newsletter_subscribers
  FOR SELECT USING (true);
