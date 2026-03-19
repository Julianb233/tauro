import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { loadFeaturedProperties } from "@/lib/data";
import PropertyCard from "@/components/PropertyCard";
import { TiltCard } from "@/components/ui/tilt-card";

export default async function FeaturedProperties() {
  const featuredProperties = await loadFeaturedProperties();
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">Featured Listings</p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-foreground sm:text-4xl">Exceptional Properties</h2>
          </div>
          <Link href="/properties" className="group flex items-center gap-2 font-label text-sm font-semibold uppercase tracking-wider text-gold transition-all duration-300 hover:text-gold-dark hover:gap-3">View All Properties<ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} /></Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((property) => (<TiltCard key={property.id}><PropertyCard property={property} /></TiltCard>))}
        </div>
      </div>
    </section>
  );
}
