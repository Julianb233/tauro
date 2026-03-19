import Image from "next/image";
import Link from "next/link";
import { Video } from "lucide-react";
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
      className="group depth-hover block overflow-hidden rounded-xl bg-white shadow-sm border border-border/50 transition-all hover:border-gold/40 hover:shadow-lg"
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
        <span className="absolute right-3 bottom-3 glass rounded-md px-2 py-1 text-xs text-white">
          {property.images.length} photos
        </span>
      </div>
      <div className="p-3 sm:p-4">
        <p className="font-heading text-lg font-bold text-foreground sm:text-xl">{formatPrice(property.price)}</p>
        <div className="mt-1 flex flex-wrap items-center gap-1.5 font-label text-xs tracking-wider text-muted-foreground sm:gap-2">
          <span>{property.beds} BD</span>
          <span className="text-gold/30">|</span>
          <span>{property.baths} BA</span>
          <span className="text-gold/30">|</span>
          <span>{property.sqft.toLocaleString()} SF</span>
        </div>
        <p className="mt-2 truncate font-medium text-foreground">{property.address}</p>
        <p className="truncate text-sm text-muted-foreground">
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
