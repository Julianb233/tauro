import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Tour",
  description:
    "Schedule a private tour of any Philadelphia property with a Tauro Real Estate agent. Pick your property, choose a date and time, and we'll handle the rest.",
};

export default function BookTourLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
