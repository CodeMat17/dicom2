// Server-side reads of the Convex mirror.
//
// Every public page is prerendered, so content has to be in the HTML that
// leaves the CDN rather than arriving over a websocket after hydration. These
// helpers run at build time and again only when the dashboard says the data
// behind them changed — there is no timer, so a page view or a crawler never
// causes a regeneration.
//
// Each helper is tagged so the dashboard can call `revalidateTag` (see
// app/api/revalidate/route.ts) and push an edit live on the next request.
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { unstable_cache } from "next/cache";

/**
 * Cache entries never expire on their own.
 *
 * Every regeneration is several ISR writes on Vercel — the HTML, the RSC
 * payload, its prefetch segments and every data entry below — whether or not
 * the content changed. A time window (5 minutes, later 24 hours) let crawlers
 * walking the sitemap rewrite the whole site over and over, so pages now
 * change only when a dashboard save revalidates their tag.
 *
 * The routes' `export const revalidate = false` mirrors this; keep them
 * together.
 */
const REVALIDATE = false;

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

/**
 * The tag for one story page.
 *
 * Story pages deliberately do not read anything tagged `achievements`, so
 * editing one story rebuilds that page (plus the lists that show it) rather
 * than every story on the site.
 */
const STORY_TAG_PREFIX = "achievement:";

export function storyTag(slug: string) {
  return `${STORY_TAG_PREFIX}${slug}`;
}

/** Whether `tag` is one the dashboard may ask us to revalidate. */
export function isKnownTag(tag: string) {
  if ((Object.values(CACHE_TAGS) as string[]).includes(tag)) return true;
  const slug = tag.slice(STORY_TAG_PREFIX.length);
  return tag.startsWith(STORY_TAG_PREFIX) && isPlausibleSlug(slug);
}

/** Cheap guard against junk URLs before they cost a Convex call. */
function isPlausibleSlug(slug: string) {
  return slug.length > 0 && slug.length <= 200 && !/[/?#\s]/.test(slug);
}

/** Wraps a Convex read so it is fetched once, then only after a revalidate. */
function cached<T>(fn: () => Promise<T>, key: string, tag: string) {
  return unstable_cache(fn, [key], {
    tags: [tag],
    revalidate: REVALIDATE,
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
 * Tagged only with the story's own tag — never `achievements` — so a story
 * page is rebuilt only when that story is created, edited or deleted. A miss
 * is cached too, under the same tag, so a slug that 404s today starts working
 * the moment the dashboard publishes a story with it.
 */
export async function getAchievementBySlug(slug: string) {
  if (!isPlausibleSlug(slug)) return null;

  return unstable_cache(
    () => fetchQuery(api.achievements.getAchievementBySlug, { slug }),
    ["achievement-by-slug", slug],
    { tags: [storyTag(slug)], revalidate: REVALIDATE }
  )();
}

/**
 * The newest achievement that actually has a written story, for the homepage
 * spotlight.
 *
 * The list query returns no `story` field, so the candidates are walked
 * newest-first and the full row is pulled for each until one has prose worth
 * featuring. The walk is cached under `achievements`, so it runs once per
 * story edit, not once per visitor — and a run of story-less rows at the top
 * simply yields null and the section renders nothing.
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
