import { AchievementsSection } from "@/components/homepage/AchievementsSection";
import { CollaboratorsSection } from "@/components/homepage/CollaboratorsSection";
import { EventsSection } from "@/components/homepage/EventsSection";
import { HeroCarousel } from "@/components/homepage/HeroCarousel";

export default function Home() {
  return (
    <div className='min-h-screen bg-background text-foreground'>
      <HeroCarousel />
      <AchievementsSection />
      <CollaboratorsSection />
      <EventsSection />
    </div>
  );
}

export const metadata = {
  title: "Directorate of Competitions - Godfrey Okoye University",
  description:
    "Official website for the Directorate of Competitions at Godfrey Okoye University",
};
