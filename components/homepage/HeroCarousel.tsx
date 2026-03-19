"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { A11y, Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/effect-fade";

const pad = (n: number) => String(n).padStart(2, "0");

function HeroSkeleton() {
  return (
    <div className="relative h-[90vh] w-full bg-[#0a1628] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#213675]/40 via-[#0a1628] to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 max-w-6xl mx-auto gap-5">
        <div className="h-3 w-28 bg-white/10 rounded-full" />
        <div className="h-16 w-3/4 bg-white/10 rounded-xl" />
        <div className="h-6 w-1/2 bg-white/10 rounded-lg" />
        <div className="h-12 w-40 bg-white/10 rounded-full mt-4" />
      </div>
    </div>
  );
}

export function HeroCarousel() {
  const heroData = useQuery(api.heroSlides.getHeroSlides);
  const [fallbackSrc, setFallbackSrc] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  if (heroData === undefined) return <HeroSkeleton />;

  if (!heroData?.length) {
    return (
      <div className="relative h-[90vh] w-full overflow-hidden">
        <Image alt="DICOM welcome" priority fill className="object-cover" src="/fallback.webp" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center px-6 md:px-20">
          <h1 className="text-5xl md:text-7xl font-bold text-white max-w-3xl leading-tight">
            Welcome to the Directorate of Competitions
          </h1>
        </div>
      </div>
    );
  }

  const total = heroData.length;
  const current = heroData[activeIndex];

  return (
    <section className="relative w-full h-[90vh] overflow-hidden" aria-label="Hero carousel">
      {/* Swiper — images only */}
      <Swiper
        modules={[Autoplay, EffectFade, A11y]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        effect="fade"
        loop
        speed={1200}
        onSwiper={(s) => { swiperRef.current = s; }}
        onSlideChange={(s) => setActiveIndex(s.realIndex)}
        className="absolute inset-0 h-full w-full"
        a11y={{ prevSlideMessage: "Previous slide", nextSlideMessage: "Next slide" }}
      >
        {heroData.map((data, index) => {
          const src = fallbackSrc === data.imgUrl ? "/fallback.webp" : (data.imgUrl ?? "/fallback.webp");
          return (
            <SwiperSlide key={data._id}>
              <Image
                src={src}
                alt={data.alt || data.title}
                fill
                className="object-cover object-center"
                priority={index === 0}
                quality={90}
                sizes="100vw"
                onError={() => setFallbackSrc(data.imgUrl ?? null)}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      {/* Main content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl w-full mx-auto">

          {/* Slide counter */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`badge-${activeIndex}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="font-mono text-yellow-400 text-sm tracking-widest">{pad(activeIndex + 1)}</span>
              <div className="h-px w-10 bg-yellow-400/60" />
              <span className="font-mono text-white/40 text-sm tracking-widest">{pad(total)}</span>
            </motion.div>
          </AnimatePresence>

          {/* Title */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`title-${activeIndex}`}
              initial={{ opacity: 0, y: 50, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(4px)" }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] max-w-4xl"
            >
              {current?.title}
            </motion.h1>
          </AnimatePresence>

          {/* Subtitle */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${activeIndex}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
              className="text-base md:text-xl text-white/70 mt-5 max-w-xl leading-relaxed"
            >
              {current?.subtitle}
            </motion.p>
          </AnimatePresence>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              href="/achievements"
              className="group inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-7 py-3.5 rounded-full transition-all duration-300"
            >
              Explore Achievements
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/about-us"
              className="text-white/70 hover:text-white text-sm font-medium transition-colors duration-200 underline underline-offset-4"
            >
              Learn more
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom: slide dots + progress */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        {/* Progress bar */}
        <div className="h-0.5 bg-white/10 w-full">
          <motion.div
            key={`progress-${activeIndex}`}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 6, ease: "linear" }}
            className="h-full bg-yellow-400"
          />
        </div>

        {/* Dots */}
        <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 py-5">
          <div className="flex gap-2">
            {heroData.map((_, i) => (
              <button
                key={i}
                onClick={() => swiperRef.current?.slideToLoop(i)}
                className={`rounded-full transition-all duration-400 ${
                  i === activeIndex
                    ? "w-8 h-2 bg-yellow-400"
                    : "w-2 h-2 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Scroll hint */}
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex items-center gap-1.5 text-white/40 text-xs font-mono tracking-widest uppercase"
          >
            <span>Scroll</span>
            <ChevronDown className="w-3 h-3" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
