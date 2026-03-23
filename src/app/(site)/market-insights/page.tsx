import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp,
  Clock,
  Home,
  Target,
  BarChart3,
  Package,
  ArrowRight,
  ShoppingCart,
  Banknote,
  Download,
} from "lucide-react";

import { monthlyTrend, neighborhoods, summaryStats } from "@/data/market-data";
import {
  InteractiveTrendChart,
  NeighborhoodPriceChart,
  NeighborhoodDomChart,
  NeighborhoodPricePerSqftChart,
} from "./MarketCharts";

export const metadata: Metadata = {
  title: "Philadelphia Market Insights | Tauro Realty",
  description:
    "Data-driven Philadelphia real estate market statistics, neighborhood price trends, and insights to help you make smarter buying and selling decisions.",
};

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const keyStats = [
  {
    label: "Median Home Price",
    value: summaryStats.medianPriceFormatted,
    trend: `${summaryStats.yoyPriceChange > 0 ? "Up" : "Down"} ${Math.abs(summaryStats.yoyPriceChange)}% YoY`,
    trendPositive: summaryStats.yoyPriceChange > 0,
    icon: TrendingUp,
  },
  {
    label: "Avg Days on Market",
    value: String(summaryStats.avgDaysOnMarket),
    unit: "days",
    trend: "Down 3 days YoY",
    trendPositive: true,
    icon: Clock,
  },
  {
    label: "Active Inventory",
    value: summaryStats.activeListings.toLocaleString(),
    unit: "listings",
    trend: "Down 8% YoY",
    trendPositive: false,
    icon: Home,
  },
  {
    label: "Sale-to-List Ratio",
    value: "98.5%",
    trend: "Up 0.5% YoY",
    trendPositive: true,
    icon: Target,
  },
];

const trendInsights = [
  {
    icon: TrendingUp,
    title: "Steady Price Growth",
    description:
      "Philadelphia's housing market continues moderate appreciation, outpacing inflation without the volatility of coastal metros. Neighborhoods like Fishtown and Graduate Hospital lead gains with 6-8% annual increases, while established areas like Rittenhouse and Chestnut Hill appreciate at a steadier 2-3%.",
  },
  {
    icon: BarChart3,
    title: "Competitive but Balanced",
    description:
      "While some areas see bidding wars -- particularly in Fishtown, Brewerytown, and Kensington -- the overall market offers opportunities for prepared buyers. Pre-approval, flexible closing timelines, and strong earnest money deposits give buyers a meaningful edge in competitive situations.",
  },
  {
    icon: Package,
    title: "Low Inventory Favors Sellers",
    description:
      "Limited supply means well-priced homes sell quickly, often within two to three weeks. Sellers benefit from strategic pricing and professional marketing. Overpricing remains the biggest mistake -- homes priced right from day one sell faster and for more than those that require reductions.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function MarketInsightsPage() {
  /* Prepare chart data */
  const formatMonth = (m: string) => m.replace("20", "'");

  const trendDataSets = {
    medianPrice: monthlyTrend.map((d) => ({ label: formatMonth(d.month), value: d.medianPrice })),
    inventory: monthlyTrend.map((d) => ({ label: formatMonth(d.month), value: d.activeInventory })),
    daysOnMarket: monthlyTrend.map((d) => ({ label: formatMonth(d.month), value: d.daysOnMarket })),
    pricePerSqft: monthlyTrend.map((d) => ({ label: formatMonth(d.month), value: d.pricePerSqft })),
  };

  const neighborhoodPriceData = neighborhoods.map((n) => ({
    label: n.name,
    value: n.medianPrice,
  }));

  const neighborhoodDomData = neighborhoods.map((n) => ({
    label: n.name,
    value: n.daysOnMarket,
  }));

  const neighborhoodPricePerSqftData = neighborhoods.map((n) => ({
    label: n.name,
    value: n.pricePerSqft,
  }));

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-foreground pb-20 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Market Insights
          </p>
          <h1 className="mt-3 max-w-3xl font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Philadelphia Market Insights
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/60">
            Data-driven insights to help you make smarter real estate decisions.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Data reflects approximate market conditions as of Q1 2026
          </p>
        </div>
      </section>

      {/* ── Summary Stat Cards ─────────────────────────────────── */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              At a Glance
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Philadelphia Market at a Glance
            </h2>
          </div>

          <div className="mt-12 grid gap-6 grid-cols-2 lg:grid-cols-4">
            {keyStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border/40 bg-white p-6"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-gold/10">
                  <stat.icon className="size-5 text-gold" />
                </div>
                <p className="mt-4 font-heading text-3xl font-bold text-gold">
                  {stat.value}
                  {stat.unit && (
                    <span className="ml-1 text-base font-normal text-muted-foreground">
                      {stat.unit}
                    </span>
                  )}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
                <p
                  className={`mt-2 text-xs font-medium ${
                    stat.trendPositive
                      ? "text-emerald-400"
                      : "text-amber-400"
                  }`}
                >
                  {stat.trend}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Interactive Market Trends (Tabbed Line Chart) ─────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Market Trends
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Philadelphia Market Over Time
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
              Toggle between metrics to explore median price, inventory levels,
              days on market, and price per square foot from January 2025 through March 2026.
            </p>
          </div>

          <div className="mt-12 rounded-xl border border-border/40 bg-cream p-6 sm:p-8">
            <InteractiveTrendChart data={trendDataSets} />
          </div>
        </div>
      </section>

      {/* ── Neighborhood Price Comparison (Bar Chart) ──────────── */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Neighborhood Data
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Median Price by Neighborhood
            </h2>
          </div>

          <div className="mt-12 rounded-xl border border-border/40 bg-white p-6 sm:p-8">
            <NeighborhoodPriceChart data={neighborhoodPriceData} />
          </div>
        </div>
      </section>

      {/* ── Price per Sqft by Neighborhood (Bar Chart) ─────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Value Comparison
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Price per Square Foot by Neighborhood
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
              Compare the cost per square foot across Philadelphia neighborhoods
              to find the best value for your budget.
            </p>
          </div>

          <div className="mt-12 rounded-xl border border-border/40 bg-cream p-6 sm:p-8">
            <NeighborhoodPricePerSqftChart data={neighborhoodPricePerSqftData} />
          </div>
        </div>
      </section>

      {/* ── Days on Market by Neighborhood (Bar Chart) ─────────── */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Market Speed
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Days on Market by Neighborhood
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
              Lower values indicate faster-moving markets with higher buyer demand.
            </p>
          </div>

          <div className="mt-12 rounded-xl border border-border/40 bg-white p-6 sm:p-8">
            <NeighborhoodDomChart data={neighborhoodDomData} />
          </div>
        </div>
      </section>

      {/* ── Market Trends / What the Numbers Mean ─────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Trends
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              What the Numbers Mean
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {trendInsights.map((insight) => (
              <div
                key={insight.title}
                className="rounded-xl border border-border/40 bg-cream p-8"
              >
                <div className="flex size-12 items-center justify-center rounded-lg bg-gold/10">
                  <insight.icon className="size-6 text-gold" />
                </div>
                <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
                  {insight.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {insight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── When to Buy / When to Sell ────────────────────────── */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Timing
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              When Should You Make Your Move?
            </h2>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {/* When to Buy */}
            <div className="rounded-xl border border-border/40 bg-white p-8">
              <div className="flex size-12 items-center justify-center rounded-lg bg-gold/10">
                <ShoppingCart className="size-6 text-gold" />
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold text-foreground">
                When to Buy
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-gold" />
                  <span>
                    <strong className="text-foreground">Winter months</strong> typically see less competition and more motivated sellers, making December through February an excellent window for buyers willing to brave the cold.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-gold" />
                  <span>
                    <strong className="text-foreground">Get pre-approved first.</strong> In Philadelphia&apos;s competitive market, sellers take pre-approved buyers more seriously. A strong offer with proof of financing wins over higher offers without it.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-gold" />
                  <span>
                    <strong className="text-foreground">Watch emerging neighborhoods.</strong> Areas like Brewerytown, Point Breeze, and Kensington offer strong appreciation potential at lower entry prices than established markets.
                  </span>
                </li>
              </ul>
            </div>

            {/* When to Sell */}
            <div className="rounded-xl border border-border/40 bg-white p-8">
              <div className="flex size-12 items-center justify-center rounded-lg bg-gold/10">
                <Banknote className="size-6 text-gold" />
              </div>
              <h3 className="mt-4 font-heading text-xl font-bold text-foreground">
                When to Sell
              </h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-gold" />
                  <span>
                    <strong className="text-foreground">Spring is king.</strong> Philadelphia&apos;s market historically peaks from March through June, when buyer activity surges and homes show best with blooming curb appeal.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-gold" />
                  <span>
                    <strong className="text-foreground">Price it right from day one.</strong> Homes priced accurately at listing receive more showings and often sell above asking. Overpriced homes sit, requiring reductions that signal desperation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-gold" />
                  <span>
                    <strong className="text-foreground">Low inventory is your friend.</strong> With active listings down 8% year-over-year, well-prepared sellers face less competition and stronger offers in today&apos;s market.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Market Snapshot Download CTA ──────────────────────── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-xl border border-gold/20 bg-cream p-10 sm:p-12">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-gold/10">
              <Download className="size-6 text-gold" />
            </div>
            <h2 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Download the Market Snapshot
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Get a comprehensive PDF of current Philadelphia market trends,
              neighborhood comparisons, and expert insights -- free and
              delivered to your inbox.
            </p>
            <div className="mt-8">
              <Link
                href="/contact?subject=market-snapshot"
                className="gold-shimmer inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-3.5 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
              >
                Request Free Snapshot
                <Download className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Want to Know What Your Home Is Worth?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Get a detailed market analysis of your property from a local Tauro
            agent -- free and with no obligation.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/home-value"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
            >
              Get Free Valuation
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/neighborhoods"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gold px-6 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-near-black"
            >
              Browse Neighborhoods
            </Link>
          </div>
        </div>
      </section>

      {/* ── Disclaimer ────────────────────────────────────────── */}
      <div className="bg-white py-6">
        <p className="mx-auto max-w-4xl px-4 text-center text-xs italic text-muted-foreground">
          Data is approximate and based on publicly available MLS records.
          Contact a Tauro agent for the most current information.
        </p>
      </div>
    </>
  );
}
