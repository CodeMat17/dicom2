import PartnershipContainer from "@/components/partnership/PartnershipContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Strategic Partnerships | DICOM - Godfrey Okoye University",
    template: "%s | DICOM Partnerships",
  },
  description:
    "Partner with DICOM at Godfrey Okoye University to drive academic excellence and innovation. Access talented students, collaborate on cutting-edge projects, and gain visibility in the academic community.",
  metadataBase: new URL("https://dicom.gouni.edu.ng"),
  alternates: {
    canonical: "/partnership",
  },
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  openGraph: {
    title: "Strategic Partnerships | DICOM - Godfrey Okoye University",
    description:
      "Partner with DICOM at Godfrey Okoye University to drive academic excellence and innovation. Access talented students, collaborate on cutting-edge projects, and gain visibility in the academic community.",
    url: "https://dicom.gouni.edu.ng/partnership",
    siteName: "DICOM - Directorate of Competitions",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/partnership/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "DICOM Strategic Partnerships - Building Bridges for Academic Excellence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Strategic Partnerships | DICOM - Godfrey Okoye University",
    description:
      "Partner with DICOM at Godfrey Okoye University to drive academic excellence and innovation. Access talented students, collaborate on cutting-edge projects, and gain visibility in the academic community.",
    site: "@dicom_gouni",
    creator: "@dicom_gouni",
    images: "/partnership/opengraph-image.jpg",
  },
  keywords: [
    "DICOM partnerships",
    "academic collaboration",
    "Godfrey Okoye University",
    "strategic partnerships",
    "academic innovation",
    "student development",
    "research collaboration",
    "academic excellence",
    "university partnerships",
    "educational innovation",
  ],
  authors: [{ name: "DICOM - Directorate of Competitions" }],
  category: "Partnerships",

  other: {
    "og:site_name": "DICOM - Directorate of Competitions",
    "og:type": "website",
    "theme-color": "#ffffff",
  },
};

export default function PartnershipPage() {
  return (
  <main className='min-h-screen bg-gray-50 dark:bg-slate-950'>      <PartnershipContainer />
    </main>
  );
}
