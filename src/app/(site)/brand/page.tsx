import { Metadata } from "next";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: "Brand | Tauro",
  robots: { index: false, follow: false },
};

export default function BrandPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="mb-16 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-[#1A1A2E] sm:text-4xl">
          Brand Assets
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-[#1A1A2E]/60">
          The official Tauro Realty logo shown at three sizes on both light and
          dark backgrounds.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Light background */}
        <div className="rounded-2xl border border-[#1A1A2E]/10 bg-[#F8F6F1] p-8">
          <p className="mb-6 text-xs font-medium uppercase tracking-widest text-[#1A1A2E]/40">
            Dark variant — on cream
          </p>
          <div className="flex flex-col items-start gap-6">
            <Logo size="lg" variant="dark" />
            <Logo size="md" variant="dark" />
            <Logo size="sm" variant="dark" />
          </div>
        </div>

        {/* Dark background */}
        <div className="rounded-2xl bg-[#1A1A2E] p-8">
          <p className="mb-6 text-xs font-medium uppercase tracking-widest text-[#C9A96E]/40">
            Light variant — on midnight
          </p>
          <div className="flex flex-col items-start gap-6">
            <Logo size="lg" variant="light" />
            <Logo size="md" variant="light" />
            <Logo size="sm" variant="light" />
          </div>
        </div>
      </div>
    </div>
  );
}
