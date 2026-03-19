import { Metadata } from "next";
import { LogoConcept1 } from "@/components/logos/logo-concept-1";
import { LogoConcept2 } from "@/components/logos/logo-concept-2";
import { LogoConcept3 } from "@/components/logos/logo-concept-3";
import { LogoConcept4 } from "@/components/logos/logo-concept-4";

export const metadata: Metadata = {
  title: "Brand — Logo Concepts | Tauro",
  robots: { index: false, follow: false },
};

const concepts = [
  {
    label: "Concept 1: Abstract Bull Crest",
    description:
      "A refined, abstract bull silhouette integrated into a shield/crest shape. The bull is suggested through negative space and clever geometry. Luxury automotive meets real estate.",
    Component: LogoConcept1,
  },
  {
    label: "Concept 2: Monogram Crown",
    description:
      'A sophisticated "T" monogram with subtle bull horn elements forming a crown above it. Ultra-clean, ultra-high-end. Ritz-Carlton meets real estate.',
    Component: LogoConcept2,
  },
  {
    label: "Concept 3: Golden Bull Profile",
    description:
      "An elegant side-profile bull head in minimalist line-art style with a single continuous stroke feel. Paired with a refined serif wordmark. Luxury fashion brand aesthetic.",
    Component: LogoConcept3,
  },
  {
    label: "Concept 4: Architectural Bull",
    description:
      "Bull horns abstracted into an architectural arch/doorway shape, symbolizing both the bull and real estate. Clean, geometric, sophisticated.",
    Component: LogoConcept4,
  },
] as const;

export default function BrandPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-16 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-[#1A1A2E] sm:text-4xl">
          Logo Concepts
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[#1A1A2E]/60">
          Four premium logo directions for Tauro. Each concept is shown at
          three sizes (sm, md, lg) on both light and dark backgrounds.
        </p>
      </header>

      <div className="space-y-24">
        {concepts.map(({ label, description, Component }, i) => (
          <section key={i} className="space-y-8">
            {/* Concept header */}
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-[#1A1A2E]">
                {label}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-[#1A1A2E]/60">
                {description}
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Light background */}
              <div className="rounded-2xl border border-[#1A1A2E]/10 bg-[#F8F6F1] p-8">
                <p className="mb-6 text-xs font-medium uppercase tracking-widest text-[#1A1A2E]/40">
                  Light variant — on cream
                </p>
                <div className="flex flex-col items-start gap-6">
                  <Component size="lg" variant="dark" />
                  <Component size="md" variant="dark" />
                  <Component size="sm" variant="dark" />
                </div>
              </div>

              {/* Dark background */}
              <div className="rounded-2xl bg-[#1A1A2E] p-8">
                <p className="mb-6 text-xs font-medium uppercase tracking-widest text-[#C9A96E]/40">
                  Gold variant — on midnight
                </p>
                <div className="flex flex-col items-start gap-6">
                  <Component size="lg" variant="light" />
                  <Component size="md" variant="light" />
                  <Component size="sm" variant="light" />
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Comparison strip */}
      <section className="mt-24 space-y-8">
        <h2 className="text-xl font-semibold tracking-tight text-[#1A1A2E]">
          Side-by-Side Comparison
        </h2>

        <div className="rounded-2xl bg-[#1A1A2E] p-8">
          <p className="mb-8 text-xs font-medium uppercase tracking-widest text-[#C9A96E]/40">
            All concepts at medium size — gold on midnight
          </p>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {concepts.map(({ label, Component }, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <Component size="md" variant="light" />
                <span className="text-center text-xs text-[#C9A96E]/60">
                  {label.replace("Concept ", "#")}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#1A1A2E]/10 bg-[#F8F6F1] p-8">
          <p className="mb-8 text-xs font-medium uppercase tracking-widest text-[#1A1A2E]/40">
            All concepts at medium size — midnight on cream
          </p>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {concepts.map(({ label, Component }, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <Component size="md" variant="dark" />
                <span className="text-center text-xs text-[#1A1A2E]/60">
                  {label.replace("Concept ", "#")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
