import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Proposal | Tauro",
  description:
    "Build proposal for LYL Realty Group — scope, deliverables, timeline, pricing, and onboarding.",
  robots: { index: false, follow: false },
};

export default function ProposalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
