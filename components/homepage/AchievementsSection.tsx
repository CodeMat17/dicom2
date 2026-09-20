import { ArrowUpRight, Trophy } from "lucide-react";
import Link from "next/link";
import AchievementCard from "../achievements/AchievementCard";
import {
  AchievementStatScroller,
  type AchievementStats,
} from "../achievements/AchievementStatScroller";
import {
  Aurora,
  Reveal,
  SectionHeading,
  Stagger,
} from "../ui/motion-primitives";
import type { Id } from "@/convex/_generated/dataModel";

export type LatestAchievement = {
  _id: Id<"achievements">;
  title: string;
  description: string;
  slug: string;
  date: number;
  photoUrl: string | null;
};

export function AchievementsSection({
  achievements,
  stats,
}: {
  achievements: LatestAchievement[];
  stats: AchievementStats;
}) {
  return (
    <section
      className="relative overflow-hidden bg-ink-800 py-28 grain md:py-36"
      aria-labelledby="achievements-heading"
    >
      <Aurora className="-left-40 top-0 h-[520px] w-[520px]" color="brand" />
      <Aurora
        className="-right-32 bottom-0 h-[420px] w-[420px]"
        color="azure"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="achievements-heading"
            eyebrow="Excellence"
            title="Our latest"
            accent="achievements"
            description="Celebrating the milestones and victories of our students on national and international stages."
          />

          <Reveal>
            <Link
              href="/achievements"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
            >
              View all achievements
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </Reveal>
        </div>

        <div className="lg:flex lg:gap-10">
          {/* Stats rail */}
          <Reveal className="mb-12 shrink-0 lg:mb-0 lg:w-72">
            <div className="edge-light relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 shadow-card lg:sticky lg:top-28">
              <div className="mb-6 flex items-center gap-3">
                <span
                  aria-hidden
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 ring-1 ring-gold/25"
                >
                  <Trophy className="h-5 w-5 text-gold" />
                </span>
                <div>
                  <p className="font-display text-base text-white">
                    By the numbers
                  </p>
                  <p className="eyebrow text-[10px] text-white/70">Statistics</p>
                </div>
              </div>
              <AchievementStatScroller stats={stats} />
            </div>
          </Reveal>

          {/* Grid */}
          <div className="flex-1">
            {achievements.length === 0 ? (
              <EmptyState />
            ) : (
              <Stagger
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
                gap={0.1}
              >
                {achievements.map((achievement) => (
                  <Reveal key={achievement._id} variant="card">
                    <AchievementCard
                      id={achievement._id}
                      index={0}
                      image={achievement.photoUrl || "/achievement.png"}
                      title={achievement.title}
                      desc={achievement.description}
                      date={achievement.date}
                      slug={achievement.slug}
                    />
                  </Reveal>
                ))}
              </Stagger>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 py-24 text-center">
      <span
        aria-hidden
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5"
      >
        <Trophy className="h-7 w-7 text-white/70" />
      </span>
      <p className="font-display text-fluid-lg text-white/70">
        No achievements recorded yet
      </p>
      <p className="mt-2 text-sm text-white/70">
        Check back soon — new stories are added regularly.
      </p>
    </div>
  );
}
