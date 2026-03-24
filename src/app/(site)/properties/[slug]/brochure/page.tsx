import { notFound } from "next/navigation";
import { loadPropertyBySlug } from "@/lib/data";
import { formatPriceFull } from "@/data/properties";
import { siteUrl } from "@/lib/site-config";
import { BrochureClient } from "./BrochureClient";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await loadPropertyBySlug(slug);
  if (!property) return { title: "Property Not Found" };
  return {
    title: `Brochure — ${property.address} | ${formatPriceFull(property.price)}`,
    robots: { index: false, follow: false },
  };
}

export default async function BrochurePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await loadPropertyBySlug(slug);
  if (!property) notFound();

  const listingUrl = `${siteUrl}/properties/${property.slug}`;

  return <BrochureClient property={property} listingUrl={listingUrl} />;
}
