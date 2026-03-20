"use client";

import { Globe, User, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/use-scrolled";

const currencies = [
  { code: "USD", label: "USD ($)", symbol: "$" },
  { code: "EUR", label: "EUR (€)", symbol: "€" },
  { code: "GBP", label: "GBP (£)", symbol: "£" },
  { code: "CAD", label: "CAD (C$)", symbol: "C$" },
];

export function UtilityNav() {
  const scrolled = useScrolled();
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!currencyOpen) return;
    function handler(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCurrencyOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [currencyOpen]);

  return (
    <div
      className={cn(
        "fixed top-0 z-[51] w-full transition-all duration-300",
        scrolled
          ? "h-0 overflow-hidden opacity-0"
          : "border-b border-white/10 bg-black/30 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex h-8 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 text-[11px] text-white/60">
          <span className="hidden sm:inline">Exit Benchmark Realty | Philadelphia, PA</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Currency selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setCurrencyOpen(!currencyOpen)}
              className="flex items-center gap-1 text-[11px] text-white/60 transition-colors hover:text-white"
            >
              <Globe className="size-3" />
              {selectedCurrency}
              <ChevronDown className="size-3" />
            </button>
            {currencyOpen && (
              <div className="absolute right-0 top-full z-50 mt-1 w-32 overflow-hidden rounded-lg border border-white/10 bg-black/90 shadow-lg backdrop-blur-xl">
                {currencies.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => {
                      setSelectedCurrency(c.code);
                      setCurrencyOpen(false);
                    }}
                    className={cn(
                      "block w-full px-3 py-1.5 text-left text-[11px] transition-colors hover:bg-gold/10 hover:text-gold",
                      selectedCurrency === c.code ? "text-gold" : "text-white/70"
                    )}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <span className="h-3 w-px bg-white/20" />

          {/* Sign In placeholder */}
          <button
            type="button"
            className="flex items-center gap-1 text-[11px] text-white/60 transition-colors hover:text-white"
            onClick={() => {
              /* placeholder for future auth */
            }}
          >
            <User className="size-3" />
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
