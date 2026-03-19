import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { homepageNeighborhoods } from "@/data/homepage-neighborhoods";

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
          {homepageNeighborhoods.map((hood) => (
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
