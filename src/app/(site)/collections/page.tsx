import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { collections, getCollectionProperties } from "@/data/collections";
import { loadProperties } from "@/lib/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { formatPrice } from "@/data/properties";

export const metadata: Metadata = {
  title: "Curated Collections",
  description:
    "Browse curated property collections across Philadelphia — Modern Luxury, Historic Charm, Urban Living, and Best Value homes hand-picked by Tauro's experts.",
};

export const revalidate = 86400;

export default async function CollectionsPage() {
  const properties = await loadProperties();

  return (
    <>
      <Breadcrumbs items={[{ label: "Collections", href: "/collections" }]} />

      {/* Hero */}
      <section className="bg-foreground py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-gold sm:text-sm">
            Curated by Tauro
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Property Collections
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
            Hand-picked groupings to help you find exactly what you&apos;re
            looking for. Each collection is curated by our team based on
            lifestyle, architecture, and investment potential.
          </p>
        </div>
      </section>

      {/* Collection Cards */}
      <section className="bg-white py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-2">
            {collections.map((collection) => {
              const matched = getCollectionProperties(
                collection,
                properties,
              );
              const priceRange =
                matched.length > 0
                  ? `${formatPrice(Math.min(...matched.map((p) => p.price)))} – ${formatPrice(Math.max(...matched.map((p) => p.price)))}`
                  : null;

              return (
                <Link
                  key={collection.slug}
                  href={`/collections/${collection.slug}`}
                  className="group relative overflow-hidden rounded-2xl bg-near-black shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-gold/10"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-near-black via-near-black/40 to-transparent" />

                    {/* Property count badge */}
                    <div className="absolute right-4 top-4 rounded-full bg-gold/90 px-3 py-1 text-xs font-bold text-near-black backdrop-blur-sm">
                      {matched.length}{" "}
                      {matched.length === 1 ? "property" : "properties"}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8">
                    <p className="font-label text-xs font-semibold uppercase tracking-[0.15em] text-gold">
                      {collection.tagline}
                    </p>
                    <h2 className="mt-2 font-heading text-2xl font-bold text-white sm:text-3xl">
                      {collection.name}
                    </h2>
                    <p className="mt-3 line-clamp-2 text-sm text-white/60 sm:text-base">
                      {collection.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                      {priceRange && (
                        <span className="text-sm text-white/50">
                          {priceRange}
                        </span>
                      )}
                      <span className="ml-auto flex items-center gap-1.5 font-label text-sm font-semibold uppercase tracking-wider text-gold transition-all duration-300 group-hover:gap-3">
                        Explore
                        <ArrowRight className="size-4" strokeWidth={2} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
