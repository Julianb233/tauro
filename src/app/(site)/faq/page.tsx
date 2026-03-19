import { loadFaqs } from "@/lib/data";
import FaqClient from "./FaqClient";

export const revalidate = 86400;

export default async function FaqPage() {
  const [buyerFaqs, sellerFaqs, generalFaqs] = await Promise.all([
    loadFaqs("buyer"),
    loadFaqs("seller"),
    loadFaqs("general"),
  ]);
  return <FaqClient buyerFaqs={buyerFaqs} sellerFaqs={sellerFaqs} generalFaqs={generalFaqs} />;
}
