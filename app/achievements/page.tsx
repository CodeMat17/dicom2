import AchievementsContainer from "@/components/achievements/AchievementsContainer";
import {
  getAchievementsStats,
  getAllAchievementsWithPhotos,
} from "@/lib/server-data";
import { JsonLd, breadcrumbSchema } from "@/lib/structured-data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Our Achievements | DICOM - Godfrey Okoye University",
  description:
    "Celebrating our students' outstanding achievements with national championships and international recognitions. From Tech Fest victories to global debate competitions, discover DICOM's legacy of excellence at Godfrey Okoye University. Partner with us to support the next generation of champions.",
  metadataBase: new URL("https://dicom.gouni.edu.ng"),
  alternates: {
    canonical: "/achievements",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title:
      "Our Stories & Achievements | DICOM - Godfrey Okoye University",
    description:
      "Celebrating our students' outstanding achievements with national championships and international recognitions. From Tech Fest victories to global debate competitions, discover DICOM's legacy of excellence at Godfrey Okoye University. Partner with us to support the next generation of champions.",
    url: "https://dicom.gouni.edu.ng/achievements",
    siteName: "DICOM - Directorate of Competitions",
    locale: "en_US",
    type: "website",
    images: ["/achievements/opengraph-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Our Stories & Achievements | DICOM - Godfrey Okoye University",
    description:
      "Celebrating our students' outstanding achievements with national championships and international recognitions. From Tech Fest victories to global debate competitions, discover DICOM's legacy of excellence at Godfrey Okoye University. Partner with us to support the next generation of champions.",
    images: ["/achievements/opengraph-image.jpg"],
    site: "@dicom_gouni",
  },
};

export const revalidate = 300;

export default async function AchievementsPage() {
  const [achievements, stats] = await Promise.all([
    getAllAchievementsWithPhotos(),
    getAchievementsStats(),
  ]);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Achievements", path: "/achievements" },
        ])}
      />
      <AchievementsContainer
        achievements={achievements ?? []}
        stats={stats ?? null}
      />
    </>
  );
}
