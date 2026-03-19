"use client";

import { useEffect, useState, useCallback } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Reading-progress bar (thin gold line at the very top of the viewport)
 * and a floating back-to-top button that appears after scrolling down.
 *
 * Designed for blog post pages.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (docHeight <= 0) {
      setProgress(0);
      setShowBackToTop(false);
      return;
    }

    const pct = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
    setProgress(pct);
    setShowBackToTop(scrollTop > 600);
  }, []);

  useEffect(() => {
    // Initial calculation
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Reading-progress bar ──────────────────────────────── */}
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[9999] h-[3px] bg-transparent"
      >
        <div
          className="h-full bg-gold transition-[width] duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ── Back-to-top button ────────────────────────────────── */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed right-6 bottom-8 z-50 flex size-11 items-center justify-center rounded-full bg-gold text-near-black shadow-lg transition-all duration-300 hover:bg-gold-light hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
          showBackToTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp className="size-5" />
      </button>
    </>
  );
}
