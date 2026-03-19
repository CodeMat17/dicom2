"use client";

import ShareStoryUrl from "@/components/ShareStoryUrl";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
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
      <div className="space-y-8 animate-pulse">
        <div className="space-y-4">
          <div className="h-10 w-3/4 bg-white/10 rounded-xl" />
          <div className="h-4 w-1/2 bg-white/10 rounded" />
        </div>
        <div className="h-[400px] w-full bg-white/10 rounded-2xl" />
        <div className="space-y-3">
          <div className="h-4 w-full bg-white/10 rounded" />
          <div className="h-4 w-full bg-white/10 rounded" />
          <div className="h-4 w-2/3 bg-white/10 rounded" />
        </div>
      </div>
    );
  }

  if (!achievement) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-bold text-white">Story Not Found</h1>
          <p className="text-white/40">The story you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(achievement._creationTime).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="space-y-8">
      {/* Header */}
      <header className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
          {achievement.title}
        </h1>
        {achievement.description && (
          <p className="text-white/50 text-lg italic leading-relaxed">{achievement.description}</p>
        )}

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-white/35">
            <CalendarDays className="w-4 h-4 text-yellow-400" />
            <time dateTime={new Date(achievement._creationTime).toISOString()}>
              Published {formattedDate}
            </time>
          </div>
          <ShareStoryUrl
            title={achievement.title}
            text={achievement.description}
            slug={achievement.slug}
          />
        </div>

        {/* Separator */}
        <div className="h-px bg-white/8" />
      </header>

      {/* Main Image */}
      {achievement.photoUrl && (
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/8">
          <Image
            src={achievement.photoUrl}
            alt={achievement.title}
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>
      )}

      {/* Story Content */}
      {achievement.story && (
        <div
          className="prose max-w-none
          [&>p]:text-white/65 [&>p]:text-lg [&>p]:leading-relaxed [&>p]:mb-6
          [&>h2]:text-white [&>h2]:text-xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4
          [&>h3]:text-white [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-3
          [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-6 [&>ul]:text-white/65
          [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-6 [&>ol]:text-white/65
          [&>li]:text-lg [&>li]:mb-2
          [&>blockquote]:border-l-4 [&>blockquote]:border-[#179BD7] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-6 [&>blockquote]:text-white/50
          [&_img]:max-h-full [&_img]:w-full [&_img]:h-auto [&_img]:object-contain [&_img]:border-0 [&_img]:my-6 [&_img]:rounded-xl"
          dangerouslySetInnerHTML={{ __html: achievement.story }}
        />
      )}
    </article>
  );
}
