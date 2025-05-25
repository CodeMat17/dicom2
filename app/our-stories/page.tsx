import AchievementsContainer from "@/components/achievements/AchievementsContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Our Stories & Achievements | DICOM - Godfrey Okoye University",
  description:
    "Celebrating our students' outstanding achievements with national championships and international recognitions. From Tech Fest victories to global debate competitions, discover DICOM's legacy of excellence at Godfrey Okoye University. Partner with us to support the next generation of champions.",
  metadataBase: new URL("https://dicom.gouni.edu.ng"),
  alternates: {
    canonical: "/our-stories",
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
    url: "https://dicom.gouni.edu.ng/our-stories",
    siteName: "DICOM - Directorate of Competitions",
    locale: "en_US",
    type: "website",
    images: ["/our-stories/opengraph-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Our Stories & Achievements | DICOM - Godfrey Okoye University",
    description:
      "Celebrating our students' outstanding achievements with national championships and international recognitions. From Tech Fest victories to global debate competitions, discover DICOM's legacy of excellence at Godfrey Okoye University. Partner with us to support the next generation of champions.",
    images: ["/our-stories/opengraph-image.jpg"],
    site: "@dicom_gouni",
  },
};

export default function AchievementsPage() {
  // const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <AchievementsContainer />
    </>
  );
}
