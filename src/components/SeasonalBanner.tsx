"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Season {
  label: string;
  headline: string;
  description: string;
  cta: string;
  href: string;
  gradient: string;
  accent: string;
}

const SEASONS: { start: [number, number]; end: [number, number]; season: Season }[] = [
  {
    // Spring selling season: Mar 1 – May 31
    start: [3, 1],
    end: [5, 31],
    season: {
      label: "Spring Selling Season",
      headline: "The best time to list is now",
      description:
        "Philadelphia's spring market is heating up. Buyers are actively searching — list your home today to maximize your sale price.",
      cta: "Get Your Home Valuation",
      href: "/home-value",
      gradient: "from-emerald-900/90 via-emerald-800/80 to-emerald-700/70",
      accent: "bg-emerald-400",
    },
  },
  {
    // Summer open house: Jun 1 – Aug 31
    start: [6, 1],
    end: [8, 31],
    season: {
      label: "Summer Open House Season",
      headline: "Explore homes while the sun shines",
      description:
        "Long days mean more time for showings. Schedule a tour of Philadelphia's finest properties this summer.",
      cta: "Browse Properties",
      href: "/properties",
      gradient: "from-amber-900/90 via-amber-800/80 to-orange-700/70",
      accent: "bg-amber-400",
    },
  },
  {
    // Fall market: Sep 1 – Nov 30
    start: [9, 1],
    end: [11, 30],
    season: {
      label: "Fall Market",
      headline: "Find your home before the holidays",
      description:
        "Fall brings motivated sellers and less competition. It's a smart time to make your move in Philadelphia.",
      cta: "Search Homes",
      href: "/properties",
      gradient: "from-orange-900/90 via-red-900/80 to-amber-800/70",
      accent: "bg-orange-400",
    },
  },
  {
    // Holiday / winter: Dec 1 – Feb 28
    start: [12, 1],
    end: [2, 28],
    season: {
      label: "Holiday Home Buying",
      headline: "Start the new year in a new home",
      description:
        "The holidays are the perfect time to plan your next move. Fewer buyers means better opportunities for you.",
      cta: "Explore Neighborhoods",
      href: "/neighborhoods",
      gradient: "from-blue-900/90 via-indigo-900/80 to-slate-800/70",
      accent: "bg-blue-400",
    },
  },
];

function getCurrentSeason(): Season {
  const now = new Date();
  const month = now.getMonth() + 1; // 1-12
  const day = now.getDate();

  for (const { start, end, season } of SEASONS) {
    // Handle wrap-around (Dec–Feb)
    if (start[0] > end[0]) {
      if (month > start[0] || month < end[0] || (month === start[0] && day >= start[1]) || (month === end[0] && day <= end[1])) {
        return season;
      }
    } else {
      if (
        (month > start[0] || (month === start[0] && day >= start[1])) &&
        (month < end[0] || (month === end[0] && day <= end[1]))
      ) {
        return season;
      }
    }
  }

  // Fallback to spring
  return SEASONS[0].season;
}

export default function SeasonalBanner() {
  const season = getCurrentSeason();

  return (
    <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${season.gradient} px-6 py-8 sm:px-10 sm:py-10`}
      >
        {/* Decorative accent bar */}
        <div className={`absolute left-0 top-0 h-full w-1 ${season.accent}`} />

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-xl">
            <span className="font-label inline-block text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              {season.label}
            </span>
            <h2 className="mt-2 font-heading text-2xl font-bold text-white sm:text-3xl">
              {season.headline}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-white/80 sm:text-base">
              {season.description}
            </p>
          </div>

          <Link
            href={season.href}
            className="shimmer-gold inline-flex shrink-0 items-center gap-2 self-start rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg sm:self-center"
          >
            {season.cta}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
