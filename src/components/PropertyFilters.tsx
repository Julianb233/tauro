"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { neighborhoods } from "@/data/neighborhoods";

export interface FilterState {
  priceMin: string;
  priceMax: string;
  beds: string;
  baths: string;
  sqftMin: string;
  sqftMax: string;
  area: string;
  propertyType: string;
  status: string;
  sort: string;
}

export const defaultFilters: FilterState = {
  priceMin: "",
  priceMax: "",
  beds: "",
  baths: "",
  sqftMin: "",
  sqftMax: "",
  area: "",
  propertyType: "",
  status: "",
  sort: "price-desc",
};

export default function PropertyFilters({
  filters,
  onChange,
  onClear,
}: {
  filters: FilterState;
  onChange: (key: keyof FilterState, value: string) => void;
  onClear: () => void;
}) {
  const [open, setOpen] = useState(false);

  const update = (key: keyof FilterState, value: string) => onChange(key, value);

  const clearAll = () => onClear();

  const activeCount = Object.entries(filters).filter(
    ([k, v]) => v && k !== "sort" && v !== defaultFilters[k as keyof FilterState]
  ).length;

  const selectClasses =
    "w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";

  return (
    <div className="border-b border-border bg-cream/80 backdrop-blur-sm">
      {/* Mobile toggle */}
      <div className="flex items-center justify-between px-4 py-3 lg:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters {activeCount > 0 && `(${activeCount})`}
        </button>
        <select
          value={filters.sort}
          onChange={(e) => update("sort", e.target.value)}
          className={selectClasses + " w-auto"}
        >
          <option value="price-desc">Price: High to Low</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="newest">Newest</option>
          <option value="sqft">Largest</option>
        </select>
      </div>

      {/* Filter bar */}
      <div
        className={`${open ? "block" : "hidden"} px-4 pb-4 lg:flex lg:items-end lg:gap-3 lg:px-6 lg:py-4`}
      >
        <div className="grid grid-cols-2 gap-3 lg:flex lg:items-end lg:gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Min Price
            </label>
            <select
              value={filters.priceMin}
              onChange={(e) => update("priceMin", e.target.value)}
              className={selectClasses}
            >
              <option value="">No Min</option>
              <option value="500000">$500K</option>
              <option value="1000000">$1M</option>
              <option value="2000000">$2M</option>
              <option value="3000000">$3M</option>
              <option value="5000000">$5M</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Max Price
            </label>
            <select
              value={filters.priceMax}
              onChange={(e) => update("priceMax", e.target.value)}
              className={selectClasses}
            >
              <option value="">No Max</option>
              <option value="1000000">$1M</option>
              <option value="2000000">$2M</option>
              <option value="3000000">$3M</option>
              <option value="5000000">$5M</option>
              <option value="10000000">$10M</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Beds</label>
            <select
              value={filters.beds}
              onChange={(e) => update("beds", e.target.value)}
              className={selectClasses}
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Baths</label>
            <select
              value={filters.baths}
              onChange={(e) => update("baths", e.target.value)}
              className={selectClasses}
            >
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Min Sqft
            </label>
            <select
              value={filters.sqftMin}
              onChange={(e) => update("sqftMin", e.target.value)}
              className={selectClasses}
            >
              <option value="">No Min</option>
              <option value="1000">1,000 SF</option>
              <option value="1500">1,500 SF</option>
              <option value="2000">2,000 SF</option>
              <option value="3000">3,000 SF</option>
              <option value="4000">4,000 SF</option>
              <option value="5000">5,000 SF</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Max Sqft
            </label>
            <select
              value={filters.sqftMax}
              onChange={(e) => update("sqftMax", e.target.value)}
              className={selectClasses}
            >
              <option value="">No Max</option>
              <option value="2000">2,000 SF</option>
              <option value="3000">3,000 SF</option>
              <option value="4000">4,000 SF</option>
              <option value="5000">5,000 SF</option>
              <option value="7000">7,000 SF</option>
              <option value="10000">10,000 SF</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Area</label>
            <select
              value={filters.area}
              onChange={(e) => update("area", e.target.value)}
              className={selectClasses}
            >
              <option value="">All Areas</option>
              {neighborhoods.map((n) => (
                <option key={n.id} value={n.propertyFilter}>{n.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Type</label>
            <select
              value={filters.propertyType}
              onChange={(e) => update("propertyType", e.target.value)}
              className={selectClasses}
            >
              <option value="">All Types</option>
              <option value="Single Family">Single Family</option>
              <option value="Condo">Condo</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Multi-Family">Multi-Family</option>
              <option value="Land">Land</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Status</label>
            <select
              value={filters.status}
              onChange={(e) => update("status", e.target.value)}
              className={selectClasses}
            >
              <option value="">All</option>
              <option value="Active">Active</option>
              <option value="New">New</option>
              <option value="Open House">Open House</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3 lg:mt-0 lg:ml-auto">
          {activeCount > 0 && (
            <button
              onClick={clearAll}
              className="text-sm font-medium text-gold hover:text-gold-light"
            >
              Clear All
            </button>
          )}
          <div className="hidden lg:block">
            <select
              value={filters.sort}
              onChange={(e) => update("sort", e.target.value)}
              className={selectClasses + " w-auto"}
            >
              <option value="price-desc">Price: High to Low</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="newest">Newest</option>
              <option value="sqft">Largest</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
