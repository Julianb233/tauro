import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CompareBar } from "@/components/CompareBar";
import { PageTransition } from "@/components/PageTransition";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <CompareBar />
      <WhatsAppButton phone="12154272870" variant="fab" />
      <Footer />
    </>
  );
}
