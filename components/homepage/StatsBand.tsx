import { Award, Star, Trophy, Users, type LucideProps } from "lucide-react";
import type { ComponentType } from "react";
import type { AchievementStats } from "../achievements/AchievementStatScroller";
import { Counter } from "../ui/counter";
import { Reveal, Stagger } from "../ui/motion-primitives";

/**
 * The record, at full width.
 *
 * These four figures are the strongest thing the directorate has to say to a
 * visitor or a sponsor, and they used to sit in a narrow sidebar rail beside
 * the story cards. Given the whole band they read as a claim rather than as
 * metadata — and the counters have room to be the size the numbers deserve.
 *
 * <Counter> renders the final figure on the server and only animates once it
 * scrolls into view, so the numbers are in the HTML for crawlers and for
 * anyone who never runs the tick.
 */

type StatStyle = {
  Icon: ComponentType<LucideProps>;
  bg: string;
  text: string;
  ring: string;
};

const STAT_STYLES: Record<string, StatStyle> = {
  "National Champion": {
    Icon: Trophy,
    bg: "bg-gold/10",
    text: "text-gold",
    ring: "ring-gold/25",
  },
  "International Recognition": {
    Icon: Star,
    bg: "bg-azure/10",
    text: "text-azure",
    ring: "ring-azure/25",
  },
  "Students Winners": {
    Icon: Users,
    bg: "bg-emerald-400/10",
    text: "text-emerald-400",
    ring: "ring-emerald-400/25",
  },
  "University Awards": {
    Icon: Award,
    bg: "bg-purple-400/10",
    text: "text-purple-400",
    ring: "ring-purple-400/25",
  },
};

const FALLBACK = STAT_STYLES["National Champion"];

export function StatsBand({ stats }: { stats: AchievementStats }) {
  if (!stats) return null;

  const items = [
    { label: "National Champion", value: stats.nationalChampions },
    {
      label: "International Recognition",
      value: stats.internationalRecognition,
    },
    { label: "Students Winners", value: stats.studentWinners },
    { label: "University Awards", value: stats.universityAwards },
  ];

  return (
    <Reveal>
      <div className="edge-light relative overflow-hidden rounded-4xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] px-5 py-10 shadow-card sm:px-8 md:py-12">
        <div className="mb-8 flex items-center gap-3">
          <span
            aria-hidden
            className="h-px w-10 bg-gradient-to-r from-transparent to-gold"
          />
          <p className="eyebrow text-gold">By the numbers</p>
          <span
            aria-hidden
            className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/40"
          />
        </div>

        <Stagger
          as="ul"
          className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4"
          gap={0.1}
        >
          {items.map(({ label, value }) => {
            const { Icon, bg, text, ring } = STAT_STYLES[label] ?? FALLBACK;
            return (
              <Reveal key={label} as="li" variant="pop" className="group">
                <span
                  aria-hidden
                  className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl ${bg} ring-1 ${ring} transition-transform duration-500 ease-out-expo group-hover:scale-110`}
                >
                  <Icon className={`h-5 w-5 ${text}`} />
                </span>
                <p className="font-display text-fluid-3xl leading-none text-white">
                  <Counter value={value ?? 0} />
                </p>
                <p className={`mt-3 text-xs font-medium ${text}`}>{label}</p>
              </Reveal>
            );
          })}
        </Stagger>
      </div>
    </Reveal>
  );
}
