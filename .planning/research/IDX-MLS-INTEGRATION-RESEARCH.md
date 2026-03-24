# IDX/MLS Integration Research: Tauro (LYL Realty Group)

**Domain:** Real estate MLS/IDX data integration for Philadelphia brokerage website
**Researched:** 2026-03-23
**Overall Confidence:** MEDIUM-HIGH (verified with official sources where possible)

---

## Table of Contents

1. [Which MLS Serves Philadelphia](#1-which-mls-serves-philadelphia)
2. [IDX vs RETS vs RESO Web API](#2-idx-vs-rets-vs-reso-web-api)
3. [Third-Party IDX/API Providers Comparison](#3-third-party-idxapi-providers-comparison)
4. [Compliance Requirements](#4-compliance-requirements)
5. [Technical Implementation Approaches](#5-technical-implementation-approaches)
6. [Recommended Path](#6-recommended-path)
7. [Steps to Get Started](#7-steps-to-get-started)

---

## 1. Which MLS Serves Philadelphia

### Bright MLS

**Confidence: HIGH** (verified via official Bright MLS developer portal and documentation)

Philadelphia is served by **Bright MLS**, the largest MLS in the Mid-Atlantic region. Bright MLS was established in 2016 through the merger of MRIS and Trend MLS (which was the original Philadelphia-area MLS).

**Coverage area:** Pennsylvania, Delaware, Virginia, Maryland, New Jersey, and Washington D.C. -- approximately 100,000+ subscribers across the region.

**Certification:** Bright MLS holds RESO 1.5 Platinum Certification, making it one of the first MLSs to achieve this. This means their data dictionary and API are fully RESO-compliant.

### Membership Requirements

To participate in Bright MLS, you must:
- Hold a **current, valid real estate broker's license** in the applicable state
- Be a member of a local REALTOR association that is a Bright MLS shareholder
- For Philadelphia: join through the **Greater Philadelphia Association of Realtors (GPAR)** or a similar local association (e.g., Tri-County Suburban REALTORS, Bucks County Association of REALTORS)

**LYL Realty Group must already be a Bright MLS subscriber** to operate as a brokerage in Philadelphia. If Tony (the broker) is actively listing/selling properties, he almost certainly already has Bright MLS access. Confirm this in the meeting.

### Costs

| Fee Type | Amount | Notes |
|----------|--------|-------|
| Agent IDX subscription | ~$10/mo per agent | For 1 website/product |
| Agent IDX (2+ products) | ~$12.50/mo per agent | For multiple websites |
| Developer/Vendor data feed | ~$7,500/year per product | Plus $200/brokerage for 20+ |
| MLS membership (via association) | Varies by association | Typically $400-$800/year |
| Broker one-time setup | Varies | Contact Bright MLS |

**Important:** These fees are what Bright MLS charges. Third-party IDX providers (SimplyRETS, Repliers, etc.) have their own fees on top of or instead of these, depending on the arrangement.

### API Access

Bright MLS offers a **RESO Web API** directly:
- **Production endpoint:** `https://bright-reso.brightmls.com/RESO/OData/bright`
- **Test endpoint:** `https://bright-reso.tst.brightmls.com/RESO/OData/bright`
- **Auth:** OAuth 2.0 (client ID + client secret provided during onboarding)
- **Standard:** RESO Web API Core 1.0, RESO v1.7 Data Dictionary
- **Developer portal:** https://developer.brightmls.com
- **Contact:** developer@brightmls.com / data-support@brightmls.com

**Sources:**
- [Bright MLS Developer Portal](https://developer.brightmls.com/)
- [Bright MLS RESO Web API Overview](https://developer.brightmls.com/brightreso/default/overview)
- [Bright MLS Pricing](https://brightmls.com/pricing)
- [Bright MLS IDX Products](https://www.brightmls.com/products/idx)

---

## 2. IDX vs RETS vs RESO Web API

### Definitions

| Term | What It Is | Status |
|------|-----------|--------|
| **IDX** (Internet Data Exchange) | A **policy/agreement** that allows MLS participants to display each other's listings on their websites. Not a technology -- it's the legal framework. | Active, governed by NAR |
| **RETS** (Real Estate Transaction Standard) | The **old technology standard** for downloading MLS data. XML-based, batch-oriented, complex. Think "FTP for real estate data." | **Deprecated since 2018** |
| **RESO Web API** | The **modern technology standard** replacing RETS. RESTful, OData-based, JSON responses. The current industry standard. | Active, required for RESO certification |

### The RETS-to-RESO Transition

**Confidence: HIGH** (verified via RESO.org and multiple industry sources)

- **June 2018:** RESO officially ended support for RETS and began pushing the RESO Web API
- **2019-2024:** Gradual transition period; most major MLSs adopted RESO Web API
- **2025-2026:** Over 75% of MLS providers have adopted RESO Web API. Legacy RETS feeds are being shut down or are already gone
- **Bright MLS:** Already fully RESO Web API compliant with Platinum certification. Their RETS server may still exist but should not be used for new development

### Key Differences for Developers

| Aspect | RETS (Legacy) | RESO Web API (Current) |
|--------|---------------|------------------------|
| Protocol | Custom XML protocol | RESTful HTTP + OData |
| Data format | XML with custom schemas | JSON with standardized RESO Data Dictionary |
| Authentication | RETS-specific auth | OAuth 2.0 |
| Querying | DMQL (custom query language) | OData query syntax ($filter, $select, $top, etc.) |
| Real-time | Batch downloads only | Near real-time queries possible |
| Media/Photos | Separate binary download | URL-based, CDN-friendly |
| Developer experience | Painful, poorly documented | Modern, well-documented |
| Library support | Legacy libraries only | Standard HTTP/OData libraries work |

### Recommendation

**Do NOT build on RETS.** Use RESO Web API exclusively, either directly through Bright MLS or through a third-party provider that normalizes RESO data. Any provider still pitching RETS-only access is behind the curve.

**Sources:**
- [RESO Web API Standard](https://www.reso.org/reso-web-api/)
- [RETS vs RESO Web API for Real Estate Platforms in 2026](https://oyelabs.com/rets-vs-reso-web-api-for-real-estate-platforms-in-2026/)
- [NAR RETS Page](https://www.nar.realtor/real-estate-transaction-standards-rets)

---

## 3. Third-Party IDX/API Providers Comparison

These providers sit between you and the MLS, handling data licensing, normalization, compliance, and API delivery so you don't have to deal with the MLS directly.

### Comparison Matrix

| Provider | Pricing | Bright MLS Support | API Quality | Next.js Fit | Compliance Handling | Best For |
|----------|---------|-------------------|-------------|-------------|-------------------|----------|
| **SimplyRETS** | $49/mo + $99 setup per feed | Yes (RESO Web API) | Good, RESTful JSON | Excellent | Partial (you handle disclaimers) | Developers building custom sites |
| **IDX Broker** | $60-99/mo | Yes (approved vendor) | Limited (no MLS listing data via API) | Poor (iframe/widget-focused) | Full (handles disclaimers) | WordPress/iframe sites |
| **Spark API (FBS)** | $50/mo per MLS | Unknown for Bright | Good, RESO-compliant | Good | Partial | Multi-MLS apps |
| **Bridge Interactive** | Free for qualifying devs | Check availability | Good, RESO Platinum | Good | Partial | Budget-conscious devs |
| **Trestle (CoreLogic/Cotality)** | $85/mo platform + MLS fees | Likely (CoreLogic is huge) | Good, RESO-compliant | Good | Partial | Enterprise apps |
| **MLS Grid** | MLS license fees only | Check availability | Good, RESO-compliant | Good | Partial | Direct MLS integrations |
| **Repliers** | $199-399/mo | Check availability (US coverage) | Excellent | Excellent | Full (automated) | Modern developer-first apps |
| **ListHub** | Free for brokers (syndication) | Yes | Not a dev API | N/A | N/A | Listing syndication, not search |

### Detailed Provider Analysis

#### SimplyRETS -- RECOMMENDED FOR TAURO

**Confidence: MEDIUM-HIGH**

SimplyRETS is purpose-built for developers building custom real estate websites. It acts as a data normalization layer between your app and the MLS.

**Pros:**
- Developer-first: clean RESTful JSON API designed for React/Next.js apps
- Supports both RETS and RESO Web API feeds -- future-proof
- Normalized data model across MLSs (consistent field names regardless of MLS)
- Listings API, Agents API, Open Houses API, Analytics API
- Hundreds of search/filter parameters
- $49/mo is the lowest ongoing cost of any serious provider
- No long-term contracts
- GitHub examples available (including JavaScript)

**Cons:**
- One-time $99 connection fee per MLS feed
- You still handle your own IDX compliance (disclaimers, logos)
- Not as feature-rich as Repliers (no built-in compliance automation)
- Support is smaller team (not enterprise-grade)

**Pricing:** $49/mo + $99 one-time per feed connection. No hidden fees.

**How it works:**
1. You sign up and provide your MLS credentials (Bright MLS)
2. SimplyRETS connects to Bright MLS on your behalf
3. Data is normalized and served via their REST API
4. You build your frontend however you want (Next.js, React, etc.)
5. Data refreshes automatically (typically every 15 minutes)

#### IDX Broker -- NOT RECOMMENDED FOR TAURO

**Confidence: HIGH**

IDX Broker is the 800-lb gorilla of IDX but is WordPress/iframe-focused. Their API specifically does NOT return MLS listing data -- only your own brokerage's listings. This is a dealbreaker for building a custom search experience.

**Pros:**
- Largest IDX provider, approved vendor with Bright MLS
- Full compliance handling (disclaimers, logos automated)
- Good for WordPress sites

**Cons:**
- API does not return MLS listing data (only your own listings)
- Widget/iframe approach -- cannot build custom UI
- Terrible fit for Next.js custom sites
- Lock-in to their design/UX
- $60-99/mo for something that doesn't solve our problem

**Verdict:** Skip. IDX Broker is for agents who want plug-and-play on WordPress, not for custom-built premium sites.

#### Spark API (FBS) -- POSSIBLE BUT UNCERTAIN

**Confidence: LOW** (could not verify Bright MLS support)

**Pros:**
- Free developer signup, $50/mo per MLS
- RESO Data Dictionary compliant
- Revenue sharing model for app developers (70/30 split)
- Spark Datamart for automated licensing

**Cons:**
- Could not confirm Bright MLS availability
- Smaller ecosystem than SimplyRETS or Repliers
- Documentation seems focused on western US MLSs

**Verdict:** Worth investigating if SimplyRETS doesn't work out, but uncertain Bright MLS coverage.

#### Bridge Interactive (CoreLogic) -- FREE BUT LIMITATIONS

**Confidence: MEDIUM**

**Pros:**
- No service fees for qualifying developers
- RESO Platinum Certified API
- Part of CoreLogic (massive real estate data company)
- Includes some Zestimate-like data

**Cons:**
- 1,000 API calls/day limit (could be restrictive for a public site)
- Declining access to non-credentialed developers
- May require MLS number / broker credentials
- Now branded under Cotality -- corporate restructuring uncertainty

**Verdict:** The free pricing is appealing but the 1,000 calls/day limit is concerning for a public-facing site with search functionality. Good backup option.

#### Trestle (CoreLogic/Cotality) -- ENTERPRISE-GRADE

**Confidence: MEDIUM**

**Pros:**
- Robust RESO Web API implementation
- Good rate limits (7,200 queries/hour, 180/min)
- Sample feed available for testing
- Strong documentation

**Cons:**
- $85/mo platform fee + MLS license fees on top
- More expensive than SimplyRETS for a single-MLS use case
- Enterprise-oriented (may be overkill)
- Support email: trestlesupport@cotality.com (CoreLogic rebranding to Cotality)

**Verdict:** Solid but overpriced for a single-brokerage single-MLS integration. Better suited for multi-MLS enterprise apps.

#### MLS Grid -- DIRECT MLS ACCESS

**Confidence: LOW** (limited public documentation on pricing/process)

**Pros:**
- You only pay the MLS license fee (no platform markup)
- Unified licensing across participating MLSs
- RESO-compliant

**Cons:**
- Unclear if Bright MLS participates
- May require separate vendor application
- Less developer tooling than SimplyRETS/Repliers
- Some MLSs charge $1,000+ one-time development fee

**Verdict:** Could save money long-term if Bright MLS is on the platform, but more work to set up and less developer support.

#### Repliers -- PREMIUM DEVELOPER OPTION

**Confidence: HIGH** (verified pricing on official site)

**Pros:**
- Best developer experience of any provider
- Sub-300ms API latency, 99.9% uptime SLA
- Full compliance automation (handles disclaimers, permissions, audit tracking)
- AI-powered features (image search, property estimates) on higher tiers
- Webhooks for real-time updates
- No setup fees, no contracts
- Excellent documentation

**Cons:**
- $199-399/mo (4-8x the cost of SimplyRETS)
- Coverage is strong in Canada, expanding in US -- **must verify Bright MLS/Philadelphia coverage**
- A la carte add-ons ($149/mo each) add up fast

**Pricing tiers:**
| Plan | Monthly | Annual | Key Features |
|------|---------|--------|--------------|
| Preview | Free | Free | Sample data only, for testing |
| Standard | $199/mo | $182/mo | Property search, analytics, market insights |
| Professional | $299/mo | $275/mo | + User personalization, notifications, Slack support |
| Advanced | $399/mo | $365/mo | + AI image search, webhooks, dedicated account manager |

**Verdict:** If budget allows and they support Bright MLS, Repliers is the best developer experience. But at 4x the cost of SimplyRETS, the value proposition depends on how much you value compliance automation and premium support.

#### ListHub -- NOT APPLICABLE

**Confidence: HIGH**

ListHub is a listing **syndication** platform (pushing listings OUT to Zillow, Realtor.com, etc.), not an API for pulling listings INTO your website. Free for brokers but not relevant to this use case.

**Verdict:** Not applicable. ListHub is for distributing your listings to portals, not for building IDX search on your own site.

---

## 4. Compliance Requirements

### NAR IDX Policy (National)

**Confidence: HIGH** (verified via NAR Handbook on Multiple Listing Policy)

NAR Policy Statement 7.58 governs all IDX displays. Key requirements:

1. **Listing firm attribution:** Every listing displayed must identify the listing firm "in a reasonably prominent location and in a readily visible color and typeface not smaller than the median used in the display of listing data"

2. **Listing agent identification:** The listing broker's name (and the listing agent's name if the MLS requires it) must appear on every listing

3. **Last updated timestamp:** Every IDX display must include the date/time the data was last updated

4. **Disclaimers required:**
   - Data deemed reliable but not guaranteed accurate by the MLS
   - All information should be independently verified
   - Broker/agent providing IDX data is identified

5. **Co-branding rules:** If advertising appears on IDX pages, the participant's logo and contact info must be larger than any third party's

6. **Opt-out honored:** Some sellers may opt out of IDX display -- these listings must NOT appear on your site

7. **No scraping/crawling:** IDX data cannot be scraped, data-mined, or used for purposes beyond consumer property search

### Bright MLS-Specific Requirements

**Confidence: MEDIUM** (based on available Bright MLS rules documents)

Bright MLS has additional requirements beyond NAR policy:

1. **Bright IDX icon:** Search results with more than 7 data fields must display the listing company name AND may display the Bright-approved IDX icon

2. **Minimal displays (thumbnails, text < 200 chars):** Exempt from full disclaimers ONLY if linked to a full display that includes all required disclosures

3. **Data refresh:** IDX data must be refreshed at minimum every 12 hours (most providers do 15-minute intervals)

4. **Vendor approval:** Any vendor displaying IDX data must be an approved IDX vendor with Bright MLS. Check the [Bright MLS Approved IDX Vendors list](https://support.brightmls.com/s/article/Bright-MLS-Approved-IDX-Vendors)

5. **Copyright notice:** Bright MLS copyright notice must appear on all IDX displays

6. **No commingling without attribution:** If displaying both your own listings and IDX listings, each must be clearly attributed

### NAR 2025 Settlement Changes

Following the NAR settlement (effective August 2024), several changes affect IDX/MLS:

- Buyer broker compensation is no longer required to be displayed in MLS
- Offers of compensation to buyer brokers are no longer permitted in MLS fields
- Touring agreements now required before showing properties
- These changes primarily affect business practices, not website technical compliance

### What Happens If You Don't Comply

| Violation | Consequence |
|-----------|-------------|
| Missing disclaimers | MLS can revoke IDX access; fines possible |
| Missing listing firm attribution | MLS rules violation; broker complaint likely |
| Stale data (not refreshing) | MLS can terminate data feed |
| Using non-approved vendor | Data feed denied or terminated |
| Scraping/unauthorized use | Legal action from MLS; cease and desist |
| Displaying opted-out listings | Broker complaint; MLS enforcement |

### Implementation Checklist

For Tauro's website, every property listing page must include:

```
[ ] Listing firm name (prominent, readable)
[ ] Listing agent name
[ ] Bright MLS IDX icon or attribution
[ ] "Last updated: [timestamp]"
[ ] Disclaimer: "Listing data provided by Bright MLS. Information deemed reliable but not guaranteed."
[ ] Copyright: "Copyright [year] Bright MLS. All rights reserved."
[ ] "IDX information is provided exclusively for consumers' personal, non-commercial use"
[ ] LYL Realty Group branding larger than any third-party branding
```

**Sources:**
- [NAR IDX Policy (Policy Statement 7.58)](https://www.nar.realtor/handbook-on-multiple-listing-policy/advertising-print-and-electronic-section-1-internet-data-exchange-idx-policy-policy-statement-7-58)
- [Bright MLS Rules and Regulations](https://www.brightmls.com/rules-and-regulations)
- [Bright MLS Summer 2024 Policy Updates](https://www.brightmls.com/SummerPolicyUpdates)
- [NAR 2025 MLS Changes Summary](https://www.nar.realtor/about-nar/policies/summary-of-2025-mls-changes)

---

## 5. Technical Implementation Approaches

### Option A: Third-Party IDX Widget/Iframe

**Time to market:** 1-2 days
**Cost:** $60-99/mo (IDX Broker or similar)
**Customization:** Minimal

**How it works:**
- Sign up with IDX Broker or Showcase IDX
- Drop an iframe or JavaScript widget into your Next.js pages
- The widget handles search, display, compliance, everything
- You control almost nothing about the UX

**Architecture:**
```
User -> Next.js Page -> <iframe src="idxbroker.com/search/..."> -> IDX Broker servers -> Bright MLS
```

**Pros:**
- Fastest to launch
- Full compliance handled by provider
- No backend work needed

**Cons:**
- Looks terrible on a premium site (iframe breaks design consistency)
- No SEO value (iframe content not indexed as your site's content)
- Cannot customize search UX, filters, or property card design
- Mobile experience is whatever the provider gives you
- Completely at odds with Tauro's premium brand positioning

**Verdict for Tauro: REJECT.** This approach is antithetical to a premium luxury brokerage site. The iframe will visually break the cinematic Playfair Display / midnight-and-gold design language.

---

### Option B: IDX API Provider + Custom Frontend (RECOMMENDED)

**Time to market:** 2-4 weeks
**Cost:** $49-299/mo (SimplyRETS or Repliers) + development time
**Customization:** Full

**How it works:**
- Sign up with SimplyRETS (or Repliers)
- They connect to Bright MLS and normalize the data
- You call their REST API from your Next.js app
- You build completely custom search/listing UI
- You handle compliance disclaimers in your frontend

**Architecture:**
```
User -> Next.js (App Router)
         |
         +-> Server Components / Route Handlers
         |     |
         |     +-> SimplyRETS API (listings, agents, search)
         |     |     |
         |     |     +-> Bright MLS (data source)
         |     |
         |     +-> Supabase (saved searches, user favorites, lead capture)
         |
         +-> Client Components (map, filters, gallery)
```

**Detailed Architecture for Next.js 14+ with Supabase:**

```
/src
  /app
    /properties
      page.tsx              -- Server Component: property search page
      /[slug]
        page.tsx            -- Server Component: property detail page (ISR)
    /api
      /properties
        route.ts            -- API route: proxy to SimplyRETS with caching
        /search
          route.ts          -- API route: search with filters
      /webhooks
        /listing-updates
          route.ts          -- Webhook receiver for data updates
  /lib
    /mls
      client.ts             -- SimplyRETS API client wrapper
      types.ts              -- TypeScript types for MLS data
      transforms.ts         -- Transform MLS data to app models
      compliance.ts         -- Disclaimer/attribution components
    /supabase
      client.ts             -- Supabase client
      schema.sql            -- DB schema for favorites, saved searches
```

**Sync Strategy:**

For a site like Tauro, you have two sync approaches:

**A) On-demand API calls (simpler, recommended to start):**
- Search page calls SimplyRETS API on each request via Server Components
- Cache responses with Next.js `fetch` caching + `revalidate: 900` (15 min)
- Property detail pages use ISR with 15-minute revalidation
- No database sync needed for listing data
- Supabase only stores user data (favorites, saved searches, leads)

```typescript
// /src/lib/mls/client.ts
const SIMPLYRETS_BASE = 'https://api.simplyrets.com';

export async function searchListings(params: SearchParams) {
  const url = new URL(`${SIMPLYRETS_BASE}/properties`);
  // Add search params: city, minprice, maxprice, type, etc.
  Object.entries(params).forEach(([k, v]) => {
    if (v) url.searchParams.set(k, String(v));
  });

  const res = await fetch(url.toString(), {
    headers: {
      'Authorization': `Basic ${btoa(`${API_KEY}:${API_SECRET}`)}`,
    },
    next: { revalidate: 900 }, // Cache for 15 minutes
  });

  return res.json();
}
```

**B) Database replication (more complex, better for advanced features):**
- Cron job (Vercel Cron or external) pulls all listings every 15-30 minutes
- Store in Supabase `listings` table
- Enables full-text search, custom sorting, saved search notifications
- More control but significantly more development work

```sql
-- Supabase schema for replicated MLS data
CREATE TABLE listings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  mls_id TEXT UNIQUE NOT NULL,
  mls_status TEXT NOT NULL, -- Active, Pending, Sold
  address JSONB NOT NULL,
  price NUMERIC NOT NULL,
  bedrooms INT,
  bathrooms NUMERIC,
  sqft INT,
  lot_size NUMERIC,
  year_built INT,
  property_type TEXT,
  listing_agent JSONB,
  listing_office JSONB,
  photos TEXT[],
  description TEXT,
  features JSONB,
  geo_point GEOMETRY(POINT, 4326), -- PostGIS for geo queries
  raw_data JSONB, -- Full MLS record for compliance
  listed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  synced_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_listings_status ON listings(mls_status);
CREATE INDEX idx_listings_price ON listings(price);
CREATE INDEX idx_listings_geo ON listings USING GIST(geo_point);
CREATE INDEX idx_listings_type ON listings(property_type);

-- Saved searches for registered users
CREATE TABLE saved_searches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  name TEXT,
  filters JSONB NOT NULL,
  notify BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User favorites
CREATE TABLE favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  listing_id UUID REFERENCES listings(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, listing_id)
);
```

**Caching Strategy:**
- Property search results: 15 minutes (Next.js ISR or fetch cache)
- Property detail pages: 15 minutes ISR, on-demand revalidation via webhook
- Static pages (area pages, agent pages): Build-time with daily revalidation
- Map tile data: CDN-cached, long TTL
- Photos: Served via MLS CDN URLs (don't self-host MLS photos)

**Search/Filter UX:**
- Use URL search params for all filters (shareable, SEO-friendly)
- Server Components for initial render (SEO + performance)
- Client-side filtering for instant updates after initial load
- Mapbox GL JS integration for map-based search (already in Tauro's stack)
- Debounced search input for address/MLS number lookup

**Pros:**
- Full design control -- maintain Tauro's premium aesthetic
- SEO-friendly (Server Components render real HTML)
- Cost-effective ($49-199/mo vs custom RESO integration)
- Provider handles MLS connection, data normalization, uptime
- Can switch providers without rebuilding frontend

**Cons:**
- Still need to implement compliance disclaimers yourself
- Dependent on third-party API uptime
- Some providers have rate limits
- 15-minute data freshness (not real-time, but acceptable for listings)

---

### Option C: Direct RESO Web API Integration

**Time to market:** 4-8 weeks
**Cost:** Bright MLS fees ($7,500/year for vendor feed) + development time
**Customization:** Maximum

**How it works:**
- Apply directly to Bright MLS as an IDX vendor
- Get OAuth 2.0 credentials for their RESO Web API
- Build your own data ingestion pipeline
- Store all listing data in Supabase
- Handle all compliance, data refresh, error handling yourself

**Architecture:**
```
Bright MLS RESO API
    |
    +-> Data Sync Service (Vercel Cron / Edge Function)
    |     |
    |     +-> Supabase PostgreSQL (listings, agents, offices)
    |
    +-> Next.js App
          |
          +-> Server Components -> Supabase queries
          +-> Client Components -> Real-time Supabase subscriptions
```

**Pros:**
- No third-party middleman (one fewer dependency)
- Complete data control
- Can build advanced features (market analytics, CMA tools)
- Long-term cost savings if scaling to multiple brokerages

**Cons:**
- $7,500/year vendor feed fee from Bright MLS
- Must apply and be approved as an IDX vendor (weeks-to-months process)
- Must handle all RESO OData query complexity yourself
- Must build and maintain data sync pipeline
- Must handle all compliance requirements manually
- Must deal with MLS data quality issues (inconsistent data, missing fields)
- Significantly more development time and ongoing maintenance
- If anything breaks, you're on your own

**Verdict for Tauro: OVERKILL.** This is the approach for companies building a real estate platform (like Zillow or Redfin). For a single brokerage website, the cost and complexity are not justified.

---

## 6. Recommended Path

### Recommendation: Option B with SimplyRETS

**For Tauro (LYL Realty Group), use SimplyRETS with on-demand API calls and Next.js Server Components.**

Here's why:

**Why SimplyRETS over alternatives:**

| Factor | SimplyRETS | Repliers | Direct RESO |
|--------|-----------|----------|-------------|
| Monthly cost | $49 | $199-399 | ~$625 ($7,500/yr) |
| Setup cost | $99 one-time | $0 | Weeks of dev time |
| Time to first listing | Days | Days | Weeks |
| Bright MLS support | Yes (RESO Web API) | Verify | Yes (direct) |
| Developer experience | Good | Excellent | DIY |
| Compliance handling | Manual (you add disclaimers) | Automated | Manual |
| Next.js fit | Excellent (REST API) | Excellent (REST API) | Good (OData/REST) |
| Ongoing maintenance | Minimal | Minimal | Significant |

**Why Option B over A or C:**
- Option A (iframe) destroys Tauro's premium design -- non-starter
- Option C (direct RESO) costs $7,500/year and takes 4-8 weeks to build -- unnecessary for a single brokerage
- Option B gives full design control at $49/mo with 2-4 weeks to implement

**Architecture for Tauro specifically:**

```
Phase 1 (Ship in 2-3 weeks):
  - SimplyRETS API for property search and detail pages
  - On-demand API calls via Next.js Server Components
  - 15-minute cache via Next.js revalidation
  - Custom property cards matching Tauro design system
  - Mapbox integration for map search
  - Compliance disclaimers as a reusable React component
  - GoHighLevel integration for "Schedule Showing" CTA

Phase 2 (If needed later):
  - Supabase replication for saved searches and notifications
  - User accounts for favorites
  - Market analytics pages
  - Sold/historical data
```

**Fallback:** If SimplyRETS doesn't support Bright MLS well or has issues, Repliers at $199/mo is the premium alternative with better compliance automation.

**Budget consideration:** If SimplyRETS at $49/mo is a hard cost to justify to Tony, consider that it replaces potentially $7,500/year in direct MLS vendor fees plus significant engineering time. $49/mo ($588/year) is a 92% cost reduction vs going direct.

---

## 7. Steps to Get Started

### Immediate (Before/During Tomorrow's Meeting)

1. **Confirm Tony has active Bright MLS membership.** As a Philadelphia broker, he almost certainly does. Get his:
   - Bright MLS subscriber ID
   - NRDS ID (NAR member number)
   - Brokerage office code in Bright MLS

2. **Ask Tony about IDX authorization.** He needs to authorize the website to display IDX data. This is typically done through:
   - Bright MLS subscriber portal -> IDX settings
   - Or contacting his local association's MLS administrator

### Week 1: Provider Setup

3. **Sign up for SimplyRETS** at https://simplyrets.com
   - Create developer account
   - Request Bright MLS RESO Web API connection ($99 one-time)
   - Provide Tony's Bright MLS credentials when requested
   - SimplyRETS handles the MLS handshake and data normalization

4. **While waiting for feed approval,** use SimplyRETS demo data to build:
   - Property search page with filters
   - Property detail page template
   - Compliance disclaimer component
   - API client wrapper in TypeScript

### Week 2-3: Build

5. **Build the listing pages** using the architecture in Option B above:
   - Search page with Server Components
   - Property detail pages with ISR
   - Map integration with Mapbox
   - Filter UI (price, beds, baths, property type, neighborhood)
   - Mobile-responsive property cards
   - "Schedule Showing" -> GoHighLevel form

6. **Implement compliance:**
   - Add Bright MLS disclaimer component to all listing pages
   - Add listing firm attribution
   - Add "Last updated" timestamp
   - Add copyright notice
   - Test against compliance checklist (Section 4 above)

### Week 3-4: Launch

7. **QA and launch:**
   - Verify data freshness (listings appearing within 15-30 min of MLS entry)
   - Verify all compliance elements render correctly
   - Test search functionality across Philadelphia neighborhoods
   - Mobile testing
   - Deploy to production

### Ongoing

8. **Monthly:** Verify data feed is active, check for MLS rule changes
9. **Quarterly:** Review SimplyRETS plan, assess if Supabase replication is needed
10. **If scaling:** Consider Repliers for multi-MLS or advanced features

### Questions to Ask Tony Tomorrow

- [ ] "Are you currently a Bright MLS subscriber?" (Almost certainly yes)
- [ ] "Do you have your Bright MLS login / subscriber ID?"
- [ ] "Have you authorized IDX display for any previous website?"
- [ ] "Are there specific Philadelphia neighborhoods/zip codes you want to focus on?"
- [ ] "Do you want to show all Bright MLS listings or only LYL's listings?"
- [ ] "Budget: are you comfortable with ~$50/mo for MLS data integration?"
- [ ] "Do any of your agents have specific listings they want featured?"
- [ ] "Are you familiar with the NAR settlement changes and how they affect your listings?"

---

## Appendix: Glossary

| Term | Definition |
|------|-----------|
| **MLS** | Multiple Listing Service -- the shared database of property listings |
| **IDX** | Internet Data Exchange -- the policy allowing display of MLS data on websites |
| **RETS** | Real Estate Transaction Standard -- deprecated XML protocol for MLS data |
| **RESO** | Real Estate Standards Organization -- governing body for data standards |
| **RESO Web API** | Modern REST API standard replacing RETS |
| **OData** | Open Data Protocol -- the query standard used by RESO Web API |
| **VOW** | Virtual Office Website -- broader data access than IDX (includes sold data) |
| **NAR** | National Association of REALTORS |
| **NRDS** | National REALTOR Database System -- unique ID for each REALTOR |
| **ISR** | Incremental Static Regeneration -- Next.js feature for on-demand page updates |

---

## Sources

### Official / HIGH Confidence
- [Bright MLS Developer Portal](https://developer.brightmls.com/)
- [Bright MLS RESO Web API Overview](https://developer.brightmls.com/brightreso/default/overview)
- [RESO Web API Standard](https://www.reso.org/reso-web-api/)
- [NAR IDX Policy (7.58)](https://www.nar.realtor/handbook-on-multiple-listing-policy/advertising-print-and-electronic-section-1-internet-data-exchange-idx-policy-policy-statement-7-58)
- [NAR 2025 MLS Changes](https://www.nar.realtor/about-nar/policies/summary-of-2025-mls-changes)
- [Bright MLS Rules](https://www.brightmls.com/rules-and-regulations)
- [SimplyRETS Developer API](https://simplyrets.com/idx-developer-api)
- [SimplyRETS Documentation](https://docs.simplyrets.com/)
- [Repliers Plans & Pricing](https://repliers.com/plans-and-pricing/)
- [Trestle Documentation](https://trestle-documentation.corelogic.com/)
- [Bridge Interactive Developers](https://www.bridgeinteractive.com/developers/)
- [Spark API (FBS)](https://sparkplatform.com/docs/overview/api)

### Verified / MEDIUM Confidence
- [RETS vs RESO Web API 2026](https://oyelabs.com/rets-vs-reso-web-api-for-real-estate-platforms-in-2026/)
- [Bright MLS IDX Billing Details](https://pgcar.com/realtor_resources/docs/Bright-MLS-IDX-Billing-Details.pdf)
- [IDX Broker Developer Pricing](https://developers.idxbroker.com/partnership/prices/)
- [Bright MLS Approved IDX Vendors](https://support.brightmls.com/s/article/Bright-MLS-Approved-IDX-Vendors)

### WebSearch Only / LOW Confidence (verify before acting)
- Specific Bright MLS fee amounts ($7,500/yr, $10/mo agent) -- sourced from 2018 pricing document, may have changed
- Spark API availability for Bright MLS -- could not verify
- MLS Grid participation of Bright MLS -- could not verify
- Repliers coverage of Philadelphia/Bright MLS market -- needs direct verification
