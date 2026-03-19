import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProperties } from "@/data/featured-properties";
import PropertyCard from "@/components/PropertyCard";
import { TiltCard } from "@/components/ui/tilt-card";

export default function FeaturedProperties() {
  return (
    <section className="bg-near-black py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
              Featured Listings
            </p>
            <h2 className="mt-2 font-heading text-3xl font-bold text-white sm:text-4xl">
              Exceptional Properties
            </h2>
          </div>
          <Link
            href="/properties"
            className="group flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-light"
          >
            View All Properties
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProperties.map((property) => (
            <TiltCard key={property.id}>
              <PropertyCard property={property} />
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
