export interface Room {
  name: string;
  size?: string;
  dimensions?: string;
  level?: string;
  description?: string;
}

export interface Property {
  id: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  neighborhood: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  lotSqft: number;
  yearBuilt: number;
  status: "Active" | "Pending" | "Open House" | "New" | "Coming Soon";
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
    slug?: string;
  };
  lat: number;
  lng: number;
  openHouse?: string;
  openHouseEvent?: {
    date: string;       // YYYY-MM-DD
    startTime: string;  // HH:MM (24h)
    endTime: string;    // HH:MM (24h)
  };
  videoUrl?: string;
  videoTourUrl?: string;
  virtualTourUrl?: string;
  tax_annual: number;
  tax_year: number;
  hoa_fee?: number;           // Monthly HOA/maintenance fee amount in dollars
  hoa_frequency?: "monthly" | "quarterly" | "annual";
  has_hoa?: boolean;          // Whether property is in an HOA
  isComingSoon?: boolean;
  /** AI-3806: New construction flag */
  isNewConstruction?: boolean;
/** AI-3786: Date the property was listed (YYYY-MM-DD) */
  listingDate?: string;
isExclusive?: boolean;
  mlsNumber?: string;
  /** AI-3872: Lifestyle/property tags for browsing */
  tags?: string[];
  // AI-3891: Comprehensive property details
  heating?: string;
  cooling?: string;
  garage?: string;
  parkingSpaces?: number;
  stories?: number;
  construction?: string;
  flooring?: string[];
  roofType?: string;
  rooms?: Room[];
  priceHistory?: { date: string; price: number; event: string }[];
  /** AI-3770: Floor plan images with labels */
  floorPlans?: { src: string; label: string }[];
}

export const properties: Property[] = [
  {
    id: "1",
    slug: "1820-rittenhouse-sq-philadelphia",
    address: "1820 Rittenhouse Square",
    city: "Philadelphia",
    state: "PA",
    zip: "19103",
    neighborhood: "Rittenhouse",
    price: 3250000,
    beds: 5,
    baths: 5,
    sqft: 4800,
    lotSqft: 3200,
    yearBuilt: 1920,
    status: "Active",
    propertyType: "Townhouse",
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    ],
    description:
      "There are addresses, and then there is 1820 Rittenhouse Square. This grand four-story townhome commands one of Philadelphia's most coveted positions, where century-old sycamores frame views of the city's most beloved park. Inside, impeccable period details — hand-carved crown moldings, marble mantels, and inlaid hardwood floors — exist in seamless dialogue with modern luxuries: a professional-grade chef's kitchen, a temperature-controlled wine cellar, and a primary suite that feels more like a private retreat. Step onto the rooftop terrace with your morning coffee and watch the Square come alive below. This is not simply a home; it is a front-row seat to Philadelphia's most elegant way of life.",
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
      name: "Tony Goodman",
      phone: "(215) 427-2870",
      email: "tcupone@aol.com",
      photo: "/agents/tony-goodman.jpg",
      slug: "tony-goodman",
    },
    lat: 39.9493,
    lng: -75.1718,
    tax_annual: 45500,
    tax_year: 2025,
    hoa_fee: 250,
    hoa_frequency: "monthly",
    has_hoa: true,
    openHouse: "Sat, Mar 22 · 1:00 PM - 4:00 PM",
    openHouseEvent: { date: "2026-03-22", startTime: "13:00", endTime: "16:00" },
    videoUrl: "https://www.youtube.com/embed/D6_9B2I9e9o",
    videoTourUrl: "D6_9B2I9e9o",
    virtualTourUrl: "https://my.matterport.com/show/?m=SxQL3iGyoDo",
    mlsNumber: "PAPH2385001",
    listingDate: "2026-02-15",
    heating: "Forced Air, Gas",
    cooling: "Central Air",
    garage: "Attached 2-Car",
    parkingSpaces: 2,
    stories: 4,
    construction: "Brick, Stone",
    flooring: ["Hardwood", "Marble", "Tile"],
    roofType: "Slate",
    rooms: [
      { name: "Primary Suite", size: "24x18", level: "3rd Floor" },
      { name: "Kitchen", size: "20x16", level: "1st Floor" },
      { name: "Living Room", size: "22x18", level: "1st Floor" },
      { name: "Dining Room", size: "18x14", level: "1st Floor" },
      { name: "Home Office", size: "14x12", level: "2nd Floor" },
    ],
    priceHistory: [
      { date: "2025-09-15", price: 3450000, event: "Listed" },
      { date: "2025-11-01", price: 3350000, event: "Price Reduced" },
      { date: "2026-01-10", price: 3250000, event: "Price Reduced" },
    ],
    floorPlans: [
      { src: "/floorplans/1820-rittenhouse-floor1.svg", label: "First Floor" },
      { src: "/floorplans/1820-rittenhouse-floor2.svg", label: "Second Floor" },
    ],
  },
  {
    id: "2",
    slug: "312-delancey-st-society-hill",
    address: "312 Delancey St",
    city: "Philadelphia",
    state: "PA",
    zip: "19106",
    neighborhood: "Old City",
    price: 4750000,
    beds: 5,
    baths: 4,
    sqft: 4200,
    lotSqft: 2800,
    yearBuilt: 1790,
    status: "New",
    propertyType: "Single Family",
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80",
    ],
    description:
      "Built the same year George Washington took office, this Federal-style masterpiece on Delancey Street has been reimagined for the way we live now — without sacrificing a single whisper of its storied past. Seven fireplaces anchor rooms dressed in original exposed brick and wide-plank pine floors that creak with two centuries of history. The restoration is meticulous: museum-quality plaster details alongside a chef's kitchen clad in honed marble, heated bathroom floors, and a primary suite that could pass for a boutique hotel. Out back, a walled garden offers the rarest of Philadelphia luxuries — absolute privacy in the heart of Society Hill.",
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
      name: "Shaquonda Garrett",
      phone: "(215) 817-5777",
      email: "shaquonda@exitbenchmark.com",
      photo: "/agents/shaquonda-garrett.jpg",
      slug: "shaquonda-garrett",
    },
    lat: 39.9431,
    lng: -75.1479,
    tax_annual: 66500,
    tax_year: 2025,
    videoUrl: "https://www.youtube.com/embed/cuVKO4iRPzM",
    videoTourUrl: "cuVKO4iRPzM",
    virtualTourUrl: "https://my.matterport.com/show/?m=oj3GnqCwEvR",
    mlsNumber: "PAPH2312002",
    listingDate: "2026-03-01",
    heating: "Hot Water Radiant",
    cooling: "Window Units",
    garage: "Detached Carriage House",
    parkingSpaces: 2,
    stories: 3,
    construction: "Historic Brick, Timber Frame",
    flooring: ["Wide-Plank Pine", "Brick", "Tile"],
    roofType: "Copper",
    rooms: [
      { name: "Primary Suite", size: "22x20", level: "3rd Floor" },
      { name: "Parlor", size: "24x18", level: "1st Floor" },
      { name: "Library", size: "16x14", level: "2nd Floor" },
      { name: "Kitchen", size: "20x16", level: "1st Floor" },
      { name: "Dining Room", size: "18x16", level: "1st Floor" },
    ],
    priceHistory: [
      { date: "2025-06-01", price: 4950000, event: "Listed" },
      { date: "2025-08-15", price: 4750000, event: "Price Reduced" },
    ],
    floorPlans: [
      { src: "/floorplans/312-delancey-floor1.svg", label: "Main Level" },
    ],
  },
  {
    id: "3",
    slug: "2401-pennsylvania-ave-fairmount",
    address: "2401 Pennsylvania Ave #PH1",
    city: "Philadelphia",
    state: "PA",
    zip: "19130",
    neighborhood: "Center City",
    price: 6800000,
    beds: 4,
    baths: 5,
    sqft: 5600,
    lotSqft: 0,
    yearBuilt: 2022,
    isNewConstruction: true,
    status: "Active",
    propertyType: "Condo",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1200&q=80",
    ],
    description:
      "Floating above the city like a glass pavilion in the sky, this penthouse redefines what it means to live at the top. Your private elevator opens directly into 5,600 square feet of uninterrupted space where floor-to-ceiling glass dissolves the boundary between indoors and out, framing the Philadelphia Museum of Art, the serpentine Schuylkill River, and a skyline that burns gold at sunset. Two wraparound terraces — 1,200 square feet of outdoor living — invite barefoot entertaining high above the noise. Every surface has been considered: custom Italian cabinetry, smart-home automation that anticipates your needs, and a wine room for the collection you have been building. This is the pinnacle.",
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
      name: "Morris A. Brown",
      phone: "(215) 416-9113",
      email: "morris@exitbenchmark.com",
      photo: "/agents/morris-brown.jpg",
      slug: "morris-brown",
    },
    lat: 39.9615,
    lng: -75.1756,
    tax_annual: 95200,
    tax_year: 2025,
    hoa_fee: 850,
    hoa_frequency: "monthly",
    has_hoa: true,
    openHouse: "Sat, Mar 22 · 12:00 PM - 2:00 PM",
    openHouseEvent: { date: "2026-03-22", startTime: "12:00", endTime: "14:00" },
    videoUrl: "https://www.youtube.com/embed/gbZnF0aY1qs",
    videoTourUrl: "gbZnF0aY1qs",
    virtualTourUrl: "https://my.matterport.com/show/?m=iSMwSo2xECA",
    isComingSoon: true,
    mlsNumber: "PAPH2398003",
    listingDate: "2026-03-18",
    heating: "Radiant Floor, Electric",
    cooling: "Central Air",
    garage: "3-Car Private Garage",
    parkingSpaces: 3,
    stories: 1,
    construction: "Steel, Glass",
    flooring: ["Porcelain Tile", "White Oak Hardwood"],
    roofType: "Membrane (High-Rise)",
    rooms: [
      { name: "Primary Suite", size: "30x22", level: "Penthouse" },
      { name: "Great Room", size: "45x32", level: "Penthouse" },
      { name: "Kitchen", size: "24x18", level: "Penthouse" },
      { name: "Media Room", size: "22x18", level: "Penthouse" },
    ],
    priceHistory: [
      { date: "2025-03-20", price: 1850000, event: "Listed" },
      { date: "2025-05-10", price: 1850000, event: "Pending" },
      { date: "2025-06-01", price: 1850000, event: "Back on Market" },
      { date: "2025-09-15", price: 1750000, event: "Price Reduced" },
    ],
    floorPlans: [
      { src: "/floorplans/2401-pennsylvania-unit.svg", label: "Unit Layout" },
    ],
  },
  {
    id: "4",
    slug: "1500-chestnut-st-center-city",
    address: "1500 Chestnut St #2204",
    city: "Philadelphia",
    state: "PA",
    zip: "19102",
    neighborhood: "Center City",
    price: 895000,
    beds: 2,
    baths: 2,
    sqft: 1350,
    lotSqft: 0,
    yearBuilt: 2021,
    status: "Open House",
    propertyType: "Condo",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    ],
    description:
      "Wake up to the illuminated clock tower of City Hall, step onto your private balcony with coffee in hand, and survey the most walkable square mile in America. This sleek Center City condo wraps you in floor-to-ceiling glass and the quiet confidence of a full-service building — 24/7 concierge, doorman, and the kind of seamless convenience that turns every errand into a pleasant walk. The open living space is flooded with natural light, designed for both intimate evenings and effortless entertaining. Below your feet: Broad Street's theater row, Rittenhouse Square's boutiques, and restaurants that consistently land on every national best-of list.",
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
      name: "Chris Lane",
      phone: "(215) 427-2870",
      email: "chris@exitbenchmark.com",
      photo: "/agents/chris-lane.jpg",
      slug: "chris-lane",
    },
    lat: 39.951,
    lng: -75.166,
    tax_annual: 12530,
    tax_year: 2025,
    hoa_fee: 650,
    hoa_frequency: "monthly",
    has_hoa: true,
    openHouse: "Sun, Mar 23 · 11:00 AM - 2:00 PM",
    openHouseEvent: { date: "2026-03-23", startTime: "11:00", endTime: "14:00" },
    videoUrl: "https://www.youtube.com/embed/dkdrcVR83NU",
    videoTourUrl: "dkdrcVR83NU",
    mlsNumber: "PAPH2361004",
    listingDate: "2026-01-20",
    heating: "Forced Air, Electric",
    cooling: "Central Air",
    garage: "Secured Parking (1 Space)",
    parkingSpaces: 1,
    stories: 1,
    construction: "Concrete, Steel",
    flooring: ["Hardwood", "Tile"],
    roofType: "Membrane (High-Rise)",
    rooms: [
      { name: "Primary Bedroom", size: "16x14", level: "22nd Floor" },
      { name: "Second Bedroom", size: "13x12", level: "22nd Floor" },
      { name: "Living/Dining", size: "24x18", level: "22nd Floor" },
    ],
    priceHistory: [
      { date: "2026-01-05", price: 895000, event: "Listed" },
    ],
  },
  {
    id: "5",
    slug: "734-s-front-st-queen-village",
    address: "734 S Front St",
    city: "Philadelphia",
    state: "PA",
    zip: "19147",
    neighborhood: "South Philly",
    price: 1950000,
    beds: 4,
    baths: 3,
    sqft: 3100,
    lotSqft: 1800,
    yearBuilt: 2019,
    status: "Active",
    propertyType: "Townhouse",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    ],
    description:
      "Queen Village has always been Philadelphia's best-kept secret — cobblestone streets, century-old trees, and a village-within-a-city charm that money cannot manufacture. This brand-new townhome honors the neighborhood's character while delivering everything modern buyers demand: sun-drenched open living anchored by a custom chef's kitchen with waterfall stone countertops, designer fixtures chosen with an architect's eye, and a private rooftop deck where the skyline unfolds like a postcard. The Italian Market is a morning stroll away, the Delaware River waterfront beckons for evening runs, and your private garage means never circling the block again.",
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
      name: "Tony Goodman",
      phone: "(215) 427-2870",
      email: "tcupone@aol.com",
      photo: "/agents/tony-goodman.jpg",
      slug: "tony-goodman",
    },
    lat: 39.9378,
    lng: -75.1442,
    tax_annual: 27300,
    tax_year: 2025,
    hoa_fee: 300,
    hoa_frequency: "monthly",
    has_hoa: true,
    videoUrl: "https://www.youtube.com/embed/ev7nhD-EE6M",
    videoTourUrl: "ev7nhD-EE6M",
    mlsNumber: "PAPH2347005",
    listingDate: "2026-02-28",
    heating: "Forced Air, Gas",
    cooling: "Central Air",
    garage: "Private Attached Garage",
    parkingSpaces: 1,
    stories: 3,
    construction: "Brick, Composite",
    flooring: ["Hardwood", "Tile"],
    roofType: "EPDM (Flat Roof/Deck)",
    rooms: [
      { name: "Primary Suite", size: "18x14", level: "3rd Floor" },
      { name: "Living Room", size: "20x16", level: "2nd Floor" },
      { name: "Kitchen", size: "18x12", level: "2nd Floor" },
      { name: "Home Office", size: "12x10", level: "1st Floor" },
    ],
    priceHistory: [
      { date: "2025-10-01", price: 1150000, event: "Listed" },
      { date: "2025-12-15", price: 1075000, event: "Price Reduced" },
      { date: "2026-02-01", price: 999000, event: "Price Reduced" },
      { date: "2026-03-05", price: 999000, event: "Pending" },
    ],
    floorPlans: [
      { src: "/floorplans/734-s-front-floor1.svg", label: "First Floor" },
    ],
  },
  {
    id: "6",
    slug: "2038-e-hagert-st-fishtown",
    address: "2038 E Hagert St",
    city: "Philadelphia",
    state: "PA",
    zip: "19125",
    neighborhood: "Fishtown",
    price: 1275000,
    beds: 3,
    baths: 3,
    sqft: 2200,
    lotSqft: 1100,
    yearBuilt: 2023,
    isNewConstruction: true,
    status: "Pending",
    propertyType: "Townhouse",
    images: [
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80",
    ],
    description:
      "Fishtown does not do subtle, and neither does this brand-new townhome on Hagert Street. Soaring ceilings and raw exposed ductwork pay homage to the neighborhood's industrial heritage, while a gourmet kitchen with cascading waterfall island and custom joinery signals that this is something entirely new. Ascend to the private rooftop and the Center City skyline stretches before you — a view best enjoyed with a craft beer from one of the half-dozen breweries within walking distance. Frankford Avenue's constellation of acclaimed restaurants, indie boutiques, and late-night haunts is right outside the door. In a neighborhood that rewards bold taste, this home fits right in.",
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
      name: "Shaquonda Garrett",
      phone: "(215) 817-5777",
      email: "shaquonda@exitbenchmark.com",
      photo: "/agents/shaquonda-garrett.jpg",
      slug: "shaquonda-garrett",
    },
    lat: 39.9735,
    lng: -75.1268,
    tax_annual: 17850,
    tax_year: 2025,
    hoa_fee: 200,
    hoa_frequency: "monthly",
    has_hoa: true,
    mlsNumber: "PAPH2371006",
    listingDate: "2026-03-10",
    heating: "Forced Air, Gas",
    cooling: "Central Air",
    garage: "Integral 1-Car Garage",
    parkingSpaces: 1,
    stories: 3,
    construction: "Brick, Metal Panel",
    flooring: ["Polished Concrete", "Tile"],
    roofType: "EPDM (Flat Roof/Deck)",
    rooms: [
      { name: "Primary Suite", size: "16x14", level: "3rd Floor" },
      { name: "Living/Dining", size: "22x18", level: "2nd Floor" },
      { name: "Kitchen", size: "16x12", level: "2nd Floor" },
      { name: "Rooftop Deck", size: "20x16", level: "Roof" },
    ],
  },
  {
    id: "7",
    slug: "127-n-2nd-st-northern-liberties",
    address: "127 N 2nd St #4B",
    city: "Philadelphia",
    state: "PA",
    zip: "19106",
    neighborhood: "Northern Liberties",
    price: 649000,
    beds: 2,
    baths: 2,
    sqft: 1400,
    lotSqft: 0,
    yearBuilt: 2018,
    status: "Active",
    propertyType: "Condo",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    ],
    description:
      "Northern Liberties pioneered Philadelphia's post-industrial cool, and this loft on North 2nd Street captures that energy in every detail. Soaring ceilings and walls of glass flood the open-plan living space with the kind of natural light that photographers dream about. The designer kitchen — quartz countertops, custom cabinetry, soft-close everything — anchors a layout built for both quiet morning routines and spirited weekend gatherings. Step outside and the Piazza's European-inspired square is around the corner, Liberty Lands park is across the street, and some of the city's most inventive restaurants are within a five-minute walk. Urban living, refined.",
    features: {
      interior: [
        "12-Foot Ceilings",
        "Floor-to-Ceiling Windows",
        "Quartz Countertops",
        "In-Unit Laundry",
        "Central AC",
      ],
      exterior: [
        "Shared Rooftop Deck",
        "Secured Entry",
        "Bike Storage",
        "1 Parking Space",
      ],
      community: [
        "The Piazza at Schmidt's",
        "Liberty Lands Park",
        "Standard Tap & Honey's",
        "Spring Garden Station",
        "Walkable to Center City",
      ],
    },
    agent: {
      name: "Stephen Stevens",
      phone: "(215) 427-2870",
      email: "stephen@exitbenchmark.com",
      photo: "/agents/stephen-stevens.jpg",
      slug: "stephen-stevens",
    },
    lat: 39.9657,
    lng: -75.1419,
    tax_annual: 9086,
    tax_year: 2025,
    hoa_fee: 550,
    hoa_frequency: "monthly",
    has_hoa: true,
    mlsNumber: "PAPH2318007",
    listingDate: "2026-01-05",
    heating: "Forced Air, Electric",
    cooling: "Central Air",
    garage: "Secured Building Parking (1 Space)",
    parkingSpaces: 1,
    stories: 1,
    construction: "Concrete, Steel",
    flooring: ["Polished Concrete", "Hardwood"],
    roofType: "Membrane (Mid-Rise)",
    rooms: [
      { name: "Primary Bedroom", size: "14x12", level: "4th Floor" },
      { name: "Second Bedroom", size: "12x11", level: "4th Floor" },
      { name: "Open Living/Dining", size: "26x20", level: "4th Floor" },
    ],
  },
  {
    id: "8",
    slug: "4218-spruce-st-university-city",
    address: "4218 Spruce St",
    city: "Philadelphia",
    state: "PA",
    zip: "19104",
    neighborhood: "University City",
    price: 1100000,
    beds: 4,
    baths: 3,
    sqft: 2800,
    lotSqft: 1600,
    yearBuilt: 1910,
    status: "Active",
    propertyType: "Single Family",
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
    ],
    description:
      "On a tree-canopied block in Spruce Hill, this beautifully renovated Victorian twin offers something increasingly rare in Philadelphia: genuine neighborhood warmth paired with city-caliber sophistication. Original hardwood floors, restored to a warm honey glow, run beneath ornate mantels that have witnessed over a century of family life. The modern open kitchen and refreshed bathrooms are thoughtful updates — not overwrought, just right. Out back, a landscaped garden invites Saturday afternoon reading and Sunday evening grilling. Clark Park's farmers market is a two-block walk, Penn's campus a leafy stroll, and the trolley line connects you to Center City in minutes. This is the kind of home you settle into.",
    features: {
      interior: [
        "Original Hardwood Floors",
        "Ornate Mantels",
        "Updated Kitchen",
        "Third-Floor Suite",
        "Built-In Bookshelves",
      ],
      exterior: [
        "Landscaped Rear Yard",
        "Covered Front Porch",
        "Off-Street Parking",
        "Mature Trees",
        "Fenced Yard",
      ],
      community: [
        "UPenn Campus",
        "Clark Park Farmers Market",
        "White Dog Cafe",
        "Trolley to Center City",
        "Schuylkill River Trail",
      ],
    },
    agent: {
      name: "Chris Lane",
      phone: "(215) 427-2870",
      email: "chris@exitbenchmark.com",
      photo: "/agents/chris-lane.jpg",
      slug: "chris-lane",
    },
    lat: 39.9522,
    lng: -75.2032,
    tax_annual: 15400,
    tax_year: 2025,
    mlsNumber: "PAPH2310008",
    listingDate: "2026-03-05",
    heating: "Hot Water Radiant, Gas",
    cooling: "Central Air",
    garage: "None (Off-Street Parking)",
    parkingSpaces: 1,
    stories: 3,
    construction: "Victorian Brick",
    flooring: ["Hardwood", "Tile"],
    roofType: "Asphalt Shingle",
    rooms: [
      { name: "Primary Suite", size: "18x16", level: "3rd Floor" },
      { name: "Living Room", size: "20x16", level: "1st Floor" },
      { name: "Kitchen", size: "16x14", level: "1st Floor" },
      { name: "Dining Room", size: "16x14", level: "1st Floor" },
    ],
  },
  {
    id: "9",
    slug: "4325-main-st-manayunk",
    address: "4325 Main St",
    city: "Philadelphia",
    state: "PA",
    zip: "19127",
    neighborhood: "Manayunk",
    price: 525000,
    beds: 3,
    baths: 2,
    sqft: 1800,
    lotSqft: 900,
    yearBuilt: 2020,
    status: "Active",
    propertyType: "Townhouse",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80",
    ],
    description:
      "Perched along Manayunk's iconic Main Street, this modern townhouse rewards you with something most city homes cannot: water views. From the upper floors and private rooftop deck, the Schuylkill River winds lazily below, rowers gliding past in the early morning light. Inside, the open-plan living space is anchored by a sleek kitchen with waterfall island — the kind of room where dinner parties start early and end late. The towpath trail begins practically at your doorstep, perfect for morning runs or weekend bike rides, and Main Street's eclectic mix of restaurants, galleries, and independent shops fills every block. Small-town charm, big-city energy.",
    features: {
      interior: [
        "Open Floor Plan",
        "Waterfall Island",
        "Hardwood Floors",
        "In-Unit Laundry",
        "Recessed Lighting",
      ],
      exterior: [
        "Rooftop Deck",
        "Schuylkill River Views",
        "Integral Garage",
        "Private Patio",
      ],
      community: [
        "Main Street Shops",
        "Manayunk Towpath",
        "Regional Rail Access",
        "StrEAT Food Festival",
        "Wissahickon Park Nearby",
      ],
    },
    agent: {
      name: "Morris A. Brown",
      phone: "(215) 416-9113",
      email: "morris@exitbenchmark.com",
      photo: "/agents/morris-brown.jpg",
      slug: "morris-brown",
    },
    lat: 40.0261,
    lng: -75.2243,
    tax_annual: 7350,
    tax_year: 2025,
    hoa_fee: 175,
    hoa_frequency: "monthly",
    has_hoa: true,
    mlsNumber: "PAPH2320009",
    listingDate: "2026-02-10",
    heating: "Forced Air, Gas",
    cooling: "Central Air",
    garage: "Integral 1-Car Garage",
    parkingSpaces: 1,
    stories: 3,
    construction: "Brick, Composite",
    flooring: ["Hardwood", "Tile"],
    roofType: "EPDM (Flat Roof/Deck)",
    rooms: [
      { name: "Primary Suite", size: "16x14", level: "3rd Floor" },
      { name: "Living Room", size: "18x14", level: "2nd Floor" },
      { name: "Kitchen", size: "14x12", level: "2nd Floor" },
      { name: "Rooftop Deck", size: "18x14", level: "Roof" },
    ],
  },
  {
    id: "10",
    slug: "8411-germantown-ave-chestnut-hill",
    address: "8411 Germantown Ave",
    city: "Philadelphia",
    state: "PA",
    zip: "19118",
    neighborhood: "Chestnut Hill",
    price: 1800000,
    beds: 5,
    baths: 4,
    sqft: 4000,
    lotSqft: 12000,
    yearBuilt: 1925,
    status: "New",
    propertyType: "Single Family",
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
    ],
    description:
      "Chestnut Hill has long been Philadelphia's version of a New England village — leafy, unhurried, and quietly grand — and this stone Colonial Revival embodies everything the neighborhood promises. Five generous bedrooms unfold beneath original chestnut woodwork so rich it seems to glow in the afternoon light. A sun-drenched conservatory offers year-round garden views, while the formal rooms retain the gracious proportions of an era when homes were built to host. Outside, a landscaped garden with stone patio backs onto one of the neighborhood's signature tree-lined lots. Germantown Avenue's boutiques and cafes are a pleasant walk away, and the Wissahickon Valley's 57 miles of trails begin just around the corner — a wilderness in the city.",
    features: {
      interior: [
        "Original Chestnut Woodwork",
        "Sun Conservatory",
        "Chef's Kitchen",
        "Library with Fireplace",
        "Butler's Pantry",
        "Heated Floors",
      ],
      exterior: [
        "Stone Patio",
        "Landscaped Gardens",
        "Detached 2-Car Garage",
        "Mature Specimen Trees",
        "Private Driveway",
      ],
      community: [
        "Germantown Avenue Shops",
        "Wissahickon Valley Park",
        "Morris Arboretum",
        "Top-Rated Schools",
        "Regional Rail to Center City",
      ],
    },
    agent: {
      name: "Tony Goodman",
      phone: "(215) 427-2870",
      email: "tcupone@aol.com",
      photo: "/agents/tony-goodman.jpg",
      slug: "tony-goodman",
    },
    lat: 40.0781,
    lng: -75.2085,
    tax_annual: 25200,
    tax_year: 2025,
    videoTourUrl: "Ga7ySE8rCxk",
    isComingSoon: true,
    mlsNumber: "PAPH2325010",
    listingDate: "2026-03-20",
    heating: "Hot Water Radiant, Gas",
    cooling: "Central Air",
    garage: "Detached 2-Car Garage",
    parkingSpaces: 2,
    stories: 3,
    construction: "Stone, Stucco",
    flooring: ["Hardwood", "Stone", "Tile"],
    roofType: "Slate",
    rooms: [
      { name: "Primary Suite", size: "22x18", level: "2nd Floor" },
      { name: "Conservatory", size: "20x16", level: "1st Floor" },
      { name: "Library", size: "18x14", level: "1st Floor" },
      { name: "Kitchen", size: "24x18", level: "1st Floor" },
      { name: "Dining Room", size: "20x16", level: "1st Floor" },
    ],
  },
  {
    id: "11",
    slug: "1631-n-27th-st-brewerytown",
    address: "1631 N 27th St",
    city: "Philadelphia",
    state: "PA",
    zip: "19121",
    neighborhood: "Brewerytown",
    price: 485000,
    beds: 3,
    baths: 3,
    sqft: 1700,
    lotSqft: 800,
    yearBuilt: 2024,
    isNewConstruction: true,
    status: "New",
    propertyType: "Townhouse",
    images: [
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
    ],
    description:
      "Brewerytown is having its moment, and this brand-new townhome puts you at the center of the action. Three floors of sun-filled living climb toward the real showstopper: a private rooftop deck with sweeping views across Fairmount Park's canopy — a panorama that shifts from emerald green in summer to blazing amber in fall. Inside, the modern open layout features premium finishes that feel considered, not flashy: clean lines, warm tones, and the kind of thoughtful storage solutions that make daily life effortless. The Philadelphia Museum of Art is a morning jog away, the Schuylkill River Trail stretches for miles along the water, and Girard Avenue's growing roster of craft breweries and restaurants is rewriting the neighborhood's story one block at a time.",
    features: {
      interior: [
        "Open Concept Layout",
        "Quartz Waterfall Island",
        "Wide-Plank LVP Floors",
        "Smart Home System",
        "In-Unit Laundry",
      ],
      exterior: [
        "Rooftop Deck",
        "Fairmount Park Views",
        "Private Patio",
        "Integral Garage",
        "EV-Ready Outlet",
      ],
      community: [
        "Fairmount Park",
        "Art Museum District",
        "Schuylkill River Trail",
        "Crime & Punishment Brewing",
        "Philadelphia Zoo",
      ],
    },
    agent: {
      name: "Shaquonda Garrett",
      phone: "(215) 817-5777",
      email: "shaquonda@exitbenchmark.com",
      photo: "/agents/shaquonda-garrett.jpg",
      slug: "shaquonda-garrett",
    },
    lat: 39.9775,
    lng: -75.1756,
    tax_annual: 6790,
    tax_year: 2025,
    hoa_fee: 150,
    hoa_frequency: "monthly",
    has_hoa: true,
    openHouse: "Sat, Mar 29 · 12:00 PM - 3:00 PM",
    openHouseEvent: { date: "2026-03-29", startTime: "12:00", endTime: "15:00" },
    mlsNumber: "PAPH2324011",
    listingDate: "2026-03-15",
    heating: "Forced Air, Gas",
    cooling: "Central Air",
    garage: "Integral 1-Car Garage",
    parkingSpaces: 1,
    stories: 3,
    construction: "Brick, Composite",
    flooring: ["LVP", "Tile"],
    roofType: "EPDM (Flat Roof/Deck)",
    rooms: [
      { name: "Primary Suite", size: "16x13", level: "3rd Floor" },
      { name: "Living/Dining", size: "20x16", level: "2nd Floor" },
      { name: "Kitchen", size: "14x12", level: "2nd Floor" },
      { name: "Rooftop Deck", size: "18x14", level: "Roof" },
    ],
  },
  {
    id: "12",
    slug: "1847-mifflin-st-point-breeze",
    address: "1847 Mifflin St",
    city: "Philadelphia",
    state: "PA",
    zip: "19145",
    neighborhood: "Point Breeze",
    price: 420000,
    beds: 3,
    baths: 2,
    sqft: 1500,
    lotSqft: 700,
    yearBuilt: 2023,
    isNewConstruction: true,
    status: "Active",
    propertyType: "Townhouse",
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80",
    ],
    description:
      "Point Breeze is where savvy buyers have been quietly building equity for years, and this fully renovated rowhome shows exactly why. The contemporary open layout balances warmth and edge — shaker cabinets and quartz countertops bring polish, while an exposed brick accent wall nods to the home's original character. A private rear patio extends your living space into the open air, perfect for summer evenings with friends. The location is strategic: the Broad Street Line puts Center City ten minutes away, East Passyunk's award-winning restaurant row is a short bike ride, and the neighborhood's trajectory points firmly upward. Smart design in an even smarter location.",
    features: {
      interior: [
        "Exposed Brick Accent Wall",
        "Shaker Cabinetry",
        "Quartz Countertops",
        "Recessed Lighting",
        "Central AC",
      ],
      exterior: [
        "Private Rear Patio",
        "Fenced Yard",
        "New Roof (2023)",
        "Street-Facing Front Porch",
      ],
      community: [
        "Broad Street Line Access",
        "East Passyunk Dining",
        "Burg's Hideaway Lounge",
        "FDR Park Nearby",
        "South Broad Nightlife",
      ],
    },
    agent: {
      name: "Stephen Stevens",
      phone: "(215) 427-2870",
      email: "stephen@exitbenchmark.com",
      photo: "/agents/stephen-stevens.jpg",
      slug: "stephen-stevens",
    },
    lat: 39.9343,
    lng: -75.1824,
    tax_annual: 5880,
    tax_year: 2025,
    hoa_fee: 225,
    hoa_frequency: "monthly",
    has_hoa: true,
    mlsNumber: "PAPH2323012",
    listingDate: "2026-02-01",
    heating: "Forced Air, Gas",
    cooling: "Central Air",
    garage: "None",
    stories: 2,
    construction: "Brick",
    flooring: ["Hardwood", "Tile"],
    roofType: "Flat (New 2023)",
    rooms: [
      { name: "Primary Bedroom", size: "14x12", level: "2nd Floor" },
      { name: "Second Bedroom", size: "12x10", level: "2nd Floor" },
      { name: "Third Bedroom", size: "11x10", level: "2nd Floor" },
      { name: "Living Room", size: "18x14", level: "1st Floor" },
    ],
  },
  {
    id: "13",
    slug: "2517-frankford-ave-kensington",
    address: "2517 Frankford Ave",
    city: "Philadelphia",
    state: "PA",
    zip: "19125",
    neighborhood: "Kensington",
    price: 375000,
    beds: 4,
    baths: 2,
    sqft: 2400,
    lotSqft: 1000,
    yearBuilt: 1920,
    status: "Active",
    propertyType: "Multi-Family",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    ],
    description:
      "For the investor with an eye on Philadelphia's hottest corridor, this well-maintained duplex on the Kensington-Fishtown border delivers exactly what the spreadsheet demands — and then some. Each unit offers two bedrooms and an updated kitchen, with separate utilities that keep the numbers clean. But the real story is location: the Market-Frankford El puts tenants minutes from Center City, Front Street's brewery district draws the after-work crowd, and Frankford Avenue's seemingly endless expansion of restaurants and retail pushes rents higher every year. Live in one, rent the other, or let both units generate income in one of the city's strongest rental markets.",
    features: {
      interior: [
        "Two Separate Units",
        "Updated Kitchens",
        "Separate Utilities",
        "Hardwood Floors",
        "Ample Closet Space",
      ],
      exterior: [
        "Shared Rear Yard",
        "Street Parking",
        "New Windows",
        "Updated Electrical",
      ],
      community: [
        "Market-Frankford Line",
        "Front Street Breweries",
        "Pizza Brain & Cafe",
        "Adjacent to Fishtown",
        "Rapid Appreciation Area",
      ],
    },
    agent: {
      name: "Chris Lane",
      phone: "(215) 427-2870",
      email: "chris@exitbenchmark.com",
      photo: "/agents/chris-lane.jpg",
      slug: "chris-lane",
    },
    lat: 39.9867,
    lng: -75.1277,
    tax_annual: 5250,
    tax_year: 2025,
    mlsNumber: "PAPH2320013",
    listingDate: "2026-01-15",
    heating: "Hot Water Radiant, Gas",
    cooling: "Window Units",
    garage: "None (Street Parking)",
    stories: 2,
    construction: "Brick",
    flooring: ["Hardwood", "Tile"],
    roofType: "Flat (Updated Electrical)",
    rooms: [
      { name: "Unit 1 Living Room", size: "16x14", level: "1st Floor" },
      { name: "Unit 1 Kitchen", size: "12x10", level: "1st Floor" },
      { name: "Unit 2 Living Room", size: "16x14", level: "2nd Floor" },
      { name: "Unit 2 Kitchen", size: "12x10", level: "2nd Floor" },
    ],
  },
  {
    id: "14",
    slug: "4812-chester-ave-west-philly",
    address: "4812 Chester Ave",
    city: "Philadelphia",
    state: "PA",
    zip: "19143",
    neighborhood: "West Philly",
    price: 580000,
    beds: 4,
    baths: 2,
    sqft: 2200,
    lotSqft: 1400,
    yearBuilt: 1905,
    status: "Active",
    propertyType: "Single Family",
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80",
    ],
    description:
      "Some homes photograph well; this one feels like a warm hug. Tucked near Clark Park in the heart of Cedar Park, this Victorian charmer wraps you in a classic porch — the kind where neighbors wave and conversations happen — before revealing a sun-filled interior that glows with original stained glass and the quiet craftsmanship of a different era. Four spacious bedrooms provide room to grow, while a renovated kitchen with butcher block counters strikes the perfect balance between character and function. The deep backyard garden is an urban oasis, and Baltimore Avenue's eclectic cafes, trolley stops, and the UPenn campus are all within an easy walk. This is the kind of home that makes you want to bake bread and leave the front door open.",
    features: {
      interior: [
        "Original Stained Glass",
        "Wrap-Around Porch",
        "Renovated Kitchen",
        "Hardwood Floors Throughout",
        "High Ceilings",
      ],
      exterior: [
        "Deep Backyard Garden",
        "Covered Front Porch",
        "Detached Garage",
        "Mature Landscaping",
        "Fenced Yard",
      ],
      community: [
        "Clark Park",
        "Baltimore Avenue Corridor",
        "Trolley to Center City",
        "UPenn Campus Nearby",
        "Dock Street Brewery",
      ],
    },
    agent: {
      name: "Tony Goodman",
      phone: "(215) 427-2870",
      email: "tcupone@aol.com",
      photo: "/agents/tony-goodman.jpg",
      slug: "tony-goodman",
    },
    lat: 39.9507,
    lng: -75.2213,
    tax_annual: 8120,
    tax_year: 2025,
    mlsNumber: "PAPH2305014",
    listingDate: "2025-12-20",
    heating: "Hot Water Radiant, Gas",
    cooling: "Window Units",
    garage: "Detached 1-Car Garage",
    parkingSpaces: 1,
    stories: 3,
    construction: "Victorian Brick",
    flooring: ["Hardwood", "Original Stained Glass"],
    roofType: "Asphalt Shingle",
    rooms: [
      { name: "Primary Bedroom", size: "16x14", level: "2nd Floor" },
      { name: "Second Bedroom", size: "14x12", level: "2nd Floor" },
      { name: "Third Bedroom", size: "13x12", level: "2nd Floor" },
      { name: "Living Room", size: "20x16", level: "1st Floor" },
      { name: "Kitchen", size: "16x14", level: "1st Floor" },
    ],
  },
  {
    id: "15",
    slug: "1811-delancey-pl-rittenhouse",
    address: "1811 Delancey Pl #PH",
    city: "Philadelphia",
    state: "PA",
    zip: "19103",
    neighborhood: "Rittenhouse",
    price: 2400000,
    beds: 3,
    baths: 3,
    sqft: 2600,
    lotSqft: 0,
    yearBuilt: 2021,
    status: "New",
    propertyType: "Condo",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
    ],
    description:
      "Delancey Place is Philadelphia's quietest power address — a cobblestoned enclave where brownstone facades conceal some of the city's most extraordinary residences. This penthouse is no exception. Step onto the private terrace and Rittenhouse Square unfolds before you, unobstructed, with the fountain and century-old trees forming a tableau that changes with every season. Inside, custom Italian cabinetry and Calacatta marble bathrooms speak to a level of finish that borders on haute couture, while wide-plank oak floors and a chef's kitchen fitted with Sub-Zero and Wolf appliances ground the luxury in everyday livability. Concierge and valet service complete the picture: a home where nothing has been left to chance.",
    features: {
      interior: [
        "Custom Italian Cabinetry",
        "Calacatta Marble Baths",
        "Wide-Plank Oak Floors",
        "Sub-Zero & Wolf Appliances",
        "Smart Home System",
        "Private Elevator Entry",
      ],
      exterior: [
        "Private Terrace",
        "Rittenhouse Square Views",
        "Concierge Service",
        "Valet Parking",
        "Fitness Center",
      ],
      community: [
        "Rittenhouse Square",
        "Parc Brasserie",
        "Walnut Street Shopping",
        "Kimmel Center",
        "Penn Medicine Nearby",
      ],
    },
    agent: {
      name: "Shaquonda Garrett",
      phone: "(215) 817-5777",
      email: "shaquonda@exitbenchmark.com",
      photo: "/agents/shaquonda-garrett.jpg",
      slug: "shaquonda-garrett",
    },
    lat: 39.9487,
    lng: -75.1725,
    tax_annual: 33600,
    tax_year: 2025,
    hoa_fee: 720,
    hoa_frequency: "monthly",
    has_hoa: true,
    isComingSoon: true,
    mlsNumber: "PAPH2321015",
    listingDate: "2026-03-22",
    heating: "Radiant Floor, Electric",
    cooling: "Central Air",
    garage: "Valet Parking",
    parkingSpaces: 1,
    stories: 1,
    construction: "Concrete, Steel",
    flooring: ["Wide-Plank Oak", "Calacatta Marble"],
    roofType: "Membrane (High-Rise)",
    rooms: [
      { name: "Primary Suite", size: "22x18", level: "Penthouse" },
      { name: "Second Bedroom", size: "16x14", level: "Penthouse" },
      { name: "Third Bedroom", size: "14x12", level: "Penthouse" },
      { name: "Great Room", size: "32x26", level: "Penthouse" },
      { name: "Private Terrace", size: "30x20", level: "Penthouse" },
    ],
  },
  {
    id: "16",
    slug: "1245-e-palmer-st-fishtown",
    address: "1245 E Palmer St",
    city: "Philadelphia",
    state: "PA",
    zip: "19125",
    neighborhood: "Fishtown",
    price: 950000,
    beds: 3,
    baths: 3,
    sqft: 2000,
    lotSqft: 900,
    yearBuilt: 2024,
    isNewConstruction: true,
    status: "Open House",
    propertyType: "Single Family",
    images: [
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    ],
    description:
      "An architect's personal vision brought to life on Palmer Street, this new construction home turns heads before you even step inside — a striking modern facade that signals something special within. The sun-drenched great room is the heart of the home, where floor-to-ceiling light meets a chef's kitchen crowned by a waterfall quartz island that doubles as the neighborhood gathering spot. Three bedrooms upstairs provide restful retreat, while the landscaped rooftop offers the reward: skyline views that stretch from the Delaware River bridges to the Comcast towers. Suraya's legendary brunch is a two-block walk, La Colombe's flagship roastery an easy stroll, and Frankford Avenue's nightly energy is quite literally at your doorstep. This is Fishtown at its finest.",
    features: {
      interior: [
        "Architect-Designed Layout",
        "Chef's Kitchen",
        "Waterfall Quartz Island",
        "White Oak Floors",
        "Spa-Like Primary Bath",
        "Custom Built-Ins",
      ],
      exterior: [
        "Landscaped Rooftop",
        "Skyline Views",
        "Rear Patio",
        "Integral Garage",
        "EV Charging",
      ],
      community: [
        "Frankford Avenue",
        "Suraya Restaurant",
        "La Colombe Flagship",
        "Penn Treaty Park",
        "Johnny Brenda's",
      ],
    },
    agent: {
      name: "Morris A. Brown",
      phone: "(215) 416-9113",
      email: "morris@exitbenchmark.com",
      photo: "/agents/morris-brown.jpg",
      slug: "morris-brown",
    },
    lat: 39.9721,
    lng: -75.1305,
    tax_annual: 13300,
    tax_year: 2025,
    openHouse: "Sun, Mar 30 · 1:00 PM - 4:00 PM",
    openHouseEvent: { date: "2026-03-30", startTime: "13:00", endTime: "16:00" },
    mlsNumber: "PAPH2324016",
    listingDate: "2026-03-12",
    heating: "Forced Air, Gas",
    cooling: "Central Air",
    garage: "Integral 1-Car Garage",
    parkingSpaces: 1,
    stories: 3,
    construction: "Brick, Steel",
    flooring: ["White Oak Hardwood", "Tile"],
    roofType: "EPDM (Flat Roof/Deck)",
    rooms: [
      { name: "Primary Suite", size: "18x15", level: "3rd Floor" },
      { name: "Second Bedroom", size: "14x12", level: "2nd Floor" },
      { name: "Third Bedroom", size: "13x11", level: "2nd Floor" },
      { name: "Great Room", size: "28x20", level: "1st Floor" },
      { name: "Landscaped Rooftop", size: "24x18", level: "Roof" },
    ],
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

/** AI-3786: Calculate days on market from listing date */
export function getDaysOnMarket(listingDate?: string): number | null {
  if (!listingDate) return null;
  const listed = new Date(listingDate + "T00:00:00");
  const now = new Date();
  const diff = Math.floor((now.getTime() - listed.getTime()) / 86400000);
  return diff >= 0 ? diff : null;
}

/** AI-3786: Human-readable days on market label */
export function formatDaysOnMarket(listingDate?: string): string | null {
  const days = getDaysOnMarket(listingDate);
  if (days === null) return null;
  if (days === 0) return "Listed today";
  if (days === 1) return "Listed 1 day ago";
  return `Listed ${days} days ago`;
}

/* AI-3872: Lifestyle/property tags derived from property data */
export const LIFESTYLE_TAGS = [
  "Luxury",
  "Walkable",
  "Family-Friendly",
  "Entertainer",
  "Investment",
  "Historic",
  "Urban",
  "Outdoor Space",
  "Move-In Ready",
  "Fixer-Upper Potential",
] as const;

export type LifestyleTag = (typeof LIFESTYLE_TAGS)[number];

/** Derive lifestyle tags from a property's attributes. */
export function getPropertyTags(property: Property): LifestyleTag[] {
  const tags: LifestyleTag[] = [];

  if (property.price >= 1_500_000) tags.push("Luxury");
  if (property.beds >= 4) tags.push("Family-Friendly");
  if (property.sqft >= 3000) tags.push("Entertainer");
  if (property.propertyType === "Multi-Family") tags.push("Investment");
  if (property.yearBuilt < 1950) tags.push("Historic");

  const urbanHoods = ["Rittenhouse", "Center City", "Old City", "Fishtown", "Northern Liberties"];
  if (urbanHoods.includes(property.neighborhood)) {
    tags.push("Walkable");
    tags.push("Urban");
  }

  if (property.features.exterior.some((f) => f.toLowerCase().includes("garden") || f.toLowerCase().includes("patio") || f.toLowerCase().includes("deck") || f.toLowerCase().includes("yard"))) {
    tags.push("Outdoor Space");
  }

  if (property.status === "New" || property.yearBuilt >= 2020) tags.push("Move-In Ready");

  // Deduplicate and limit to 4
  return [...new Set(tags)].slice(0, 4);
}
