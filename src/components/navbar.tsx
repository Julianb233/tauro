"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { GoldShimmer } from "@/components/ui/gold-shimmer";

const navLinks = [
  { href: "/properties", label: "Properties" },
  { href: "/agents", label: "Agents" },
  { href: "/sell", label: "Sell" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll transparency transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "border-b border-border/40 bg-midnight/95 backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-2xl font-bold tracking-wider text-gold">
              TAURO
            </span>
            <span className="hidden text-xs font-label uppercase tracking-[0.2em] text-off-white/70 sm:inline">
              Realty
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href="tel:+12155550100"
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-gold"
            >
              <Phone className="size-4" />
              <span>(215) 555-0100</span>
            </a>
            <GoldShimmer>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-gold px-4 py-2 text-sm font-label uppercase tracking-wide text-midnight transition-colors hover:bg-gold-light"
              >
                Schedule a Showing
              </Link>
            </GoldShimmer>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="rounded-md p-2 text-muted-foreground lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="size-6" />
            ) : (
              <Menu className="size-6" />
            )}
          </button>
        </nav>
      </header>

      {/* Full-screen mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-midnight lg:hidden">
          {/* Close button */}
          <button
            type="button"
            className="absolute right-5 top-5 rounded-md p-2 text-muted-foreground"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X className="size-6" />
          </button>

          <ul className="space-y-6 text-center">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-2xl font-heading font-bold text-off-white transition-colors hover:text-gold"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col items-center gap-4">
            <GoldShimmer>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-gold px-4 py-2 text-sm font-label uppercase tracking-wide text-midnight transition-colors hover:bg-gold-light"
                onClick={() => setMobileOpen(false)}
              >
                Schedule a Showing
              </Link>
            </GoldShimmer>
            <a
              href="tel:+12155550100"
              className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-gold"
            >
              <Phone className="size-4" />
              <span>(215) 555-0100</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
