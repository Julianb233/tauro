export interface Property {
  id: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  lotSqft: number;
  yearBuilt: number;
  status: "Active" | "Pending" | "Open House" | "New";
  propertyType: "Single Family" | "Condo" | "Townhouse" | "Multi-Family" | "Land";
  images: string[];
  description: string;
  features: {
    interior: string[];
    exterior: string[];
    community: string[];
  };
  agent: {
    name: string;
    phone: string;
    email: string;
    photo: string;
  };
  lat: number;
  lng: number;
  openHouse?: string;
  videoUrl?: string;
  virtualTourUrl?: string;
}

export const properties: Property[] = [
  {
    id: "1",
    slug: "1820-rittenhouse-sq-philadelphia",
    address: "1820 Rittenhouse Square",
    city: "Philadelphia",
    state: "PA",
    zip: "19103",
    price: 3250000,
    beds: 5,
    baths: 5,
    sqft: 4800,
    lotSqft: 3200,
    yearBuilt: 1920,
    status: "Active",
    propertyType: "Townhouse",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
    ],
    description:
      "Grand Rittenhouse Square townhome with impeccable period details and modern luxury throughout. Five bedrooms, a chef's kitchen, private garden, and a rooftop terrace overlooking the Square. Steps from Philadelphia's finest dining, shopping, and cultural institutions.",
    features: {
      interior: [
        "Original Crown Moldings",
        "Chef's Kitchen",
        "Marble Fireplaces",
        "Wine Cellar",
        "Home Office",
      ],
      exterior: [
        "Private Garden",
        "Rooftop Terrace",
        "Rittenhouse Views",
        "2-Car Garage",
        "Covered Patio",
      ],
      community: [
        "Rittenhouse Square",
        "Walk to Fine Dining",
        "Near Kimmel Center",
        "Top-Rated Schools",
        "Museum District",
      ],
    },
    agent: {
      name: "Julian Bradley",
      phone: "(215) 555-0100",
      email: "julian@tauro.realty",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    },
    lat: 39.9493,
    lng: -75.1718,
    openHouse: "Sat, Mar 22 · 1:00 PM - 4:00 PM",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    virtualTourUrl: "https://my.matterport.com/show/?m=SxQL3iGyvkk",
  },
  {
    id: "2",
    slug: "312-delancey-st-society-hill",
    address: "312 Delancey St",
    city: "Philadelphia",
    state: "PA",
    zip: "19106",
    price: 4750000,
    beds: 5,
    baths: 4,
    sqft: 4200,
    lotSqft: 2800,
    yearBuilt: 1790,
    status: "New",
    propertyType: "Single Family",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
    ],
    description:
      "Exquisite Federal-style residence in Society Hill, meticulously restored with museum-quality finishes. Original exposed brick, wide-plank pine floors, and seven fireplaces complement a stunning modern kitchen and spa-like primary suite. One of Philadelphia's most distinguished addresses.",
    features: {
      interior: [
        "7 Fireplaces",
        "Wide-Plank Pine Floors",
        "Chef's Kitchen",
        "Exposed Brick",
        "Library",
        "Heated Floors",
      ],
      exterior: [
        "Walled Garden",
        "Brick Patio",
        "Carriage House",
        "Historic Facade",
        "Off-Street Parking",
      ],
      community: [
        "Society Hill",
        "Walk to Penn's Landing",
        "Headhouse Square",
        "Independence Hall",
        "Fine Dining",
      ],
    },
    agent: {
      name: "Sofia Martinez",
      phone: "(215) 555-0200",
      email: "sofia@tauro.realty",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    },
    lat: 39.9431,
    lng: -75.1479,
  },
  {
    id: "3",
    slug: "2401-pennsylvania-ave-fairmount",
    address: "2401 Pennsylvania Ave #PH1",
    city: "Philadelphia",
    state: "PA",
    zip: "19130",
    price: 6800000,
    beds: 4,
    baths: 5,
    sqft: 5600,
    lotSqft: 0,
    yearBuilt: 2022,
    status: "Active",
    propertyType: "Condo",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
    ],
    description:
      "Ultra-luxury penthouse overlooking the Philadelphia Museum of Art and Schuylkill River. Floor-to-ceiling glass walls, private elevator entry, two terraces totaling 1,200 SF, and panoramic skyline views from every room. The pinnacle of modern Philadelphia living.",
    features: {
      interior: [
        "Private Elevator Entry",
        "Floor-to-Ceiling Glass",
        "Smart Home Automation",
        "Primary Suite Terrace",
        "Wine Room",
        "Custom Italian Kitchen",
      ],
      exterior: [
        "Two Terraces (1,200 SF)",
        "Skyline Views",
        "Museum & River Views",
        "Concierge Service",
        "3-Car Garage",
      ],
      community: [
        "Near Art Museum",
        "Fairmount Park",
        "Boathouse Row",
        "Schuylkill River Trail",
        "Fine Dining",
      ],
    },
    agent: {
      name: "Julian Bradley",
      phone: "(215) 555-0100",
      email: "julian@tauro.realty",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    },
    lat: 39.9615,
    lng: -75.1756,
  },
  {
    id: "4",
    slug: "1500-chestnut-st-center-city",
    address: "1500 Chestnut St #2204",
    city: "Philadelphia",
    state: "PA",
    zip: "19102",
    price: 895000,
    beds: 2,
    baths: 2,
    sqft: 1350,
    lotSqft: 0,
    yearBuilt: 2021,
    status: "Open House",
    propertyType: "Condo",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
    ],
    description:
      "Sleek Center City condo in a full-service building with 24/7 concierge. Open concept living with floor-to-ceiling windows and a private balcony overlooking City Hall. Walking distance to world-class dining, Broad Street theaters, and Rittenhouse Square.",
    features: {
      interior: [
        "Quartz Countertops",
        "Custom Cabinetry",
        "Floor-to-Ceiling Windows",
        "In-Unit Laundry",
        "Central AC",
      ],
      exterior: ["Private Balcony", "City Hall Views", "Rooftop Pool", "Secured Parking"],
      community: [
        "Center City",
        "Broad Street Theaters",
        "Rittenhouse Square",
        "Reading Terminal Market",
        "Public Transit Hub",
      ],
    },
    agent: {
      name: "Sofia Martinez",
      phone: "(215) 555-0200",
      email: "sofia@tauro.realty",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    },
    lat: 39.9510,
    lng: -75.1660,
    openHouse: "Sun, Mar 23 · 11:00 AM - 2:00 PM",
    virtualTourUrl: "https://my.matterport.com/show/?m=SxQL3iGyvkk",
  },
  {
    id: "5",
    slug: "734-s-front-st-queen-village",
    address: "734 S Front St",
    city: "Philadelphia",
    state: "PA",
    zip: "19147",
    price: 1950000,
    beds: 4,
    baths: 3,
    sqft: 3100,
    lotSqft: 1800,
    yearBuilt: 2019,
    status: "Active",
    propertyType: "Townhouse",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
    ],
    description:
      "Stunning new-construction townhome in Queen Village with designer finishes throughout. Open concept living with a custom chef's kitchen, rooftop deck with skyline views, and a private garage. Steps from South Street, Italian Market, and the Delaware River waterfront.",
    features: {
      interior: [
        "Open Floor Plan",
        "Chef's Kitchen",
        "Custom Millwork",
        "Primary Suite",
        "Home Office",
      ],
      exterior: ["Rooftop Deck", "Skyline Views", "Private Garage", "Patio Garden", "EV Charging"],
      community: [
        "Queen Village",
        "Italian Market",
        "South Street",
        "Delaware Waterfront",
        "Parks & Trails",
      ],
    },
    agent: {
      name: "Julian Bradley",
      phone: "(215) 555-0100",
      email: "julian@tauro.realty",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    },
    lat: 39.9378,
    lng: -75.1442,
  },
  {
    id: "6",
    slug: "2038-e-hagert-st-fishtown",
    address: "2038 E Hagert St",
    city: "Philadelphia",
    state: "PA",
    zip: "19125",
    price: 1275000,
    beds: 3,
    baths: 3,
    sqft: 2200,
    lotSqft: 1100,
    yearBuilt: 2023,
    status: "Pending",
    propertyType: "Townhouse",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
    ],
    description:
      "Brand-new Fishtown townhome blending industrial chic with modern luxury. Soaring ceilings, exposed ductwork, a gourmet kitchen with waterfall island, and a private rooftop with Center City skyline views. Walk to Frankford Avenue's best restaurants, breweries, and boutiques.",
    features: {
      interior: [
        "10-Foot Ceilings",
        "Waterfall Island",
        "Exposed Ductwork",
        "Custom Tile Work",
        "Smart Home System",
      ],
      exterior: [
        "Rooftop Deck",
        "Skyline Views",
        "Private Patio",
        "Integral Garage",
      ],
      community: [
        "Frankford Avenue",
        "Breweries & Cafes",
        "Sugarhouse Casino",
        "Penn Treaty Park",
        "El Bar & Nightlife",
      ],
    },
    agent: {
      name: "Sofia Martinez",
      phone: "(215) 555-0200",
      email: "sofia@tauro.realty",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    },
    lat: 39.9735,
    lng: -75.1268,
  },
];

export function formatPrice(price: number): string {
  if (price >= 1_000_000) {
    const m = price / 1_000_000;
    return `$${m % 1 === 0 ? m.toFixed(0) : m.toFixed(2)}M`;
  }
  return `$${price.toLocaleString()}`;
}

export function formatPriceFull(price: number): string {
  return `$${price.toLocaleString()}`;
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}
