import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Join TAURO | Careers",
  description:
    "Discover why top Philadelphia real estate agents choose Tauro Realty. Competitive splits, premium branding, cutting-edge tools, and a collaborative culture.",
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
