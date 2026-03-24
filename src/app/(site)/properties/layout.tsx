import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Properties for Sale",
  description:
    "Browse luxury homes and properties for sale in Philadelphia. Filter by price, bedrooms, neighborhood, and more.",
};

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
