import ShareStoryUrl from "@/components/ShareStoryUrl";
import { Reveal } from "@/components/ui/motion-primitives";
import { ArrowLeft, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type AchievementStory = {
  title: string;
  description: string;
  slug: string;
  story?: string;
  photoUrl?: string | null;
  _creationTime: number;
  publishedAt?: number;
};

export default function AchievementSlugContainer({
  achievement,
}: {
  achievement: AchievementStory;
}) {
  const created = new Date(achievement.publishedAt ?? achievement._creationTime);
  const formattedDate = created.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="space-y-10">
      <header className="space-y-5">
        <Link
          href="/achievements"
          className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
        >
          <ArrowLeft
            aria-hidden
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
          />
          All achievements
        </Link>

        <h1
          id="achievement-title"
          className="font-display text-fluid-2xl leading-[1.1] text-white text-balance"
        >
          {achievement.title}
        </h1>

        {achievement.description && (
          <p className="max-w-2xl text-fluid-base italic leading-relaxed text-white/75 text-pretty">
            {achievement.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
          <span className="flex items-center gap-2 text-sm text-white/70">
            <CalendarDays aria-hidden className="h-4 w-4 text-gold" />
            <time dateTime={created.toISOString()}>
              Published {formattedDate}
            </time>
          </span>
          <ShareStoryUrl
            title={achievement.title}
            text={achievement.description}
            slug={achievement.slug}
          />
        </div>

        <div
          aria-hidden
          className="h-px bg-gradient-to-r from-white/20 to-transparent"
        />
      </header>

      {achievement.photoUrl && (
        <figure className="edge-light relative aspect-video w-full overflow-hidden rounded-4xl border border-white/10 shadow-lift">
          <Image
            src={achievement.photoUrl}
            alt={achievement.title}
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink-900/40 to-transparent"
          />
        </figure>
      )}

      {achievement.story && (
        <Reveal
          className="prose max-w-none
            [&>p]:mb-6 [&>p]:text-fluid-base [&>p]:leading-[1.75] [&>p]:text-white/80
            [&>h2]:mb-4 [&>h2]:mt-10 [&>h2]:font-display [&>h2]:text-fluid-xl [&>h2]:text-white
            [&>h3]:mb-3 [&>h3]:mt-8 [&>h3]:font-display [&>h3]:text-fluid-lg [&>h3]:text-white
            [&>ul]:mb-6 [&>ul]:ml-6 [&>ul]:list-disc [&>ul]:text-white/80
            [&>ol]:mb-6 [&>ol]:ml-6 [&>ol]:list-decimal [&>ol]:text-white/80
            [&>li]:mb-2 [&>li]:text-fluid-base
            [&>blockquote]:my-8 [&>blockquote]:rounded-r-2xl [&>blockquote]:border-l-2 [&>blockquote]:border-azure [&>blockquote]:bg-white/[0.03] [&>blockquote]:py-4 [&>blockquote]:pl-6 [&>blockquote]:pr-4 [&>blockquote]:italic [&>blockquote]:text-white/75
            [&_a]:text-azure [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-gold
            [&_img]:my-8 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-3xl [&_img]:border [&_img]:border-white/10 [&_img]:object-contain"
        >
          {/* Story bodies are authored in the DICOM dashboard, which owns the
              editor and the sanitisation that goes with it. */}
          <div dangerouslySetInnerHTML={{ __html: achievement.story }} />
        </Reveal>
      )}

      <div className="border-t border-white/10 pt-8">
        <Link
          href="/achievements"
          className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-azure/50 hover:bg-azure/10"
        >
          <ArrowLeft
            aria-hidden
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back to all achievements
        </Link>
      </div>
    </article>
  );
}
