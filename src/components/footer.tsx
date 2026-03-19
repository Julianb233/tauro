import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Twitter } from "lucide-react";
import { Logo } from "@/components/logo";
import { GoldShimmer } from "@/components/ui/gold-shimmer";

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
    name: "South Philadelphia",
    slug: "south-philly",
    image: "https://images.unsplash.com/photo-1582407947092-50b8c541ccbd?w=160&h=96&fit=crop&q=80",
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
            <p className="max-w-xs text-sm leading-relaxed text-white/70">
              Premium real estate brokerage serving Philadelphia&apos;s most
              sought-after neighborhoods.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Quick Links
            </h3>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center text-sm text-white/70 transition-colors hover:text-gold sm:min-h-0"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Neighborhoods */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Neighborhoods
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
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
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 to-transparent" />
                  </div>
                  <span className="text-xs font-medium leading-tight text-white/70 transition-colors group-hover:text-gold">
                    {area.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+12158394172"
                  className="flex min-h-[44px] items-center gap-2 text-sm text-white/70 transition-colors hover:text-gold"
                >
                  <Phone className="size-4 shrink-0" />
                  (215) 839-4172
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@taurorealty.com"
                  className="flex min-h-[44px] items-center gap-2 text-sm text-white/70 transition-colors hover:text-gold"
                >
                  <Mail className="size-4 shrink-0" />
                  <span className="break-all">info@taurorealty.com</span>
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2 text-sm text-white/70">
                  <MapPin className="mt-0.5 size-4 shrink-0" />
                  Philadelphia, PA
                </span>
              </li>
            </ul>
            {/* Office map */}
            <div className="mt-4 overflow-hidden rounded-md border border-white/10">
              <iframe
                title="Tauro office location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-75.2052%2C39.9226%2C-75.1252%2C39.9826&layer=mapnik&marker=39.9526%2C-75.1652"
                width="100%"
                height={128}
                className="block"
                style={{
                  filter:
                    "invert(1) hue-rotate(180deg) brightness(0.95) contrast(0.9)",
                }}
                loading="lazy"
              />
            </div>
            <a
              href="https://maps.google.com/?q=Philadelphia+PA"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-xs text-gold/70 transition-colors hover:text-gold"
            >
              <MapPin className="size-3.5" />
              View on Google Maps
            </a>
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
        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-xs text-white/70">
            &copy; {new Date().getFullYear()} Tauro. All rights reserved.
          </p>
          <div className="flex items-center gap-1 sm:gap-3">
            <GoldShimmer>
              <a
                href="https://instagram.com/taurorealty"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2 text-white/70 transition-colors hover:text-gold"
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
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2 text-white/70 transition-colors hover:text-gold"
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
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2 text-white/70 transition-colors hover:text-gold"
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
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2 text-white/70 transition-colors hover:text-gold"
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
              className="text-xs text-white/70 transition-colors hover:text-gold"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-white/70 transition-colors hover:text-gold"
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
