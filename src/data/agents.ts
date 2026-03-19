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
  },
  {
    id: "7",
    slug: "tony-goodman",
    firstName: "Tony",
    lastName: "Goodman",
    fullName: "Tony Goodman",
    title: "Broker & Owner",
    email: "tcupone@aol.com",
    phone: "(215) 427-2870",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    bio: "Tony Goodman brings over two decades of real estate expertise to the Philadelphia market as the Broker and Owner of Exit Benchmark Realty. A Hampton University graduate with a degree in Finance, Tony combines sharp financial acumen with deep knowledge of Philadelphia's diverse neighborhoods. From first-time buyers in Cheltenham to seasoned investors eyeing multi-unit properties in North Philadelphia, Tony's hands-on approach and genuine care for his clients have earned him a loyal following. He believes every client deserves the same level of attention and professionalism, regardless of price point.",
    shortBio:
      "Broker/Owner with 20+ years of experience, specializing in residential sales, investment properties, and community development across Philadelphia.",
    specialties: [
      "Residential Sales",
      "Investment Properties",
      "Multi-Family Homes",
      "First-Time Buyers",
      "Property Management",
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
        title: "EXIT Realty Spirit Award",
        year: 2024,
        issuer: "EXIT Realty International",
      },
      {
        title: "Community Builder Award",
        year: 2023,
        issuer: "Philadelphia Association of Realtors",
      },
    ],
    videoIntroUrl: null,
    videoIntroId: null,
    activeListingIds: [],
    soldListingIds: ["701", "702", "703"],
    soldListings: [
      { address: "3222 W. Cheltenham Ave", price: 385000, soldDate: "2025-10-12", neighborhood: "Cheltenham" },
      { address: "5847 N. 12th Street", price: 275000, soldDate: "2025-08-05", neighborhood: "Logan" },
      { address: "441 E. Girard Ave", price: 520000, soldDate: "2025-06-18", neighborhood: "Fishtown" },
      { address: "1934 W. Ontario Street", price: 195000, soldDate: "2025-04-02", neighborhood: "North Philadelphia" },
    ],
    social: {
      instagram: "https://instagram.com/tcupone",
      linkedin: "https://linkedin.com/in/tony-goodman-625682b",
      twitter: "https://facebook.com/tony.goodman1",
    },
    languages: ["English"],
    licenseNumber: "RM420582",
  },
  {
    id: "8",
    slug: "shaquonda-garrett",
    firstName: "Shaquonda",
    lastName: "Garrett",
    fullName: "Shaquonda Garrett",
    title: "Licensed Realtor",
    email: "shaquonda@exitbenchmark.com",
    phone: "(215) 817-5777",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
    bio: "Shaquonda Garrett is a driven and detail-oriented Realtor at Exit Benchmark Realty, where she partners with Broker Tony Goodman to deliver exceptional service across Philadelphia's residential market. Known for her warmth, responsiveness, and fierce negotiating skills, Shaquonda specializes in helping families find their forever homes in Philadelphia's up-and-coming neighborhoods. Her background in community advocacy and her deep ties to the city make her a trusted guide for buyers and sellers navigating one of the most dynamic markets on the East Coast.",
    shortBio:
      "Licensed Realtor specializing in residential sales and community-focused real estate across Philadelphia's emerging neighborhoods.",
    specialties: [
      "Residential Sales",
      "Buyer Representation",
      "Community Development",
      "Relocation Services",
      "New Construction",
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
        title: "Rising Star Award",
        year: 2024,
        issuer: "EXIT Realty International",
      },
    ],
    videoIntroUrl: null,
    videoIntroId: null,
    activeListingIds: [],
    soldListingIds: ["801", "802", "803"],
    soldListings: [
      { address: "2912 W. Girard Ave", price: 310000, soldDate: "2025-09-28", neighborhood: "Brewerytown" },
      { address: "1245 N. 28th Street", price: 265000, soldDate: "2025-07-14", neighborhood: "Brewerytown" },
      { address: "4520 Spruce Street", price: 425000, soldDate: "2025-05-22", neighborhood: "West Philadelphia" },
    ],
    social: {
      instagram: "https://instagram.com/shaquondagarrett",
      linkedin: "https://linkedin.com/in/shaquonda-garrett",
    },
    languages: ["English"],
    licenseNumber: "RS-612847",
  },
];

export function getAgentBySlug(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}

export function getAgentById(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}
