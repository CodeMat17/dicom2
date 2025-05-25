import StaffProfile from "@/components/staff/StaffProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Meet Our Team | DICOM - Godfrey Okoye University",
    template: "%s | DICOM Staff",
  },
  description:
    "Meet the dedicated team behind DICOM's success at Godfrey Okoye University. Our experienced staff members are committed to fostering academic excellence, organizing competitions, and nurturing student talent.",
  metadataBase: new URL("https://dicom.gouni.edu.ng"),
  alternates: {
    canonical: "/our-staff",
  },
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  openGraph: {
    title: "Meet Our Team | DICOM - Godfrey Okoye University",
    description:
      "Meet the dedicated team behind DICOM's success at Godfrey Okoye University. Our experienced staff members are committed to fostering academic excellence, organizing competitions, and nurturing student talent.",
    url: "https://dicom.gouni.edu.ng/our-staff",
    siteName: "DICOM - Directorate of Competitions",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/our-staff/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "DICOM Staff - The Team Behind Our Success",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Our Team | DICOM - Godfrey Okoye University",
    description:
      "Meet the dedicated team behind DICOM's success at Godfrey Okoye University. Our experienced staff members are committed to fostering academic excellence, organizing competitions, and nurturing student talent.",
    site: "@dicom_gouni",
    creator: "@dicom_gouni",
    images: "/our-staff/opengraph-image.jpg",
  },
  keywords: [
    "DICOM staff",
    "DICOM team",
    "Godfrey Okoye University",
    "academic leadership",
    "competition organizers",
    "education professionals",
    "university staff",
    "DICOM directors",
    "academic mentors",
    "student development team",
    "competition management",
  ],
  authors: [{ name: "DICOM - Directorate of Competitions" }],
  category: "Staff",
  other: {
    "og:site_name": "DICOM - Directorate of Competitions",
    "og:type": "website",
    "theme-color": "#ffffff",
  },
};

export default function StaffPage() {
  return (
    <main className='min-h-screen bg-gray-50 dark:bg-slate-950 py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h1 className='text-4xl font-bold text-center mb-12 text-foreground'>
          Meet Our Team
        </h1>
        <StaffProfile />
      </div>
    </main>
  );
}
