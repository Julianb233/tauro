"use client";

import { useState, useMemo } from "react";
import { LayoutGrid, Map } from "lucide-react";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters, { FilterState, defaultFilters } from "@/components/PropertyFilters";
import MapPlaceholder from "@/components/MapPlaceholder";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "map";

export default function PropertiesPage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [view, setView] = useState<ViewMode>("grid");

  const filtered = useMemo(() => {
    let result = [...properties];

    if (filters.priceMin) {
      result = result.filter((p) => p.price >= Number(filters.priceMin));
    }
    if (filters.priceMax) {
      result = result.filter((p) => p.price <= Number(filters.priceMax));
    }
    if (filters.beds) {
      result = result.filter((p) => p.beds >= Number(filters.beds));
    }
    if (filters.baths) {
      result = result.filter((p) => p.baths >= Number(filters.baths));
    }
    if (filters.propertyType) {
      result = result.filter((p) => p.propertyType === filters.propertyType);
    }
    if (filters.status) {
      result = result.filter((p) => p.status === filters.status);
    }

    switch (filters.sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => b.yearBuilt - a.yearBuilt);
        break;
      case "sqft":
        result.sort((a, b) => b.sqft - a.sqft);
        break;
    }

    return result;
  }, [filters]);

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <div className="border-b border-border bg-near-black">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Properties</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "listing" : "listings"} available
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-border p-1">
            <button
              onClick={() => setView("grid")}
              className={cn(
                "rounded-md p-2 transition-colors",
                view === "grid"
                  ? "bg-gold text-near-black"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("map")}
              className={cn(
                "rounded-md p-2 transition-colors",
                view === "map"
                  ? "bg-gold text-near-black"
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label="Map view"
            >
              <Map className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <PropertyFilters filters={filters} onChange={setFilters} />

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {view === "grid" ? (
          filtered.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">
                No properties match your filters.
              </p>
              <button
                onClick={() => setFilters(defaultFilters)}
                className="mt-4 text-sm font-medium text-gold hover:text-gold-light"
              >
                Clear all filters
              </button>
            </div>
          )
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="order-2 lg:order-1">
              <MapPlaceholder properties={filtered} />
            </div>
            <div className="order-1 space-y-4 lg:order-2 lg:max-h-[calc(100vh-16rem)] lg:overflow-y-auto">
              {filtered.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
