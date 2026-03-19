import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Tauro, a premium Philadelphia real estate brokerage. Read our policies on website usage, property listings, agent services, and client agreements.",
};

const sections = [
  {
    title: "1. Use of Website",
    content:
      "By accessing and using the Tauro website, you agree to be bound by these Terms of Service. This website is intended to provide general information about real estate listings, brokerage services, and the Philadelphia real estate market. All content is for informational purposes only and does not constitute legal, financial, or real estate advice.",
  },
  {
    title: "2. Property Information Disclaimer",
    content:
      "Property listings, prices, descriptions, and photographs displayed on this website are believed to be accurate but are not guaranteed. Listing information is sourced from various providers and may change without notice. Tauro does not warrant the accuracy, completeness, or reliability of any property information. Buyers should independently verify all details before making purchasing decisions.",
  },
  {
    title: "3. Lead Generation & Communications",
    content:
      "By submitting your contact information through any form on this website, you consent to receive communications from Tauro and its agents regarding your real estate inquiry. This may include phone calls, emails, and text messages. You may opt out of communications at any time by contacting us directly.",
  },
  {
    title: "4. Intellectual Property",
    content:
      "All content on this website, including text, graphics, logos, images, and software, is the property of Tauro or its licensors and is protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works from any content without prior written consent.",
  },
  {
    title: "5. User Conduct",
    content:
      "You agree not to use this website for any unlawful purpose, to interfere with the website's operation, to attempt to gain unauthorized access to any systems, or to submit false or misleading information through any forms or contact mechanisms.",
  },
  {
    title: "6. Limitation of Liability",
    content:
      "Tauro shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of this website or reliance on any information provided. This limitation applies to the fullest extent permitted by applicable law.",
  },
  {
    title: "7. Third-Party Links",
    content:
      "This website may contain links to third-party websites or services. Tauro does not endorse or assume responsibility for the content, privacy policies, or practices of any third-party sites. You access third-party links at your own risk.",
  },
  {
    title: "8. Governing Law",
    content:
      "These Terms of Service are governed by and construed in accordance with the laws of the Commonwealth of Pennsylvania. Any disputes arising from these terms shall be resolved in the courts of Philadelphia County, Pennsylvania.",
  },
  {
    title: "9. Changes to Terms",
    content:
      "Tauro reserves the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to this website. Your continued use of the website constitutes acceptance of any modifications.",
  },
  {
    title: "10. Contact",
    content:
      "If you have questions about these Terms of Service, please contact us at info@taurorealty.com or call (215) 839-4172.",
  },
];

export default function TermsPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-label text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Legal
          </p>
          <h1 className="mt-2 font-heading text-4xl font-bold text-white">
            Terms of Service
          </h1>
          <p className="mt-4 text-muted-foreground">
            Last updated: March 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-heading text-xl font-bold text-white">
                  {section.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-16 border-t border-border/40 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Questions about these terms?{" "}
              <Link
                href="/contact"
                className="text-gold transition-colors hover:text-gold-light"
              >
                Contact us
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
