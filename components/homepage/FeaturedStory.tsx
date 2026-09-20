import dayjs from "dayjs";
import { ArrowUpRight, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Aurora, Reveal, Stagger } from "../ui/motion-primitives";

/**
 * Story of the moment — the one section on the homepage that visibly changes.
 *
 * The rest of the page is a standing summary of the directorate; this block
 * puts the most recent written-up win at full bleed so a returning visitor
 * has something new to read, and a first-time visitor gets one story told
 * properly instead of eight told in two lines each.
 */

export type FeaturedStoryData = {
  title: string;
  description: string;
  slug: string;
  story?: string;
  photoUrl: string | null;
  publishedAt?: number;
  _creationTime: number;
};

/**
 * The story is stored as HTML from the dashboard editor. The spotlight only
 * wants a teaser, so tags are dropped rather than rendered — no markup from
 * the editor reaches the homepage, and the excerpt cuts on a word boundary so
 * it never ends mid-syllable.
 */
function excerpt(html: string, limit = 260) {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= limit) return text;
  const cut = text.slice(0, limit);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : limit)}…`;
}

export function FeaturedStory({ story }: { story: FeaturedStoryData | null }) {
  if (!story) return null;

  const date = story.publishedAt ?? story._creationTime;
  const teaser = story.story ? excerpt(story.story) : story.description;

  return (
    <section
      className="relative overflow-hidden bg-ink-900 py-24 grain md:py-32"
      aria-labelledby="featured-story-heading"
    >
      <Aurora className="-left-32 top-10 h-[420px] w-[420px]" color="gold" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal>
          <div className="edge-light relative overflow-hidden rounded-4xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] shadow-lift lg:flex lg:items-stretch">
            {/* Cover */}
            <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden lg:aspect-auto lg:w-[46%]">
              <Image
                src={story.photoUrl || "/achievement.png"}
                alt=""
                fill
                priority={false}
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 46vw"
              />
              {/* Blends the cover into the card on whichever axis they meet */}
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-ink-900/70"
              />
            </div>

            {/* Copy */}
            <Stagger
              className="relative flex flex-1 flex-col justify-center p-6 sm:p-10 lg:p-14"
              gap={0.09}
            >
              <Reveal>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5">
                    <Quote aria-hidden className="h-3 w-3 text-gold" />
                    <span className="eyebrow text-[10px] text-gold">
                      Story of the moment
                    </span>
                  </span>
                  <span className="text-xs text-white/60">
                    {dayjs(date).format("MMMM D, YYYY")}
                  </span>
                </div>
              </Reveal>

              <Reveal>
                <h2
                  id="featured-story-heading"
                  className="mt-6 font-display text-fluid-2xl capitalize leading-[1.1] text-white text-balance"
                >
                  {story.title}
                </h2>
              </Reveal>

              <Reveal>
                <p className="mt-5 text-fluid-base leading-relaxed text-white/70 text-pretty">
                  {teaser}
                </p>
              </Reveal>

              <Reveal>
                <Link
                  href={`/achievements/${story.slug}`}
                  className="group mt-9 inline-flex w-fit items-center gap-2.5 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-ink-900 shadow-gold transition-shadow duration-300 hover:shadow-[0_12px_44px_-6px_hsl(var(--gold)/0.6)]"
                >
                  Read the full story
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </Reveal>
            </Stagger>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
