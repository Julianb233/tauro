import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proposal | Tauro x LYL Realty Group",
  description:
    "Your custom website and CRM build proposal from AI Acrobatics for Tauro / LYL Realty Group.",
  robots: { index: false, follow: false },
};

export default function ProposalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
