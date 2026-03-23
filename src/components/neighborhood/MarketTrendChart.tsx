"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { MonthlyTrendPoint } from "@/data/neighborhoods";

function formatPrice(value: number) {
  return `$${(value / 1000).toFixed(0)}K`;
}

export function MarketTrendChart({
  data,
  neighborhoodName,
}: {
  data: MonthlyTrendPoint[];
  neighborhoodName: string;
}) {
  if (!data || data.length === 0) return null;

  return (
    <section className="border-t border-border/40 bg-cream py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
          Market Trends
        </p>
        <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
          {neighborhoodName} Price History
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Median sale price over the last 12 months
        </p>

        <div className="mt-8 rounded-xl border border-border/40 bg-card p-4 sm:p-6">
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C5A572" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#C5A572" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
                tickFormatter={(v) => {
                  const parts = v.split(" ");
                  return `${parts[0]} '${parts[1]?.slice(2)}`;
                }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatPrice}
                width={60}
              />
              <Tooltip
                formatter={(value) => [formatPrice(Number(value)), "Median Price"]}
                labelStyle={{ fontWeight: 600, color: "#1a202c" }}
                contentStyle={{
                  borderRadius: 8,
                  border: "1px solid #e5e5e5",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              />
              <Area
                type="monotone"
                dataKey="medianPrice"
                stroke="#C5A572"
                strokeWidth={2.5}
                fill="url(#goldGradient)"
                dot={false}
                activeDot={{ r: 5, fill: "#C5A572", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
