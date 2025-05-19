"use client";

import AchievementCard from "@/components/achievements/AchievementCard";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Award, LucideProps, Star, Trophy, Users } from "lucide-react";
import { ComponentType } from "react";

type IconMap = {
  [key: string]: ComponentType<LucideProps>;
};

const iconMap: IconMap = {
  "National Champion": Trophy,
  "International Recognition": Star,
  "Students Winners": Users,
  "University Awards": Award,
};

export default function AchievementsPage() {
  // const containerRef = useRef<HTMLDivElement>(null);

  const achievements = useQuery(api.achievements.getAllAchievements);
  const stats = useQuery(api.achievementsStat.getAchievementsStats);

  return (
    <div className='min-h-screen bg-purple-50 dark:bg-slate-950'>
      {/* Hero Section */}
      <section className='relative pt-12 px-4 max-w-6xl mx-auto text-center'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <h1 className='text-5xl md:text-6xl font-bold mb-3 text-[#213675] dark:text-blue-500'>
            Our Achievements
          </h1>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Celebrating excellence and milestones in academic competition and
            student development
          </p>
        </motion.div>
      </section>

      {/* Stats Grid */}
      <section className='py-12 px-4 max-w-5xl mx-auto'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3 '>
          {!stats ? (
            <div className='text-center italic py-5 animate-pulse'>
              No stat available.
            </div>
          ) : (
            [
              { label: "National Champion", value: stats.nationalChampions },
              {
                label: "International Recognition",
                value: stats.internationalRecognition,
              },
              { label: "Students Winners", value: stats.studentWinners },
              { label: "University Awards", value: stats.universityAwards },
            ].map((stat, index) => (
              <StatItem
                key={stat.label}
                label={stat.label}
                value={stat.value}
                index={index}
              />
            ))
          )}
        </div>
      </section>

      {/* Achievements Timeline */}
      <section className='py-12 px-4 max-w-5xl mx-auto'>
        <h2 className='text-3xl font-bold text-center mb-8 text-[#213675] dark:text-blue-500'>
          Our Stories
        </h2>
        {achievements === undefined ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-3'>
            {[...Array(3)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='bg-card rounded-lg overflow-hidden shadow-lg'>
                <div className='animate-pulse bg-gray-200 dark:bg-slate-700 h-48 w-full' />
                <div className='p-6 space-y-3'>
                  <div className='h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4' />
                  <div className='h-3 bg-gray-200 dark:bg-slate-700 rounded w-full' />
                  <div className='h-3 bg-gray-200 dark:bg-slate-700 rounded w-2/3' />
                </div>
              </motion.div>
            ))}
          </div>
        ) : achievements.length === 0 ? (
          <div className='text-center italic text-muted-foreground pb-12 pt-4'>
            No achievements record found
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-3'>
            {achievements.map((achievement, index) => (
              <AchievementCard
                key={achievement._id}
                id={achievement._id}
                index={index}
                image={achievement.photoUrl || "/achievement.png"}
                title={achievement.title}
                desc={achievement.description}
                date={achievement.date}
                slug={achievement.slug}
              />
            ))}
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className='py-20 px-4 bg-gradient-to-r from-blue-950 to-sky-900 text-white'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-6'>
            Be Part of Our Success Story
          </h2>
          <p className='text-xl mb-8'>
            Join DICOM and contribute to our growing legacy of academic
            excellence
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='px-8 py-3 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300'>
            Get Involved
          </motion.button>
        </div>
      </section>
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
      className='bg-white dark:bg-slate-800 p-5 rounded-xl shadow-md flex flex-col items-center text-center'>
      <div className="flex items-center gap-6 mb-2">
        <div className='w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-[#213675] dark:text-blue-500'>
          <IconComponent className='w-5 h-5' />
        </div>
        <h3 className='text-2xl font-bold mb-'>{value}</h3>
      </div>
      <h4 className='text-sm font-medium text-[#213675] dark:text-blue-500'>
        {label}
      </h4>
    </motion.div>
  );
}
