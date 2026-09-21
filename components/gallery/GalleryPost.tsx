"use client";

import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { CalendarDays, Expand, Images } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { GalleryImage, GalleryPhoto } from "./types";

/**
 * Photographs shown before the post folds. The hero plus a full row beneath
 * it is enough to say what the set is about; a forty-photo post would
 * otherwise own the page and bury the ones below it.
 */
const VISIBLE = 6;

/** Assumed shape for a photograph whose dimensions are not known yet. */
const FALLBACK_RATIO = 4 / 5;

/**
 * One gallery post: its details once, above its photographs.
 *
 * The details belong to the post, not to any single frame, so the date,
 * title and description sit in a band across the top and the
 * photographs below carry nothing but themselves. The first photograph runs
 * full width as the hero and the rest fall into ratio-true columns beneath
 * it — nothing is cropped to a house aspect ratio in either place.
 */
export default function GalleryPost({
  photo,
  ratios,
  onOpen,
  priority,
}: {
  photo: GalleryPhoto;
  /** Ratios measured off the wire, keyed by image URL. */
  ratios: Record<string, number>;
  /** Opens the viewer on one of this post's photographs. */
  onOpen: (imageIndex: number) => void;
  /** Set on the topmost post so its hero is fetched eagerly. */
  priority?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  const images = photo.images;
  if (images.length === 0) return null;

  const [hero, ...rest] = images;
  const shown = expanded ? rest : rest.slice(0, VISIBLE - 1);
  const hidden = rest.length - shown.length;

  const ratioOf = (image: GalleryImage) =>
    image.width && image.height
      ? image.width / image.height
      : ratios[image.url] ?? null;

  return (
    <article className="border-t border-white/10 pt-10 first:border-t-0 first:pt-0">
      {/* The post's details, stated once for the whole set. */}
      <header className="mb-7">
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-3 w-3 text-gold" />
            <time dateTime={new Date(photo.publishedAt).toISOString()}>
              {dayjs(photo.publishedAt).format("MMM DD, YYYY")}
            </time>
          </span>
          {photo.category && (
            <span className="rounded-full border border-white/10 px-2.5 py-0.5 normal-case tracking-normal text-white/70">
              {photo.category}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Images className="h-3 w-3 text-gold" />
            {images.length} photo{images.length === 1 ? "" : "s"}
          </span>
        </div>

        <h2 className="font-display text-fluid-xl capitalize leading-tight text-white text-balance">
          {photo.title}
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/70 text-pretty">
          {photo.description}
        </p>
      </header>

      <Frame
        image={hero}
        ratio={ratioOf(hero)}
        alt={`${photo.title} — photo 1 of ${images.length}`}
        onOpen={() => onOpen(0)}
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 1100px"
        className="mb-4"
        // A very wide hero would otherwise push the rest of the post off
        // screen on a laptop.
        maxHeightVh={70}
      />

      {shown.length > 0 && (
        <div className="columns-2 gap-4 lg:columns-3 [&>*]:mb-4">
          {shown.map((image, i) => (
            <Frame
              key={image.url}
              image={image}
              ratio={ratioOf(image)}
              alt={`${photo.title} — photo ${i + 2} of ${images.length}`}
              onOpen={() => onOpen(i + 1)}
              sizes="(max-width: 640px) 50vw, 33vw"
            />
          ))}
        </div>
      )}

      {hidden > 0 && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white/80 transition-all duration-300 hover:border-gold/50 hover:bg-white/5 hover:text-white"
          >
            Show all {images.length} photos
          </button>
        </div>
      )}
    </article>
  );
}

/**
 * A single photograph, sized from its own ratio so the box is reserved before
 * the file paints and nothing has to be cropped to fill it.
 */
function Frame({
  image,
  ratio: known,
  alt,
  onOpen,
  priority,
  sizes,
  className,
  maxHeightVh,
}: {
  image: GalleryImage;
  ratio: number | null;
  alt: string;
  onOpen: () => void;
  priority?: boolean;
  sizes: string;
  className?: string;
  /** Caps a wide hero so it cannot fill the whole viewport. */
  maxHeightVh?: number;
}) {
  const [loadedRatio, setRatio] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false);
  const ratio = known ?? loadedRatio ?? FALLBACK_RATIO;

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View ${alt} full size`}
      style={{
        aspectRatio: ratio,
        ...(maxHeightVh
          ? {
              maxHeight: `${maxHeightVh}vh`,
              // Hold the ratio while the height cap bites, so a panorama
              // narrows rather than stretching.
              maxWidth: `min(100%, calc(${maxHeightVh}vh * ${ratio}))`,
              // Inline only: a `margin` shorthand would zero the caller's
              // bottom margin and glue the hero to the grid below it.
              marginInline: "auto",
            }
          : {}),
      }}
      className={cn(
        "group edge-light spotlight relative block w-full break-inside-avoid overflow-hidden rounded-3xl",
        "border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] shadow-card",
        "transition-[border-color,box-shadow,transform] duration-500 ease-out-quint",
        "hover:-translate-y-1 hover:border-azure/30 hover:shadow-lift",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70",
        className
      )}
      onMouseMove={(e) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {!loaded && (
        <span className="shimmer absolute inset-0 block bg-white/[0.05]" />
      )}

      <Image
        src={image.url}
        alt={alt}
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
          // `contain` would letterbox; because the box already matches the
          // file's ratio, `cover` fills it without cropping.
          "object-cover transition-all duration-700 ease-out-quint group-hover:scale-[1.04]",
          loaded ? "opacity-100" : "opacity-0"
        )}
        sizes={sizes}
      />

      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <span className="pointer-events-none absolute left-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full border border-white/15 bg-ink-900/60 text-white/85 opacity-0 backdrop-blur-md transition-all duration-500 ease-out-quint group-hover:translate-y-0 group-hover:opacity-100">
        <Expand className="h-4 w-4" />
      </span>
    </button>
  );
}
