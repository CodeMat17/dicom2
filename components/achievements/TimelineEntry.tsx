import dayjs from "dayjs";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ShareStoryUrl from "../ShareStoryUrl";

/**
 * One win on the Hall of Fame spine.
 *
 * Deliberately wider and flatter than <AchievementCard>: the grid is a
 * catalogue, the timeline is a narrative, so an entry leads with the date and
 * lets the cover sit beside the text instead of on top of it.
 */
export default function TimelineEntry({
  title,
  description,
  slug,
  date,
  photoUrl,
}: {
  title: string;
  description: string;
  slug: string;
  date: number;
  photoUrl: string | null;
}) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-card transition-all duration-500 ease-out-quint hover:-translate-y-1 hover:border-white/25 hover:shadow-lift sm:flex">
      {/* Decorative only — the title link below already covers the whole card,
          so the cover is not a second tab stop to the same destination. */}
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden sm:aspect-auto sm:w-52 md:w-64">
        <Image
          src={photoUrl || "/achievement.png"}
          alt=""
          fill
          className="object-cover object-top transition-transform duration-700 ease-out-quint group-hover:scale-[1.07]"
          sizes="(max-width: 640px) 100vw, 256px"
        />
        {/* Seats the cover into the card body rather than leaving a hard seam */}
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink-700/80 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-ink-700/60"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="eyebrow text-[10px] text-gold">
          {dayjs(date).format("MMMM D, YYYY")}
        </p>

        <h3 className="mt-2 font-display text-fluid-lg capitalize leading-snug text-white transition-colors duration-300 group-hover:text-azure">
          <Link href={`/achievements/${slug}`} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>

        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-white/70">
          {description}
        </p>

        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
          {/* Sits above the card-wide link overlay so the share button stays clickable */}
          <span className="relative z-10">
            <ShareStoryUrl title={title} text={description} slug={slug} />
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-azure transition-colors group-hover:text-gold">
            Read story
            <ArrowUpRight
              aria-hidden
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>
      </div>
    </article>
  );
}
