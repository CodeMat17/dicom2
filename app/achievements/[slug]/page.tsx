import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy load the container component
const AchievementSlugContainer = dynamic(
  () => import("@/app/components/achievements/AchievementSlugContainer"),
  {
    loading: () => <AchievementSkeleton />,
    ssr: true, // Keep SSR enabled for SEO
  }
);

// Loading skeleton component
function AchievementSkeleton() {
  return (
    <div className="space-y-8" role="status" aria-label="Loading achievement" aria-busy="true">
      <div className="space-y-4">
        <div className="shimmer h-12 w-3/4 rounded-2xl bg-white/[0.06]" />
        <div className="shimmer h-4 w-1/2 rounded bg-white/[0.06]" />
      </div>
      <div className="shimmer aspect-video rounded-3xl bg-white/[0.06]" />
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="shimmer h-4 w-full rounded bg-white/[0.06]" />
        ))}
      </div>
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = await fetchQuery(api.achievements.getAchievementBySlug, {
    slug,
  });

  if (!story) {
    return {
      title: "Story Not Found | DICOM",
      description: "The requested story could not be found",
      robots: {
        index: false,
        follow: false,
      },
      alternates: {
        canonical: "/achievements/not-found",
      },
    };
  }

  const formattedDate = new Date(story._creationTime).toISOString();
  const imageUrl = story.photoUrl || "/achievements/default-og-image.jpg";
  const absoluteImageUrl = new URL(
    imageUrl,
    "https://dicom.gouni.edu.ng"
  ).toString();

  return {
    title: {
      absolute: `${story.title} | DICOM - Godfrey Okoye University`,
      template: "%s | DICOM Achievements",
    },
    description: story.description,
    metadataBase: new URL("https://dicom.gouni.edu.ng"),
    alternates: {
      canonical: `/achievements/${story.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: story.title,
      description: story.description,
      url: `https://dicom.gouni.edu.ng/achievements/${slug}`,
      siteName: "DICOM - Directorate of Competitions",
      locale: "en_US",
      type: "article",
      publishedTime: formattedDate,
      modifiedTime: formattedDate,
      authors: ["DICOM - Directorate of Competitions"],
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: story.title,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: story.title,
      description: story.description,
      site: "@dicom_gouni",
      creator: "@dicom_gouni",
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: story.title,
          type: "image/jpeg",
        },
      ],
    },
    keywords: [
      "DICOM achievements",
      "Godfrey Okoye University",
      "academic excellence",
      "student achievements",
      "university competitions",
      "academic success",
      story.title.toLowerCase(),
      "education",
      "competitions",
      "student success",
    ],
    authors: [
      {
        name: "DICOM - Directorate of Competitions",
        url: "https://dicom.gouni.edu.ng",
      },
    ],
    category: "Stories",
    other: {
      "theme-color": "#213675",
    },
  };
}

export default function AchievementPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-ink-900 grain">
      <div
        className="relative z-10 mx-auto max-w-3xl px-5 pb-24 pt-36 sm:px-6 md:pt-44"
        aria-labelledby="achievement-title"
      >
        <Suspense fallback={<AchievementSkeleton />}>
          <AchievementSlugContainer />
        </Suspense>
      </div>
    </div>
  );
}
