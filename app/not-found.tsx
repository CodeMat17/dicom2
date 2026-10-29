import { GoldButton, PageHero } from "@/components/ui/page-hero";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | DICOM - Godfrey Okoye University",
  robots: { index: false, follow: true },
};

/** Site-wide 404, served with a real 404 status. */
export default function NotFound() {
  return (
    <PageHero
      id="not-found-heading"
      eyebrow="Error 404"
      title="Page not"
      accent="found"
      description="The page you're looking for has moved, been removed, or never existed. Let's get you back on track."
    >
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
        <GoldButton href="/">
          Back to home
          <ArrowRight aria-hidden className="h-4 w-4" />
        </GoldButton>
        <Link
          href="/contact-us"
          className="rounded-full px-6 py-3 text-sm font-semibold text-white/70 transition-colors hover:text-white"
        >
          Contact us
        </Link>
      </div>
    </PageHero>
  );
}
