import { Id } from "@/convex/_generated/dataModel";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { CalendarDays, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ShareStoryUrl from "../ShareStoryUrl";

type Props = {
  id: Id<"achievements">;
  index: number;
  image: string;
  title: string;
  desc: string;
  slug: string;
  date?: number;
};

const AchievementCard = ({ index, image, title, desc, date, slug }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.08, duration: 0.5 }}
      whileHover={{ y: -4 }}
      className="group relative bg-[#0f1e3a] border border-white/8 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#179BD7]/30 transition-all duration-300 flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative w-full h-44 overflow-hidden shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1e3a] via-black/20 to-transparent" />

        {/* Date badge */}
        {date && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1 text-white/80 text-xs">
            <CalendarDays className="h-3 w-3 text-yellow-400" />
            {dayjs(date).format("MMM DD, YYYY")}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-5 py-4">
        <h2 className="font-semibold text-base text-white line-clamp-2 leading-snug group-hover:text-[#179BD7] transition-colors capitalize mb-4">
          {title}
        </h2>

        {/* Actions */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/8">
          <ShareStoryUrl title={title} text={desc} slug={slug} />

          <Link
            href={`/achievements/${slug}`}
            className="group/btn inline-flex items-center gap-1 text-sm text-[#179BD7] hover:text-white font-medium transition-colors"
          >
            Read More
            <ChevronRight className="h-3.5 w-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default AchievementCard;
