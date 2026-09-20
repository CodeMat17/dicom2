import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

import { ConvexClientProvider } from "./ConvexClientProvider";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
  // verification: {
  //   google: "YOUR_GOOGLE_SITE_VERIFICATION_CODE", // Replace with your verification code
      
  // },
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
  maximumScale: 5,
  userScalable: true,
  themeColor: "#060e1e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='dark' suppressHydrationWarning>
      <body
        className={`${nunito.variable} antialiased min-h-screen flex flex-col bg-ink-900 font-sans text-white`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          forcedTheme='dark'
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
