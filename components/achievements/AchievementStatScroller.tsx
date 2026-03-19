"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Award, ComponentType, LucideProps, Star, Trophy, Users } from "lucide-react";

type IconMap = { [key: string]: ComponentType<LucideProps> };

const iconMap: IconMap = {
  "National Champion": Trophy,
  "International Recognition": Star,
  "Students Winners": Users,
  "University Awards": Award,
};

const colors: Record<string, { bg: string; text: string; ring: string }> = {
  "National Champion": { bg: "bg-yellow-400/10", text: "text-yellow-400", ring: "ring-yellow-400/20" },
  "International Recognition": { bg: "bg-[#179BD7]/10", text: "text-[#179BD7]", ring: "ring-[#179BD7]/20" },
  "Students Winners": { bg: "bg-emerald-400/10", text: "text-emerald-400", ring: "ring-emerald-400/20" },
  "University Awards": { bg: "bg-purple-400/10", text: "text-purple-400", ring: "ring-purple-400/20" },
};

export function AchievementStatScroller() {
  const stats = useQuery(api.achievementsStat.getAchievementsStats);

  if (stats === undefined)
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 rounded-xl bg-white/5 animate-pulse" />
        ))}
      </div>
    );

  if (!stats)
    return <p className="text-white/30 text-sm text-center py-4">No stats available</p>;

  const items = [
    { label: "National Champion", value: stats.nationalChampions },
    { label: "International Recognition", value: stats.internationalRecognition },
    { label: "Students Winners", value: stats.studentWinners },
    { label: "University Awards", value: stats.universityAwards },
  ];

  return (
    <div className="space-y-3">
      {items.map(({ label, value }, i) => {
        const Icon = iconMap[label] || Trophy;
        const c = colors[label] || colors["National Champion"];
        return (
          <motion.div
            key={label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/8 hover:border-white/15 transition-colors"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${c.bg} ring-1 ${c.ring}`}>
              <Icon className={`w-4.5 h-4.5 ${c.text}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white leading-none">{value}</p>
              <p className="text-xs text-white/40 mt-0.5 leading-tight">{label}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
