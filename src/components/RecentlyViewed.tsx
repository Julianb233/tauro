"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";

function formatPrice(price: number) {
  if (price >= 1_000_000) {
    return `$${(price / 1_000_000).toFixed(price % 1_000_000 === 0 ? 0 : 1)}M`;
  }
  return `$${(price / 1_000).toFixed(0)}K`;
}

export default function RecentlyViewed() {
  const { items } = useRecentlyViewed();

  if (items.length === 0) return null;

  return (
    <section className="bg-cream py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-gold" strokeWidth={1.5} />
          <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
            Recently Viewed
          </h2>
        </div>

        <div className="mt-6 flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/properties/${item.slug}`}
              className="group flex-shrink-0"
            >
              <div className="w-56 overflow-hidden rounded-xl border border-border/50 bg-white shadow-sm transition-all duration-300 hover:border-gold/40 hover:shadow-md hover:-translate-y-0.5">
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={item.image}
                    alt={item.address}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="224px"
                  />
                </div>
                <div className="p-3">
                  <p className="font-heading text-base font-bold text-foreground">
                    {formatPrice(item.price)}
                  </p>
                  <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span>{item.beds} BD</span>
                    <span className="text-border">|</span>
                    <span>{item.baths} BA</span>
                    <span className="text-border">|</span>
                    <span>{item.sqft.toLocaleString()} SF</span>
                  </div>
                  <p className="mt-1 truncate text-sm font-medium text-foreground">
                    {item.address}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {item.city}, {item.state} {item.zip}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
