export interface SoldListing {
  address: string;
  price: number;
  soldDate: string;
  neighborhood: string;
}

export interface Agent {
  id: string;
  slug: string;
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  email: string;
  phone: string;
  photo: string;
  bio: string;
  shortBio: string;
  specialties: string[];
  neighborhoods: string[];
  stats: {
    propertiesSold: number;
    totalVolume: string;
    avgDaysOnMarket: number;
    yearsExperience: number;
  };
  awards: {
    title: string;
    year: number;
    issuer: string;
  }[];
  videoIntroUrl: string | null;
  videoIntroId: string | null;
  activeListingIds: string[];
  soldListingIds: string[];
  soldListings: SoldListing[];
  social: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
  };
  languages: string[];
  licenseNumber: string;
  testimonials?: {
    quote: string;
    clientName: string;
    rating: number;
    date: string;
  }[];
}

export const agents: Agent[] = [
  {
    id: "1",
    slug: "tony-goodman",
    firstName: "Tony",
    lastName: "Goodman",
    fullName: "Tony Goodman",
    title: "Broker & Owner",
    email: "tcupone@aol.com",
    phone: "(215) 427-2870",
    photo: "/agents/tony-goodman.jpg",
    bio: "With over 20 years in Philadelphia real estate, Tony Goodman is the Broker and Owner of Exit Benchmark Realty. A Hampton University graduate with a degree in Finance, Tony has built his career on integrity, community investment, and helping families build generational wealth through real estate. His deep knowledge of Philadelphia's neighborhoods and unwavering commitment to his clients have made him a trusted advisor across the city. Tony is passionate about empowering homeowners and investors alike, bringing the same dedication to a first-time buyer as he does to a seasoned investor.",
    shortBio:
      "Broker/Owner of Exit Benchmark Realty with 20+ years helping Philadelphia families build wealth through real estate.",
    specialties: [
      "Residential Sales",
      "Investment Properties",
      "First-Time Buyers",
      "Community Development",
      "Wealth Building",
    ],
    neighborhoods: [
      "Cheltenham",
      "North Philadelphia",
      "Germantown",
      "Mount Airy",
      "Fishtown",
    ],
    stats: {
      propertiesSold: 145,
      totalVolume: "$28M+",
      avgDaysOnMarket: 34,
      yearsExperience: 22,
    },
    awards: [
      {
        title: "EXIT Spirit Award",
        year: 2024,
        issuer: "EXIT Realty International",
      },
      {
        title: "Community Builder Award",
        year: 2023,
        issuer: "Pennsylvania Association of Realtors",
      },
    ],
    videoIntroUrl: null,
    videoIntroId: null,
    activeListingIds: ["1", "3", "5"],
    soldListingIds: ["101", "102", "103", "104"],
    soldListings: [
      { address: "3222 W. Cheltenham Ave", price: 385000, soldDate: "2025-10-15", neighborhood: "Cheltenham" },
      { address: "5847 N. 12th St", price: 275000, soldDate: "2025-08-22", neighborhood: "North Philadelphia" },
      { address: "441 E. Girard Ave", price: 520000, soldDate: "2025-06-10", neighborhood: "Fishtown" },
      { address: "1934 W. Ontario St", price: 195000, soldDate: "2025-04-03", neighborhood: "North Philadelphia" },
    ],
    social: {
      instagram: "https://instagram.com/tcupone",
      linkedin: "https://linkedin.com/in/tony-goodman-625682b",
      facebook: "https://facebook.com/tony.goodman1",
    },
    languages: ["English"],
    licenseNumber: "RM420582",
    testimonials: [
      { quote: "Tony made our first home purchase stress-free. He knew every block in North Philly and found us a gem we never would have seen on our own.", clientName: "Marcus & Tina D.", rating: 5, date: "2025-09" },
      { quote: "Sold our investment property in two weeks for above asking. Tony's market knowledge is unmatched.", clientName: "David R.", rating: 5, date: "2025-07" },
      { quote: "As a first-time buyer I had a million questions. Tony answered every single one with patience and honesty. Couldn't recommend him more.", clientName: "Ashley M.", rating: 5, date: "2025-04" },
      { quote: "Tony helped us navigate a complicated multi-family purchase. His finance background really showed — he caught things other agents would have missed.", clientName: "James & Keisha P.", rating: 5, date: "2025-01" },
    ],
  },
  {
    id: "2",
    slug: "shaquonda-garrett",
    firstName: "Shaquonda",
    lastName: "Garrett",
    fullName: "Shaquonda Garrett",
    title: "Licensed Realtor & Partner",
    email: "shaquonda@exitbenchmark.com",
    phone: "(215) 817-5777",
    photo: "/agents/shaquonda-garrett.jpg",
    bio: "Shaquonda Garrett is a driven Realtor partnering with Tony Goodman at Exit Benchmark Realty. She specializes in helping families find homes in Philadelphia's up-and-coming neighborhoods, combining her background in community advocacy with sharp negotiation skills and warm client relationships. Shaquonda's passion for her community shines through in every transaction, and her clients consistently praise her responsiveness, honesty, and tireless work ethic. Whether you are buying your first home or selling to move up, Shaquonda brings a fierce dedication to getting the best outcome for her clients.",
    shortBio:
      "Driven Realtor specializing in Philadelphia's up-and-coming neighborhoods with a background in community advocacy.",
    specialties: [
      "Residential Sales",
      "First-Time Buyers",
      "Community Advocacy",
      "Buyer Representation",
      "Neighborhood Revitalization",
    ],
    neighborhoods: [
      "Brewerytown",
      "Strawberry Mansion",
      "Point Breeze",
      "West Philadelphia",
      "Germantown",
    ],
    stats: {
      propertiesSold: 67,
      totalVolume: "$14M+",
      avgDaysOnMarket: 38,
      yearsExperience: 8,
    },
    awards: [
      {
        title: "Rising Star",
        year: 2024,
        issuer: "EXIT Realty International",
      },
    ],
    videoIntroUrl: null,
    videoIntroId: null,
    activeListingIds: ["2", "4"],
    soldListingIds: ["201", "202", "203"],
    soldListings: [
      { address: "2912 W. Girard Ave", price: 310000, soldDate: "2025-09-28", neighborhood: "Brewerytown" },
      { address: "1245 N. 28th St", price: 265000, soldDate: "2025-07-14", neighborhood: "Brewerytown" },
      { address: "4520 Spruce St", price: 425000, soldDate: "2025-05-05", neighborhood: "West Philadelphia" },
    ],
    social: {
      instagram: "https://instagram.com/shaquondagarrett",
      linkedin: "https://linkedin.com/in/shaquonda-garrett",
    },
    languages: ["English"],
    licenseNumber: "RS-612847",
    testimonials: [
      { quote: "Shaquonda found us the perfect Fishtown loft. She understood exactly what we were looking for before we even fully knew ourselves.", clientName: "Nicole T.", rating: 5, date: "2025-11" },
      { quote: "Incredible negotiator. She got us $40K below asking on a competitive listing in Society Hill. We still can't believe it.", clientName: "Brian & Megan L.", rating: 5, date: "2025-08" },
      { quote: "Shaquonda's staging advice transformed our listing. We got three offers in the first weekend.", clientName: "Carlos V.", rating: 5, date: "2025-05" },
    ],
  },
  {
    id: "3",
    slug: "morris-brown",
    firstName: "Morris",
    lastName: "Brown",
    fullName: "Morris A. Brown",
    title: "Senior Sales Associate",
    email: "morris@exitbenchmark.com",
    phone: "(215) 416-9113",
    photo: "/agents/morris-brown.jpg",
    bio: "Morris Brown is a seasoned sales associate at Exit Benchmark Realty with deep roots in Philadelphia's residential market. With over a decade of experience, Morris excels at matching buyers with the right properties across the city's diverse neighborhoods. His patient, consultative approach has earned him a loyal client base and consistent referral business. Whether it's a starter home in East Falls or a renovation opportunity in Kensington, Morris brings the same dedication to every transaction.",
    shortBio:
      "Seasoned sales associate with deep roots in Philadelphia's residential market and over a decade of experience.",
    specialties: [
      "Residential Sales",
      "Buyer Representation",
      "Renovation Properties",
      "Estate Sales",
      "Relocation",
    ],
    neighborhoods: [
      "East Falls",
      "Kensington",
      "Manayunk",
      "Roxborough",
      "Wynnefield",
    ],
    stats: {
      propertiesSold: 89,
      totalVolume: "$18M+",
      avgDaysOnMarket: 32,
      yearsExperience: 12,
    },
    awards: [
      {
        title: "Top Producer",
        year: 2024,
        issuer: "Exit Benchmark Realty",
      },
      {
        title: "Client Satisfaction Award",
        year: 2023,
        issuer: "Exit Benchmark Realty",
      },
    ],
    videoIntroUrl: null,
    videoIntroId: null,
    activeListingIds: ["6"],
    soldListingIds: ["301", "302", "303", "304"],
    soldListings: [
      { address: "4215 Ridge Ave", price: 340000, soldDate: "2025-11-02", neighborhood: "East Falls" },
      { address: "2830 Kensington Ave", price: 225000, soldDate: "2025-08-20", neighborhood: "Kensington" },
      { address: "1456 N. 52nd St", price: 295000, soldDate: "2025-06-12", neighborhood: "Wynnefield" },
      { address: "3318 Haverford Ave", price: 380000, soldDate: "2025-04-08", neighborhood: "Wynnefield" },
    ],
    social: {
      linkedin: "https://linkedin.com/in/morris-brown-philly",
    },
    languages: ["English"],
    licenseNumber: "RS-445821",
    testimonials: [
      { quote: "Morris is the definition of a luxury agent. He handled every detail of our Rittenhouse Square purchase with precision and class.", clientName: "Dr. Patricia W.", rating: 5, date: "2025-10" },
      { quote: "We relocated from New York and Morris made the transition seamless. His knowledge of Philadelphia's luxury market is outstanding.", clientName: "Jonathan & Sarah K.", rating: 5, date: "2025-06" },
      { quote: "Sold our Fairmount property for $50K over asking. Morris's marketing strategy was brilliant — professional photos, drone video, the works.", clientName: "Amanda C.", rating: 5, date: "2025-03" },
      { quote: "Morris goes above and beyond. He connected us with contractors, movers, and even a great interior designer. True concierge service.", clientName: "Robert H.", rating: 4, date: "2025-01" },
    ],
  },
  {
    id: "4",
    slug: "stephen-stevens",
    firstName: "Stephen",
    lastName: "Stevens",
    fullName: "Stephen Stevens",
    title: "Licensed Realtor",
    email: "stephen@exitbenchmark.com",
    phone: "(215) 427-2870",
    photo: "/agents/stephen-stevens.jpg",
    bio: "Stephen Stevens brings a fresh, tech-forward perspective to the Exit Benchmark Realty team. Specializing in rental properties and investor acquisitions across Frankford, Mayfair, and Northeast Philadelphia, Stephen leverages data-driven market analysis to help clients maximize returns. His background in property management gives him a unique edge in identifying value-add opportunities that other agents overlook.",
    shortBio:
      "Tech-forward Realtor specializing in rental properties and investor acquisitions across Northeast Philadelphia.",
    specialties: [
      "Rental Properties",
      "Investment Analysis",
      "Property Management",
      "Multi-Family",
      "Northeast Philadelphia",
    ],
    neighborhoods: [
      "Frankford",
      "Mayfair",
      "Torresdale",
      "Holmesburg",
      "Tacony",
    ],
    stats: {
      propertiesSold: 52,
      totalVolume: "$10M+",
      avgDaysOnMarket: 28,
      yearsExperience: 5,
    },
    awards: [
      {
        title: "Rookie of the Year",
        year: 2022,
        issuer: "Exit Benchmark Realty",
      },
    ],
    videoIntroUrl: null,
    videoIntroId: null,
    activeListingIds: [],
    soldListingIds: ["401", "402", "403"],
    soldListings: [
      { address: "4712 Frankford Ave", price: 215000, soldDate: "2025-10-05", neighborhood: "Frankford" },
      { address: "3105 Cottman Ave", price: 285000, soldDate: "2025-07-22", neighborhood: "Mayfair" },
      { address: "7234 Torresdale Ave", price: 195000, soldDate: "2025-05-30", neighborhood: "Torresdale" },
    ],
    social: {
      linkedin: "https://linkedin.com/in/stephen-stevens-realty",
    },
    languages: ["English", "Spanish"],
    licenseNumber: "RS-678432",
    testimonials: [
      { quote: "Stephen helped us find a beautiful townhouse in Northern Liberties. His bilingual skills were a huge plus for my parents who primarily speak Spanish.", clientName: "Maria & Jorge F.", rating: 5, date: "2025-12" },
      { quote: "Patient, knowledgeable, and always available. Stephen showed us at least 20 properties before we found the one. Never once rushed us.", clientName: "Tyler B.", rating: 5, date: "2025-09" },
      { quote: "Stephen's tech-forward approach was refreshing. Virtual tours, digital contracts, instant market reports — everything was smooth and modern.", clientName: "Lindsay P.", rating: 5, date: "2025-06" },
    ],
  },
  {
    id: "5",
    slug: "chris-lane",
    firstName: "Chris",
    lastName: "Lane",
    fullName: "Chris Lane",
    title: "Licensed Realtor",
    email: "chris@exitbenchmark.com",
    phone: "(215) 427-2870",
    photo: "/agents/chris-lane.jpg",
    bio: "Chris Lane is a versatile Realtor at Exit Benchmark Realty, known for his ability to connect with clients from all walks of life. From waterfront condos along Delaware Avenue to row homes in South Philadelphia, Chris covers a wide range of the city's real estate landscape. His easygoing demeanor, market knowledge, and relentless work ethic make him a go-to agent for both buyers and sellers looking for a smooth transaction experience.",
    shortBio:
      "Versatile Realtor covering waterfront condos to South Philly row homes with a client-first approach.",
    specialties: [
      "Waterfront Properties",
      "Row Homes",
      "Condos",
      "First-Time Buyers",
      "South Philadelphia",
    ],
    neighborhoods: [
      "South Philadelphia",
      "Northern Liberties",
      "Fishtown",
      "Old City",
      "Queen Village",
    ],
    stats: {
      propertiesSold: 73,
      totalVolume: "$16M+",
      avgDaysOnMarket: 30,
      yearsExperience: 7,
    },
    awards: [
      {
        title: "Sales Achievement Award",
        year: 2024,
        issuer: "EXIT Realty International",
      },
    ],
    videoIntroUrl: null,
    videoIntroId: null,
    activeListingIds: ["7", "9"],
    soldListingIds: ["501", "502", "503", "504"],
    soldListings: [
      { address: "1155 S. Delaware Ave", price: 475000, soldDate: "2025-10-18", neighborhood: "South Philadelphia" },
      { address: "1823 S. 8th St", price: 310000, soldDate: "2025-08-02", neighborhood: "South Philadelphia" },
      { address: "2456 E. Dauphin St", price: 245000, soldDate: "2025-06-25", neighborhood: "Fishtown" },
      { address: "712 Catharine St", price: 520000, soldDate: "2025-04-11", neighborhood: "Queen Village" },
    ],
    social: {
      linkedin: "https://linkedin.com/in/chris-lane-philly-re",
    },
    languages: ["English"],
    licenseNumber: "RS-521976",
    testimonials: [
      { quote: "Chris is the condo expert in Center City. He knew the HOA fees, building history, and upcoming assessments for every building we visited.", clientName: "Jennifer A.", rating: 5, date: "2025-11" },
      { quote: "Bought and sold with Chris within the same month. His coordination between both transactions was flawless.", clientName: "Mike & Dana S.", rating: 5, date: "2025-08" },
      { quote: "Chris turned what could have been a stressful short sale into a smooth process. His experience with complex transactions really showed.", clientName: "Terrence W.", rating: 4, date: "2025-05" },
    ],
  },
];

export function getAgentBySlug(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}

export function getAgentById(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}
