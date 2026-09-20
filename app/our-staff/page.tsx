import { getTeam } from "@/lib/server-data";
import { JsonLd, breadcrumbSchema } from "@/lib/structured-data";
import type { Team } from "@/types/team";
import StaffProfile from "@/components/staff/StaffProfile";
import { PageHero } from "@/components/ui/page-hero";
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
    "og:type": "website",  },
};

export const revalidate = 300;

export default async function StaffPage() {
  const team = await getTeam();

  return (
    <div className="min-h-screen bg-ink-900">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Our staff", path: "/our-staff" },
        ])}
      />
      <PageHero
        id="staff-heading"
        eyebrow="The Team"
        title="Meet Our"
        accent="Team"
        description="The dedicated professionals behind DICOM's mission to empower student excellence."
      />
      <StaffProfile team={(team as Team | null) ?? null} />
    </div>
  );
}
