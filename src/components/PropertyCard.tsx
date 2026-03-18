import Link from "next/link";
import { Property, formatPrice } from "@/data/properties";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-600",
  New: "bg-gold text-near-black",
  "Open House": "bg-blue-600",
  Pending: "bg-orange-500",
};

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group block overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-gold/40 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={property.images[0]}
          alt={property.address}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
      <div className="p-4">
        <p className="font-heading text-xl font-bold text-gold">{formatPrice(property.price)}</p>
        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
          <span>{property.beds} BD</span>
          <span className="text-border">|</span>
          <span>{property.baths} BA</span>
          <span className="text-border">|</span>
          <span>{property.sqft.toLocaleString()} SF</span>
        </div>
        <p className="mt-2 font-medium text-foreground">{property.address}</p>
        <p className="text-sm text-muted-foreground">
          {property.city}, {property.state} {property.zip}
        </p>
        {property.openHouse && (
          <p className="mt-2 text-xs font-semibold text-gold">
            Open House: {property.openHouse}
          </p>
        )}
      </div>
    </Link>
  );
}
