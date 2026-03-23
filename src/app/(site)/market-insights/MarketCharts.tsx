"use client";

import { useState } from "react";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";

interface DataPoint {
  label: string;
  value: number;
}

function formatPrice(v: number) {
  return `$${(v / 1000).toFixed(0)}K`;
}

function formatDays(v: number) {
  return `${v} days`;
}

function formatInventory(v: number) {
  return v.toLocaleString();
}

function formatPricePerSqft(v: number) {
  return `$${v}`;
}

export function PriceTrendChart({ data }: { data: DataPoint[] }) {
  return <LineChart data={data} formatValue={formatPrice} height={360} />;
}

export function NeighborhoodPriceChart({ data }: { data: DataPoint[] }) {
  return <BarChart data={data} formatValue={formatPrice} />;
}

export function NeighborhoodDomChart({ data }: { data: DataPoint[] }) {
  return <BarChart data={data} formatValue={formatDays} color="#1A1A2E" />;
}

export function NeighborhoodPricePerSqftChart({ data }: { data: DataPoint[] }) {
  return <BarChart data={data} formatValue={formatPricePerSqft} color="#6366F1" />;
}

/* ------------------------------------------------------------------ */
/*  Interactive multi-metric trend chart with tab switcher             */
/* ------------------------------------------------------------------ */

interface MetricDataSets {
  medianPrice: DataPoint[];
  inventory: DataPoint[];
  daysOnMarket: DataPoint[];
  pricePerSqft: DataPoint[];
}

const metrics = [
  { key: "medianPrice" as const, label: "Median Price", format: formatPrice, color: "#C9A96E" },
  { key: "inventory" as const, label: "Inventory", format: formatInventory, color: "#6366F1" },
  { key: "daysOnMarket" as const, label: "Days on Market", format: formatDays, color: "#1A1A2E" },
  { key: "pricePerSqft" as const, label: "Price / Sqft", format: formatPricePerSqft, color: "#059669" },
];

export function InteractiveTrendChart({ data }: { data: MetricDataSets }) {
  const [activeMetric, setActiveMetric] = useState<keyof MetricDataSets>("medianPrice");

  const active = metrics.find((m) => m.key === activeMetric)!;

  return (
    <div>
      {/* Tab bar */}
      <div className="mb-6 flex flex-wrap gap-2">
        {metrics.map((m) => (
          <button
            key={m.key}
            onClick={() => setActiveMetric(m.key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              activeMetric === m.key
                ? "bg-gold text-near-black shadow-sm"
                : "bg-white/80 text-muted-foreground hover:bg-white hover:text-foreground border border-border/40"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <LineChart
        data={data[activeMetric]}
        formatValue={active.format}
        height={360}
        color={active.color}
      />
    </div>
  );
}
