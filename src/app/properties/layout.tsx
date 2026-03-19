import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Properties for Sale",
  description:
    "Browse luxury homes and properties for sale in Philadelphia. Filter by price, bedrooms, neighborhood, and more.",
};

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex-1">{children}</main>
      <Footer />
    </>
  );
}
