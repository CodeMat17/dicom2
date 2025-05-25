"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import Link from "next/link";
import AchievementCard from "../achievements/AchievementCard";
import { AchievementStatScroller } from "../achievements/AchievementStatScroller";
import { Button } from "../ui/button";

export function AchievementsSection() {
  const achievements = useQuery(api.achievements.getLatestAchievements);

  return (
    <section className=' '>
      <section className='py-12 px-4 max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='flex items-center gap-2 mb-12'>
          <Trophy className='w-8 h-8 text-primary' />
          <h2 className='text-3xl font-bold text-[#213675] dark:text-blue-500'>
            Our Latest Achievements
          </h2>
        </motion.div>

        <div className='lg:flex lg:gap-8 lg:flex-row-reverse'>
          {/* Statistics Panel */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='lg:w-[20%] lg:bg-gray-300 lg:dark:bg-gray-800 lg:p-4 lg:rounded-2xl lg:shadow-xl lg:sticky lg:top-20 lg:h-fit'>
            <h3 className='text-2xl font-semibold mb-6 text-center lg:text-black lg:dark:text-white'>
              Statistics
            </h3>

            <AchievementStatScroller />
          </motion.div>

          {/* Stories Grid */}
          <div className='lg:flex-1 '>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className='text-2xl font-semibold mb-6 text-center lg:text-left'>
              Latest Stories
            </motion.h3>

            {achievements === undefined ? (
              <div className='pb-12 pl-6 italic animate-pulse'>
                Latest stories loading...
              </div>
            ) : achievements.length === 0 ? (
              <div className='pb-12 pl-6 italic animate-pulse'>
                No achievements record found
              </div>
            ) : (
              <>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-3'>
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
                <div className='mt-8 flex justify-center'>
                  <Button
                    asChild
                    className='py-5 bg-blue-700 hover:bg-blue-500 text-white'>
                    <Link href='/achievements'>
                      Read more achievement stories{" "}
                      <span className='transition-transform'>→</span>
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </section>
  );
}
