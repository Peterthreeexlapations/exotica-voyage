import type { Metadata } from "next";
import { Fraunces, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Exotica Voyage Group — Exotic Cars, Yachts, Aviation · South Florida, NYC, Chicago, Monaco, Côte d'Azur, Greece, St. Barths",
    template: "%s · Exotica Voyage Group",
  },
  description:
    "A private brokerage for exotic motoring, yacht charters, and private aviation. South Florida, New York, Chicago, Monaco, Côte d'Azur, Greece, and St. Barths. Lamborghini, Ferrari, Rolls-Royce, McLaren, Bentley — arranged in conversation.",
  openGraph: {
    type: "website",
    siteName: "Exotica Voyage Group",
    locale: "en_US",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${instrumentSans.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
