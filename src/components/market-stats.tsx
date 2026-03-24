import { DollarSign, TrendingUp, Clock, BarChart3 } from "lucide-react";
import type { Neighborhood } from "@/data/neighborhoods";

const statConfig = [
  { key: "medianPrice" as const, label: "Median Price", icon: DollarSign },
  { key: "avgPricePerSqft" as const, label: "Avg $/Sqft", icon: TrendingUp },
  {
    key: "avgDaysOnMarket" as const,
    label: "Avg Days on Market",
    icon: Clock,
  },
  {
    key: "inventoryLevel" as const,
    label: "Inventory Level",
    icon: BarChart3,
  },
];

export function MarketStats({
  stats,
  neighborhoodName,
}: {
  stats: Neighborhood["stats"];
  neighborhoodName: string;
}) {
  return (
    <section className="border-t border-border/40 bg-foreground py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
          Market Data
        </p>
        <h2 className="mt-2 font-heading text-3xl font-bold text-white">
          {neighborhoodName} by the Numbers
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statConfig.map(({ key, label, icon: Icon }) => (
            <div
              key={key}
              className="group glass-stat rounded-xl p-6 text-center"
            >
              <div className="icon-ring mx-auto size-12 rounded-xl">
                <Icon className="size-5 text-gold icon-hover-gold" strokeWidth={1.5} />
              </div>
              <p className="mt-4 font-heading text-2xl font-bold text-gold-gradient">
                {stats[key]}
              </p>
              <p className="mt-1 text-sm font-medium text-white/70">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
