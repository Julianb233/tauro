import type { Metadata } from "next";
import { Suspense } from "react";
import { loadProperties, loadNeighborhoods } from "@/lib/data";
import PropertiesClient from "./PropertiesClient";
import { PropertiesGridSkeleton } from "@/components/ui/skeleton";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Properties for Sale in Philadelphia",
  description:
    "Browse luxury homes and properties for sale in Philadelphia. Filter by neighborhood, price, and features. Tauro Realty listings across Center City, Rittenhouse, and more.",
};

export const revalidate = 3600;

export default async function PropertiesPage() {
  const [properties, neighborhoods] = await Promise.all([
    loadProperties(),
    loadNeighborhoods(),
  ]);

  const neighborhoodOptions = neighborhoods.map((n) => ({
    id: n.id,
    name: n.name,
    propertyFilter: n.propertyFilter,
  }));

  return (
    <>
      <Breadcrumbs items={[{ label: "Properties", href: "/properties" }]} />
      <Suspense fallback={<PropertiesGridSkeleton />}>
        <PropertiesClient properties={properties} neighborhoods={neighborhoodOptions} />
      </Suspense>
    </>
  );
}
