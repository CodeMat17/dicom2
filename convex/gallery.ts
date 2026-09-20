// convex/gallery.ts
//
// Read-only mirror. Gallery records are created and edited from the DICOM
// dashboard, which owns the mutations; the public site only ever fetches.
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";
import { query, QueryCtx } from "./_generated/server";

/**
 * The files live in Cloudinary and Convex holds the title, description,
 * dimensions and published date. Rows still pointing at a Convex file are
 * resolved through storage until the migration script copies them.
 *
 * The published date is derived — `publishedAt` when set, otherwise the row's
 * creation time — so nothing has to be entered by hand.
 */
const resolvePhotoUrl = async (ctx: QueryCtx, photo: Doc<"gallery">) =>
  photo.imageUrl ?? (photo.photo ? await ctx.storage.getUrl(photo.photo) : null);

export const getAllPhotos = query({
  handler: async (ctx) => {
    const photos = await ctx.db.query("gallery").order("desc").collect();

    const withUrls = await Promise.all(
      photos.map(async (photo) => ({
        _id: photo._id,
        title: photo.title,
        description: photo.description,
        category: photo.category,
        width: photo.width,
        height: photo.height,
        publishedAt: photo.publishedAt ?? photo._creationTime,
        photoUrl: await resolvePhotoUrl(ctx, photo),
      }))
    );

    // Newest first, honouring a backdated publish date over insertion order.
    return withUrls.sort((a, b) => b.publishedAt - a.publishedAt);
  },
});

export const getLatestPhotos = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit = 6 }) => {
    const photos = await ctx.db.query("gallery").order("desc").take(limit);

    return await Promise.all(
      photos.map(async (photo) => ({
        _id: photo._id,
        title: photo.title,
        description: photo.description,
        width: photo.width,
        height: photo.height,
        publishedAt: photo.publishedAt ?? photo._creationTime,
        photoUrl: await resolvePhotoUrl(ctx, photo),
      }))
    );
  },
});
