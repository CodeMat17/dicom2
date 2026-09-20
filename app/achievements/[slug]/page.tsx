import AchievementSlugContainer from "@/app/components/achievements/AchievementSlugContainer";
import { getAchievementBySlug, getAllAchievements } from "@/lib/server-data";
import { JsonLd, articleSchema, breadcrumbSchema } from "@/lib/structured-data";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// Every story is prerendered at build time and refreshed in the background,
// so a reader — or a crawler — is served static HTML with the full article in
// it. A slug published after the last build renders once, then joins the
// cache.
export const revalidate = 300;

export async function generateStaticParams() {
  const achievements = await getAllAchievements();
  return (achievements ?? []).map((achievement) => ({
    slug: achievement.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // Shares the cache entry the page itself reads, so this costs no extra
  // round trip to Convex.
  const story = await getAchievementBySlug(slug);

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
  };
}

export default async function AchievementPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const achievement = await getAchievementBySlug(slug);

  if (!achievement) notFound();

  return (
    <div className="relative min-h-screen overflow-hidden bg-ink-900 grain">
      <JsonLd
        data={[
          articleSchema({
            title: achievement.title,
            description: achievement.description,
            slug: achievement.slug,
            image: achievement.photoUrl,
            published: achievement.publishedAt ?? achievement._creationTime,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Achievements", path: "/achievements" },
            { name: achievement.title, path: `/achievements/${achievement.slug}` },
          ]),
        ]}
      />
      <div
        className="relative z-10 mx-auto max-w-3xl px-5 pb-24 pt-36 sm:px-6 md:pt-44"
        aria-labelledby="achievement-title"
      >
        <AchievementSlugContainer achievement={achievement} />
      </div>
    </div>
  );
}
