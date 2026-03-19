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
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center text-sm text-white/60 transition-colors hover:text-gold sm:min-h-0"
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
                  </div>
                  <span className="text-xs font-medium leading-tight text-white/60 transition-colors group-hover:text-gold">
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
                  href="tel:+12155550100"
                  className="flex min-h-[44px] items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold"
                >
                  <Phone className="size-4 shrink-0" />
                  (215) 555-0100
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
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8 md:flex-row">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} Tauro. All rights reserved.
          </p>
          <div className="flex items-center gap-1 sm:gap-3">
            <GoldShimmer>
              <a
                href="https://instagram.com/taurorealty"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2 text-white/50 transition-colors hover:text-gold"
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
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2 text-white/50 transition-colors hover:text-gold"
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
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2 text-white/50 transition-colors hover:text-gold"
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
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md p-2 text-white/50 transition-colors hover:text-gold"
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
