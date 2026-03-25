import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Tauro Realty collects, uses, and protects your personal information. Our privacy practices for Philadelphia real estate services, property inquiries, and website usage.",
};

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Privacy Policy", href: "/privacy" }]} />
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-foreground pb-16 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Legal
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/90">
            Last updated: March 18, 2026
          </p>
        </div>
      </section>

      {/* ── Content ───────────────────────────────────────────── */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 text-midnight/70">
            {/* Intro */}
            <p className="text-base leading-relaxed">
              Tauro Realty (&quot;Tauro,&quot; &quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;) is committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website, submit
              property inquiries, schedule showings, or otherwise engage with
              our real estate services.
            </p>

            {/* Information We Collect */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-midnight">
                Information We Collect
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>
                  We may collect the following types of information when you
                  interact with our website and services:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong className="text-midnight">Personal Information:</strong>{" "}
                    Name, email address, phone number, and mailing address
                    provided when you submit contact forms, request property
                    showings, or sign up for market updates.
                  </li>
                  <li>
                    <strong className="text-midnight">Property Inquiry Data:</strong>{" "}
                    Details about properties you inquire about, showing requests,
                    home valuation requests, and your buying or selling
                    preferences.
                  </li>
                  <li>
                    <strong className="text-midnight">Financial Information:</strong>{" "}
                    Pre-approval status, budget range, and mortgage preferences
                    shared during the buying or selling process.
                  </li>
                  <li>
                    <strong className="text-midnight">Usage Data:</strong>{" "}
                    Information about how you interact with our website,
                    including pages visited, time spent, browser type, device
                    information, and IP address.
                  </li>
                  <li>
                    <strong className="text-midnight">Cookies &amp; Tracking:</strong>{" "}
                    We use cookies, pixels, and similar technologies to improve
                    your experience and analyze website traffic.
                  </li>
                </ul>
              </div>
            </div>

            {/* How We Use Information */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-midnight">
                How We Use Your Information
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>We use the information we collect to:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Respond to your property inquiries and schedule showings
                  </li>
                  <li>
                    Provide personalized property recommendations based on your
                    preferences
                  </li>
                  <li>
                    Process home valuation requests and deliver market analyses
                  </li>
                  <li>
                    Send market updates, new listings, and real estate insights
                    you&apos;ve opted into
                  </li>
                  <li>
                    Connect you with the most suitable Tauro agent for your needs
                  </li>
                  <li>
                    Improve our website, services, and overall client experience
                  </li>
                  <li>
                    Comply with legal obligations and protect against fraud
                  </li>
                </ul>
              </div>
            </div>

            {/* Information Sharing */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-midnight">
                Information Sharing
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>
                  We do not sell your personal information. We may share your
                  data with:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <strong className="text-midnight">Tauro Agents:</strong> To
                    facilitate property showings, transactions, and personalized
                    service.
                  </li>
                  <li>
                    <strong className="text-midnight">Service Providers:</strong>{" "}
                    Third-party vendors who help us operate our website, manage
                    our CRM, process communications, and analyze data (e.g.,
                    hosting providers, email platforms, analytics tools).
                  </li>
                  <li>
                    <strong className="text-midnight">Legal Requirements:</strong>{" "}
                    When required by law, subpoena, or legal process, or to
                    protect the rights and safety of Tauro and its clients.
                  </li>
                  <li>
                    <strong className="text-midnight">Business Transfers:</strong>{" "}
                    In connection with a merger, acquisition, or sale of assets,
                    your information may be transferred as part of that
                    transaction.
                  </li>
                </ul>
              </div>
            </div>

            {/* Data Security */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-midnight">
                Data Security
              </h2>
              <p className="mt-4 text-sm leading-relaxed">
                We implement industry-standard security measures to protect your
                personal information, including encrypted data transmission
                (SSL/TLS), secure server infrastructure, and access controls.
                However, no method of electronic transmission or storage is 100%
                secure. While we strive to protect your data, we cannot
                guarantee absolute security.
              </p>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-midnight">
                Your Rights
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>Depending on your jurisdiction, you may have the right to:</p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Access the personal information we hold about you
                  </li>
                  <li>
                    Request correction of inaccurate or incomplete data
                  </li>
                  <li>
                    Request deletion of your personal information
                  </li>
                  <li>
                    Opt out of marketing communications at any time
                  </li>
                  <li>
                    Withdraw consent for data processing where applicable
                  </li>
                </ul>
                <p>
                  To exercise any of these rights, please contact us using the
                  information below.
                </p>
              </div>
            </div>

            {/* Contact Us */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-midnight">
                Contact Us
              </h2>
              <div className="mt-4 text-sm leading-relaxed">
                <p>
                  If you have questions about this Privacy Policy or wish to
                  exercise your data rights, please contact us:
                </p>
                <div className="mt-4 space-y-1">
                  <p>
                    <strong className="text-midnight">Tauro Realty</strong>
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
                      href="tel:+12158394172"
                      className="text-gold hover:underline"
                    >
                      (215) 839-4172
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
