"use client";

import { cn } from "@/lib/utils";
import { Check, Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  title: string;
  text: string;
  /** Slug of an achievement story. Ignored when `path` is supplied. */
  slug?: string;
  /** Absolute site path to share instead, e.g. `/gallery?photo=abc`. */
  path?: string;
  label?: string;
  className?: string;
};

const ShareStoryUrl = ({ title, text, slug, path, label, className }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const target = path ?? `/achievements/${slug}`;
    const shareUrl = `${window.location.origin}${target}`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
      } catch (error) {
        // A user-cancelled share is not an error worth surfacing.
        if ((error as Error)?.name !== "AbortError") {
          console.error("Error sharing:", error);
        }
      }
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast.success("Link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={`Share ${title}`}
      className={cn(
        "group/share inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium text-white/45 transition-colors duration-300 hover:bg-white/5 hover:text-white",
        className
      )}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
      ) : (
        <Share2 className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover/share:scale-110" />
      )}
      {copied ? "Copied" : (label ?? "Share")}
    </button>
  );
};

export default ShareStoryUrl;
