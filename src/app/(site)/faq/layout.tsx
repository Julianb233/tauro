import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about buying and selling homes in Philadelphia. Learn about financing, inspections, closing timelines, and working with a Tauro Realty agent.",
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
