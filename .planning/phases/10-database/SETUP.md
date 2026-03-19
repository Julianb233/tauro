# Supabase Database Setup — Tauro Real Estate

## Completed

### Supabase Project
- **Project name:** Tauro Real Estate
- **Reference ID:** `iuslvjusbpalynjdkigf`
- **Region:** East US (North Virginia) / us-east-1
- **Dashboard:** https://supabase.com/dashboard/project/iuslvjusbpalynjdkigf
- **1Password:** "Supabase - Tauro Real Estate" in API-Keys vault

### Environment Variables (set in Vercel for all environments)
- `NEXT_PUBLIC_SUPABASE_URL` — project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — public anon key
- `SUPABASE_SERVICE_ROLE_KEY` — service role key (server-side only)
- `RESEND_API_KEY` — Resend global key (from RESEND-global in 1Password)

### Database Schema (applied via `supabase db push`)
Migration `001_initial_schema.sql` created 6 tables:
1. **agents** — real estate agents (with generated `full_name` column)
2. **properties** — property listings (FK to agents)
3. **neighborhoods** — Philadelphia neighborhoods
4. **leads** — inbound lead submissions (FK to properties, agents)
5. **testimonials** — client testimonials
6. **faq** — FAQ entries

Plus: 9 indexes, `updated_at` trigger function on 4 tables.

### Seed Data (applied via `npx tsx scripts/seed.ts`)
- 6 agents, 15 neighborhoods, 16 properties, 3 testimonials, 18 FAQ items

---

## Still Needed

### 1. Profiles Table (required for auth — Phase 11)
The `src/types/database.ts` defines a `profiles` table and `user_role` enum, but the migration does NOT create them. The `src/lib/supabase/auth.ts` queries the `profiles` table. A new migration is needed:

```sql
-- 002_profiles_and_rls.sql
CREATE TYPE user_role AS ENUM ('admin', 'agent', 'viewer');

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

CREATE TRIGGER set_updated_at_profiles
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-create profile on user signup
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
```

### 2. Row-Level Security (RLS) Policies
No RLS policies exist yet. All tables are currently accessible via anon key without restrictions. Policies needed:

**Public read access (anon):**
- `properties` — SELECT where status != 'Draft'
- `agents` — SELECT all
- `neighborhoods` — SELECT all
- `testimonials` — SELECT all
- `faq` — SELECT all

**Write access (authenticated service role only):**
- `leads` — INSERT allowed for anon (form submissions), SELECT/UPDATE/DELETE restricted to admin/service role
- `properties` — INSERT/UPDATE/DELETE restricted to admin or owning agent
- `agents` — INSERT/UPDATE/DELETE restricted to admin

**Profiles:**
- SELECT own profile
- UPDATE own profile (limited fields)
- Admin can SELECT/UPDATE all profiles

### 3. Storage Buckets (Phase 10-03)
Per `10-03-PLAN.md`, a storage bucket for images needs to be created:
- Bucket name: `images` (or `property-images`)
- Public read access
- Write access restricted to authenticated users
- See `supabase/storage-policies.sql` when created

### 4. Remaining Phase 10 Plans
- **10-03:** Image upload API + storage bucket
- **10-04:** CRUD API routes for properties, agents, leads
- **10-05:** Wire all pages to use database queries instead of static data

---

## Local Development

```bash
# Pull env vars from Vercel
npx vercel env pull .env.local

# Run seed script
npx tsx scripts/seed.ts

# Push new migrations
npx supabase db push --linked
```
