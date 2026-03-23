export interface School {
  name: string;
  type: "Public" | "Private" | "Charter" | "Magnet";
  rating: number;
  grades: string;
  distance: string;
}

export interface LocalSpot {
  name: string;
  type: "Restaurant" | "Cafe" | "Bar" | "Shop" | "Park" | "Gallery" | "Brewery" | "Market";
  description: string;
}

export interface MarketData {
  medianPrice: string;
  avgPricePerSqft: string;
  medianDaysOnMarket: number;
  activeListings: number;
  priceChange12m: string;
}

export interface MonthlyTrendPoint {
  month: string;
  medianPrice: number;
}

export interface LifestyleInfo {
  dining: string;
  nightlife: string;
  parks: string;
  culture: string;
}

export interface Neighborhood {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  sellingPoints: string[];
  lifestyle: {
    vibe: string;
    dining: string;
    transit: string;
    parks: string;
  };
  stats: {
    medianPrice: string;
    avgPricePerSqft: string;
    avgDaysOnMarket: number;
    inventoryLevel: string;
  };
  marketData: MarketData;
  schools: School[];
  walkScore: number;
  transitScore: number;
  bikeScore: number;
  lifestyleInfo: LifestyleInfo;
  localSpots: LocalSpot[];
  image: string;
  cardImage: string;
  gallery: string[];
  monthlyTrend: MonthlyTrendPoint[];
  mapCenter: { lat: number; lng: number };
  videoTourUrl?: string;
  propertyFilter: string;
  featured: boolean;
}

export const neighborhoods: Neighborhood[] = [
  {
    id: "1",
    name: "Center City",
    slug: "center-city",
    tagline: "The beating heart of Philadelphia",
    description:
      "Center City is the dense, walkable core of Philadelphia stretching from the Schuylkill to the Delaware River. Its grid of streets — designed by William Penn himself — is lined with soaring glass towers, converted historic lofts, and grand pre-war buildings that define the city's skyline. From the Avenue of the Arts along South Broad Street to the luxury retail corridor of Walnut Street, every block pulses with energy.\n\nResidents enjoy unmatched convenience: world-class dining at Vernick and Zahav, the cultural richness of the Kimmel Center and Philadelphia Museum of Art, and a thriving after-dark scene. The neighborhood draws young professionals, empty-nesters, and international buyers who want an urban lifestyle without compromise. With SEPTA regional rail, subway, and bus lines converging here, Center City offers connectivity unmatched anywhere in the metro.",
    sellingPoints: [
      "Walk Score of 99 — true car-free living",
      "Home to the Avenue of the Arts and Kimmel Center",
      "Direct access to SEPTA Regional Rail, Broad Street Line, and Market-Frankford Line",
      "Steps from Rittenhouse Square, Liberty Bell, and Reading Terminal Market",
      "Diverse housing stock from glass-tower penthouses to Federal-era rowhomes",
    ],
    lifestyle: {
      vibe: "Fast-paced, cosmopolitan energy with a neighborly Philadelphia warmth. Suits and sneakers share the sidewalk on Market Street.",
      dining: "Zahav, Vernick Food & Drink, Reading Terminal Market, Chinatown's authentic dim sum, and dozens of BYOB gems on side streets.",
      transit: "Jefferson and Suburban Stations connect to all regional rail lines. Broad Street Line and Market-Frankford Line intersect at City Hall.",
      parks: "Rittenhouse Square, LOVE Park, Dilworth Park at City Hall, and the Schuylkill Banks trail system along the river.",
    },
    stats: {
      medianPrice: "$385,000",
      avgPricePerSqft: "$340",
      avgDaysOnMarket: 28,
      inventoryLevel: "Moderate",
    },
    marketData: {
      medianPrice: "$385,000",
      avgPricePerSqft: "$340",
      medianDaysOnMarket: 28,
      activeListings: 142,
      priceChange12m: "+4.8%",
    },
    schools: [
      { name: "Masterman School", type: "Magnet", rating: 9, grades: "5-12", distance: "0.5 mi" },
      { name: "Friends Select School", type: "Private", rating: 9, grades: "Pre-K-12", distance: "0.3 mi" },
      { name: "Science Leadership Academy", type: "Magnet", rating: 8, grades: "9-12", distance: "0.8 mi" },
    ],
    walkScore: 99,
    transitScore: 100,
    bikeScore: 93,
    lifestyleInfo: {
      dining: "World-class restaurants at every turn, from Zahav and Vernick to Reading Terminal Market and Chinatown dim sum parlors.",
      nightlife: "Avenue of the Arts theater district, rooftop bars along Walnut Street, and speakeasy-style cocktail lounges on side streets.",
      parks: "Rittenhouse Square, LOVE Park, Dilworth Park, and the Schuylkill Banks trail system along the river.",
      culture: "Kimmel Center, Academy of Music, Philadelphia Museum of Art, and the Avenue of the Arts performing arts corridor.",
    },
    localSpots: [
      { name: "Reading Terminal Market", type: "Market", description: "Iconic indoor market with 80+ vendors serving everything from Amish pretzels to fresh sushi." },
      { name: "Vernick Food & Drink", type: "Restaurant", description: "James Beard-winning New American restaurant with inventive tasting menus." },
      { name: "Elixr Coffee", type: "Cafe", description: "Third-wave coffee pioneer with single-origin pour-overs in a minimalist space." },
      { name: "The Ranstead Room", type: "Bar", description: "Hidden cocktail bar behind an unmarked door on Ranstead Street." },
    ],
    image:
      "https://images.unsplash.com/photo-1569761316261-9a8696fa2ca3?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1569761316261-9a8696fa2ca3?w=800&q=80",
    mapCenter: { lat: 39.9526, lng: -75.1652 },
    gallery: ["https://images.unsplash.com/photo-1569761316261-9a8696fa2ca3?w=800&q=80", "https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=800&q=80", "https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=800&q=80", "https://images.unsplash.com/photo-1581347058729-d93c3800e76e?w=800&q=80"],
    monthlyTrend: [
      { month: "Apr 2025", medianPrice: 373811 },
      { month: "May 2025", medianPrice: 377642 },
      { month: "Jun 2025", medianPrice: 384345 },
      { month: "Jul 2025", medianPrice: 389046 },
      { month: "Aug 2025", medianPrice: 393856 },
      { month: "Sep 2025", medianPrice: 396521 },
      { month: "Oct 2025", medianPrice: 396093 },
      { month: "Nov 2025", medianPrice: 390495 },
      { month: "Dec 2025", medianPrice: 388237 },
      { month: "Jan 2026", medianPrice: 388352 },
      { month: "Feb 2026", medianPrice: 391142 },
      { month: "Mar 2026", medianPrice: 397030 },
    ],
    videoTourUrl: "https://www.youtube.com/watch?v=oc2vMx0x1XI",
    propertyFilter: "Center City",
    featured: true,
  },
  {
    id: "2",
    name: "Rittenhouse",
    slug: "rittenhouse",
    tagline: "Philadelphia's most prestigious address",
    description:
      "Rittenhouse is the gold standard of Philadelphia real estate. Anchored by the manicured beauty of Rittenhouse Square — one of William Penn's original five public squares — the neighborhood radiates old-money elegance alongside modern luxury. Grand doorman buildings line the park, offering sweeping views of the fountain and centuries-old sycamores, while boutique condos on Pine and Spruce streets provide intimate, tree-lined living.\n\nThe surrounding blocks form the city's premier shopping district: Walnut Street hosts national luxury brands while smaller streets reveal independent boutiques, galleries, and some of Philadelphia's best BYOBs. Rittenhouse commands the highest per-square-foot prices in the city, and properties here — especially those with park views — rarely stay on market long. Buyers range from finance executives and medical professionals to international investors seeking a pied-a-terre.",
    sellingPoints: [
      "Overlooks Rittenhouse Square, one of America's finest urban parks",
      "Highest property values in Philadelphia with strong appreciation",
      "Premier dining: Parc, Barclay Prime, a]oc, Friday Saturday Sunday",
      "Walkable to Penn Medicine, law firms, and financial district",
      "Iconic doorman buildings and boutique condos with park views",
      "Vibrant sidewalk cafe culture year-round",
    ],
    lifestyle: {
      vibe: "Refined yet approachable. Dog walkers, chess players, and power lunchers share the square. It feels like a European city center.",
      dining: "Parc brasserie on the square, Barclay Prime for celebrations, Talula's Daily for farm-to-table, and an unrivaled density of acclaimed BYOBs.",
      transit: "19th Street and Walnut-Locust SEPTA stations within blocks. Suburban Station a short walk north. Highly bikeable with Indego stations everywhere.",
      parks: "Rittenhouse Square is the crown jewel — a vibrant, year-round gathering place with seasonal markets, art shows, and live music.",
    },
    stats: {
      medianPrice: "$550,000",
      avgPricePerSqft: "$420",
      avgDaysOnMarket: 22,
      inventoryLevel: "Low",
    },
    marketData: {
      medianPrice: "$550,000",
      avgPricePerSqft: "$420",
      medianDaysOnMarket: 22,
      activeListings: 68,
      priceChange12m: "+6.1%",
    },
    schools: [
      { name: "Greenfield Albert M. School", type: "Public", rating: 7, grades: "K-8", distance: "0.4 mi" },
      { name: "Friends Select School", type: "Private", rating: 9, grades: "Pre-K-12", distance: "0.6 mi" },
      { name: "Philadelphia School", type: "Private", rating: 8, grades: "Pre-K-8", distance: "0.5 mi" },
    ],
    walkScore: 99,
    transitScore: 100,
    bikeScore: 94,
    lifestyleInfo: {
      dining: "Parc brasserie on the square, Barclay Prime, Talula's Daily, and an unmatched concentration of acclaimed BYOBs.",
      nightlife: "Upscale cocktail bars, wine bars along Walnut Street, and sidewalk cafe culture that runs late into the evening.",
      parks: "Rittenhouse Square is the crown jewel with seasonal markets, art shows, and live music year-round.",
      culture: "Art galleries on Pine Street, the Curtis Institute of Music, and proximity to the Avenue of the Arts.",
    },
    localSpots: [
      { name: "Parc", type: "Restaurant", description: "French brasserie on Rittenhouse Square with coveted outdoor seating and classic bistro fare." },
      { name: "DiBruno Bros.", type: "Shop", description: "Iconic Italian gourmet market with artisan cheeses, charcuterie, and prepared foods." },
      { name: "a]oc", type: "Restaurant", description: "Acclaimed wine bar and small-plates restaurant from Jose Garces, steps from the square." },
      { name: "The Good King Tavern", type: "Bar", description: "French-inspired cocktail bar with absinthe service and seasonal craft cocktails." },
    ],
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    mapCenter: { lat: 39.9494, lng: -75.1717 },
    gallery: ["https://images.unsplash.com/photo-1605130284535-11983c652e51?w=800&q=80", "https://images.unsplash.com/photo-1573325846218-60b6f4a07ede?w=800&q=80", "https://images.unsplash.com/photo-1591588582259-e675bd2e6088?w=800&q=80", "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&q=80"],
    monthlyTrend: [
      { month: "Apr 2025", medianPrice: 492236 },
      { month: "May 2025", medianPrice: 500585 },
      { month: "Jun 2025", medianPrice: 508814 },
      { month: "Jul 2025", medianPrice: 516255 },
      { month: "Aug 2025", medianPrice: 522303 },
      { month: "Sep 2025", medianPrice: 526444 },
      { month: "Oct 2025", medianPrice: 523565 },
      { month: "Nov 2025", medianPrice: 518320 },
      { month: "Dec 2025", medianPrice: 513236 },
      { month: "Jan 2026", medianPrice: 515455 },
      { month: "Feb 2026", medianPrice: 519951 },
      { month: "Mar 2026", medianPrice: 529581 },
    ],
    videoTourUrl: "https://www.youtube.com/watch?v=x2VHL0QYxBo",
    propertyFilter: "Rittenhouse",
    featured: true,
  },
  {
    id: "3",
    name: "Fishtown",
    slug: "fishtown",
    tagline: "Creative energy meets industrial charm",
    description:
      "Fishtown has transformed from a tight-knit fishing village along the Delaware River into Philadelphia's most dynamic neighborhood. Named for the shad fishermen who settled here in the 1700s, the area's industrial bones — brick warehouses, old factories, and narrow streets — now house craft breweries, artist studios, recording spaces, and some of the city's most talked-about restaurants.\n\nFrankford Avenue serves as the main artery, lined with independent shops, tattoo parlors, vintage stores, and coffee roasters. Development has been rapid but the neighborhood retains its gritty authenticity, with long-time residents mixing comfortably alongside newcomers. New construction townhomes and converted loft apartments sit beside century-old rowhomes. Fishtown appeals to creatives, young families, and anyone drawn to a neighborhood that feels genuinely alive.",
    sellingPoints: [
      "Philadelphia's hottest real estate market with strong year-over-year appreciation",
      "Frankford Avenue named one of America's best streets for food and nightlife",
      "Proximity to the Delaware River waterfront and new trails",
      "Mix of affordable rowhomes, new-construction townhomes, and converted lofts",
      "Thriving arts scene with galleries, music venues like Johnny Brenda's, and Sugarhouse Casino nearby",
    ],
    lifestyle: {
      vibe: "Artsy, unpretentious, and buzzing with creative energy. Block parties, mural arts, and a strong sense of neighborhood pride.",
      dining: "Suraya for Lebanese, Kensington Quarters for whole-animal dining, Pizzeria Beddia, La Colombe flagship, and dozens of inventive BYOBs.",
      transit: "Berks and York-Dauphin stations on the Market-Frankford Line. Easy bike access to Center City via the Delaware Avenue trail.",
      parks: "Penn Treaty Park on the Delaware River waterfront, Palmer Park, and nearby access to the Schuylkill River Trail system.",
    },
    stats: {
      medianPrice: "$375,000",
      avgPricePerSqft: "$295",
      avgDaysOnMarket: 18,
      inventoryLevel: "Low",
    },
    marketData: {
      medianPrice: "$375,000",
      avgPricePerSqft: "$295",
      medianDaysOnMarket: 18,
      activeListings: 54,
      priceChange12m: "+8.3%",
    },
    schools: [
      { name: "Adaire Alexander School", type: "Public", rating: 6, grades: "K-8", distance: "0.3 mi" },
      { name: "MaST Community Charter", type: "Charter", rating: 8, grades: "K-12", distance: "1.2 mi" },
      { name: "Frankford Friends School", type: "Private", rating: 7, grades: "Pre-K-6", distance: "0.8 mi" },
    ],
    walkScore: 93,
    transitScore: 78,
    bikeScore: 90,
    lifestyleInfo: {
      dining: "Suraya for Lebanese, Pizzeria Beddia, La Colombe flagship, and dozens of inventive BYOBs along Frankford Avenue.",
      nightlife: "Johnny Brenda's for live music, Barcade for retro gaming, craft cocktail bars, and brewery taprooms on every block.",
      parks: "Penn Treaty Park on the Delaware waterfront, Palmer Park, and nearby access to the Schuylkill River Trail.",
      culture: "Street murals, indie galleries, recording studios, and the Fillmore Philadelphia concert venue.",
    },
    localSpots: [
      { name: "Suraya", type: "Restaurant", description: "Stunning Lebanese restaurant and garden with weekend brunch that draws city-wide crowds." },
      { name: "La Colombe Fishtown", type: "Cafe", description: "Flagship cafe in a former warehouse with draft lattes and a beautiful industrial space." },
      { name: "Johnny Brenda's", type: "Bar", description: "Legendary live music venue and gastropub at the heart of Fishtown's nightlife." },
      { name: "Frankford Hall", type: "Brewery", description: "Massive outdoor beer garden with German-inspired brews and communal seating." },
    ],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    mapCenter: { lat: 39.9735, lng: -75.1328 },
    gallery: ["https://images.unsplash.com/photo-1594560890703-8f29c3d40ce6?w=800&q=80", "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80", "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80", "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80"],
    monthlyTrend: [
      { month: "Apr 2025", medianPrice: 363270 },
      { month: "May 2025", medianPrice: 368871 },
      { month: "Jun 2025", medianPrice: 377583 },
      { month: "Jul 2025", medianPrice: 382025 },
      { month: "Aug 2025", medianPrice: 384795 },
      { month: "Sep 2025", medianPrice: 384906 },
      { month: "Oct 2025", medianPrice: 381505 },
      { month: "Nov 2025", medianPrice: 375816 },
      { month: "Dec 2025", medianPrice: 372646 },
      { month: "Jan 2026", medianPrice: 374560 },
      { month: "Feb 2026", medianPrice: 380139 },
      { month: "Mar 2026", medianPrice: 386576 },
    ],
    videoTourUrl: "https://www.youtube.com/watch?v=KJ5IbyFBfXs",
    propertyFilter: "Fishtown",
    featured: true,
  },
  {
    id: "4",
    name: "Northern Liberties",
    slug: "northern-liberties",
    tagline: "Urban sophistication with neighborhood soul",
    description:
      "Northern Liberties — NoLibs to locals — pioneered Philadelphia's post-industrial renaissance long before Fishtown grabbed headlines. Once a manufacturing district of breweries and textile mills, the neighborhood began its transformation in the early 2000s with the Piazza at Schmidt's, a European-inspired public square built inside a former brewery complex. Today it stands as one of the city's most polished yet personable neighborhoods.\n\nThe housing stock reflects its evolution: meticulously restored Victorian rowhomes share blocks with sleek modern townhomes and mid-rise condos. Second and Third Streets form the commercial spine, hosting everything from craft cocktail bars and farm-to-table restaurants to yoga studios and independent bookshops. Northern Liberties appeals to professionals who want walkable urban living with a more curated, less frenetic pace than Fishtown next door.",
    sellingPoints: [
      "The Piazza at Schmidt's — a one-of-a-kind European-style public square",
      "Premium new construction alongside beautifully restored Victorians",
      "Strong restaurant scene: Honey's, Standard Tap, North Third",
      "Excellent walkability with easy access to I-95 and Center City",
      "Established neighborhood with mature trees and community feel",
      "Minutes from the Delaware waterfront and SugarHouse entertainment district",
    ],
    lifestyle: {
      vibe: "Polished and community-minded. Weekend farmers markets, gallery walks, and a healthy outdoor brunch culture define the tempo.",
      dining: "Standard Tap (craft beer pioneer), Honey's Sit 'n Eat for brunch, North Third for New American, and Liberty Kitchen for wood-fired pizza.",
      transit: "Spring Garden station on the Market-Frankford Line. Quick drive to I-95 for suburban access. Well-connected bike lanes to Center City.",
      parks: "Liberty Lands community park, Orianna Hill Park, and proximity to the Delaware River waterfront trail system.",
    },
    stats: {
      medianPrice: "$420,000",
      avgPricePerSqft: "$310",
      avgDaysOnMarket: 21,
      inventoryLevel: "Low",
    },
    marketData: {
      medianPrice: "$420,000",
      avgPricePerSqft: "$310",
      medianDaysOnMarket: 21,
      activeListings: 38,
      priceChange12m: "+5.7%",
    },
    schools: [
      { name: "AMY at James Martin", type: "Public", rating: 6, grades: "K-8", distance: "0.5 mi" },
      { name: "Girard College", type: "Private", rating: 8, grades: "1-12", distance: "1.0 mi" },
      { name: "Independence Charter School", type: "Charter", rating: 7, grades: "K-8", distance: "0.9 mi" },
    ],
    walkScore: 95,
    transitScore: 82,
    bikeScore: 92,
    lifestyleInfo: {
      dining: "Standard Tap for craft beer, Honey's for brunch, North Third for New American, and Liberty Kitchen for wood-fired pizza.",
      nightlife: "Craft cocktail bars on Second Street, The Piazza's outdoor events, and a lively restaurant bar scene.",
      parks: "Liberty Lands community park, Orianna Hill Park, and proximity to the Delaware River waterfront trail.",
      culture: "The Piazza at Schmidt's hosts concerts and film screenings, with galleries and studios throughout the neighborhood.",
    },
    localSpots: [
      { name: "Standard Tap", type: "Bar", description: "Craft beer pioneer with an all-local draft list and elevated pub food in a historic building." },
      { name: "Honey's Sit 'n Eat", type: "Restaurant", description: "Beloved brunch spot with Southern-Jewish comfort food and legendary waits on weekends." },
      { name: "The Piazza at Schmidt's", type: "Market", description: "European-style public square in a former brewery hosting markets, concerts, and community events." },
      { name: "Cafe La Maude", type: "Cafe", description: "Charming French-Lebanese cafe with house-made pastries and specialty coffee." },
    ],
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    mapCenter: { lat: 39.9657, lng: -75.1419 },
    gallery: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80", "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&q=80"],
    monthlyTrend: [
      { month: "Apr 2025", medianPrice: 377289 },
      { month: "May 2025", medianPrice: 382903 },
      { month: "Jun 2025", medianPrice: 388960 },
      { month: "Jul 2025", medianPrice: 394167 },
      { month: "Aug 2025", medianPrice: 396422 },
      { month: "Sep 2025", medianPrice: 396465 },
      { month: "Oct 2025", medianPrice: 393625 },
      { month: "Nov 2025", medianPrice: 388183 },
      { month: "Dec 2025", medianPrice: 385508 },
      { month: "Jan 2026", medianPrice: 388374 },
      { month: "Feb 2026", medianPrice: 390454 },
      { month: "Mar 2026", medianPrice: 396798 },
    ],
    videoTourUrl: "https://www.youtube.com/watch?v=4sW0dMFltlQ",
    propertyFilter: "Northern Liberties",
    featured: true,
  },
  {
    id: "5",
    name: "Old City",
    slug: "old-city",
    tagline: "Where history meets modern living",
    description:
      "Old City is where America began — and where Philadelphia's most character-rich living happens today. The cobblestone streets around Elfreth's Alley (the nation's oldest continuously inhabited residential street) and Independence Hall give way to converted warehouse lofts, artists' studios, and galleries that make First Friday a citywide event. The architecture alone tells three centuries of stories.\n\nLiving in Old City means walking past the Liberty Bell on your morning coffee run and catching sunset views of the Ben Franklin Bridge from your rooftop. The neighborhood attracts buyers who value history, architecture, and a vibrant arts community. Loft-style condos in former printing houses and textile warehouses are the signature housing type, with exposed brick, timber beams, and soaring ceilings commanding premium prices. Weekend energy is electric, with galleries, bars, and restaurants drawing crowds from across the region.",
    sellingPoints: [
      "Home to Independence Hall, the Liberty Bell, and Elfreth's Alley",
      "Signature loft living in converted 18th- and 19th-century warehouses",
      "First Friday gallery nights draw thousands monthly",
      "Walking distance to Penn's Landing and the Delaware River waterfront",
      "Strong short-term rental demand from tourism creates income potential",
    ],
    lifestyle: {
      vibe: "Historic and artistic with weekend nightlife energy. Cobblestone charm by day, gallery openings and cocktail bars by night.",
      dining: "Fork (a Philly institution), Amada by Jose Garces, City Tavern (colonial-era recipes), Han Dynasty, and the new waterfront restaurants at Cherry Street Pier.",
      transit: "2nd Street station on the Market-Frankford Line. Direct access to I-95. SEPTA bus routes along Market and Chestnut Streets.",
      parks: "Independence Mall and its green spaces, Washington Square, Race Street Pier on the Delaware, and the planned Penn's Landing park cap.",
    },
    stats: {
      medianPrice: "$400,000",
      avgPricePerSqft: "$350",
      avgDaysOnMarket: 25,
      inventoryLevel: "Moderate",
    },
    marketData: {
      medianPrice: "$400,000",
      avgPricePerSqft: "$350",
      medianDaysOnMarket: 25,
      activeListings: 52,
      priceChange12m: "+3.9%",
    },
    schools: [
      { name: "Independence Charter School", type: "Charter", rating: 7, grades: "K-8", distance: "0.4 mi" },
      { name: "Masterman School", type: "Magnet", rating: 9, grades: "5-12", distance: "0.7 mi" },
      { name: "Old City Academy", type: "Private", rating: 7, grades: "Pre-K-5", distance: "0.2 mi" },
    ],
    walkScore: 97,
    transitScore: 95,
    bikeScore: 91,
    lifestyleInfo: {
      dining: "Fork is a Philly institution, Amada by Jose Garces serves stunning tapas, and Cherry Street Pier hosts rotating food concepts.",
      nightlife: "First Friday gallery crawls, cocktail bars on 2nd and 3rd Streets, and the electric weekend scene along Market Street.",
      parks: "Independence Mall, Washington Square, Race Street Pier on the Delaware, and the planned Penn's Landing park cap.",
      culture: "Independence Hall, the Liberty Bell, Elfreth's Alley, and a thriving gallery scene with monthly First Friday events.",
    },
    localSpots: [
      { name: "Fork", type: "Restaurant", description: "Philadelphia dining institution with seasonal New American cuisine in an elegant Old City setting." },
      { name: "Cherry Street Pier", type: "Market", description: "Converted pier with artisan vendors, rotating food stalls, and waterfront views of the Ben Franklin Bridge." },
      { name: "Art in the Age", type: "Shop", description: "Craft spirits tasting room and boutique featuring locally made spirits and barware." },
      { name: "Race Street Pier", type: "Park", description: "Elevated park on the Delaware waterfront with stunning bridge views and tiered seating." },
    ],
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    mapCenter: { lat: 39.9524, lng: -75.1438 },
    gallery: ["https://images.unsplash.com/photo-1598928506311-c55ez637b483?w=800&q=80", "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80", "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80", "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80"],
    monthlyTrend: [
      { month: "Apr 2025", medianPrice: 418530 },
      { month: "May 2025", medianPrice: 424389 },
      { month: "Jun 2025", medianPrice: 433252 },
      { month: "Jul 2025", medianPrice: 441309 },
      { month: "Aug 2025", medianPrice: 444524 },
      { month: "Sep 2025", medianPrice: 446816 },
      { month: "Oct 2025", medianPrice: 444956 },
      { month: "Nov 2025", medianPrice: 442496 },
      { month: "Dec 2025", medianPrice: 438213 },
      { month: "Jan 2026", medianPrice: 438515 },
      { month: "Feb 2026", medianPrice: 442111 },
      { month: "Mar 2026", medianPrice: 450179 },
    ],
    videoTourUrl: "https://www.youtube.com/watch?v=tWfEVmp4eCM",
    propertyFilter: "Old City",
    featured: true,
  },
  {
    id: "6",
    name: "South Philly",
    slug: "south-philly",
    tagline: "Authentic Philadelphia at its finest",
    description:
      "South Philadelphia is where the city's soul lives. From the Italian Market on 9th Street — the oldest open-air market in America — to the passionate sports culture radiating from the stadium complex on South Broad, this is Philadelphia at its most authentic. Generations of Italian, Vietnamese, Mexican, and Indonesian families have layered the neighborhood with one of the most diverse food landscapes in the country.\n\nThe housing market here offers exceptional value: classic Philadelphia rowhomes with marble stoops line quiet residential streets, many still priced well below the city median. East Passyunk Avenue has emerged as a nationally recognized dining destination, with restaurants like Laurel, Fond, and Bing Bing Dim Sum drawing critical acclaim. South Philly rewards buyers who want deep community roots, cultural richness, and a home that still feels like a neighborhood.",
    sellingPoints: [
      "Italian Market — America's oldest outdoor market, open daily",
      "East Passyunk Avenue dining corridor with James Beard-nominated restaurants",
      "Classic rowhomes at prices well below Center City and Rittenhouse",
      "Stadium complex: Eagles, Phillies, Sixers, and Flyers all in one district",
      "Strong multigenerational community bonds and block-party culture",
      "Rapid appreciation along the East Passyunk corridor",
    ],
    lifestyle: {
      vibe: "Loud, proud, and fiercely loyal. This is where Philly's famous attitude comes from — in the best possible way. Neighbors know each other by name.",
      dining: "Italian Market for fresh produce and cheese, East Passyunk for Laurel, Bing Bing, and Fond. Pat's and Geno's for the tourist cheesesteak debate. Pho 75 on Washington Avenue.",
      transit: "Broad Street Line (Orange Line) runs the length of South Broad. Easy access to I-76 and I-95 via the stadium district.",
      parks: "FDR Park (a hidden gem with lakes and trails), Marconi Plaza, Columbus Square, and Mifflin Square.",
    },
    stats: {
      medianPrice: "$275,000",
      avgPricePerSqft: "$215",
      avgDaysOnMarket: 30,
      inventoryLevel: "Moderate",
    },
    marketData: {
      medianPrice: "$275,000",
      avgPricePerSqft: "$215",
      medianDaysOnMarket: 30,
      activeListings: 98,
      priceChange12m: "+5.2%",
    },
    schools: [
      { name: "Meredith William M. School", type: "Public", rating: 8, grades: "K-8", distance: "0.6 mi" },
      { name: "St. Maria Goretti High School", type: "Private", rating: 7, grades: "9-12", distance: "0.8 mi" },
      { name: "Furness Horace Howard School", type: "Public", rating: 5, grades: "K-8", distance: "0.4 mi" },
    ],
    walkScore: 92,
    transitScore: 72,
    bikeScore: 80,
    lifestyleInfo: {
      dining: "Italian Market for fresh produce, East Passyunk for Laurel and Fond, and Pho 75 on Washington Avenue for authentic Vietnamese.",
      nightlife: "East Passyunk cocktail bars, South Broad Street venues, and the sports bar scene around the stadium complex.",
      parks: "FDR Park with lakes and trails, Marconi Plaza, Columbus Square, and the sports complex district.",
      culture: "Italian Market heritage, vibrant murals, multicultural block parties, and the passionate sports culture of Broad Street.",
    },
    localSpots: [
      { name: "Italian Market", type: "Market", description: "America's oldest open-air market, nine blocks of butchers, cheese shops, produce stands, and bakeries." },
      { name: "Laurel", type: "Restaurant", description: "James Beard Award-winning French-inspired tasting menu restaurant on East Passyunk Avenue." },
      { name: "Bing Bing Dim Sum", type: "Restaurant", description: "Creative Asian-fusion dim sum and cocktails on the celebrated East Passyunk corridor." },
      { name: "Garage Passyunk", type: "Bar", description: "Retro-themed bar with craft cocktails, pinball machines, and a speakeasy vibe." },
    ],
    image:
      "https://images.unsplash.com/photo-1582407947092-50b8c541ccbd?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1582407947092-50b8c541ccbd?w=800&q=80",
    mapCenter: { lat: 39.9284, lng: -75.1645 },
    gallery: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", "https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?w=800&q=80"],
    monthlyTrend: [
      { month: "Apr 2025", medianPrice: 275930 },
      { month: "May 2025", medianPrice: 279876 },
      { month: "Jun 2025", medianPrice: 285343 },
      { month: "Jul 2025", medianPrice: 289176 },
      { month: "Aug 2025", medianPrice: 292103 },
      { month: "Sep 2025", medianPrice: 293249 },
      { month: "Oct 2025", medianPrice: 290436 },
      { month: "Nov 2025", medianPrice: 287295 },
      { month: "Dec 2025", medianPrice: 284490 },
      { month: "Jan 2026", medianPrice: 284781 },
      { month: "Feb 2026", medianPrice: 286956 },
      { month: "Mar 2026", medianPrice: 292596 },
    ],
    videoTourUrl: "https://www.youtube.com/watch?v=uVKJxWB_Xjk",
    propertyFilter: "South Philly",
    featured: false,
  },
  {
    id: "7",
    name: "University City",
    slug: "university-city",
    tagline: "Innovation district powered by world-class institutions",
    description:
      "University City is Philadelphia's intellectual engine, anchored by the University of Pennsylvania and Drexel University. The neighborhood has transformed from a purely academic enclave into a thriving innovation district where biotech startups, research hospitals, and tech companies cluster around the campuses. The Schuylkill River Trail provides a scenic corridor into Center City, just a short walk or bike ride across the bridge.\n\nHousing ranges from stately Victorian twins in Spruce Hill to modern high-rises along Market Street and renovated rowhomes in Cedar Park. The neighborhood's diversity is remarkable — students, professors, medical professionals, and families from dozens of countries create a cosmopolitan community with exceptional international dining. uCity Square and the expanding innovation campus are driving significant commercial investment, making this one of Philadelphia's strongest long-term real estate plays.",
    sellingPoints: [
      "Home to UPenn (Ivy League), Drexel University, and Penn Medicine",
      "uCity Square innovation campus attracting biotech and tech companies",
      "Strong rental demand from students, medical residents, and professionals",
      "Schuylkill River Trail access for running, cycling, and commuting",
      "Diverse housing stock from Victorian twins to modern high-rises",
      "30th Street Station — Amtrak hub connecting to NYC and Washington DC",
    ],
    lifestyle: {
      vibe: "Intellectual, diverse, and forward-looking. Campus energy meets neighborhood community. Farmers markets, lecture series, and food truck gatherings.",
      dining: "White Dog Cafe (farm-to-table pioneer), Marigold Kitchen, Walnut Street's Ethiopian row, food trucks at 33rd and Spruce, and the sprawling Dock Street Brewery.",
      transit: "30th Street Station (Amtrak, SEPTA Regional Rail). 34th and 40th Street trolley stops. Market-Frankford Line at 34th Street. Exceptional bike infrastructure.",
      parks: "Clark Park (with its farmers market), the Woodlands cemetery and gardens, Penn Park along the Schuylkill, and the river trail system.",
    },
    stats: {
      medianPrice: "$340,000",
      avgPricePerSqft: "$260",
      avgDaysOnMarket: 24,
      inventoryLevel: "Moderate",
    },
    marketData: {
      medianPrice: "$340,000",
      avgPricePerSqft: "$260",
      medianDaysOnMarket: 24,
      activeListings: 76,
      priceChange12m: "+4.5%",
    },
    schools: [
      { name: "Penn Alexander School", type: "Public", rating: 9, grades: "K-8", distance: "0.3 mi" },
      { name: "University of Pennsylvania", type: "Private", rating: 10, grades: "University", distance: "0.1 mi" },
      { name: "Lea Henry C. School", type: "Public", rating: 5, grades: "K-8", distance: "0.7 mi" },
    ],
    walkScore: 90,
    transitScore: 88,
    bikeScore: 85,
    lifestyleInfo: {
      dining: "White Dog Cafe, Walnut Street's Ethiopian row, food trucks at 33rd and Spruce, and Dock Street Brewery.",
      nightlife: "College-town energy along Walnut Street, rooftop bars, and the World Cafe Live music venue.",
      parks: "Clark Park with its farmers market, Penn Park along the Schuylkill, the Woodlands, and the river trail system.",
      culture: "Penn Museum, ICA contemporary art, university lectures and events, and the thriving international food scene.",
    },
    localSpots: [
      { name: "White Dog Cafe", type: "Restaurant", description: "Farm-to-table pioneer in a charming Victorian house, beloved for weekend brunch and community events." },
      { name: "Dock Street Brewery", type: "Brewery", description: "Award-winning brewery and pizzeria in a renovated firehouse with a sprawling outdoor space." },
      { name: "Clark Park Farmers Market", type: "Market", description: "Year-round Saturday market with local produce, baked goods, and handmade crafts." },
      { name: "Green Line Cafe", type: "Cafe", description: "Neighborhood coffee institution with multiple locations, free WiFi, and a steady stream of students and professors." },
    ],
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    mapCenter: { lat: 39.9522, lng: -75.1932 },
    gallery: ["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80", "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80"],
    monthlyTrend: [
      { month: "Apr 2025", medianPrice: 339521 },
      { month: "May 2025", medianPrice: 343364 },
      { month: "Jun 2025", medianPrice: 350957 },
      { month: "Jul 2025", medianPrice: 355527 },
      { month: "Aug 2025", medianPrice: 360640 },
      { month: "Sep 2025", medianPrice: 361335 },
      { month: "Oct 2025", medianPrice: 360474 },
      { month: "Nov 2025", medianPrice: 355663 },
      { month: "Dec 2025", medianPrice: 355542 },
      { month: "Jan 2026", medianPrice: 358648 },
      { month: "Feb 2026", medianPrice: 360826 },
      { month: "Mar 2026", medianPrice: 366777 },
    ],
    videoTourUrl: "https://www.youtube.com/watch?v=D2F-70xsCk8",
    propertyFilter: "University City",
    featured: false,
  },
  {
    id: "8",
    name: "Manayunk",
    slug: "manayunk",
    tagline: "Small-town charm on the Schuylkill",
    description:
      "Manayunk clings to the steep hills above the Schuylkill River, a former mill town that has reinvented itself as one of Philadelphia's most distinctive neighborhoods. Main Street — its commercial heart — runs along the river and the towpath canal, packed with restaurants, bars, boutiques, and fitness studios. The annual Manayunk Bike Race and StrEAT Food Festival draw crowds from across the region.\n\nThe terrain defines the living experience: hillside rowhomes offer dramatic river views, while newer developments along the canal provide waterfront access. The Manayunk Bridge Trail and towpath create miles of car-free running and cycling paths. Buyers here tend to be young professionals and active couples drawn to the outdoor lifestyle, village-scale walkability, and a social scene that punches well above its weight for a neighborhood of its size.",
    sellingPoints: [
      "Main Street — vibrant commercial corridor with 60+ restaurants and shops",
      "Manayunk Towpath and bridge trail for running, cycling, and kayaking",
      "Dramatic hillside views of the Schuylkill River valley",
      "Village-scale walkability rare in Philadelphia",
      "Strong community events: bike race, StrEAT Festival, Arts Festival",
      "More affordable entry point compared to Center City neighborhoods",
    ],
    lifestyle: {
      vibe: "Active, social, and tight-knit. Think of it as a small town with a big personality — everyone ends up at the same Main Street spots on weekends.",
      dining: "Lucky's Last Chance for brunch, Bourbon Blue for Southern comfort, The Couch Tomato for artisan pizza, and Main Street's rotating pop-up concepts.",
      transit: "Manayunk/Norristown Regional Rail line to Center City in 25 minutes. Car-friendly with easy access to I-76 (Schuylkill Expressway).",
      parks: "Manayunk Towpath (Schuylkill River Trail), Pretzel Park, Venice Island, and the Wissahickon Valley Park entrance is minutes away.",
    },
    stats: {
      medianPrice: "$310,000",
      avgPricePerSqft: "$230",
      avgDaysOnMarket: 32,
      inventoryLevel: "Moderate",
    },
    marketData: {
      medianPrice: "$310,000",
      avgPricePerSqft: "$230",
      medianDaysOnMarket: 32,
      activeListings: 44,
      priceChange12m: "+3.1%",
    },
    schools: [
      { name: "Cook-Wissahickon School", type: "Public", rating: 5, grades: "K-8", distance: "0.6 mi" },
      { name: "Manayunk Academy", type: "Charter", rating: 6, grades: "K-5", distance: "0.3 mi" },
      { name: "Roxborough High School", type: "Public", rating: 5, grades: "9-12", distance: "0.9 mi" },
    ],
    walkScore: 82,
    transitScore: 62,
    bikeScore: 75,
    lifestyleInfo: {
      dining: "Lucky's Last Chance for brunch, Bourbon Blue for Southern comfort, The Couch Tomato for artisan pizza, and Main Street bistros.",
      nightlife: "Main Street pub crawls, rooftop bars overlooking the river, and a lively social scene every weekend.",
      parks: "Manayunk Towpath along the Schuylkill, Pretzel Park, Venice Island, and Wissahickon Valley Park minutes away.",
      culture: "Annual bike race, StrEAT Food Festival, Arts Festival, and a tight-knit community of local artists and entrepreneurs.",
    },
    localSpots: [
      { name: "Lucky's Last Chance", type: "Restaurant", description: "Massive brunch spot and beer garden with a dog-friendly patio on Main Street." },
      { name: "The Couch Tomato", type: "Restaurant", description: "Artisan pizza and craft cocktails in a cozy Main Street space with creative seasonal toppings." },
      { name: "Manayunk Brewing Company", type: "Brewery", description: "Craft brewery with river views, seasonal releases, and a popular outdoor deck." },
      { name: "Pretzel Park Farmers Market", type: "Market", description: "Saturday morning market in a charming neighborhood park with local vendors and live music." },
    ],
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    mapCenter: { lat: 40.0261, lng: -75.2243 },
    gallery: ["https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80", "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80", "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?w=800&q=80", "https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=800&q=80"],
    monthlyTrend: [
      { month: "Apr 2025", medianPrice: 299287 },
      { month: "May 2025", medianPrice: 303516 },
      { month: "Jun 2025", medianPrice: 308404 },
      { month: "Jul 2025", medianPrice: 313807 },
      { month: "Aug 2025", medianPrice: 316980 },
      { month: "Sep 2025", medianPrice: 317137 },
      { month: "Oct 2025", medianPrice: 314107 },
      { month: "Nov 2025", medianPrice: 311707 },
      { month: "Dec 2025", medianPrice: 309071 },
      { month: "Jan 2026", medianPrice: 311338 },
      { month: "Feb 2026", medianPrice: 314857 },
      { month: "Mar 2026", medianPrice: 319593 },
    ],
    videoTourUrl: "https://www.youtube.com/watch?v=gWEyGo5VzLk",
    propertyFilter: "Manayunk",
    featured: false,
  },
  {
    id: "9",
    name: "Chestnut Hill",
    slug: "chestnut-hill",
    tagline: "Suburban elegance within city limits",
    description:
      "Chestnut Hill is Philadelphia's garden district — a leafy, affluent enclave at the city's northwestern edge that feels like a Main Line suburb while remaining firmly within city limits. Germantown Avenue serves as its charming commercial corridor, lined with independent bookshops, antique dealers, farm-to-table restaurants, and the kind of specialty stores that have thrived here for generations. The architecture is extraordinary: stone mansions, Arts and Crafts homes, and Colonial Revival estates set on generous lots with mature landscaping.\n\nFamilies are drawn here by the exceptional schools — both public (Springside Chestnut Hill Academy) and the surrounding private institutions. The Wissahickon Valley Park, with its 50 miles of trails, sits at the neighborhood's doorstep. Chestnut Hill commands premium prices and attracts buyers seeking space, privacy, and a quality of life that feels worlds away from urban Philadelphia — while being just a 30-minute train ride from Center City.",
    sellingPoints: [
      "Germantown Avenue — one of Philadelphia's most charming shopping streets",
      "Exceptional schools: Springside Chestnut Hill Academy, Norwood-Fontbonne, and top-rated public options",
      "Gateway to Wissahickon Valley Park — 1,800 acres of trails and forest",
      "Grand stone and Arts and Crafts homes on large, landscaped lots",
      "Active garden club and preservation community",
      "Regional Rail to Center City in 30 minutes",
    ],
    lifestyle: {
      vibe: "Gracious and community-oriented. Garden tours, holiday strolls on Germantown Avenue, and a pace of life built around family and nature.",
      dining: "McNally's Tavern (a local institution), Chestnut Grill, Cafette for Italian, Campbell's Place for fine dining, and the Chestnut Hill Farmers Market.",
      transit: "Chestnut Hill East and West Regional Rail lines both terminate here, offering two routes to Center City. Easy car access to the suburbs via Germantown Pike.",
      parks: "Wissahickon Valley Park (the Forbidden Drive trail), Morris Arboretum, Pastorius Park with its duck pond, and the Chestnut Hill College campus grounds.",
    },
    stats: {
      medianPrice: "$625,000",
      avgPricePerSqft: "$275",
      avgDaysOnMarket: 35,
      inventoryLevel: "Low",
    },
    marketData: {
      medianPrice: "$625,000",
      avgPricePerSqft: "$275",
      medianDaysOnMarket: 35,
      activeListings: 32,
      priceChange12m: "+4.2%",
    },
    schools: [
      { name: "Springside Chestnut Hill Academy", type: "Private", rating: 9, grades: "Pre-K-12", distance: "0.4 mi" },
      { name: "Norwood-Fontbonne Academy", type: "Private", rating: 8, grades: "Pre-K-8", distance: "0.6 mi" },
      { name: "Jenks Academy for the Arts", type: "Public", rating: 7, grades: "K-8", distance: "0.5 mi" },
    ],
    walkScore: 78,
    transitScore: 60,
    bikeScore: 65,
    lifestyleInfo: {
      dining: "McNally's Tavern, Chestnut Grill, Cafette for Italian, and Campbell's Place for fine dining on Germantown Avenue.",
      nightlife: "Low-key wine bars, cozy taverns, and seasonal events on Germantown Avenue rather than a late-night scene.",
      parks: "Wissahickon Valley Park with 50+ miles of trails, Morris Arboretum, Pastorius Park, and the Chestnut Hill College grounds.",
      culture: "Garden tours, antique shops, independent bookstores, and holiday strolls along one of Philadelphia's most charming commercial streets.",
    },
    localSpots: [
      { name: "McNally's Tavern", type: "Bar", description: "Neighborhood institution since 1921, famous for the Schmitter sandwich and a loyal local following." },
      { name: "Chestnut Hill Farmers Market", type: "Market", description: "Year-round indoor market with local farms, artisan bakers, and specialty food vendors." },
      { name: "Morris Arboretum", type: "Park", description: "92-acre public garden of the University of Pennsylvania with stunning seasonal displays and canopy walks." },
      { name: "Cafette", type: "Restaurant", description: "Charming Italian BYOB with handmade pastas and a garden patio on Germantown Avenue." },
    ],
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    mapCenter: { lat: 40.0781, lng: -75.2085 },
    gallery: ["https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80", "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80", "https://images.unsplash.com/photo-1600563438938-a9a27216b4f5?w=800&q=80", "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&q=80"],
    monthlyTrend: [
      { month: "Apr 2025", medianPrice: 465396 },
      { month: "May 2025", medianPrice: 471288 },
      { month: "Jun 2025", medianPrice: 481361 },
      { month: "Jul 2025", medianPrice: 487341 },
      { month: "Aug 2025", medianPrice: 492083 },
      { month: "Sep 2025", medianPrice: 496857 },
      { month: "Oct 2025", medianPrice: 492311 },
      { month: "Nov 2025", medianPrice: 486488 },
      { month: "Dec 2025", medianPrice: 484913 },
      { month: "Jan 2026", medianPrice: 485326 },
      { month: "Feb 2026", medianPrice: 488496 },
      { month: "Mar 2026", medianPrice: 497412 },
    ],
    videoTourUrl: "https://www.youtube.com/watch?v=JLZhW-8TXbE",
    propertyFilter: "Chestnut Hill",
    featured: true,
  },
  {
    id: "10",
    name: "Mt. Airy",
    slug: "mt-airy",
    tagline: "Progressive community rooted in diversity",
    description:
      "Mt. Airy is Philadelphia's proudly integrated neighborhood — a place where racial, economic, and cultural diversity isn't just tolerated but celebrated as the neighborhood's defining strength. Straddling Germantown Avenue between Chestnut Hill and Germantown, it offers tree-lined streets of substantial stone and stucco homes at prices that feel like a revelation compared to its more famous neighbor to the north.\n\nThe community is deeply engaged: the Weavers Way Co-op (a member-owned grocery) anchors the commercial district, the annual Mt. Airy Day festival fills the streets, and neighbors gather at spots like Earth Bread + Brewery and the Sedgwick Theater. Families with children appreciate the strong public school options and the immediate access to the Wissahickon Valley Park. Mt. Airy attracts progressive, community-minded buyers who want excellent value, large homes, and a neighborhood that practices what it preaches.",
    sellingPoints: [
      "Nationally recognized as a model of successful neighborhood integration",
      "Spacious stone homes at a fraction of Chestnut Hill prices",
      "Weavers Way Co-op and a strong independent business community",
      "Direct access to Wissahickon Valley Park trails",
      "Strong public and private school options",
      "Active civic associations and neighborhood engagement",
    ],
    lifestyle: {
      vibe: "Progressive, earthy, and deeply communal. Bumper stickers, yard signs, and co-op memberships are the local currency. Everyone knows their mail carrier.",
      dining: "Earth Bread + Brewery for craft brews and flatbreads, McMenamin's Tavern, Trolley Car Cafe and Diner, and the Weavers Way prepared foods counter.",
      transit: "Mt. Airy station on the Chestnut Hill East Regional Rail line. Bus routes along Germantown Avenue. Easy car access to I-76 and Lincoln Drive.",
      parks: "Wissahickon Valley Park (Forbidden Drive entrance at Valley Green), Carpenter's Woods, Cresheim Valley trails, and Awbury Arboretum.",
    },
    stats: {
      medianPrice: "$350,000",
      avgPricePerSqft: "$185",
      avgDaysOnMarket: 28,
      inventoryLevel: "Moderate",
    },
    marketData: {
      medianPrice: "$350,000",
      avgPricePerSqft: "$185",
      medianDaysOnMarket: 28,
      activeListings: 56,
      priceChange12m: "+3.8%",
    },
    schools: [
      { name: "C.W. Henry School", type: "Public", rating: 7, grades: "K-8", distance: "0.3 mi" },
      { name: "Waldorf School of Philadelphia", type: "Private", rating: 8, grades: "Pre-K-8", distance: "0.5 mi" },
      { name: "Wissahickon Charter School", type: "Charter", rating: 7, grades: "K-8", distance: "0.7 mi" },
    ],
    walkScore: 72,
    transitScore: 55,
    bikeScore: 60,
    lifestyleInfo: {
      dining: "Earth Bread + Brewery for craft brews, McMenamin's Tavern, Trolley Car Cafe, and Weavers Way prepared foods.",
      nightlife: "Community-focused evenings with brewery taprooms, live music at local venues, and neighborhood gathering spots.",
      parks: "Wissahickon Valley Park with Forbidden Drive, Carpenter's Woods, Cresheim Valley trails, and Awbury Arboretum.",
      culture: "Weavers Way Co-op community, Mt. Airy Day festival, gallery walks, and a strong tradition of neighborhood civic engagement.",
    },
    localSpots: [
      { name: "Earth Bread + Brewery", type: "Brewery", description: "Neighborhood brewery with house-made flatbreads, craft beers, and a loyal community following." },
      { name: "Weavers Way Co-op", type: "Shop", description: "Member-owned cooperative grocery anchoring the commercial district with local and organic products." },
      { name: "Trolley Car Cafe", type: "Cafe", description: "Cozy neighborhood cafe and diner serving breakfast all day in a welcoming space." },
      { name: "Awbury Arboretum", type: "Park", description: "55-acre estate with gardens, trails, and open meadows — a hidden urban oasis." },
    ],
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80",
    mapCenter: { lat: 40.0596, lng: -75.1931 },
    gallery: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80", "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80"],
    monthlyTrend: [
      { month: "Apr 2025", medianPrice: 294977 },
      { month: "May 2025", medianPrice: 299408 },
      { month: "Jun 2025", medianPrice: 304383 },
      { month: "Jul 2025", medianPrice: 309926 },
      { month: "Aug 2025", medianPrice: 312192 },
      { month: "Sep 2025", medianPrice: 313916 },
      { month: "Oct 2025", medianPrice: 313684 },
      { month: "Nov 2025", medianPrice: 310225 },
      { month: "Dec 2025", medianPrice: 310125 },
      { month: "Jan 2026", medianPrice: 312393 },
      { month: "Feb 2026", medianPrice: 315667 },
      { month: "Mar 2026", medianPrice: 320808 },
    ],
    videoTourUrl: "https://www.youtube.com/watch?v=YGYyXPqhL5U",
    propertyFilter: "Mt. Airy",
    featured: false,
  },
  {
    id: "11",
    name: "Germantown",
    slug: "germantown",
    tagline: "Historic grandeur with untapped potential",
    description:
      "Germantown is one of Philadelphia's oldest and most architecturally significant neighborhoods, founded in 1683 by German settlers and home to landmarks like the Cliveden estate (site of the 1777 Battle of Germantown) and the Wyck house, continuously occupied for over 300 years. The neighborhood's collection of Colonial, Federal, and Victorian architecture rivals any in the country, with grand stone mansions and intact historic streetscapes.\n\nToday Germantown is in the midst of a renaissance. Artists, entrepreneurs, and preservation-minded buyers are drawn by the extraordinary housing stock — grand homes with original details at prices that seem almost unbelievable. Germantown Avenue is seeing new investment in restaurants, galleries, and community spaces. The neighborhood faces real challenges with vacancy and disinvestment in some blocks, but the trajectory is unmistakably upward. For buyers with vision, Germantown offers the kind of value and architectural character that simply doesn't exist elsewhere in Philadelphia.",
    sellingPoints: [
      "Extraordinary Colonial and Victorian architecture at exceptional prices",
      "Historic landmarks: Cliveden, Wyck, Grumblethorpe, Johnson House (Underground Railroad)",
      "Large lots and grand homes rare in urban Philadelphia",
      "Active arts community with galleries and maker spaces",
      "Strong momentum with new restaurants and businesses on Germantown Avenue",
      "Proximity to Wissahickon Valley Park and Awbury Arboretum",
    ],
    lifestyle: {
      vibe: "Pioneering and artistic. A neighborhood in transformation where community organizers, artists, and longtime residents are building something new together.",
      dining: "Attic Brewing Company, Uncle Bobbie's Coffee and Books (a cultural hub), Germantown Garden Grill, and a growing roster of new food concepts on the Avenue.",
      transit: "Chelten Avenue station on the Chestnut Hill West Regional Rail line. Multiple SEPTA bus routes. Easy car access via Germantown Avenue and Lincoln Drive.",
      parks: "Vernon Park, Awbury Arboretum (55 acres of gardens and trails), Wissahickon Valley Park, and the historic Cliveden grounds.",
    },
    stats: {
      medianPrice: "$215,000",
      avgPricePerSqft: "$125",
      avgDaysOnMarket: 42,
      inventoryLevel: "High",
    },
    marketData: {
      medianPrice: "$215,000",
      avgPricePerSqft: "$125",
      medianDaysOnMarket: 42,
      activeListings: 88,
      priceChange12m: "+7.5%",
    },
    schools: [
      { name: "Germantown Friends School", type: "Private", rating: 9, grades: "Pre-K-12", distance: "0.3 mi" },
      { name: "Wissahickon Charter School", type: "Charter", rating: 7, grades: "K-8", distance: "0.6 mi" },
      { name: "Roosevelt Theodore School", type: "Public", rating: 4, grades: "K-8", distance: "0.5 mi" },
    ],
    walkScore: 68,
    transitScore: 52,
    bikeScore: 55,
    lifestyleInfo: {
      dining: "Attic Brewing Company, Uncle Bobbie's Coffee and Books, Germantown Garden Grill, and a growing roster of new food concepts.",
      nightlife: "Brewery taprooms, cultural events at historic venues, and a burgeoning after-hours scene along the Avenue.",
      parks: "Vernon Park, Awbury Arboretum, Wissahickon Valley Park, and the historic Cliveden grounds with outdoor events.",
      culture: "Historic landmarks like Cliveden and the Johnson House (Underground Railroad), active galleries, and maker spaces.",
    },
    localSpots: [
      { name: "Uncle Bobbie's Coffee & Books", type: "Cafe", description: "Cultural hub and bookstore celebrating Black literature with craft coffee and community events." },
      { name: "Attic Brewing Company", type: "Brewery", description: "Community-focused brewery in a restored industrial space with rotating food trucks and events." },
      { name: "Cliveden", type: "Gallery", description: "Historic estate and museum site of the 1777 Battle of Germantown, hosting cultural events year-round." },
      { name: "Germantown Garden Grill", type: "Restaurant", description: "Farm-to-table cafe with garden seating, locally sourced menus, and a community gathering vibe." },
    ],
    image:
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&q=80",
    mapCenter: { lat: 40.0413, lng: -75.1766 },
    gallery: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80", "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80", "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80"],
    monthlyTrend: [
      { month: "Apr 2025", medianPrice: 189967 },
      { month: "May 2025", medianPrice: 191970 },
      { month: "Jun 2025", medianPrice: 196242 },
      { month: "Jul 2025", medianPrice: 199153 },
      { month: "Aug 2025", medianPrice: 202024 },
      { month: "Sep 2025", medianPrice: 202845 },
      { month: "Oct 2025", medianPrice: 202681 },
      { month: "Nov 2025", medianPrice: 199963 },
      { month: "Dec 2025", medianPrice: 199952 },
      { month: "Jan 2026", medianPrice: 200777 },
      { month: "Feb 2026", medianPrice: 202148 },
      { month: "Mar 2026", medianPrice: 204869 },
    ],
    videoTourUrl: "https://www.youtube.com/watch?v=hfMQ8C9oR_0",
    propertyFilter: "Germantown",
    featured: false,
  },
  {
    id: "12",
    name: "West Philly",
    slug: "west-philly",
    tagline: "Eclectic, diverse, and endlessly interesting",
    description:
      "West Philadelphia is one of the city's most eclectic and culturally rich areas, stretching from the Schuylkill River west through neighborhoods like Spruce Hill, Cedar Park, and Cobbs Creek. The area pulses with the energy of its diverse residents — Ethiopian and Eritrean restaurants line Baltimore Avenue alongside Caribbean bakeries, vintage shops, and community gardens. The Victorian housing stock, with its wide porches, bay windows, and generous lots, offers some of the best value in the city.\n\nCedar Park has emerged as a particular hotspot, with Clark Park's weekly farmers market and a walkable stretch of Baltimore Avenue anchoring a vibrant commercial district. The proximity to University City (UPenn and Drexel) fuels steady demand, while the trolley lines along Baltimore and Woodland Avenues provide direct transit to Center City. West Philly attracts artists, academics, families, and anyone who values cultural diversity and architectural character over polish.",
    sellingPoints: [
      "Grand Victorian homes with porches and yards at accessible prices",
      "Baltimore Avenue's diverse dining and shopping corridor",
      "Clark Park farmers market and community gathering space",
      "Direct trolley service to Center City via Routes 34, 36, and 13",
      "Strong rental demand from University City proximity",
      "One of Philadelphia's most culturally diverse neighborhoods",
    ],
    lifestyle: {
      vibe: "Bohemian, intellectual, and proudly diverse. Porch culture reigns supreme. Community gardens, spoken word nights, and world music define the texture.",
      dining: "Dahlak for Ethiopian, Booker's soul food, Dock Street Brewery, Gojjo for Eritrean, and the Clark Park farmers market on Saturdays year-round.",
      transit: "SEPTA trolley routes 13, 34, 36 run through the neighborhood to Center City. 46th Street and 52nd Street bus hubs. Bikeable via the Schuylkill River Trail.",
      parks: "Clark Park, Malcolm X Park, Cobbs Creek Park (276 acres with golf course), and direct access to the Schuylkill River Trail via University City.",
    },
    stats: {
      medianPrice: "$280,000",
      avgPricePerSqft: "$175",
      avgDaysOnMarket: 26,
      inventoryLevel: "Moderate",
    },
    marketData: {
      medianPrice: "$280,000",
      avgPricePerSqft: "$175",
      medianDaysOnMarket: 26,
      activeListings: 82,
      priceChange12m: "+5.0%",
    },
    schools: [
      { name: "Lea Henry C. School", type: "Public", rating: 5, grades: "K-8", distance: "0.4 mi" },
      { name: "Penn Alexander School", type: "Public", rating: 9, grades: "K-8", distance: "0.8 mi" },
      { name: "Woodland Academy", type: "Charter", rating: 6, grades: "K-8", distance: "0.6 mi" },
    ],
    walkScore: 85,
    transitScore: 75,
    bikeScore: 82,
    lifestyleInfo: {
      dining: "Dahlak for Ethiopian, Booker's soul food, Gojjo for Eritrean, and the Clark Park farmers market on Saturdays.",
      nightlife: "Laid-back bar scene along Baltimore Avenue, spoken word nights, world music at local venues, and porch gatherings.",
      parks: "Clark Park, Malcolm X Park, Cobbs Creek Park with 276 acres and a golf course, and the Schuylkill River Trail.",
      culture: "Bohemian spirit with community gardens, mural arts, Ethiopian cultural institutions, and university-driven events.",
    },
    localSpots: [
      { name: "Dahlak", type: "Restaurant", description: "Ethiopian and Eritrean restaurant with traditional injera platters and a warm, communal atmosphere." },
      { name: "Dock Street Brewery South", type: "Brewery", description: "Brewery and pizzeria in a converted space with outdoor seating and a rotating tap list." },
      { name: "Clark Park", type: "Park", description: "Community heart of West Philly with farmers market, playground, and year-round neighborhood events." },
      { name: "Booker's", type: "Restaurant", description: "Beloved soul food spot with fried chicken, collard greens, and a counter-service neighborhood feel." },
    ],
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
    mapCenter: { lat: 39.9557, lng: -75.2213 },
    gallery: ["https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80", "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80"],
    monthlyTrend: [
      { month: "Apr 2025", medianPrice: 252388 },
      { month: "May 2025", medianPrice: 257158 },
      { month: "Jun 2025", medianPrice: 262189 },
      { month: "Jul 2025", medianPrice: 266676 },
      { month: "Aug 2025", medianPrice: 270508 },
      { month: "Sep 2025", medianPrice: 271916 },
      { month: "Oct 2025", medianPrice: 271192 },
      { month: "Nov 2025", medianPrice: 269098 },
      { month: "Dec 2025", medianPrice: 268716 },
      { month: "Jan 2026", medianPrice: 268814 },
      { month: "Feb 2026", medianPrice: 270613 },
      { month: "Mar 2026", medianPrice: 276017 },
    ],
    videoTourUrl: "https://www.youtube.com/watch?v=3lJVwczOmKM",
    propertyFilter: "West Philly",
    featured: false,
  },
  {
    id: "13",
    name: "Kensington",
    slug: "kensington",
    tagline: "Industrial grit meeting artistic revival",
    description:
      "Kensington is a neighborhood of contrasts and rapid change. Once the industrial heart of Philadelphia — home to massive textile mills and factories that employed tens of thousands — it fell hard in the post-industrial era. But the same qualities that made it an industrial powerhouse now fuel its creative resurgence: vast warehouse spaces perfect for studios and breweries, an unbeatable stock of affordable housing, and a grittiness that attracts people who build things.\n\nThe arts community has taken root along Front Street and Frankford Avenue's northern stretch, with galleries, maker spaces, and craft beverage producers filling former factory buildings. New construction is appearing at a rapid pace, and longtime residents are seeing real investment in their blocks for the first time in decades. Kensington is not for everyone — some areas face significant challenges — but for buyers who recognize where a neighborhood is heading rather than where it's been, the opportunity is compelling.",
    sellingPoints: [
      "Lowest entry prices of any gentrifying Philadelphia neighborhood",
      "Massive warehouse-to-loft conversion potential",
      "Growing brewery and distillery scene along Front Street",
      "Proximity to Fishtown's amenities and the Market-Frankford Line",
      "Active arts community with studio spaces and galleries",
      "Rapid development with new-construction townhomes under $400K",
    ],
    lifestyle: {
      vibe: "Raw, creative, and evolving. The neighborhood has edge — it's where artists, craftspeople, and urban pioneers are staking their claim.",
      dining: "Front Street Cafe for all-day dining, Mural City Cellars for natural wine, Pizza Brain (world's first pizza museum), and emerging concepts along Frankford Avenue.",
      transit: "Multiple stations on the Market-Frankford Line (Huntingdon, Somerset, Allegheny). Good bus connections. Bikeable to Center City via the riverfront trail.",
      parks: "Palmer Park, McPherson Square, Harrowgate Park, and growing investment in new green spaces as development continues.",
    },
    stats: {
      medianPrice: "$225,000",
      avgPricePerSqft: "$180",
      avgDaysOnMarket: 22,
      inventoryLevel: "Moderate",
    },
    marketData: {
      medianPrice: "$225,000",
      avgPricePerSqft: "$180",
      medianDaysOnMarket: 22,
      activeListings: 64,
      priceChange12m: "+9.1%",
    },
    schools: [
      { name: "Adaire Alexander School", type: "Public", rating: 6, grades: "K-8", distance: "0.5 mi" },
      { name: "Kensington Health Sciences Academy", type: "Public", rating: 5, grades: "9-12", distance: "0.4 mi" },
      { name: "MaST Community Charter", type: "Charter", rating: 8, grades: "K-12", distance: "1.0 mi" },
    ],
    walkScore: 88,
    transitScore: 80,
    bikeScore: 85,
    lifestyleInfo: {
      dining: "Front Street Cafe for all-day dining, Pizza Brain, Mural City Cellars for natural wine, and emerging concepts along Frankford.",
      nightlife: "Brewery taprooms, live music at underground venues, and the growing Front Street bar scene.",
      parks: "Palmer Park, McPherson Square, Harrowgate Park, and growing investment in new green spaces.",
      culture: "Street murals, maker spaces, gallery openings, and a raw creative energy driving the neighborhood's transformation.",
    },
    localSpots: [
      { name: "Front Street Cafe", type: "Cafe", description: "All-day cafe and event space with yoga classes, live music, and a plant-filled interior." },
      { name: "Pizza Brain", type: "Restaurant", description: "World's first pizza museum with creative pies and a collection of pizza memorabilia." },
      { name: "Mural City Cellars", type: "Bar", description: "Natural wine bar in a converted industrial space with rotating pours and charcuterie." },
      { name: "Kensington Quarters", type: "Restaurant", description: "Whole-animal butcher shop and restaurant with seasonal menus and an in-house butchery." },
    ],
    image:
      "https://images.unsplash.com/photo-1590725121839-892b458a74fe?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1590725121839-892b458a74fe?w=800&q=80",
    mapCenter: { lat: 39.9867, lng: -75.1277 },
    gallery: ["https://images.unsplash.com/photo-1599427303058-f04cbcf4756f?w=800&q=80", "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80", "https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&q=80"],
    monthlyTrend: [
      { month: "Apr 2025", medianPrice: 267732 },
      { month: "May 2025", medianPrice: 270777 },
      { month: "Jun 2025", medianPrice: 276344 },
      { month: "Jul 2025", medianPrice: 280442 },
      { month: "Aug 2025", medianPrice: 284533 },
      { month: "Sep 2025", medianPrice: 285615 },
      { month: "Oct 2025", medianPrice: 284034 },
      { month: "Nov 2025", medianPrice: 281413 },
      { month: "Dec 2025", medianPrice: 279674 },
      { month: "Jan 2026", medianPrice: 282224 },
      { month: "Feb 2026", medianPrice: 286114 },
      { month: "Mar 2026", medianPrice: 291045 },
    ],
    videoTourUrl: "https://www.youtube.com/watch?v=2PxgkZ3EYEI",
    propertyFilter: "Kensington",
    featured: false,
  },
  {
    id: "14",
    name: "Brewerytown",
    slug: "brewerytown",
    tagline: "Philadelphia's next great neighborhood",
    description:
      "Brewerytown takes its name from the dozen-plus breweries that once operated here in the 19th century, making it the brewing capital of America. Perched on the bluffs above the Schuylkill River just north of the Philadelphia Museum of Art, the neighborhood offers something increasingly rare in Philadelphia: proximity to Fairmount Park and the Art Museum area at prices that feel like they belong to a different era.\n\nThe renaissance is well underway. Girard Avenue, the main commercial corridor, now hosts craft coffee shops, a thriving brewery scene (the name lives on), and restaurants that draw diners from across the city. New-construction townhomes and gut-renovated rowhomes are selling briskly, and the neighborhood's housing stock of classic Philadelphia rowhomes provides endless renovation potential. For buyers priced out of Fairmount or Northern Liberties, Brewerytown delivers similar proximity and walkability at a significant discount.",
    sellingPoints: [
      "Steps from Fairmount Park, the Schuylkill River Trail, and the Philadelphia Zoo",
      "Walking distance to the Philadelphia Museum of Art and Boathouse Row",
      "Significant price discount vs. neighboring Fairmount and Northern Liberties",
      "New breweries honoring the neighborhood's 19th-century heritage",
      "Active new construction with modern townhomes under $450K",
      "Strong appreciation trajectory with each year of new investment",
    ],
    lifestyle: {
      vibe: "Up-and-coming with real momentum. Young homeowners renovating rowhomes, new businesses opening monthly, and a palpable sense of possibility.",
      dining: "Crime & Punishment Brewing, Brewery ARS, Girard Avenue's growing restaurant row, and easy access to the Italian Market and Northern Liberties dining scenes.",
      transit: "SEPTA bus routes along Girard Avenue. Bikeable to Center City in 15 minutes via the Schuylkill River Trail. Car-friendly with easy access to I-76.",
      parks: "Fairmount Park (the largest urban park in America), Schuylkill River Trail, Philadelphia Zoo, and Please Touch Museum — all within walking distance.",
    },
    stats: {
      medianPrice: "$295,000",
      avgPricePerSqft: "$210",
      avgDaysOnMarket: 20,
      inventoryLevel: "Low",
    },
    marketData: {
      medianPrice: "$295,000",
      avgPricePerSqft: "$210",
      medianDaysOnMarket: 20,
      activeListings: 36,
      priceChange12m: "+8.7%",
    },
    schools: [
      { name: "Brown Henry A. School", type: "Public", rating: 4, grades: "K-8", distance: "0.3 mi" },
      { name: "Girard College", type: "Private", rating: 8, grades: "1-12", distance: "0.7 mi" },
      { name: "Science Leadership Academy Middle School", type: "Magnet", rating: 7, grades: "5-8", distance: "1.0 mi" },
    ],
    walkScore: 84,
    transitScore: 65,
    bikeScore: 88,
    lifestyleInfo: {
      dining: "Crime & Punishment Brewing, Brewery ARS, Girard Avenue's growing restaurant row, and proximity to Northern Liberties dining.",
      nightlife: "Brewery taprooms with outdoor patios, Girard Avenue bar scene, and easy access to Fairmount's nightlife.",
      parks: "Fairmount Park, Schuylkill River Trail, Philadelphia Zoo, and Please Touch Museum — all within walking distance.",
      culture: "Brewing heritage revival, proximity to the Philadelphia Museum of Art and Boathouse Row, and a growing local arts scene.",
    },
    localSpots: [
      { name: "Crime & Punishment Brewing", type: "Brewery", description: "Russian-literature-themed brewery with creative beers, a full kitchen, and a large outdoor space." },
      { name: "Brewery ARS", type: "Brewery", description: "Belgian-inspired neighborhood brewery with farmhouse ales and a welcoming taproom." },
      { name: "Philadelphia Zoo", type: "Park", description: "America's first zoo, home to 1,300+ animals and innovative animal exploration trails." },
      { name: "Boathouse Row", type: "Park", description: "Iconic illuminated boathouses along the Schuylkill, perfect for evening runs and river views." },
    ],
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    mapCenter: { lat: 39.9775, lng: -75.1756 },
    gallery: ["https://images.unsplash.com/photo-1600563438938-a9a27216b4f5?w=800&q=80", "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80", "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?w=800&q=80"],
    monthlyTrend: [
      { month: "Apr 2025", medianPrice: 304185 },
      { month: "May 2025", medianPrice: 310118 },
      { month: "Jun 2025", medianPrice: 315234 },
      { month: "Jul 2025", medianPrice: 320717 },
      { month: "Aug 2025", medianPrice: 325018 },
      { month: "Sep 2025", medianPrice: 327446 },
      { month: "Oct 2025", medianPrice: 325160 },
      { month: "Nov 2025", medianPrice: 321425 },
      { month: "Dec 2025", medianPrice: 320530 },
      { month: "Jan 2026", medianPrice: 323625 },
      { month: "Feb 2026", medianPrice: 327387 },
      { month: "Mar 2026", medianPrice: 332430 },
    ],
    videoTourUrl: "https://www.youtube.com/watch?v=dJ94wJlqHRs",
    propertyFilter: "Brewerytown",
    featured: false,
  },
  {
    id: "15",
    name: "Point Breeze",
    slug: "point-breeze",
    tagline: "South Philly's rising star",
    description:
      "Point Breeze is South Philadelphia's most talked-about emerging neighborhood. Bordered by Graduate Hospital to the north and Grays Ferry to the west, it has experienced dramatic transformation over the past decade as developers and owner-occupants have discovered its classic rowhome stock, generous lot sizes, and unbeatable proximity to Center City. New-construction homes now sit alongside unrenovated originals, creating a neighborhood in active transition.\n\nThe commercial development has followed the residential: craft breweries, coffee shops, and restaurants have filled previously vacant storefronts along Point Breeze Avenue and Mifflin Street. The neighborhood benefits from its location — South Broad Street's restaurants and nightlife are just blocks away, and the Broad Street Line subway provides a direct shot to Center City and Temple University. For first-time buyers and investors, Point Breeze offers the most accessible entry point to the hot South Philadelphia market.",
    sellingPoints: [
      "Most affordable entry point to South Philadelphia's housing market",
      "Classic rowhomes with renovation potential on wide streets",
      "Walking distance to South Broad Street's restaurant corridor",
      "Broad Street Line subway access to Center City in minutes",
      "Active new construction with modern finishes under $350K",
      "Strong investment returns as the neighborhood continues to mature",
    ],
    lifestyle: {
      vibe: "Transitional and energetic. Long-time residents and newcomers are finding common ground as the neighborhood evolves. Block cleanups and community meetings are well-attended.",
      dining: "Burg's Hideaway Lounge for cocktails, the expanding options along Point Breeze Avenue, proximity to East Passyunk's acclaimed dining strip, and neighborhood BYOBs.",
      transit: "Broad Street Line stations at Snyder and Tasker-Morris. SEPTA bus routes along Point Breeze Avenue. Bikeable to Center City via the Schuylkill River Trail.",
      parks: "Capitolo Playground, Girard Park, proximity to FDR Park, and the Schuylkill River Trail accessible via Grays Ferry Crescent.",
    },
    stats: {
      medianPrice: "$260,000",
      avgPricePerSqft: "$195",
      avgDaysOnMarket: 24,
      inventoryLevel: "Moderate",
    },
    marketData: {
      medianPrice: "$260,000",
      avgPricePerSqft: "$195",
      medianDaysOnMarket: 24,
      activeListings: 72,
      priceChange12m: "+6.8%",
    },
    schools: [
      { name: "Andrew Jackson School", type: "Public", rating: 4, grades: "K-8", distance: "0.3 mi" },
      { name: "Meredith William M. School", type: "Public", rating: 8, grades: "K-8", distance: "0.9 mi" },
      { name: "Mastery Charter Gratz", type: "Charter", rating: 5, grades: "7-12", distance: "0.7 mi" },
    ],
    walkScore: 86,
    transitScore: 70,
    bikeScore: 78,
    lifestyleInfo: {
      dining: "Burg's Hideaway Lounge, expanding options along Point Breeze Avenue, and proximity to East Passyunk's dining strip.",
      nightlife: "Cocktail lounges, neighborhood bars on Point Breeze Avenue, and easy access to South Broad Street venues.",
      parks: "Capitolo Playground, Girard Park, FDR Park nearby, and the Schuylkill River Trail via Grays Ferry Crescent.",
      culture: "A neighborhood in transition with community murals, block clean-ups, and an emerging local business scene.",
    },
    localSpots: [
      { name: "Burg's Hideaway Lounge", type: "Bar", description: "Craft cocktail bar that became the neighborhood's first upscale watering hole and a local gathering spot." },
      { name: "Grays Ferry Crescent", type: "Park", description: "Riverside trail and park connecting Point Breeze to the Schuylkill River Trail with scenic views." },
      { name: "South Philly Barbacoa", type: "Restaurant", description: "Legendary Mexican barbacoa tacos and lamb consomme, drawing food lovers from across the city." },
      { name: "The Tasker", type: "Restaurant", description: "Neighborhood cafe and bottle shop with craft beer, wine, and a small but creative food menu." },
    ],
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    mapCenter: { lat: 39.9343, lng: -75.1824 },
    gallery: ["https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=800&q=80", "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80", "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&q=80", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"],
    monthlyTrend: [
      { month: "Apr 2025", medianPrice: 282481 },
      { month: "May 2025", medianPrice: 286887 },
      { month: "Jun 2025", medianPrice: 292549 },
      { month: "Jul 2025", medianPrice: 297005 },
      { month: "Aug 2025", medianPrice: 300770 },
      { month: "Sep 2025", medianPrice: 303743 },
      { month: "Oct 2025", medianPrice: 301983 },
      { month: "Nov 2025", medianPrice: 298150 },
      { month: "Dec 2025", medianPrice: 296285 },
      { month: "Jan 2026", medianPrice: 296485 },
      { month: "Feb 2026", medianPrice: 299874 },
      { month: "Mar 2026", medianPrice: 305849 },
    ],
    videoTourUrl: "https://www.youtube.com/watch?v=aT_1lDJU-m4",
    propertyFilter: "Point Breeze",
    featured: false,
  },
];

export function getNeighborhoodBySlug(
  slug: string,
): Neighborhood | undefined {
  return neighborhoods.find((n) => n.slug === slug);
}

export function getFeaturedNeighborhoods(): Neighborhood[] {
  return neighborhoods.filter((n) => n.featured);
}
