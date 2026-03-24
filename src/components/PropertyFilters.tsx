"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import PriceRangeSlider from "@/components/PriceRangeSlider";
interface NeighborhoodOption {
  id: string;
  name: string;
  propertyFilter: string;
}

export interface FilterState {
  priceMin: string;
  priceMax: string;
  beds: string;
  baths: string;
  sqftMin: string;
  sqftMax: string;
  /** AI-3870: Lot size filter */
  lotSizeMin: string;
  lotSizeMax: string;
  area: string;
  propertyType: string;
  status: string;
  sort: string;
  /** AI-3874: Open house date filter */
  openHouse: string;
  /** AI-3805: Virtual tour filter */
  virtualTour: string;
  /** AI-3806: New construction filter */
  newConstruction: string;
  /** AI-3807: Year built range filter */
  yearBuiltMin: string;
  yearBuiltMax: string;
}

export const defaultFilters: FilterState = {
  priceMin: "",
  priceMax: "",
  beds: "",
  baths: "",
  sqftMin: "",
  sqftMax: "",
  lotSizeMin: "",
  lotSizeMax: "",
  area: "",
  propertyType: "",
  status: "",
  sort: "price-desc",
  openHouse: "",
  virtualTour: "",
  newConstruction: "",
  yearBuiltMin: "",
  yearBuiltMax: "",
};

export default function PropertyFilters({
  filters,
  onChange,
  onClear,
  neighborhoods = [],
}: {
  filters: FilterState;
  onChange: (key: keyof FilterState, value: string) => void;
  onClear: () => void;
  neighborhoods?: NeighborhoodOption[];
}) {
  const [open, setOpen] = useState(false);

  const update = (key: keyof FilterState, value: string) => onChange(key, value);

  const clearAll = () => onClear();

  const activeCount = Object.entries(filters).filter(
    ([k, v]) => v && k !== "sort" && v !== defaultFilters[k as keyof FilterState]
  ).length;

  const selectClasses =
    "w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground focus-visible:border-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold sm:py-2";

  return (
    <div className="border-b border-border bg-cream/80 backdrop-blur-sm">
      {/* Mobile toggle */}
      <div className="flex items-center justify-between px-4 py-3 lg:hidden">
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="property-filter-panel"
          className="flex min-h-[44px] items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground"
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          Filters {activeCount > 0 && `(${activeCount})`}
        </button>
        <select
          value={filters.sort}
          onChange={(e) => update("sort", e.target.value)}
          aria-label="Sort properties"
          className={selectClasses + " w-auto"}
        >
          <option value="price-desc">Price: High to Low</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="newest">Newest</option>
          <option value="dom-asc">Newest Listings</option>
          <option value="dom-desc">Longest on Market</option>
          <option value="sqft">Largest</option>
          <option value="beds-desc">Most Beds</option>
          <option value="beds-asc">Fewest Beds</option>
          <option value="baths-desc">Most Baths</option>
          <option value="baths-asc">Fewest Baths</option>
        </select>
      </div>

      {/* Filter bar */}
      <div
        id="property-filter-panel"
        role="region"
        aria-label="Property filters"
        className={`${open ? "block" : "hidden"} px-4 pb-4 lg:flex lg:items-end lg:gap-3 lg:px-6 lg:py-4`}
      >
        <div className="grid grid-cols-2 gap-3 lg:flex lg:flex-wrap lg:items-end lg:gap-3">
          <PriceRangeSlider
            minValue={filters.priceMin}
            maxValue={filters.priceMax}
            onMinChange={(v) => update("priceMin", v)}
            onMaxChange={(v) => update("priceMax", v)}
          />
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
          {/* AI-3870: Lot size filter */}
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Min Lot
            </label>
            <select
              value={filters.lotSizeMin}
              onChange={(e) => update("lotSizeMin", e.target.value)}
              className={selectClasses}
            >
              <option value="">No Min</option>
              <option value="2000">2,000 SF</option>
              <option value="5000">5,000 SF</option>
              <option value="10000">10,000 SF</option>
              <option value="20000">20,000 SF</option>
              <option value="43560">1 Acre</option>
              <option value="87120">2 Acres</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Max Lot
            </label>
            <select
              value={filters.lotSizeMax}
              onChange={(e) => update("lotSizeMax", e.target.value)}
              className={selectClasses}
            >
              <option value="">No Max</option>
              <option value="5000">5,000 SF</option>
              <option value="10000">10,000 SF</option>
              <option value="20000">20,000 SF</option>
              <option value="43560">1 Acre</option>
              <option value="87120">2 Acres</option>
              <option value="217800">5 Acres</option>
            </select>
          </div>
          {/* AI-3807: Year built range filter */}
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Year Min
            </label>
            <select
              value={filters.yearBuiltMin}
              onChange={(e) => update("yearBuiltMin", e.target.value)}
              className={selectClasses}
            >
              <option value="">No Min</option>
              <option value="2020">2020</option>
              <option value="2010">2010</option>
              <option value="2000">2000</option>
              <option value="1990">1990</option>
              <option value="1980">1980</option>
              <option value="1960">1960</option>
              <option value="1940">1940</option>
              <option value="1900">1900</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Year Max
            </label>
            <select
              value={filters.yearBuiltMax}
              onChange={(e) => update("yearBuiltMax", e.target.value)}
              className={selectClasses}
            >
              <option value="">No Max</option>
              <option value="2026">2026</option>
              <option value="2020">2020</option>
              <option value="2010">2010</option>
              <option value="2000">2000</option>
              <option value="1990">1990</option>
              <option value="1980">1980</option>
              <option value="1960">1960</option>
              <option value="1940">1940</option>
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
              <option value="Coming Soon">Coming Soon</option>
            </select>
          </div>
          {/* AI-3874: Open house date filter */}
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">Open House</label>
            <select
              value={filters.openHouse}
              onChange={(e) => update("openHouse", e.target.value)}
              className={selectClasses}
            >
              <option value="">Any Date</option>
              <option value="this-week">This Week</option>
              <option value="this-weekend">This Weekend</option>
              <option value="next-week">Next Week</option>
              <option value="next-30">Next 30 Days</option>
            </select>
          </div>
          {/* AI-3805: Virtual tour filter */}
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => update("virtualTour", filters.virtualTour ? "" : "yes")}
              aria-pressed={!!filters.virtualTour}
              aria-label="Filter by 3D virtual tour availability"
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                filters.virtualTour
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              3D Tour
            </button>
          </div>
          {/* AI-3806: New construction filter */}
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => update("newConstruction", filters.newConstruction ? "" : "yes")}
              aria-pressed={!!filters.newConstruction}
              aria-label="Filter by new construction"
              className={`flex items-center gap-1.5 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                filters.newConstruction
                  ? "border-gold bg-gold/10 text-gold"
                  : "border-border text-muted-foreground hover:border-gold/50 hover:text-foreground"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 21h18" />
                <path d="M5 21V7l8-4v18" />
                <path d="M19 21V11l-6-4" />
                <path d="M9 9v.01" />
                <path d="M9 12v.01" />
                <path d="M9 15v.01" />
                <path d="M9 18v.01" />
              </svg>
              New Construction
            </button>
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
              <option value="dom-asc">Newest Listings</option>
              <option value="dom-desc">Longest on Market</option>
              <option value="sqft">Largest</option>
              <option value="beds-desc">Most Beds</option>
              <option value="beds-asc">Fewest Beds</option>
              <option value="baths-desc">Most Baths</option>
              <option value="baths-asc">Fewest Baths</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
