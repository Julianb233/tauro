import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CompareBar } from "@/components/CompareBar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen flex-1">{children}</main>
      <CompareBar />
      <Footer />
    </>
  );
}
