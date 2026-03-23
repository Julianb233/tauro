import type { Metadata } from "next";
import CompareClient from "./CompareClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Compare Properties | TAURO Realty",
  description: "Compare up to 3 properties side by side.",
};

export default function ComparePage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Compare Properties", href: "/compare" }]} />
      <CompareClient />
    </>
  );
}
