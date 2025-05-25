import AchievementsContainer from "@/components/achievements/AchievementsContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Academic Excellence & Achievements | DICOM - Godfrey Okoye University",
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
      "Academic Excellence & Achievements | DICOM - Godfrey Okoye University",
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
      "Academic Excellence & Achievements | DICOM - Godfrey Okoye University",
    description:
      "Celebrating our students' outstanding achievements with national championships and international recognitions. From Tech Fest victories to global debate competitions, discover DICOM's legacy of excellence at Godfrey Okoye University. Partner with us to support the next generation of champions.",
    images: ["/achievements/opengraph-image.jpg"],
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
