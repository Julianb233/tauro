import type { Metadata } from "next";
import { PrivacyPreferencesForm } from "./privacy-preferences-form";

export const metadata: Metadata = {
  title: "Privacy Preferences",
  description:
    "Manage your privacy preferences, cookie settings, and exercise your CCPA/GDPR rights with Tauro Realty.",
};

export default function PrivacyPreferencesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground pb-16 pt-32">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.25em] text-gold">
            Your Rights
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Privacy Preferences
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/60">
            Control how your data is collected and used. Exercise your rights
            under CCPA, GDPR, and other privacy regulations.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {/* CCPA Notice */}
            <div className="rounded-xl border border-gold/20 bg-white/5 p-6">
              <h2 className="font-heading text-2xl font-bold text-white">
                California Consumer Privacy Act (CCPA)
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                Under the California Consumer Privacy Act, California residents
                have the right to:
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-gold" />
                  Know what personal information is collected about them
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-gold" />
                  Request deletion of their personal information
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-gold" />
                  Opt out of the sale or sharing of their personal information
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 block size-1.5 shrink-0 rounded-full bg-gold" />
                  Non-discrimination for exercising their privacy rights
                </li>
              </ul>
              <p className="mt-4 text-sm text-white/60">
                Tauro Realty does not sell your personal information. However,
                some third-party analytics and marketing tools may constitute a
                &quot;sale&quot; or &quot;sharing&quot; under CCPA. You can opt
                out below.
              </p>
            </div>

            {/* GDPR Notice */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h2 className="font-heading text-2xl font-bold text-white">
                General Data Protection Regulation (GDPR)
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                If you are located in the European Economic Area, you have
                additional rights including the right to access, rectify, port,
                and erase your data, as well as the right to restrict and object
                to certain processing of your data.
              </p>
            </div>

            {/* Cookie / Tracking Preferences */}
            <div>
              <h2 className="font-heading text-2xl font-bold text-white">
                Manage Your Preferences
              </h2>
              <p className="mt-3 text-sm text-white/60">
                Use the controls below to manage cookies and tracking. Changes
                take effect immediately.
              </p>
              <div className="mt-6">
                <PrivacyPreferencesForm />
              </div>
            </div>

            {/* Data Request */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h2 className="font-heading text-2xl font-bold text-white">
                Submit a Data Request
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                To request access to, correction of, or deletion of your
                personal data, please contact us:
              </p>
              <div className="mt-4 space-y-2 text-sm text-white/70">
                <p>
                  <span className="font-semibold text-white/80">Email:</span>{" "}
                  <a
                    href="mailto:privacy@taurorealty.com"
                    className="text-gold hover:underline"
                  >
                    privacy@taurorealty.com
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-white/80">Phone:</span>{" "}
                  <a
                    href="tel:+12155550100"
                    className="text-gold hover:underline"
                  >
                    (215) 555-0100
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-white/80">Mail:</span>{" "}
                  Tauro Realty, Attn: Privacy, 1500 Walnut St, Suite 500,
                  Philadelphia, PA 19102
                </p>
              </div>
              <p className="mt-4 text-xs text-white/50">
                We will respond to verified requests within 45 days as required
                by applicable law.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
