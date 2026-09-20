import { Id } from "@/convex/_generated/dataModel";
import dayjs from "dayjs";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ShareStoryUrl from "../ShareStoryUrl";
import { SpotlightCard } from "../ui/motion-primitives";

type Props = {
  id: Id<"achievements">;
  index: number;
  image: string;
  title: string;
  desc: string;
  slug: string;
  date?: number;
};

const AchievementCard = ({ image, title, desc, date, slug }: Props) => {
  return (
    <SpotlightCard className="flex h-full flex-col">
      {/* Media */}
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-top transition-transform duration-700 ease-out-quint group-hover:scale-[1.07]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Seats the image into the card body so there is no hard seam */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-700 via-ink-900/25 to-transparent" />

        {date && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full border border-white/10 bg-ink-900/70 px-3 py-1.5 text-[11px] font-medium text-white/85 backdrop-blur-md">
            <CalendarDays className="h-3 w-3 text-gold" />
            {dayjs(date).format("MMM DD, YYYY")}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="relative flex flex-1 flex-col p-5">
        <h3 className="font-display text-fluid-lg capitalize leading-snug text-white transition-colors duration-300 group-hover:text-azure line-clamp-2">
          {title}
        </h3>

        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-white/45">
          {desc}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
          <ShareStoryUrl title={title} text={desc} slug={slug} />

          <Link
            href={`/achievements/${slug}`}
            className="group/btn inline-flex items-center gap-1.5 text-sm font-medium text-azure transition-colors hover:text-gold"
          >
            Read story
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </SpotlightCard>
  );
};

export default AchievementCard;
