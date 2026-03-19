"use client";

import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";
import { useFavorites } from "@/hooks/useFavorites";

export default function FavoritesClient() {
  const { getAll, count } = useFavorites();
  const favoriteIds = getAll();
  const favoriteProperties = properties.filter((p) =>
    favoriteIds.includes(p.id),
  );

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Properties
          </Link>
          <h1 className="mt-4 font-heading text-3xl font-bold sm:text-4xl">
            Saved Properties
          </h1>
          <p className="mt-2 text-muted-foreground">
            {count > 0
              ? `You have ${count} saved ${count === 1 ? "property" : "properties"}.`
              : "Properties you save will appear here."}
          </p>
        </div>

        {/* Content */}
        {favoriteProperties.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
              <Heart className="h-8 w-8 text-gold" />
            </div>
            <h2 className="mt-6 font-heading text-xl font-bold">
              No Saved Properties Yet
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Tap the heart icon on any property to save it here for later.
              Your favorites are stored locally on this device.
            </p>
            <Link
              href="/properties"
              className="mt-6 inline-flex items-center rounded-lg bg-gold px-6 py-2.5 text-sm font-semibold text-near-black transition-colors hover:bg-gold-light"
            >
              Browse Properties
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
