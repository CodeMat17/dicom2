"use client";

import { Camera, Mail, SearchX } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GalleryPhoto } from "./types";
import { CtaBand, GoldButton, PageHero } from "../ui/page-hero";
import GalleryLightbox from "./GalleryLightbox";
import GalleryPost from "./GalleryPost";
import GallerySearch from "./GallerySearch";

/** Posts fetched per page. Each can carry several photographs. */
const BATCH = 6;

/**
 * Pages loaded automatically as the visitor scrolls before the wall hands
 * over to a button. Without a stop, the CTA band below can never be reached.
 */
const AUTO_PAGES = 3;

/**
 * Distance below the viewport at which the next page starts loading. It is
 * deliberately generous: the batch should already be painted by the time the
 * visitor's eye arrives, so a spinner is never part of the experience.
 */
const PRELOAD_MARGIN = "0px 0px 800px 0px";

/**
 * Pause after the last keystroke before the wall re-filters. The match itself
 * is local now, but the pause still keeps the list from thrashing mid-word.
 */
const SEARCH_DEBOUNCE_MS = 200;

/** Which photograph of which post the viewer is showing. */
type Viewing = { postId: string; imageIndex: number };

/**
 * The wall is handed the full published set by the server, already rendered
 * into the page down to the first batch. Paging and searching are then local:
 * nothing here goes back to the network, so scrolling the gallery and typing
 * in the box cost no requests at all.
 */
export default function GalleryContainer({
  photos,
}: {
  photos: GalleryPhoto[];
}) {
  const [shown, setShown] = useState(BATCH);

  // What is in the box, and what has settled enough to filter on.
  const [term, setTerm] = useState("");
  const [settledTerm, setSettledTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(
      () => setSettledTerm(term.trim()),
      SEARCH_DEBOUNCE_MS
    );
    return () => clearTimeout(timer);
  }, [term]);

  // Every whitespace-separated term has to appear in the title, so
  // "award 2024" narrows rather than widens.
  const searchResults = useMemo(() => {
    const terms = settledTerm.toLowerCase().split(/s+/).filter(Boolean);
    if (!terms.length) return null;
    return photos.filter((photo) => {
      const title = photo.title.toLowerCase();
      return terms.every((word) => title.includes(word));
    });
  }, [photos, settledTerm]);

  const isSearching = term.trim().length > 0;
  /** True only while the debounce has yet to catch up with the typing. */
  const searchPending = isSearching && settledTerm !== term.trim();

  /** Matches while a search is live, the loaded slice of the feed otherwise. */
  const displayed = isSearching
    ? (searchResults ?? [])
    : photos.slice(0, shown);

  const [viewing, setViewing] = useState<Viewing | null>(null);
  // Ratios measured off the wire for photographs that have no stored
  // dimensions, keyed by URL, so a frame reserves the right box before the
  // file paints.
  const [ratios, setRatios] = useState<Record<string, number>>({});
  // Auto-loading stops after `AUTO_PAGES`; the visitor asks for the rest.
  const [pagesLoaded, setPagesLoaded] = useState(1);

  useEffect(() => {
    if (!displayed.length) return;
    let cancelled = false;

    displayed.forEach((photo) =>
      photo.images.forEach((image) => {
        if (image.width && image.height) return;
        if (ratios[image.url]) return;

        const img = new window.Image();
        img.src = image.url;
        img.decoding = "async";
        img.onload = () => {
          if (cancelled || !img.naturalHeight) return;
          setRatios((prev) =>
            prev[image.url]
              ? prev
              : { ...prev, [image.url]: img.naturalWidth / img.naturalHeight }
          );
        };
      })
    );

    return () => {
      cancelled = true;
    };
    // `ratios` is intentionally excluded: it is written by this effect and
    // re-reading it here would loop on every measurement.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayed]);

  // Paging belongs to the full feed: while a search is live the wall shows
  // every match at once, so the sentinel has nothing left to pull.
  const canLoadMore = !isSearching && shown < photos.length;
  const autoLoads = canLoadMore && pagesLoaded < AUTO_PAGES;

  const handleLoadMore = useCallback(() => {
    setShown((n) => n + BATCH);
    setPagesLoaded((n) => n + 1);
  }, []);

  // Sentinel parked below the last post; crossing into the preload margin
  // pulls the next page in before the visitor can notice it was missing.
  const sentinel = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = sentinel.current;
    if (!node || !autoLoads) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) handleLoadMore();
      },
      { rootMargin: PRELOAD_MARGIN }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [autoLoads, handleLoadMore]);

  // Deep links from the share button (`/gallery?photo=<id>`, optionally with
  // `&i=<n>`) open the viewer on that post. It may sit on a page that has not
  // been fetched yet, so this keeps pulling batches until it turns up rather
  // than giving up on the first.
  const deepLinked = useRef(false);

  useEffect(() => {
    if (deepLinked.current || !photos.length) return;
    const params = new URLSearchParams(window.location.search);
    const id = params.get("photo");
    if (!id) return;

    const index = photos.findIndex((photo) => photo._id === id);
    if (index === -1) return;

    deepLinked.current = true;
    // The post may sit past the loaded slice; open enough of the wall that it
    // is mounted behind the viewer.
    setShown((n) => Math.max(n, index + 1));
    const wanted = Number(params.get("i")) || 0;
    setViewing({
      postId: id,
      imageIndex: Math.min(
        Math.max(wanted, 0),
        photos[index].images.length - 1
      ),
    });
  }, [photos]);

  const viewed = viewing
    ? displayed.find((photo) => photo._id === viewing.postId) ?? null
    : null;

  return (
    <div className="min-h-screen bg-ink-900">
      <PageHero
        id="gallery-heading"
        eyebrow="In pictures"
        title="The DICOM"
        accent="Gallery"
        description="Moments from the competitions, ceremonies and quiet work in between — captured as they happened and shown in their own frame."

      />

      <section className="relative bg-ink-900 px-5 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <GallerySearch
            value={term}
            onChange={setTerm}
            resultCount={searchResults?.length ?? null}
            searching={searchPending}
          />

          {displayed.length === 0 ? (
            isSearching ? (
              <NoMatches term={term.trim()} onClear={() => setTerm("")} />
            ) : (
              <EmptyState />
            )
          ) : (
            // Each post is its own block: details once at the top, then its
            // photographs. The next post follows underneath.
            <div className="space-y-16 sm:space-y-20">
              {displayed.map((photo, index) => (
                <GalleryPost
                  key={photo._id}
                  photo={photo}
                  ratios={ratios}
                  priority={index === 0}
                  onOpen={(imageIndex) =>
                    setViewing({ postId: photo._id, imageIndex })
                  }
                />
              ))}
            </div>
          )}

          <div ref={sentinel} aria-hidden className="h-px w-full" />

          {canLoadMore && !autoLoads && (
            <div className="mt-14 flex justify-center">
              <button
                type="button"
                onClick={handleLoadMore}
                className="rounded-full border border-white/20 px-8 py-4 text-sm font-medium text-white/80 transition-all duration-300 hover:border-gold/50 hover:bg-white/5 hover:text-white"
              >
                View more photographs
              </button>
            </div>
          )}
        </div>
      </section>

      <GalleryLightbox
        photo={viewed}
        index={viewing?.imageIndex ?? null}
        ratios={ratios}
        onClose={() => setViewing(null)}
        onNavigate={(imageIndex) =>
          setViewing((current) => (current ? { ...current, imageIndex } : null))
        }
      />

      <CtaBand
        title="Want your moment"
        accent="in the frame?"
        description="Invite DICOM to your next competition, or partner with us to document the stories behind the wins."
      >
        <GoldButton href="mailto:dicom@gouni.edu.ng">
          <Mail aria-hidden className="h-4 w-4" />
          Get in touch
        </GoldButton>
        <Link
          href="/achievements"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-medium text-white/80 transition-all duration-300 hover:border-white/40 hover:bg-white/5 hover:text-white"
        >
          Read the stories
        </Link>
      </CtaBand>
    </div>
  );
}

/** Shown when a search comes back empty — with the way back out of it. */
function NoMatches({ term, onClear }: { term: string; onClear: () => void }) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-white/10 py-24 text-center">
      <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
        <SearchX className="h-7 w-7 text-white/70" />
      </span>
      <p className="font-display text-fluid-lg text-white/70">
        No posts match “{term}”
      </p>
      <p className="mt-2 max-w-sm text-sm text-white/70">
        Try a single word from the title — a competition, a place or a year.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-7 rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white/80 transition-all duration-300 hover:border-gold/50 hover:bg-white/5 hover:text-white"
      >
        Clear search
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-white/10 py-24 text-center">
      <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
        <Camera className="h-7 w-7 text-white/70" />
      </span>
      <p className="font-display text-fluid-lg text-white/70">
        No photographs published yet
      </p>
      <p className="mt-2 max-w-sm text-sm text-white/70">
        The gallery fills up as new competitions and ceremonies are covered.
      </p>
    </div>
  );
}
