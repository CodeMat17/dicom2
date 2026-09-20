// convex/gallery.ts
//
// Read-only mirror. Gallery records are created and edited from the DICOM
// dashboard, which owns the mutations; the public site only ever fetches.
import { v } from "convex/values";
import { Doc } from "./_generated/dataModel";
import { paginationOptsValidator } from "convex/server";
import { query, QueryCtx } from "./_generated/server";

/**
 * A gallery post carries a set of photographs. The files live in Cloudinary
 * and Convex holds the title, description, dimensions and published date.
 * Rows still pointing at a Convex file are resolved through storage until the
 * migration script copies them.
 *
 * The published date is derived — `publishedAt` when set, otherwise the row's
 * creation time — so nothing has to be entered by hand.
 */
export type GalleryImage = {
  url: string;
  publicId: string | null;
  width?: number;
  height?: number;
};

/**
 * The post's photos, newest schema first. Rows written before galleries went
 * multi-image carry a single Cloudinary URL — or, older still, a Convex file —
 * and are surfaced here as a one-entry list so every reader sees one shape.
 */
const resolveImages = async (
  ctx: QueryCtx,
  photo: Doc<"gallery">
): Promise<GalleryImage[]> => {
  if (photo.images?.length) {
    return photo.images.map((image) => ({
      url: image.url,
      publicId: image.publicId,
      width: image.width,
      height: image.height,
    }));
  }

  const legacyUrl =
    photo.imageUrl ??
    (photo.photo ? await ctx.storage.getUrl(photo.photo) : null);
  if (!legacyUrl) return [];

  return [
    {
      url: legacyUrl,
      publicId: photo.imagePublicId ?? null,
      width: photo.width,
      height: photo.height,
    },
  ];
};

export const getAllPhotos = query({
  handler: async (ctx) => {
    const photos = await ctx.db.query("gallery").order("desc").collect();

    const withUrls = await Promise.all(
      photos.map(async (photo) => {
        const images = await resolveImages(ctx, photo);
        return {
          _id: photo._id,
          title: photo.title,
          description: photo.description,
          category: photo.category,
          images,
          publishedAt: photo.publishedAt ?? photo._creationTime,
          // The first photo stands for the post wherever only one can be
          // shown — previews, link cards.
          photoUrl: images[0]?.url ?? null,
          width: images[0]?.width,
          height: images[0]?.height,
        };
      })
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
      photos.map(async (photo) => {
        const images = await resolveImages(ctx, photo);
        return {
          _id: photo._id,
          title: photo.title,
          description: photo.description,
          images,
          publishedAt: photo.publishedAt ?? photo._creationTime,
          photoUrl: images[0]?.url ?? null,
          width: images[0]?.width,
          height: images[0]?.height,
        };
      })
    );
  },
});

/**
 * Cursor-paginated feed for the public wall, newest first.
 *
 * Ordering is the table's own `_creationTime` descending rather than the
 * derived `publishedAt` that `getAllPhotos` sorts by: a cursor can only walk
 * an order the database itself maintains, and sorting in JS would only ever
 * reorder within a page, which reads as a bug. For a row whose `publishedAt`
 * was backdated by an editor the two differ — see the note in the gallery
 * container for the index that would close that gap.
 *
 * A page counts posts, not photographs, so a page of 18 posts can paint many
 * more tiles than that on the wall.
 */
export const getPhotosPaginated = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, { paginationOpts }) => {
    const page = await ctx.db
      .query("gallery")
      .order("desc")
      .paginate(paginationOpts);

    return {
      ...page,
      page: await Promise.all(
        page.page.map(async (photo) => {
          const images = await resolveImages(ctx, photo);
          return {
            _id: photo._id,
            title: photo.title,
            description: photo.description,
            category: photo.category,
            images,
            publishedAt: photo.publishedAt ?? photo._creationTime,
            photoUrl: images[0]?.url ?? null,
            width: images[0]?.width,
            height: images[0]?.height,
          };
        })
      ),
    };
  },
});

/**
 * Title search for the public wall.
 *
 * The wall itself is cursor-paginated, but a search has to reach posts that
 * have not been fetched yet, so this walks the table instead of the loaded
 * pages. Matching is on the title only — that is what the search box promises
 * — and every whitespace-separated term in the query must appear somewhere in
 * it, so "award 2024" narrows rather than widens.
 *
 * The result is capped: a one- or two-letter query would otherwise return the
 * whole table, and nobody scrolls past the first screen of matches anyway.
 */
export const searchPhotos = query({
  args: { term: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, { term, limit = 30 }) => {
    const terms = term.toLowerCase().split(/\s+/).filter(Boolean);
    if (terms.length === 0) return [];

    const photos = await ctx.db.query("gallery").order("desc").collect();

    const matches = photos.filter((photo) => {
      const title = photo.title.toLowerCase();
      return terms.every((word) => title.includes(word));
    });

    const withUrls = await Promise.all(
      matches.map(async (photo) => {
        const images = await resolveImages(ctx, photo);
        return {
          _id: photo._id,
          title: photo.title,
          description: photo.description,
          category: photo.category,
          images,
          publishedAt: photo.publishedAt ?? photo._creationTime,
          photoUrl: images[0]?.url ?? null,
          width: images[0]?.width,
          height: images[0]?.height,
        };
      })
    );

    return withUrls
      .sort((a, b) => b.publishedAt - a.publishedAt)
      .slice(0, limit);
  },
});
