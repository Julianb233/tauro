import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { Neighborhood } from "@/data/neighborhoods";

export function AreaHero({ neighborhood }: { neighborhood: Neighborhood }) {
  return (
    <section className="relative min-h-[50vh] overflow-hidden pt-16">
      <Image
        src={neighborhood.image}
        alt={neighborhood.name}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />

      <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-7xl flex-col justify-end px-4 pb-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
          <Link href="/" className="transition-colors hover:text-gold">
            Home
          </Link>
          <ChevronRight className="size-3" />
          <Link
            href="/neighborhoods"
            className="transition-colors hover:text-gold"
          >
            Neighborhoods
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-gold">{neighborhood.name}</span>
        </nav>

        <h1 className="font-heading text-4xl font-bold text-white sm:text-5xl md:text-6xl">
          {neighborhood.name}
        </h1>
        <p className="mt-3 max-w-xl text-lg text-white/70">
          {neighborhood.tagline}
        </p>
      </div>
    </section>
  );
}
