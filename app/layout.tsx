import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import MotionProvider from "./components/MotionProvider";

const displaySerif = Instrument_Serif({
  variable: "--font-display",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fintry.de"),
  title: {
    default: "FINTRY — Finanzberatung für den ambitionierten Mittelstand",
    template: "%s · FINTRY",
  },
  description:
    "FINTRY begleitet Wachstumsunternehmen und Mittelständler in Strategie, Transaktionen und Restrukturierung. CFO-Kompetenz auf Abruf — ohne Fixkosten.",
  openGraph: {
    title: "FINTRY — Finanzberatung",
    description:
      "Strategische Finanzentscheidungen mit institutioneller Präzision. Für Unternehmen zwischen 5 und 250 Mio. € Umsatz.",
    locale: "de_DE",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      className={`${displaySerif.variable} ${sans.variable} antialiased`}
    >
      <body className="noise relative min-h-screen overflow-x-hidden bg-bg text-body">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
