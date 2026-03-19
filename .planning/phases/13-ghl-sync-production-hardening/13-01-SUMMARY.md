# 13-01 Summary: GoHighLevel Two-Way Sync

## What was built

1. **`src/lib/ghl.ts`** - GHL client module with:
   - `mapLeadToGhlContact()` - Maps lead data to GHL contact format with enhanced tag mapping
   - `createGhlContact()` - Creates contacts via GHL API v2 (if API key set) with webhook fallback
   - `verifyGhlSignature()` - HMAC-SHA256 signature verification for inbound webhooks
   - `GHL_TAG_MAP` and `GHL_FIELD_MAP` - Exported mapping constants
   - `GHL_STATUS_MAP` - Maps GHL statuses to Tauro lead statuses

2. **`src/app/api/webhooks/ghl/route.ts`** - Inbound webhook handler:
   - Reads raw body for signature verification
   - Supports both `x-ghl-signature` and `x-webhook-signature` headers
   - Processes `ContactStatusChanged` events to update lead status in Supabase
   - Graceful degradation when `GHL_WEBHOOK_SECRET` is not set (dev mode)

3. **`src/app/api/leads/route.ts`** - Refactored to use `createGhlContact` from `@/lib/ghl`:
   - Removed inline `buildGhlContact` function
   - Uses the module's dual-strategy approach (API v2 + webhook fallback)
   - Updates `ghl_synced` flag on success

## Env vars required

- `GHL_WEBHOOK_URL` - Outbound webhook URL (existing)
- `GHL_API_KEY` - GHL API v2 key (optional, enables API-based sync)
- `GHL_LOCATION_ID` - GHL location/sub-account ID (required if using API key)
- `GHL_WEBHOOK_SECRET` - HMAC secret for verifying inbound GHL webhooks

## Verification

- TypeScript type checking passes (`npx tsc --noEmit`)
- Build compilation succeeds
- No inline GHL logic remains in leads route
