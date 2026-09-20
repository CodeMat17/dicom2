// convex/collaborators.ts
//
// Read-only mirror. Writes live in the DICOM dashboard.
import { query } from "./_generated/server";

export const getCollaborators = query({
  handler: async (ctx) => {
    const collabo = await ctx.db.query("collaborators").order("asc").collect();

    const collaboUrls = await Promise.all(
      collabo.map(async (collab) => {
        // Cloudinary first, legacy Convex file as the fallback.
        const imgUrl =
          collab.imageUrl ??
          (collab.logo ? await ctx.storage.getUrl(collab.logo) : null);

        return {
          ...collab,
          imgUrl,
        };
      })
    );
    return collaboUrls;
  },
});
