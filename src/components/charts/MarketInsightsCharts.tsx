"use client";

import { LineChart, type LineChartDataPoint } from "./LineChart";
import { BarChart, type BarChartDataPoint } from "./BarChart";

export function PriceTrendChart({ data }: { data: LineChartDataPoint[] }) {
  return (
    <LineChart
      data={data}
      formatValue={(v) => `$${(v / 1000).toFixed(0)}K`}
      height={360}
    />
  );
}

export function NeighborhoodPriceChart({ data }: { data: BarChartDataPoint[] }) {
  return (
    <BarChart
      data={data}
      formatValue={(v) => `$${(v / 1000).toFixed(0)}K`}
    />
  );
}

export function DomChart({ data }: { data: BarChartDataPoint[] }) {
  return (
    <BarChart
      data={data}
      formatValue={(v) => `${v} days`}
      color="#1A1A2E"
    />
  );
}
