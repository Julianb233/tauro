import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Tour",
  description:
    "Schedule a private property tour with a Tauro agent. Choose your preferred date, time, and property.",
};

export default function BookTourLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
