"use client";

import { api } from "@/convex/_generated/api";
import { cardRise } from "@/lib/motion";
import { usePaginatedQuery, useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Camera, Mail, SearchX } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
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
 * Pause after the last keystroke before the search actually runs. Long enough
 * that typing a word does not fire a query per letter, short enough that the
 * wall still feels like it is reacting to the typing.
 */
const SEARCH_DEBOUNCE_MS = 250;

/** Which photograph of which post the viewer is showing. */
type Viewing = { postId: string; imageIndex: number };

export default function GalleryContainer() {
  const {
    results: photos,
    status,
    loadMore,
  } = usePaginatedQuery(
    api.gallery.getPhotosPaginated,
    {},
    { initialNumItems: BATCH }
  );

  // What is in the box, and what has settled enough to ask the server for.
  const [term, setTerm] = useState("");
  const [settledTerm, setSettledTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(
      () => setSettledTerm(term.trim()),
      SEARCH_DEBOUNCE_MS
    );
    return () => clearTimeout(timer);
  }, [term]);

  // A search has to reach posts no page has fetched yet, so it asks the
  // server rather than filtering whatever the wall happens to be holding.
  const searchResults = useQuery(
    api.gallery.searchPhotos,
    settledTerm ? { term: settledTerm } : "skip"
  );

  const isSearching = term.trim().length > 0;
  // Either the debounce has not fired yet or the query is still out.
  const searchPending =
    isSearching && (settledTerm !== term.trim() || searchResults === undefined);

  /** Matches while a search is live, the full feed otherwise. */
  const displayed = isSearching ? searchResults ?? [] : photos;

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

  // Paging belongs to the full feed: while a search is live the wall shows one
  // capped result set, so the sentinel has nothing left to pull.
  const canLoadMore = status === "CanLoadMore" && !isSearching;
  const autoLoads = canLoadMore && pagesLoaded < AUTO_PAGES;

  const handleLoadMore = useCallback(() => {
    loadMore(BATCH);
    setPagesLoaded((n) => n + 1);
  }, [loadMore]);

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

    const post = photos.find((photo) => photo._id === id);
    if (post) {
      deepLinked.current = true;
      const wanted = Number(params.get("i")) || 0;
      setViewing({
        postId: id,
        imageIndex: Math.min(Math.max(wanted, 0), post.images.length - 1),
      });
    } else if (canLoadMore) {
      handleLoadMore();
    }
  }, [photos, canLoadMore, handleLoadMore]);

  const viewed = viewing
    ? displayed.find((photo) => photo._id === viewing.postId) ?? null
    : null;

  const isFirstPage = status === "LoadingFirstPage";

  return (
    <main className="min-h-screen bg-ink-900">
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

          {isFirstPage || searchPending ? (
            <GallerySkeleton />
          ) : displayed.length === 0 ? (
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
                <motion.div
                  key={photo._id}
                  variants={cardRise}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: (index % BATCH) * 0.06 }}
                >
                  <GalleryPost
                    photo={photo}
                    ratios={ratios}
                    priority={index === 0}
                    onOpen={(imageIndex) =>
                      setViewing({ postId: photo._id, imageIndex })
                    }
                  />
                </motion.div>
              ))}
            </div>
          )}

          {status === "LoadingMore" && !isSearching && (
            <div className="mt-16">
              <GallerySkeleton rows={1} />
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

/**
 * Previews the real shape of a post — a header band, a hero and a row of
 * smaller frames — so an arriving batch reads as growth rather than a wait.
 */
function GallerySkeleton({ rows = 2 }: { rows?: number }) {
  return (
    <div className="space-y-16 sm:space-y-20">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i}>
          <div className="shimmer h-3 w-28 rounded-full bg-white/[0.06]" />
          <div className="shimmer mt-4 h-7 w-2/3 max-w-md rounded-full bg-white/[0.06]" />
          <div className="shimmer mt-3 h-3 w-full max-w-2xl rounded-full bg-white/[0.05]" />
          <div className="shimmer mt-7 h-[46vh] rounded-3xl border border-white/10 bg-white/[0.04]" />
          <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3">
            {[260, 320, 290].map((h, j) => (
              <div
                key={j}
                style={{ height: h }}
                className="shimmer rounded-3xl border border-white/10 bg-white/[0.04]"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Shown when a search comes back empty — with the way back out of it. */
function NoMatches({ term, onClear }: { term: string; onClear: () => void }) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-white/10 py-24 text-center">
      <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
        <SearchX className="h-7 w-7 text-white/25" />
      </span>
      <p className="font-display text-fluid-lg text-white/60">
        No posts match “{term}”
      </p>
      <p className="mt-2 max-w-sm text-sm text-white/35">
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
