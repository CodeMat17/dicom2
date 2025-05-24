// app/(routes)/achievements/[slug]/page.tsx

"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";

export default function AchievementPage() {
  const params = useParams();
  const slug = params.slug as string;

  const story = useQuery(api.achievements.getAchievementBySlug, { slug });

  if (story === undefined) {
    return (
      <div className='max-w-3xl mx-auto p-4'>
        <Skeleton className='h-8 w-3/4 mb-4' />
        <Skeleton className='h-4 w-1/2 mb-8' />
        <div className='flex gap-4 mb-8'>
          <Skeleton className='h-64 w-full' />
        </div>
        <Skeleton className='h-4 w-full mb-4' />
        <Skeleton className='h-4 w-full mb-4' />
        <Skeleton className='h-4 w-2/3 mb-4' />
      </div>
    );
  }

  if (!story) {
    return notFound();
  }

  return (
    <article className='max-w-3xl mx-auto px-4 py-12'>
      <header className='mb-8'>
        <h1 className='text-4xl font-bold mb-4'>{story.title}</h1>
        <p className='text-lg text-muted-foreground mb-4'>
          {story.description}
        </p>
        {story._creationTime && (
          <footer className='mb-6 text-sm text-muted-foreground italic'>
            Published {new Date(story._creationTime).toLocaleDateString()}
          </footer>
        )}
        {story.photoUrl ? (
          <div className='relative w-full h-80 rounded-lg overflow-hidden mb-6'>
            <Image
              src={story.photoUrl}
              alt={story.title}
              fill
              className='object-cover object-top'
              sizes='(max-width: 768px) 100vw, 768px'
            />
          </div>
        ) : <div className="flex items-center justify-center text-center italic py-32 animate-pulse">Photo loading...</div>}
      </header>

      {story.story && (
        <section className='space-y-6'>
          <div
            className='[&>p]:mb-4 [&>p]:text-gray-700 [&>p]:dark:text-gray-300 [&>p]:leading-relaxed
                     [&>ul]:list-disc [&>ul]:pl-8 [&>ul]:mb-4
                     [&>ol]:list-decimal [&>ol]:pl-8 [&>ol]:mb-4
                     [&>li]:mb-2 [&>*+*]:mt-4'
            dangerouslySetInnerHTML={{ __html: story.story }}
          />
        </section>
      )}
    </article>
  );
}
