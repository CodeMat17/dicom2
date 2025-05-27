import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Playfair_Display } from 'next/font/google';
import "./globals.css";

import { ConvexClientProvider } from "./ConvexClientProvider";

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-playfair',
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange>
          <ConvexClientProvider>
            <main className='flex-1'>
              <Navbar />
              {children}
            </main>
            <Footer />
            <Toaster />
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
