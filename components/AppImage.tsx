"use client";

import Image, { type ImageProps } from "next/image";
import { cloudinaryLoader, isCloudinaryUploadUrl } from "@/lib/cloudinary-image";

/**
 * Drop-in replacement for `next/image`.
 *
 * Cloudinary uploads are resized and converted by Cloudinary itself. Every other
 * source (files in /public, images still on Convex storage from before the
 * Cloudinary move) keeps going through Next's built-in optimiser, so nothing
 * that worked before changes. A global `loaderFile` is deliberately not used:
 * it switches off `/_next/image` for the whole app, which would break those.
 */
export default function AppImage(props: ImageProps) {
  const { src, loader, unoptimized } = props;
  const useCloudinary =
    !loader && !unoptimized && typeof src === "string" && isCloudinaryUploadUrl(src);

  // eslint-disable-next-line jsx-a11y/alt-text -- alt is required by ImageProps and passed through
  return <Image {...props} loader={useCloudinary ? cloudinaryLoader : loader} />;
}
