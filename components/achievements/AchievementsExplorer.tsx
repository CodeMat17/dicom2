"use client";

// The two ways to read the same list of wins.
//
// Both views run over the array the server already rendered into the HTML, so
// searching and switching views cost no request and no extra Convex read. The
// timeline is the default because a directorate's record reads better as a
// descending legacy than as a wall of equal-weight cards.
import {
  groupByYear,
  matchesQuery,
  storyDate,
  type Achievement,
} from "@/lib/achievements";
import { cn } from "@/lib/utils";
import { LayoutGrid, ListTree, Search, Trophy, X } from "lucide-react";
import { useDeferredValue, useMemo, useState } from "react";
import { Reveal, Stagger } from "../ui/motion-primitives";
import AchievementsGrid from "./AchievementsGrid";
import TimelineEntry from "./TimelineEntry";

type View = "timeline" | "grid";

const VIEWS: { id: View; label: string; Icon: typeof ListTree }[] = [
  { id: "timeline", label: "Timeline", Icon: ListTree },
  { id: "grid", label: "Grid", Icon: LayoutGrid },
];

export default function AchievementsExplorer({
  achievements,
}: {
  achievements: Achievement[];
}) {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<View>("timeline");

  // Typing stays responsive while a long list re-filters behind it.
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(
    () => achievements.filter((a) => matchesQuery(a, deferredQuery)),
    [achievements, deferredQuery]
  );

  const years = useMemo(() => groupByYear(filtered), [filtered]);

  const searching = deferredQuery.trim().length > 0;

  return (
    <div className="space-y-10">
      {/* Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search achievements..."
            aria-label="Search achievements"
            className="w-full rounded-full border border-white/15 bg-white/[0.04] py-3 pl-11 pr-11 text-sm text-white placeholder:text-white/50 transition-colors duration-300 focus:border-azure/50 focus:bg-white/[0.07] focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X aria-hidden className="h-4 w-4" />
            </button>
          )}
        </div>

        <div
          role="group"
          aria-label="View"
          className="flex items-center gap-1 self-start rounded-full border border-white/15 bg-white/[0.04] p-1"
        >
          {VIEWS.map(({ id, label, Icon }) => {
            const active = view === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setView(id)}
                aria-pressed={active}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                  active
                    ? "bg-gold text-ink-900 shadow-gold"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon aria-hidden className="h-4 w-4" />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Announced so a search reports its own result count to a screen reader */}
      <p aria-live="polite" className="sr-only">
        {filtered.length} achievement{filtered.length === 1 ? "" : "s"}
        {searching ? ` matching ${deferredQuery}` : ""}
      </p>

      {filtered.length === 0 ? (
        <EmptyResult query={deferredQuery} onClear={() => setQuery("")} />
      ) : view === "grid" ? (
        // Remounting on a new search resets the grid to its first page, so a
        // search never lands the visitor on page four of two.
        <AchievementsGrid
          key={deferredQuery}
          achievements={filtered.map((a) => ({
            _id: a._id,
            title: a.title,
            description: a.description,
            slug: a.slug,
            date: storyDate(a),
            photoUrl: a.photoUrl,
          }))}
        />
      ) : (
        <Timeline years={years} />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------
   Timeline — a single spine down the page with one sticky marker per
   year, so the visitor always knows which era they are reading.
------------------------------------------------------------------ */
function Timeline({
  years,
}: {
  years: { year: number; items: Achievement[] }[];
}) {
  return (
    <div className="relative">
      {/* The spine. Fades out at the foot so the list ends rather than stops. */}
      <span
        aria-hidden
        className="absolute bottom-0 left-[11px] top-2 w-px bg-gradient-to-b from-gold/50 via-white/15 to-transparent sm:left-[15px]"
      />

      <div className="space-y-14">
        {years.map(({ year, items }) => (
          <section key={year} aria-label={`${year} achievements`}>
            <div className="sticky top-20 z-20 -mx-1 mb-6 px-1 py-1">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-gold/25 bg-ink-800/90 py-1.5 pl-1.5 pr-4 shadow-card backdrop-blur-md">
                <span
                  aria-hidden
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/15 ring-1 ring-gold/30"
                >
                  <Trophy className="h-3 w-3 text-gold" />
                </span>
                <span className="font-display text-sm leading-none text-white">
                  {year}
                </span>
                <span className="text-xs leading-none text-white/60">
                  {items.length} {items.length === 1 ? "win" : "wins"}
                </span>
              </span>
            </div>

            <Stagger className="space-y-5 pl-8 sm:pl-12" gap={0.08}>
              {items.map((item) => (
                <Reveal key={item._id} variant="card" className="relative">
                  {/* Node on the spine, aligned with the top of the entry */}
                  <span
                    aria-hidden
                    className="absolute left-[-30px] top-7 h-2.5 w-2.5 rounded-full bg-azure ring-4 ring-ink-900 sm:left-[-42px]"
                  />
                  <TimelineEntry
                    title={item.title}
                    description={item.description}
                    slug={item.slug}
                    date={storyDate(item)}
                    photoUrl={item.photoUrl}
                  />
                </Reveal>
              ))}
            </Stagger>
          </section>
        ))}
      </div>
    </div>
  );
}

function EmptyResult({
  query,
  onClear,
}: {
  query: string;
  onClear: () => void;
}) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-white/10 py-20 text-center">
      <span
        aria-hidden
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5"
      >
        <Search className="h-7 w-7 text-white/70" />
      </span>
      <p className="font-display text-fluid-lg text-white/80">
        No achievements match &ldquo;{query}&rdquo;
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-5 rounded-full border border-white/20 px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-white/40 hover:bg-white/10"
      >
        Clear search
      </button>
    </div>
  );
}
