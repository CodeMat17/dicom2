"use client";

import { api } from "@/convex/_generated/api";
import { cardRise, stagger } from "@/lib/motion";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { ArrowUpRight, Trophy } from "lucide-react";
import Link from "next/link";
import AchievementCard from "../achievements/AchievementCard";
import { AchievementStatScroller } from "../achievements/AchievementStatScroller";
import {
  Aurora,
  Reveal,
  SectionHeading,
  Stagger,
} from "../ui/motion-primitives";

function AchievementsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="shimmer overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]"
        >
          <div className="aspect-[16/10] bg-white/[0.06]" />
          <div className="space-y-3 p-5">
            <div className="h-5 w-4/5 rounded-lg bg-white/[0.06]" />
            <div className="h-3 w-full rounded bg-white/[0.06]" />
            <div className="h-3 w-2/3 rounded bg-white/[0.06]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function AchievementsSection() {
  const achievements = useQuery(api.achievements.getLatestAchievements);

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
            eyebrow="Excellence"
            title="Our latest"
            accent="achievements"
            description="Celebrating the milestones and victories of our students on national and international stages."
          />

          <Reveal>
            <Link
              href="/achievements"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-gold/50 hover:bg-gold/10 hover:text-gold"
            >
              View all
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="lg:flex lg:gap-10">
          {/* Stats rail */}
          <Reveal className="mb-12 shrink-0 lg:mb-0 lg:w-72">
            <div className="edge-light relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-6 shadow-card lg:sticky lg:top-28">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 ring-1 ring-gold/25">
                  <Trophy className="h-5 w-5 text-gold" />
                </span>
                <div>
                  <p className="font-display text-base text-white">By the numbers</p>
                  <p className="eyebrow text-[10px] text-white/35">Statistics</p>
                </div>
              </div>
              <AchievementStatScroller />
            </div>
          </Reveal>

          {/* Grid */}
          <div className="flex-1">
            {achievements === undefined ? (
              <AchievementsSkeleton />
            ) : achievements.length === 0 ? (
              <EmptyState />
            ) : (
              <Stagger
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
                gap={0.1}
              >
                {achievements.map((achievement) => (
                  <motion.div key={achievement._id} variants={cardRise}>
                    <AchievementCard
                      id={achievement._id}
                      index={0}
                      image={achievement.photoUrl || "/achievement.png"}
                      title={achievement.title}
                      desc={achievement.description}
                      date={achievement.date}
                      slug={achievement.slug}
                    />
                  </motion.div>
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
    <motion.div
      variants={stagger()}
      initial="hidden"
      whileInView="visible"
      className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 py-24 text-center"
    >
      <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
        <Trophy className="h-7 w-7 text-white/25" />
      </span>
      <p className="font-display text-fluid-lg text-white/60">
        No achievements recorded yet
      </p>
      <p className="mt-2 text-sm text-white/35">
        Check back soon — new stories are added regularly.
      </p>
    </motion.div>
  );
}
