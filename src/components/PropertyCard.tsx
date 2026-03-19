"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Property, formatPrice } from "@/data/properties";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/useFavorites";

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-600",
  New: "bg-gold text-near-black",
  "Open House": "bg-blue-600",
  Pending: "bg-orange-500",
};

export default function PropertyCard({ property }: { property: Property }) {
  const { toggle, isFavorite } = useFavorites();
  const favorited = isFavorite(property.id);

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-sm border border-border/50 transition-all duration-300 hover:border-gold/40 hover:shadow-lg hover:-translate-y-1">
      <Link
        href={`/properties/${property.slug}`}
        className="block"
      >
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
          <span className="absolute right-3 bottom-3 rounded-md bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
            {property.images.length} photos
          </span>
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
          {property.openHouse && (
            <p className="mt-2 text-xs font-semibold text-gold-dark">
              Open House: {property.openHouse}
            </p>
          )}
        </div>
      </Link>

      {/* Favorite heart button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggle(property.id);
        }}
        aria-label={favorited ? "Remove from saved" : "Save property"}
        className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-all duration-200 hover:bg-black/60 hover:scale-110"
      >
        <Heart
          className={cn(
            "h-4.5 w-4.5 transition-colors duration-200",
            favorited
              ? "fill-gold text-gold"
              : "fill-none text-white"
          )}
        />
      </button>
    </div>
  );
}
