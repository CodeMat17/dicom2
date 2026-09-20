// Server-side reads of the Convex mirror.
//
// Every public page is prerendered, so content has to be in the HTML that
// leaves the CDN rather than arriving over a websocket after hydration. These
// helpers run at build time and again only when a cache entry expires, which
// keeps rendering off the request path — a page view costs no server compute.
//
// Each helper is tagged so the dashboard can call `revalidateTag` (see
// app/api/revalidate/route.ts) and push an edit live without waiting out the
// window.
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { unstable_cache } from "next/cache";

/**
 * Ceiling on how stale a page may be when nothing tells us an edit happened.
 *
 * The dashboard is meant to call /api/revalidate after a write, which makes an
 * edit live in seconds; this window is the safety net for when it does not.
 * Five minutes costs almost nothing, because a page is only ever regenerated
 * if someone actually asks for it after the window lapses — a story nobody
 * visits is never rebuilt.
 */
const REVALIDATE_SECONDS = 300;

export const CACHE_TAGS = {
  achievements: "achievements",
  achievementsStats: "achievements-stats",
  collaborators: "collaborators",
  events: "events",
  gallery: "gallery",
  heroSlides: "hero-slides",
  statements: "statements",
  team: "team",
  testimonials: "testimonials",
} as const;

/** Wraps a Convex read so it is fetched once per window, not once per request. */
function cached<T>(fn: () => Promise<T>, key: string, tag: string) {
  return unstable_cache(fn, [key], {
    tags: [tag],
    revalidate: REVALIDATE_SECONDS,
  });
}

export const getHeroSlides = cached(
  () => fetchQuery(api.heroSlides.getHeroSlides),
  "hero-slides",
  CACHE_TAGS.heroSlides
);

export const getLatestAchievements = cached(
  () => fetchQuery(api.achievements.getLatestAchievements),
  "latest-achievements",
  CACHE_TAGS.achievements
);

export const getAllAchievements = cached(
  () => fetchQuery(api.achievements.getAllAchievements),
  "all-achievements",
  CACHE_TAGS.achievements
);

export const getAllAchievementsWithPhotos = cached(
  () => fetchQuery(api.achievements.getAllAchievementsWithPhotos),
  "all-achievements-with-photos",
  CACHE_TAGS.achievements
);

export const getAchievementsStats = cached(
  () => fetchQuery(api.achievementsStat.getAchievementsStats),
  "achievements-stats",
  CACHE_TAGS.achievementsStats
);

export const getCollaborators = cached(
  () => fetchQuery(api.collaborators.getCollaborators),
  "collaborators",
  CACHE_TAGS.collaborators
);

export const getEvents = cached(
  () => fetchQuery(api.events.getEvents),
  "events",
  CACHE_TAGS.events
);

export const getStatements = cached(
  () => fetchQuery(api.statements.getStatements),
  "statements",
  CACHE_TAGS.statements
);

export const getTeam = cached(
  () => fetchQuery(api.teamMembers.getTeam),
  "team",
  CACHE_TAGS.team
);

export const getTestimonials = cached(
  () => fetchQuery(api.testimonials.getTestimonials),
  "testimonials",
  CACHE_TAGS.testimonials
);

export const getAllPhotos = cached(
  () => fetchQuery(api.gallery.getAllPhotos),
  "all-photos",
  CACHE_TAGS.gallery
);

export const getAchievementBySlug = (slug: string) =>
  unstable_cache(
    () => fetchQuery(api.achievements.getAchievementBySlug, { slug }),
    ["achievement-by-slug", slug],
    { tags: [CACHE_TAGS.achievements], revalidate: REVALIDATE_SECONDS }
  )();
