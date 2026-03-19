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
    <main className="min-h-screen bg-[#060e1e]">
      {/* Hero */}
      <div className="relative pt-28 pb-8 px-4 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#213675]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="h-px w-8 bg-yellow-400" />
            <span className="text-yellow-400 text-sm font-mono tracking-widest uppercase">The Team</span>
            <div className="h-px w-8 bg-yellow-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
            Meet Our <span className="text-[#179BD7]">Team</span>
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            The dedicated professionals behind DICOM&apos;s mission to empower student excellence.
          </p>
        </div>
      </div>
      <StaffProfile />
    </main>
  );
}
