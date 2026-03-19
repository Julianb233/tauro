"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Home, TrendingUp, ChevronRight } from "lucide-react";
import { neighborhoods } from "@/data/neighborhoods";
import type { Neighborhood } from "@/data/neighborhoods";

type SearchTab = "buy" | "sell" | "estimate";

const POPULAR_SLUGS = [
  "center-city",
  "rittenhouse",
  "fishtown",
  "northern-liberties",
  "old-city",
  "chestnut-hill",
];

const popularNeighborhoods = neighborhoods.filter((n) =>
  POPULAR_SLUGS.includes(n.slug),
);

export default function HeroSearchBar() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<SearchTab>("buy");
  const [isFocused, setIsFocused] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter neighborhoods based on query
  const filteredNeighborhoods = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return neighborhoods.filter(
      (n) =>
        n.name.toLowerCase().includes(q) ||
        n.tagline.toLowerCase().includes(q) ||
        n.propertyFilter.toLowerCase().includes(q),
    );
  }, [query]);

  const showDropdown = isFocused && activeTab === "buy";
  const displayItems =
    query.trim().length > 0 ? filteredNeighborhoods : popularNeighborhoods;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset highlight when query changes
  useEffect(() => {
    setHighlightIndex(-1);
  }, [query]);

  const navigateToNeighborhood = useCallback(
    (n: Neighborhood) => {
      setQuery(n.name);
      setIsFocused(false);
      router.push(`/neighborhoods/${n.slug}`);
    },
    [router],
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();

    if (activeTab === "sell") {
      router.push(
        trimmed
          ? `/sell?address=${encodeURIComponent(trimmed)}`
          : "/sell",
      );
      return;
    }

    if (activeTab === "estimate") {
      router.push(
        trimmed
          ? `/home-value?address=${encodeURIComponent(trimmed)}`
          : "/home-value",
      );
      return;
    }

    // Buy tab
    if (highlightIndex >= 0 && highlightIndex < displayItems.length) {
      navigateToNeighborhood(displayItems[highlightIndex]);
      return;
    }

    // Check for exact neighborhood match
    const match = neighborhoods.find(
      (n) => n.name.toLowerCase() === trimmed.toLowerCase(),
    );
    if (match) {
      router.push(`/neighborhoods/${match.slug}`);
      return;
    }

    // Fallback to properties search
    router.push(
      trimmed
        ? `/properties?search=${encodeURIComponent(trimmed)}`
        : "/properties",
    );
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showDropdown || displayItems.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev < displayItems.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : displayItems.length - 1,
      );
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      navigateToNeighborhood(displayItems[highlightIndex]);
    } else if (e.key === "Escape") {
      setIsFocused(false);
    }
  }

  const placeholders: Record<SearchTab, string> = {
    buy: "Search by neighborhood, address, or ZIP...",
    sell: "Enter your property address...",
    estimate: "Enter an address for a free estimate...",
  };

  const submitLabels: Record<SearchTab, string> = {
    buy: "Search",
    sell: "Get Started",
    estimate: "Estimate",
  };

  return (
    <div ref={wrapperRef} className="mx-auto mt-10 max-w-2xl">
      {/* Tab selector */}
      <div className="mb-3 flex items-center justify-center gap-1">
        {(
          [
            { key: "buy", label: "Buy", icon: Home },
            { key: "sell", label: "Sell", icon: TrendingUp },
            { key: "estimate", label: "Estimate", icon: MapPin },
          ] as const
        ).map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setActiveTab(key);
              setQuery("");
              inputRef.current?.focus();
            }}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
              activeTab === key
                ? "bg-gold text-near-black shadow-lg shadow-gold/20"
                : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
            }`}
          >
            <Icon className="size-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Search form */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center rounded-xl border border-white/10 bg-white/60 p-1.5 shadow-2xl backdrop-blur-md">
          <div className="flex flex-1 items-center gap-2 px-3 sm:px-4">
            <Search className="size-5 shrink-0 text-gold" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onKeyDown={handleKeyDown}
              placeholder={placeholders[activeTab]}
              className="w-full min-w-0 bg-transparent py-3 text-sm text-white placeholder:text-white/50 focus:outline-none"
              role="combobox"
              aria-expanded={showDropdown && displayItems.length > 0}
              aria-haspopup="listbox"
              aria-autocomplete="list"
            />
          </div>
          <button
            type="submit"
            className="shimmer-gold shrink-0 rounded-lg bg-gold px-4 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg sm:px-6"
          >
            {submitLabels[activeTab]}
          </button>
        </div>

        {/* Dropdown */}
        {showDropdown && displayItems.length > 0 && (
          <div
            className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-white/10 bg-midnight/80 shadow-2xl backdrop-blur-xl animate-fade-in"
            role="listbox"
          >
            {!query.trim() && (
              <div className="border-b border-white/5 px-4 py-2.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-gold/80">
                  Popular Areas
                </span>
              </div>
            )}
            <ul className="max-h-72 overflow-y-auto py-1">
              {displayItems.map((n, idx) => (
                <li
                  key={n.id}
                  role="option"
                  aria-selected={highlightIndex === idx}
                  className={`flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors ${
                    highlightIndex === idx
                      ? "bg-gold/15 text-white"
                      : "text-white/80 hover:bg-white/5"
                  }`}
                  onMouseEnter={() => setHighlightIndex(idx)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    navigateToNeighborhood(n);
                  }}
                >
                  <MapPin className="size-4 shrink-0 text-gold/70" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium">{n.name}</div>
                    <div className="truncate text-xs text-white/50">
                      {n.tagline} &middot; {n.stats.medianPrice} median
                    </div>
                  </div>
                  <ChevronRight className="size-3.5 shrink-0 text-white/30" />
                </li>
              ))}
            </ul>
            {query.trim() && filteredNeighborhoods.length === 0 && (
              <div className="px-4 py-6 text-center text-sm text-white/50">
                No neighborhoods found. Try searching properties instead.
              </div>
            )}
          </div>
        )}

        {/* Empty state for search with no matches */}
        {showDropdown &&
          query.trim().length > 0 &&
          filteredNeighborhoods.length === 0 && (
            <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-white/10 bg-midnight/80 px-4 py-6 text-center shadow-2xl backdrop-blur-xl animate-fade-in">
              <p className="text-sm text-white/50">
                No neighborhoods match &ldquo;{query}&rdquo;
              </p>
              <p className="mt-1 text-xs text-white/30">
                Press Enter to search all properties
              </p>
            </div>
          )}
      </form>
    </div>
  );
}
