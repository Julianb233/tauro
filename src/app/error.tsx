"use client";

import Link from "next/link";
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

const helpfulLinks = [
  { href: "/properties", label: "Browse Properties" },
  { href: "/neighborhoods", label: "Explore Neighborhoods" },
  { href: "/contact", label: "Contact Us" },
  { href: "/agents", label: "Meet Our Agents" },
];

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-midnight px-6 text-center">
      {/* Gold decorative line */}
      <div className="mb-8 h-px w-24 bg-gold" />

      {/* Error label */}
      <p className="font-label text-sm font-semibold uppercase tracking-[0.3em] text-gold">
        Error 500
      </p>

      {/* Heading */}
      <h1 className="mt-4 font-heading text-5xl font-bold text-off-white md:text-6xl lg:text-7xl">
        Something Went Wrong
      </h1>

      {/* Subtext */}
      <p className="mt-6 max-w-md text-lg text-gold-light/70">
        We apologize for the inconvenience. An unexpected error occurred.
        Please try again or let us help you find what you need.
      </p>

      {/* Error digest */}
      {error.digest && (
        <p className="mt-3 font-mono text-xs text-gold/40">
          Error ID: {error.digest}
        </p>
      )}

      {/* Action buttons */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-md border border-gold px-8 py-3 font-label text-sm font-semibold uppercase tracking-wider text-gold transition-colors hover:bg-gold hover:text-midnight"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
          </svg>
          Try Again
        </button>
        <Link
          href="/"
          className="gold-shimmer inline-flex items-center gap-2 rounded-md bg-gold px-8 py-3 font-label text-sm font-semibold uppercase tracking-wider text-midnight transition-colors hover:bg-gold-light"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Helpful links */}
      <div className="mt-16">
        <p className="mb-4 font-label text-xs font-medium uppercase tracking-[0.2em] text-gold/60">
          Helpful Links
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {helpfulLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-off-white/80 underline decoration-gold/30 underline-offset-4 transition-colors hover:text-gold hover:decoration-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Contact info */}
      <div className="mt-10">
        <p className="text-sm text-gold-light/50">
          Need help? Call{" "}
          <a
            href="tel:+12158394172"
            className="text-gold/80 underline decoration-gold/30 underline-offset-4 transition-colors hover:text-gold"
          >
            (215) 839-4172
          </a>
          {" "}or email{" "}
          <a
            href="mailto:info@taurorealty.com"
            className="text-gold/80 underline decoration-gold/30 underline-offset-4 transition-colors hover:text-gold"
          >
            info@taurorealty.com
          </a>
        </p>
      </div>

      {/* Bottom decorative line */}
      <div className="mt-16 h-px w-24 bg-gold/30" />
    </div>
  );
}
