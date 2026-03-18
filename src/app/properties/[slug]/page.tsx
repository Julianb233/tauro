import { notFound } from "next/navigation";
import { properties, formatPriceFull } from "@/data/properties";
import PropertyJsonLd from "@/components/PropertyJsonLd";
import PropertyDetailClient from "./PropertyDetailClient";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = properties.find((p) => p.slug === slug);
  if (!property) return { title: "Property Not Found" };
  return {
    title: `${property.address}, ${property.city} | ${formatPriceFull(property.price)}`,
    description: property.description.slice(0, 160),
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = properties.find((p) => p.slug === slug);
  if (!property) notFound();
  const similar = properties.filter((p) => p.id !== property.id).slice(0, 3);

  return (
    <>
      <PropertyJsonLd property={property} />
      <PropertyDetailClient property={property} similar={similar} />
    </>
  );
}
