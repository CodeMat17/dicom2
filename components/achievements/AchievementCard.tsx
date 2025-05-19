import dayjs from "dayjs";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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
        transition={{ delay: 0.2 + index * 0.1 }}
        whileHover={{ y: -5 }}
        className='group bg-card dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow'>
        <div className='relative h-40'>
          <Image
            src={image}
            alt={id}
            fill
            className='object-cover'
            sizes='(max-width: 768px) 100vw, 50vw'
          />
        </div>
        <div className='px-6 py-4'>
          <h3 className='text-lg font-semibold mb-2 line-clamp-2 leading-5'>{title}</h3>
          <p className='text-muted-foreground mb-4 line-clamp-3 leading-5'>{desc}</p>
          <div className='flex text-sm items-center justify-between'>
            <p className=' text-primary font-medium'>
              {dayjs(date).format("MMM DD, YYYY")}
            </p>
            <Link
              href={`/achievements/${slug}`}
              className='group-hover:text-blue-500 border px-3 rounded-full border-transparent group-hover:border-blue-500'>
              Read full story
              <span className='transition-transform ml-2'>→</span>
            </Link>
          </div>
        </div>
      </motion.div>

     
  
  );
};

export default AchievementCard;
