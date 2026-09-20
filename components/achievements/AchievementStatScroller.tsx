"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Award, Star, Trophy, Users, type LucideProps } from "lucide-react";
import type { ComponentType } from "react";
import { cardRise } from "@/lib/motion";
import { Stagger } from "../ui/motion-primitives";
import { Counter } from "../ui/page-hero";

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

export function AchievementStatScroller() {
  const stats = useQuery(api.achievementsStat.getAchievementsStats);

  if (stats === undefined)
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="shimmer h-[68px] rounded-2xl border border-white/8 bg-white/[0.04]"
          />
        ))}
      </div>
    );

  if (!stats)
    return (
      <p className="py-4 text-center text-sm text-white/30">
        No stats available
      </p>
    );

  const items = [
    { label: "National Champion", value: stats.nationalChampions },
    { label: "International Recognition", value: stats.internationalRecognition },
    { label: "Students Winners", value: stats.studentWinners },
    { label: "University Awards", value: stats.universityAwards },
  ];

  return (
    <Stagger className="space-y-3" gap={0.09}>
      {items.map(({ label, value }) => {
        const { Icon, bg, text, ring } = STAT_STYLES[label] ?? FALLBACK;
        return (
          <motion.div
            key={label}
            variants={cardRise}
            className="group flex items-center gap-3.5 rounded-2xl border border-white/8 bg-white/[0.03] p-3.5 transition-all duration-500 ease-out-quint hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06]"
          >
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ring-1 ${ring} transition-transform duration-500 ease-out-expo group-hover:scale-110`}
            >
              <Icon className={`h-[18px] w-[18px] ${text}`} />
            </span>
            <span className="min-w-0">
              <span className="block font-display text-2xl leading-none text-white">
                <Counter value={value ?? 0} />
              </span>
              <span className="mt-1.5 block text-xs leading-tight text-white/40">
                {label}
              </span>
            </span>
          </motion.div>
        );
      })}
    </Stagger>
  );
}
