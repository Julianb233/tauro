import { blogPosts, type BlogPost } from "./blog-posts";

export interface BlogAuthor {
  slug: string;
  name: string;
  photo: string;
  title: string;
  bio: string;
  shortBio: string;
  specialties: string[];
}

export const blogAuthors: BlogAuthor[] = [
  {
    slug: "julian-bradley",
    name: "Julian Bradley",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
    title: "Founder & Market Analyst",
    bio: "Julian Bradley founded Tauro Realty with a vision to bring data-driven insight and white-glove service to Philadelphia's real estate market. With over 12 years of experience, Julian specializes in market analysis and investment strategy, helping clients make informed decisions backed by deep local knowledge. His quarterly market reports have become essential reading for buyers, sellers, and investors navigating the Philadelphia housing landscape.",
    shortBio:
      "Founder of Tauro Realty with 12+ years of Philadelphia market expertise.",
    specialties: ["Market Analysis", "Investment Strategy", "Luxury Properties"],
  },
  {
    slug: "sofia-martinez",
    name: "Sofia Martinez",
    photo:
      "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=400&q=80",
    title: "Neighborhood Specialist",
    bio: "Sofia Martinez brings a neighborhood-first approach to real estate, combining deep local knowledge with a passion for helping first-time buyers find their perfect community. Her guides to Philadelphia's diverse neighborhoods have helped hundreds of buyers discover areas they never knew existed. Sofia's expertise spans from the trendy streets of Fishtown to the hidden gems of South Philadelphia.",
    shortBio:
      "Neighborhood expert helping first-time buyers find their perfect Philly community.",
    specialties: [
      "First-Time Buyers",
      "Neighborhood Guides",
      "Buyer Representation",
    ],
  },
  {
    slug: "damon-reeves",
    name: "Damon Reeves",
    photo:
      "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?w=400&q=80",
    title: "Listing Strategy Director",
    bio: "Damon Reeves is Tauro Realty's listing strategy expert, bringing a meticulous, data-informed approach to helping sellers maximize their home's value. From pricing strategy to staging guidance and negotiation, Damon's comprehensive methodology has consistently delivered above-market results for Philadelphia homeowners. His seller guides break down the complex process into clear, actionable steps.",
    shortBio:
      "Listing strategy expert helping Philadelphia sellers maximize value.",
    specialties: [
      "Seller Representation",
      "Pricing Strategy",
      "Home Staging",
    ],
  },
];

export function getBlogAuthorBySlug(slug: string): BlogAuthor | undefined {
  return blogAuthors.find((a) => a.slug === slug);
}

export function getBlogAuthorByName(name: string): BlogAuthor | undefined {
  return blogAuthors.find((a) => a.name === name);
}

export function getPostsByAuthor(authorName: string): BlogPost[] {
  return blogPosts
    .filter((p) => p.author === authorName)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}
