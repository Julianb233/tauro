import { Suspense } from "react";
import { loadProperties, loadAgents } from "@/lib/data";
import BookTourClient from "./BookTourClient";

export const revalidate = 3600;

export default async function BookTourPage() {
  const [properties, agents] = await Promise.all([loadProperties(), loadAgents()]);
  return (
    <Suspense fallback={null}>
      <BookTourClient properties={properties} agents={agents} />
    </Suspense>
  );
}
