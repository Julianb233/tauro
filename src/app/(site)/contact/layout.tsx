import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Tauro Realty",
  description:
    "Get in touch with Tauro Realty. Whether you're buying, selling, or exploring Philadelphia real estate, our agents are ready to help.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
