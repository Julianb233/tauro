import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

const popularLinks = [
  { href: "/properties", label: "Browse Properties" },
  { href: "/neighborhoods", label: "Explore Neighborhoods" },
  { href: "/contact", label: "Contact Us" },
  { href: "/agents", label: "Meet Our Agents" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-midnight px-6 text-center">
      {/* Gold decorative line */}
      <div className="mb-8 h-px w-24 bg-gold" />

      {/* 404 number */}
      <p className="font-label text-sm font-semibold uppercase tracking-[0.3em] text-gold">
        Error 404
      </p>

      {/* Heading */}
      <h1 className="mt-4 font-heading text-5xl font-bold text-off-white md:text-6xl lg:text-7xl">
        Page Not Found
      </h1>

      {/* Subtext */}
      <p className="mt-6 max-w-md text-lg text-gold-light/70">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let us help you find your way.
      </p>

      {/* CTA button */}
      <Link
        href="/"
        className="gold-shimmer mt-10 inline-flex items-center gap-2 rounded-md bg-gold px-8 py-3 font-label text-sm font-semibold uppercase tracking-wider text-midnight transition-colors hover:bg-gold-light"
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

      {/* Popular pages */}
      <div className="mt-16">
        <p className="mb-4 font-label text-xs font-medium uppercase tracking-[0.2em] text-gold/60">
          Popular Pages
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          {popularLinks.map((link) => (
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

      {/* Bottom decorative line */}
      <div className="mt-16 h-px w-24 bg-gold/30" />
    </div>
  );
}
