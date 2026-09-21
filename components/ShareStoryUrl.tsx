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

    // The share sheet only exists in secure contexts, and some desktop
    // browsers expose it but refuse to open it — fall through to copying.
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
        return;
      } catch (error) {
        // A user-cancelled share is not an error worth surfacing.
        if ((error as Error)?.name === "AbortError") return;
      }
    }

    if (await copyToClipboard(shareUrl)) {
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } else {
      // Nothing worked: hand the link over so it can be copied by hand.
      toast("Copy this link to share", { description: shareUrl });
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label={`Share ${title}`}
      className={cn(
        "group/share inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium text-white/70 transition-colors duration-300 hover:bg-white/5 hover:text-white",
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

/**
 * The async clipboard API is missing outside secure contexts (e.g. a phone
 * testing over the LAN), so fall back to the legacy copy command.
 */
async function copyToClipboard(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Permission denied — try the legacy route below.
  }

  try {
    const area = document.createElement("textarea");
    area.value = value;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

export default ShareStoryUrl;
