import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { loadHomepageNeighborhoods } from "@/lib/data";

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
        <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {homepageNeighborhoods.map((hood) => (
            <Link key={hood.slug} href={`/neighborhoods/${hood.slug}`} className="group depth-hover relative overflow-hidden rounded-xl bg-white shadow-sm border border-border/50 transition-all hover:border-gold/40 hover:shadow-lg">
              <div className="relative aspect-[16/10] overflow-hidden"><Image src={hood.image} alt={hood.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" /></div>
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5"><div className="glass inline-block rounded-lg px-3 py-2 mb-2"><p className="text-xs font-semibold text-gold">{hood.listings} Active Listings</p></div><div className="flex items-center gap-2"><MapPin className="size-4 shrink-0 text-gold" /><h3 className="font-heading text-base font-bold text-white sm:text-lg">{hood.name}</h3></div><p className="mt-1 line-clamp-2 text-xs text-white/70 sm:text-sm">{hood.description}</p></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
