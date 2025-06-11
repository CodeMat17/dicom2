"use client";

import ShareStoryUrl from "@/components/ShareStoryUrl";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
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
      <div className='space-y-8'>
        <div className='space-y-4'>
          <Skeleton className='h-8 w-3/4' />
          <Skeleton className='h-4 w-1/2' />
        </div>
        <Skeleton className='h-[400px] w-full rounded-lg' />
        <div className='space-y-4'>
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-2/3' />
        </div>
      </div>
    );
  }

  if (!achievement) {
    return (
      <div className='min-h-[50vh] flex items-center justify-center'>
        <div className='text-center space-y-4'>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>
            Story Not Found
          </h1>
          <p className='text-gray-600 dark:text-gray-400'>
            The story you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(achievement._creationTime).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <article className='space-y-8'>
      {/* Header */}
      <header className='space-y-4'>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100'>
          {achievement.title}
        </h1>
        <p className='italic text-muted-foreground'>
          {" "}
          {achievement.description}
        </p>

        <div className='flex items-center gap-12'>
          <div className='flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400'>
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
      </header>

      <div className='space-y-3'>
        {/* Main Image */}
        {achievement.photoUrl && (
          <div className='relative aspect-video w-full overflow-hidden rounded-lg'>
            <Image
              src={achievement.photoUrl}
              alt={achievement.title}
              fill
              priority
              className='object-cover object-top'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px'
            />
          </div>
        )}
      </div>

      {/* Story Content */}
      {achievement.story && (
        <div
          className='prose max-w-none dark:prose-invert
        [&>p]:text-lg [&>p]:leading-relaxed [&>p]:text-gray-700 dark:[&>p]:text-gray-300 [&>p]:mb-6
        [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-gray-900 dark:[&>h2]:text-gray-100 [&>h2]:mt-8 [&>h2]:mb-4
        [&>h3]:text-lg [&>h3]:font-medium [&>h3]:text-gray-900 dark:[&>h3]:text-gray-100 [&>h3]:mt-6 [&>h3]:mb-3
        [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-6
        [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-6
        [&>li]:text-lg [&>li]:text-gray-700 dark:[&>li]:text-gray-300 [&>li]:mb-2
        [&>blockquote]:border-l-4 [&>blockquote]:border-gray-200 dark:[&>blockquote]:border-gray-700 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:my-6
        [&_img]:max-h-[400px] [&_img]:w-full [&_img]:h-auto [&_img]:object-contain [&_img]:border-0'
          dangerouslySetInnerHTML={{ __html: achievement.story }}
        />
      )}
    </article>
  );
}
