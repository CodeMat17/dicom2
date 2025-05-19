import { query } from "./_generated/server";

export const getCollaborators = query({
  handler: async (ctx) => {
    const collabo = await ctx.db.query("collaborators").order("asc").collect();

    const collaboUrls = await Promise.all(
      collabo.map(async (collab) => {
        const imgUrl = collab.logo
          ? await ctx.storage.getUrl(collab.logo)
          : null;

        return {
          ...collab,
          imgUrl,
        };
      })
    );
    return collaboUrls;
  },
});
