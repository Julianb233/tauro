import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Home Valuation | Tauro Realty",
  description:
    "Find out what your Philadelphia home is worth. Get a free, no-obligation market analysis from a Tauro agent within 24 hours.",
};

export default function HomeValueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
