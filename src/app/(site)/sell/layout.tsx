import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sell Your Home",
  description:
    "List your home with Tauro Real Estate. Get a free market analysis, expert pricing strategy, and premium marketing for your Philadelphia property.",
};

export default function SellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
