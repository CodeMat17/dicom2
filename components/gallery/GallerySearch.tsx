"use client";

import { Search, X } from "lucide-react";

/**
 * The gallery's search box.
 *
 * It is controlled by the container so the typed text can stay instant while
 * the query behind it is debounced — the input never waits on the network.
 * Posts are matched on their title, which is what the placeholder promises;
 * saying more than that here would over-sell what the query does.
 */
export default function GallerySearch({
  value,
  onChange,
  resultCount,
  searching,
}: {
  value: string;
  onChange: (value: string) => void;
  /** Matches for the settled query, or `null` while none is running. */
  resultCount: number | null;
  /** True while the debounce or the query is still in flight. */
  searching: boolean;
}) {
  const active = value.trim().length > 0;

  return (
    <div className="mb-12 sm:mb-14">
      <div className="relative mx-auto max-w-xl">
        <Search
          aria-hidden
          className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35"
        />

        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search photographs by title…"
          aria-label="Search gallery posts by title"
          className="w-full rounded-full border border-white/10 bg-white/[0.04] py-4 pl-12 pr-12 text-sm text-white placeholder:text-white/35 shadow-card outline-none transition-all duration-300 hover:border-white/20 focus:border-gold/50 focus:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-gold/40 [&::-webkit-search-cancel-button]:hidden"
        />

        {active && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear search"
            className="absolute right-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-white/45 transition-colors duration-300 hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Announced politely so a screen reader hears the count settle rather
          than every keystroke on the way there. */}
      <p
        aria-live="polite"
        className="mt-3 text-center text-xs text-white/40 min-h-[1rem]"
      >
        {active && !searching && resultCount !== null
          ? `${resultCount} post${resultCount === 1 ? "" : "s"} matching “${value.trim()}”`
          : ""}
      </p>
    </div>
  );
}
