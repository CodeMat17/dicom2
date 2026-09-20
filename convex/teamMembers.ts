// convex/teamMembers.ts
//
// Read-only mirror. Writes live in the DICOM dashboard.
import { Doc } from "./_generated/dataModel";
import { query } from "./_generated/server";

export type Staff = Doc<"teamMembers">;

export const getTeam = query({
  handler: async (ctx) => {
    const [directorResult, staff] = await Promise.all([
      ctx.db
        .query("teamMembers")
        .withIndex("by_role", (q) => q.eq("role", "director"))
        .first(),

      ctx.db
        .query("teamMembers")
        .withIndex("by_role", (q) => q.eq("role", "staff"))
        .collect(),
    ]);

    // Cloudinary first, legacy Convex file as the fallback.
    const resolveImageUrl = async (member: Staff) => ({
      ...member,
      imageUrl:
        member.imageUrl ??
        (member.image ? await ctx.storage.getUrl(member.image) : null),
    });

    const director = directorResult
      ? await resolveImageUrl(directorResult)
      : null;

    const staffWithImages = await Promise.all(staff.map(resolveImageUrl));

    return {
      director,
      staff: staffWithImages,
    };
  },
});
