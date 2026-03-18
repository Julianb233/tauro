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
    email: "julian@tauro.com",
    phone: "(215) 555-0100",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
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
    videoIntroUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
    email: "sofia@tauro.com",
    phone: "(215) 555-0200",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600",
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
    videoIntroUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
    email: "marcus@tauro.com",
    phone: "(215) 555-0300",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600",
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
    email: "ava@tauro.com",
    phone: "(215) 555-0400",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600",
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
];

export function getAgentBySlug(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}

export function getAgentById(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}
