"use client";

import { useState, useRef, useEffect } from "react";
import { Share2, Link2, Mail, MessageSquare, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareButtonProps {
  url: string;
  title: string;
  description: string;
}

export default function ShareButton({ url, title, description }: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on escape
  useEffect(() => {
    if (!open) return;
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: description, url });
        setOpen(false);
      } catch {
        // User cancelled or share failed silently
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const emailSubject = encodeURIComponent(title);
  const emailBody = encodeURIComponent(`Check out this property:\n\n${title}\n${url}`);
  const smsBody = encodeURIComponent(`Check out this property: ${title} ${url}`);

  const hasNativeShare = typeof navigator !== "undefined" && !!navigator.share;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => {
          // On mobile with native share, go directly to native share
          if (hasNativeShare && window.innerWidth < 768) {
            handleNativeShare();
            return;
          }
          setOpen(!open);
        }}
        className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:border-gold/40 hover:text-gold"
        aria-label="Share this property"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Share2 className="h-4 w-4" aria-hidden="true" />
        Share
      </button>

      {/* Dropdown */}
      {open && (
        <div role="menu" aria-label="Share options" className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-border/60 bg-white/95 shadow-lg backdrop-blur-xl">
          <div className="p-1.5">
            {/* Copy link */}
            <button
              type="button"
              role="menuitem"
              onClick={handleCopyLink}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-gold/10 hover:text-gold"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-500" aria-hidden="true" />
              ) : (
                <Link2 className="h-4 w-4" aria-hidden="true" />
              )}
              {copied ? "Copied!" : "Copy Link"}
            </button>

            {/* Email */}
            <a
              href={`mailto:?subject=${emailSubject}&body=${emailBody}`}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-gold/10 hover:text-gold"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Share via Email
            </a>

            {/* SMS */}
            <a
              href={`sms:?body=${smsBody}`}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-gold/10 hover:text-gold"
            >
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              Share via SMS
            </a>

            {/* Native share (shown on larger screens too if available) */}
            {hasNativeShare && (
              <button
                type="button"
                role="menuitem"
                onClick={handleNativeShare}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-gold/10 hover:text-gold"
              >
                <Share2 className="h-4 w-4" aria-hidden="true" />
                More Options...
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
