"use client";

import { VOTE_CLOSES_AT, VOTE_CLOSES_LABEL } from "@/lib/vote";
import { Clock } from "lucide-react";
import { useMinute } from "./use-voting-open";

export function VoteCountdown() {
  const now = useMinute();
  const closed = now !== null && now >= VOTE_CLOSES_AT;

  return (
    <div className="inline-flex flex-col items-center gap-2">
      <p
        className={
          closed
            ? "inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 text-sm font-semibold text-white/70 ring-1 ring-white/15"
            : "inline-flex items-center gap-2 rounded-full bg-gold/15 px-4 py-2 text-sm font-semibold text-gold ring-1 ring-gold/30"
        }
      >
        <span
          aria-hidden
          className={closed ? "h-2 w-2 rounded-full bg-white/40" : "h-2 w-2 animate-pulse rounded-full bg-gold"}
        />
        {closed ? "Voting has closed" : "Voting is open"}
        {/* The relative time only exists once the clock is known on the client. */}
        {now !== null && !closed && (
          <span className="font-normal text-white/70">
            · {formatRemaining(VOTE_CLOSES_AT - now)} left
          </span>
        )}
      </p>
      <p className="flex items-center gap-1.5 text-sm text-white/70">
        <Clock aria-hidden className="h-3.5 w-3.5" />
        {closed ? "Closed" : "Closes"} {VOTE_CLOSES_LABEL}
      </p>
    </div>
  );
}

function formatRemaining(ms: number) {
  const minutes = Math.max(0, Math.floor(ms / 60_000));
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const mins = minutes % 60;
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}
