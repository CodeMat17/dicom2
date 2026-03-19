"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { ArrowRight, Trophy } from "lucide-react";
import Link from "next/link";
import AchievementCard from "../achievements/AchievementCard";
import { AchievementStatScroller } from "../achievements/AchievementStatScroller";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

function AchievementsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-2xl overflow-hidden bg-white/5 animate-pulse">
          <div className="h-44 bg-white/10" />
          <div className="p-4 space-y-3">
            <div className="h-3 w-20 bg-white/10 rounded" />
            <div className="h-5 w-4/5 bg-white/10 rounded" />
            <div className="h-4 w-1/2 bg-white/10 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function AchievementsSection() {
  const achievements = useQuery(api.achievements.getLatestAchievements);

  return (
    <section className="bg-[#0a1628] py-24 px-4 overflow-hidden" aria-labelledby="achievements-heading">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-px w-8 bg-yellow-400" />
              <span className="text-yellow-400 text-sm font-mono tracking-widest uppercase">Excellence</span>
            </div>
            <h2
              id="achievements-heading"
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              Our Latest <span className="text-[#179BD7]">Achievements</span>
            </h2>
            <p className="mt-3 text-white/50 max-w-lg">
              Celebrating the milestones and victories of our students on national and international stages.
            </p>
          </div>

          <Link
            href="/achievements"
            className="group inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-medium text-sm transition-colors shrink-0"
          >
            View all achievements
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        <div className="lg:flex lg:gap-10">
          {/* Stats sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:w-64 shrink-0 mb-12 lg:mb-0"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:sticky lg:top-24">
              <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Statistics
              </h3>
              <AchievementStatScroller />
            </div>
          </motion.aside>

          {/* Cards grid */}
          <div className="flex-1">
            {achievements === undefined ? (
              <AchievementsSkeleton />
            ) : achievements.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-white/30">
                <Trophy className="w-12 h-12 mb-4" />
                <p className="text-lg">No achievements recorded yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement._id}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <AchievementCard
                      id={achievement._id}
                      index={index}
                      image={achievement.photoUrl || "/achievement.png"}
                      title={achievement.title}
                      desc={achievement.description}
                      date={achievement.date}
                      slug={achievement.slug}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
