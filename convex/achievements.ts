// convex/achievements.ts
//
// Read-only mirror. Stories are created and edited from the DICOM dashboard,
// which owns the mutations; the public site only ever fetches.
import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";
import { query, QueryCtx } from "./_generated/server";

/**
 * Cover photos live in Cloudinary. Rows written before the move still point
 * at a Convex file, so reads resolve Cloudinary first and fall back to
 * storage until the dashboard's migration script has copied them over.
 */
const resolvePhotoUrl = async (
  ctx: QueryCtx,
  achievement: Doc<"achievements">
) =>
  achievement.imageUrl ??
  (achievement.photo ? await ctx.storage.getUrl(achievement.photo) : null);

export const getLatestAchievements = query({
  handler: async (ctx) => {
    const achievements = await ctx.db
      .query("achievements")
      .order("desc")
      .take(3);

    return await Promise.all(
      achievements.map(async (achievement) => ({
        _id: achievement._id,
        title: achievement.title,
        description: achievement.description,
        slug: achievement.slug,
        date: achievement._creationTime,
        publishedAt: achievement.publishedAt,
        photoUrl: await resolvePhotoUrl(ctx, achievement),
      }))
    );
  },
});

export const getAllAchievements = query({
  handler: async (ctx) => {
    const achievements = await ctx.db
      .query("achievements")
      .order("desc")
      .collect();

    return await Promise.all(
      achievements.map(async (achievement) => ({
        _id: achievement._id,
        date: achievement._creationTime,
        title: achievement.title,
        description: achievement.description,
        slug: achievement.slug,
        photoUrl: await resolvePhotoUrl(ctx, achievement),
        publishedAt: achievement.publishedAt,
        _creationTime: achievement._creationTime,
      }))
    );
  },
});

export const getAchievementBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const achievement = await ctx.db
      .query("achievements")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!achievement) {
      return null;
    }

    return {
      ...achievement,
      photoUrl: await resolvePhotoUrl(ctx, achievement),
    };
  },
});

export const achievementsPaginated = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, { paginationOpts }) => {
    const paginatedResults = await ctx.db
      .query("achievements")
      .order("desc")
      .paginate(paginationOpts);

    const resultsWithPhotos = await Promise.all(
      paginatedResults.page.map(async (achievement) => ({
        _id: achievement._id,
        title: achievement.title,
        description: achievement.description,
        slug: achievement.slug,
        date: achievement._creationTime,
        photoUrl: await resolvePhotoUrl(ctx, achievement),
      }))
    );

    return {
      ...paginatedResults,
      page: resultsWithPhotos,
    };
  },
});

export const getAllAchievementsWithPhotos = query({
  handler: async (ctx) => {
    const achievements = await ctx.db
      .query("achievements")
      .order("desc")
      .collect();

    return await Promise.all(
      achievements.map(async (achievement) => ({
        _id: achievement._id,
        title: achievement.title,
        description: achievement.description,
        slug: achievement.slug,
        date: achievement.publishedAt,
        photoUrl: await resolvePhotoUrl(ctx, achievement),
      }))
    );
  },
});
