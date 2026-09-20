"use client";

import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, MoveDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { A11y, Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Magnetic, SplitText } from "../ui/motion-primitives";
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/effect-fade";

const SLIDE_MS = 6500;
const pad = (n: number) => String(n).padStart(2, "0");

function HeroSkeleton() {
  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-ink-900">
      <div className="absolute inset-0 bg-brand-sheen opacity-60" />
      <div className="aurora left-[10%] top-[20%] h-[420px] w-[420px] bg-brand/40" />
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center gap-6 px-6 md:px-12">
        <div className="shimmer h-3 w-28 rounded-full bg-white/10" />
        <div className="shimmer h-16 w-4/5 max-w-3xl rounded-2xl bg-white/10" />
        <div className="shimmer h-16 w-2/3 max-w-2xl rounded-2xl bg-white/10" />
        <div className="shimmer h-5 w-1/2 max-w-md rounded-lg bg-white/10" />
        <div className="shimmer mt-4 h-14 w-52 rounded-full bg-white/10" />
      </div>
    </div>
  );
}

/** Shared chrome so the fallback and the carousel frame content identically. */
function HeroFrame({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="relative h-[100svh] w-full overflow-hidden grain"
      aria-label="Hero"
    >
      {children}
    </section>
  );
}

export function HeroCarousel() {
  const heroData = useQuery(api.heroSlides.getHeroSlides);
  const [failed, setFailed] = useState<Set<string>>(new Set());
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Content drifts up and fades as the user scrolls away — the hero
  // hands off to the next section instead of just sliding out of frame.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  if (heroData === undefined) return <HeroSkeleton />;

  const slides = heroData ?? [];
  const hasSlides = slides.length > 0;
  const total = slides.length;
  const current = slides[activeIndex];

  const title = hasSlides
    ? (current?.title ?? "")
    : "Welcome to the Directorate of Competitions";
  const subtitle = hasSlides
    ? current?.subtitle
    : "Empowering students through competition and excellence at Godfrey Okoye University.";

  return (
    <HeroFrame>
      <div ref={sectionRef} className="absolute inset-0">
        {/* ---------- Layer 1: imagery ---------- */}
        <motion.div
          className="absolute inset-0"
          style={reduce ? undefined : { scale: imageScale }}
        >
          {hasSlides ? (
            <Swiper
              modules={[Autoplay, EffectFade, A11y]}
              autoplay={{ delay: SLIDE_MS, disableOnInteraction: false }}
              effect="fade"
              fadeEffect={{ crossFade: true }}
              loop
              speed={1400}
              allowTouchMove={false}
              onSwiper={(s) => {
                swiperRef.current = s;
              }}
              onSlideChange={(s) => setActiveIndex(s.realIndex)}
              className="h-full w-full"
              a11y={{
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
              }}
            >
              {slides.map((data, index) => {
                const broken = failed.has(data._id);
                const src = broken
                  ? "/fallback.webp"
                  : (data.imgUrl ?? "/fallback.webp");
                return (
                  <SwiperSlide key={data._id}>
                    {({ isActive }) => (
                      <Image
                        src={src}
                        alt={data.alt || data.title}
                        fill
                        // Slow push-in on the live slide keeps a static
                        // photograph from feeling like a dead backdrop.
                        className={cn(
                          "object-cover object-center",
                          isActive && !reduce && "animate-ken-burns"
                        )}
                        priority={index === 0}
                        quality={90}
                        sizes="100vw"
                        onError={() =>
                          setFailed((prev) => new Set(prev).add(data._id))
                        }
                      />
                    )}
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <Image
              src="/fallback.webp"
              alt="DICOM welcome"
              priority
              fill
              className="object-cover"
              sizes="100vw"
            />
          )}
        </motion.div>

        {/* ---------- Layer 2: cinematic grading ---------- */}
        {/* Three stacked washes: a left-weighted scrim for text contrast,
            a floor gradient to seat the controls, and a navy tint that
            pulls the photography into the brand palette. */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-ink-900 via-ink-900/70 to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-ink-900 via-ink-900/20 to-ink-900/50" />
        <div className="absolute inset-0 z-10 bg-brand/20 mix-blend-color" />

        {/* ---------- Layer 3: content ---------- */}
        <motion.div
          style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
          className="absolute inset-0 z-20 flex items-center"
        >
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 md:px-12">
            <div className="max-w-4xl">
              {/* Slide index */}
              {hasSlides && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`badge-${activeIndex}`}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.45 }}
                    className="mb-7 flex items-center gap-3"
                  >
                    <span className="font-mono text-sm text-gold">
                      {pad(activeIndex + 1)}
                    </span>
                    <span className="h-px w-12 bg-gradient-to-r from-gold to-transparent" />
                    <span className="font-mono text-sm text-white/35">
                      {pad(total)}
                    </span>
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Headline — remounts per slide so words re-reveal */}
              <AnimatePresence mode="wait">
                <div key={`title-${activeIndex}`}>
                  <SplitText
                    text={title}
                    as="h1"
                    className="font-display text-fluid-4xl leading-[1.02] tracking-tightest text-white text-balance"
                  />
                </div>
              </AnimatePresence>

              {/* Subtitle */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={`sub-${activeIndex}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.25,
                  }}
                  className="mt-6 max-w-xl text-fluid-lg leading-relaxed text-white/65 text-pretty"
                >
                  {subtitle}
                </motion.p>
              </AnimatePresence>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <Magnetic>
                  <Link
                    href="/achievements"
                    className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gold px-8 py-4 font-semibold text-ink-900 shadow-gold transition-shadow duration-300 hover:shadow-[0_12px_44px_-6px_hsl(var(--gold)/0.6)]"
                  >
                    {/* Specular sweep on hover */}
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out-quint group-hover:translate-x-full" />
                    <span className="relative">Explore Achievements</span>
                    <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Magnetic>

                <Link
                  href="/about-us"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/5 hover:text-white"
                >
                  Learn more
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ---------- Layer 4: controls ---------- */}
        <div className="absolute inset-x-0 bottom-0 z-30">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 pb-8 sm:px-8 md:px-12">
            {hasSlides && (
              <div className="flex items-center gap-2.5">
                {slides.map((_, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <button
                      key={i}
                      onClick={() => swiperRef.current?.slideToLoop(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      aria-current={isActive}
                      className="group relative h-8 overflow-hidden rounded-full py-3"
                      style={{ width: isActive ? 56 : 24 }}
                    >
                      <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white/25 transition-colors group-hover:bg-white/50" />
                      {isActive && (
                        // Bar fills in time with autoplay — the dot doubles
                        // as the progress indicator.
                        <motion.span
                          key={`fill-${activeIndex}`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{
                            duration: SLIDE_MS / 1000,
                            ease: "linear",
                          }}
                          className="absolute inset-x-0 top-1/2 h-[3px] origin-left -translate-y-1/2 rounded-full bg-gold"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            <ScrollCue />
          </div>
        </div>
      </div>
    </HeroFrame>
  );
}

/** Scroll affordance that fades out once the user has actually scrolled. */
function ScrollCue() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className="ml-auto flex items-center gap-2.5 text-white/40"
    >
      <span className="eyebrow hidden sm:inline">Scroll</span>
      <motion.span
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20"
      >
        <MoveDown className="h-3.5 w-3.5" />
      </motion.span>
    </motion.div>
  );
}
