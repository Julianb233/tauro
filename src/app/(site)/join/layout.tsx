import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Our Team | Tauro Realty Careers",
  description:
    "Join Philadelphia's most elite real estate team. Competitive splits, premium brand, cutting-edge tech, and ongoing training. Apply now.",
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
