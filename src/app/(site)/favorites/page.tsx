import type { Metadata } from "next";
import FavoritesClient from "./FavoritesClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Saved Properties",
  description: "View your saved properties on Tauro Realty.",
};

export default function FavoritesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Favorites", href: "/favorites" }]} />
      <FavoritesClient />
    </>
  );
}
