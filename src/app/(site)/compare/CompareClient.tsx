"use client";

import Image from "next/image";
import Link from "next/link";
import { useCompare } from "@/hooks/useCompare";
import { properties, formatPriceFull, type Property } from "@/data/properties";
import { cn } from "@/lib/utils";

// ---------- helpers ----------

function pricePerSqft(p: Property) {
  return p.sqft > 0 ? Math.round(p.price / p.sqft) : 0;
}

type BestFn = (vals: (number | null)[]) => number | null;

const lowest: BestFn = (vals) => {
  const nums = vals.filter((v): v is number => v !== null);
  return nums.length ? Math.min(...nums) : null;
};
const highest: BestFn = (vals) => {
  const nums = vals.filter((v): v is number => v !== null);
  return nums.length ? Math.max(...nums) : null;
};

interface RowDef {
  label: string;
  value: (p: Property) => string | number;
  raw: (p: Property) => number | null;
  best: BestFn;
}

const rows: RowDef[] = [
  {
    label: "Price",
    value: (p) => formatPriceFull(p.price),
    raw: (p) => p.price,
    best: lowest,
  },
  {
    label: "Price / sqft",
    value: (p) => (p.sqft > 0 ? `$${pricePerSqft(p).toLocaleString()}` : "--"),
    raw: (p) => (p.sqft > 0 ? pricePerSqft(p) : null),
    best: lowest,
  },
  {
    label: "Beds",
    value: (p) => p.beds,
    raw: (p) => p.beds,
    best: highest,
  },
  {
    label: "Baths",
    value: (p) => p.baths,
    raw: (p) => p.baths,
    best: highest,
  },
  {
    label: "Sqft",
    value: (p) => p.sqft.toLocaleString(),
    raw: (p) => p.sqft,
    best: highest,
  },
  {
    label: "Lot Size",
    value: (p) => (p.lotSqft > 0 ? `${p.lotSqft.toLocaleString()} sqft` : "--"),
    raw: (p) => (p.lotSqft > 0 ? p.lotSqft : null),
    best: highest,
  },
  {
    label: "Year Built",
    value: (p) => p.yearBuilt,
    raw: (p) => p.yearBuilt,
    best: highest,
  },
  {
    label: "Neighborhood",
    value: (p) => p.neighborhood,
    raw: () => null,
    best: () => null,
  },
  {
    label: "Status",
    value: (p) => p.status,
    raw: () => null,
    best: () => null,
  },
  {
    label: "Property Type",
    value: (p) => p.propertyType,
    raw: () => null,
    best: () => null,
  },
];

// ---------- component ----------

export default function CompareClient() {
  const { ids, remove, clear } = useCompare();

  const selected = ids
    .map((id) => properties.find((p) => p.id === id))
    .filter((p): p is Property => !!p);

  if (selected.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          Compare Properties
        </h1>
        <p className="mt-4 text-muted-foreground">
          You haven&apos;t selected any properties to compare yet. Browse
          listings and tap the compare icon to get started.
        </p>
        <Link
          href="/properties"
          className="mt-6 inline-block rounded-lg bg-gold px-6 py-3 font-semibold text-near-black transition hover:bg-gold-light"
        >
          Browse Properties
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          Compare Properties
        </h1>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={clear}
            className="text-sm text-muted-foreground underline underline-offset-2 transition hover:text-foreground"
          >
            Clear All
          </button>
          <Link
            href="/properties"
            className="rounded-lg border border-gold/60 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-gold/10"
          >
            + Add Property
          </Link>
        </div>
      </div>

      {/* Table — horizontal scroll on mobile */}
      <div className="overflow-x-auto rounded-xl border border-border/60 bg-white shadow-sm">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          {/* Images row */}
          <thead>
            <tr>
              <th className="sticky left-0 z-10 w-36 bg-white p-0" />
              {selected.map((p) => (
                <th key={p.id} className="p-4 align-top font-normal">
                  <div className="relative mx-auto aspect-[4/3] w-full max-w-[260px] overflow-hidden rounded-lg">
                    <Image
                      src={p.images[0]}
                      alt={p.address}
                      fill
                      className="object-cover"
                      sizes="260px"
                    />
                  </div>
                  <p className="mt-2 text-center font-heading text-sm font-semibold text-foreground">
                    {p.address}
                  </p>
                  <p className="text-center text-xs text-muted-foreground">
                    {p.city}, {p.state} {p.zip}
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <Link
                      href={`/properties/${p.slug}`}
                      className="rounded-md bg-gold/90 px-3 py-1.5 text-xs font-semibold text-near-black transition hover:bg-gold"
                    >
                      View Listing
                    </Link>
                    <button
                      type="button"
                      onClick={() => remove(p.id)}
                      className="rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Data rows */}
          <tbody>
            {rows.map((row, ri) => {
              const rawVals = selected.map((p) => row.raw(p));
              const bestVal = row.best(rawVals);

              return (
                <tr
                  key={row.label}
                  className={cn(ri % 2 === 0 ? "bg-muted/30" : "bg-white")}
                >
                  <td className="sticky left-0 z-10 whitespace-nowrap border-r border-border/40 bg-inherit px-4 py-3 font-medium text-foreground">
                    {row.label}
                  </td>
                  {selected.map((p, ci) => {
                    const raw = rawVals[ci];
                    const isBest =
                      bestVal !== null && raw !== null && raw === bestVal;
                    return (
                      <td
                        key={p.id}
                        className={cn(
                          "px-4 py-3 text-center",
                          isBest
                            ? "font-semibold text-gold-dark"
                            : "text-muted-foreground"
                        )}
                      >
                        <span
                          className={cn(
                            isBest &&
                              "inline-block rounded-md bg-gold/15 px-2 py-0.5"
                          )}
                        >
                          {row.value(p)}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
