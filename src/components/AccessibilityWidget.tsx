"use client";

import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "tauro-a11y-prefs";

interface A11yPrefs {
  fontSize: number; // 0 = default, 1 = large, 2 = x-large
  highContrast: boolean;
  reduceMotion: boolean;
}

const defaultPrefs: A11yPrefs = {
  fontSize: 0,
  highContrast: false,
  reduceMotion: false,
};

const FONT_SIZE_LABELS = ["Default", "Large", "Extra Large"];
const FONT_SIZE_CLASSES = ["", "a11y-font-lg", "a11y-font-xl"];

function loadPrefs(): A11yPrefs {
  if (typeof window === "undefined") return defaultPrefs;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPrefs;
    return { ...defaultPrefs, ...JSON.parse(raw) };
  } catch {
    return defaultPrefs;
  }
}

function savePrefs(prefs: A11yPrefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // silent fail
  }
}

function applyPrefs(prefs: A11yPrefs) {
  const html = document.documentElement;

  // Font size
  FONT_SIZE_CLASSES.forEach((cls) => {
    if (cls) html.classList.remove(cls);
  });
  const fontClass = FONT_SIZE_CLASSES[prefs.fontSize];
  if (fontClass) html.classList.add(fontClass);

  // High contrast
  html.classList.toggle("a11y-high-contrast", prefs.highContrast);

  // Reduce motion
  html.classList.toggle("a11y-reduce-motion", prefs.reduceMotion);
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<A11yPrefs>(defaultPrefs);
  const [mounted, setMounted] = useState(false);

  // Load and apply prefs on mount
  useEffect(() => {
    const stored = loadPrefs();
    setPrefs(stored);
    applyPrefs(stored);
    setMounted(true);
  }, []);

  const updatePrefs = useCallback((next: A11yPrefs) => {
    setPrefs(next);
    savePrefs(next);
    applyPrefs(next);
  }, []);

  const increaseFontSize = () => {
    if (prefs.fontSize < 2) {
      updatePrefs({ ...prefs, fontSize: prefs.fontSize + 1 });
    }
  };

  const decreaseFontSize = () => {
    if (prefs.fontSize > 0) {
      updatePrefs({ ...prefs, fontSize: prefs.fontSize - 1 });
    }
  };

  const toggleHighContrast = () => {
    updatePrefs({ ...prefs, highContrast: !prefs.highContrast });
  };

  const toggleReduceMotion = () => {
    updatePrefs({ ...prefs, reduceMotion: !prefs.reduceMotion });
  };

  const resetAll = () => {
    updatePrefs(defaultPrefs);
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[9998] no-print">
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close accessibility settings" : "Open accessibility settings"}
        aria-expanded={open}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-midnight text-off-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
      >
        {/* Accessibility icon (universal access) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <circle cx="12" cy="4.5" r="1.5" fill="currentColor" stroke="none" />
          <path d="M12 7.5v5m0 0l-3 5m3-5l3 5" />
          <path d="M7 10h10" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      </button>

      {/* Settings panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Accessibility settings"
          className="absolute bottom-16 left-0 w-72 rounded-xl border border-border bg-background p-5 shadow-2xl animate-scale-in"
        >
          <h2 className="mb-4 text-base font-semibold font-label tracking-wide text-foreground">
            Accessibility
          </h2>

          {/* Font size */}
          <div className="mb-4">
            <span className="mb-2 block text-sm text-muted-foreground">
              Font Size: {FONT_SIZE_LABELS[prefs.fontSize]}
            </span>
            <div className="flex gap-2">
              <button
                onClick={decreaseFontSize}
                disabled={prefs.fontSize === 0}
                aria-label="Decrease font size"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed"
              >
                A<span className="text-xs align-super">-</span>
              </button>
              <button
                onClick={increaseFontSize}
                disabled={prefs.fontSize === 2}
                aria-label="Increase font size"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-lg font-bold text-foreground transition-colors hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed"
              >
                A<span className="text-xs align-super">+</span>
              </button>
            </div>
          </div>

          {/* High contrast toggle */}
          <label className="mb-3 flex cursor-pointer items-center justify-between">
            <span className="text-sm text-foreground">High Contrast</span>
            <button
              role="switch"
              aria-checked={prefs.highContrast}
              onClick={toggleHighContrast}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                prefs.highContrast ? "bg-gold" : "bg-border"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  prefs.highContrast ? "translate-x-5" : ""
                }`}
              />
            </button>
          </label>

          {/* Reduce motion toggle */}
          <label className="mb-4 flex cursor-pointer items-center justify-between">
            <span className="text-sm text-foreground">Reduce Motion</span>
            <button
              role="switch"
              aria-checked={prefs.reduceMotion}
              onClick={toggleReduceMotion}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                prefs.reduceMotion ? "bg-gold" : "bg-border"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  prefs.reduceMotion ? "translate-x-5" : ""
                }`}
              />
            </button>
          </label>

          {/* Reset */}
          <button
            onClick={resetAll}
            className="w-full rounded-lg border border-border py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            Reset to Defaults
          </button>
        </div>
      )}
    </div>
  );
}
