import AboutUsContainer from "@/components/about-us/AboutUsContainer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Directorate of Competitions GOUNI",
  description:
    "Learn about the Directorate of Competitions at Godfrey Okoye University. We foster excellence through competitive events, student development, and innovative programs that shape future leaders.",
  openGraph: {
    title: "About DICOM | Godfrey Okoye University",
    description:
      "Discover the mission and vision of the Directorate of Competitions at Godfrey Okoye University. Leading innovation in competitive excellence and student development.",
    images: [
      {
        url: "/about-us/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "About the Directorate of Competitions - GOUNI",
      },
    ],
    locale: "en_US",
    type: "website",
    siteName: "DICOM GOUNI",
  },
  twitter: {
    card: "summary_large_image",
    title: "About DICOM | Godfrey Okoye University",
    description:
      "Discover the mission and vision of the Directorate of Competitions at Godfrey Okoye University. Leading innovation in competitive excellence and student development.",
    images: ["/about-us/opengraph-image.jpg"],
  },
  keywords: [
    "DICOM",
    "about DICOM",
    "Godfrey Okoye University",
    "GOUNI",
    "directorate of competitions",
    "student development",
    "competitive excellence",
    "Enugu university",
    "university competitions",
    "academic competitions",
  ],
  alternates: {
    canonical: "https://dicom.gouni.edu.ng/about-us",
  },
  authors: [{ name: "Directorate of Competitions, GOUNI" }],
  category: "education",
};

export default function AboutUs() {
  return (
    <>
      <AboutUsContainer />
    </>
  );
}
