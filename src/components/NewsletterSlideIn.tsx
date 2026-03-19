"use client";

import { useState, useEffect } from "react";
import { X, Mail } from "lucide-react";
import { NewsletterForm } from "@/components/NewsletterForm";

const STORAGE_KEY = "tauro-newsletter-dismissed";
const DELAY_MS = 30_000; // 30 seconds

export function NewsletterSlideIn() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    // Check if already dismissed this session
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // sessionStorage unavailable (SSR, incognito edge cases)
      return;
    }

    setDismissed(false);

    const timer = setTimeout(() => {
      setVisible(true);
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  function handleDismiss() {
    setVisible(false);
    setDismissed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  }

  if (dismissed && !visible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 w-full max-w-sm transform transition-all duration-500 ease-out sm:bottom-6 sm:right-6 ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-8 opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-label="Newsletter signup"
    >
      <div className="relative overflow-hidden rounded-xl border border-gold/30 bg-midnight shadow-2xl shadow-gold/10">
        {/* Gold accent bar */}
        <div className="h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />

        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute right-3 top-4 rounded-md p-1 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close newsletter popup"
        >
          <X className="size-4" />
        </button>

        <div className="p-5 pt-4">
          {/* Icon */}
          <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-gold/10">
            <Mail className="size-5 text-gold" />
          </div>

          {/* Heading */}
          <h3 className="mb-1 font-heading text-lg font-semibold text-off-white">
            Stay in the know about Philadelphia real estate
          </h3>
          <p className="mb-4 text-sm text-white/60">
            New listings, market trends, and neighborhood guides delivered monthly.
          </p>

          {/* Form */}
          <NewsletterForm
            source="slide-in"
            showName
            showInterests
            compact
          />
        </div>
      </div>
    </div>
  );
}
