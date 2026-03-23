import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  collections,
  getCollectionBySlug,
  getCollectionProperties,
} from "@/data/collections";
import { loadProperties } from "@/lib/data";
import PropertyCard from "@/components/PropertyCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteUrl } from "@/lib/site-config";
import FadeInView from "@/components/animations/FadeInView";
import StaggerReveal from "@/components/animations/StaggerReveal";
import { TiltCard } from "@/components/ui/tilt-card";

export const revalidate = 86400;

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return {};

  return {
    title: `${collection.name} Properties`,
    description: collection.description,
    openGraph: {
      title: `${collection.name} — Tauro Curated Collection`,
      description: collection.description,
      images: [{ url: collection.image, width: 800, height: 450 }],
    },
    alternates: {
      canonical: `${siteUrl}/collections/${slug}`,
    },
  };
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const allProperties = await loadProperties();
  const properties = getCollectionProperties(collection, allProperties);

  // Find neighboring collections for navigation
  const currentIndex = collections.findIndex((c) => c.slug === slug);
  const prevCollection =
    currentIndex > 0 ? collections[currentIndex - 1] : null;
  const nextCollection =
    currentIndex < collections.length - 1
      ? collections[currentIndex + 1]
      : null;

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Collections", href: "/collections" },
          { label: collection.name, href: `/collections/${slug}` },
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground">
        <div className="absolute inset-0">
          <Image
            src={collection.image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-30"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-near-black via-near-black/90 to-near-black/60" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Link
            href="/collections"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-gold"
          >
            <ArrowLeft className="size-4" />
            All Collections
          </Link>
          <p className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-gold sm:text-sm">
            {collection.tagline}
          </p>
          <h1 className="mt-3 font-heading text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            {collection.name}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
            {collection.description}
          </p>
          <p className="mt-6 text-sm text-white/40">
            {properties.length}{" "}
            {properties.length === 1 ? "property" : "properties"} in this
            collection
          </p>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="bg-white py-12 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {properties.length > 0 ? (
            <FadeInView direction="up">
              <StaggerReveal
                className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
                stagger={0.1}
              >
                {properties.map((property) => (
                  <TiltCard key={property.id}>
                    <PropertyCard property={property} />
                  </TiltCard>
                ))}
              </StaggerReveal>
            </FadeInView>
          ) : (
            <div className="py-16 text-center sm:py-24">
              <p className="text-lg text-muted-foreground">
                No properties currently match this collection.
              </p>
              <Link
                href="/properties"
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light"
              >
                Browse all properties
                <ArrowRight className="size-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Collection Navigation */}
      {(prevCollection || nextCollection) && (
        <section className="border-t border-border bg-background py-12">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            {prevCollection ? (
              <Link
                href={`/collections/${prevCollection.slug}`}
                className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
              >
                <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
                <span>
                  <span className="block text-xs uppercase tracking-wider text-muted-foreground/60">
                    Previous
                  </span>
                  {prevCollection.name}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextCollection ? (
              <Link
                href={`/collections/${nextCollection.slug}`}
                className="group flex items-center gap-2 text-right text-sm text-muted-foreground transition-colors hover:text-gold"
              >
                <span>
                  <span className="block text-xs uppercase tracking-wider text-muted-foreground/60">
                    Next
                  </span>
                  {nextCollection.name}
                </span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </section>
      )}
    </>
  );
}
