import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";

const neighborhoods = [
  {
    name: "Center City",
    slug: "center-city",
    description: "The beating heart of Philadelphia — walkable, vibrant, and full of culture.",
    image: "https://images.unsplash.com/photo-1569761316261-9a8696fa2ca3?w=800&q=80",
    listings: 42,
  },
  {
    name: "Rittenhouse",
    slug: "rittenhouse",
    description: "Philadelphia's most prestigious address with tree-lined streets and luxury living.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    listings: 28,
  },
  {
    name: "Fishtown",
    slug: "fishtown",
    description: "Creative energy meets industrial charm in Philly's hottest neighborhood.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    listings: 35,
  },
  {
    name: "Northern Liberties",
    slug: "northern-liberties",
    description: "Urban sophistication with boutique restaurants and converted lofts.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    listings: 19,
  },
  {
    name: "Old City",
    slug: "old-city",
    description: "Where history meets modern living — cobblestone streets and gallery nights.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    listings: 15,
  },
  {
    name: "Chestnut Hill",
    slug: "chestnut-hill",
    description: "Suburban charm within city limits — gardens, boutiques, and top schools.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    listings: 22,
  },
];

export default function NeighborhoodShowcase() {
  return (
    <section className="border-t border-border/40 bg-midnight py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Explore Philadelphia
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
            Premier Neighborhoods
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            From the brownstones of Rittenhouse to the lofts of Fishtown — discover
            what makes each Philadelphia neighborhood unique.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {neighborhoods.map((hood) => (
            <Link
              key={hood.slug}
              href={`/neighborhoods/${hood.slug}`}
              className="group relative overflow-hidden rounded-xl border border-border/40 transition-all hover:border-gold/40 hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={hood.image}
                  alt={hood.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-near-black/90 via-near-black/30 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-gold" />
                  <h3 className="font-heading text-lg font-bold text-white">
                    {hood.name}
                  </h3>
                </div>
                <p className="mt-1 text-sm text-white/70">
                  {hood.description}
                </p>
                <p className="mt-2 text-xs font-semibold text-gold">
                  {hood.listings} Active Listings
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
