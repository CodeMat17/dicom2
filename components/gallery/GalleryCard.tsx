"use client";

import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { CalendarDays, Expand } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ShareStoryUrl from "../ShareStoryUrl";
import type { GalleryPhoto } from "./types";

/**
 * A gallery tile keeps the photograph's own proportions: portraits stay tall,
 * landscapes stay wide. Dimensions come from the record when an editor stored
 * them, otherwise the browser reports them on load — so nothing is cropped to
 * a house aspect ratio.
 */
export default function GalleryCard({
  photo,
  onOpen,
  priority,
  ratio: measured,
}: {
  photo: GalleryPhoto;
  onOpen: () => void;
  priority?: boolean;
  /** Aspect ratio resolved by the grid, when it already knows it. */
  ratio?: number | null;
}) {
  const stored =
    photo.width && photo.height ? photo.width / photo.height : null;
  const [loadedRatio, setRatio] = useState<number | null>(null);
  const ratio = stored ?? measured ?? loadedRatio ?? null;
  const [loaded, setLoaded] = useState(false);

  // Until the file reports back, reserve a gently portrait box — it is the
  // least jarring guess for a mixed set and avoids a column reflow storm.
  const aspect = ratio ?? 4 / 5;
  const orientation =
    ratio === null ? "unknown" : ratio >= 1.05 ? "landscape" : ratio <= 0.95 ? "portrait" : "square";

  return (
    <figure className="group relative mb-5 break-inside-avoid">
      <div
        className={cn(
          "edge-light spotlight relative overflow-hidden rounded-3xl border border-white/10",
          "bg-gradient-to-b from-white/[0.07] to-white/[0.02] shadow-card",
          "transition-[border-color,box-shadow,transform] duration-500 ease-out-quint",
          "hover:-translate-y-1.5 hover:border-azure/30 hover:shadow-lift"
        )}
        onMouseMove={(e) => {
          const el = e.currentTarget;
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", `${e.clientX - r.left}px`);
          el.style.setProperty("--my", `${e.clientY - r.top}px`);
        }}
      >
        <button
          type="button"
          onClick={onOpen}
          aria-label={`View ${photo.title} full size`}
          className="relative block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
          style={{ aspectRatio: aspect }}
        >
          {!loaded && (
            <span className="shimmer absolute inset-0 block bg-white/[0.05]" />
          )}

          {photo.photoUrl && (
            <Image
              src={photo.photoUrl}
              alt={photo.title}
              fill
              priority={priority}
              onLoad={(e) => {
                const img = e.currentTarget;
                if (img.naturalWidth && img.naturalHeight) {
                  setRatio(img.naturalWidth / img.naturalHeight);
                }
                setLoaded(true);
              }}
              className={cn(
                // `contain` would letterbox; because the box already matches
                // the file's ratio, `cover` fills it without cropping.
                "object-cover transition-all duration-700 ease-out-quint group-hover:scale-[1.06]",
                loaded ? "opacity-100" : "opacity-0"
              )}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}

          {/* Legibility scrim, deepened on hover so the caption can sit on it */}
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/25 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

          {orientation !== "unknown" && (
            <span className="pointer-events-none absolute right-3 top-3 rounded-full border border-white/15 bg-ink-900/60 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/70 opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100">
              {orientation}
            </span>
          )}

          <span className="pointer-events-none absolute left-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full border border-white/15 bg-ink-900/60 text-white/85 opacity-0 backdrop-blur-md transition-all duration-500 ease-out-quint group-hover:translate-y-0 group-hover:opacity-100">
            <Expand className="h-4 w-4" />
          </span>
        </button>

        {/* Caption sits over the foot of the image so the tile reads as one
            photographic object rather than a picture with a label bolted on. */}
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 p-5">
          <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-white/60">
            <CalendarDays className="h-3 w-3 text-gold" />
            <time dateTime={new Date(photo.publishedAt).toISOString()}>
              {dayjs(photo.publishedAt).format("MMM DD, YYYY")}
            </time>
          </div>

          <h3 className="font-display text-fluid-lg capitalize leading-snug text-white line-clamp-2">
            {photo.title}
          </h3>

          <p className="mt-1.5 max-h-0 overflow-hidden text-sm leading-relaxed text-white/60 opacity-0 transition-all duration-500 ease-out-quint group-hover:max-h-24 group-hover:opacity-100">
            <span className="line-clamp-3">{photo.description}</span>
          </p>

          <div className="pointer-events-auto mt-3 flex items-center justify-between border-t border-white/10 pt-3">
            <ShareStoryUrl
              title={photo.title}
              text={photo.description}
              path={`/gallery?photo=${photo._id}`}
              className="-ml-2.5"
            />
            <button
              type="button"
              onClick={onOpen}
              className="text-sm font-medium text-azure transition-colors hover:text-gold"
            >
              View
            </button>
          </div>
        </figcaption>
      </div>
    </figure>
  );
}
