import { isKnownTag } from "@/lib/server-data";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

/**
 * On-demand cache invalidation for the DICOM dashboard.
 *
 * Public pages are prerendered and never expire on their own, so this is the
 * only way an edit reaches them: the dashboard calls it after a write and the
 * affected pages rebuild on their next request.
 *
 *   POST /api/revalidate?tag=achievements&tag=achievement:<slug>
 *   x-revalidate-secret: <REVALIDATE_SECRET>
 *
 * At least one tag is required. There is no "refresh everything" fallback —
 * that would rewrite the whole site, and no single edit needs it.
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

  const tags = [...new Set(new URL(request.url).searchParams.getAll("tag"))];

  if (tags.length === 0) {
    return NextResponse.json(
      { revalidated: false, error: "At least one tag is required" },
      { status: 400 }
    );
  }

  const unknown = tags.filter((tag) => !isKnownTag(tag));
  if (unknown.length > 0) {
    return NextResponse.json(
      { revalidated: false, error: `Unknown tag: ${unknown.join(", ")}` },
      { status: 400 }
    );
  }

  // "max" keeps serving the cached page while the rebuild happens behind it,
  // so an edit never makes a visitor wait on Convex.
  for (const tag of tags) revalidateTag(tag, "max");

  return NextResponse.json({ revalidated: true, tags });
}
