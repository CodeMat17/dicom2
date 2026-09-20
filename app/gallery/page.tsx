import GalleryContainer from "@/components/gallery/GalleryContainer";
import type { GalleryPhoto } from "@/components/gallery/types";
import { getAllPhotos } from "@/lib/server-data";
import { JsonLd, breadcrumbSchema } from "@/lib/structured-data";
import { Metadata } from "next";

const description =
  "A visual record of DICOM at Godfrey Okoye University — competition days, award ceremonies and the students behind the wins, published as they happen.";

export const metadata: Metadata = {
  title: "Gallery | DICOM - Godfrey Okoye University",
  description,
  metadataBase: new URL("https://dicom.gouni.edu.ng"),
  alternates: {
    canonical: "/gallery",
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
    title: "Gallery | DICOM - Godfrey Okoye University",
    description,
    url: "https://dicom.gouni.edu.ng/gallery",
    siteName: "DICOM - Directorate of Competitions",
    locale: "en_US",
    type: "website",
    images: ["/opengraph-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | DICOM - Godfrey Okoye University",
    description,
    images: ["/opengraph-image.jpg"],
    site: "@dicom_gouni",
  },
};

export const revalidate = 300;

export default async function GalleryPage() {
  const photos = await getAllPhotos();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ])}
      />
      <GalleryContainer photos={(photos ?? []) as GalleryPhoto[]} />
    </>
  );
}
