// Shared shaping for the achievements list.
//
// Convex stores two timestamps per story: `publishedAt`, which the dashboard
// sets when an editor backdates a win to when it actually happened, and
// `_creationTime`, which is always present. The public list has to sort and
// group by one number, so everything here reads through `storyDate` — the
// editorial date when there is one, the row's own age when there is not.
import type { Id } from "@/convex/_generated/dataModel";

export type Achievement = {
  _id: Id<"achievements">;
  title: string;
  description: string;
  slug: string;
  photoUrl: string | null;
  publishedAt?: number;
  _creationTime: number;
};

/** The one timestamp the public site sorts, groups and labels by. */
export function storyDate(achievement: {
  publishedAt?: number;
  _creationTime: number;
}) {
  return achievement.publishedAt ?? achievement._creationTime;
}

export type YearGroup<T> = { year: number; items: T[] };

/**
 * Groups stories into years, newest year first and newest story first inside
 * each year. The timeline reads as a descending legacy, so a row that arrives
 * out of order from Convex still lands in the right place.
 */
export function groupByYear<T extends { publishedAt?: number; _creationTime: number }>(
  achievements: T[]
): YearGroup<T>[] {
  const years = new Map<number, T[]>();

  for (const achievement of achievements) {
    const year = new Date(storyDate(achievement)).getFullYear();
    const bucket = years.get(year);
    if (bucket) bucket.push(achievement);
    else years.set(year, [achievement]);
  }

  return [...years.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, items]) => ({
      year,
      items: items.sort((a, b) => storyDate(b) - storyDate(a)),
    }));
}

/**
 * Case-insensitive match across the fields a visitor can actually see on a
 * card. The list is already in the browser, so this runs over the rendered
 * data rather than costing a round trip.
 */
export function matchesQuery(
  achievement: { title: string; description: string },
  query: string
) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return (
    achievement.title.toLowerCase().includes(needle) ||
    achievement.description.toLowerCase().includes(needle)
  );
}
