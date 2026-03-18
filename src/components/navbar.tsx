"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useScrolled } from "@/hooks/use-scrolled";

const navLinks = [
  { href: "/properties", label: "Properties" },
  { href: "/agents", label: "Agents" },
  { href: "/sell", label: "Sell" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrolled();

  // Escape key closes overlay
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mobileOpen]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
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
            ? "border-b border-border/40 bg-near-black/95 backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Logo width={100} height={34} />
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
            <Link
              href="/contact"
              className="shimmer-gold inline-flex items-center justify-center rounded-lg bg-gold px-4 py-2 text-sm font-label uppercase tracking-wide text-near-black transition-colors hover:bg-gold-light"
            >
              Schedule a Showing
            </Link>
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
        <div
          className="fixed inset-0 z-[60] flex flex-col bg-near-black lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Overlay header with logo and close button */}
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <Logo width={100} height={34} />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="rounded-md p-2 text-muted-foreground hover:text-foreground"
            >
              <X className="size-6" />
            </button>
          </div>

          {/* Centered navigation links */}
          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-heading text-3xl font-bold text-off-white transition-colors hover:text-gold"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Bottom section with CTA and phone */}
          <div className="flex flex-col items-center gap-4 border-t border-border/40 px-4 py-8">
            <Link
              href="/contact"
              className="shimmer-gold rounded-md bg-gold px-8 py-3 font-label text-lg font-semibold text-near-black transition-colors hover:bg-gold-light"
              onClick={() => setMobileOpen(false)}
            >
              Schedule a Showing
            </Link>
            <a
              href="tel:+12155550100"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold"
            >
              <Phone className="size-4" />
              (215) 555-0100
            </a>
          </div>
        </div>
      )}
    </>
  );
}
