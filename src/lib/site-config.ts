/**
 * Centralized site configuration.
 * Uses NEXT_PUBLIC_SITE_URL env var for the production domain,
 * falling back to the default domain if not set.
 */

const DEFAULT_SITE_URL = "https://taurorealty.com";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") ||
  DEFAULT_SITE_URL;
