import { VOTE_CLOSES_LABEL, VOTE_PATH } from "@/lib/vote";
import { ArrowRight } from "lucide-react";
import { GoldButton } from "../ui/page-hero";
import { Reveal } from "../ui/motion-primitives";
import { WhileVotingOpen } from "../vote/use-voting-open";

/** Homepage band for the public vote; disappears once voting closes. */
export function VotePromoSection() {
  return (
    <WhileVotingOpen>
      <section
        className="relative bg-ink-900 px-5 py-16 sm:px-6 md:py-20"
        aria-labelledby="vote-promo-heading"
      >
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="edge-light relative overflow-hidden rounded-4xl border border-gold/25 bg-gradient-to-br from-brand via-ink-700 to-ink-800 px-6 py-12 text-center shadow-lift sm:px-10 md:px-16 md:py-16">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/15 blur-[80px]"
              />
              <p className="eyebrow relative flex items-center justify-center gap-2 text-gold">
                <span aria-hidden className="h-2 w-2 animate-pulse rounded-full bg-gold" />
                Voting is open
              </p>
              <h2
                id="vote-promo-heading"
                className="relative mt-4 font-display text-fluid-2xl leading-tight text-white text-balance"
              >
                Frank Mbanefo Design Competition:{" "}
                <span className="text-shine">Public Choice Vote</span>
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-fluid-base text-white/70 text-pretty">
                View all 10 designs, then vote for your favourite. Closes{" "}
                {VOTE_CLOSES_LABEL}.
              </p>
              <div className="relative mt-8 flex justify-center">
                <GoldButton href={VOTE_PATH}>
                  Cast your vote
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </GoldButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </WhileVotingOpen>
  );
}
