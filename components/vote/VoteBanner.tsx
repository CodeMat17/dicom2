"use client";

import { VOTE_CLOSES_AT, VOTE_CLOSES_SHORT, VOTE_PATH } from "@/lib/vote";
import { ArrowRight, Trophy, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useMinute } from "./use-voting-open";

const DISMISS_KEY = "mbanefo-vote-banner-dismissed";

/**
 * Floating call-to-vote on every page except the vote page itself. It floats
 * rather than pushing the fixed navbar down, so no page layout shifts.
 * Dismissing it lasts for the browser session.
 */
export function VoteBanner() {
  const pathname = usePathname();
  const now = useMinute();
  const [dismissed, setDismissed] = useState(readDismissed);

  // `now` is null until hydration, so the banner never appears in the
  // prerendered HTML — a session that already dismissed it sees no flash.
  if (now === null || now >= VOTE_CLOSES_AT) return null;
  if (dismissed || pathname === VOTE_PATH) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Storage blocked: the banner stays hidden for this page view only.
    }
  };

  return (
    <aside
      aria-label="Public choice vote"
      className="fixed inset-x-4 bottom-4 z-40 animate-fade-up sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[24rem]"
    >
      <div className="glass edge-light relative flex items-center gap-3 rounded-2xl border border-gold/30 p-3 pr-10 shadow-lift">
        <span
          aria-hidden
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold"
        >
          <Trophy className="h-5 w-5" />
        </span>
        <Link href={VOTE_PATH} className="group min-w-0 flex-1">
          <span className="block text-sm font-semibold text-white">
            Public Choice Vote is open
          </span>
          <span className="flex items-center gap-1 text-xs text-white/70">
            Frank Mbanefo Design Competition · closes {VOTE_CLOSES_SHORT}
          </span>
          <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-gold">
            Vote now
            <ArrowRight
              aria-hidden
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </span>
        </Link>
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-2 top-2 rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X aria-hidden className="h-4 w-4" />
          <span className="sr-only">Dismiss vote banner</span>
        </button>
      </div>
    </aside>
  );
}

function readDismissed() {
  try {
    return typeof window !== "undefined" && sessionStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}
