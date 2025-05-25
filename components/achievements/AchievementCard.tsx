import { Id } from "@/convex/_generated/dataModel";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { CalendarDays, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ShareStoryUrl from "../ShareStoryUrl";
import { Button } from "../ui/button";

type Props = {
  id: Id<"achievements">;
  index: number;
  image: string;
  title: string;
  desc: string;
  slug: string;
  //   photoUrl: string | null;
  date?: number; // Optional, in case date might be missing
};

const AchievementCard = ({
  // id,
  index,
  image,
  title,
  desc,
  date,
  slug,
}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.02 + index * 0.1 }}
      whileHover={{ y: -5 }}
      className='group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100 dark:border-gray-700'>
      {/* Image Container */}
      <div className='relative w-full h-40 overflow-hidden'>
        <Image
          src={image}
          alt={title}
          fill
          className='object-cover object-top transform group-hover:scale-105 transition-transform duration-300'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      </div>

      {/* Content Container */}
      <div className='flex flex-col flex-1 px-4 pt-3 pb-2'>
        <div className='flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-2'>
          <CalendarDays className='h-3.5 w-3.5' />
          {date && dayjs(date).format("MMMM DD, YYYY")}
        </div>

        <h2 className='font-semibold text-lg mb-1.5 text-gray-900 dark:text-gray-100 line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
          {title}
        </h2>

        <p className='text-gray-600 dark:text-gray-300 line-clamp-2 text-sm leading-relaxed mb-3'>
          {desc}
        </p>

        <div className='flex items-center justify-between mt-auto pt- border-t border-gray-100 dark:border-gray-700'>
          <ShareStoryUrl title={title} text={desc} slug={slug} />

          <Button
            asChild
            variant='ghost'
            size='sm'
            className='group/btn hover:bg-blue-50 dark:hover:bg-blue-950 text-blue-600 dark:text-blue-400'>
            <Link
              href={`/our-stories/${slug}`}
              className='flex items-center gap-1'>
              Read More
              <ChevronRight className='h-3.5 w-3.5 transform group-hover/btn:translate-x-1 transition-transform' />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementCard;
