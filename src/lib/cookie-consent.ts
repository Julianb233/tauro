/**
 * Cookie consent utilities.
 * Stores user preference in localStorage under "tauro-cookie-consent".
 */

export const COOKIE_CONSENT_KEY = "tauro-cookie-consent";

export type CookiePreferences = {
  essential: true; // always true
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
};

export function getCookieConsent(): CookiePreferences | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CookiePreferences;
  } catch {
    return null;
  }
}

export function setCookieConsent(prefs: CookiePreferences): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(prefs));
  // Dispatch a custom event so other components can react
  window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: prefs }));
}

export function hasAnalyticsConsent(): boolean {
  const prefs = getCookieConsent();
  return prefs?.analytics ?? false;
}

export function acceptAll(): CookiePreferences {
  const prefs: CookiePreferences = {
    essential: true,
    analytics: true,
    marketing: true,
    timestamp: new Date().toISOString(),
  };
  setCookieConsent(prefs);
  return prefs;
}

export function rejectNonEssential(): CookiePreferences {
  const prefs: CookiePreferences = {
    essential: true,
    analytics: false,
    marketing: false,
    timestamp: new Date().toISOString(),
  };
  setCookieConsent(prefs);
  return prefs;
}
