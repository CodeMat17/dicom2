import type { Id } from "@/convex/_generated/dataModel";

/** One photograph belonging to a post. */
export type GalleryImage = {
  url: string;
  publicId: string | null;
  width?: number;
  height?: number;
};

/** Shape returned by `api.gallery.getAllPhotos` / `getPhotosPaginated`. */
export type GalleryPhoto = {
  _id: Id<"gallery">;
  title: string;
  description: string;
  category?: string;
  publishedAt: number;
  /** Every photograph in the post, cover first. */
  images: GalleryImage[];
  /** The cover, repeated here for readers that can only show one. */
  photoUrl: string | null;
  width?: number;
  height?: number;
};
