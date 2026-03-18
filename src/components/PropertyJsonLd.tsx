import { Property } from "@/data/properties";

export default function PropertyJsonLd({ property }: { property: Property }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: `${property.address}, ${property.city}, ${property.state} ${property.zip}`,
    description: property.description,
    url: `https://tauro.realty/properties/${property.slug}`,
    image: property.images[0],
    datePosted: new Date().toISOString().split("T")[0],
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "USD",
    },
    about: {
      "@type": "Residence",
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
      numberOfRooms: property.beds + property.baths,
      numberOfBedrooms: property.beds,
      numberOfBathroomsTotal: property.baths,
      floorSize: {
        "@type": "QuantitativeValue",
        value: property.sqft,
        unitCode: "SQF",
      },
      yearBuilt: property.yearBuilt,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
