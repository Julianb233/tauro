import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Twitter, ArrowRight, Users } from "lucide-react";
import { Logo } from "@/components/logo";
import { GoldShimmer } from "@/components/ui/gold-shimmer";
import { GoogleReviewBadge } from "@/components/GoogleReviewBadge";
import { BLUR_LANDSCAPE } from "@/lib/blur-placeholder";
import { NewsletterForm } from "@/components/NewsletterForm";
import { blogPosts } from "@/data/blog-posts";

const quickLinks = [
  { href: "/properties", label: "Properties" },
  { href: "/agents", label: "Agents" },
  { href: "/sell", label: "Sell" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const neighborhoods = [
  {
    name: "Center City",
    slug: "center-city",
    image: "https://images.unsplash.com/photo-1569761316261-9a8696fa2ca3?w=160&h=96&fit=crop&q=80",
  },
  {
    name: "Rittenhouse",
    slug: "rittenhouse",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=160&h=96&fit=crop&q=80",
  },
  {
    name: "Fishtown",
    slug: "fishtown",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=160&h=96&fit=crop&q=80",
  },
  {
    name: "Northern Liberties",
    slug: "northern-liberties",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=160&h=96&fit=crop&q=80",
  },
  {
    name: "Old City",
    slug: "old-city",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=160&h=96&fit=crop&q=80",
  },
  {
    name: "South Philly",
    slug: "south-philly",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=160&h=96&fit=crop&q=80",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-foreground">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Logo size="md" variant="light" />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              Premium real estate brokerage serving Philadelphia&apos;s most
              sought-after neighborhoods.
            </p>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <h3 className="mb-4 font-label text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Quick Links
            </h3>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group/link inline-flex min-h-[44px] items-center gap-1 text-sm text-white/60 transition-all duration-300 hover:text-gold hover:translate-x-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Neighborhoods */}
          <nav aria-label="Neighborhoods">
            <h3 className="mb-4 font-label text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Neighborhoods
            </h3>
            <div className="grid grid-cols-1 gap-2.5 min-[400px]:grid-cols-2">
              {neighborhoods.map((area) => (
                <Link
                  key={area.slug}
                  href={`/neighborhoods/${area.slug}`}
                  className="group flex items-center gap-2.5 rounded-lg border border-white/5 p-1.5 transition-all hover:border-gold/30 hover:bg-white/5"
                >
                  <div className="relative h-10 w-16 shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={area.image}
                      alt={area.name}
                      fill
                      sizes="64px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      placeholder="blur"
                      blurDataURL={BLUR_LANDSCAPE}
                    />
                  </div>
                  <span className="text-xs font-medium leading-tight text-white/60 transition-colors group-hover:text-gold">
                    {area.name}
                  </span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-label text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+12158394172"
                  className="flex min-h-[44px] items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold"
                >
                  <Phone className="size-4 shrink-0" />
                  (215) 839-4172
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@taurorealty.com"
                  className="flex min-h-[44px] items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold"
                >
                  <Mail className="size-4 shrink-0" />
                  <span className="break-all">info@taurorealty.com</span>
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2 text-sm text-white/60">
                  <MapPin className="mt-0.5 size-4 shrink-0" />
                  Philadelphia, PA
                </span>
              </li>
            </ul>
            {/* Office map placeholder */}
            <a
              href="https://maps.google.com/?q=Philadelphia+PA"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View our office location on Google Maps (opens in new tab)"
              className="mt-4 block h-32 w-full overflow-hidden rounded-md border border-white/10 bg-white/5 transition-colors hover:border-gold/40"
            >
              <div className="flex h-full flex-col items-center justify-center gap-2 text-xs text-white/60">
                <MapPin className="size-5 text-gold" />
                <span>Philadelphia, PA</span>
                <span className="text-gold/70">View on Map</span>
              </div>
            </a>
          </div>
        </div>

        {/* Newsletter + Recent Post */}
        <div className="mt-8 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Newsletter signup with social proof */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="size-4 text-gold" />
                <span className="text-xs font-medium text-gold">
                  Join 2,500+ subscribers
                </span>
              </div>
              <NewsletterForm source="footer" compact />
              <p className="text-xs text-white/40">
                Monthly market reports, new listings &amp; neighborhood guides. Unsubscribe anytime.
              </p>
            </div>

            {/* Recent post preview */}
            {blogPosts[0] && (
              <div>
                <h3 className="mb-3 font-label text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  Latest from the Blog
                </h3>
                <Link
                  href={`/blog/${blogPosts[0].slug}`}
                  className="group flex gap-4 rounded-lg border border-white/5 p-3 transition-all hover:border-gold/30 hover:bg-white/5"
                >
                  <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={blogPosts[0].coverImage}
                      alt={blogPosts[0].title}
                      fill
                      sizes="112px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      placeholder="blur"
                      blurDataURL={BLUR_LANDSCAPE}
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <span className="mb-1 text-[10px] font-medium uppercase tracking-wider text-gold/70">
                      {blogPosts[0].category}
                    </span>
                    <h4 className="line-clamp-2 text-sm font-medium leading-snug text-white/80 transition-colors group-hover:text-gold">
                      {blogPosts[0].title}
                    </h4>
                    <span className="mt-1.5 inline-flex items-center gap-1 text-xs text-gold/60 transition-colors group-hover:text-gold">
                      Read more <ArrowRight className="size-3" />
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Partner & Affiliation Logos */}
        <div className="mt-8 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8">
          <p className="text-center font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
            Proud Members &amp; Affiliates
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-12">
            {/* Bright MLS */}
            <span className="text-white/25 transition-colors hover:text-white/50" aria-label="Bright MLS">
              <svg className="h-7 w-auto" viewBox="0 0 120 28" fill="none" aria-hidden="true">
                <text x="0" y="20" fill="currentColor" fontSize="14" fontWeight="bold" fontFamily="system-ui, sans-serif" letterSpacing="2">BRIGHT MLS</text>
              </svg>
            </span>
            {/* National Association of Realtors */}
            <span className="text-white/25 transition-colors hover:text-white/50" aria-label="National Association of Realtors">
              <svg className="h-7 w-auto" viewBox="0 0 50 28" fill="none" aria-hidden="true">
                <text x="0" y="20" fill="currentColor" fontSize="14" fontWeight="bold" fontFamily="system-ui, sans-serif" letterSpacing="2">NAR</text>
              </svg>
            </span>
            {/* Greater Philadelphia Association of Realtors */}
            <span className="text-white/25 transition-colors hover:text-white/50" aria-label="Greater Philadelphia Association of Realtors">
              <svg className="h-7 w-auto" viewBox="0 0 60 28" fill="none" aria-hidden="true">
                <text x="0" y="20" fill="currentColor" fontSize="14" fontWeight="bold" fontFamily="system-ui, sans-serif" letterSpacing="2">GPAR</text>
              </svg>
            </span>
            {/* REALTOR® */}
            <span className="text-white/25 transition-colors hover:text-white/50" aria-label="REALTOR®">
              <svg className="h-7 w-auto" viewBox="0 0 130 28" fill="none" aria-hidden="true">
                <text x="0" y="20" fill="currentColor" fontSize="13" fontWeight="bold" fontFamily="Georgia, serif" letterSpacing="3">REALTOR®</text>
              </svg>
            </span>
          </div>
        </div>

        {/* Equal Housing & MLS Attribution */}
        <div className="mt-8 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
            {/* Equal Housing Opportunity logo */}
            <Link href="/fair-housing" className="shrink-0" aria-label="Equal Housing Opportunity">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="h-12 w-12"
                aria-hidden="true"
                role="img"
              >
                <rect width="48" height="48" rx="4" fill="#fff" />
                <path
                  d="M24 8L8 20h4v16h24V20h4L24 8z"
                  fill="none"
                  stroke="#1a1a1a"
                  strokeWidth="1.5"
                />
                <rect x="16" y="24" width="16" height="2" fill="#1a1a1a" />
                <rect x="16" y="28" width="16" height="2" fill="#1a1a1a" />
                <rect x="16" y="32" width="16" height="2" fill="#1a1a1a" />
                <text
                  x="24"
                  y="22"
                  textAnchor="middle"
                  fill="#1a1a1a"
                  fontSize="5"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  EQUAL
                </text>
              </svg>
            </Link>
            <div className="text-center sm:text-left">
              <p className="text-xs leading-relaxed text-white/60">
                <span className="font-semibold text-white/80">Equal Housing Opportunity.</span>{" "}
                Tauro Realty is committed to compliance with all federal, state, and local fair
                housing laws. We do not discriminate on the basis of race, color, religion, sex,
                handicap, familial status, national origin, sexual orientation, gender identity, or
                any other protected class.
              </p>
              <p className="mt-2 text-xs leading-relaxed text-white/60">
                Listing information deemed reliable but not guaranteed. All measurements are
                approximate. Data sourced from Bright MLS. Information is provided exclusively for
                consumers&apos; personal, non-commercial use.
              </p>
              <p className="mt-2 text-xs text-white/50">
                REALTOR<sup>&reg;</sup> is a federally registered collective membership mark which
                identifies a real estate professional who is a member of the National Association of
                REALTORS<sup>&reg;</sup> and subscribes to its strict Code of Ethics.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="gold-divider mt-8 sm:mt-10" />
        <div className="mt-0 flex flex-col items-center justify-between gap-4 pt-6 sm:pt-8 md:flex-row">
          <div className="flex items-center gap-4">
            <p className="text-xs text-white/50">
              &copy; {new Date().getFullYear()} Tauro. All rights reserved.
            </p>
            <GoogleReviewBadge variant="light" />
          </div>
          <div className="flex items-center gap-1 sm:gap-3">
            <GoldShimmer>
              <a
                href="https://instagram.com/taurorealty"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2 text-white/50 transition-all duration-300 hover:text-gold hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="size-5" />
              </a>
            </GoldShimmer>
            <GoldShimmer>
              <a
                href="https://facebook.com/taurorealty"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2 text-white/50 transition-all duration-300 hover:text-gold hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="size-5" />
              </a>
            </GoldShimmer>
            <GoldShimmer>
              <a
                href="https://linkedin.com/company/taurorealty"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2 text-white/50 transition-all duration-300 hover:text-gold hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5" />
              </a>
            </GoldShimmer>
            <GoldShimmer>
              <a
                href="https://x.com/taurorealty"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2 text-white/50 transition-all duration-300 hover:text-gold hover:scale-110"
                aria-label="X (Twitter)"
              >
                <Twitter className="size-5" />
              </a>
            </GoldShimmer>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/fair-housing"
              className="text-xs text-white/70 transition-colors hover:text-gold"
            >
              Fair Housing
            </Link>
            <Link
              href="/privacy"
              className="text-xs text-white/50 transition-colors hover:text-gold"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-white/50 transition-colors hover:text-gold"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookie-policy"
              className="text-xs text-white/70 transition-colors hover:text-gold"
            >
              Cookie Policy
            </Link>
            <Link
              href="/cookie-policy#ccpa"
              className="text-xs text-white/70 transition-colors hover:text-gold"
            >
              Do Not Sell My Personal Information
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
