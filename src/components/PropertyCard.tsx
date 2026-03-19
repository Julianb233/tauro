import Image from "next/image";
import Link from "next/link";
import { Calendar, Video } from "lucide-react";
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
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span
            className={cn(
              "rounded-md px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white",
              statusStyles[property.status] ?? "bg-muted-foreground"
            )}
          >
            {property.status}
          </span>
          {property.isComingSoon && (
            <span className="rounded-md bg-gradient-to-r from-purple-600 to-gold px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
              Coming Soon
            </span>
          )}
        </div>
        <div className="absolute right-3 bottom-3 flex items-center gap-1.5">
          {property.videoTourUrl && (
            <span className="flex items-center gap-1 rounded-md bg-gold/90 px-2 py-1 text-xs font-semibold text-near-black backdrop-blur-sm">
              <Video className="h-3 w-3" />
              Video Tour
            </span>
          )}
          <span className="glass rounded-md px-2 py-1 text-xs text-white">
            {property.images.length} photos
          </span>
        </div>
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
        {property.openHouseEvent && (
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-gold/30 bg-gold/10 px-2 py-1">
            <Calendar className="h-3 w-3 text-gold" />
            <span className="text-xs font-semibold text-gold-dark">
              Open House: {property.openHouse}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
