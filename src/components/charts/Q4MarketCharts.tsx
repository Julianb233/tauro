"use client";

import { LineChart } from "./LineChart";
import { BarChart } from "./BarChart";
import { monthlyTrend, neighborhoods } from "@/data/market-data";

const formatMonth = (m: string) => m.replace("20", "'");

/* Q4 2025 = Oct 2025 through Dec 2025, plus surrounding context */
const q4TrendData = monthlyTrend
  .filter((d) => {
    // Show Jul 2025 through Mar 2026 for context around Q4
    const idx = monthlyTrend.indexOf(d);
    return idx >= 6; // Jul 2025 onward
  })
  .map((d) => ({ label: formatMonth(d.month), value: d.medianPrice }));

const neighborhoodPriceData = neighborhoods.map((n) => ({
  label: n.name,
  value: n.medianPrice,
}));

const neighborhoodDomData = neighborhoods.map((n) => ({
  label: n.name,
  value: n.daysOnMarket,
}));

export function Q4PriceTrendChart() {
  return (
    <div className="my-10 rounded-xl border border-border/40 bg-cream p-6">
      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Price Trend
      </p>
      <p className="mb-4 font-heading text-lg font-bold text-foreground">
        Median Home Price: Jul 2025 &ndash; Mar 2026
      </p>
      <LineChart
        data={q4TrendData}
        formatValue={(v) => `$${(v / 1000).toFixed(0)}K`}
        height={320}
      />
    </div>
  );
}

export function Q4NeighborhoodPriceChart() {
  return (
    <div className="my-10 rounded-xl border border-border/40 bg-cream p-6">
      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Neighborhood Comparison
      </p>
      <p className="mb-4 font-heading text-lg font-bold text-foreground">
        Median Price by Neighborhood
      </p>
      <BarChart
        data={neighborhoodPriceData}
        formatValue={(v) => `$${(v / 1000).toFixed(0)}K`}
      />
    </div>
  );
}

export function Q4NeighborhoodDomChart() {
  return (
    <div className="my-10 rounded-xl border border-border/40 bg-cream p-6">
      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Market Speed
      </p>
      <p className="mb-4 font-heading text-lg font-bold text-foreground">
        Average Days on Market by Neighborhood
      </p>
      <BarChart
        data={neighborhoodDomData}
        formatValue={(v) => `${v} days`}
        color="#1A1A2E"
      />
    </div>
  );
}
