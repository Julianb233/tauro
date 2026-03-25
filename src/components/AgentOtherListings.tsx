import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Ruler, ArrowRight } from "lucide-react";
import { properties, formatPrice } from "@/data/properties";

interface AgentOtherListingsProps {
  agentName: string;
  agentSlug?: string;
  currentSlug: string;
}

export default function AgentOtherListings({
  agentName,
  agentSlug,
  currentSlug,
}: AgentOtherListingsProps) {
  const otherListings = properties
    .filter(
      (p) =>
        p.agent.name === agentName &&
        p.slug !== currentSlug &&
        p.status !== "Coming Soon"
    )
    .slice(0, 3);

  if (otherListings.length === 0) return null;

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="font-label text-xs font-semibold uppercase tracking-[0.15em] text-gold">
            More from this Agent
          </p>
          <h3 className="mt-0.5 font-heading text-base font-bold">{agentName}</h3>
        </div>
        {agentSlug && (
          <Link
            href={`/agents/${agentSlug}`}
            className="flex shrink-0 items-center gap-1 text-xs font-medium text-gold transition-colors hover:text-gold/80"
          >
            All listings
            <ArrowRight className="size-3" strokeWidth={2} />
          </Link>
        )}
      </div>

      <div className="mt-4 space-y-3">
        {otherListings.map((listing) => (
          <Link
            key={listing.slug}
            href={`/properties/${listing.slug}`}
            className="group flex gap-3 rounded-lg border border-border/50 bg-background/50 p-3 transition-all hover:border-gold/30 hover:bg-gold/5"
          >
            {/* Thumbnail */}
            <div className="relative size-16 shrink-0 overflow-hidden rounded-md">
              <Image
                src={listing.images[0]}
                alt={listing.address}
                fill
                sizes="64px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Status badge */}
              <span
                className={`absolute right-1 top-1 rounded px-1 py-0.5 text-[9px] font-bold uppercase leading-none ${
                  listing.status === "Pending"
                    ? "bg-blue-600/90 text-white"
                    : listing.status === "New"
                      ? "bg-emerald-600/90 text-white"
                      : "bg-near-black/80 text-white"
                }`}
              >
                {listing.status}
              </span>
            </div>

            {/* Info */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold group-hover:text-gold transition-colors">
                {listing.address}
              </p>
              <p className="mt-0.5 font-heading text-sm font-bold text-gold">
                {formatPrice(listing.price)}
              </p>
              <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Bed className="size-3" strokeWidth={1.5} />
                  {listing.beds}
                </span>
                <span className="flex items-center gap-1">
                  <Bath className="size-3" strokeWidth={1.5} />
                  {listing.baths}
                </span>
                <span className="flex items-center gap-1">
                  <Ruler className="size-3" strokeWidth={1.5} />
                  {listing.sqft.toLocaleString()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
