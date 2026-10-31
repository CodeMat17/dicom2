"use client";

import { VOTE_EMBED_URL, VOTE_FORM_URL } from "@/lib/vote";
import { ArrowUpRight, Lock } from "lucide-react";
import { useRef } from "react";
import { useVotingOpen } from "./use-voting-open";

/**
 * The Google Form, embedded.
 *
 * The form is public (no Google sign-in), which is what lets it run inside an
 * iframe on Safari and other browsers that block third-party cookies. The
 * "open in a new tab" link above the frame is the escape hatch for anything
 * that still refuses it — a strict content blocker, a flaky connection, or
 * the form later being switched to require sign-in.
 */
export function VoteForm() {
  const open = useVotingOpen();
  const frameRef = useRef<HTMLIFrameElement>(null);

  if (!open) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/15 bg-ink-700/60 px-6 py-20 text-center">
        <span
          aria-hidden
          className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5"
        >
          <Lock className="h-7 w-7 text-white/70" />
        </span>
        <p className="font-display text-fluid-xl text-white">
          Voting has closed
        </p>
        <p className="mt-3 max-w-sm text-fluid-sm text-white/70 text-pretty">
          Thank you to everyone who voted. Results will be announced by the
          Directorate of Competitions.
        </p>
      </div>
    );
  }

  // A cross-origin frame can't be measured, so it has a fixed height. After
  // the vote is submitted Google swaps in a short confirmation page at the
  // top of the frame while the visitor is still scrolled down by the submit
  // button — bring the top of the frame back into view so they see it.
  const handleLoad = () => {
    const frame = frameRef.current;
    if (frame && frame.getBoundingClientRect().top < 0) {
      frame.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/70">
        <span>Form not loading or hard to use?</span>
        <a
          href={VOTE_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1.5 font-semibold text-azure transition-colors hover:text-white"
        >
          Open it in a new tab
          <ArrowUpRight
            aria-hidden
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-ink-700 shadow-card">
        {/* Sits behind the frame; Google's own page background covers it
            once the form paints, so no load state has to be tracked. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 flex flex-col gap-4 p-6"
        >
          <div className="h-28 animate-pulse rounded-2xl bg-white/[0.06]" />
          <div className="h-48 animate-pulse rounded-2xl bg-white/[0.05]" />
          <div className="h-96 animate-pulse rounded-2xl bg-white/[0.04]" />
        </div>

        <iframe
          ref={frameRef}
          src={VOTE_EMBED_URL}
          title="Frank Mbanefo Design Competition public choice voting form"
          onLoad={handleLoad}
          className="relative block h-[2500px] w-full sm:h-[2150px] lg:h-[1950px]"
        />
      </div>
    </div>
  );
}
