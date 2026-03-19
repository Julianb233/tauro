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
} from "lucide-react";

export const metadata: Metadata = {
  title: "Philadelphia Market Insights | Tauro Realty",
  description:
    "Data-driven Philadelphia real estate market statistics, neighborhood price trends, and insights to help you make smarter buying and selling decisions.",
};

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const keyStats = [
  {
    label: "Median Home Price",
    value: "$285,000",
    trend: "Up 4.2% YoY",
    trendPositive: true,
    icon: TrendingUp,
  },
  {
    label: "Avg Days on Market",
    value: "28",
    unit: "days",
    trend: "Down 3 days YoY",
    trendPositive: true,
    icon: Clock,
  },
  {
    label: "Active Inventory",
    value: "3,450",
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

const neighborhoodData = [
  { name: "Center City", medianPrice: "$425,000", yoyChange: 3.8, avgDom: 22, homesSold: 890 },
  { name: "Rittenhouse Square", medianPrice: "$520,000", yoyChange: 2.5, avgDom: 18, homesSold: 320 },
  { name: "Fishtown", medianPrice: "$385,000", yoyChange: 6.1, avgDom: 15, homesSold: 450 },
  { name: "Northern Liberties", medianPrice: "$395,000", yoyChange: 5.2, avgDom: 17, homesSold: 280 },
  { name: "Graduate Hospital", medianPrice: "$410,000", yoyChange: 4.9, avgDom: 19, homesSold: 310 },
  { name: "Manayunk", medianPrice: "$310,000", yoyChange: 3.2, avgDom: 25, homesSold: 380 },
  { name: "Chestnut Hill", medianPrice: "$475,000", yoyChange: 2.1, avgDom: 32, homesSold: 190 },
  { name: "South Philadelphia", medianPrice: "$295,000", yoyChange: 4.5, avgDom: 24, homesSold: 620 },
  { name: "University City", medianPrice: "$340,000", yoyChange: 3.7, avgDom: 21, homesSold: 350 },
  { name: "Kensington", medianPrice: "$225,000", yoyChange: 7.8, avgDom: 20, homesSold: 410 },
  { name: "Mount Airy", medianPrice: "$290,000", yoyChange: 3.0, avgDom: 30, homesSold: 270 },
  { name: "Old City", medianPrice: "$445,000", yoyChange: 2.8, avgDom: 26, homesSold: 180 },
  { name: "Brewerytown", medianPrice: "$280,000", yoyChange: 8.2, avgDom: 16, homesSold: 240 },
  { name: "East Falls", medianPrice: "$320,000", yoyChange: 3.5, avgDom: 28, homesSold: 160 },
  { name: "Germantown", medianPrice: "$195,000", yoyChange: 5.5, avgDom: 35, homesSold: 340 },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function MarketInsightsPage() {
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
            Philadelphia Real Estate Market Report
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/60">
            Data-driven insights to help you make smarter real estate decisions.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">
            Data reflects approximate market conditions as of Q1 2025
          </p>
        </div>
      </section>

      {/* ── Key Market Stats ──────────────────────────────────── */}
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

      {/* ── Neighborhood Data Table ───────────────────────────── */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Neighborhood Data
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Price Trends by Neighborhood
            </h2>
          </div>

          <div className="mt-12 overflow-x-auto rounded-xl border border-border/40">
            <table className="w-full">
              <thead>
                <tr className="bg-white text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3.5 font-medium">Neighborhood</th>
                  <th className="px-4 py-3.5 font-medium">Median Price</th>
                  <th className="px-4 py-3.5 font-medium">YoY Change</th>
                  <th className="px-4 py-3.5 font-medium">Avg DOM</th>
                  <th className="px-4 py-3.5 font-medium">
                    Homes Sold (2024)
                  </th>
                </tr>
              </thead>
              <tbody>
                {neighborhoodData.map((row) => (
                  <tr
                    key={row.name}
                    className="border-b border-border/20 transition-colors hover:bg-white/50"
                  >
                    <td className="px-4 py-3.5 text-sm font-medium text-foreground">
                      {row.name}
                    </td>
                    <td className="px-4 py-3.5 text-sm font-semibold text-foreground">
                      {row.medianPrice}
                    </td>
                    <td className="px-4 py-3.5 text-sm font-medium text-emerald-400">
                      +{row.yoyChange}%
                    </td>
                    <td className="px-4 py-3.5 text-sm text-foreground">
                      {row.avgDom} days
                    </td>
                    <td className="px-4 py-3.5 text-sm text-foreground">
                      {row.homesSold.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs italic text-muted-foreground">
            Data is approximate and based on publicly available MLS records.
            Contact a Tauro agent for the most current information.
          </p>
        </div>
      </section>

      {/* ── When to Buy / When to Sell ────────────────────────── */}
      <section className="bg-white py-20">
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
            <div className="rounded-xl border border-border/40 bg-cream p-8">
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
                    <strong className="text-white">Winter months</strong> typically see less competition and more motivated sellers, making December through February an excellent window for buyers willing to brave the cold.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-gold" />
                  <span>
                    <strong className="text-white">Get pre-approved first.</strong> In Philadelphia&apos;s competitive market, sellers take pre-approved buyers more seriously. A strong offer with proof of financing wins over higher offers without it.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-gold" />
                  <span>
                    <strong className="text-white">Watch emerging neighborhoods.</strong> Areas like Brewerytown, Point Breeze, and Kensington offer strong appreciation potential at lower entry prices than established markets.
                  </span>
                </li>
              </ul>
            </div>

            {/* When to Sell */}
            <div className="rounded-xl border border-border/40 bg-cream p-8">
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
                    <strong className="text-white">Spring is king.</strong> Philadelphia&apos;s market historically peaks from March through June, when buyer activity surges and homes show best with blooming curb appeal.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-gold" />
                  <span>
                    <strong className="text-white">Price it right from day one.</strong> Homes priced accurately at listing receive more showings and often sell above asking. Overpriced homes sit, requiring reductions that signal desperation.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-gold" />
                  <span>
                    <strong className="text-white">Low inventory is your friend.</strong> With active listings down 8% year-over-year, well-prepared sellers face less competition and stronger offers in today&apos;s market.
                  </span>
                </li>
              </ul>
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
    </>
  );
}
