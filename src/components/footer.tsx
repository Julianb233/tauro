import Link from "next/link";
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
  "Center City",
  "Rittenhouse",
  "Fishtown",
  "Northern Liberties",
  "Old City",
  "South Philadelphia",
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
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
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-gold"
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
            <ul className="space-y-2.5">
              {neighborhoods.map((area) => (
                <li key={area}>
                  <Link
                    href={`/neighborhoods/${area.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-sm text-white/60 transition-colors hover:text-gold"
                  >
                    {area}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+12155550100"
                  className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold"
                >
                  <Phone className="size-4 shrink-0" />
                  (215) 555-0100
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@taurorealty.com"
                  className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold"
                >
                  <Mail className="size-4 shrink-0" />
                  info@taurorealty.com
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

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} Tauro. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <GoldShimmer>
              <a
                href="https://instagram.com/taurorealty"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md p-2 text-white/50 transition-colors hover:text-gold"
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
                className="inline-flex items-center justify-center rounded-md p-2 text-white/50 transition-colors hover:text-gold"
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
                className="inline-flex items-center justify-center rounded-md p-2 text-white/50 transition-colors hover:text-gold"
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
                className="inline-flex items-center justify-center rounded-md p-2 text-white/50 transition-colors hover:text-gold"
                aria-label="X (Twitter)"
              >
                <Twitter className="size-5" />
              </a>
            </GoldShimmer>
          </div>
          <div className="flex gap-4">
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
          </div>
        </div>
      </div>
    </footer>
  );
}
