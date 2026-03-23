import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Learn about the cookies used on the Tauro Realty website, including essential cookies, analytics (GA4), and how to manage your cookie preferences.",
};

export default function CookiePolicyPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Cookie Policy", href: "/cookie-policy" }]} />
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-foreground pb-16 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Legal
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Cookie Policy
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/60">
            Last updated: March 19, 2026
          </p>
        </div>
      </section>

      {/* ── Content ───────────────────────────────────────────── */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 text-midnight/70">
            {/* Intro */}
            <p className="text-base leading-relaxed">
              This Cookie Policy explains what cookies are, how Tauro Realty
              (&quot;Tauro,&quot; &quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;) uses cookies on our website, and your choices
              regarding cookies.
            </p>

            {/* What Are Cookies */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-midnight">
                What Are Cookies?
              </h2>
              <p className="mt-4 text-sm leading-relaxed">
                Cookies are small text files placed on your device when you visit
                a website. They are widely used to make websites work more
                efficiently, provide reporting information, and assist with
                personalization.
              </p>
            </div>

            {/* Cookies We Use */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-midnight">
                Cookies We Use
              </h2>
              <div className="mt-4 space-y-6 text-sm leading-relaxed">
                {/* Essential */}
                <div>
                  <h3 className="text-base font-semibold text-midnight">
                    Essential Cookies
                  </h3>
                  <p className="mt-2">
                    These cookies are strictly necessary for the website to
                    function. They enable core features like page navigation,
                    form submissions, and access to secure areas.
                  </p>
                  <div className="mt-3 overflow-x-auto rounded-lg border border-midnight/10">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-midnight/10 bg-midnight/5">
                          <th className="p-3 font-semibold text-midnight">
                            Cookie
                          </th>
                          <th className="p-3 font-semibold text-midnight">
                            Purpose
                          </th>
                          <th className="p-3 font-semibold text-midnight">
                            Duration
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-midnight/5">
                          <td className="p-3 font-mono">
                            tauro-cookie-consent
                          </td>
                          <td className="p-3">
                            Stores your cookie consent preferences
                          </td>
                          <td className="p-3">Persistent</td>
                        </tr>
                        <tr className="border-b border-midnight/5">
                          <td className="p-3 font-mono">__cf_bm</td>
                          <td className="p-3">
                            Cloudflare bot management (security)
                          </td>
                          <td className="p-3">30 minutes</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Analytics */}
                <div>
                  <h3 className="text-base font-semibold text-midnight">
                    Analytics Cookies
                  </h3>
                  <p className="mt-2">
                    We use Google Analytics 4 (GA4) to understand how visitors
                    interact with our website. These cookies collect information
                    in an aggregated form to help us improve our site. Analytics
                    cookies are only loaded if you consent to them.
                  </p>
                  <div className="mt-3 overflow-x-auto rounded-lg border border-midnight/10">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-midnight/10 bg-midnight/5">
                          <th className="p-3 font-semibold text-midnight">
                            Cookie
                          </th>
                          <th className="p-3 font-semibold text-midnight">
                            Purpose
                          </th>
                          <th className="p-3 font-semibold text-midnight">
                            Duration
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-midnight/5">
                          <td className="p-3 font-mono">_ga</td>
                          <td className="p-3">
                            Distinguishes unique users in Google Analytics
                          </td>
                          <td className="p-3">2 years</td>
                        </tr>
                        <tr className="border-b border-midnight/5">
                          <td className="p-3 font-mono">_ga_*</td>
                          <td className="p-3">
                            Maintains session state for GA4
                          </td>
                          <td className="p-3">2 years</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Marketing */}
                <div>
                  <h3 className="text-base font-semibold text-midnight">
                    Marketing Cookies
                  </h3>
                  <p className="mt-2">
                    These cookies may be set through our site by advertising
                    partners to build a profile of your interests and show
                    relevant ads on other sites. They are only activated with
                    your consent.
                  </p>
                </div>
              </div>
            </div>

            {/* Managing Cookies */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-midnight">
                Managing Your Cookie Preferences
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>
                  When you first visit our website, a cookie consent banner will
                  appear, giving you the option to accept all cookies, reject
                  non-essential cookies, or manage your preferences granularly.
                </p>
                <p>
                  You can also manage cookies through your browser settings. Most
                  browsers allow you to block or delete cookies. Please note that
                  blocking certain cookies may affect website functionality.
                </p>
              </div>
            </div>

            {/* CCPA */}
            <div id="ccpa">
              <h2 className="font-heading text-2xl font-bold text-midnight">
                California Privacy Rights (CCPA)
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>
                  Under the California Consumer Privacy Act (CCPA), California
                  residents have the right to:
                </p>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    Know what personal information is being collected about them
                  </li>
                  <li>
                    Know whether their personal information is sold or disclosed,
                    and to whom
                  </li>
                  <li>Opt out of the sale of their personal information</li>
                  <li>
                    Request deletion of their personal information
                  </li>
                  <li>
                    Not be discriminated against for exercising their privacy
                    rights
                  </li>
                </ul>
                <p>
                  Tauro does not sell personal information. To exercise your
                  CCPA rights, please contact us at{" "}
                  <a
                    href="mailto:privacy@taurorealty.com"
                    className="text-gold hover:underline"
                  >
                    privacy@taurorealty.com
                  </a>
                  .
                </p>
              </div>
            </div>

            {/* GDPR */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-midnight">
                European Privacy Rights (GDPR)
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed">
                <p>
                  If you are in the European Economic Area (EEA), you have
                  additional rights under the General Data Protection Regulation
                  (GDPR), including the right to access, rectify, port, and
                  erase your data, as well as the right to restrict or object to
                  processing. Non-essential cookies are only loaded with your
                  explicit consent.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-midnight">
                Contact Us
              </h2>
              <div className="mt-4 text-sm leading-relaxed">
                <p>
                  If you have questions about our use of cookies, please contact
                  us:
                </p>
                <div className="mt-4 space-y-1">
                  <p>
                    <strong className="text-midnight">Tauro Realty</strong>
                  </p>
                  <p>Philadelphia, PA</p>
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:privacy@taurorealty.com"
                      className="text-gold hover:underline"
                    >
                      privacy@taurorealty.com
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
                <p className="mt-6">
                  See also our{" "}
                  <Link
                    href="/privacy"
                    className="text-gold hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
