import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Tauro",
  description:
    "Review the terms and conditions governing your use of the Tauro real estate website and services.",
};

export default function TermsPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-near-black pb-16 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 to-near-black" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Legal
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Terms of Service
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/60">
            Last updated: March 18, 2026
          </p>
        </div>
      </section>

      {/* ── Content ───────────────────────────────────────────── */}
      <section className="bg-midnight py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 text-white/70">
            {/* Intro */}
            <p className="text-base leading-relaxed">
              Welcome to the Tauro Realty website. By accessing or using this
              website, you agree to be bound by the following Terms of Service.
              If you do not agree with any part of these terms, please do not
              use our website or services.
            </p>

            {/* Use of Website */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Use of Website
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>
                  This website is provided for informational purposes related to
                  real estate services in the Philadelphia metropolitan area. You
                  agree to use this website only for lawful purposes and in a
                  manner that does not infringe upon the rights of others.
                </p>
                <p>You agree not to:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Use the website for any fraudulent or unlawful purpose
                  </li>
                  <li>
                    Attempt to gain unauthorized access to any part of the
                    website or its systems
                  </li>
                  <li>
                    Scrape, harvest, or collect data from the website without
                    written consent
                  </li>
                  <li>
                    Interfere with the proper operation of the website
                  </li>
                  <li>
                    Submit false or misleading information through any forms
                  </li>
                </ul>
              </div>
            </div>

            {/* Property Information Disclaimer */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Property Information Disclaimer
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>
                  Property listings, market data, home valuations, and
                  neighborhood information displayed on this website are provided
                  for general informational purposes only. While we strive for
                  accuracy, Tauro does not guarantee the completeness, accuracy,
                  or timeliness of any property information.
                </p>
                <p>
                  Listing details including price, square footage, room counts,
                  and property features are subject to change without notice and
                  should be independently verified. Automated home valuations are
                  estimates only and should not be relied upon as a formal
                  appraisal. For an accurate assessment, please consult with a
                  licensed Tauro agent or a certified appraiser.
                </p>
              </div>
            </div>

            {/* Lead Generation & Communications */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Lead Generation &amp; Communications
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>
                  By submitting your contact information through any form on this
                  website — including contact forms, showing requests, home
                  valuation requests, or agent inquiry forms — you consent to be
                  contacted by Tauro Realty and its licensed agents via phone,
                  email, or text message regarding your real estate inquiry.
                </p>
                <p>
                  You understand that submitting a form does not create a binding
                  agency relationship. An agency relationship is only established
                  through a signed written agreement with a licensed Tauro agent.
                </p>
                <p>
                  You may opt out of marketing communications at any time by
                  following the unsubscribe instructions in any email or by
                  contacting us directly.
                </p>
              </div>
            </div>

            {/* Intellectual Property */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Intellectual Property
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>
                  All content on this website — including text, graphics, logos,
                  images, photography, design elements, and software — is the
                  property of Tauro Realty or its content providers and is
                  protected by United States copyright and trademark laws.
                </p>
                <p>
                  The Tauro name, logo, and brand marks are trademarks of Tauro
                  Realty. You may not use, reproduce, or distribute any content
                  from this website without prior written permission from Tauro
                  Realty.
                </p>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Limitation of Liability
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>
                  To the fullest extent permitted by applicable law, Tauro
                  Realty and its agents, employees, and affiliates shall not be
                  liable for any indirect, incidental, special, consequential, or
                  punitive damages arising from your use of this website or
                  reliance on any information provided herein.
                </p>
                <p>
                  This website may contain links to third-party websites. Tauro
                  is not responsible for the content, privacy policies, or
                  practices of any linked sites and does not endorse any
                  third-party products or services.
                </p>
              </div>
            </div>

            {/* Governing Law */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Governing Law
              </h2>
              <p className="mt-4 text-sm leading-relaxed">
                These Terms of Service shall be governed by and construed in
                accordance with the laws of the Commonwealth of Pennsylvania,
                without regard to its conflict of law provisions. Any legal
                action or proceeding arising under these terms shall be brought
                exclusively in the state or federal courts located in
                Philadelphia County, Pennsylvania, and you consent to the
                personal jurisdiction of such courts.
              </p>
            </div>

            {/* Changes to Terms */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Changes to These Terms
              </h2>
              <p className="mt-4 text-sm leading-relaxed">
                Tauro reserves the right to update or modify these Terms of
                Service at any time without prior notice. Changes become
                effective immediately upon posting to this website. Your
                continued use of the website after any changes constitutes
                acceptance of the updated terms.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Contact Us
              </h2>
              <div className="mt-4 text-sm leading-relaxed">
                <p>
                  If you have questions about these Terms of Service, please
                  contact us:
                </p>
                <div className="mt-4 space-y-1">
                  <p>
                    <strong className="text-white">Tauro Realty</strong>
                  </p>
                  <p>Philadelphia, PA</p>
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:info@taurorealty.com"
                      className="text-gold hover:underline"
                    >
                      info@taurorealty.com
                    </a>
                  </p>
                  <p>
                    Phone:{" "}
                    <a
                      href="tel:+12155550100"
                      className="text-gold hover:underline"
                    >
                      (215) 555-0100
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
