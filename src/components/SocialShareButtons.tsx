"use client";

import { Facebook, Twitter, Linkedin, Link2, Check } from "lucide-react";
import { useState } from "react";

interface SocialShareButtonsProps {
  url: string;
  title: string;
  compact?: boolean;
}

export default function SocialShareButtons({ url, title, compact }: SocialShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may be unavailable */
    }
  };

  const buttonClass = compact
    ? "flex size-8 items-center justify-center rounded-lg border border-border/40 text-muted-foreground transition-all hover:border-gold/40 hover:text-gold"
    : "flex size-10 items-center justify-center rounded-lg border border-border/40 text-muted-foreground transition-all hover:border-gold/40 hover:text-gold";

  const iconSize = compact ? "size-3.5" : "size-4";

  return (
    <div className="flex items-center gap-2">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        aria-label="Share on Facebook"
      >
        <Facebook className={iconSize} />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        aria-label="Share on X (Twitter)"
      >
        <Twitter className={iconSize} />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        aria-label="Share on LinkedIn"
      >
        <Linkedin className={iconSize} />
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className={buttonClass}
        aria-label={copied ? "Link copied" : "Copy link"}
      >
        {copied ? <Check className={`${iconSize} text-emerald-500`} /> : <Link2 className={iconSize} />}
      </button>
    </div>
  );
}
