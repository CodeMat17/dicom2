"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

export function HeroCarousel() {
  const heroData = useQuery(api.heroSlides.getHeroSlides);

  const [fallbackSrc, setFallbackSrc] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (heroData === undefined) {
    return (
      <div className='relative h-[80vh] w-full bg-gray-100 animate-pulse'>
        <Image
          alt='Loading placeholder'
          priority
          fill
          className='object-cover'
          src='/fallback.webp'
        />
      </div>
    );
  }

  if (!heroData?.length) {
    return (
      <div className='relative h-[80vh] w-full bg-gray-100 flex items-center justify-center'>
        <Image
          alt='Loading placeholder'
          priority
          fill
          className='object-cover'
          src='/fallback.webp'
        />
        <div className='relative z-10 text-center text-white'>
          <h1 className='text-4xl font-bold'>
            Welcome to the Directorate Competitions
          </h1>
        </div>
      </div>
    );
  }

  return (
    <section className='relative w-full h-[80vh] aspect-video overflow-hidden'>
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        effect='fade'
        loop
        pagination={{ clickable: true, }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className='h-full w-full z-0'>
        {heroData.map((data, index) => {
          const imageUrl =
            fallbackSrc === data.imgUrl
              ? "/fallback.webp"
              : (data.imgUrl ?? "/fallback.webp");

          return (
            <SwiperSlide key={data._id}>
              <div className='relative h-full w-full'>
                <Image
                  src={imageUrl}
                  alt={data.alt || "Hero image"}
                  fill
                  className='object-cover object-center absolute inset-0'
                  priority={index === 0}
                  quality={85}
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw'
                  onError={() => setFallbackSrc(data.imgUrl ?? null)}
                />

                <AnimatePresence mode='wait'>
                  {activeIndex === index && (
                    <motion.div
                      key={data._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className='absolute inset-0 bg-black/40 flex items-center justify-center z-10'>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                        className='text-center px-4 max-w-4xl'>
                        <motion.h1
                          initial={{ y: 40, scale: 0.95, opacity: 0 }}
                          animate={{ y: 0, scale: 1, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{
                            duration: 0.8,
                            ease: "easeOut",
                            delay: 0.1,
                          }}
                          className='text-4xl md:text-6xl font-bold text-white mb-4'>
                          {data.title}
                        </motion.h1>

                        <motion.p
                          initial={{ y: 60, scale: 0.95, opacity: 0 }}
                          animate={{ y: 0, scale: 1, opacity: 1 }}
                          exit={{ y: -30, opacity: 0 }}
                          transition={{
                            duration: 0.8,
                            ease: "easeOut",
                            delay: 0.3,
                          }}
                          className='text-xl text-white/90 mb-8'>
                          {data.subtitle}
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* Swiper Pagination Container */}
      {/* <div className='custom-swiper-pagination absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex justify-center items-center bg-white/10 py-1  px-0.5 rounded-full' /> */}
    </section>
  );
}
