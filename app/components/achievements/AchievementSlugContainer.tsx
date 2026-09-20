"use client";

import ShareStoryUrl from "@/components/ShareStoryUrl";
import { Reveal } from "@/components/ui/motion-primitives";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

import { ArrowLeft, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export default function AchievementSlugContainer() {
  const params = useParams();

  const slug = useMemo(() => {
    if (!params?.slug) return null;
    return Array.isArray(params.slug) ? params.slug[0] : params.slug;
  }, [params]);

  const achievement = useQuery(
    api.achievements.getAchievementBySlug,
    slug ? { slug } : "skip"
  );

  if (achievement === undefined) {
    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="shimmer h-12 w-3/4 rounded-2xl bg-white/[0.06]" />
          <div className="shimmer h-4 w-1/2 rounded bg-white/[0.06]" />
        </div>
        <div className="shimmer aspect-video w-full rounded-3xl bg-white/[0.06]" />
        <div className="space-y-3">
          <div className="shimmer h-4 w-full rounded bg-white/[0.06]" />
          <div className="shimmer h-4 w-full rounded bg-white/[0.06]" />
          <div className="shimmer h-4 w-2/3 rounded bg-white/[0.06]" />
        </div>
      </div>
    );
  }

  if (!achievement) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
        <p className="eyebrow mb-4 text-gold">404</p>
        <h1 className="font-display text-fluid-2xl text-white">
          Story not found
        </h1>
        <p className="mt-3 max-w-md text-white/40">
          The story you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href="/achievements"
          className="group mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/80 transition-all duration-300 hover:border-white/40 hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to achievements
        </Link>
      </div>
    );
  }

  const created = new Date(achievement._creationTime);
  const formattedDate = created.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <article className="space-y-10">
        <header className="space-y-5">
          <Link
            href="/achievements"
            className="group inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            All achievements
          </Link>

          <h1 className="font-display text-fluid-2xl leading-[1.1] text-white text-balance">
            {achievement.title}
          </h1>

          {achievement.description && (
            <p className="max-w-2xl text-fluid-base italic leading-relaxed text-white/55 text-pretty">
              {achievement.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1">
            <span className="flex items-center gap-2 text-sm text-white/40">
              <CalendarDays className="h-4 w-4 text-gold" />
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

          <div className="h-px bg-gradient-to-r from-white/20 to-transparent" />
        </header>

        {achievement.photoUrl && (
          <Reveal>
            <figure className="edge-light relative aspect-video w-full overflow-hidden rounded-4xl border border-white/10 shadow-lift">
              <Image
                src={achievement.photoUrl}
                alt={achievement.title}
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 to-transparent" />
            </figure>
          </Reveal>
        )}

        {achievement.story && (
          <div
            className="prose max-w-none
            [&>p]:mb-6 [&>p]:text-fluid-base [&>p]:leading-[1.75] [&>p]:text-white/65
            [&>h2]:mb-4 [&>h2]:mt-10 [&>h2]:font-display [&>h2]:text-fluid-xl [&>h2]:text-white
            [&>h3]:mb-3 [&>h3]:mt-8 [&>h3]:font-display [&>h3]:text-fluid-lg [&>h3]:text-white
            [&>ul]:mb-6 [&>ul]:ml-6 [&>ul]:list-disc [&>ul]:text-white/65
            [&>ol]:mb-6 [&>ol]:ml-6 [&>ol]:list-decimal [&>ol]:text-white/65
            [&>li]:mb-2 [&>li]:text-fluid-base
            [&>blockquote]:my-8 [&>blockquote]:rounded-r-2xl [&>blockquote]:border-l-2 [&>blockquote]:border-azure [&>blockquote]:bg-white/[0.03] [&>blockquote]:py-4 [&>blockquote]:pl-6 [&>blockquote]:pr-4 [&>blockquote]:italic [&>blockquote]:text-white/55
            [&_a]:text-azure [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-gold
            [&_img]:my-8 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-3xl [&_img]:border [&_img]:border-white/10 [&_img]:object-contain"
            dangerouslySetInnerHTML={{ __html: achievement.story }}
          />
        )}

        <div className="border-t border-white/10 pt-8">
          <Link
            href="/achievements"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/80 transition-all duration-300 hover:border-azure/50 hover:bg-azure/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to all achievements
          </Link>
        </div>
      </article>
    </>
  );
}
