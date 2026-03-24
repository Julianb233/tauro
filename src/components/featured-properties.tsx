import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { loadFeaturedProperties } from "@/lib/data";
import PropertyCard from "@/components/PropertyCard";
import { TiltCard } from "@/components/ui/tilt-card";
import FadeInView from "@/components/animations/FadeInView";
import StaggerReveal from "@/components/animations/StaggerReveal";

export default async function FeaturedProperties() {
  const featuredProperties = await loadFeaturedProperties();
  return (
    <section className="bg-white py-12 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeInView direction="up">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div>
              <p className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-gold sm:text-sm">Featured Listings</p>
              <h2 className="mt-2 font-heading text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">Exceptional Properties</h2>
            </div>
            <Link href="/properties" className="group flex items-center gap-2 font-label text-sm font-semibold uppercase tracking-wider text-gold transition-all duration-300 hover:text-gold-dark hover:gap-3">View All Properties<ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} /></Link>
          </div>
        </FadeInView>
        {/* Asymmetric editorial grid: hero card spans 2 cols + 2 rows on desktop */}
        <StaggerReveal className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:grid-rows-[auto_auto]" stagger={0.15}>
          {featuredProperties.map((property, i) => (
            <TiltCard key={property.id} className={i === 0 ? "sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2" : ""}>
              <PropertyCard property={property} />
            </TiltCard>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
