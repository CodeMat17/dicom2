// The Frank Mbanefo Design Competition public vote. Everything that promotes
// it — the page, the navbar pill, the homepage band and the floating banner —
// reads from here, so the campaign is switched off by one date.

export const VOTE_PATH = "/mbanefo-design-public-choice-vote";

export const VOTE_TITLE =
  "FRANK MBANEFO DESIGN COMPETITION: PUBLIC CHOICE VOTE";

// Resolved from https://forms.gle/p2YTUkhgqiASrcNAA. The short link cannot be
// embedded; only the full viewform URL accepts `embedded=true`.
export const VOTE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSd7HVCmZ2lJJxQ76sauOrq-IAb5c2qW_EFJxpJm2nASPwTTiA/viewform";

export const VOTE_EMBED_URL = `${VOTE_FORM_URL}?embedded=true`;

/** Voting closes at the end of 10 November 2026, West Africa Time. */
export const VOTE_CLOSES_AT = Date.parse("2026-11-10T23:59:00+01:00");

export const VOTE_CLOSES_LABEL = "Tuesday, 10 November 2026 · 11:59 PM WAT";
export const VOTE_CLOSES_SHORT = "10 Nov";
