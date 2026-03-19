import type { Metadata } from "next";
import CompareClient from "./CompareClient";

export const metadata: Metadata = {
  title: "Compare Properties | TAURO Realty",
  description: "Compare up to 3 properties side by side.",
};

export default function ComparePage() {
  return <CompareClient />;
}
