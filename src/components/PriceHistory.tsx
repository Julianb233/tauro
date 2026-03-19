"use client";

import { formatPriceFull } from "@/data/properties";

interface PriceHistoryEntry {
  date: string;
  price: number;
  event: string;
}

export default function PriceHistory({ history }: { history: PriceHistoryEntry[] }) {
  if (!history || history.length === 0) return null;

  const sorted = [...history].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T12:00:00");
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div>
      <h2 className="font-heading text-xl font-bold">Price History</h2>
      <div className="mt-4 rounded-xl border border-border bg-card p-6">
        <div className="relative">
          {sorted.map((entry, i) => {
            const isLast = i === sorted.length - 1;
            const isFirst = i === 0;

            return (
              <div key={entry.date + entry.event} className="relative flex gap-4">
                {/* Timeline line + dot */}
                <div className="flex flex-col items-center">
                  {/* Dot */}
                  <div
                    className={`relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                      isLast
                        ? "border-gold bg-gold"
                        : "border-gold bg-card"
                    }`}
                  >
                    {isLast && (
                      <div className="h-1.5 w-1.5 rounded-full bg-near-black" />
                    )}
                  </div>
                  {/* Connecting line */}
                  {!isLast && (
                    <div className="w-0.5 flex-1 bg-gold/40" />
                  )}
                </div>

                {/* Content */}
                <div className={`flex-1 ${isLast ? "pb-0" : "pb-6"}`}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <div>
                      <span
                        className={`inline-block rounded-md px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${
                          entry.event === "Listed"
                            ? "bg-emerald-600/20 text-emerald-400"
                            : entry.event === "Price Reduced"
                              ? "bg-orange-500/20 text-orange-400"
                              : entry.event === "Pending"
                                ? "bg-blue-600/20 text-blue-400"
                                : "bg-gold/20 text-gold"
                        }`}
                      >
                        {entry.event}
                      </span>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDate(entry.date)}
                      </p>
                    </div>
                    <p
                      className={`font-heading text-lg font-bold ${
                        isLast ? "text-gold" : "text-muted-foreground line-through"
                      }`}
                    >
                      {formatPriceFull(entry.price)}
                    </p>
                  </div>
                  {/* Price change indicator */}
                  {!isFirst && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {entry.price < sorted[i - 1].price
                        ? `${String.fromCharCode(8595)} ${formatPriceFull(sorted[i - 1].price - entry.price)} decrease`
                        : entry.price > sorted[i - 1].price
                          ? `${String.fromCharCode(8593)} ${formatPriceFull(entry.price - sorted[i - 1].price)} increase`
                          : "No change"}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
