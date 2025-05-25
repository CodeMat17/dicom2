import { AchievementsSection } from "@/components/homepage/AchievementsSection";
import { CollaboratorsSection } from "@/components/homepage/CollaboratorsSection";
import { EventsSection } from "@/components/homepage/EventsSection";
import { HeroCarousel } from "@/components/homepage/HeroCarousel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Directorate of Competitions | Godfrey Okoye University",
  description:
    "Empowering Students Through Competition and Excellence. Discover opportunities to compete, learn, and grow with the Directorate of Competitions at Godfrey Okoye University, Enugu.",
  openGraph: {
    title: "Directorate of Competitions | GOUNI",
    description:
      "Empowering Students Through Competition and Excellence at Godfrey Okoye University",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "DICOM GOUNI - Empowering Students Through Competition",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Directorate of Competitions | GOUNI",
    description:
      "Empowering Students Through Competition and Excellence at Godfrey Okoye University",
    images: ["/opengraph-image.jpg"],
  },
  keywords: [
    "DICOM",
    "Godfrey Okoye University",
    "GOUNI",
    "student competitions",
    "academic excellence",
    "Enugu",
    "university competitions",
    "student achievements",
    "directorate of competitions",
  ],
  alternates: {
    canonical: "https://dicom.gouni.edu.ng",
  },
  authors: [{ name: "Directorate of Competitions, GOUNI" }],
  category: "education",
};

export default function Home() {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-slate-950'>
      <HeroCarousel />
      <AchievementsSection />
      <CollaboratorsSection />
      <EventsSection />
    </div>
  );
}
