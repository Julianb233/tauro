import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CompareBar } from "@/components/CompareBar";
import { UtilityNav } from "@/components/UtilityNav";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UtilityNav />
      <Navbar />
      <main className="min-h-screen flex-1">{children}</main>
      <CompareBar />
      <Footer />
    </>
  );
}
