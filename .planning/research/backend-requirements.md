# Tauro Backend Requirements: Production-Ready Premium Real Estate Platform

**Date:** 2026-03-19
**Stack:** Next.js 15 (App Router) + Supabase + Vercel + Resend + GoHighLevel

---

## Table of Contents

1. [Database & Data Layer](#1-database--data-layer)
2. [Agent Portal / CMS](#2-agent-portal--cms)
3. [Lead Management](#3-lead-management)
4. [Authentication & Authorization](#4-authentication--authorization)
5. [Search & Discovery](#5-search--discovery)
6. [Communication](#6-communication)
7. [Analytics & Reporting](#7-analytics--reporting)
8. [Integrations](#8-integrations)
9. [Infrastructure](#9-infrastructure)

---

## 1. Database & Data Layer

### 1.1 Full Supabase Schema

#### Existing Tables (Enhance)

```sql
-- ============================================================
-- PROPERTIES (enhance existing)
-- ============================================================
ALTER TABLE properties ADD COLUMN IF NOT EXISTS
  mls_number TEXT,
  mls_source TEXT,                        -- MLS data source attribution (required)
  property_sub_type TEXT,                 -- e.g., "Penthouse", "Loft", "Estate"
  listing_type TEXT DEFAULT 'sale',       -- 'sale' | 'rent' | 'both'
  hoa_fee NUMERIC(10,2),
  hoa_frequency TEXT,                     -- 'monthly' | 'quarterly' | 'annual'
  tax_annual NUMERIC(12,2),
  tax_year INTEGER,
  days_on_market INTEGER DEFAULT 0,
  original_list_price NUMERIC(12,2),
  price_per_sqft NUMERIC(10,2) GENERATED ALWAYS AS (
    CASE WHEN sqft > 0 THEN price / sqft ELSE NULL END
  ) STORED,
  listing_date DATE,
  expiry_date DATE,
  sold_date DATE,
  sold_price NUMERIC(12,2),
  parking_spaces INTEGER DEFAULT 0,
  parking_type TEXT,                      -- 'garage' | 'driveway' | 'street' | 'valet'
  heating TEXT,
  cooling TEXT,
  flooring TEXT[],
  roof_type TEXT,
  construction TEXT,
  architectural_style TEXT,
  stories INTEGER,
  rooms JSONB DEFAULT '[]',              -- [{name, dimensions, level, description}]
  appliances TEXT[],
  utilities TEXT[],
  sewer TEXT,
  water TEXT,
  school_district TEXT,
  walk_score INTEGER,
  transit_score INTEGER,
  bike_score INTEGER,
  lifestyle_tags TEXT[],                  -- ['waterfront','urban','historic','new-construction']
  is_exclusive BOOLEAN DEFAULT FALSE,    -- pre-market / private exclusive
  is_coming_soon BOOLEAN DEFAULT FALSE,
  brochure_url TEXT,                     -- generated PDF URL
  floor_plan_url TEXT,
  drone_images TEXT[],
  meta_title TEXT,
  meta_description TEXT,
  og_image TEXT,
  published BOOLEAN DEFAULT TRUE,
  archived BOOLEAN DEFAULT FALSE;

-- Indexes
CREATE INDEX idx_properties_neighborhood ON properties(neighborhood);
CREATE INDEX idx_properties_price ON properties(price);
CREATE INDEX idx_properties_status ON properties(status);
CREATE INDEX idx_properties_listing_type ON properties(listing_type);
CREATE INDEX idx_properties_beds_baths ON properties(beds, baths);
CREATE INDEX idx_properties_geo ON properties USING GIST (
  ST_SetSRID(ST_MakePoint(lng, lat), 4326)
);
CREATE INDEX idx_properties_lifestyle_tags ON properties USING GIN(lifestyle_tags);
CREATE INDEX idx_properties_features_interior ON properties USING GIN(features_interior);
CREATE INDEX idx_properties_slug ON properties(slug);
CREATE INDEX idx_properties_mls ON properties(mls_number);

-- Full-text search
ALTER TABLE properties ADD COLUMN IF NOT EXISTS
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(address, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(neighborhood, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(city, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(array_to_string(features_interior, ' '), '')), 'C') ||
    setweight(to_tsvector('english', coalesce(array_to_string(features_exterior, ' '), '')), 'C') ||
    setweight(to_tsvector('english', coalesce(array_to_string(lifestyle_tags, ' '), '')), 'C')
  ) STORED;
CREATE INDEX idx_properties_search ON properties USING GIN(search_vector);
```

#### New Tables

```sql
-- ============================================================
-- PRICE HISTORY
-- ============================================================
CREATE TABLE price_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,              -- 'listed' | 'price_change' | 'pending' | 'sold' | 'withdrawn' | 'relisted'
  price NUMERIC(12,2) NOT NULL,
  event_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_price_history_property ON price_history(property_id, event_date DESC);

-- ============================================================
-- SAVED PROPERTIES (Favorites)
-- ============================================================
CREATE TABLE saved_properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  collection_id UUID REFERENCES collections(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, property_id)
);
CREATE INDEX idx_saved_properties_user ON saved_properties(user_id);

-- ============================================================
-- COLLECTIONS (Property Boards)
-- ============================================================
CREATE TABLE collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  share_token TEXT UNIQUE,               -- for sharing via link
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_collections_user ON collections(user_id);

-- ============================================================
-- SAVED SEARCHES
-- ============================================================
CREATE TABLE saved_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  filters JSONB NOT NULL,                -- {priceMin, priceMax, beds, baths, area, type, tags, ...}
  alert_frequency TEXT DEFAULT 'daily',  -- 'instant' | 'daily' | 'weekly' | 'none'
  last_notified_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_saved_searches_user ON saved_searches(user_id);
CREATE INDEX idx_saved_searches_active ON saved_searches(is_active) WHERE is_active = TRUE;

-- ============================================================
-- PROPERTY VIEWS (Analytics)
-- ============================================================
CREATE TABLE property_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT,                        -- anonymous session tracking
  ip_hash TEXT,                           -- hashed IP for unique view counting
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_property_views_property ON property_views(property_id, created_at DESC);
CREATE INDEX idx_property_views_user ON property_views(user_id) WHERE user_id IS NOT NULL;

-- ============================================================
-- SHOWING REQUESTS
-- ============================================================
CREATE TABLE showing_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE SET NULL,
  agent_id UUID REFERENCES agents(id) ON DELETE SET NULL,
  requested_date DATE,
  requested_time_slot TEXT,              -- 'morning' | 'afternoon' | 'evening' | specific time
  preferred_dates JSONB DEFAULT '[]',    -- [{date, timeSlot}]
  status TEXT DEFAULT 'pending',         -- 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show'
  confirmed_datetime TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_showings_agent ON showing_requests(agent_id, status);
CREATE INDEX idx_showings_property ON showing_requests(property_id);

-- ============================================================
-- OPEN HOUSES
-- ============================================================
CREATE TABLE open_houses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  agent_id UUID REFERENCES agents(id),
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  description TEXT,
  rsvp_required BOOLEAN DEFAULT FALSE,
  max_attendees INTEGER,
  virtual_link TEXT,                     -- for virtual open houses
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_open_houses_upcoming ON open_houses(start_time) WHERE start_time > NOW();

-- ============================================================
-- OPEN HOUSE RSVPs
-- ============================================================
CREATE TABLE open_house_rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  open_house_id UUID NOT NULL REFERENCES open_houses(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  party_size INTEGER DEFAULT 1,
  status TEXT DEFAULT 'confirmed',       -- 'confirmed' | 'cancelled' | 'attended'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- BLOG POSTS
-- ============================================================
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  excerpt TEXT,
  content TEXT NOT NULL,                  -- Markdown or HTML
  content_html TEXT,                      -- Pre-rendered HTML
  cover_image TEXT,
  cover_image_alt TEXT,
  category TEXT NOT NULL,                 -- 'market-report' | 'buying-guide' | 'selling-guide' | 'lifestyle' | 'neighborhood' | 'news'
  tags TEXT[],
  author_id UUID REFERENCES agents(id),
  author_name TEXT,                       -- fallback if no agent author
  author_avatar TEXT,
  reading_time INTEGER,                   -- minutes
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  featured BOOLEAN DEFAULT FALSE,
  meta_title TEXT,
  meta_description TEXT,
  og_image TEXT,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published, published_at DESC);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_tags ON blog_posts USING GIN(tags);

-- Full-text search for blog
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS
  search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(excerpt, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(content, '')), 'C')
  ) STORED;
CREATE INDEX idx_blog_search ON blog_posts USING GIN(search_vector);

-- ============================================================
-- NEWSLETTER SUBSCRIBERS
-- ============================================================
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  source TEXT,                            -- 'homepage' | 'blog' | 'property' | 'footer'
  interests TEXT[],                       -- ['market-reports','new-listings','neighborhoods']
  status TEXT DEFAULT 'active',           -- 'active' | 'unsubscribed' | 'bounced'
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  ghl_synced BOOLEAN DEFAULT FALSE
);
CREATE UNIQUE INDEX idx_newsletter_email ON newsletter_subscribers(email);

-- ============================================================
-- MARKET DATA (for neighborhood pages)
-- ============================================================
CREATE TABLE market_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  neighborhood TEXT NOT NULL,
  period TEXT NOT NULL,                   -- '2026-Q1', '2026-03', etc.
  period_type TEXT NOT NULL,              -- 'monthly' | 'quarterly' | 'annual'
  median_price NUMERIC(12,2),
  avg_price NUMERIC(12,2),
  median_days_on_market INTEGER,
  active_listings INTEGER,
  sold_count INTEGER,
  avg_price_per_sqft NUMERIC(10,2),
  median_sold_price NUMERIC(12,2),
  price_change_pct NUMERIC(5,2),         -- YoY or QoQ change
  inventory_months NUMERIC(4,1),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE UNIQUE INDEX idx_market_data_unique ON market_data(neighborhood, period, period_type);

-- ============================================================
-- CONTACT SUBMISSIONS
-- ============================================================
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,                     -- 'general' | 'valuation' | 'consultation' | 'callback'
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  preferred_contact TEXT DEFAULT 'email', -- 'email' | 'phone' | 'text'
  property_id UUID REFERENCES properties(id),
  agent_id UUID REFERENCES agents(id),
  metadata JSONB DEFAULT '{}',
  lead_id UUID REFERENCES leads(id),     -- linked after lead creation
  recaptcha_score NUMERIC(3,2),
  ip_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- AGENT TESTIMONIALS (agent-specific)
-- ============================================================
CREATE TABLE agent_testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  client_name TEXT NOT NULL,
  client_role TEXT,                        -- 'Buyer' | 'Seller' | 'Buyer & Seller'
  quote TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  transaction_type TEXT,                  -- 'purchase' | 'sale' | 'both'
  property_address TEXT,
  video_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_agent_testimonials ON agent_testimonials(agent_id, sort_order);

-- ============================================================
-- AGENT SOLD HISTORY
-- ============================================================
CREATE TABLE agent_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  property_address TEXT NOT NULL,
  neighborhood TEXT,
  price NUMERIC(12,2) NOT NULL,
  sale_date DATE,
  represented TEXT,                        -- 'buyer' | 'seller' | 'both'
  property_type TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_agent_transactions ON agent_transactions(agent_id, sale_date DESC);

-- ============================================================
-- NOTIFICATION PREFERENCES
-- ============================================================
CREATE TABLE notification_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email_new_listings BOOLEAN DEFAULT TRUE,
  email_price_changes BOOLEAN DEFAULT TRUE,
  email_saved_search_alerts BOOLEAN DEFAULT TRUE,
  email_newsletter BOOLEAN DEFAULT TRUE,
  email_market_reports BOOLEAN DEFAULT FALSE,
  sms_showing_reminders BOOLEAN DEFAULT FALSE,
  sms_price_drops BOOLEAN DEFAULT FALSE,
  push_enabled BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- ============================================================
-- MEDIA LIBRARY (for CMS)
-- ============================================================
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,                -- Supabase Storage path
  public_url TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  width INTEGER,
  height INTEGER,
  alt_text TEXT,
  caption TEXT,
  uploaded_by UUID REFERENCES auth.users(id),
  entity_type TEXT,                       -- 'property' | 'agent' | 'blog' | 'neighborhood'
  entity_id UUID,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_media_entity ON media(entity_type, entity_id);

-- ============================================================
-- AUDIT LOG
-- ============================================================
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,                   -- 'create' | 'update' | 'delete' | 'login' | 'export'
  entity_type TEXT NOT NULL,
  entity_id UUID,
  changes JSONB,                          -- {field: {old, new}}
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_audit_log_entity ON audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_log_user ON audit_log(user_id, created_at DESC);
```

### 1.2 Row Level Security (RLS) Policies

```sql
-- Enable RLS on all tables
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE neighborhoods ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE showing_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- ---- PROPERTIES ----
-- Public: anyone can read published properties
CREATE POLICY "Public read published properties"
  ON properties FOR SELECT
  USING (published = TRUE AND archived = FALSE);

-- Agents: can read all properties, manage their own
CREATE POLICY "Agents manage own listings"
  ON properties FOR ALL
  USING (
    listing_agent_id = (SELECT agent_id FROM profiles WHERE id = auth.uid())
  );

-- Admins: full access
CREATE POLICY "Admin full access properties"
  ON properties FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ---- LEADS ----
-- Agents see their own leads
CREATE POLICY "Agents see own leads"
  ON leads FOR SELECT
  USING (
    agent_id = (SELECT agent_id FROM profiles WHERE id = auth.uid())
  );

-- Admins see all leads
CREATE POLICY "Admin full access leads"
  ON leads FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Public can insert leads (contact forms)
CREATE POLICY "Public can submit leads"
  ON leads FOR INSERT
  WITH CHECK (TRUE);

-- ---- SAVED PROPERTIES ----
CREATE POLICY "Users manage own favorites"
  ON saved_properties FOR ALL
  USING (user_id = auth.uid());

-- ---- SAVED SEARCHES ----
CREATE POLICY "Users manage own searches"
  ON saved_searches FOR ALL
  USING (user_id = auth.uid());

-- ---- COLLECTIONS ----
CREATE POLICY "Users manage own collections"
  ON collections FOR ALL
  USING (user_id = auth.uid());

-- Public collections viewable by anyone with share token
CREATE POLICY "Public collections viewable"
  ON collections FOR SELECT
  USING (is_public = TRUE);

-- ---- BLOG POSTS ----
CREATE POLICY "Public read published posts"
  ON blog_posts FOR SELECT
  USING (published = TRUE);

CREATE POLICY "Admins manage posts"
  ON blog_posts FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ---- PROPERTY VIEWS ----
CREATE POLICY "Anyone can insert views"
  ON property_views FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Admins read views"
  ON property_views FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'agent'))
  );

-- ---- NEWSLETTER ----
CREATE POLICY "Public can subscribe"
  ON newsletter_subscribers FOR INSERT
  WITH CHECK (TRUE);

CREATE POLICY "Admins manage subscribers"
  ON newsletter_subscribers FOR ALL
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ---- MEDIA ----
CREATE POLICY "Authenticated users upload media"
  ON media FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Public read media"
  ON media FOR SELECT
  USING (TRUE);

CREATE POLICY "Owners and admins manage media"
  ON media FOR UPDATE USING (
    uploaded_by = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
  );
```

### 1.3 MLS/IDX Integration Requirements

```
MLS Integration Strategy:
┌─────────────────────────────────────────────────┐
│  RETS/Web API Feed (Bright MLS for Philadelphia)│
│                                                 │
│  Option A: Direct MLS Feed                      │
│  - RETS credentials from Bright MLS             │
│  - Pull listings via RETS/Web API               │
│  - Run nightly sync cron job                    │
│  - Map MLS fields to Tauro schema               │
│                                                 │
│  Option B: IDX Provider (recommended for v1)    │
│  - Use provider like IDX Broker, Showcase IDX,  │
│    or iHomefinder                               │
│  - API-based integration                        │
│  - Provider handles compliance/attribution      │
│  - Webhook for new listings                     │
│                                                 │
│  Option C: Hybrid                               │
│  - Manual listings in Supabase (agent-entered)  │
│  - MLS overlay for search                       │
│  - Best of both worlds                          │
└─────────────────────────────────────────────────┘

Required MLS Compliance:
1. Display MLS logo and data source attribution on every listing
2. Include listing broker attribution
3. Display last updated timestamp
4. Fair Housing logo in footer
5. Equal Opportunity statement
6. IDX disclaimer on search results
7. "Listing provided by [Broker Name]" on each card
8. Data freshness requirement (typically 12-hour maximum)
```

### 1.4 Property Data Ingestion Pipeline

```
Data Flow:
┌──────────┐     ┌───────────┐     ┌──────────────┐     ┌──────────┐
│ MLS Feed │────>│ ETL Cron  │────>│ Supabase DB  │────>│ CDN/Edge │
│ (Bright) │     │ (Edge Fn) │     │ (PostgreSQL) │     │ (Vercel) │
└──────────┘     └───────────┘     └──────────────┘     └──────────┘
     │                │                    │
     │           ┌────┴────┐          ┌────┴────┐
     │           │ Image   │          │ Search  │
     │           │ Process │          │ Index   │
     │           │ + CDN   │          │ Update  │
     │           └─────────┘          └─────────┘
     │
     ├── Nightly full sync (1-4 AM)
     ├── Hourly incremental sync (new/updated/sold)
     └── Webhook for real-time updates (if provider supports)

ETL Steps:
1. Fetch new/updated listings from MLS/IDX
2. Normalize field names to Tauro schema
3. Download and optimize images (resize, WebP, store in Supabase Storage)
4. Geocode address if lat/lng missing (Google Geocoding API)
5. Calculate derived fields (price_per_sqft, days_on_market)
6. Fetch Walk Score / Transit Score / Bike Score
7. Update search vectors
8. Generate property slug if new
9. Track price changes in price_history table
10. Trigger saved search alert check
11. Log sync results to audit_log
```

### 1.5 Image/Media Storage Strategy

```
Storage Architecture:
┌─────────────────────────────────────────────────┐
│ Supabase Storage Buckets                        │
│                                                 │
│ ├── properties/                                 │
│ │   ├── {property_id}/                          │
│ │   │   ├── gallery/                            │
│ │   │   │   ├── 001-living-room.webp            │
│ │   │   │   ├── 001-living-room-thumb.webp      │
│ │   │   │   └── 001-living-room-og.webp         │
│ │   │   ├── floor-plans/                        │
│ │   │   ├── drone/                              │
│ │   │   └── brochure/                           │
│ │   │       └── brochure-v1.pdf                 │
│ │                                               │
│ ├── agents/                                     │
│ │   ├── {agent_id}/                             │
│ │   │   ├── headshot.webp                       │
│ │   │   ├── headshot-thumb.webp                 │
│ │   │   └── intro-video-thumb.webp              │
│ │                                               │
│ ├── blog/                                       │
│ │   ├── {post_id}/                              │
│ │   │   ├── cover.webp                          │
│ │   │   └── inline/                             │
│ │                                               │
│ ├── neighborhoods/                              │
│ │   ├── {neighborhood_slug}/                    │
│ │   │   ├── hero.webp                           │
│ │   │   └── gallery/                            │
│ │                                               │
│ └── branding/                                   │
│     ├── logo-dark.svg                           │
│     ├── logo-light.svg                          │
│     └── og-default.png                          │
└─────────────────────────────────────────────────┘

Image Processing Pipeline (on upload):
1. Validate file type (JPEG, PNG, WebP, HEIC) and size (max 20MB)
2. Strip EXIF metadata (privacy)
3. Generate variants:
   - Full: 2400px wide, 85% quality WebP
   - Large: 1200px wide, 80% quality WebP (property cards)
   - Medium: 800px wide, 75% quality WebP (mobile)
   - Thumbnail: 400px wide, 70% quality WebP
   - OG Image: 1200x630px crop
4. Generate blur hash for progressive loading
5. Store all variants in Supabase Storage
6. Record in media table with dimensions
7. Serve via Supabase CDN + Vercel Image Optimization

Supabase Storage RLS:
- Public read on all buckets
- Authenticated write on agent/admin-owned paths
- Size limits: 20MB images, 100MB videos, 50MB PDFs
```

---

## 2. Agent Portal / CMS

### 2.1 Agent Self-Service Property Management

```
Agent Dashboard Routes:
/dashboard                    -- Overview: active listings, leads, showings
/dashboard/properties         -- My listings (CRUD)
/dashboard/properties/new     -- Add new listing (multi-step form)
/dashboard/properties/[id]    -- Edit listing
/dashboard/leads              -- My leads with status pipeline
/dashboard/showings           -- Upcoming showings calendar
/dashboard/profile            -- Edit my profile
/dashboard/marketing          -- Marketing materials
/dashboard/analytics          -- My performance stats

Admin Dashboard Routes:
/admin                        -- Platform overview
/admin/properties             -- All listings management
/admin/agents                 -- Agent management
/admin/leads                  -- All leads pipeline
/admin/blog                   -- Blog CMS
/admin/neighborhoods          -- Neighborhood content management
/admin/testimonials           -- Testimonial management
/admin/media                  -- Media library
/admin/settings               -- Platform settings
/admin/analytics              -- Platform analytics
```

#### Property Management Workflow

```
Add Listing Flow (Multi-step):
┌─────────────────────────────────────────┐
│ Step 1: Basic Info                      │
│ - Address (with autocomplete)           │
│ - Property type / sub-type              │
│ - Listing type (sale/rent)              │
│ - Price                                 │
│ - MLS number (optional)                 │
│                                         │
│ Step 2: Details                         │
│ - Beds, baths, sqft, lot size           │
│ - Year built, stories                   │
│ - Parking, heating, cooling             │
│ - Room-by-room breakdown               │
│                                         │
│ Step 3: Features & Tags                 │
│ - Interior/exterior/community features  │
│ - Lifestyle tags (waterfront, etc.)     │
│ - Architectural style                   │
│ - Appliances, utilities                 │
│                                         │
│ Step 4: Media                           │
│ - Photo upload (drag & drop, reorder)   │
│ - Video URL                             │
│ - Virtual tour URL                      │
│ - Floor plan upload                     │
│ - Drone photos                          │
│                                         │
│ Step 5: Description                     │
│ - Rich text editor (or AI-generated)    │
│ - SEO meta title / description          │
│                                         │
│ Step 6: Review & Publish                │
│ - Preview property page                 │
│ - Save as draft or publish              │
│ - Set as featured / exclusive           │
└─────────────────────────────────────────┘
```

### 2.2 Photo/Video Upload Workflow

```
Upload Component Requirements:
1. Drag-and-drop multi-file upload
2. Image preview with crop/rotate
3. Drag-to-reorder gallery images
4. Set primary/hero image
5. Add alt text per image
6. Progress indicator per file
7. Auto-resize and WebP conversion (server-side)
8. Max 50 photos per listing
9. Video URL validation (YouTube, Vimeo)
10. Matterport URL validation
11. Floor plan upload (PDF or image)
12. Bulk delete with confirmation

Tech: Use @uploadthing/react or custom Supabase Storage upload
with tus protocol for resumable uploads.
```

### 2.3 AI-Powered Content Generation

```
AI Content Generation (via OpenAI/Anthropic API):

1. Property Description Generator
   Input: Property data (beds, baths, features, neighborhood, price)
   Output: Editorial-quality property description (300-500 words)
   Tone: Luxury magazine style (Christie's/Sotheby's quality)
   API Route: POST /api/ai/generate-description

2. Blog Post Auto-Generation
   Input: Property data, neighborhood data, market data
   Templates:
   - "Just Listed: [Property] in [Neighborhood]"
   - "[Neighborhood] Market Report Q[N] [Year]"
   - "Top [N] Homes in [Neighborhood] Under $[Price]"
   - "[Neighborhood] Neighborhood Guide"
   API Route: POST /api/ai/generate-blog-post

3. Social Media Content Generator
   Input: Property data + images
   Output: Platform-specific posts:
   - Instagram caption (with hashtags)
   - Facebook post
   - LinkedIn post
   - Twitter/X post
   API Route: POST /api/ai/generate-social

4. Property Brochure Content
   Input: Property data, agent info
   Output: Structured brochure content blocks
   API Route: POST /api/ai/generate-brochure-content

5. Email Marketing Copy
   Input: Newsletter type, property selections
   Output: Email subject + body HTML
   API Route: POST /api/ai/generate-email

Implementation:
- Use streaming responses for real-time generation
- Allow agent to edit before publishing
- Store generated drafts with version history
- Rate limit: 50 generations per agent per day
- Cache common prompts/templates
```

### 2.4 Property Brochure PDF Generation

```
PDF Brochure Generation:
Tech: @react-pdf/renderer or Puppeteer (headless Chrome)

Template Components:
┌─────────────────────────────────────────┐
│ Page 1: Hero                            │
│ ┌─────────────────────────────────────┐ │
│ │    Full-bleed property hero image   │ │
│ │                                     │ │
│ │    Property Address                 │ │
│ │    Price | Beds | Baths | Sqft      │ │
│ │    Tauro Logo                       │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Page 2: Details                         │
│ ┌──────────────┬──────────────────────┐ │
│ │ Photo grid   │ Description          │ │
│ │ (6 images)   │ Features list        │ │
│ │              │ Key details table    │ │
│ └──────────────┴──────────────────────┘ │
│                                         │
│ Page 3: Location                        │
│ ┌─────────────────────────────────────┐ │
│ │ Map screenshot                      │ │
│ │ Neighborhood description            │ │
│ │ Schools, transit, amenities         │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Page 4: Agent                           │
│ ┌─────────────────────────────────────┐ │
│ │ Agent headshot + bio                │ │
│ │ Contact info                        │ │
│ │ QR code to online listing           │ │
│ │ Tauro branding                      │ │
│ │ Fair Housing + MLS logos            │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘

API Route: POST /api/brochures/generate
- Input: property_id
- Process: Render PDF, upload to Supabase Storage
- Output: { url: "https://..." }
- Cache: Store URL on property record
- Invalidate: On property update
```

---

## 3. Lead Management

### 3.1 Lead Routing and Assignment Logic

```
Lead Routing Rules (evaluated in order):

1. Property-Specific Lead
   → Route to listing agent

2. Neighborhood-Specific Lead (no property)
   → Route to agent with most listings in that neighborhood
   → If tie, route to agent with highest conversion rate

3. General Inquiry
   → Round-robin among active agents
   → Weight by: capacity (leads this week), specialty match

4. Seller Lead (valuation request)
   → Route to listing specialist closest to property address
   → Geo-based assignment using PostGIS distance

5. Overflow / After-hours
   → Route to duty agent (rotating weekly schedule)
   → Auto-escalate if no response in 5 minutes

Implementation:
- Supabase Edge Function: handle-lead-routing
- Input: lead type, property_id, neighborhood, contact info
- Output: assigned agent_id
- Store assignment reason in leads.metadata
- Notify assigned agent via email + SMS
```

### 3.2 Lead Scoring Algorithm

```
Lead Score Calculation (0-100):

Contact Quality (0-30 points):
+10  Has phone number
+10  Has email (valid format)
+5   Has full name (first + last)
+5   Left a message

Engagement Signals (0-30 points):
+10  Viewed 5+ properties
+5   Saved a property
+5   Created saved search
+5   Viewed same property 3+ times
+5   Opened property brochure PDF

Intent Signals (0-25 points):
+15  Requested a showing
+10  Submitted valuation request
+5   Signed up for alerts

Profile Quality (0-15 points):
+5   Has account (not anonymous)
+5   Completed profile
+5   Verified email

Scoring Triggers:
- Recalculate on every lead activity
- Store score in leads.metadata.score
- Update lead status based on thresholds:
  - 0-20:  Cold
  - 21-50: Warm
  - 51-75: Hot
  - 76+:   Very Hot (auto-escalate)

API Route: POST /api/leads/score
Cron: Recalculate all active lead scores daily
```

### 3.3 CRM Integration (GoHighLevel)

```
GoHighLevel (GHL) Integration:

Sync Strategy: Real-time push + daily reconciliation

Trigger Events → GHL Actions:
┌─────────────────────────┬──────────────────────────────────┐
│ Tauro Event             │ GHL Action                       │
├─────────────────────────┼──────────────────────────────────┤
│ New lead submitted      │ Create/update contact            │
│                         │ Add to pipeline stage            │
│                         │ Trigger welcome automation       │
│ Showing requested       │ Update opportunity stage         │
│                         │ Create calendar event            │
│ Lead score changes      │ Update custom field              │
│                         │ Trigger workflow if threshold     │
│ Property viewed 3+ x    │ Add tag: "high-interest"         │
│ Newsletter signup       │ Add to newsletter list           │
│ Open house RSVP        │ Add to open house campaign       │
│ Property favorited      │ Add tag + custom field           │
└─────────────────────────┴──────────────────────────────────┘

GHL API Integration:
- API Base: https://rest.gohighlevel.com/v1
- Auth: Bearer token (stored in env as GHL_API_KEY)
- Rate limit: 100 requests/minute
- Webhook endpoint: POST /api/webhooks/ghl

Edge Function: sync-lead-to-ghl
- Runs on lead insert/update trigger
- Maps Tauro fields to GHL contact fields
- Handles deduplication by email
- Sets ghl_synced = true on success
- Retries 3x with exponential backoff

Custom Fields in GHL:
- tauro_lead_id
- tauro_lead_score
- tauro_interested_properties (list)
- tauro_neighborhoods (list)
- tauro_source_page
- tauro_last_property_viewed
```

### 3.4 Automated Follow-up Sequences

```
Email Sequences (via Resend + GHL):

1. New Lead Welcome Sequence
   T+0min:  "Thank you for your interest" (instant)
   T+1hr:   Agent personal intro email
   T+24hr:  "Properties you might like" (personalized)
   T+3d:    "Philadelphia neighborhood guide" (content)
   T+7d:    "Still looking?" check-in
   T+14d:   Market report email (if not converted)

2. Showing Request Sequence
   T+0min:  "Showing request received" confirmation
   T+5min:  Agent notification (email + SMS)
   T+1hr:   If no agent response → escalate to manager
   T+24hr:  Pre-showing prep email to client
   T+1hr post: "How was your showing?" feedback

3. Seller Lead Sequence
   T+0min:  "Valuation request received"
   T+30min: CMA report delivery (auto-generated)
   T+24hr:  Agent follow-up call reminder
   T+3d:    "Selling guide" PDF attachment
   T+7d:    "Market conditions in [neighborhood]"

4. Saved Search Alert
   Instant:  New listing matching saved search
   Daily:    Daily digest of new matches
   Weekly:   Weekly summary with market stats

5. Stale Lead Re-engagement
   T+30d:   "We noticed you haven't visited in a while"
   T+60d:   "New listings in your area"
   T+90d:   "Market update since your last visit"
```

### 3.5 Lead Analytics Dashboard

```
Dashboard Metrics:

Overview Cards:
- Total leads (this week/month/YTD)
- Conversion rate (lead → showing → closed)
- Average response time
- Lead score distribution

Charts:
- Leads over time (line chart, daily/weekly/monthly)
- Lead sources (pie chart: website, referral, social, etc.)
- Lead status pipeline (funnel: new → contacted → showing → offer → closed)
- Agent performance comparison (bar chart)
- Neighborhood demand heat map

Tables:
- Recent leads with status, score, assigned agent
- Leads requiring follow-up (no response > 24h)
- Hot leads (score > 75)
- Stale leads (no activity > 14d)

Filters:
- Date range
- Agent
- Neighborhood
- Lead type
- Lead status
- Lead score range
```

---

## 4. Authentication & Authorization

### 4.1 Role-Based Access Control

```
User Roles:
┌─────────┬───────────────────────────────────────────────┐
│ Role    │ Permissions                                   │
├─────────┼───────────────────────────────────────────────┤
│ admin   │ Full platform access                          │
│         │ Manage agents, properties, content            │
│         │ View all leads and analytics                  │
│         │ Platform settings and configuration           │
│         │ Manage users and roles                        │
│                                                         │
│ agent   │ Manage own listings (CRUD)                    │
│         │ View and manage own leads                     │
│         │ Edit own profile                              │
│         │ View own analytics/performance                │
│         │ Generate marketing materials                  │
│         │ View (not edit) other agents' listings        │
│                                                         │
│ buyer   │ Browse all published listings                 │
│         │ Save/favorite properties                      │
│         │ Create saved searches with alerts             │
│         │ Create collections                            │
│         │ Request showings                              │
│         │ Contact agents                                │
│         │ View property history                         │
│                                                         │
│ seller  │ All buyer permissions                         │
│         │ Request home valuation                        │
│         │ View CMA reports                              │
│         │ Track own property listing status              │
│                                                         │
│ viewer  │ Browse published listings (no save/alerts)    │
│         │ Contact agents                                │
│         │ Anonymous analytics tracking                  │
└─────────┴───────────────────────────────────────────────┘

Note: The existing database enum has 'admin' | 'agent' | 'viewer'.
Extend to include 'buyer' and 'seller' roles:

ALTER TYPE user_role ADD VALUE 'buyer';
ALTER TYPE user_role ADD VALUE 'seller';
```

### 4.2 Agent Onboarding Flow

```
Agent Onboarding:
1. Admin creates agent record in agents table
2. Admin sends invitation email with magic link
3. Agent clicks link → creates auth account
4. Profile linked: profiles.agent_id = agents.id
5. Agent completes profile wizard:
   - Upload headshot
   - Write bio
   - Select specialties
   - Select neighborhoods
   - Add social media links
   - Upload license number
6. Admin reviews and approves profile
7. Agent gains dashboard access

API Routes:
POST   /api/admin/agents/invite    -- Send invitation
POST   /api/auth/accept-invite     -- Process invitation
PATCH  /api/agents/[id]/profile    -- Update profile
POST   /api/admin/agents/[id]/approve  -- Approve agent
```

### 4.3 OAuth / Social Login

```
Supabase Auth Configuration:

Providers:
1. Email/Password (default)
   - Password requirements: 8+ chars, 1 uppercase, 1 number, 1 special
   - Email verification required

2. Google OAuth
   - Client ID from Google Cloud Console
   - Scopes: email, profile

3. Facebook OAuth
   - App ID from Facebook Developer Console
   - Scopes: email, public_profile

4. LinkedIn OAuth (for agents)
   - Client ID from LinkedIn Developer Portal
   - Scopes: r_liteprofile, r_emailaddress

5. Magic Link (passwordless)
   - Email-based, 10-minute expiry
   - Used for agent invitations

Implementation:
- Supabase Auth handles OAuth flow
- On first login: create profile with role selection
- On subsequent login: redirect to appropriate dashboard
- Store provider info for profile enrichment

Environment Variables:
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
```

### 4.4 Session Management

```
Session Strategy:
- Supabase Auth JWT tokens (access + refresh)
- Access token: 1 hour expiry
- Refresh token: 30 day expiry
- Auto-refresh via @supabase/ssr middleware
- Server-side session validation in middleware.ts

Middleware (middleware.ts):
1. Refresh session on every request
2. Protect /dashboard/* routes (require agent/admin)
3. Protect /admin/* routes (require admin)
4. Pass user context to Server Components
5. Redirect unauthenticated users to login

Rate Limiting:
- Login attempts: 5 per minute per IP
- Password reset: 3 per hour per email
- API calls: 100/min for authenticated, 20/min for anonymous
```

---

## 5. Search & Discovery

### 5.1 Full-Text Property Search

```
Search Architecture:

1. PostgreSQL Full-Text Search (primary)
   - tsvector column on properties table (see schema above)
   - Weighted: address (A) > neighborhood (A) > description (B) > features (C)
   - Support for:
     - Multi-word queries
     - Prefix matching (partial words)
     - Stemming (English)
     - Ranking by relevance

2. Search API Route: GET /api/search
   Parameters:
   - q (query string)
   - type (properties | agents | neighborhoods | all)
   - limit, offset
   - filters (price, beds, baths, etc.)

   Response: {
     properties: [...],
     agents: [...],
     neighborhoods: [...],
     total: number,
     query: string
   }

3. Autocomplete API: GET /api/search/autocomplete
   - Debounced (300ms client-side)
   - Returns top 5 suggestions per category
   - Categories: properties, neighborhoods, agents, addresses
   - Uses trigram similarity for fuzzy matching

   CREATE EXTENSION IF NOT EXISTS pg_trgm;
   CREATE INDEX idx_properties_address_trgm ON properties
     USING GIN(address gin_trgm_ops);

4. Search Suggestions:
   - Recent searches (per user, stored in localStorage + DB)
   - Popular searches (aggregated, cached)
   - Trending neighborhoods (based on view counts)
```

### 5.2 Geospatial Queries (PostGIS)

```
PostGIS Setup:
CREATE EXTENSION IF NOT EXISTS postgis;

-- Add geometry column to properties
ALTER TABLE properties ADD COLUMN IF NOT EXISTS
  geom GEOMETRY(Point, 4326) GENERATED ALWAYS AS (
    ST_SetSRID(ST_MakePoint(lng, lat), 4326)
  ) STORED;

CREATE INDEX idx_properties_geom ON properties USING GIST(geom);

Spatial Queries:

1. Radius Search (properties within X miles of a point)
   SELECT * FROM properties
   WHERE ST_DWithin(
     geom::geography,
     ST_SetSRID(ST_MakePoint($lng, $lat), 4326)::geography,
     $radius_meters
   );

2. Bounding Box Search (map viewport)
   SELECT * FROM properties
   WHERE geom && ST_MakeEnvelope($west, $south, $east, $north, 4326);

3. Polygon Search (draw-on-map)
   SELECT * FROM properties
   WHERE ST_Within(
     geom,
     ST_GeomFromGeoJSON($polygon_geojson)
   );

4. Nearest Properties
   SELECT *, ST_Distance(
     geom::geography,
     ST_SetSRID(ST_MakePoint($lng, $lat), 4326)::geography
   ) AS distance_meters
   FROM properties
   ORDER BY geom <-> ST_SetSRID(ST_MakePoint($lng, $lat), 4326)
   LIMIT 10;

5. Neighborhood Containment
   -- Requires neighborhood boundary polygons
   SELECT p.* FROM properties p
   JOIN neighborhood_boundaries nb ON ST_Within(p.geom, nb.boundary)
   WHERE nb.slug = $neighborhood_slug;

API Routes:
GET /api/properties/nearby?lat=X&lng=Y&radius=5mi
GET /api/properties/bounds?north=X&south=X&east=X&west=X
POST /api/properties/polygon  (body: GeoJSON polygon)
```

### 5.3 Saved Searches with Email Alerts

```
Saved Search Flow:

1. User sets filters on properties page
2. Clicks "Save This Search" → name + alert frequency
3. Stored in saved_searches table with full filter state
4. Cron job runs at configured intervals:

Cron Schedule:
- Instant alerts: Every 15 minutes
- Daily digest: 8:00 AM ET
- Weekly digest: Monday 8:00 AM ET

Alert Check Logic:
1. Load all active saved searches
2. For each search, run the filter query
3. Compare results against last_notified_at
4. If new matches found:
   a. Generate email with new listing cards
   b. Send via Resend
   c. Update last_notified_at

Edge Function: check-saved-search-alerts
Trigger: Supabase cron (pg_cron)

Email Template:
Subject: "[N] New Listings Match Your Search: [Search Name]"
Body:
- Header with search criteria summary
- Property cards (image, price, beds/baths/sqft, address)
- "View All Results" link (deep-link to filtered search)
- "Manage Alerts" link
- Unsubscribe link
```

### 5.4 Property Recommendation Engine

```
Recommendation Algorithm:

Input Signals:
- Viewed properties (property_views)
- Saved/favorited properties (saved_properties)
- Search filter history (saved_searches)
- Price range preferences
- Neighborhood preferences
- Property type preferences

Algorithm (Collaborative + Content-Based Hybrid):

1. Content-Based Filtering:
   - Find properties similar to user's viewed/saved properties
   - Similarity score based on:
     - Same neighborhood (+3)
     - Similar price range (within 20%) (+2)
     - Same property type (+2)
     - Matching beds/baths (+1 each)
     - Overlapping features (+0.5 per match)
     - Similar sqft (within 15%) (+1)

2. Popularity-Based Fallback:
   - Most viewed properties in user's preferred neighborhoods
   - Trending listings (high view velocity)
   - Featured properties

3. Diversity Injection:
   - Ensure recommendations span 2+ neighborhoods
   - Include at least 1 property from an adjacent neighborhood
   - Mix price points (not all same range)

API Route: GET /api/recommendations?userId=X&limit=12
Cache: Redis/Upstash with 1-hour TTL per user
Fallback: Featured properties for anonymous users
```

---

## 6. Communication

### 6.1 Email Templates (Resend Integration)

```
Email Infrastructure:

Provider: Resend (resend.com)
Domain: mail.taurorealty.com (verified)
From: noreply@taurorealty.com, team@taurorealty.com

Template System: React Email (@react-email/components)

Templates Required:
┌─────────────────────────────┬──────────────────────────────┐
│ Template                    │ Trigger                       │
├─────────────────────────────┼──────────────────────────────┤
│ welcome                     │ User registration             │
│ email-verification          │ Account creation              │
│ password-reset              │ Password reset request        │
│ agent-invitation            │ Admin invites agent           │
│ lead-notification           │ New lead for agent            │
│ showing-confirmation        │ Showing request submitted     │
│ showing-reminder            │ 24h before showing            │
│ showing-feedback            │ 1h after showing              │
│ saved-search-alert          │ New matches found             │
│ saved-search-daily          │ Daily digest                  │
│ saved-search-weekly         │ Weekly digest                 │
│ price-drop-alert            │ Price change on saved prop    │
│ newsletter                  │ Monthly newsletter            │
│ market-report               │ Quarterly market report       │
│ valuation-results           │ CMA/valuation complete        │
│ open-house-invitation       │ Upcoming open house           │
│ open-house-rsvp-confirm     │ RSVP confirmation             │
│ property-brochure           │ Brochure download delivery    │
│ contact-confirmation        │ Contact form submitted        │
│ agent-welcome               │ Agent onboarding complete     │
│ reengagement-30d            │ 30-day inactive               │
│ reengagement-60d            │ 60-day inactive               │
└─────────────────────────────┴──────────────────────────────┘

Resend Configuration:
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=team@taurorealty.com
RESEND_REPLY_TO=info@taurorealty.com

Email Sending Service:
- Wrapper around Resend API
- Template rendering via React Email
- Track send/open/click events
- Bounce handling
- Unsubscribe management (List-Unsubscribe header)
- Rate limiting (Resend: 100/second default)
```

### 6.2 SMS Notifications

```
SMS Provider: Twilio

Use Cases:
1. Agent notification for new hot lead (score > 75)
2. Showing reminders (24h and 1h before)
3. Open house reminders for RSVPs
4. Two-factor authentication (optional)

Implementation:
- Twilio SDK: twilio npm package
- Phone validation: E.164 format
- Opt-in required (collected during lead capture)
- Opt-out: Reply STOP
- Max 5 SMS per lead per day

Environment Variables:
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

API Route: POST /api/notifications/sms
Edge Function: send-sms-notification
```

### 6.3 In-App Messaging

```
Messaging System:

Tables:
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID REFERENCES properties(id),
  participants UUID[] NOT NULL,           -- array of user_ids
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id),
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text',       -- 'text' | 'property-share' | 'document' | 'image'
  metadata JSONB DEFAULT '{}',
  read_by UUID[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

Real-time Updates:
- Supabase Realtime subscriptions on messages table
- New message triggers push to all participants
- Unread count badge in navbar
- Typing indicators via Supabase Presence

Features:
- Agent ↔ Client messaging
- Property sharing within conversation
- Document/image attachment
- Read receipts
- Message search
- Archive/delete conversations
```

### 6.4 Showing Scheduling System

```
Scheduling Flow:

1. Buyer requests showing
   - Selects preferred date(s) and time slot(s)
   - Submits contact info

2. System creates showing_request
   - Routes to listing agent
   - Sends notification (email + SMS)

3. Agent confirms/proposes alternative
   - Selects confirmed datetime
   - System notifies buyer

4. Pre-showing
   - 24h reminder to both parties
   - Driving directions email to buyer
   - Property prep checklist to agent

5. Post-showing
   - Feedback request to buyer
   - Lead status update prompt to agent

Calendar Integration:
- Google Calendar API (create events)
- iCal (.ics) file generation for Apple Calendar
- Outlook calendar link

API Routes:
POST   /api/showings              -- Request a showing
PATCH  /api/showings/[id]/confirm -- Agent confirms
PATCH  /api/showings/[id]/cancel  -- Cancel showing
GET    /api/showings/agent/[id]   -- Agent's schedule
GET    /api/showings/calendar.ics -- iCal export
```

---

## 7. Analytics & Reporting

### 7.1 Market Data Integration

```
Data Sources:

1. Internal Data (Supabase)
   - Property listing/sold data → market_data table
   - Aggregate monthly/quarterly via cron job

2. Walk Score API
   - Endpoint: https://api.walkscore.com/score
   - Fetch on property creation/import
   - Store walk_score, transit_score, bike_score
   - API Key: WALK_SCORE_API_KEY

3. School Data
   - GreatSchools API or Niche API
   - Fetch schools within radius of property
   - Cache in neighborhood data
   - Fields: name, rating, grades, distance, type

4. Census Data (for neighborhood pages)
   - US Census Bureau API
   - Population, median income, demographics
   - Update annually

5. Interest Rate Data
   - Freddie Mac PMMS (Primary Mortgage Market Survey)
   - Weekly update for mortgage calculator default rate

Market Data Cron:
- Run monthly on 1st of each month
- Aggregate from properties table:
  - Median/average list price by neighborhood
  - Days on market by neighborhood
  - Active listing count
  - Sold count and prices
  - Price per sqft
  - YoY change calculations
- Store in market_data table
- Generate market report blog post (AI-assisted)
```

### 7.2 Agent Performance Dashboard

```
Agent Dashboard Metrics:

Cards:
- Active listings count
- Total volume (price sum of active listings)
- Leads this month / trend
- Average lead response time
- Conversion rate (lead → showing → sold)

Charts:
- Listings over time (active vs sold)
- Lead pipeline (funnel)
- Monthly revenue (closed deals)
- Views per listing (bar chart)
- Response time trend (line chart)

Leaderboard (admin view):
- Top agents by volume
- Top agents by conversion rate
- Top agents by response time
- Top agents by client satisfaction

Data Sources:
- properties table (active/sold)
- leads table (count, status)
- showing_requests table
- property_views table
- agent_transactions table

API Routes:
GET /api/dashboard/agent/[id]/stats
GET /api/dashboard/agent/[id]/leads
GET /api/dashboard/agent/[id]/performance
GET /api/admin/dashboard/leaderboard
```

### 7.3 Lead Conversion Analytics

```
Conversion Funnel:
Anonymous Visitor → Lead → Contacted → Showing → Offer → Under Contract → Closed

Metrics:
- Funnel conversion rates (stage to stage)
- Time in each stage (median, average)
- Drop-off analysis (where leads go cold)
- Source attribution (which pages generate most leads)
- Channel attribution (organic, social, referral, direct)

Lead Source Tracking:
- UTM parameters on all inbound links
- Referrer header capture
- Page of first contact form submission
- Store in leads.metadata.source

API Routes:
GET /api/analytics/leads/funnel?period=30d
GET /api/analytics/leads/sources?period=30d
GET /api/analytics/leads/conversion?agent_id=X
```

### 7.4 Property View Analytics

```
Tracking Implementation:

Client-Side (page view):
- On PropertyDetailClient mount: POST /api/analytics/view
- Payload: { propertyId, sessionId, referrer }
- Debounce: 1 view per session per property per 30 minutes

Server-Side Aggregation (Edge Function):
- Daily: Aggregate views into daily_property_stats
- Calculate: unique views, total views, avg time on page

Dashboard Widgets:
- Most viewed properties (7d, 30d, 90d)
- View trends per property (sparkline)
- Views by source (direct, search, social, email)
- Geographic heatmap of viewers (by IP geolocation)

Privacy:
- Hash IP addresses (no raw IPs stored)
- Respect DNT header
- Anonymous session via UUID cookie (no PII)
- Data retention: 12 months, then aggregate only
```

---

## 8. Integrations

### 8.1 MLS/IDX Data Feed

See Section 1.3 above. Additional requirements:

```
Bright MLS (Philadelphia market):
- RETS endpoint or Web API
- Credentials required from broker
- Data refresh: minimum every 12 hours (compliance)
- Fields to map: 200+ MLS fields → Tauro schema
- Photo download: Highest resolution available
- Compliance: IDX disclaimer, listing broker credit

Edge Function: mls-sync
Schedule: */60 * * * * (hourly incremental) + 0 2 * * * (nightly full)
```

### 8.2 Mapbox / Google Maps

```
Map Integration:

Provider: Mapbox GL JS (primary) — already integrated

Requirements:
1. Interactive property map with custom markers (gold pins)
2. Cluster markers at low zoom levels
3. Property preview popup on marker click/hover
4. Draw-to-search polygon tool
5. Neighborhood boundary layers (GeoJSON)
6. Satellite/terrain toggle
7. Street view link (Google Maps fallback)
8. Driving directions link
9. Custom map style matching Tauro brand colors
10. Static map for PDF brochures (Mapbox Static Images API)

Environment Variables:
NEXT_PUBLIC_MAPBOX_TOKEN=
MAPBOX_SECRET_TOKEN= (for server-side static maps)

Boundary Data:
- Source: Philadelphia Open Data (OpenDataPhilly)
- Format: GeoJSON
- Store in Supabase or serve as static asset
- Neighborhoods: ~60 neighborhoods
```

### 8.3 Mortgage Calculator API

```
Mortgage Calculator:

Client-Side Implementation (no API needed for basic calc):
- Formula: M = P[r(1+r)^n] / [(1+r)^n - 1]
- Inputs:
  - Home price (pre-filled from listing)
  - Down payment (% and $, default 20%)
  - Interest rate (default from Freddie Mac PMMS)
  - Loan term (15, 20, 30 years)
  - Property tax (auto-filled from property.tax_annual)
  - HOA fees (from property.hoa_fee)
  - Insurance estimate (0.35% of home price annually)

- Output:
  - Monthly payment total
  - Breakdown: principal + interest, taxes, insurance, HOA
  - Amortization schedule (optional expandable table)
  - Total interest over loan life

Pre-Approval Partner Integration:
- Link to mortgage partner (e.g., Rocket Mortgage, local lender)
- Pass property details via URL params
- Track clicks for attribution

API Route: GET /api/mortgage/rates (fetch current rates)
Cache: 24-hour TTL on rate data
```

### 8.4 School Data API

```
School Data Integration:

Option A: GreatSchools API
- Endpoint: https://gs-api.greatschools.org/schools
- Search by lat/lng + radius
- Returns: name, rating (1-10), grades, type, distance
- Requires API key

Option B: Niche.com API (if available)
- More comprehensive data
- School rankings and reviews

Data Storage:
CREATE TABLE schools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT,                  -- 'public' | 'private' | 'charter'
  grades TEXT,                -- 'K-5', '6-8', '9-12'
  rating NUMERIC(3,1),
  rating_source TEXT,
  address TEXT,
  lat NUMERIC(10,7),
  lng NUMERIC(10,7),
  district TEXT,
  enrollment INTEGER,
  student_teacher_ratio NUMERIC(4,1),
  url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE property_schools (
  property_id UUID REFERENCES properties(id) ON DELETE CASCADE,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
  distance_miles NUMERIC(4,2),
  PRIMARY KEY (property_id, school_id)
);

Sync: Monthly refresh of school data
Matching: On property creation, find schools within 3-mile radius
```

### 8.5 Walk Score API

```
Walk Score Integration:

API: https://api.walkscore.com/score
Parameters: lat, lon, address
Returns: walk_score, transit_score, bike_score (0-100)

Fetch Strategy:
- On property creation/import
- Cache on property record
- Refresh if older than 90 days

API Key: WALK_SCORE_API_KEY
Rate Limit: 5,000 requests/day (free tier)

Display:
- Color-coded badges (0-24: red, 25-49: orange, 50-69: yellow, 70-89: green, 90-100: green+)
- Labels: "Walker's Paradise", "Very Walkable", "Somewhat Walkable", "Car-Dependent"
```

### 8.6 GoHighLevel CRM Sync

See Section 3.3 above.

### 8.7 Stripe (Premium Features)

```
Stripe Integration:

Use Cases:
1. Featured listing boost ($49/week per property)
2. Premium agent profile ($29/month)
3. Property brochure credits ($5 per PDF)
4. Market report access ($0 — lead magnet, but track)

Implementation:
- Stripe Checkout for one-time purchases
- Stripe Subscriptions for recurring features
- Stripe Webhooks for payment confirmation

Tables:
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  stripe_customer_id TEXT NOT NULL,
  stripe_subscription_id TEXT UNIQUE,
  plan TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE payment_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  stripe_payment_intent_id TEXT UNIQUE,
  amount INTEGER NOT NULL,               -- in cents
  currency TEXT DEFAULT 'usd',
  description TEXT,
  status TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

Environment Variables:
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

API Routes:
POST /api/stripe/checkout          -- Create checkout session
POST /api/stripe/portal            -- Customer portal
POST /api/webhooks/stripe          -- Handle webhooks
GET  /api/stripe/subscriptions     -- User's subscriptions
```

### 8.8 Twilio (SMS)

See Section 6.2 above.

---

## 9. Infrastructure

### 9.1 Vercel Deployment Optimization

```
Vercel Configuration (vercel.json):
{
  "framework": "nextjs",
  "regions": ["iad1"],                    // US East (closest to Philly)
  "crons": [
    { "path": "/api/cron/saved-search-alerts", "schedule": "*/15 * * * *" },
    { "path": "/api/cron/daily-digest", "schedule": "0 13 * * *" },
    { "path": "/api/cron/weekly-digest", "schedule": "0 13 * * 1" },
    { "path": "/api/cron/stale-lead-cleanup", "schedule": "0 3 * * *" },
    { "path": "/api/cron/market-data-aggregate", "schedule": "0 4 1 * *" },
    { "path": "/api/cron/sitemap-regenerate", "schedule": "0 5 * * *" }
  ]
}

Build Optimization:
- ISR (Incremental Static Regeneration) for property pages
  - revalidate: 3600 (1 hour) for listing pages
  - revalidate: 86400 (24 hours) for neighborhood/agent pages
  - On-demand revalidation via webhook on data change
- Static generation for blog posts
- Edge Runtime for search API routes
- Image optimization via Vercel's built-in optimizer
- Bundle analysis: @next/bundle-analyzer
- Tree-shaking: Ensure no server code in client bundles

Environment Variables:
- Production: Set in Vercel Dashboard (encrypted)
- Preview: Separate set for staging
- Development: .env.local (gitignored)
```

### 9.2 Supabase Edge Functions

```
Edge Functions Required:

1. handle-lead-routing
   Trigger: Database webhook on leads INSERT
   Logic: Score lead, assign agent, notify

2. sync-lead-to-ghl
   Trigger: Database webhook on leads INSERT/UPDATE
   Logic: Push to GoHighLevel CRM

3. check-saved-search-alerts
   Trigger: Cron (every 15 minutes)
   Logic: Check for new matches, send emails

4. process-image-upload
   Trigger: Storage webhook on file upload
   Logic: Resize, convert to WebP, generate thumbnails

5. generate-property-brochure
   Trigger: HTTP request from dashboard
   Logic: Render PDF, store in Supabase Storage

6. mls-sync-incremental
   Trigger: Cron (hourly)
   Logic: Fetch new/updated MLS listings

7. mls-sync-full
   Trigger: Cron (nightly at 2 AM)
   Logic: Full MLS reconciliation

8. aggregate-market-data
   Trigger: Cron (monthly)
   Logic: Calculate market stats from property data

9. send-email
   Trigger: Database webhook / HTTP
   Logic: Render template, send via Resend

10. cleanup-stale-data
    Trigger: Cron (daily)
    Logic: Archive old leads, clean expired sessions

Deployment:
supabase functions deploy --project-ref $SUPABASE_PROJECT_REF
```

### 9.3 Cron Jobs

```
Cron Schedule (all times ET):

Every 15 min:
- check-saved-search-alerts (instant alerts)

Hourly:
- mls-sync-incremental (new/updated listings)

Daily:
- 08:00 — daily-digest (saved search daily alerts)
- 03:00 — stale-lead-cleanup (archive leads > 90 days inactive)
- 04:00 — recalculate-lead-scores (all active leads)
- 05:00 — sitemap-regenerate
- 06:00 — analytics-daily-aggregate

Weekly:
- Monday 08:00 — weekly-digest (saved search weekly alerts)
- Monday 09:00 — agent-performance-report
- Sunday 02:00 — mls-full-sync

Monthly:
- 1st 04:00 — market-data-aggregate
- 1st 05:00 — generate-market-report (AI-assisted)
- 1st 06:00 — newsletter-monthly

Implementation:
- Vercel Cron for Next.js API routes
- Supabase pg_cron for database-level jobs
- Both protected with CRON_SECRET header validation
```

### 9.4 File Storage (Supabase Storage)

```
Bucket Configuration:

1. properties (public read)
   - Max file size: 20MB
   - Allowed types: image/jpeg, image/png, image/webp, image/heic
   - Auto-transform: enabled

2. agents (public read)
   - Max file size: 10MB
   - Allowed types: image/jpeg, image/png, image/webp

3. blog (public read)
   - Max file size: 20MB
   - Allowed types: image/jpeg, image/png, image/webp, image/gif

4. brochures (public read)
   - Max file size: 50MB
   - Allowed types: application/pdf

5. documents (private)
   - Max file size: 50MB
   - Allowed types: application/pdf, image/*
   - Access: authenticated users only

6. videos (public read)
   - Max file size: 500MB
   - Allowed types: video/mp4, video/webm
   - Note: Prefer external hosting (YouTube/Vimeo) for large videos

Storage Policies:
- Public buckets: Anyone can read
- Uploads: Authenticated users with appropriate role
- Deletes: Owner or admin only
- Path structure: {bucket}/{entity_id}/{file_name}
```

### 9.5 CDN Strategy

```
CDN Architecture:

Layer 1: Vercel Edge Network
- HTML pages, API responses
- Automatic CDN for static assets
- ISR cache at edge
- Image optimization (next/image)

Layer 2: Supabase CDN
- Database-stored images (properties, agents)
- Supabase Storage serves via CDN
- Transform API for on-the-fly resizing

Layer 3: External CDN (optional, for scale)
- Cloudflare in front of custom domain
- Cache static assets aggressively
- DDoS protection
- WAF rules

Cache Headers Strategy:
- Static assets (CSS, JS, fonts): max-age=31536000, immutable
- Images: max-age=86400, stale-while-revalidate=604800
- API responses: max-age=0, s-maxage=60, stale-while-revalidate=300
- HTML pages: max-age=0, s-maxage=3600 (ISR handles freshness)

Image Optimization:
- Serve WebP/AVIF with Accept header negotiation
- Responsive images with srcset
- Blur hash placeholders (blurhash npm package)
- Lazy loading with IntersectionObserver
```

### 9.6 Rate Limiting

```
Rate Limiting Strategy:

Implementation: Upstash Redis (@upstash/ratelimit)

Limits by Endpoint:
┌──────────────────────────┬──────────────┬───────────────┐
│ Endpoint                 │ Anonymous    │ Authenticated │
├──────────────────────────┼──────────────┼───────────────┤
│ GET /api/properties      │ 60/min       │ 120/min       │
│ GET /api/search          │ 30/min       │ 60/min        │
│ POST /api/leads          │ 5/min        │ 10/min        │
│ POST /api/contact        │ 3/min        │ 5/min         │
│ POST /api/auth/login     │ 5/min        │ N/A           │
│ GET /api/autocomplete    │ 30/min       │ 60/min        │
│ POST /api/upload         │ N/A          │ 20/min        │
│ POST /api/ai/*           │ N/A          │ 10/min        │
│ * (catch-all)            │ 100/min      │ 200/min       │
└──────────────────────────┴──────────────┴───────────────┘

Implementation:
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(60, "1 m"),
  analytics: true,
});

Environment Variables:
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

### 9.7 Security Headers

```
Security Headers (next.config.ts):

headers: [
  {
    source: "/(.*)",
    headers: [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-XSS-Protection", value: "1; mode=block" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.recaptcha.net https://maps.googleapis.com",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' https://fonts.gstatic.com",
          "img-src 'self' data: blob: https://images.unsplash.com https://*.supabase.co https://api.mapbox.com https://*.tile.openstreetmap.org",
          "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.mapbox.com https://events.mapbox.com https://www.google-analytics.com",
          "frame-src https://www.youtube.com https://player.vimeo.com https://my.matterport.com https://www.google.com",
          "worker-src 'self' blob:",
        ].join("; "),
      },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
    ],
  },
]

Additional Security:
1. CSRF protection on all form submissions
2. Input sanitization (DOMPurify for user-generated content)
3. SQL injection prevention (Supabase parameterized queries)
4. XSS prevention (React auto-escaping + CSP)
5. File upload validation (type, size, content scanning)
6. API authentication tokens (never expose service role key)
7. Environment variable encryption (Vercel encrypted env vars)
8. Dependency vulnerability scanning (npm audit, Snyk)
9. Regular security audits
10. CORS configuration (restrict to taurorealty.com domains)
```

### 9.8 Monitoring & Observability

```
Monitoring Stack:

1. Error Tracking: Sentry
   - Client-side error capture
   - Server-side error capture
   - Performance monitoring
   - Release tracking
   - SENTRY_DSN in environment

2. Analytics: Google Tag Manager + GA4
   - Page views
   - Custom events (property view, lead submit, search, save)
   - Conversion tracking
   - Ecommerce events (property value as transaction)

3. Uptime Monitoring: Better Uptime / Vercel Analytics
   - Homepage, API health, search endpoint
   - Alert on downtime (Slack + email)

4. Log Management: Vercel Logs + Supabase Dashboard
   - API route logs
   - Edge Function logs
   - Database query performance
   - Error logs with stack traces

5. Performance: Vercel Analytics + Web Vitals
   - Core Web Vitals (LCP, FID, CLS)
   - Real user monitoring
   - Page load times by route
   - Geographic performance distribution
```

---

## Environment Variables Summary

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Auth Providers
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=

# Email
RESEND_API_KEY=
RESEND_FROM_EMAIL=team@taurorealty.com

# SMS
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# Maps
NEXT_PUBLIC_MAPBOX_TOKEN=
MAPBOX_SECRET_TOKEN=
GOOGLE_MAPS_API_KEY=

# CRM
GHL_API_KEY=
GHL_LOCATION_ID=

# Payments
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# AI
OPENAI_API_KEY=
ANTHROPIC_API_KEY=

# Analytics
NEXT_PUBLIC_GTM_ID=
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=

# External APIs
WALK_SCORE_API_KEY=
GREATSCHOOLS_API_KEY=

# Rate Limiting
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# MLS
MLS_RETS_URL=
MLS_RETS_USERNAME=
MLS_RETS_PASSWORD=

# Security
RECAPTCHA_SECRET_KEY=
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=
CRON_SECRET=

# App
NEXT_PUBLIC_SITE_URL=https://taurorealty.com
NEXT_PUBLIC_APP_NAME=Tauro
```

---

## Implementation Priority

### Phase 1: Foundation (Weeks 1-4)
- Supabase schema enhancements (new tables, indexes, RLS)
- Authentication (Supabase Auth, OAuth, role-based access)
- Blog infrastructure (CMS, templates)
- reCAPTCHA on all forms
- MLS/Fair Housing compliance badges
- Schema.org structured data
- GTM + GA4 setup
- Cookie consent

### Phase 2: Core Features (Weeks 5-8)
- Saved properties / favorites
- Saved searches with email alerts
- Enhanced property detail page (mortgage calc, school data, Walk Score)
- Newsletter system (Resend)
- Property share functionality
- Agent profile enhancements
- Agent dashboard (basic)

### Phase 3: Engagement (Weeks 9-12)
- Lead scoring and routing
- GoHighLevel CRM sync
- Automated email sequences
- In-app messaging
- Showing scheduling system
- Property brochure PDF generation
- Market data aggregation

### Phase 4: Intelligence (Weeks 13-16)
- AI content generation (descriptions, blog, social)
- Property recommendation engine
- Advanced search (PostGIS, autocomplete)
- Agent marketing center
- Analytics dashboards
- SMS notifications (Twilio)

### Phase 5: Scale (Weeks 17-20)
- MLS/IDX integration
- Image processing pipeline
- Stripe payments
- Performance optimization
- Security hardening
- Monitoring and observability
