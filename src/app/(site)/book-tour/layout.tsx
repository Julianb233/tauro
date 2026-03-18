import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Tour | Tauro Realty",
  description:
    "Schedule a private showing of any Philadelphia property. Choose your preferred date and time, and a Tauro agent will confirm within 24 hours.",
};

export default function BookTourLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
