// convex/achievements.ts
import { paginationOptsValidator } from "convex/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export const getLatestAchievements = query({
  handler: async (ctx) => {
    const achievements = await ctx.db
      .query("achievements")
      .order("desc")
      .take(3); // Limit to the latest 2 entries

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
          _creationTime: achievement._creationTime,
        };
      })
    );

    return achievementsWithPhotos;
  },
});

// Query to get full achievement by slug
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

    try {
      const photoUrl = await ctx.storage.getUrl(achievement.photo);
      return {
        ...achievement,
        photoUrl: photoUrl || null,
      };
    } catch (error) {
      console.error("Error fetching image URL:", error);
      return {
        ...achievement,
        photoUrl: null,
      };
    }
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

export const addStory = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    slug: v.string(),
    story: v.optional(v.string()),
    photo: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    // Validate required fields
    if (!args.title.trim() || !args.slug.trim() || !args.photo) {
      throw new Error("Title, slug, and photo are required");
    }

    // Check for existing story with the same slug
    const existing = await ctx.db
      .query("achievements")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (existing) {
      throw new Error(`Slug "${args.slug}" already exists`);
    }

    // Create the new achievement
    const achievementId = await ctx.db.insert("achievements", {
      title: args.title,
      description: args.description,
      slug: args.slug,
      story: args.story?.trim() || undefined,
      photo: args.photo,
    });

    return achievementId;
  },
});

export const deleteAchievement = mutation({
  args: {
    id: v.id("achievements"),
  },
  handler: async (ctx, args) => {
    // Get the achievement first to access the storage ID
    const achievement = await ctx.db.get(args.id);

    if (!achievement) {
      throw new Error("Achievement not found");
    }

    // Delete associated storage file if exists
    if (achievement.photo) {
      await ctx.storage.delete(achievement.photo);
    }

    // Delete the database record
    await ctx.db.delete(args.id);

    return {
      success: true,
      deletedId: args.id,
      deletedPhoto: achievement.photo || null,
    };
  },
});

export const updateAchievement = mutation({
  args: {
    id: v.id("achievements"),
    title: v.string(),
    slug: v.string(),
    description: v.string(),
    story: v.optional(v.string()),
    photo: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (!existing) {
      throw new Error("Achievement not found");
    }

    // Clean up previous photo if changed
    if (existing.photo !== args.photo) {
      await ctx.storage.delete(existing.photo).catch((error) => {
        console.error("Failed to delete old photo:", error);
      });
    }

    // Perform the update
    return ctx.db.patch(args.id, {
      title: args.title.trim(),
      slug: args.slug.toLowerCase().trim(),
      description: args.description.trim(),
      story: args.story?.trim(),
      photo: args.photo,
    });
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

    // Add photo URLs to the results
    const resultsWithPhotos = await Promise.all(
      paginatedResults.page.map(async (achievement) => {
        const photoUrl = achievement.photo
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

    return {
      ...paginatedResults,
      page: resultsWithPhotos,
    };
  },
});

export const getPaginatedAchievements = query({
  args: {
    limit: v.number(),
    cursor: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { limit, cursor } = args;

    // Start the query
    let queryBuilder = ctx.db.query("achievements").order("desc");

    // Apply cursor if provided
    if (cursor) {
      queryBuilder = queryBuilder.filter((q) =>
        q.lt(q.field("_id"), cursor as Id<"achievements">)
      );
    }

    // Execute query with limit
    const achievements = await queryBuilder.take(limit + 1);

    // Check if there are more items
    const hasNextPage = achievements.length > limit;
    const items = hasNextPage ? achievements.slice(0, -1) : achievements;

    // Add photo URLs to the results
    const achievementsWithPhotos = await Promise.all(
      items.map(async (achievement) => {
        const photoUrl = achievement.photo
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

    // Get total count for pagination info
    const totalCount = await ctx.db
      .query("achievements")
      .collect()
      .then((r) => r.length);

    return {
      items: achievementsWithPhotos,
      pageInfo: {
        hasNextPage,
        totalCount,
        nextCursor: hasNextPage ? items[items.length - 1]._id.toString() : null,
      },
    };
  },
});

export const getAllAchievementsWithPhotos = query({
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
