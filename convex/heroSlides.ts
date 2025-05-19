import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getHeroSlides = query({
  handler: async (ctx) => {
    const hero = await ctx.db.query("heroSlides").order("asc").collect();

    const heroUrls = await Promise.all(
      hero.map(async (heroSlider) => {
        const imgUrl = heroSlider.img
          ? await ctx.storage.getUrl(heroSlider.img)
          : null;

        return {
          ...heroSlider,
          imgUrl,
        };
      })
    );
    return heroUrls;
  },
});

export const addHeroSlide = mutation({
  args: {
    img: v.id("_storage"),
    alt: v.string(),
    title: v.string(),
    subtitle: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("heroSlides", args);
  },
});

export const deleteHeroSlide = mutation({
  args: {
    id: v.id("heroSlides"),
  },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});