import { Suspense } from "react";
import { loadProperties } from "@/lib/data";
import PropertiesClient from "./PropertiesClient";
import { PropertiesGridSkeleton } from "@/components/ui/skeleton";

export const revalidate = 3600;

export default async function PropertiesPage() {
  const properties = await loadProperties();

  return (
    <Suspense fallback={<PropertiesGridSkeleton />}>
      <PropertiesClient properties={properties} />
    </Suspense>
  );
}
