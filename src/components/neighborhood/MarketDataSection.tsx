"use client";

import { DollarSign, TrendingUp, Clock, Home, BarChart3 } from "lucide-react";
import CountUp from "@/components/animations/CountUp";
import type { MarketData } from "@/data/neighborhoods";

const stats = [
  { key: "medianPrice" as const, label: "Median Price", icon: DollarSign },
  { key: "avgPricePerSqft" as const, label: "Price / Sq Ft", icon: TrendingUp },
  { key: "medianDaysOnMarket" as const, label: "Days on Market", icon: Clock, format: (v: number) => String(v) },
  { key: "activeListings" as const, label: "Active Listings", icon: Home, format: (v: number) => String(v) },
  { key: "priceChange12m" as const, label: "12-Month Change", icon: BarChart3 },
];

export function MarketDataSection({
  marketData,
  neighborhoodName,
}: {
  marketData: MarketData;
  neighborhoodName: string;
}) {
  const isPositive = marketData.priceChange12m.startsWith("+");

  return (
    <section className="border-t border-border/40 bg-foreground py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
          Market Data
        </p>
        <h2 className="mt-2 font-heading text-3xl font-bold text-white">
          {neighborhoodName} by the Numbers
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map(({ key, label, icon: Icon }) => {
            const raw = marketData[key];
            const displayValue = String(raw);
            const isPriceChange = key === "priceChange12m";

            return (
              <div
                key={key}
                className="glass-stat rounded-xl p-6 text-center transition-transform duration-300 hover:scale-[1.03]"
              >
                <Icon className="mx-auto size-6 text-gold/70" strokeWidth={1.5} />
                <div className="mt-3 flex items-center justify-center gap-1.5">
                  {isPriceChange && (
                    <span
                      className={`text-lg ${isPositive ? "text-emerald-400" : "text-red-400"}`}
                    >
                      {isPositive ? "\u2191" : "\u2193"}
                    </span>
                  )}
                  <CountUp
                    value={displayValue}
                    className={`font-heading text-2xl font-bold ${
                      isPriceChange
                        ? isPositive
                          ? "text-emerald-400"
                          : "text-red-400"
                        : "text-gold"
                    }`}
                  />
                </div>
                <p className="mt-1 text-sm text-white/90">{label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
