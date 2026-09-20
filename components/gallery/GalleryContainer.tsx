"use client";

import { api } from "@/convex/_generated/api";
import { cardRise } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, ImageIcon, Mail, RectangleHorizontal, RectangleVertical } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Aurora } from "../ui/motion-primitives";
import { CtaBand, GoldButton, PageHero } from "../ui/page-hero";
import GalleryCard from "./GalleryCard";
import GalleryLightbox from "./GalleryLightbox";
import type { GalleryPhoto, Orientation } from "./types";

const FILTERS: { key: Orientation; label: string; Icon: typeof ImageIcon }[] = [
  { key: "all", label: "All photos", Icon: ImageIcon },
  { key: "landscape", label: "Landscape", Icon: RectangleHorizontal },
  { key: "portrait", label: "Portrait", Icon: RectangleVertical },
];

export default function GalleryContainer() {
  const photos = useQuery(api.gallery.getAllPhotos) as
    | GalleryPhoto[]
    | undefined;

  const [filter, setFilter] = useState<Orientation>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Ratios measured off the wire for records that have no stored dimensions.
  // Filtering by shape needs them before the tile is ever painted.
  const [ratios, setRatios] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!photos) return;
    let cancelled = false;

    photos.forEach((photo) => {
      if (!photo.photoUrl) return;
      if (photo.width && photo.height) return;
      if (ratios[photo._id]) return;

      const img = new window.Image();
      img.src = photo.photoUrl;
      img.decoding = "async";
      img.onload = () => {
        if (cancelled || !img.naturalHeight) return;
        setRatios((prev) =>
          prev[photo._id]
            ? prev
            : { ...prev, [photo._id]: img.naturalWidth / img.naturalHeight }
        );
      };
    });

    return () => {
      cancelled = true;
    };
    // `ratios` is intentionally excluded: it is written by this effect and
    // re-reading it here would loop on every measurement.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos]);

  const ratioOf = (photo: GalleryPhoto) =>
    photo.width && photo.height
      ? photo.width / photo.height
      : ratios[photo._id] ?? null;

  const visible = useMemo(() => {
    if (!photos) return [];
    if (filter === "all") return photos;
    return photos.filter((photo) => {
      const r = ratioOf(photo);
      // Unmeasured photos stay visible rather than blinking out of the grid.
      if (r === null) return true;
      return filter === "portrait" ? r < 1 : r >= 1;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos, filter, ratios]);

  const counts = useMemo(() => {
    const all = photos?.length ?? 0;
    let portrait = 0;
    let landscape = 0;
    photos?.forEach((photo) => {
      const r = ratioOf(photo);
      if (r === null) return;
      if (r < 1) portrait += 1;
      else landscape += 1;
    });
    return { all, portrait, landscape };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [photos, ratios]);

  // Deep links from the share button (`/gallery?photo=<id>`) open the viewer.
  useEffect(() => {
    if (!photos?.length) return;
    const id = new URLSearchParams(window.location.search).get("photo");
    if (!id) return;
    const idx = photos.findIndex((photo) => photo._id === id);
    if (idx >= 0) setOpenIndex(idx);
  }, [photos]);

  return (
    <main className="min-h-screen bg-ink-900">
      <PageHero
        id="gallery-heading"
        eyebrow="In pictures"
        title="The DICOM"
        accent="Gallery"
        description="Moments from the competitions, ceremonies and quiet work in between — captured as they happened and shown in their own frame."
        footnote="Every photograph keeps its native orientation: portraits stay tall, landscapes stay wide."
      />

      {/* Filters */}
      <section className="relative overflow-hidden bg-ink-800 px-5 py-10 grain sm:px-6">
        <Aurora className="-right-40 top-0 h-[380px] w-[380px]" color="azure" />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">
          <div className="flex flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-md">
            {FILTERS.map(({ key, label, Icon }) => {
              const isActive = filter === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  aria-pressed={isActive}
                  className={cn(
                    "relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                    isActive
                      ? "text-ink-900"
                      : "text-white/55 hover:text-white"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="gallery-filter-pill"
                      className="absolute inset-0 rounded-full bg-gold shadow-gold"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {label}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-sm text-white/35">
            {counts.all} photograph{counts.all === 1 ? "" : "s"}
            {counts.portrait + counts.landscape > 0 && (
              <>
                {" · "}
                {counts.landscape} landscape · {counts.portrait} portrait
              </>
            )}
          </p>
        </div>
      </section>

      {/* Masonry grid — CSS columns let each tile keep its own height, which
          is what makes mixed orientations sit together without gaps. */}
      <section className="relative bg-ink-900 px-5 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          {photos === undefined ? (
            <GallerySkeleton />
          ) : photos.length === 0 ? (
            <EmptyState />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={filter}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
                variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                className="columns-1 gap-5 sm:columns-2 lg:columns-3"
              >
                {visible.map((photo, idx) => (
                  <motion.div key={photo._id} variants={cardRise}>
                    <GalleryCard
                      photo={photo}
                      ratio={ratioOf(photo)}
                      priority={idx < 3}
                      onOpen={() =>
                        setOpenIndex(
                          photos.findIndex((p) => p._id === photo._id)
                        )
                      }
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      <GalleryLightbox
        photos={photos ?? []}
        index={openIndex}
        ratios={ratios}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />

      <CtaBand
        title="Want your moment"
        accent="in the frame?"
        description="Invite DICOM to your next competition, or partner with us to document the stories behind the wins."
      >
        <GoldButton href="mailto:dicom@gouni.edu.ng">
          <Mail className="h-4 w-4" />
          Get in touch
        </GoldButton>
        <Link
          href="/achievements"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-medium text-white/80 transition-all duration-300 hover:border-white/40 hover:bg-white/5 hover:text-white"
        >
          Read the stories
        </Link>
      </CtaBand>
    </main>
  );
}

/** Mixed heights in the skeleton so the load state previews the real layout. */
function GallerySkeleton() {
  const heights = [340, 460, 300, 420, 360, 480, 320, 400, 380];
  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
      {heights.map((h, i) => (
        <div
          key={i}
          style={{ height: h }}
          className="shimmer mb-5 break-inside-avoid rounded-3xl border border-white/10 bg-white/[0.04]"
        />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-white/10 py-24 text-center">
      <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
        <Camera className="h-7 w-7 text-white/25" />
      </span>
      <p className="font-display text-fluid-lg text-white/60">
        No photographs published yet
      </p>
      <p className="mt-2 max-w-sm text-sm text-white/35">
        The gallery fills up as new competitions and ceremonies are covered.
      </p>
    </div>
  );
}
