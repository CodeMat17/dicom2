"use client";

import { VOTE_CLOSES_AT } from "@/lib/vote";
import { useSyncExternalStore, type ReactNode } from "react";

const MINUTE = 60_000;

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 15_000);
  return () => clearInterval(id);
}

/**
 * The current time rounded down to the minute, or null while prerendering and
 * hydrating. Rounding keeps the snapshot stable between ticks, which
 * useSyncExternalStore requires.
 */
export function useMinute(): number | null {
  return useSyncExternalStore(
    subscribe,
    () => Math.floor(Date.now() / MINUTE) * MINUTE,
    () => null
  );
}

/**
 * The site is static and only rebuilt by the dashboard, so the deadline has to
 * be checked in the browser. The prerendered HTML assumes voting is open (it
 * is built while the vote runs) and the client corrects it on hydration.
 */
export function useVotingOpen(): boolean {
  const now = useMinute();
  return now === null || now < VOTE_CLOSES_AT;
}

/** Renders its children only while voting is open. */
export function WhileVotingOpen({ children }: { children: ReactNode }) {
  return useVotingOpen() ? children : null;
}
