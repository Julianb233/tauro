import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { BLUR_LANDSCAPE } from "@/lib/blur-placeholder";
import { loadNeighborhoods } from "@/lib/data";

export default async function AreasWeServe() {
  const neighborhoods = await loadNeighborhoods();

  return (
    <section className="relative overflow-hidden bg-foreground py-20">
      {/* Subtle gold gradient accent */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.08),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Philadelphia Real Estate
          </p>
          <h2 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
            Areas We Serve
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            From Center City high-rises to charming Chestnut Hill estates, Tauro
            brings local expertise to every Philadelphia neighborhood.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {neighborhoods.map((hood) => (
            <Link
              key={hood.slug}
              href={`/neighborhoods/${hood.slug}`}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:border-gold/40 hover:bg-white/10 hover:shadow-lg hover:shadow-gold/5 hover:border-b-gold hover:border-b-2"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={hood.cardImage}
                  alt={`${hood.name}, Philadelphia`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL={BLUR_LANDSCAPE}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 via-midnight/40 to-transparent" />
              </div>

              {/* Content overlay */}
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                <div className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 shrink-0 text-gold" />
                  <h3 className="font-heading text-sm font-bold text-white sm:text-base">
                    {hood.name}
                  </h3>
                </div>
                <p className="mt-0.5 line-clamp-1 text-xs text-white/90 sm:text-sm">
                  {hood.tagline}
                </p>

                {/* Hover reveal arrow */}
                <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Explore
                  <ArrowRight className="size-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/neighborhoods"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-gold px-8 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-near-black"
          >
            View All Neighborhoods
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
