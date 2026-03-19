import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { loadProperties } from "@/lib/data";
import PropertyCard from "@/components/PropertyCard";

export async function AreaListings({ neighborhoodName, propertyFilter }: { neighborhoodName: string; propertyFilter: string }) {
  const properties = await loadProperties();
  const filtered = properties.filter((p) => p.neighborhood.toLowerCase() === propertyFilter.toLowerCase());
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">Available Listings</p>
        <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">Properties in {neighborhoodName}</h2>
        {filtered.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((property) => (<PropertyCard key={property.id} property={property} />))}</div>
        ) : (
          <div className="mt-8 rounded-xl border border-border/40 bg-card p-10 text-center"><MapPin className="mx-auto size-10 text-gold/40" /><p className="mt-4 font-heading text-lg font-bold text-foreground">New listings in {neighborhoodName} coming soon.</p><p className="mt-2 text-sm text-muted-foreground">Contact us to be the first to know when properties become available in this neighborhood.</p><Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg">Get Notified<ArrowRight className="size-4" /></Link></div>
        )}
      </div>
    </section>
  );
}
