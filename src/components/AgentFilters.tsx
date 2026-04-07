"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X, MapPin } from "lucide-react";

export interface AgentFilterState {
  sort: string;
  neighborhood: string;
  search: string;
  specialty: string;
  language: string;
  letter: string;
}

export const defaultAgentFilters: AgentFilterState = {
  sort: "",
  neighborhood: "",
  search: "",
  specialty: "",
  language: "",
  letter: "",
};

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function AgentFilters({
  filters,
  onChange,
  onClear,
  neighborhoods,
  specialties,
  languages,
  availableLetters,
}: {
  filters: AgentFilterState;
  onChange: (key: keyof AgentFilterState, value: string) => void;
  onClear: () => void;
  neighborhoods: string[];
  specialties: string[];
  languages: string[];
  availableLetters: Set<string>;
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

      {/* Alphabetical letter bar */}
      <div className="px-4 pt-3 lg:px-6" role="navigation" aria-label="Filter agents by last name initial">
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => onChange("letter", "")}
            className={`rounded px-2 py-1 text-xs font-semibold transition-colors ${
              filters.letter === ""
                ? "bg-gold text-near-black"
                : "text-muted-foreground hover:bg-gold/10 hover:text-foreground"
            }`}
            aria-label="Show all agents"
            aria-pressed={filters.letter === ""}
          >
            All
          </button>
          {ALPHABET.map((letter) => {
            const hasAgents = availableLetters.has(letter);
            return (
              <button
                key={letter}
                onClick={() => hasAgents ? onChange("letter", filters.letter === letter ? "" : letter) : undefined}
                disabled={!hasAgents}
                className={`min-w-[28px] rounded px-1.5 py-1 text-xs font-semibold transition-colors ${
                  filters.letter === letter
                    ? "bg-gold text-near-black"
                    : hasAgents
                      ? "text-foreground hover:bg-gold/10"
                      : "cursor-default text-muted-foreground/40"
                }`}
                aria-label={`Filter by last name starting with ${letter}`}
                aria-pressed={filters.letter === letter}
                aria-disabled={!hasAgents}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Location quick-filter pills */}
      {neighborhoods.length > 0 && (
        <div className="px-4 pt-3 lg:px-6" role="navigation" aria-label="Filter agents by neighborhood">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => onChange("neighborhood", "")}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  filters.neighborhood === ""
                    ? "bg-gold text-near-black"
                    : "border border-border bg-white text-muted-foreground hover:border-gold/40 hover:text-foreground"
                }`}
                aria-pressed={filters.neighborhood === ""}
              >
                All Areas
              </button>
              {neighborhoods.map((n) => (
                <button
                  key={n}
                  onClick={() => onChange("neighborhood", filters.neighborhood === n ? "" : n)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    filters.neighborhood === n
                      ? "bg-gold text-near-black"
                      : "border border-border bg-white text-muted-foreground hover:border-gold/40 hover:text-foreground"
                  }`}
                  aria-pressed={filters.neighborhood === n}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

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

      {/* Additional filter bar (specialty, language, sort) */}
      <div
        className={`${open ? "block" : "hidden"} px-4 pb-4 lg:flex lg:items-end lg:gap-3 lg:px-6 lg:py-4`}
      >
        <div className="grid grid-cols-2 gap-3 lg:flex lg:flex-wrap lg:items-end lg:gap-3">
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
          {/* AI-3905: Language spoken filter */}
          <div>
            <label className="mb-1 block text-xs font-medium text-muted-foreground">
              Language
            </label>
            <select
              value={filters.language}
              onChange={(e) => onChange("language", e.target.value)}
              className={selectClasses}
            >
              <option value="">All Languages</option>
              {languages.map((l) => (
                <option key={l} value={l}>
                  {l}
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
