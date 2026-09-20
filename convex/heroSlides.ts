// convex/heroSlides.ts
//
// Read-only mirror. Writes live in the DICOM dashboard.
import { query } from "./_generated/server";

export const getHeroSlides = query({
  handler: async (ctx) => {
    const slides = await ctx.db.query("heroSlides").collect();

    const slidesWithUrls = await Promise.all(
      slides.map(async (slide) => {
        // Cloudinary first; fall back to the legacy Convex file for rows the
        // migration has not copied across yet.
        const imgUrl =
          slide.imageUrl ??
          (slide.img ? await ctx.storage.getUrl(slide.img) : null);

        return {
          _id: slide._id,
          title: slide.title,
          subtitle: slide.subtitle,
          alt: slide.title,
          img: slide.img,
          imgUrl,
        };
      })
    );
    return slidesWithUrls;
  },
});
