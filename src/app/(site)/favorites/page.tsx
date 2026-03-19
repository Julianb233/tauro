import type { Metadata } from "next";
import FavoritesClient from "./FavoritesClient";

export const metadata: Metadata = {
  title: "Saved Properties",
  description: "View your saved properties on Tauro Realty.",
};

export default function FavoritesPage() {
  return <FavoritesClient />;
}
