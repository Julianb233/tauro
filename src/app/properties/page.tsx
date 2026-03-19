import type { Metadata } from "next";
import { Suspense } from "react";
import { loadProperties } from "@/lib/data";
import PropertiesClient from "./PropertiesClient";
import { PropertiesGridSkeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Properties for Sale in Philadelphia",
  description:
    "Browse luxury homes and properties for sale in Philadelphia. Filter by neighborhood, price, and features. Tauro Realty listings across Center City, Rittenhouse, and more.",
};

export const revalidate = 3600;

export default async function PropertiesPage() {
  const properties = await loadProperties();

  return (
    <Suspense fallback={<PropertiesGridSkeleton />}>
      <PropertiesClient properties={properties} />
    </Suspense>
  );
}
