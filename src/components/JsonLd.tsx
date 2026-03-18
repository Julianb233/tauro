import { Property } from "@/data/properties";

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Tauro | LYL Realty Group",
    url: "https://tauro.realty",
    logo: "https://tauro.realty/logo.png",
    description:
      "Premium Philadelphia real estate brokerage serving Center City, Rittenhouse, Fishtown, and surrounding neighborhoods.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Philadelphia",
      addressRegion: "PA",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "City",
      name: "Philadelphia",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function RealEstateListingJsonLd({
  property,
}: {
  property: Property;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: `${property.address}, ${property.city}, ${property.state} ${property.zip}`,
    description: property.description.slice(0, 200),
    url: `https://tauro.realty/properties/${property.slug}`,
    image: property.images[0],
    datePosted: new Date().toISOString().split("T")[0],
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "USD",
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
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.sqft,
      unitCode: "SQF",
    },
    numberOfRooms: property.beds,
    numberOfBathroomsTotal: property.baths,
    yearBuilt: property.yearBuilt,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
