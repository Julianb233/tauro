import type { Metadata } from "next";
import NeighborhoodCompareClient from "./NeighborhoodCompareClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Compare Neighborhoods | TAURO Realty",
  description:
    "Compare up to 3 Philadelphia neighborhoods side by side — median price, walk score, schools, vibe, and more.",
};

export default function NeighborhoodComparePage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Neighborhoods", href: "/neighborhoods" },
          { label: "Compare", href: "/neighborhoods/compare" },
        ]}
      />
      <NeighborhoodCompareClient />
    </>
  );
}
