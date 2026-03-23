import { Property } from "@/data/properties";
import { Agent } from "@/data/agents";
import { Testimonial } from "@/data/testimonials";
import { siteUrl } from "@/lib/site-config";

/* -------------------------------------------------------------------------- */
/*  Organization / RealEstateAgent — global (rendered in layout)              */
/* -------------------------------------------------------------------------- */

const PHILADELPHIA_NEIGHBORHOODS = [
  "Center City",
  "Rittenhouse Square",
  "Fishtown",
  "Society Hill",
  "Old City",
  "Northern Liberties",
  "Graduate Hospital",
  "Fairmount",
  "Brewerytown",
  "Point Breeze",
  "East Passyunk",
  "Kensington",
  "South Philadelphia",
  "Chestnut Hill",
  "Manayunk",
  "Mount Airy",
  "University City",
  "West Philadelphia",
  "Queen Village",
  "Washington Square West",
  "Logan Square",
  "Art Museum District",
  "Francisville",
  "Bella Vista",
  "Passyunk Square",
];

export function OrganizationJsonLd({
  testimonials,
}: {
  testimonials?: Testimonial[];
}) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["RealEstateAgent", "LocalBusiness"],
    "@id": `${siteUrl}/#organization`,
    name: "Tauro | LYL Realty Group",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${siteUrl}/tauro-logo.png`,
      width: 512,
      height: 512,
    },
    image: `${siteUrl}/opengraph-image`,
    description:
      "Premium Philadelphia real estate brokerage serving Center City, Rittenhouse, Fishtown, and surrounding neighborhoods.",
    telephone: "+12158394172",
    email: "info@taurorealty.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1500 Walnut St, Suite 500",
      addressLocality: "Philadelphia",
      addressRegion: "PA",
      postalCode: "19102",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.9496,
      longitude: -75.1652,
    },
    sameAs: [
      "https://www.instagram.com/taurorealty",
      "https://www.linkedin.com/company/taurorealty",
      "https://www.facebook.com/taurorealty",
    ],
    areaServed: PHILADELPHIA_NEIGHBORHOODS.map((name) => ({
      "@type": "Place",
      name,
      containedInPlace: {
        "@type": "City",
        name: "Philadelphia",
        containedInPlace: {
          "@type": "State",
          name: "Pennsylvania",
        },
      },
    })),
    priceRange: "$375,000 - $6,800,000",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
  };

  if (testimonials && testimonials.length > 0) {
    const sum = testimonials.reduce((acc, t) => acc + t.rating, 0);
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: (sum / testimonials.length).toFixed(1),
      bestRating: "5",
      worstRating: "1",
      ratingCount: testimonials.length,
      reviewCount: testimonials.length,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  RealEstateListing — property detail pages                                 */
/* -------------------------------------------------------------------------- */

export function RealEstateListingJsonLd({
  property,
}: {
  property: Property;
}) {
  const statusMap: Record<string, string> = {
    Active: "https://schema.org/InStock",
    New: "https://schema.org/InStock",
    "Open House": "https://schema.org/InStock",
    Pending: "https://schema.org/LimitedAvailability",
    "Coming Soon": "https://schema.org/PreOrder",
  };

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: `${property.address}, ${property.city}, ${property.state} ${property.zip}`,
    description: property.description.slice(0, 200),
    url: `${siteUrl}/properties/${property.slug}`,
    image: property.images,
    datePosted: property.listingDate || new Date().toISOString().split("T")[0],
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: "USD",
      availability: statusMap[property.status] || "https://schema.org/InStock",
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
      unitCode: "FTK",
    },
    numberOfRooms: property.beds,
    numberOfBathroomsTotal: property.baths,
    yearBuilt: property.yearBuilt,
    broker: {
      "@type": "RealEstateAgent",
      name: property.agent.name,
      telephone: property.agent.phone,
      email: property.agent.email,
      image: property.agent.photo,
    },
  };

  // Add open house event if scheduled
  if (property.openHouseEvent) {
    jsonLd.event = {
      "@type": "Event",
      name: `Open House: ${property.address}`,
      startDate: `${property.openHouseEvent.date}T${property.openHouseEvent.startTime}:00`,
      endDate: `${property.openHouseEvent.date}T${property.openHouseEvent.endTime}:00`,
      location: {
        "@type": "Place",
        name: property.address,
        address: {
          "@type": "PostalAddress",
          streetAddress: property.address,
          addressLocality: property.city,
          addressRegion: property.state,
          postalCode: property.zip,
        },
      },
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  RealEstateAgent — agent profile pages                                     */
/* -------------------------------------------------------------------------- */

export function RealEstateAgentJsonLd({ agent }: { agent: Agent }) {
  const sameAs: string[] = [];
  if (agent.social.instagram) sameAs.push(agent.social.instagram);
  if (agent.social.linkedin) sameAs.push(agent.social.linkedin);
  if (agent.social.facebook) sameAs.push(agent.social.facebook);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: agent.fullName,
    url: `${siteUrl}/agents/${agent.slug}`,
    image: agent.photo,
    telephone: agent.phone,
    email: agent.email,
    jobTitle: agent.title,
    description: agent.bio,
    worksFor: {
      "@type": "RealEstateAgent",
      "@id": `${siteUrl}/#organization`,
      name: "Tauro | LYL Realty Group",
      url: siteUrl,
    },
    areaServed: agent.neighborhoods.map((name) => ({
      "@type": "Place",
      name,
      containedInPlace: {
        "@type": "City",
        name: "Philadelphia",
      },
    })),
    knowsLanguage: agent.languages,
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*  WebSite with SearchAction — homepage sitelinks search box                 */
/* -------------------------------------------------------------------------- */

export function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tauro Realty",
    url: siteUrl,
    publisher: {
      "@type": "RealEstateAgent",
      "@id": `${siteUrl}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/properties?q={search_term_string}`,
      },
      "query-input": {
        "@type": "PropertyValueSpecification",
        valueRequired: true,
        valueName: "search_term_string",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
