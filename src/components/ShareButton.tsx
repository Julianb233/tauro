"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Share2,
  Link2,
  Mail,
  MessageSquare,
  Check,
  Facebook,
  Twitter,
  Linkedin,
  X,
  Send,
  UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Analytics                                                           */
/* ------------------------------------------------------------------ */

function trackShare(method: string, propertyTitle: string) {
  if (typeof window !== "undefined" && "gtag" in window) {
    const g = (window as unknown as Record<string, unknown>)["gtag"];
    if (typeof g === "function") {
      (g as (...args: unknown[]) => void)(
        "event",
        "share",
        { method, content_type: "property", item_id: propertyTitle },
      );
    }
  }
}

/* ------------------------------------------------------------------ */
/*  Social URL builders                                                 */
/* ------------------------------------------------------------------ */

function socialUrls(url: string, title: string, image?: string) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    twitter: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    whatsapp: `https://api.whatsapp.com/send?text=${t}%20${u}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${u}&description=${t}${image ? `&media=${encodeURIComponent(image)}` : ""}`,
    email: `mailto:?subject=${t}&body=${encodeURIComponent(`Check out this property:\n\n${title}\n${url}`)}`,
    sms: `sms:?body=${encodeURIComponent(`Check out this property: ${title} ${url}`)}`,
  };
}

/* ------------------------------------------------------------------ */
/*  Inline SVG icons for WhatsApp & Pinterest (not in lucide)           */
/* ------------------------------------------------------------------ */

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function PinterestIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Email to a Friend modal                                             */
/* ------------------------------------------------------------------ */

function EmailToFriendModal({
  url,
  title,
  image,
  onClose,
}: {
  url: string;
  title: string;
  image?: string;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    senderName: "",
    recipientEmail: "",
    recipientName: "",
    personalMessage: "",
  });
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");

    try {
      const res = await fetch("/api/share-property", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderName: form.senderName,
          recipientEmail: form.recipientEmail,
          recipientName: form.recipientName || undefined,
          personalMessage: form.personalMessage || undefined,
          propertyTitle: title,
          propertyUrl: url,
          propertyImage: image || undefined,
        }),
      });

      if (res.ok) {
        trackShare("email_to_friend", title);
        setState("sent");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Email property to a friend"
        className="relative mx-4 w-full max-w-md rounded-2xl border border-gold/30 bg-card p-6 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {state === "sent" ? (
          <div className="py-4 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600/20">
              <Check className="h-7 w-7 text-emerald-400" />
            </div>
            <h3 className="font-heading text-xl font-bold text-foreground">Email sent!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Your friend will receive the property details shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-5 rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/20">
                <UserPlus className="h-5 w-5 text-gold" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground">Email to a Friend</h3>
                <p className="text-xs text-muted-foreground">{title}</p>
              </div>
            </div>

            <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="share-sender" className="mb-1 block text-xs font-medium text-muted-foreground">
                  Your Name <span className="text-gold">*</span>
                </label>
                <input
                  ref={inputRef}
                  id="share-sender"
                  type="text"
                  required
                  disabled={state === "sending"}
                  value={form.senderName}
                  onChange={(e) => setForm({ ...form, senderName: e.target.value })}
                  placeholder="Jane Smith"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="share-email" className="mb-1 block text-xs font-medium text-muted-foreground">
                  Friend&apos;s Email <span className="text-gold">*</span>
                </label>
                <input
                  id="share-email"
                  type="email"
                  required
                  disabled={state === "sending"}
                  value={form.recipientEmail}
                  onChange={(e) => setForm({ ...form, recipientEmail: e.target.value })}
                  placeholder="friend@example.com"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="share-name" className="mb-1 block text-xs font-medium text-muted-foreground">
                  Friend&apos;s Name <span className="text-xs text-muted-foreground">(optional)</span>
                </label>
                <input
                  id="share-name"
                  type="text"
                  disabled={state === "sending"}
                  value={form.recipientName}
                  onChange={(e) => setForm({ ...form, recipientName: e.target.value })}
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold disabled:opacity-50"
                />
              </div>
              <div>
                <label htmlFor="share-message" className="mb-1 block text-xs font-medium text-muted-foreground">
                  Personal Message <span className="text-xs text-muted-foreground">(optional)</span>
                </label>
                <textarea
                  id="share-message"
                  rows={3}
                  disabled={state === "sending"}
                  value={form.personalMessage}
                  onChange={(e) => setForm({ ...form, personalMessage: e.target.value })}
                  placeholder="Check out this amazing property!"
                  maxLength={500}
                  className="w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold disabled:opacity-50"
                />
              </div>
              <button
                type="submit"
                disabled={state === "sending"}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold py-3 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                {state === "sending" ? "Sending..." : "Send Email"}
              </button>
              {state === "error" && (
                <p role="alert" className="text-center text-sm text-red-400">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  ShareButton                                                         */
/* ------------------------------------------------------------------ */

interface ShareButtonProps {
  url: string;
  title: string;
  description?: string;
  image?: string;
  compact?: boolean;
  className?: string;
}

export default function ShareButton({
  url,
  title,
  description,
  image,
  compact = false,
  className,
}: ShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const urls = socialUrls(url, title, image);

  const handleNativeShare = useCallback(async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: description ?? title, url });
        trackShare("native", title);
      } catch {
        /* user cancelled */
      }
    }
    setOpen(false);
  }, [title, description, url]);

  const handleCopyLink = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        const input = document.createElement("input");
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      setCopied(true);
      trackShare("copy_link", title);
      setTimeout(() => setCopied(false), 2000);
    },
    [url, title],
  );

  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (
        typeof navigator !== "undefined" &&
        typeof navigator.share === "function" &&
        "ontouchstart" in window
      ) {
        handleNativeShare();
        return;
      }
      setOpen((prev) => !prev);
    },
    [handleNativeShare],
  );

  const openPopup =
    (href: string, method: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      trackShare(method, title);
      if (method === "email" || method === "sms") {
        window.location.href = href;
      } else {
        window.open(href, "_blank", "noopener,noreferrer,width=600,height=500");
      }
      setOpen(false);
    };

  const hasNativeShare =
    typeof navigator !== "undefined" && !!navigator.share;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          compact
            ? "flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-gold hover:text-near-black"
            : "no-print flex items-center gap-1.5 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-gold hover:text-gold",
          className,
        )}
        aria-label="Share this property"
        aria-expanded={open}
        aria-haspopup="true"
        title="Share"
      >
        <Share2 className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
        {!compact && <span className="hidden sm:inline">Share</span>}
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Share options"
          className={cn(
            "absolute z-50 w-56 overflow-hidden rounded-xl border border-border/60 bg-white/95 shadow-lg backdrop-blur-xl",
            compact ? "right-0 bottom-full mb-2" : "right-0 top-full mt-2",
          )}
        >
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

            <div className="mx-3 my-1 border-t border-border/40" />

            {/* Email to a Friend */}
            <button
              type="button"
              role="menuitem"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setOpen(false);
                setShowEmailModal(true);
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-gold/10 hover:text-gold"
            >
              <UserPlus className="h-4 w-4" aria-hidden="true" />
              Email to a Friend
            </button>

            {/* Email (self) */}
            <button
              type="button"
              role="menuitem"
              onClick={openPopup(urls.email, "email")}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-gold/10 hover:text-gold"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email
            </button>

            {/* SMS */}
            <button
              type="button"
              role="menuitem"
              onClick={openPopup(urls.sms, "sms")}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-gold/10 hover:text-gold"
            >
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
              Text / SMS
            </button>

            <div className="mx-3 my-1 border-t border-border/40" />

            {/* Facebook */}
            <button
              type="button"
              role="menuitem"
              onClick={openPopup(urls.facebook, "facebook")}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-gold/10 hover:text-gold"
            >
              <Facebook className="h-4 w-4" />
              Facebook
            </button>

            {/* Twitter / X */}
            <button
              type="button"
              role="menuitem"
              onClick={openPopup(urls.twitter, "twitter")}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-gold/10 hover:text-gold"
            >
              <Twitter className="h-4 w-4" />
              X (Twitter)
            </button>

            {/* LinkedIn */}
            <button
              type="button"
              role="menuitem"
              onClick={openPopup(urls.linkedin, "linkedin")}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-gold/10 hover:text-gold"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </button>

            {/* WhatsApp */}
            <button
              type="button"
              role="menuitem"
              onClick={openPopup(urls.whatsapp, "whatsapp")}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-gold/10 hover:text-gold"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </button>

            {/* Pinterest */}
            <button
              type="button"
              role="menuitem"
              onClick={openPopup(urls.pinterest, "pinterest")}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-gold/10 hover:text-gold"
            >
              <PinterestIcon className="h-4 w-4" />
              Pinterest
            </button>

            {/* Native share */}
            {hasNativeShare && (
              <>
                <div className="mx-3 my-1 border-t border-border/40" />
                <button
                  type="button"
                  role="menuitem"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleNativeShare();
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-gold/10 hover:text-gold"
                >
                  <Share2 className="h-4 w-4" />
                  More Options...
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {showEmailModal && (
        <EmailToFriendModal
          url={url}
          title={title}
          image={image}
          onClose={() => setShowEmailModal(false)}
        />
      )}
    </div>
  );
}
