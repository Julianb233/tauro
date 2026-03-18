import { notFound } from "next/navigation";
import { properties, formatPriceFull } from "@/data/properties";
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: `${property.address}, ${property.city}, ${property.state} ${property.zip}`,
    description: property.description,
    url: `https://tauro.realty/properties/${property.slug}`,
    image: property.images[0],
    datePosted: new Date().toISOString(),
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "PriceSpecification",
        price: property.price,
        priceCurrency: "USD",
      },
    },
    numberOfRooms: property.beds + property.baths,
    numberOfBedrooms: property.beds,
    numberOfBathroomsTotal: property.baths,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.sqft,
      unitCode: "FTK",
      unitText: "sqft",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: property.address,
      addressLocality: property.city,
      addressRegion: property.state,
      postalCode: property.zip,
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.lat,
      longitude: property.lng,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PropertyDetailClient property={property} similar={similar} />
    </>
  );
}
