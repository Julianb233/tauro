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
  social: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
  };
  languages: string[];
  licenseNumber: string;
}

export const agents: Agent[] = [
  {
    id: "1",
    slug: "julian-bradley",
    firstName: "Julian",
    lastName: "Bradley",
    fullName: "Julian Bradley",
    title: "Founding Partner & Lead Agent",
    email: "julian@taurorealty.com",
    phone: "(215) 839-4172",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80",
    bio: "Julian Bradley founded Tauro Real Estate with a singular vision: to bring a white-glove, client-first approach to Philadelphia's luxury market. With over 15 years of experience navigating Rittenhouse Square, Society Hill, and the Main Line's most prestigious addresses, Julian has built a reputation for discretion, market expertise, and results that speak for themselves. His deep roots in the Philadelphia community and relentless dedication to his clients have made him one of the region's most trusted advisors for high-net-worth buyers and sellers.",
    shortBio:
      "Founding partner specializing in luxury homes and historic properties across Philadelphia's most coveted neighborhoods.",
    specialties: [
      "Luxury Homes",
      "Historic Properties",
      "Waterfront Estates",
      "Investment Properties",
      "New Construction",
    ],
    neighborhoods: [
      "Rittenhouse Square",
      "Society Hill",
      "Main Line",
      "Chestnut Hill",
      "Old City",
    ],
    stats: {
      propertiesSold: 182,
      totalVolume: "$120M+",
      avgDaysOnMarket: 21,
      yearsExperience: 15,
    },
    awards: [
      {
        title: "Top Producer Award",
        year: 2025,
        issuer: "Philadelphia Association of Realtors",
      },
      {
        title: "Five Star Professional Award",
        year: 2024,
        issuer: "Philadelphia Magazine",
      },
      {
        title: "Luxury Home Marketing Specialist",
        year: 2023,
        issuer: "Institute for Luxury Home Marketing",
      },
    ],
    videoIntroUrl: "https://www.youtube.com/embed/K4TOrB7at0Y",
    videoIntroId: "K4TOrB7at0Y",
    activeListingIds: ["1", "3", "5"],
    soldListingIds: ["101", "102", "103", "104", "105"],
    social: {
      instagram: "https://instagram.com/julianbradley",
      linkedin: "https://linkedin.com/in/julianbradley",
    },
    languages: ["English"],
    licenseNumber: "RS-338721",
  },
  {
    id: "2",
    slug: "sofia-martinez",
    firstName: "Sofia",
    lastName: "Martinez",
    fullName: "Sofia Martinez",
    title: "Senior Agent & Buyer Specialist",
    email: "sofia@taurorealty.com",
    phone: "(215) 647-2938",
    photo: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=600&q=80",
    bio: "Sofia Martinez is known throughout Philadelphia for her unmatched dedication to first-time buyers and savvy investors alike. With 8 years of experience in the city's condo and townhouse market, she has helped nearly 100 families find their perfect home in neighborhoods from Fishtown's vibrant arts scene to Graduate Hospital's tree-lined streets. Bilingual in English and Spanish, Sofia brings a warmth and accessibility to the buying process that her clients consistently rave about.",
    shortBio:
      "Senior buyer specialist helping clients navigate Philadelphia's condo and investment property market with 8 years of expertise.",
    specialties: [
      "Condos & Lofts",
      "First-Time Buyers",
      "Investment Properties",
      "Townhouses",
      "Relocation Services",
    ],
    neighborhoods: [
      "Fishtown",
      "Graduate Hospital",
      "Center City",
      "Northern Liberties",
      "Fairmount",
    ],
    stats: {
      propertiesSold: 97,
      totalVolume: "$65M+",
      avgDaysOnMarket: 18,
      yearsExperience: 8,
    },
    awards: [
      {
        title: "Rising Star Award",
        year: 2024,
        issuer: "Philadelphia Association of Realtors",
      },
      {
        title: "Five Star Professional Award",
        year: 2023,
        issuer: "Philadelphia Magazine",
      },
    ],
    videoIntroUrl: "https://www.youtube.com/embed/Tt_tKhBEWsE",
    videoIntroId: "Tt_tKhBEWsE",
    activeListingIds: ["2", "4", "6"],
    soldListingIds: ["201", "202", "203"],
    social: {
      instagram: "https://instagram.com/sofiamartinez",
      linkedin: "https://linkedin.com/in/sofiamartinez",
    },
    languages: ["English", "Spanish"],
    licenseNumber: "RS-412856",
  },
  {
    id: "3",
    slug: "marcus-thompson",
    firstName: "Marcus",
    lastName: "Thompson",
    fullName: "Marcus Thompson",
    title: "Agent & New Development Specialist",
    email: "marcus@taurorealty.com",
    phone: "(215) 473-8156",
    photo: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=600&q=80",
    bio: "Marcus Thompson brings a sharp eye for emerging opportunities to the Tauro team, specializing in new construction and townhouse developments across Philadelphia's fastest-growing corridors. With 5 years of experience and deep relationships with the city's top developers, Marcus guides his clients through the unique process of purchasing pre-construction and newly built homes in neighborhoods like Brewerytown, Point Breeze, and East Passyunk. His background in architecture gives him an edge in evaluating build quality and design potential.",
    shortBio:
      "New development specialist with an architecture background, focused on Philadelphia's emerging neighborhoods and new construction.",
    specialties: [
      "New Construction",
      "Townhouses",
      "Pre-Construction Sales",
      "Urban Development",
    ],
    neighborhoods: [
      "Brewerytown",
      "Point Breeze",
      "East Passyunk",
      "Kensington",
      "South Philadelphia",
    ],
    stats: {
      propertiesSold: 53,
      totalVolume: "$35M+",
      avgDaysOnMarket: 24,
      yearsExperience: 5,
    },
    awards: [
      {
        title: "Rookie of the Year",
        year: 2022,
        issuer: "Greater Philadelphia Board of Realtors",
      },
    ],
    videoIntroUrl: null,
    videoIntroId: null,
    activeListingIds: [],
    soldListingIds: ["301", "302"],
    social: {
      instagram: "https://instagram.com/marcusthompson",
      linkedin: "https://linkedin.com/in/marcusthompson",
    },
    languages: ["English"],
    licenseNumber: "RS-527193",
  },
  {
    id: "4",
    slug: "ava-chen",
    firstName: "Ava",
    lastName: "Chen",
    fullName: "Ava Chen",
    title: "Agent & Relocation Specialist",
    email: "ava@taurorealty.com",
    phone: "(215) 312-7645",
    photo: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80",
    bio: "Ava Chen understands the challenges of relocating to a new city because she has guided over 60 families through the process. Specializing in corporate relocations and suburban estates, Ava helps clients transition seamlessly into Philadelphia's most desirable communities, from the stately homes of Chestnut Hill to the sprawling estates along the Main Line. Fluent in Mandarin and English, she serves a diverse clientele and is known for her patience, attention to detail, and encyclopedic knowledge of Philadelphia's school districts and neighborhoods.",
    shortBio:
      "Relocation specialist helping families transition to Philadelphia with expertise in suburban estates and school districts.",
    specialties: [
      "Corporate Relocations",
      "Suburban Estates",
      "School District Expertise",
      "Luxury Rentals",
      "International Buyers",
    ],
    neighborhoods: [
      "Chestnut Hill",
      "Main Line",
      "Manayunk",
      "Mount Airy",
      "Gladwyne",
    ],
    stats: {
      propertiesSold: 67,
      totalVolume: "$42M+",
      avgDaysOnMarket: 28,
      yearsExperience: 6,
    },
    awards: [
      {
        title: "Relocation Specialist Certification",
        year: 2024,
        issuer: "Worldwide ERC",
      },
      {
        title: "Client Satisfaction Award",
        year: 2023,
        issuer: "Philadelphia Association of Realtors",
      },
    ],
    videoIntroUrl: null,
    activeListingIds: [],
    soldListingIds: ["401", "402", "403"],
    social: {
      instagram: "https://instagram.com/avachen",
      linkedin: "https://linkedin.com/in/avachen",
    },
    languages: ["English", "Mandarin"],
    licenseNumber: "RS-489312",
  },
  {
    id: "5",
    slug: "damon-reeves",
    firstName: "Damon",
    lastName: "Reeves",
    fullName: "Damon Reeves",
    title: "Luxury Listing Specialist",
    email: "damon@taurorealty.com",
    phone: "(215) 586-3291",
    photo: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=600&q=80",
    bio: "Damon Reeves spent a decade in commercial real estate before pivoting to luxury residential sales, bringing a sophisticated marketing approach that consistently achieves record-breaking prices. Known for exceptional staging and targeted digital campaigns, Damon has become the go-to listing agent for sellers across Rittenhouse Square, Washington Square West, and Old City. His deep understanding of buyer psychology and market positioning ensures every property he represents commands top dollar.",
    shortBio:
      "Luxury listing specialist known for record-breaking sales prices and exceptional property marketing across Center City.",
    specialties: [
      "Luxury Listings",
      "Property Marketing",
      "Staging Consultation",
      "Historic Brownstones",
      "Penthouse Sales",
    ],
    neighborhoods: [
      "Rittenhouse Square",
      "Washington Square West",
      "Old City",
      "Logan Square",
      "Art Museum District",
    ],
    stats: {
      propertiesSold: 124,
      totalVolume: "$89M+",
      avgDaysOnMarket: 16,
      yearsExperience: 10,
    },
    awards: [
      {
        title: "Diamond Circle Award",
        year: 2025,
        issuer: "Philadelphia Association of Realtors",
      },
      {
        title: "Best Luxury Marketing",
        year: 2024,
        issuer: "Inman Connect",
      },
    ],
    videoIntroUrl: "https://www.youtube.com/embed/oqNM_Lviurk",
    activeListingIds: [],
    soldListingIds: ["501", "502", "503", "504"],
    social: {
      instagram: "https://instagram.com/damonreeves",
      linkedin: "https://linkedin.com/in/damonreeves",
    },
    languages: ["English", "French"],
    licenseNumber: "RS-601847",
  },
  {
    id: "6",
    slug: "priya-kapoor",
    firstName: "Priya",
    lastName: "Kapoor",
    fullName: "Priya Kapoor",
    title: "Investment & Multi-Family Specialist",
    email: "priya@taurorealty.com",
    phone: "(215) 924-6083",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80",
    bio: "A former financial analyst with a keen eye for value, Priya Kapoor helps investors build and optimize real estate portfolios across Philadelphia's most promising emerging neighborhoods. Specializing in multi-family properties and 1031 exchanges, Priya combines rigorous financial analysis with deep neighborhood knowledge to identify opportunities others miss. Her clients trust her data-driven approach and her ability to turn undervalued properties into high-performing assets.",
    shortBio:
      "Investment property specialist helping clients build wealth through strategic Philadelphia real estate acquisitions.",
    specialties: [
      "Investment Properties",
      "Multi-Family Homes",
      "1031 Exchanges",
      "Portfolio Strategy",
      "Emerging Markets",
    ],
    neighborhoods: [
      "Brewerytown",
      "Francisville",
      "Strawberry Mansion",
      "Point Breeze",
      "Grays Ferry",
    ],
    stats: {
      propertiesSold: 86,
      totalVolume: "$52M+",
      avgDaysOnMarket: 22,
      yearsExperience: 7,
    },
    awards: [
      {
        title: "Investment Specialist Certification",
        year: 2024,
        issuer: "CCIM Institute",
      },
      {
        title: "Top Investment Sales",
        year: 2023,
        issuer: "Greater Philadelphia Board of Realtors",
      },
    ],
    videoIntroUrl: null,
    activeListingIds: [],
    soldListingIds: ["601", "602", "603"],
    social: {
      instagram: "https://instagram.com/priyakapoor",
      linkedin: "https://linkedin.com/in/priyakapoor",
    },
    languages: ["English", "Hindi", "Punjabi"],
    licenseNumber: "RS-558294",
  },
];

export function getAgentBySlug(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}

export function getAgentById(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}
