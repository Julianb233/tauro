import { Suspense } from "react";
import { loadProperties } from "@/lib/data";
import PropertiesClient from "./PropertiesClient";

export const revalidate = 3600;

export default async function PropertiesPage() {
  const properties = await loadProperties();

  return (
    <Suspense fallback={<div className="min-h-screen pt-16" />}>
      <PropertiesClient properties={properties} />
    </Suspense>
  );
}
