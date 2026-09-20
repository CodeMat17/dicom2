import { AchievementsSection } from "@/components/homepage/AchievementsSection";
import { CollaboratorsSection } from "@/components/homepage/CollaboratorsSection";
import { EventsSection } from "@/components/homepage/EventsSection";
import { HeroCarousel } from "@/components/homepage/HeroCarousel";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/structured-data";
import {
  getAchievementsStats,
  getCollaborators,
  getEvents,
  getHeroSlides,
  getLatestAchievements,
} from "@/lib/server-data";
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
    canonical: "/",
  },
  authors: [{ name: "Directorate of Competitions, GOUNI" }],
  category: "education",
};

// Prerendered, then refreshed in the background. Nothing on this page is
// computed per visitor, so a page view is served straight from the CDN.
export const revalidate = 300;

export default async function Home() {
  const [slides, achievements, stats, collaborators, events] =
    await Promise.all([
      getHeroSlides(),
      getLatestAchievements(),
      getAchievementsStats(),
      getCollaborators(),
      getEvents(),
    ]);

  return (
    <div className="min-h-screen bg-ink-900">
      <JsonLd data={[organizationSchema(), websiteSchema()]} />
      <HeroCarousel slides={slides ?? []} />
      <AchievementsSection
        achievements={achievements ?? []}
        stats={stats ?? null}
      />
      <CollaboratorsSection collaborators={collaborators ?? []} />
      <EventsSection events={events ?? []} />
    </div>
  );
}
