import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Home Valuation in Philadelphia",
  description:
    "Get a free home valuation from Tauro Realty. Find out what your Philadelphia property is worth in today's market with a no-obligation analysis.",
};

export default function HomeValueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
