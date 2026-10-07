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
 * The dashboard calls /api/revalidate after a write, which makes an edit live
 * on the next request; this window is only the safety net for when it does
 * not. It is deliberately long: every lapse lets the next visitor (or crawler)
 * regenerate the page, and each regeneration is several ISR writes on Vercel —
 * the HTML, the RSC payload, its prefetch segments and every data entry below
 * — whether or not the content changed. At five minutes, crawlers walking the
 * sitemap rewrote the whole site hundreds of times a day.
 *
 * The routes' `export const revalidate` must be a literal, so they repeat this
 * number; change them together.
 */
const REVALIDATE_SECONDS = 86400;

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

/**
 * A single story, or null.
 *
 * The slug comes straight from the URL, so it is checked against the cached
 * list before it is allowed its own cache entry — otherwise every probe for
 * /achievements/<anything> would write a new data entry. A story published
 * after the list was cached shows up as soon as the dashboard revalidates the
 * `achievements` tag, which refreshes both.
 */
export async function getAchievementBySlug(slug: string) {
  const known = await getAllAchievements();
  if (!known?.some((achievement) => achievement.slug === slug)) return null;

  return unstable_cache(
    () => fetchQuery(api.achievements.getAchievementBySlug, { slug }),
    ["achievement-by-slug", slug],
    { tags: [CACHE_TAGS.achievements], revalidate: REVALIDATE_SECONDS }
  )();
}

/**
 * The newest achievement that actually has a written story, for the homepage
 * spotlight.
 *
 * The list query returns no `story` field, so the candidates are walked
 * newest-first and the full row is pulled for each until one has prose worth
 * featuring. Every read here is cached and tagged, so the walk happens once
 * per revalidation window, not once per visitor — and a run of story-less
 * rows at the top simply yields null and the section renders nothing.
 */
export const getFeaturedStory = cached(
  async () => {
    const latest = await fetchQuery(api.achievements.getLatestAchievements);

    for (const candidate of latest ?? []) {
      const full = await fetchQuery(api.achievements.getAchievementBySlug, {
        slug: candidate.slug,
      });
      if (full?.story?.trim()) return full;
    }

    return null;
  },
  "featured-story",
  CACHE_TAGS.achievements
);
