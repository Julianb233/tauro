import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Tauro | Premium Philadelphia Real Estate",
    template: "%s | Tauro",
  },
  description:
    "Tauro is a premium real estate brokerage serving Philadelphia. Find luxury homes, expert agents, and neighborhood guides across Center City, Rittenhouse, Fishtown, and more.",
  keywords: [
    "Philadelphia real estate",
    "luxury homes Philadelphia",
    "real estate brokerage",
    "Tauro",
    "LYL Realty Group",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${playfair.variable} ${dmSans.variable} ${montserrat.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
