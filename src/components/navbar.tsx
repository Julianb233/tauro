"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Phone, Heart, ChevronDown, MapPin, Home, Building2, Landmark, TrendingUp, BookOpen, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { useScrolled } from "@/hooks/use-scrolled";
import { useFavorites } from "@/hooks/useFavorites";

/* -------------------------------------------------------------------------- */
/*  Static data for mega-menu                                                  */
/* -------------------------------------------------------------------------- */

const topNeighborhoods = [
  { name: "Center City", slug: "center-city" },
  { name: "Rittenhouse", slug: "rittenhouse" },
  { name: "Fishtown", slug: "fishtown" },
  { name: "Northern Liberties", slug: "northern-liberties" },
  { name: "Old City", slug: "old-city" },
  { name: "South Philly", slug: "south-philly" },
];

const propertyTypes = [
  { label: "Houses", type: "Single Family", icon: Home },
  { label: "Condos", type: "Condo", icon: Building2 },
  { label: "Townhouses", type: "Townhouse", icon: Landmark },
];

const featuredListing = {
  href: "/properties/1820-rittenhouse-sq-philadelphia",
  image:
    "https://images.unsplash.com/photo-1758796629979-c967b99dec5e?w=600&q=80",
  address: "1820 Rittenhouse Square",
  price: "$3,250,000",
  beds: 5,
  baths: 5,
  sqft: "4,800",
};

const sellLinks = [
  {
    href: "/sell",
    label: "Home Valuation",
    description: "Find out what your home is worth",
    icon: DollarSign,
  },
  {
    href: "/sellers-guide",
    label: "Seller's Guide",
    description: "Step-by-step guide to selling",
    icon: BookOpen,
  },
  {
    href: "/market-insights",
    label: "Market Report",
    description: "Latest Philadelphia market data",
    icon: TrendingUp,
  },
];

/* -------------------------------------------------------------------------- */
/*  Nav links                                                                  */
/* -------------------------------------------------------------------------- */

const primaryLinks = [
  { href: "/properties", label: "Buy" },
  { href: "/sell", label: "Sell" },
];

const navLinks = [
  { href: "/properties", label: "Buy" },
  { href: "/sell", label: "Sell" },
  { href: "/neighborhoods", label: "Neighborhoods" },
  { href: "/agents", label: "Agents" },
  { href: "/blog", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/* -------------------------------------------------------------------------- */
/*  Mega-menu dropdown component (desktop only)                                */
/* -------------------------------------------------------------------------- */

type DropdownKey = "buy" | "sell" | null;

function BuyDropdown({ onClose }: { onClose: () => void }) {
  return (
    <div className="grid grid-cols-3 gap-8 p-8">
      {/* Column 1 — Neighborhoods */}
      <div>
        <h3 className="mb-4 flex items-center gap-2 font-label text-xs font-semibold uppercase tracking-widest text-gold">
          <MapPin className="size-3.5" />
          Browse by Neighborhood
        </h3>
        <ul className="space-y-2.5">
          {topNeighborhoods.map((n) => (
            <li key={n.slug}>
              <Link
                href={`/neighborhoods/${n.slug}`}
                onClick={onClose}
                className="block text-sm text-off-white/80 transition-colors hover:text-gold"
              >
                {n.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/neighborhoods"
              onClick={onClose}
              className="mt-1 inline-block text-xs font-semibold text-gold/70 transition-colors hover:text-gold"
            >
              View all neighborhoods &rarr;
            </Link>
          </li>
        </ul>
      </div>

      {/* Column 2 — Property types */}
      <div>
        <h3 className="mb-4 flex items-center gap-2 font-label text-xs font-semibold uppercase tracking-widest text-gold">
          <Home className="size-3.5" />
          Browse by Type
        </h3>
        <ul className="space-y-2.5">
          {propertyTypes.map((pt) => (
            <li key={pt.type}>
              <Link
                href={`/properties?type=${encodeURIComponent(pt.type)}`}
                onClick={onClose}
                className="flex items-center gap-2.5 text-sm text-off-white/80 transition-colors hover:text-gold"
              >
                <pt.icon className="size-4 text-gold/60" />
                {pt.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/properties"
          onClick={onClose}
          className="mt-4 inline-block text-xs font-semibold text-gold/70 transition-colors hover:text-gold"
        >
          View all listings &rarr;
        </Link>
      </div>

      {/* Column 3 — Featured listing card */}
      <div>
        <h3 className="mb-4 font-label text-xs font-semibold uppercase tracking-widest text-gold">
          Featured Listing
        </h3>
        <Link
          href={featuredListing.href}
          onClick={onClose}
          className="group block overflow-hidden rounded-lg border border-white/10 bg-white/5 transition-all hover:border-gold/30 hover:bg-white/10"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={featuredListing.image}
              alt={featuredListing.address}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="280px"
            />
          </div>
          <div className="p-3">
            <p className="text-sm font-semibold text-off-white">
              {featuredListing.address}
            </p>
            <p className="mt-0.5 text-sm font-bold text-gold">
              {featuredListing.price}
            </p>
            <p className="mt-1 text-xs text-off-white/60">
              {featuredListing.beds} bed &middot; {featuredListing.baths} bath
              &middot; {featuredListing.sqft} sqft
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

function SellDropdown({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-8">
      <div className="grid grid-cols-3 gap-6">
        {sellLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="group flex gap-4 rounded-lg border border-white/10 bg-white/5 p-5 transition-all hover:border-gold/30 hover:bg-white/10"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
              <item.icon className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-off-white">
                {item.label}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-off-white/60">
                {item.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Navbar                                                                     */
/* -------------------------------------------------------------------------- */

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownKey>(null);
  const scrolled = useScrolled();
  const { count } = useFavorites();
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const startCloseTimer = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 200);
  }, [clearCloseTimer]);

  const handleMouseEnter = useCallback(
    (key: DropdownKey) => {
      clearCloseTimer();
      setOpenDropdown(key);
    },
    [clearCloseTimer],
  );

  const closeDropdown = useCallback(() => {
    clearCloseTimer();
    setOpenDropdown(null);
  }, [clearCloseTimer]);

  // Escape key closes overlay + dropdown
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setOpenDropdown(null);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!openDropdown) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openDropdown]);

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
        ref={navRef}
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "border-b border-border/40 bg-white/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.06)]"
            : "bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Logo size="sm" variant={scrolled ? "dark" : "light"} />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isPrimary =
                link.label === "Buy" || link.label === "Sell";
              const dropdownKey = link.label === "Buy" ? "buy" : link.label === "Sell" ? "sell" : null;
              const hasDropdown = !!dropdownKey;

              return (
                <li
                  key={link.href + link.label}
                  className="relative"
                  onMouseEnter={hasDropdown ? () => handleMouseEnter(dropdownKey) : undefined}
                  onMouseLeave={hasDropdown ? startCloseTimer : undefined}
                >
                  {hasDropdown ? (
                    <button
                      type="button"
                      className={cn(
                        "flex items-center gap-0.5 rounded-md px-3 py-2 font-label text-sm tracking-wide transition-all duration-300",
                        isPrimary
                          ? "font-bold hover:text-gold"
                          : "font-medium hover:text-gold",
                        scrolled
                          ? isPrimary
                            ? "text-foreground"
                            : "text-foreground/70"
                          : isPrimary
                            ? "text-white"
                            : "text-white/80"
                      )}
                      onClick={() =>
                        setOpenDropdown((prev) =>
                          prev === dropdownKey ? null : dropdownKey,
                        )
                      }
                      aria-expanded={openDropdown === dropdownKey}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform duration-200",
                          openDropdown === dropdownKey && "rotate-180",
                        )}
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(
                        "rounded-md px-3 py-2 font-label text-sm tracking-wide transition-all duration-300",
                        isPrimary
                          ? "font-bold hover:text-gold"
                          : "font-medium hover:text-gold",
                        scrolled
                          ? isPrimary
                            ? "text-foreground"
                            : "text-foreground/70"
                          : isPrimary
                            ? "text-white"
                            : "text-white/80"
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/favorites"
              aria-label="Saved properties"
              className={cn(
                "relative flex items-center gap-1.5 rounded-md px-2 py-2 text-sm transition-all duration-300 hover:text-gold",
                scrolled ? "text-foreground/70" : "text-white/80"
              )}
            >
              <Heart className="size-4" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-bold text-near-black">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </Link>
            <a
              href="tel:+12158394172"
              className={cn(
                "flex items-center gap-1.5 text-sm transition-all duration-300 hover:text-gold",
                scrolled ? "text-muted-foreground" : "text-white/70"
              )}
            >
              <Phone className="size-4" />
              <span>(215) 839-4172</span>
            </a>
            <Link
              href="/contact"
              className={cn(
                "shimmer-gold inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-label uppercase tracking-wide transition-all duration-300",
                scrolled
                  ? "bg-foreground text-white hover:bg-gold hover:text-white"
                  : "bg-gold px-4 py-2 text-near-black hover:bg-gold-light"
              )}
            >
              Schedule a Showing
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className={cn(
              "rounded-md p-2.5 lg:hidden",
              scrolled ? "text-foreground" : "text-white"
            )}
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

        {/* Desktop mega-menu dropdown panel */}
        <div
          className={cn(
            "absolute left-0 top-full w-full origin-top transition-all duration-300 ease-out lg:block hidden",
            openDropdown
              ? "pointer-events-auto scale-y-100 opacity-100"
              : "pointer-events-none scale-y-95 opacity-0",
          )}
          onMouseEnter={clearCloseTimer}
          onMouseLeave={startCloseTimer}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-b-2xl border border-white/10 border-t-0 bg-midnight/95 shadow-2xl backdrop-blur-xl">
              {openDropdown === "buy" && <BuyDropdown onClose={closeDropdown} />}
              {openDropdown === "sell" && (
                <SellDropdown onClose={closeDropdown} />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen mobile overlay — kept dark for dramatic contrast */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] flex flex-col bg-midnight/95 backdrop-blur-xl lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Overlay header with logo and close button */}
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <Logo size="sm" variant="light" />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="rounded-md p-2 text-white/70 hover:text-white"
            >
              <X className="size-6" />
            </button>
          </div>

          {/* Primary Buy/Sell links */}
          <div className="flex items-center justify-center gap-4 border-b border-white/10 px-4 py-6">
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg bg-gold/10 px-8 py-3 font-heading text-2xl font-bold text-gold transition-colors hover:bg-gold hover:text-near-black"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Other navigation links */}
          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {navLinks
              .filter(
                (link) =>
                  link.label !== "Buy" && link.label !== "Sell",
              )
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-heading text-3xl font-bold text-off-white transition-colors hover:text-gold"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            <Link
              href="/favorites"
              className="flex items-center gap-2 font-heading text-3xl font-bold text-off-white transition-colors hover:text-gold"
              onClick={() => setMobileOpen(false)}
            >
              <Heart className="size-6" />
              Saved
              {count > 0 && (
                <span className="ml-1 rounded-full bg-gold px-2 py-0.5 text-sm font-bold text-near-black">
                  {count}
                </span>
              )}
            </Link>
          </nav>

          {/* Bottom section with CTA and phone */}
          <div className="flex flex-col items-center gap-4 border-t border-white/10 px-4 py-8">
            <Link
              href="/contact"
              className="shimmer-gold rounded-md bg-gold px-8 py-3 font-label text-lg font-semibold text-near-black transition-colors hover:bg-gold-light"
              onClick={() => setMobileOpen(false)}
            >
              Schedule a Showing
            </Link>
            <a
              href="tel:+12158394172"
              className="flex items-center gap-2 text-sm text-white/70 hover:text-gold"
            >
              <Phone className="size-4" />
              (215) 839-4172
            </a>
          </div>
        </div>
      )}
    </>
  );
}
