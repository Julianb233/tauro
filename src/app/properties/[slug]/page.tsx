import { notFound } from "next/navigation";
import { loadPropertyBySlug, loadProperties, loadNeighborhoods } from "@/lib/data";
import { formatPriceFull } from "@/data/properties";
import { RealEstateListingJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { siteUrl } from "@/lib/site-config";
import PropertyDetailClient from "./PropertyDetailClient";

export const revalidate = 3600;

export async function generateStaticParams() {
  const properties = await loadProperties();
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await loadPropertyBySlug(slug);
  if (!property) return { title: "Property Not Found" };
  const title = `${property.address}, ${property.city} | ${formatPriceFull(property.price)}`;
  const description = property.description.slice(0, 160);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/properties/${property.slug}`,
      images: [{ url: property.images[0], width: 1200, height: 630, alt: property.address }],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [property.images[0]],
    },
  };
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await loadPropertyBySlug(slug);
  if (!property) notFound();
  const allProperties = await loadProperties();
  const similar = allProperties.filter((p) => p.id !== property.id).slice(0, 3);
  const neighborhoods = await loadNeighborhoods();
  const matchedNeighborhood = neighborhoods.find(
    (n) => n.propertyFilter.toLowerCase() === property.neighborhood.toLowerCase()
  );
  return (
    <>
      <RealEstateListingJsonLd property={property} />
      <Breadcrumbs
        items={[
          { label: "Properties", href: "/properties" },
          { label: property.address, href: `/properties/${property.slug}` },
        ]}
      />
      <PropertyDetailClient
        property={property}
        similar={similar}
        neighborhoodSlug={matchedNeighborhood?.slug}
        neighborhoodName={matchedNeighborhood?.name}
        neighborhoodMiniGuide={
          matchedNeighborhood
            ? {
                medianPrice: matchedNeighborhood.marketData.medianPrice,
                walkScore: matchedNeighborhood.walkScore,
                transitScore: matchedNeighborhood.transitScore,
                localSpots: matchedNeighborhood.localSpots.slice(0, 3),
              }
            : undefined
        }
      />
    </>
  );
}
