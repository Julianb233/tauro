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
  image: string;
  cardImage: string;
  mapCenter: { lat: number; lng: number };
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
    image:
      "https://images.unsplash.com/photo-1569761316261-9a8696fa2ca3?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1569761316261-9a8696fa2ca3?w=800&q=80",
    mapCenter: { lat: 39.9526, lng: -75.1652 },
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
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    mapCenter: { lat: 39.9494, lng: -75.1717 },
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
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    mapCenter: { lat: 39.9735, lng: -75.1328 },
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
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    mapCenter: { lat: 39.9657, lng: -75.1419 },
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
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    mapCenter: { lat: 39.9524, lng: -75.1438 },
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
    image:
      "https://images.unsplash.com/photo-1582407947092-50b8c541ccbd?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1582407947092-50b8c541ccbd?w=800&q=80",
    mapCenter: { lat: 39.9284, lng: -75.1645 },
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
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    mapCenter: { lat: 39.9522, lng: -75.1932 },
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
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    mapCenter: { lat: 40.0261, lng: -75.2243 },
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
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    mapCenter: { lat: 40.0781, lng: -75.2085 },
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
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80",
    mapCenter: { lat: 40.0596, lng: -75.1931 },
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
    image:
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?w=800&q=80",
    mapCenter: { lat: 40.0413, lng: -75.1766 },
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
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
    mapCenter: { lat: 39.9557, lng: -75.2213 },
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
    image:
      "https://images.unsplash.com/photo-1590725121839-892b458a74fe?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1590725121839-892b458a74fe?w=800&q=80",
    mapCenter: { lat: 39.9867, lng: -75.1277 },
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
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    mapCenter: { lat: 39.9775, lng: -75.1756 },
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
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
    cardImage:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    mapCenter: { lat: 39.9343, lng: -75.1824 },
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
