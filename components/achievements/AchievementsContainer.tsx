import {
  Award,
  Mail,
  Star,
  Trophy,
  Users,
  type LucideProps,
} from "lucide-react";
import Link from "next/link";
import type { ComponentType } from "react";
import { Aurora, Reveal, Stagger } from "../ui/motion-primitives";
import { Counter } from "../ui/counter";
import { CtaBand, GoldButton, PageHero } from "../ui/page-hero";
import AchievementsGrid, { type GridAchievement } from "./AchievementsGrid";
import type { AchievementStats } from "./AchievementStatScroller";

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

export default function AchievementsContainer({
  achievements,
  stats,
}: {
  achievements: GridAchievement[];
  stats: AchievementStats;
}) {
  const statItems = stats
    ? [
        { label: "National Champion", value: stats.nationalChampions },
        {
          label: "International Recognition",
          value: stats.internationalRecognition,
        },
        { label: "Students Winners", value: stats.studentWinners },
        { label: "University Awards", value: stats.universityAwards },
      ]
    : [];

  return (
    <div className="min-h-screen bg-ink-900">
      <PageHero
        id="achievements-heading"
        eyebrow="Excellence"
        title="Our"
        accent="Achievements"
        description="Celebrating excellence and milestones in academic competition and student development."
      />

      {/* Stats */}
      <section
        className="relative overflow-hidden bg-ink-800 px-5 py-20 grain sm:px-6"
        aria-labelledby="stats-heading"
      >
        <Aurora className="-right-40 top-0 h-[420px] w-[420px]" color="azure" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <h2 id="stats-heading" className="sr-only">
            Achievement statistics
          </h2>

          {statItems.length > 0 && (
            <Stagger
              as="ul"
              className="grid grid-cols-2 gap-4 md:grid-cols-4"
              gap={0.1}
            >
              {statItems.map(({ label, value }) => {
                const { Icon, bg, text, ring } = STAT_STYLES[label] ?? FALLBACK;
                return (
                  <Reveal
                    key={label}
                    as="li"
                    variant="card"
                    className="group edge-light spotlight relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 text-center shadow-card transition-all duration-500 ease-out-quint hover:-translate-y-1.5 hover:border-white/25 hover:shadow-lift"
                  >
                    <span
                      aria-hidden
                      className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${bg} ring-1 ${ring} transition-transform duration-500 ease-out-expo group-hover:scale-110`}
                    >
                      <Icon className={`h-5 w-5 ${text}`} />
                    </span>
                    <p className="font-display text-4xl leading-none text-white">
                      <Counter value={value ?? 0} />
                    </p>
                    <p className={`mt-2.5 text-xs font-medium ${text}`}>
                      {label}
                    </p>
                  </Reveal>
                );
              })}
            </Stagger>
          )}
        </div>
      </section>

      {/* Grid */}
      <section
        className="relative bg-ink-900 px-5 py-24 sm:px-6"
        aria-labelledby="stories-heading"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-center gap-4">
            <h2
              id="stories-heading"
              className="font-display text-fluid-xl text-white"
            >
              All stories
            </h2>
            <span
              aria-hidden
              className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent"
            />
          </div>

          {achievements.length === 0 ? (
            <div className="flex flex-col items-center rounded-3xl border border-dashed border-white/10 py-24 text-center">
              <span
                aria-hidden
                className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5"
              >
                <Trophy className="h-7 w-7 text-white/70" />
              </span>
              <p className="font-display text-fluid-lg text-white/70">
                No achievements recorded yet
              </p>
            </div>
          ) : (
            <AchievementsGrid achievements={achievements} />
          )}
        </div>
      </section>

      <CtaBand
        title="Be part of our"
        accent="success story"
        description="Partner with DICOM and be part of our growing story of academic excellence."
      >
        <GoldButton href="mailto:dicom@gouni.edu.ng">
          <Mail aria-hidden className="h-4 w-4" />
          Get involved
        </GoldButton>
        <Link
          href="/partnership"
          className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-medium text-white transition-all duration-300 hover:border-white/50 hover:bg-white/10"
        >
          Explore partnership
        </Link>
      </CtaBand>
    </div>
  );
}
