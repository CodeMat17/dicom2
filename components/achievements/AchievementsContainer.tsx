"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Award, LucideProps, Star, Trophy, Users } from "lucide-react";
import dynamic from "next/dynamic";
import { ComponentType, Suspense } from "react";

// Lazy load the AchievementsGrid for better performance
const AchievementsGrid = dynamic(
  () => import("@/components/achievements/AchievementsGrid"),
  {
    loading: () => <AchievementsGridSkeleton />,
    ssr: false,
  }
);

type IconMap = {
  [key: string]: ComponentType<LucideProps>;
};

const iconMap: IconMap = {
  "National Champion": Trophy,
  "International Recognition": Star,
  "Students Winners": Users,
  "University Awards": Award,
};

// Loading skeleton for stats
function StatsSkeleton() {
  return (
    <div
      className='grid grid-cols-2 md:grid-cols-4 gap-3'
      role='status'
      aria-label='Loading statistics'
      aria-busy='true'>
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className='bg-white dark:bg-slate-800 p-5 rounded-xl shadow-md animate-pulse'>
          <div className='flex items-center gap-6 mb-2'>
            <div className='w-12 h-12 bg-gray-200 dark:bg-slate-700 rounded-full' />
            <div className='h-8 bg-gray-200 dark:bg-slate-700 rounded w-12' />
          </div>
          <div className='h-4 bg-gray-200 dark:bg-slate-700 rounded w-24 mx-auto' />
        </div>
      ))}
    </div>
  );
}

// Loading skeleton for achievements grid
function AchievementsGridSkeleton() {
  return (
    <div
      className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-3'
      role='status'
      aria-label='Loading achievements'
      aria-busy='true'>
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className='bg-card rounded-lg overflow-hidden shadow-lg animate-pulse'>
          <div className='bg-gray-200 dark:bg-slate-700 h-48 w-full' />
          <div className='p-6 space-y-3'>
            <div className='h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4' />
            <div className='h-3 bg-gray-200 dark:bg-slate-700 rounded w-full' />
            <div className='h-3 bg-gray-200 dark:bg-slate-700 rounded w-2/3' />
          </div>
        </div>
      ))}
    </div>
  );
}

// Empty state component
function NoStats() {
  return (
    <div
      className='text-center py-8 bg-white dark:bg-slate-800 rounded-xl shadow-md'
      role='status'
      aria-label='No statistics available'>
      <Trophy
        className='w-12 h-12 text-gray-400 mx-auto mb-4'
        aria-hidden='true'
      />
      <p className='text-lg text-muted-foreground'>No statistics available</p>
    </div>
  );
}

interface StatItemProps {
  label: string;
  value: number;
  index: number;
}

function StatItem({ label, value, index }: StatItemProps) {
  const IconComponent = iconMap[label] || Trophy;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className='bg-white dark:bg-slate-800 p-5 rounded-xl shadow-md'
      role='article'
      aria-label={`${label}: ${value}`}>
      <div className='flex items-center justify-center gap-6 mb-2'>
        <div
          className='w-12 h-12 flex items-center justify-center rounded-full bg-amber-50 shadow-md border text-[#213675] dark:text-blue-500'
          aria-hidden='true'>
          <IconComponent className='w-5 h-5 text-amber-500' />
        </div>
        <p
          className='text-2xl font-bold'
          aria-label={`Count: ${value}`}
          role='text'>
          {value}
        </p>
      </div>
      <h3 className='text-sm font-medium text-[#213675] dark:text-blue-500 text-center'>
        {label}
      </h3>
    </motion.div>
  );
}

export default function AchievementsContainer() {
  const achievements = useQuery(api.achievements.getAllAchievements);
  const stats = useQuery(api.achievementsStat.getAchievementsStats);

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
    <main
      className='min-h-screen bg-gray-50 dark:bg-slate-950'
      aria-labelledby='achievements-heading'>
      {/* Hero Section */}
      <section
        className='relative pt-12 px-4 max-w-7xl mx-auto text-center'
        aria-labelledby='achievements-heading'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <h1
            id='achievements-heading'
            className='text-5xl md:text-6xl font-bold mb-3 text-[#213675] dark:text-blue-500'>
            Our Achievements
          </h1>
          <p
            className='text-xl text-muted-foreground max-w-3xl mx-auto'
            role='doc-subtitle'>
            Celebrating excellence and milestones in academic competition and
            student development
          </p>
        </motion.div>
      </section>

      {/* Stats Grid */}
      <section
        className='py-12 px-4 max-w-5xl mx-auto'
        aria-labelledby='stats-heading'>
        <h2 id='stats-heading' className='sr-only'>
          Our Achievements Statistics
        </h2>
        <Suspense fallback={<StatsSkeleton />}>
          {!stats ? (
            <NoStats />
          ) : (
            <div
              className='grid grid-cols-2 md:grid-cols-4 gap-3'
              role='list'
              aria-label='Achievement statistics'>
              {statItems.map((stat, index) => (
                <StatItem
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  index={index}
                />
              ))}
            </div>
          )}
        </Suspense>
      </section>

      {/* Achievements Timeline */}
      <section
        className='py-12 px-4 max-w-7xl mx-auto'
        aria-labelledby='stories-heading'>
        <h2
          id='stories-heading'
          className='text-3xl font-bold text-center mb-8 text-[#213675] dark:text-blue-500'>
          Stories
        </h2>
        <Suspense fallback={<AchievementsGridSkeleton />}>
          {achievements === undefined ? null : achievements.length === 0 ? (
            <div
              className='text-center italic text-muted-foreground pb-12 pt-4'
              role='status'
              aria-label='No achievements found'>
              No achievements record found
            </div>
          ) : (
            <AchievementsGrid />
          )}
        </Suspense>
      </section>

      {/* Call to Action */}
      <section
        className='py-20 px-4 bg-gradient-to-r from-blue-950 to-sky-900 text-white'
        aria-labelledby='cta-heading'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 id='cta-heading' className='text-3xl font-bold mb-6'>
            Be Part of Our Success Story
          </h2>
          <p className='text-xl mb-8' role='doc-subtitle'>
            Partner with DICOM and be part of our growing story of academic
            excellence
          </p>
          <a
            href='mailto:dicom@gouni.edu.ng'
            className='inline-block px-8 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300'
            aria-label='Contact us to get involved'
            rel='noopener noreferrer'>
            Get Involved
          </a>
        </div>
      </section>
    </main>
  );
}
