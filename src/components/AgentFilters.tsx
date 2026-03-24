"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

export interface AgentFilterState {
  sort: string;
  neighborhood: string;
  search: string;
  specialty: string;
}

export const defaultAgentFilters: AgentFilterState = {
  sort: "",
  neighborhood: "",
  search: "",
  specialty: "",
};

export default function AgentFilters({
  filters,
  onChange,
  onClear,
  neighborhoods,
  specialties,
}: {
  filters: AgentFilterState;
  onChange: (key: keyof AgentFilterState, value: string) => void;
  onClear: () => void;
  neighborhoods: string[];
  specialties: string[];
}) {
  const [open, setOpen] = useState(false);

  const activeCount = Object.entries(filters).filter(
    ([k, v]) => v !== "" && k !== "sort"
  ).length;

  const selectClasses =
    "w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold sm:py-2";

  return (
    <div className="border-b border-border bg-cream/80 backdrop-blur-sm mb-8">
      {/* Search bar - always visible */}
      <div className="px-4 pt-4 lg:px-6 lg:pt-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onChange("search", e.target.value)}
            placeholder="Search agents by name..."
            aria-label="Search agents by name"
            className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          />
          {filters.search && (
            <button
              onClick={() => onChange("search", "")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile toggle */}
      <div className="flex items-center justify-between px-4 py-3 lg:hidden">
        <button
          onClick={() => setOpen(!open)}
          className="flex min-h-[44px] items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground"
          aria-expanded={open}
          aria-label={`${open ? "Hide" : "Show"} agent filters${activeCount > 0 ? `, ${activeCount} active` : ""}`}
        >
          <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
          Filters {activeCount > 0 && `(${activeCount})`}
        </button>
        <select
          value={filters.sort}
          onChange={(e) => onChange("sort", e.target.value)}
          aria-label="Sort agents"
          className={selectClasses + " w-auto"}
        >
          <option value="">Default Order</option>
          <option value="az">Name: A→Z</option>
          <option value="za">Name: Z→A</option>
        </select>
      </div>

      {/* Filter bar */}
      <div
        className={`${open ? "block" : "hidden"} px-4 pb-4 lg:flex lg:items-end lg:gap-3 lg:px-6 lg:py-4`}
      >
        <div className="grid grid-cols-2 gap-3 lg:flex lg:flex-wrap lg:items-end lg:gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Neighborhood
            </label>
            <select
              value={filters.neighborhood}
              onChange={(e) => onChange("neighborhood", e.target.value)}
              className={selectClasses}
            >
              <option value="">All Neighborhoods</option>
              {neighborhoods.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Specialty
            </label>
            <select
              value={filters.specialty}
              onChange={(e) => onChange("specialty", e.target.value)}
              className={selectClasses}
            >
              <option value="">All Specialties</option>
              {specialties.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3 lg:mt-0 lg:ml-auto">
          {activeCount > 0 && (
            <button
              onClick={onClear}
              className="text-sm font-medium text-gold hover:text-gold-light"
            >
              Clear All
            </button>
          )}
          <div className="hidden lg:block">
            <select
              value={filters.sort}
              onChange={(e) => onChange("sort", e.target.value)}
              className={selectClasses + " w-auto"}
            >
              <option value="">Default Order</option>
              <option value="az">Name: A→Z</option>
              <option value="za">Name: Z→A</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
