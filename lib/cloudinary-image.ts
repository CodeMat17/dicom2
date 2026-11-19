import type { ImageLoaderProps } from "next/image";

/**
 * Cloudinary delivery URLs look like
 *   https://res.cloudinary.com/<cloud>/image/upload/[<transforms>/...][v<version>/]<public_id>.<ext>
 * Only plain `image/upload` assets are rewritten. Anything else (fetch, private
 * or authenticated delivery, video, other hosts) is left to Next's optimiser.
 */
const UPLOAD_URL = /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)([^?#]+)$/;

/** Cloudinary transformation parameter keys, so a folder name is never mistaken for one. */
const TRANSFORM_KEYS = new Set([
  "a", "ac", "af", "ar", "b", "bo", "br", "c", "co", "cs", "d", "dl", "dn",
  "dpr", "du", "e", "eo", "f", "fl", "fn", "fps", "g", "h", "ki", "l", "o",
  "p", "pg", "q", "r", "so", "sp", "t", "u", "vc", "vs", "w", "x", "y", "z",
]);

function isTransformSegment(segment: string): boolean {
  return segment.split(",").every((part) => {
    const key = part.split("_", 1)[0];
    return part.includes("_") && (TRANSFORM_KEYS.has(key) || key.startsWith("$"));
  });
}

export function isCloudinaryUploadUrl(src: string): boolean {
  return UPLOAD_URL.test(src);
}

/**
 * Has Cloudinary resize and re-encode the image (AVIF/WebP via f_auto) and
 * serve it from its CDN, instead of routing it through `/_next/image`.
 * `c_limit` never upscales past the original.
 */
export function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  const match = src.match(UPLOAD_URL);
  if (!match) return src;

  const [, base, rest] = match;
  const ours = ["f_auto", "c_limit", `w_${width}`, quality ? `q_${quality}` : "q_auto"].join(",");

  // Transformations already baked into a stored URL keep running first; ours
  // are chained after them and before the version / public id.
  const segments = rest.split("/");
  let i = 0;
  while (i < segments.length - 1 && isTransformSegment(segments[i])) i++;
  segments.splice(i, 0, ours);

  return base + segments.join("/");
}
