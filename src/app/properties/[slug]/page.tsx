import { notFound } from "next/navigation";
import { loadPropertyBySlug, loadProperties } from "@/lib/data";
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
  return {
    title: `${property.address}, ${property.city} | ${formatPriceFull(property.price)}`,
    description: property.description.slice(0, 160),
  };
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await loadPropertyBySlug(slug);
  if (!property) notFound();
  const allProperties = await loadProperties();
  const similar = allProperties.filter((p) => p.id !== property.id).slice(0, 3);
  return (
    <>
      <RealEstateListingJsonLd property={property} />
      <PropertyDetailClient property={property} similar={similar} />
    </>
  );
}
