import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Join Our Team",
  description:
    "Apply to join Tauro Realty. We're looking for licensed Philadelphia real estate agents ready to grow their career.",
};

export default function JoinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
