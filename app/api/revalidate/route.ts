import { CACHE_TAGS } from "@/lib/server-data";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * On-demand cache invalidation for the DICOM dashboard.
 *
 * Public pages are prerendered and refreshed on an hourly window, which keeps
 * every page view off the server. This is the escape hatch for an editor who
 * does not want to wait out that window: the dashboard calls it after a write
 * and the affected pages rebuild on the next request.
 *
 *   POST /api/revalidate?tag=achievements
 *   x-revalidate-secret: <REVALIDATE_SECRET>
 */
export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json(
      { revalidated: false, error: "Revalidation is not configured" },
      { status: 501 }
    );
  }

  if (request.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json(
      { revalidated: false, error: "Invalid secret" },
      { status: 401 }
    );
  }

  const tag = new URL(request.url).searchParams.get("tag");
  const tags = Object.values(CACHE_TAGS) as string[];

  if (tag && !tags.includes(tag)) {
    return NextResponse.json(
      { revalidated: false, error: `Unknown tag: ${tag}`, tags },
      { status: 400 }
    );
  }

  // No tag means the dashboard touched something broad — refresh everything.
  // "max" keeps serving the cached page while the rebuild happens behind it,
  // so an edit never makes a visitor wait on Convex.
  for (const name of tag ? [tag] : tags) revalidateTag(name, "max");

  return NextResponse.json({ revalidated: true, tags: tag ? [tag] : tags });
}
