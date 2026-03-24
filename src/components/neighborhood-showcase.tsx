import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { loadHomepageNeighborhoods } from "@/lib/data";
import { BLUR_LANDSCAPE } from "@/lib/blur-placeholder";

export default async function NeighborhoodShowcase() {
  const homepageNeighborhoods = await loadHomepageNeighborhoods();
  return (
    <section className="bg-cream py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-gold sm:text-sm">Explore Philadelphia</p>
          <h2 className="mt-2 font-heading text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">Premier Neighborhoods</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:mt-4 sm:text-base">From the brownstones of Rittenhouse to the lofts of Fishtown — discover what makes each Philadelphia neighborhood unique.</p>
        </div>
        {/* Asymmetric editorial grid: first card spans 2 rows for magazine feel */}
        <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
          {homepageNeighborhoods.map((hood, i) => (
            <Link key={hood.slug} href={`/neighborhoods/${hood.slug}`} className={`group depth-hover relative overflow-hidden rounded-xl bg-white shadow-sm border border-border/50 transition-all hover:border-gold/40 hover:shadow-lg${i === 0 ? " lg:row-span-2" : ""}`}>
              <div className={`relative overflow-hidden${i === 0 ? " aspect-[16/20] lg:h-full" : " aspect-[16/10]"}`}><Image src={hood.image} alt={hood.name} fill sizes={i === 0 ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"} className="object-cover transition-transform duration-500 group-hover:scale-105" placeholder="blur" blurDataURL={BLUR_LANDSCAPE} /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" /></div>
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5"><div className="glass inline-block rounded-lg px-3 py-2 mb-2"><p className="text-xs font-semibold text-gold">{hood.listings} Active Listings</p></div><div className="flex items-center gap-2"><MapPin className="size-4 shrink-0 text-gold" /><h3 className={`font-heading font-bold text-white${i === 0 ? " text-lg sm:text-xl lg:text-2xl" : " text-base sm:text-lg"}`}>{hood.name}</h3></div><p className={`mt-1 text-white/70${i === 0 ? " line-clamp-3 text-sm sm:text-base" : " line-clamp-2 text-xs sm:text-sm"}`}>{hood.description}</p></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
