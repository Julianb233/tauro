import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Fair Housing Statement",
  description:
    "Tauro Realty is committed to compliance with all federal, state, and local fair housing laws. We are dedicated to providing equal housing opportunity for all.",
};

export default function FairHousingPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Fair Housing", href: "/fair-housing" }]} />
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-foreground pb-16 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Compliance
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Fair Housing Statement
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/80">
            Equal Housing Opportunity
          </p>
        </div>
      </section>

      {/* ── Content ───────────────────────────────────────────── */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-neutral max-w-none">
            {/* EHO Icon */}
            <div className="mb-8 flex items-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="h-16 w-16 shrink-0"
                aria-label="Equal Housing Opportunity"
                role="img"
              >
                <rect width="48" height="48" rx="4" fill="#1a1a1a" />
                <path
                  d="M24 8L8 20h4v16h24V20h4L24 8z"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1.5"
                />
                <rect x="16" y="24" width="16" height="2" fill="#fff" />
                <rect x="16" y="28" width="16" height="2" fill="#fff" />
                <rect x="16" y="32" width="16" height="2" fill="#fff" />
                <text
                  x="24"
                  y="22"
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="5"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  EQUAL
                </text>
              </svg>
              <div>
                <h2 className="!mt-0 font-heading text-2xl font-bold">
                  Equal Housing Opportunity
                </h2>
                <p className="!mb-0 text-muted-foreground">
                  We are pledged to the letter and spirit of U.S. policy for the
                  achievement of equal housing opportunity.
                </p>
              </div>
            </div>

            <h3 className="font-heading text-xl font-bold">
              Our Commitment
            </h3>
            <p className="text-muted-foreground">
              Tauro Realty is committed to compliance with all federal, state, and
              local fair housing laws. We are dedicated to upholding the spirit
              and the letter of these laws. We encourage and support affirmative
              advertising and marketing programs in which there are no barriers
              to obtaining housing because of race, color, religion, sex,
              handicap, familial status, national origin, sexual orientation,
              gender identity, or any other protected class.
            </p>

            <h3 className="font-heading text-xl font-bold">
              The Fair Housing Act
            </h3>
            <p className="text-muted-foreground">
              The Fair Housing Act (Title VIII of the Civil Rights Act of 1968,
              as amended) prohibits discrimination in the sale, rental, and
              financing of housing based on:
            </p>
            <ul className="text-muted-foreground">
              <li>Race</li>
              <li>Color</li>
              <li>National Origin</li>
              <li>Religion</li>
              <li>Sex (including gender identity and sexual orientation)</li>
              <li>Familial Status</li>
              <li>Disability</li>
            </ul>

            <h3 className="font-heading text-xl font-bold">
              Pennsylvania Human Relations Act
            </h3>
            <p className="text-muted-foreground">
              In addition to federal protections, the Pennsylvania Human
              Relations Act provides additional protections prohibiting
              discrimination based on:
            </p>
            <ul className="text-muted-foreground">
              <li>Age (40 and over)</li>
              <li>Ancestry</li>
              <li>Use of a guide or support animal due to blindness, deafness, or physical disability</li>
              <li>Handling or training of support or guide animals</li>
            </ul>

            <h3 className="font-heading text-xl font-bold">
              Philadelphia Fair Practices Ordinance
            </h3>
            <p className="text-muted-foreground">
              The City of Philadelphia further extends fair housing protections
              to include:
            </p>
            <ul className="text-muted-foreground">
              <li>Sexual orientation</li>
              <li>Gender identity</li>
              <li>Marital status</li>
              <li>Domestic or sexual violence victim status</li>
              <li>Source of income</li>
            </ul>

            <h3 className="font-heading text-xl font-bold">
              If You Believe Your Rights Have Been Violated
            </h3>
            <p className="text-muted-foreground">
              If you believe you have been discriminated against in housing, you
              may file a complaint with:
            </p>
            <ul className="text-muted-foreground">
              <li>
                <strong>U.S. Department of Housing and Urban Development (HUD)</strong>
                <br />
                Phone: 1-800-669-9777
                <br />
                Website: www.hud.gov/fairhousing
              </li>
              <li>
                <strong>Pennsylvania Human Relations Commission</strong>
                <br />
                Phone: (717) 787-4410
                <br />
                Website: www.phrc.pa.gov
              </li>
              <li>
                <strong>Philadelphia Commission on Human Relations</strong>
                <br />
                Phone: (215) 686-4670
                <br />
                Website: www.phila.gov/humanrelations
              </li>
            </ul>

            <div className="mt-10 rounded-lg border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground">
                Tauro Realty supports the fair housing poster display
                requirements by making it available for viewing on this page. In
                accordance with federal law, Tauro Realty prohibits any
                preference, limitation, or discrimination based on race, color,
                religion, sex, handicap, familial status, national origin, sexual
                orientation, gender identity, or any other protected
                characteristic as outlined by federal, state, or local laws.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
