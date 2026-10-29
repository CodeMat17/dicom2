import { GoldButton, PageHero } from "@/components/ui/page-hero";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * Shown when a story slug matches nothing. The page's generateMetadata
 * already marks it noindex; this route has no loading boundary above it, so
 * the response carries a real 404 status.
 */
export default function StoryNotFound() {
  return (
    <PageHero
      id="story-not-found-heading"
      eyebrow="Error 404"
      title="Story not"
      accent="found"
      description="This story may have been renamed or taken down. Browse the full record of our students' wins instead."
    >
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <GoldButton href="/achievements">
          All achievements
          <ArrowRight aria-hidden className="h-4 w-4" />
        </GoldButton>
        <Link
          href="/"
          className="rounded-full px-6 py-3 text-sm font-semibold text-white/70 transition-colors hover:text-white"
        >
          Back to home
        </Link>
      </div>
    </PageHero>
  );
}
