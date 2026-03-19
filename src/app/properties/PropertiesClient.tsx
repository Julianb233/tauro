"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { LayoutGrid, Map } from "lucide-react";
import type { Property } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import PropertyFilters, { FilterState } from "@/components/PropertyFilters";
import PropertyMap from "@/components/PropertyMap";
import { cn } from "@/lib/utils";

type ViewMode = "grid" | "map";

export default function PropertiesClient({
  properties,
}: {
  properties: Property[];
}) {
  const PAGE_SIZE = 12;
  const searchParams = useSearchParams();
  const router = useRouter();
  const [view, setView] = useState<ViewMode>("grid");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

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

  const filtered = useMemo(() => {
    // Reset visible count when filters change
    setVisibleCount(PAGE_SIZE);
    let result = [...properties];
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, properties]);

  const visibleProperties = useMemo(
    () => filtered.slice(0, visibleCount),
    [filtered, visibleCount],
  );
  const hasMore = visibleCount < filtered.length;

  return (
    <div className="min-h-screen pt-16">
      <div className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Properties</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "listing" : "listings"} available
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-lg border border-border p-1">
            <button onClick={() => setView("grid")} className={cn("rounded-md p-2 transition-colors", view === "grid" ? "bg-gold text-near-black" : "text-muted-foreground hover:text-foreground")} aria-label="Grid view"><LayoutGrid className="h-4 w-4" /></button>
            <button onClick={() => setView("map")} className={cn("rounded-md p-2 transition-colors", view === "map" ? "bg-gold text-near-black" : "text-muted-foreground hover:text-foreground")} aria-label="Map view"><Map className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
      <PropertyFilters filters={filters} onChange={updateFilter} onClear={clearFilters} />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {view === "grid" ? (
          filtered.length > 0 ? (
            <div className="space-y-8">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visibleProperties.map((p) => (<PropertyCard key={p.id} property={p} />))}
              </div>

              {/* Pagination footer */}
              <div className="flex flex-col items-center gap-4 pt-4">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-semibold text-foreground">{visibleProperties.length}</span> of{" "}
                  <span className="font-semibold text-foreground">{filtered.length}</span> properties
                </p>
                {hasMore && (
                  <button
                    onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                    className="rounded-md border border-gold/30 bg-gold/5 px-8 py-3 text-sm font-semibold text-gold transition-all hover:border-gold hover:bg-gold/10 hover:shadow-lg hover:shadow-gold/5"
                  >
                    Load More Properties
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">No properties match your filters.</p>
              <button onClick={clearFilters} className="mt-4 text-sm font-medium text-gold hover:text-gold-light">Clear all filters</button>
            </div>
          )
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="order-2 lg:order-1">
              <div className="min-h-[500px] h-[calc(100vh-16rem)]">
                <PropertyMap properties={filtered} onPropertyClick={(slug) => router.push(`/properties/${slug}`)} />
              </div>
            </div>
            <div className="order-1 space-y-4 lg:order-2 lg:max-h-[calc(100vh-16rem)] lg:overflow-y-auto">
              {filtered.map((p) => (<PropertyCard key={p.id} property={p} />))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
