// convex/achievements.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getLatestAchievements = query({
  handler: async (ctx) => {
    const achievements = await ctx.db
      .query("achievements")
      .order("desc")
      .take(2); // Limit to the latest 2 entries

    const achievementsWithPhotos = await Promise.all(
      achievements.map(async (achievement) => {
        const photoUrl = !!achievement.photo
          ? await ctx.storage.getUrl(achievement.photo)
          : null;

        return {
          _id: achievement._id,
          title: achievement.title,
          description: achievement.description,
          slug: achievement.slug,
          date: achievement._creationTime,
          photoUrl,
        };
      })
    );

    return achievementsWithPhotos;
  },
});


export const getAllAchievements = query({
  handler: async (ctx) => {
    const achievements = await ctx.db
      .query("achievements")
      .order("desc")
      .collect();

    const achievementsWithPhotos = await Promise.all(
      achievements.map(async (achievement) => {
        const photoUrl = achievement.photo
          ? await ctx.storage.getUrl(achievement.photo)
          : null;

        // Omit the story field
        // Destructure with ignored variable pattern
        return {
          _id: achievement._id,
          date: achievement._creationTime,
          title: achievement.title,
          description: achievement.description,
          slug: achievement.slug,
          photoUrl,
        };
      })
    );

    return achievementsWithPhotos;
  },
});

// Query to get full achievement by slug
export const getAchievementBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const achievement = await ctx.db
      .query("achievements")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    if (!achievement) {
      throw new Error("Achievement not found");
    }

    const photoUrl = achievement.photo
      ? await ctx.storage.getUrl(achievement.photo)
      : null;

    return {
      ...achievement,
      photoUrl,
    };
  },
});

// convex/achievements.ts
export const createAchievement = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    slug: v.string(),
    story: v.optional(v.string()),
    photoStorageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("achievements", {
      title: args.title,
      description: args.description,
      slug: args.slug,
      story: args.story,
      photo: args.photoStorageId,
    });
  },
});
