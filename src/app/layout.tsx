import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Raihana Mehendi Artistry | Bridal Mehendi Artist in Mangaluru",
  description: "Discover elegant bridal, engagement and custom mehendi designs by Raihana in Mangaluru, Karnataka. Enquire for your special occasion.",
  keywords: ["mehendi artist in Mangaluru", "bridal mehendi Mangaluru", "mehendi artist Mangalore", "bridal mehendi artist Mangalore", "best mehendi artist Mangaluru"],
  openGraph: {
    title: "Raihana Mehendi Artistry | Bridal Mehendi Artist in Mangaluru",
    description: "Discover elegant bridal, engagement and custom mehendi designs by Raihana in Mangaluru, Karnataka.",
    url: "https://raihanamehendi.com",
    siteName: "Raihana Mehendi Artistry",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col antialiased selection:bg-accent selection:text-white">
        {children}
      </body>
    </html>
  );
}
