"use client";

import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import ShareStoryUrl from "../ShareStoryUrl";
import type { GalleryPhoto } from "./types";

/**
 * Full-bleed viewer. The frame is sized from the photo's own ratio and capped
 * by the viewport, so a portrait fills the height and a landscape the width —
 * neither is cropped or letterboxed into the other's shape.
 */
export default function GalleryLightbox({
  photos,
  index,
  ratios,
  onClose,
  onNavigate,
}: {
  photos: GalleryPhoto[];
  index: number | null;
  ratios: Record<string, number>;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const open = index !== null;
  const photo = open ? photos[index] : null;

  const step = useCallback(
    (delta: number) => {
      if (index === null || photos.length === 0) return;
      onNavigate((index + delta + photos.length) % photos.length);
    },
    [index, photos.length, onNavigate]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose, step]);

  const ratio = photo
    ? (photo.width && photo.height
        ? photo.width / photo.height
        : ratios[photo._id]) ?? 4 / 5
    : 1;
  const isPortrait = ratio < 1;

  return (
    <AnimatePresence>
      {open && photo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-900/92 p-4 backdrop-blur-xl sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={photo.title}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close viewer"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 backdrop-blur-md transition-colors hover:border-white/35 hover:text-white sm:right-6 sm:top-6"
          >
            <X className="h-5 w-5" />
          </button>

          {photos.length > 1 && (
            <>
              <NavButton side="left" onClick={() => step(-1)} />
              <NavButton side="right" onClick={() => step(1)} />
            </>
          )}

          <motion.figure
            key={photo._id}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={cn(
              "flex max-h-full w-full flex-col gap-6 overflow-y-auto",
              // A landscape reads best stacked; a portrait leaves room for the
              // caption to sit beside it on a wide screen.
              isPortrait
                ? "max-w-5xl lg:flex-row lg:items-center"
                : "max-w-4xl"
            )}
          >
            <div
              className="relative w-full shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-ink-800 shadow-lift"
              style={{
                aspectRatio: ratio,
                maxHeight: "72vh",
                // Cap the width to whatever the height cap allows, so a tall
                // portrait never overflows the viewport vertically.
                maxWidth: `min(100%, calc(72vh * ${ratio}))`,
                margin: "0 auto",
              }}
            >
              {photo.photoUrl && (
                <Image
                  src={photo.photoUrl}
                  alt={photo.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  priority
                />
              )}
            </div>

            <figcaption
              className={cn(
                "shrink-0",
                isPortrait ? "lg:max-w-xs" : "mx-auto max-w-2xl text-center"
              )}
            >
              <div
                className={cn(
                  "mb-3 flex items-center gap-1.5 text-[11px] font-medium text-white/50",
                  !isPortrait && "justify-center"
                )}
              >
                <CalendarDays className="h-3 w-3 text-gold" />
                <time dateTime={new Date(photo.publishedAt).toISOString()}>
                  Published {dayjs(photo.publishedAt).format("MMMM DD, YYYY")}
                </time>
              </div>

              <h2 className="font-display text-fluid-xl capitalize leading-tight text-white text-balance">
                {photo.title}
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-white/55 text-pretty">
                {photo.description}
              </p>

              <div
                className={cn(
                  "mt-5 flex items-center gap-3 border-t border-white/10 pt-4",
                  !isPortrait && "justify-center"
                )}
              >
                <ShareStoryUrl
                  title={photo.title}
                  text={photo.description}
                  path={`/gallery?photo=${photo._id}`}
                  label="Share photo"
                  className="-ml-2.5 text-white/60"
                />
                <span className="text-xs text-white/25">
                  {index! + 1} / {photos.length}
                </span>
              </div>
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavButton({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      aria-label={side === "left" ? "Previous photo" : "Next photo"}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        "absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 backdrop-blur-md transition-all duration-300 hover:border-white/35 hover:bg-white/10 hover:text-white",
        side === "left" ? "left-2 sm:left-6" : "right-2 sm:right-6"
      )}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
