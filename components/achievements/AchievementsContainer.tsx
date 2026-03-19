"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Award, Mail, Star, Trophy, Users, type LucideProps } from "lucide-react";
import type { ComponentType } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const AchievementsGrid = dynamic(
  () => import("@/components/achievements/AchievementsGrid"),
  { loading: () => <GridSkeleton />, ssr: false }
);

type IconMap = { [key: string]: ComponentType<LucideProps> };

const iconMap: IconMap = {
  "National Champion": Trophy,
  "International Recognition": Star,
  "Students Winners": Users,
  "University Awards": Award,
};

const statColors = [
  { bg: "bg-yellow-400/10", text: "text-yellow-400", ring: "ring-yellow-400/20" },
  { bg: "bg-[#179BD7]/10", text: "text-[#179BD7]", ring: "ring-[#179BD7]/20" },
  { bg: "bg-emerald-400/10", text: "text-emerald-400", ring: "ring-emerald-400/20" },
  { bg: "bg-purple-400/10", text: "text-purple-400", ring: "ring-purple-400/20" },
];

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden bg-white/5 animate-pulse border border-white/8">
          <div className="h-44 bg-white/10" />
          <div className="p-4 space-y-3">
            <div className="h-3 w-20 bg-white/10 rounded" />
            <div className="h-5 w-4/5 bg-white/10 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="rounded-2xl bg-white/5 animate-pulse p-6 border border-white/8 h-24" />
      ))}
    </div>
  );
}

export default function AchievementsContainer() {
  const achievements = useQuery(api.achievements.getAllAchievements);
  const stats = useQuery(api.achievementsStat.getAchievementsStats);

  const statItems = stats
    ? [
        { label: "National Champion", value: stats.nationalChampions },
        { label: "International Recognition", value: stats.internationalRecognition },
        { label: "Students Winners", value: stats.studentWinners },
        { label: "University Awards", value: stats.universityAwards },
      ]
    : [];

  return (
    <main className="min-h-screen bg-[#060e1e]" aria-labelledby="achievements-heading">

      {/* Hero */}
      <section className="relative pt-28 pb-16 px-4 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#213675]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-2 mb-5">
              <div className="h-px w-8 bg-yellow-400" />
              <span className="text-yellow-400 text-sm font-mono tracking-widest uppercase">Excellence</span>
              <div className="h-px w-8 bg-yellow-400" />
            </div>
            <h1
              id="achievements-heading"
              className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4"
            >
              Our <span className="text-[#179BD7]">Achievements</span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Celebrating excellence and milestones in academic competition and student development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 px-4 max-w-6xl mx-auto" aria-labelledby="stats-heading">
        <h2 id="stats-heading" className="sr-only">Achievement Statistics</h2>
        {!stats ? (
          <StatsSkeleton />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statItems.map(({ label, value }, index) => {
              const Icon = iconMap[label] || Trophy;
              const c = statColors[index % statColors.length];
              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  whileHover={{ y: -3 }}
                  className="bg-white/4 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-all text-center"
                  aria-label={`${label}: ${value}`}
                >
                  <div className={`w-11 h-11 rounded-xl ${c.bg} ring-1 ${c.ring} flex items-center justify-center mx-auto mb-3`}>
                    <Icon className={`w-5 h-5 ${c.text}`} />
                  </div>
                  <p className="text-3xl font-bold text-white">{value}</p>
                  <p className={`text-xs font-medium mt-1 ${c.text}`}>{label}</p>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Grid */}
      <section className="pb-16 px-4 max-w-7xl mx-auto" aria-labelledby="stories-heading">
        <div className="flex items-center gap-3 mb-8">
          <h2 id="stories-heading" className="text-2xl font-bold text-white">All Stories</h2>
          <div className="h-px flex-1 bg-white/8" />
        </div>

        <Suspense fallback={<GridSkeleton />}>
          {achievements === undefined ? (
            <GridSkeleton />
          ) : achievements.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-white/25">
              <Trophy className="w-12 h-12 mb-4" />
              <p>No achievements recorded yet</p>
            </div>
          ) : (
            <AchievementsGrid />
          )}
        </Suspense>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 pb-28">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-[#213675] to-[#0a1628] border border-[#179BD7]/20 rounded-3xl px-8 py-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#179BD7_0%,_transparent_60%)] opacity-5 pointer-events-none" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Be Part of Our Success Story</h2>
            <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
              Partner with DICOM and be part of our growing story of academic excellence.
            </p>
            <motion.a
              href="mailto:dicom@gouni.edu.ng"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-8 py-3.5 rounded-full transition-colors"
              aria-label="Contact us to get involved"
            >
              <Mail className="w-4 h-4" />
              Get Involved
            </motion.a>
          </div>
        </div>
      </section>
    </main>
  );
}
