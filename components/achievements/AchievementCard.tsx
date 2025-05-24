import dayjs from "dayjs";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

type Props = {
  id: string;
  index: number;
  image: string;
  title: string;
  desc: string;
  slug: string;
  //   photoUrl: string | null;
  date?: number; // Optional, in case date might be missing
};

const AchievementCard = ({
  id,
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
      className='group bg-card dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow flex flex-col h-full'>
      <div className='px-4 pt-4 pb-2.5 flex-1 flex flex-col'>
        <h1 className='font-medium text-lg line-clamp-2 leading-5'>{title}</h1>
        <div className='flex flex-col gap-2 mt-2 flex-1'>
          <div className='relative w-full h-[120px] aspect-video shrink-0 rounded-xl overflow-hidden'>
            <Image
              src={image}
              alt={id}
              fill
              className='object-cover object-top'
              sizes='(max-width: 768px) 100vw, 50vw'
            />
          </div>
          <p className='line-clamp-2 leading-5 text-sm'>{desc}</p>
        </div>
      </div>

      <div className='flex text-sm items-center justify-between gap-4 mt-auto'>
        <p className="w-full text-center mb-1 italic text-muted-foreground"> {dayjs(date).format("MMM DD, YYYY")}</p>
        <Button
          asChild
          className='w-full rounded-none rounded-br-xl rounded-tl-xl'>
          <Link
            href={`/achievements/${slug}`}
            className='group-hover:text-blue-500 border rounded-full border-transparent'>
            Read full story
            <span className='transition-transform ml-2'>→</span>
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default AchievementCard;
