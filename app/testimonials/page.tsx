import TestimonialsContainer from "@/components/testimonials/TestimonialsContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "Success Stories & Testimonials | DICOM - Godfrey Okoye University",
    template: "%s | DICOM Testimonials",
  },
  description:
    "Discover inspiring stories from students and partners who have experienced success through DICOM at Godfrey Okoye University. Read authentic testimonials about academic growth, competition victories, and transformative experiences.",
  metadataBase: new URL("https://dicom.gouni.edu.ng"),
  alternates: {
    canonical: "/testimonials",
  },
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  openGraph: {
    title: "Success Stories & Testimonials | DICOM - Godfrey Okoye University",
    description:
      "Discover inspiring stories from students and partners who have experienced success through DICOM at Godfrey Okoye University. Read authentic testimonials about academic growth, competition victories, and transformative experiences.",
    url: "https://dicom.gouni.edu.ng/testimonials",
    siteName: "DICOM - Directorate of Competitions",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/testimonials/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "DICOM Student Testimonials and Success Stories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Success Stories & Testimonials | DICOM - Godfrey Okoye University",
    description:
      "Discover inspiring stories from students and partners who have experienced success through DICOM at Godfrey Okoye University. Read authentic testimonials about academic growth, competition victories, and transformative experiences.",
    site: "@dicom_gouni",
    creator: "@dicom_gouni",
    images: "/testimonials/opengraph-image.jpg",
  },
  keywords: [
    "DICOM testimonials",
    "student success stories",
    "Godfrey Okoye University",
    "student achievements",
    "academic competitions",
    "student experiences",
    "competition success",
    "student testimonials",
    "academic excellence",
    "student development",
    "DICOM success stories",
  ],
  authors: [{ name: "DICOM - Directorate of Competitions" }],
  category: "Testimonials",
  other: {
    "og:site_name": "DICOM - Directorate of Competitions",
    "og:type": "website",
    "theme-color": "#ffffff",
  },
};

export default function TestimonialsPage() {
  return (
    <main className='min-h-screen bg-gray-50 dark:bg-slate-950'>
      <TestimonialsContainer />
    </main>
  );                           
}
