import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "What's My Home Worth?",
  description:
    "Get a free home valuation from Tauro Realty. Find out what your Philadelphia property is worth in today's market.",
};

export default function HomeValueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
