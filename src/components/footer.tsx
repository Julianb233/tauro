import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { href: "/properties", label: "Browse Properties" },
  { href: "/agents", label: "Our Agents" },
  { href: "/neighborhoods", label: "Neighborhoods" },
  { href: "/about", label: "About Tauro" },
  { href: "/contact", label: "Contact Us" },
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
    <footer className="border-t border-border/40 bg-near-black">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-heading text-2xl font-bold tracking-wide text-gold">
                TAURO
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
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
                    className="text-sm text-muted-foreground transition-colors hover:text-gold"
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
                    className="text-sm text-muted-foreground transition-colors hover:text-gold"
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
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
                >
                  <Phone className="size-4 shrink-0" />
                  (215) 555-0100
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@taurorealty.com"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
                >
                  <Mail className="size-4 shrink-0" />
                  info@taurorealty.com
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 size-4 shrink-0" />
                  Philadelphia, PA
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Tauro. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground transition-colors hover:text-gold"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted-foreground transition-colors hover:text-gold"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
