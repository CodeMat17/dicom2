import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Get all statistics
export const getAchievementsStats = query({
  handler: async (ctx) => {
    return await ctx.db.query("achievementsStats").first();
  },
});

export const updateAchievementsStats = mutation({
  args: {
    nationalChampions: v.optional(v.number()),
    internationalRecognition: v.optional(v.number()),
    studentWinners: v.optional(v.number()),
    universityAwards: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const currentStats = await ctx.db.query("achievementsStats").first();

    if (!currentStats) {
      return await ctx.db.insert("achievementsStats", {
        nationalChampions: 5,
        internationalRecognition: 2,
        studentWinners: 39,
        universityAwards: 5,
      });
    }

    return await ctx.db.patch(currentStats._id, {
      nationalChampions:
        args.nationalChampions ?? currentStats.nationalChampions,
      internationalRecognition:
        args.internationalRecognition ?? currentStats.internationalRecognition,
      studentWinners: args.studentWinners ?? currentStats.studentWinners,
      universityAwards: args.universityAwards ?? currentStats.universityAwards,
    });
  },
});