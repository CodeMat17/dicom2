import { query } from "./_generated/server";

export const getTestimonials = query({
  handler: async (ctx) => {
    return await ctx.db.query("testimonials").collect();
  },
});