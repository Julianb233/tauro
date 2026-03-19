import { loadFaqs } from "@/lib/data";
import FaqClient from "./FaqClient";

export const revalidate = 86400;

export default async function FaqPage() {
  const [buyerFaqs, sellerFaqs, generalFaqs] = await Promise.all([
    loadFaqs("buyer"),
    loadFaqs("seller"),
    loadFaqs("general"),
  ]);

  const allFaqs = [...buyerFaqs, ...sellerFaqs, ...generalFaqs];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqClient
        buyerFaqs={buyerFaqs}
        sellerFaqs={sellerFaqs}
        generalFaqs={generalFaqs}
      />
    </>
  );
}
