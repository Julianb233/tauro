"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getCookieConsent,
  acceptAll,
  rejectNonEssential,
  setCookieConsent,
  type CookiePreferences,
} from "@/lib/cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    const existing = getCookieConsent();
    if (!existing) {
      // Small delay so it doesn't flash on page load
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible) return null;

  function handleAcceptAll() {
    acceptAll();
    setVisible(false);
  }

  function handleReject() {
    rejectNonEssential();
    setVisible(false);
  }

  function handleSavePreferences() {
    const prefs: CookiePreferences = {
      essential: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
    };
    setCookieConsent(prefs);
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[9998] p-4 sm:p-6"
    >
      <div className="mx-auto max-w-4xl rounded-2xl border border-white/10 bg-midnight/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        {!showPrefs ? (
          <>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
              <div className="flex-1">
                <h2 className="font-heading text-lg font-bold text-white">
                  We value your privacy
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  We use cookies to enhance your browsing experience, analyze
                  site traffic, and personalize content. You can choose to accept
                  all cookies, reject non-essential ones, or manage your
                  preferences.{" "}
                  <Link
                    href="/cookie-policy"
                    className="text-gold underline underline-offset-2 hover:text-gold-light"
                  >
                    Cookie Policy
                  </Link>
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={handleAcceptAll}
                className="inline-flex items-center justify-center rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-midnight"
              >
                Accept All
              </button>
              <button
                onClick={handleReject}
                className="inline-flex items-center justify-center rounded-lg border border-white/20 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-midnight"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={() => setShowPrefs(true)}
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white/60 underline underline-offset-2 transition-colors hover:text-white focus-visible:outline-none"
              >
                Manage Preferences
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="font-heading text-lg font-bold text-white">
              Cookie Preferences
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Choose which cookies you allow. Essential cookies cannot be
              disabled as they are required for the site to function.
            </p>

            <div className="mt-5 space-y-4">
              {/* Essential - always on */}
              <label className="flex items-center justify-between rounded-lg border border-white/10 p-4">
                <div>
                  <p className="text-sm font-semibold text-white">
                    Essential Cookies
                  </p>
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
                    Analytics Cookies
                  </p>
                  <p className="mt-0.5 text-xs text-white/50">
                    Help us understand how visitors use our site (Google
                    Analytics).
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
                    Marketing Cookies
                  </p>
                  <p className="mt-0.5 text-xs text-white/50">
                    Used for personalized ads and retargeting across platforms.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="h-5 w-5 accent-gold"
                />
              </label>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={handleSavePreferences}
                className="inline-flex items-center justify-center rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-midnight"
              >
                Save Preferences
              </button>
              <button
                onClick={() => setShowPrefs(false)}
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white/60 underline underline-offset-2 transition-colors hover:text-white focus-visible:outline-none"
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
