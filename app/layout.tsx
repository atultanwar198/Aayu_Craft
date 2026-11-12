import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { MarketplaceHydration } from "@/app/components/marketplace-hydration";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AayuCraft | Handmade marketplace",
  description: "Premium artisan marketplace connecting makers and customers for bespoke handmade work.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body><MarketplaceHydration />{children}</body>
    </html>
  );
}
