"use client";

import Image from "next/image";
import Link from "next/link";
import { Video } from "lucide-react";
import { Property, formatPrice } from "@/data/properties";
import { cn } from "@/lib/utils";
import { useCompare } from "@/hooks/useCompare";

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-600",
  New: "bg-gold text-near-black",
  "Open House": "bg-blue-600",
  Pending: "bg-orange-500",
};

export default function PropertyCard({ property }: { property: Property }) {
  const { isComparing, toggle, count } = useCompare();
  const active = isComparing(property.id);
  const full = count >= 3 && !active;

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-sm border border-border/50 transition-all duration-300 hover:border-gold/40 hover:shadow-lg hover:-translate-y-1">
      {/* Compare toggle */}
      <button
        type="button"
        aria-label={active ? "Remove from compare" : "Add to compare"}
        title={full ? "Max 3 properties" : active ? "Remove from compare" : "Compare"}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!full) toggle(property.id);
        }}
        className={cn(
          "absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-sm transition-all duration-200",
          active
            ? "border-gold bg-gold/90 text-near-black shadow-md"
            : "border-white/60 bg-black/40 text-white hover:bg-gold/80 hover:text-near-black hover:border-gold",
          full && !active && "opacity-40 cursor-not-allowed"
        )}
      >
        {/* Scale icon (balance) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M12 3v18" />
          <path d="M5 7l-3 9h6L5 7z" />
          <path d="M19 7l-3 9h6l-3-9z" />
          <path d="M5 7h14" />
        </svg>
      </button>

      <Link href={`/properties/${property.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Image
            src={property.images[0]}
            alt={property.address}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <span
            className={cn(
              "absolute top-3 left-3 rounded-md px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white",
              statusStyles[property.status] ?? "bg-muted-foreground"
            )}
          >
            {property.status}
          </span>
          <div className="absolute right-3 bottom-3 flex items-center gap-1.5">
            {property.videoTourUrl && (
              <span className="flex items-center gap-1 rounded-md bg-gold/90 px-2 py-1 text-xs font-semibold text-near-black backdrop-blur-sm">
                <Video className="h-3 w-3" />
                Video Tour
              </span>
            )}
            <span className="rounded-md bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
              {property.images.length} photos
            </span>
          </div>
        </div>
        <div className="p-3 sm:p-4">
          <p className="font-heading text-lg font-bold text-foreground sm:text-xl">{formatPrice(property.price)}</p>
          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground sm:gap-2 sm:text-sm">
            <span>{property.beds} BD</span>
            <span className="text-border">|</span>
            <span>{property.baths} BA</span>
            <span className="text-border">|</span>
            <span>{property.sqft.toLocaleString()} SF</span>
          </div>
          <p className="mt-2 truncate font-medium text-foreground">{property.address}</p>
          <p className="truncate text-sm text-muted-foreground">
            {property.city}, {property.state} {property.zip}
          </p>
          {property.openHouseEvent && (
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-gold/30 bg-gold/10 px-2 py-1"><Calendar className="h-3 w-3 text-gold" /><span className="text-xs font-semibold text-gold-dark">
              Open House: {property.openHouse}</span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
