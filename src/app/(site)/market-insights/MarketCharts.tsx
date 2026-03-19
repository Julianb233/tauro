"use client";

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

export function PriceTrendChart({ data }: { data: DataPoint[] }) {
  return <LineChart data={data} formatValue={formatPrice} height={360} />;
}

export function NeighborhoodPriceChart({ data }: { data: DataPoint[] }) {
  return <BarChart data={data} formatValue={formatPrice} />;
}

export function NeighborhoodDomChart({ data }: { data: DataPoint[] }) {
  return <BarChart data={data} formatValue={formatDays} color="#1A1A2E" />;
}
