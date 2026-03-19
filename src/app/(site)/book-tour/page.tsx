import type { Metadata } from "next";
import { Suspense } from "react";
import { loadProperties, loadAgents } from "@/lib/data";
import BookTourClient from "./BookTourClient";

export const metadata: Metadata = {
  title: "Book a Property Tour",
  description:
    "Schedule a private showing of any Philadelphia property with a Tauro Realty agent. Tour luxury homes in Rittenhouse, Center City, Fishtown, and all Philadelphia neighborhoods.",
};

export const revalidate = 3600;

export default async function BookTourPage() {
  const [properties, agents] = await Promise.all([loadProperties(), loadAgents()]);
  return (
    <Suspense fallback={null}>
      <BookTourClient properties={properties} agents={agents} />
    </Suspense>
  );
}
