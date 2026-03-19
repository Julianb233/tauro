import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function HomepageCTAs() {
  return (
    <section className="bg-near-black py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Buyer CTA */}
          <div className="relative overflow-hidden rounded-2xl border border-border/40">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
              alt="Luxury home interior"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-near-black/90 via-near-black/70 to-near-black/40" />
            <div className="relative z-10 p-8 sm:p-10">
              <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                For Buyers
              </p>
              <h3 className="mt-2 font-heading text-2xl font-bold text-white sm:text-3xl">
                Find Your Dream Home
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
                Browse curated listings, explore neighborhoods, and let our agents
                guide you to the perfect Philadelphia property.
              </p>
              <Link
                href="/properties"
                className="shimmer-gold mt-6 inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-near-black transition-all hover:bg-gold-light hover:shadow-lg"
              >
                Browse Properties
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Seller CTA */}
          <div className="relative overflow-hidden rounded-2xl border border-border/40">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
              alt="Modern home exterior"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-near-black/90 via-near-black/70 to-near-black/40" />
            <div className="relative z-10 p-8 sm:p-10">
              <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                For Sellers
              </p>
              <h3 className="mt-2 font-heading text-2xl font-bold text-white sm:text-3xl">
                List With Tauro
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
                Get a free home valuation, premium marketing, and an agent who
                knows your neighborhood inside and out.
              </p>
              <Link
                href="/sell"
                className="shimmer-gold mt-6 inline-flex items-center gap-2 rounded-lg border-2 border-gold px-6 py-3 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-near-black"
              >
                Get a Free Valuation
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
