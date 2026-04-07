"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronDown, MapPin, DollarSign, Home, TrendingUp, BookOpen, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

/* ─── Menu Data ─── */

interface MegaMenuItem {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
}

interface MegaMenuSection {
  title: string;
  items: MegaMenuItem[];
  featured?: {
    href: string;
    label: string;
    description: string;
    tag?: string;
  };
}

const buyMenu: MegaMenuSection = {
  title: "Buy",
  items: [
    {
      href: "/neighborhoods",
      icon: MapPin,
      label: "By Neighborhood",
      description: "Explore Philadelphia's most sought-after neighborhoods",
    },
    {
      href: "/properties?sort=price-desc",
      icon: DollarSign,
      label: "By Price Range",
      description: "Find properties that match your budget",
    },
    {
      href: "/homes-for-sale",
      icon: Home,
      label: "By Property Type",
      description: "Condos, townhomes, single-family, and luxury estates",
    },
  ],
  featured: {
    href: "/buyers-guide",
    label: "Buyer's Guide",
    description: "Your complete roadmap to purchasing in Philadelphia — from pre-approval to closing day.",
    tag: "Essential Reading",
  },
};

const sellMenu: MegaMenuSection = {
  title: "Sell",
  items: [
    {
      href: "/home-value",
      icon: TrendingUp,
      label: "Home Valuation",
      description: "Get a data-driven estimate of your property's worth",
    },
    {
      href: "/sellers-guide",
      icon: BookOpen,
      label: "Seller's Guide",
      description: "Step-by-step guide to maximizing your sale price",
    },
    {
      href: "/market-insights",
      icon: BarChart3,
      label: "Market Report",
      description: "Latest trends, pricing data, and neighborhood analytics",
    },
  ],
  featured: {
    href: "/home-value",
    label: "What's Your Home Worth?",
    description: "Request a complimentary comparative market analysis from our team.",
    tag: "Free CMA",
  },
};

/* ─── Desktop Mega Dropdown ─── */

function MegaDropdown({
  section,
  open,
  onOpen,
  onClose,
}: {
  section: MegaMenuSection;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    onOpen();
  }, [onOpen]);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(onClose, 150);
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Cleanup timeout
  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => (open ? onClose() : onOpen())}
        aria-expanded={open}
        aria-haspopup="true"
        className={cn(
          "nav-link-underline flex items-center gap-1 rounded-md px-3 py-2 font-label text-sm font-medium tracking-wide text-white transition-all duration-300 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2",
          open && "text-gold"
        )}
      >
        {section.title}
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={cn(
          "absolute left-1/2 top-full pt-2 -translate-x-1/2 transition-all duration-200",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        )}
        role="menu"
      >
        <div className="w-[540px] overflow-hidden rounded-xl border border-white/10 bg-midnight/98 shadow-2xl shadow-black/40 backdrop-blur-2xl">
          <div className="grid grid-cols-[1fr_200px]">
            {/* Navigation items */}
            <div className="p-5">
              <p className="mb-3 font-label text-[11px] font-semibold uppercase tracking-widest text-gold/70">
                {section.title}
              </p>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    onClick={onClose}
                    className="group flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-white/5"
                  >
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                      <item.icon className="size-4" />
                    </span>
                    <div>
                      <span className="block text-sm font-medium text-off-white transition-colors group-hover:text-gold">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-white/50">
                        {item.description}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Featured card */}
            {section.featured && (
              <div className="border-l border-white/5 bg-white/[0.02] p-5">
                {section.featured.tag && (
                  <span className="mb-2 inline-block rounded-full bg-gold/15 px-2.5 py-0.5 font-label text-[10px] font-semibold uppercase tracking-wider text-gold">
                    {section.featured.tag}
                  </span>
                )}
                <Link
                  href={section.featured.href}
                  onClick={onClose}
                  className="group block"
                  role="menuitem"
                >
                  <span className="block text-sm font-semibold text-off-white transition-colors group-hover:text-gold">
                    {section.featured.label}
                  </span>
                  <span className="mt-1.5 block text-xs leading-relaxed text-white/45">
                    {section.featured.description}
                  </span>
                  <span className="mt-3 inline-flex items-center text-xs font-medium text-gold transition-transform group-hover:translate-x-0.5">
                    Learn more &rarr;
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile Accordion ─── */

function MobileMegaSection({
  section,
  onNavigate,
}: {
  section: MegaMenuSection;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-center gap-2 rounded-md font-heading text-3xl font-bold text-off-white transition-colors hover:text-gold"
        aria-expanded={expanded}
      >
        {section.title}
        <ChevronDown
          className={cn(
            "size-5 transition-transform duration-200",
            expanded && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-300",
          expanded ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-2 pb-2">
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-white/5"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-gold/10 text-gold">
                  <item.icon className="size-4" />
                </span>
                <div>
                  <span className="block text-sm font-medium text-off-white">
                    {item.label}
                  </span>
                  <span className="block text-xs text-white/50">
                    {item.description}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Exports ─── */

export { MegaDropdown, MobileMegaSection, buyMenu, sellMenu };
