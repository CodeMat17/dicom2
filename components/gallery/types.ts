import type { Id } from "@/convex/_generated/dataModel";

/** Shape returned by `api.gallery.getAllPhotos`. */
export type GalleryPhoto = {
  _id: Id<"gallery">;
  title: string;
  description: string;
  category?: string;
  width?: number;
  height?: number;
  publishedAt: number;
  photoUrl: string | null;
};

export type Orientation = "all" | "portrait" | "landscape";
