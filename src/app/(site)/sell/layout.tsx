import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sell Your Home",
  description:
    "List your Philadelphia home with Tauro Realty. Get a free market analysis, expert pricing strategy, and premium marketing.",
};

export default function SellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
