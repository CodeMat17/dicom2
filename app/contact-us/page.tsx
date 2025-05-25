import ContactUsContainer from "@/components/contact-us/ContactUsContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Contact Us | DICOM - Godfrey Okoye University",
    template: "%s | DICOM Contact",
  },
  description:
    "Get in touch with the DICOM team at Godfrey Okoye University. We're here to help and answer any questions about competitions, partnerships, student development, and academic initiatives. Reach out to us today!",
  metadataBase: new URL("https://dicom.gouni.edu.ng"),
  alternates: {
    canonical: "/contact-us",
  },
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  openGraph: {
    title: "Contact Us | DICOM - Godfrey Okoye University",
    description:
      "Get in touch with the DICOM team at Godfrey Okoye University. We're here to help and answer any questions about competitions, partnerships, student development, and academic initiatives. Reach out to us today!",
    url: "https://dicom.gouni.edu.ng/contact-us",
    siteName: "DICOM - Directorate of Competitions",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/contact-us/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact DICOM - We're Here to Help",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | DICOM - Godfrey Okoye University",
    description:
      "Get in touch with the DICOM team at Godfrey Okoye University. We're here to help and answer any questions about competitions, partnerships, student development, and academic initiatives. Reach out to us today!",
    site: "@dicom_gouni",
    creator: "@dicom_gouni",
    images: "/contact-us/opengraph-image.jpg",
  },
  keywords: [
    "contact DICOM",
    "DICOM support",
    "get in touch",
    "Godfrey Okoye University",
    "student inquiries",
    "competition questions",
    "academic support",
    "DICOM help",
    "partnership inquiries",
    "student assistance",
    "contact information",
  ],
  authors: [{ name: "DICOM - Directorate of Competitions" }],
  category: "Contact",
  other: {
    "og:site_name": "DICOM - Directorate of Competitions",
    "og:type": "website",
    "theme-color": "#ffffff",
  },
};

export default function ContactUsPage() {
  return (
    <main className='min-h-screen bg-gray-50 dark:bg-slate-950'>
      <ContactUsContainer />
    </main>
  );
}
