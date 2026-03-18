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
    slug: "3381-oceanfront-walk-mission-beach",
    address: "3381 Oceanfront Walk",
    city: "Mission Beach",
    state: "CA",
    zip: "92109",
    price: 3250000,
    beds: 6,
    baths: 6,
    sqft: 2212,
    lotSqft: 2718,
    yearBuilt: 1937,
    status: "Active",
    propertyType: "Multi-Family",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
    ],
    description:
      "Iconic beachfront multi-family property on the Mission Beach boardwalk. Six units, each featuring 2 bedrooms and 1 bath, offering panoramic ocean views and direct beach access. An exceptional investment opportunity in one of San Diego's most sought-after coastal locations. The property features a prime location for short-term vacation rentals with year-round demand.",
    features: {
      interior: [
        "Hardwood Floors",
        "Updated Kitchens",
        "In-Unit Laundry",
        "Ocean View Windows",
        "Central Heating",
      ],
      exterior: [
        "Oceanfront Location",
        "Private Patios",
        "Outdoor Shower",
        "Bike Storage",
        "Beach Access",
      ],
      community: [
        "Walk to Restaurants",
        "Near Belmont Park",
        "Public Transit Access",
        "Surf Shops Nearby",
        "Beach Volleyball Courts",
      ],
    },
    agent: {
      name: "Julian Bradley",
      phone: "(619) 555-0100",
      email: "julian@tauro.com",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    },
    lat: 32.7707,
    lng: -117.2537,
    openHouse: "Sat, Mar 22 · 1:00 PM - 4:00 PM",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    virtualTourUrl: "https://my.matterport.com/show/?m=SxQL3iGyvkk",
  },
  {
    id: "2",
    slug: "1247-prospect-st-la-jolla",
    address: "1247 Prospect St",
    city: "La Jolla",
    state: "CA",
    zip: "92037",
    price: 4750000,
    beds: 5,
    baths: 4,
    sqft: 4200,
    lotSqft: 6500,
    yearBuilt: 2018,
    status: "New",
    propertyType: "Single Family",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
    ],
    description:
      "Stunning contemporary residence in the heart of La Jolla Village. This architectural masterpiece features floor-to-ceiling windows, a gourmet chef's kitchen, and expansive outdoor living spaces with ocean views. Smart home technology throughout with premium finishes at every turn.",
    features: {
      interior: [
        "Floor-to-Ceiling Windows",
        "Chef's Kitchen",
        "Smart Home System",
        "Wine Cellar",
        "Home Theater",
        "Heated Floors",
      ],
      exterior: [
        "Infinity Pool",
        "Outdoor Kitchen",
        "Fire Pit",
        "Ocean Views",
        "3-Car Garage",
      ],
      community: [
        "Walk to Village",
        "Near La Jolla Cove",
        "Top-Rated Schools",
        "Fine Dining",
        "Art Galleries",
      ],
    },
    agent: {
      name: "Sofia Martinez",
      phone: "(619) 555-0200",
      email: "sofia@tauro.com",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    },
    lat: 32.8491,
    lng: -117.2727,
  },
  {
    id: "3",
    slug: "8920-la-jolla-scenic-dr",
    address: "8920 La Jolla Scenic Dr N",
    city: "La Jolla",
    state: "CA",
    zip: "92037",
    price: 6800000,
    beds: 6,
    baths: 7,
    sqft: 6800,
    lotSqft: 12000,
    yearBuilt: 2020,
    status: "Active",
    propertyType: "Single Family",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
    ],
    description:
      "Ultra-luxury estate with panoramic ocean and canyon views. This newly constructed masterpiece offers resort-style living with a vanishing-edge pool, private spa, and state-of-the-art home automation. The open floor plan seamlessly blends indoor and outdoor living spaces.",
    features: {
      interior: [
        "Open Floor Plan",
        "Primary Suite with Balcony",
        "Custom Millwork",
        "Elevator",
        "Gym",
        "Smart Home Automation",
      ],
      exterior: [
        "Vanishing-Edge Pool",
        "Private Spa",
        "Outdoor Fireplace",
        "Panoramic Views",
        "Gated Entry",
      ],
      community: [
        "Torrey Pines Nearby",
        "UCSD Proximity",
        "Golf Courses",
        "Hiking Trails",
        "Private Beach Access",
      ],
    },
    agent: {
      name: "Julian Bradley",
      phone: "(619) 555-0100",
      email: "julian@tauro.com",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    },
    lat: 32.8601,
    lng: -117.2538,
  },
  {
    id: "4",
    slug: "655-india-st-downtown",
    address: "655 India St #302",
    city: "San Diego",
    state: "CA",
    zip: "92101",
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
      "Modern luxury condo in the heart of Little Italy. Open concept living with floor-to-ceiling windows and a private balcony overlooking the city skyline. Walking distance to world-class dining, waterfront parks, and the vibrant downtown scene.",
    features: {
      interior: [
        "Quartz Countertops",
        "European Cabinetry",
        "Floor-to-Ceiling Windows",
        "In-Unit Laundry",
        "Central AC",
      ],
      exterior: ["Private Balcony", "City Views", "Rooftop Deck (Shared)", "Secured Parking"],
      community: [
        "Little Italy District",
        "Waterfront Park",
        "Public Transit",
        "Nightlife",
        "Farmers Market",
      ],
    },
    agent: {
      name: "Sofia Martinez",
      phone: "(619) 555-0200",
      email: "sofia@tauro.com",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    },
    lat: 32.7224,
    lng: -117.168,
    openHouse: "Sun, Mar 23 · 11:00 AM - 2:00 PM",
    virtualTourUrl: "https://my.matterport.com/show/?m=SxQL3iGyvkk",
  },
  {
    id: "5",
    slug: "2100-el-camino-real-carlsbad",
    address: "2100 El Camino Real",
    city: "Carlsbad",
    state: "CA",
    zip: "92008",
    price: 1950000,
    beds: 4,
    baths: 3,
    sqft: 3100,
    lotSqft: 8500,
    yearBuilt: 2015,
    status: "Active",
    propertyType: "Single Family",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
    ],
    description:
      "Beautiful Carlsbad family home with designer upgrades throughout. Open concept great room with custom built-ins, gourmet kitchen with oversized island, and a resort-style backyard with pool, spa, and built-in BBQ. Close to the beach and top-rated schools.",
    features: {
      interior: [
        "Great Room",
        "Gourmet Kitchen",
        "Custom Built-Ins",
        "Primary Suite",
        "Bonus Room",
      ],
      exterior: ["Pool & Spa", "Built-In BBQ", "Landscaped Yard", "2-Car Garage", "Solar Panels"],
      community: [
        "Near Carlsbad Beach",
        "Top Schools",
        "Shopping Centers",
        "LEGOLAND Proximity",
        "Golf Courses",
      ],
    },
    agent: {
      name: "Julian Bradley",
      phone: "(619) 555-0100",
      email: "julian@tauro.com",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    },
    lat: 33.1581,
    lng: -117.3506,
  },
  {
    id: "6",
    slug: "4401-twiggs-st-hillcrest",
    address: "4401 Twiggs St",
    city: "San Diego",
    state: "CA",
    zip: "92103",
    price: 1275000,
    beds: 3,
    baths: 2,
    sqft: 1800,
    lotSqft: 5200,
    yearBuilt: 1948,
    status: "Pending",
    propertyType: "Single Family",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
    ],
    description:
      "Charming mid-century home in the heart of Hillcrest with thoughtful modern updates. Original character preserved with updated kitchen and baths. Large private yard with mature landscaping. Walk to restaurants, shops, and Balboa Park.",
    features: {
      interior: [
        "Original Hardwood Floors",
        "Updated Kitchen",
        "Fireplace",
        "Skylights",
        "Built-In Shelving",
      ],
      exterior: [
        "Large Private Yard",
        "Mature Landscaping",
        "Detached Garage",
        "Covered Patio",
      ],
      community: [
        "Walkable Neighborhood",
        "Near Balboa Park",
        "Restaurants & Cafes",
        "Farmers Market",
        "Vibrant Nightlife",
      ],
    },
    agent: {
      name: "Sofia Martinez",
      phone: "(619) 555-0200",
      email: "sofia@tauro.com",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    },
    lat: 32.7486,
    lng: -117.1611,
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
