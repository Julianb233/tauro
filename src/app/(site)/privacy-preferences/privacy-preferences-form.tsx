"use client";

import { useEffect, useState } from "react";
import {
  getCookieConsent,
  setCookieConsent,
  rejectNonEssential,
  type CookiePreferences,
} from "@/lib/cookie-consent";

export function PrivacyPreferencesForm() {
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const prefs = getCookieConsent();
    if (prefs) {
      setAnalytics(prefs.analytics);
      setMarketing(prefs.marketing);
    }
  }, []);

  function handleSave() {
    const prefs: CookiePreferences = {
      essential: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
    };
    setCookieConsent(prefs);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleOptOutAll() {
    rejectNonEssential();
    setAnalytics(false);
    setMarketing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="space-y-4">
      {/* Essential */}
      <label className="flex items-center justify-between rounded-lg border border-white/10 p-4">
        <div>
          <p className="text-sm font-semibold text-white">Essential Cookies</p>
          <p className="mt-0.5 text-xs text-white/50">
            Required for the website to function. Cannot be disabled.
          </p>
        </div>
        <input
          type="checkbox"
          checked
          disabled
          className="h-5 w-5 accent-gold"
        />
      </label>

      {/* Analytics */}
      <label className="flex cursor-pointer items-center justify-between rounded-lg border border-white/10 p-4 transition-colors hover:border-white/20">
        <div>
          <p className="text-sm font-semibold text-white">
            Analytics &amp; Performance
          </p>
          <p className="mt-0.5 text-xs text-white/50">
            Google Analytics, performance monitoring. Helps us understand how
            visitors use our site.
          </p>
        </div>
        <input
          type="checkbox"
          checked={analytics}
          onChange={(e) => setAnalytics(e.target.checked)}
          className="h-5 w-5 accent-gold"
        />
      </label>

      {/* Marketing */}
      <label className="flex cursor-pointer items-center justify-between rounded-lg border border-white/10 p-4 transition-colors hover:border-white/20">
        <div>
          <p className="text-sm font-semibold text-white">
            Marketing &amp; Advertising
          </p>
          <p className="mt-0.5 text-xs text-white/50">
            Used for personalized ads, retargeting, and third-party marketing
            tools. Opting out constitutes a &quot;Do Not Sell or Share My
            Personal Information&quot; request under CCPA.
          </p>
        </div>
        <input
          type="checkbox"
          checked={marketing}
          onChange={(e) => setMarketing(e.target.checked)}
          className="h-5 w-5 accent-gold"
        />
      </label>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row">
        <button
          onClick={handleSave}
          className="inline-flex items-center justify-center rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
        >
          Save Preferences
        </button>
        <button
          onClick={handleOptOutAll}
          className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2"
        >
          Opt Out of All Non-Essential
        </button>
      </div>

      {saved && (
        <p className="text-sm font-medium text-gold">
          Your preferences have been saved.
        </p>
      )}
    </div>
  );
}
