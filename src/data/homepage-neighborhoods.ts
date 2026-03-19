export interface HomepageNeighborhood {
  name: string;
  slug: string;
  description: string;
  image: string;
  listings: number;
}

export const homepageNeighborhoods: HomepageNeighborhood[] = [
  {
    name: "Center City",
    slug: "center-city",
    description: "The beating heart of Philadelphia \u2014 walkable, vibrant, and full of culture.",
    image: "https://images.unsplash.com/photo-1569761316261-9a8696fa2ca3?w=800&q=80",
    listings: 42,
  },
  {
    name: "Rittenhouse",
    slug: "rittenhouse",
    description: "Philadelphia\u2019s most prestigious address with tree-lined streets and luxury living.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    listings: 28,
  },
  {
    name: "Fishtown",
    slug: "fishtown",
    description: "Creative energy meets industrial charm in Philly\u2019s hottest neighborhood.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    listings: 35,
  },
  {
    name: "Northern Liberties",
    slug: "northern-liberties",
    description: "Urban sophistication with boutique restaurants and converted lofts.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    listings: 19,
  },
  {
    name: "Old City",
    slug: "old-city",
    description: "Where history meets modern living \u2014 cobblestone streets and gallery nights.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    listings: 15,
  },
  {
    name: "Chestnut Hill",
    slug: "chestnut-hill",
    description: "Suburban charm within city limits \u2014 gardens, boutiques, and top schools.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    listings: 22,
  },
];
