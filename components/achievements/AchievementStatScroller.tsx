"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Award, Star, Trophy, Users, LucideProps } from "lucide-react";
import { useRef, ComponentType } from "react";

// Type for icon mapping
type IconMap = {
  [key: string]: ComponentType<LucideProps>;
};

const iconMap: IconMap = {
  "National Champion": Trophy,
  "International Recognition": Star,
  "Students Winners": Users,
  "University Awards": Award,
};

export function AchievementStatScroller() {
  const containerRef = useRef<HTMLDivElement>(null);

  const stats = useQuery(api.achievementsStat.getAchievementsStats)

  if(stats === undefined) return  <div className='text-center italic py-5 animate-pulse'>
  Stats loading...
  </div>
  
  if (!stats) return  <div className='text-center italic py-5 animate-pulse'>
  No stat available.
</div>

  return (
    <div className='relative pt-1 lg:pt-2 pb-10 lg:pb-1 max-w-3xl mx-auto'>
      {/* Fade masks for scroll indication (mobile only) */}
      <div className='lg:hidden pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-purple-50 dark:from-slate-950 to-transparent z-10' />
      <div className='lg:hidden pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-purple-50 dark:from-slate-950 to-transparent z-10' />

      {/* Responsive container */}
      <div
        ref={containerRef}
        className='flex gap-8 px-4 py-2 lg:py-0 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar
                 lg:overflow-visible lg:flex-col sm:gap-3 lg:px-0'
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
        }}>
        <StatItem label='National Champion' value={stats.nationalChampions} />
        <StatItem label='International Recognition' value={stats.internationalRecognition} />
        <StatItem label='Students Winners' value={stats.studentWinners} />
        <StatItem label='University Awards' value={stats.universityAwards} />
      </div>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: number }) {
  const IconComponent = iconMap[label] || Trophy; // Fallback to Trophy if unknown

  return (
    <div className='flex-shrink-0 w-[120px] mx-auto bg-white dark:bg-gray-700 lg:bg-white lg:dark:bg-gray-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-transform lg:w-full lg:flex-shrink '>
      <div className='flex flex-col items-center text-center '>
        <div className='w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary  lg:mb-0 shrink-0'>
          <IconComponent className='w-5 h-5' />
        </div>
        <div className="">
          <h3 className='text-xl font-bold text-[#213675] dark:text-blue-500 leading-tight'>
            {value}
          </h3>
          <p className='text-xs lg:text-[14px] font-medium leading-snug'>
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
