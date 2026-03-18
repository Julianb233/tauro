import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Tauro Realty",
  description:
    "Answers to common questions about buying, selling, and working with Tauro Realty in Philadelphia. Mortgage, pricing, and process FAQs.",
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
