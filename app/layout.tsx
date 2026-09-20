import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { RevealObserver } from "@/components/ui/reveal-observer";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

// Nunito is a variable font: asking for it without a weight list ships one
// file that covers 300–900 instead of seven static cuts.
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Directorate of Competitions | Godfrey Okoye University",
    template: "%s | DICOM GOUNI",
  },
  description:
    "Empowering Students Through Competition and Excellence. Discover opportunities to compete, learn, and grow with the Directorate of Competitions at Godfrey Okoye University, Enugu.",
  keywords: [
    "DICOM",
    "Godfrey Okoye University",
    "competitions",
    "achievements",
    "student competitions",
    "GOUNI",
    "academic excellence",
    "Enugu",
    "university competitions",
  ],
  authors: [{ name: "Directorate of Competitions, GOUNI" }],
  creator: "Directorate of Competitions",
  publisher: "Godfrey Okoye University",
  formatDetection: {
    email: false,
    telephone: false,
  },
  metadataBase: new URL("https://dicom.gouni.edu.ng"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Directorate of Competitions | Godfrey Okoye University",
    description:
      "Empowering Students Through Competition and Excellence at Godfrey Okoye University, Enugu.",
    url: "https://dicom.gouni.edu.ng",
    siteName: "DICOM GOUNI",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Directorate of Competitions - Godfrey Okoye University",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Directorate of Competitions | GOUNI",
    description:
      "Empowering Students Through Competition and Excellence at Godfrey Okoye University, Enugu.",
    images: ["/opengraph-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "education",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060e1e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${nunito.variable}`}>
      <body className="antialiased min-h-screen flex flex-col bg-ink-900 font-sans text-white">
        {/* Keyboard users land on this before the seven-item nav rail. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:font-semibold focus:text-ink-900"
        >
          Skip to content
        </a>

        <Navbar />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />

        <RevealObserver />
        <Toaster />
      </body>
    </html>
  );
}
