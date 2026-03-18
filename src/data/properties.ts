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
    slug: "1820-delancey-pl-rittenhouse",
    address: "1820 Delancey Place",
    city: "Philadelphia",
    state: "PA",
    zip: "19103",
    price: 3250000,
    beds: 6,
    baths: 5,
    sqft: 5200,
    lotSqft: 2800,
    yearBuilt: 1895,
    status: "Active",
    propertyType: "Single Family",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
    ],
    description:
      "Magnificent Rittenhouse Square brownstone with impeccably preserved Victorian details and modern luxury finishes. This 6-bedroom residence features soaring ceilings, original marble fireplaces, a chef's kitchen with Sub-Zero and Wolf appliances, and a private garden courtyard. One of the most distinguished addresses on Delancey Place.",
    features: {
      interior: [
        "Original Marble Fireplaces",
        "12-Foot Ceilings",
        "Chef's Kitchen",
        "Library with Built-Ins",
        "Primary Suite with Dressing Room",
      ],
      exterior: [
        "Private Garden Courtyard",
        "Brownstone Facade",
        "Roof Deck",
        "Secured Garage Parking",
        "Historic Iron Railings",
      ],
      community: [
        "Rittenhouse Square Park",
        "Fine Dining on Walnut St",
        "Art Galleries",
        "Boutique Shopping",
        "SEPTA Access",
      ],
    },
    agent: {
      name: "Julian Bradley",
      phone: "(215) 555-0100",
      email: "julian@tauro.realty",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    },
    lat: 39.9479,
    lng: -75.1727,
    openHouse: "Sat, Mar 22 · 1:00 PM - 4:00 PM",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    virtualTourUrl: "https://my.matterport.com/show/?m=SxQL3iGyvkk",
  },
  {
    id: "2",
    slug: "240-s-3rd-st-old-city",
    address: "240 S 3rd St #4A",
    city: "Philadelphia",
    state: "PA",
    zip: "19106",
    price: 895000,
    beds: 2,
    baths: 2,
    sqft: 1650,
    lotSqft: 0,
    yearBuilt: 2019,
    status: "New",
    propertyType: "Condo",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
    ],
    description:
      "Sleek modern condo in a converted Old City warehouse with exposed brick, oversized factory windows, and 14-foot ceilings. Open-concept living with a chef's kitchen, spa-inspired bath, and private balcony overlooking cobblestone streets. Walking distance to Penn's Landing and Independence Hall.",
    features: {
      interior: [
        "Exposed Brick Walls",
        "14-Foot Ceilings",
        "Floor-to-Ceiling Windows",
        "In-Unit Laundry",
        "Central AC",
      ],
      exterior: ["Private Balcony", "City Views", "Rooftop Deck (Shared)", "Secured Parking"],
      community: [
        "Old City Arts District",
        "Penn's Landing Waterfront",
        "Independence Hall",
        "Gallery Nights",
        "SEPTA & Trolley Access",
      ],
    },
    agent: {
      name: "Sofia Martinez",
      phone: "(215) 555-0200",
      email: "sofia@tauro.realty",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    },
    lat: 39.9434,
    lng: -75.1468,
    virtualTourUrl: "https://my.matterport.com/show/?m=SxQL3iGyvkk",
  },
  {
    id: "3",
    slug: "1501-front-st-fishtown",
    address: "1501 Front St",
    city: "Philadelphia",
    state: "PA",
    zip: "19125",
    price: 1475000,
    beds: 4,
    baths: 3,
    sqft: 2800,
    lotSqft: 1200,
    yearBuilt: 2022,
    status: "Active",
    propertyType: "Townhouse",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
    ],
    description:
      "Brand-new construction in the heart of Fishtown. This stunning 4-bedroom townhouse features a rooftop deck with skyline views, open-concept main floor with 10-foot ceilings, premium finishes throughout, and a private garage. Steps from Frankford Avenue's best restaurants, breweries, and the El.",
    features: {
      interior: [
        "Open Floor Plan",
        "10-Foot Ceilings",
        "Custom Cabinetry",
        "Quartz Countertops",
        "Smart Home System",
        "Primary Suite with Walk-In",
      ],
      exterior: [
        "Rooftop Deck",
        "Skyline Views",
        "Private Garage",
        "Front Patio",
        "Low Maintenance Facade",
      ],
      community: [
        "Frankford Ave Dining",
        "Fishtown Breweries",
        "El Train Access",
        "Music Venues",
        "Delaware River Trail",
      ],
    },
    agent: {
      name: "Julian Bradley",
      phone: "(215) 555-0100",
      email: "julian@tauro.realty",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    },
    lat: 39.9722,
    lng: -75.1275,
  },
  {
    id: "4",
    slug: "1925-pine-st-center-city",
    address: "1925 Pine St #8B",
    city: "Philadelphia",
    state: "PA",
    zip: "19103",
    price: 725000,
    beds: 2,
    baths: 2,
    sqft: 1200,
    lotSqft: 0,
    yearBuilt: 2020,
    status: "Open House",
    propertyType: "Condo",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
    ],
    description:
      "Modern boutique condo in the Graduate Hospital neighborhood of Center City. Sun-drenched 2-bedroom with floor-to-ceiling windows, European kitchen, spa bath, and a private balcony. Full-service building with gym, concierge, and rooftop pool. Walk score of 97.",
    features: {
      interior: [
        "Quartz Countertops",
        "European Cabinetry",
        "Floor-to-Ceiling Windows",
        "In-Unit Laundry",
        "Hardwood Floors",
      ],
      exterior: ["Private Balcony", "Rooftop Pool", "Fitness Center", "Bike Storage"],
      community: [
        "Graduate Hospital",
        "South Street Shops",
        "SEPTA Broad Street Line",
        "Schuylkill River Trail",
        "Rittenhouse Square Nearby",
      ],
    },
    agent: {
      name: "Sofia Martinez",
      phone: "(215) 555-0200",
      email: "sofia@tauro.realty",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    },
    lat: 39.9449,
    lng: -75.1762,
    openHouse: "Sun, Mar 23 · 11:00 AM - 2:00 PM",
  },
  {
    id: "5",
    slug: "312-chestnut-hill-ave",
    address: "312 Chestnut Hill Ave",
    city: "Philadelphia",
    state: "PA",
    zip: "19118",
    price: 1950000,
    beds: 5,
    baths: 4,
    sqft: 4100,
    lotSqft: 12000,
    yearBuilt: 1920,
    status: "Active",
    propertyType: "Single Family",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200",
    ],
    description:
      "Stately Chestnut Hill stone colonial on a tree-lined avenue. Meticulously restored with a modern addition, this 5-bedroom home features original chestnut woodwork, a gourmet kitchen, finished lower level, and a sprawling private yard with mature gardens. Top-rated Chestnut Hill Academy nearby.",
    features: {
      interior: [
        "Original Chestnut Woodwork",
        "Gourmet Kitchen",
        "Finished Lower Level",
        "Home Office",
        "Mudroom",
      ],
      exterior: [
        "Stone Facade",
        "Mature Gardens",
        "Detached 2-Car Garage",
        "Covered Porch",
        "Level Yard",
      ],
      community: [
        "Chestnut Hill Avenue Shops",
        "Wissahickon Valley Park",
        "Top-Rated Schools",
        "SEPTA Regional Rail",
        "Morris Arboretum",
      ],
    },
    agent: {
      name: "Julian Bradley",
      phone: "(215) 555-0100",
      email: "julian@tauro.realty",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    },
    lat: 40.0735,
    lng: -75.2063,
  },
  {
    id: "6",
    slug: "843-n-2nd-st-northern-liberties",
    address: "843 N 2nd St",
    city: "Philadelphia",
    state: "PA",
    zip: "19123",
    price: 1275000,
    beds: 3,
    baths: 3,
    sqft: 2200,
    lotSqft: 900,
    yearBuilt: 2021,
    status: "Pending",
    propertyType: "Townhouse",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200",
    ],
    description:
      "Contemporary Northern Liberties townhouse with a striking modern design. Three bedrooms across four finished levels including a rooftop deck with Center City skyline views. Designer kitchen with waterfall island, spa-inspired primary bath, and a private garage. Steps from Piazza at Schmidt's.",
    features: {
      interior: [
        "Waterfall Kitchen Island",
        "Spa-Inspired Primary Bath",
        "Wide-Plank Oak Floors",
        "Custom Lighting",
        "Built-In Shelving",
      ],
      exterior: [
        "Rooftop Deck",
        "Skyline Views",
        "Private Garage",
        "Low Maintenance Facade",
      ],
      community: [
        "Piazza at Schmidt's",
        "Liberty Lands Park",
        "Boutique Restaurants",
        "Spring Garden Station",
        "Girard Ave Corridor",
      ],
    },
    agent: {
      name: "Sofia Martinez",
      phone: "(215) 555-0200",
      email: "sofia@tauro.realty",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    },
    lat: 39.9637,
    lng: -75.1423,
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
