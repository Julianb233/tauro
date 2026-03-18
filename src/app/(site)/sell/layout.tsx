import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sell Your Home | Tauro Realty",
  description:
    "List your Philadelphia home with Tauro Realty. Get a free home valuation, premium marketing, and expert negotiation to sell for top dollar.",
};

export default function SellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
