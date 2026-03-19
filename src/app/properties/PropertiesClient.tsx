"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { LayoutGrid, Map, Bookmark, Check } from "lucide-react";
import type { Property } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters, { FilterState } from "@/components/PropertyFilters";
import PropertyMap from "@/components/PropertyMap";
import { cn } from "@/lib/utils";
import { useSavedSearches, hasActiveFilters } from "@/hooks/useSavedSearches";

type ViewMode = "grid" | "map";

export default function PropertiesClient({
  properties,
  neighborhoods = [],
}: {
  properties: Property[];
  neighborhoods?: { id: string; name: string; propertyFilter: string }[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [view, setView] = useState<ViewMode>("grid");

  const filters: FilterState = useMemo(() => ({
    priceMin: searchParams.get("priceMin") || "",
    priceMax: searchParams.get("priceMax") || "",
    beds: searchParams.get("beds") || "",
    baths: searchParams.get("baths") || "",
    sqftMin: searchParams.get("sqftMin") || "",
    sqftMax: searchParams.get("sqftMax") || "",
    area: searchParams.get("area") || "",
    propertyType: searchParams.get("type") || "",
    status: searchParams.get("status") || "",
    sort: searchParams.get("sort") || "price-desc",
  }), [searchParams]);

  const updateFilter = useCallback((key: keyof FilterState, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const paramKey = key === "propertyType" ? "type" : key;
    if (value && !(key === "sort" && value === "price-desc")) {
      params.set(paramKey, value);
    } else {
      params.delete(paramKey);
    }
    const qs = params.toString();
    router.replace(`/properties${qs ? `?${qs}` : ""}`, { scroll: false });
  }, [searchParams, router]);

  const clearFilters = useCallback(() => {
    router.replace("/properties", { scroll: false });
  }, [router]);

  const { save: saveSearch } = useSavedSearches();
  const [justSaved, setJustSaved] = useState(false);
  const filtersActive = hasActiveFilters(filters);

  const handleSaveSearch = useCallback(() => {
    saveSearch(filters);
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 2000);
  }, [filters, saveSearch]);

  const searchQuery = searchParams.get("search") || "";

  const filtered = useMemo(() => {
    let result = [...properties];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.address.toLowerCase().includes(q) ||
          p.neighborhood.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.zip.includes(q)
      );
    }
    if (filters.priceMin) result = result.filter((p) => p.price >= Number(filters.priceMin));
    if (filters.priceMax) result = result.filter((p) => p.price <= Number(filters.priceMax));
    if (filters.beds) result = result.filter((p) => p.beds >= Number(filters.beds));
    if (filters.baths) result = result.filter((p) => p.baths >= Number(filters.baths));
    if (filters.sqftMin) result = result.filter((p) => p.sqft >= Number(filters.sqftMin));
    if (filters.sqftMax) result = result.filter((p) => p.sqft <= Number(filters.sqftMax));
    if (filters.area) result = result.filter((p) => p.neighborhood === filters.area);
    if (filters.propertyType) result = result.filter((p) => p.propertyType === filters.propertyType);
    if (filters.status) result = result.filter((p) => p.status === filters.status);
    switch (filters.sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "newest": result.sort((a, b) => b.yearBuilt - a.yearBuilt); break;
      case "sqft": result.sort((a, b) => b.sqft - a.sqft); break;
    }
    return result;
  }, [filters, properties, searchQuery]);

  return (
    <div className="min-h-screen pt-16">
      <div className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
          <div className="min-w-0">
            <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">Properties</h1>
            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              {filtered.length} {filtered.length === 1 ? "listing" : "listings"} available
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            {filtersActive && (
              <button
                onClick={handleSaveSearch}
                disabled={justSaved}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                  justSaved
                    ? "border-green-300 bg-green-50 text-green-700"
                    : "border-gold/30 bg-gold/10 text-gold hover:bg-gold/20"
                )}
              >
                {justSaved ? <Check className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                <span className="hidden sm:inline">{justSaved ? "Saved!" : "Save This Search"}</span>
              </button>
            )}
          <div className="flex items-center gap-1 rounded-lg border border-border p-1">
            <button onClick={() => setView("grid")} className={cn("rounded-md p-2.5 transition-colors", view === "grid" ? "bg-gold text-near-black" : "text-muted-foreground hover:text-foreground")} aria-label="Grid view"><LayoutGrid className="h-4 w-4" /></button>
            <button onClick={() => setView("map")} className={cn("rounded-md p-2.5 transition-colors", view === "map" ? "bg-gold text-near-black" : "text-muted-foreground hover:text-foreground")} aria-label="Map view"><Map className="h-4 w-4" /></button>
          </div>
          </div>
        </div>
      </div>
      <PropertyFilters filters={filters} onChange={updateFilter} onClear={clearFilters} neighborhoods={neighborhoods} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {view === "grid" ? (
          filtered.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {filtered.map((p) => (<PropertyCard key={p.id} property={p} />))}
            </div>
          ) : (
            <div className="py-16 text-center sm:py-20">
              <p className="text-base text-muted-foreground sm:text-lg">No properties match your filters.</p>
              <button onClick={clearFilters} className="mt-4 min-h-[44px] text-sm font-medium text-gold hover:text-gold-light">Clear all filters</button>
            </div>
          )
        ) : (
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="order-1 lg:order-1">
              <div className="h-[50vh] min-h-[300px] sm:min-h-[400px] lg:h-[calc(100vh-16rem)] lg:min-h-[500px]">
                <PropertyMap properties={filtered} onPropertyClick={(slug) => router.push(`/properties/${slug}`)} />
              </div>
            </div>
            <div className="order-2 space-y-4 lg:order-2 lg:max-h-[calc(100vh-16rem)] lg:overflow-y-auto">
              {filtered.map((p) => (<PropertyCard key={p.id} property={p} />))}
            </div>
          </div>
        )}

        {/* MLS Disclaimer */}
        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs leading-relaxed text-muted-foreground">
            Listing information deemed reliable but not guaranteed. All
            measurements are approximate. Data sourced from Bright MLS.
            Information is provided exclusively for consumers&apos; personal,
            non-commercial use and may not be used for any purpose other than to
            identify prospective properties consumers may be interested in
            purchasing.
          </p>
        </div>
      </div>
    </div>
  );
}
