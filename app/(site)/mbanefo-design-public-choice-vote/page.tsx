import ShareStoryUrl from "@/components/ShareStoryUrl";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/motion-primitives";
import { VoteCountdown } from "@/components/vote/VoteCountdown";
import { VoteForm } from "@/components/vote/VoteForm";
import { VOTE_CLOSES_LABEL, VOTE_PATH, VOTE_TITLE } from "@/lib/vote";
import { Award, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

const description =
  "View all 10 designs, then vote for your favourite. One vote per person. Voting closes " +
  VOTE_CLOSES_LABEL +
  ".";

// The share image comes from opengraph-image.tsx and twitter-image.tsx in
// this folder; Next adds those tags itself.
export const metadata: Metadata = {
  title: { absolute: VOTE_TITLE },
  description,
  alternates: { canonical: VOTE_PATH },
  openGraph: {
    title: VOTE_TITLE,
    description,
    url: `https://dicom.gouni.edu.ng${VOTE_PATH}`,
    siteName: "DICOM GOUNI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: VOTE_TITLE,
    description,
  },
};

const rules = [
  "One vote per person, one design only.",
  "Team members may not vote for their own team.",
  "Fake accounts or repeat votes will be removed.",
];

export default function MbanefoVotePage() {
  return (
    <div className="min-h-screen bg-ink-900">
      <PageHero
        id="vote-heading"
        eyebrow="Public Choice Vote"
        title="Frank Mbanefo Design Competition"
        description="View all 10 designs using the links below, then vote for your favourite."
      >
        <div className="flex flex-col items-center gap-5">
          <VoteCountdown />
          <ShareStoryUrl
            path={VOTE_PATH}
            title="Frank Mbanefo Design Competition: Public Choice Vote"
            text="View all 10 designs and vote for your favourite."
            label="Share this vote"
            className="px-4 py-2 text-sm ring-1 ring-white/15"
          />
        </div>
      </PageHero>

      <section className="relative bg-ink-800 px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-14">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="edge-light relative rounded-3xl border border-white/10 bg-ink-700 p-6 shadow-card sm:p-8">
                <h2 className="font-display text-fluid-xl text-white">Rules</h2>
                <ul className="mt-5 space-y-3">
                  {rules.map((rule) => (
                    <li key={rule} className="flex gap-3 text-fluid-sm text-white/80">
                      <CheckCircle2
                        aria-hidden
                        className="mt-0.5 h-5 w-5 shrink-0 text-azure"
                      />
                      {rule}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex gap-3 rounded-2xl bg-gold/10 p-4 text-fluid-sm text-white/80 ring-1 ring-gold/25">
                  <Award aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <p>
                    This is a People&apos;s Choice award. The jury&apos;s scores
                    decide the official winners.
                  </p>
                </div>

                <p className="mt-6 font-display text-fluid-base text-white">
                  Good luck to all the teams!
                </p>
              </div>
            </Reveal>
          </aside>

          <div id="vote" className="scroll-mt-28">
            <VoteForm />
          </div>
        </div>
      </section>
    </div>
  );
}
