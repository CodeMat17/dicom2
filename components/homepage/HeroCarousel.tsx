"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { A11y, Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

// Loading skeleton component for better UX
function HeroSkeleton() {
  return (
    <div
      className='relative h-[80vh] w-full bg-gray-100 animate-pulse'
      role='status'
      aria-label='Loading hero section'>
      <div className='absolute inset-0 bg-gray-200 dark:bg-gray-700' />
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='space-y-4 text-center'>
          <div className='h-40 w-64 bg-gray-300 dark:bg-gray-600 rounded mx-auto' />
          <div className='h-8 w-64 bg-gray-300 dark:bg-gray-600 rounded mx-auto' />
          <div className='h-4 w-48 bg-gray-300 dark:bg-gray-600 rounded mx-auto' />
        </div>
      </div>
    </div>
  );
}

export function HeroCarousel() {
  const heroData = useQuery(api.heroSlides.getHeroSlides);

  const [fallbackSrc, setFallbackSrc] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Generate structured data for the carousel
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement:
      heroData?.map((slide, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "ImageObject",
          name: slide.title,
          description: slide.subtitle,
          contentUrl: slide.imgUrl,
        },
      })) || [],
  };

  if (heroData === undefined) {
    return <HeroSkeleton />;
  }

  if (!heroData?.length) {
    return (
      <div
        className='relative h-[80vh] w-full bg-gray-100 flex items-center justify-center'
        role='region'
        aria-label='Welcome section'>
        <Image
          alt='DICOM welcome background'
          priority
          fill
          className='object-cover'
          src='/fallback.webp'
          sizes='100vw'
        />
        <div className='relative z-10 text-center text-white'>
          <h1 className='text-4xl font-bold'>
            Welcome to the Directorate of Competitions
          </h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <section
        className='relative w-full h-[80vh] aspect-video overflow-hidden'
        aria-label='Hero carousel'
        role='region'>
        <Swiper
          modules={[Autoplay, EffectFade, Pagination, A11y]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          effect='fade'
          loop
          pagination={{
            clickable: true,
            bulletActiveClass: "swiper-pagination-bullet-active",
            bulletClass: "swiper-pagination-bullet",
            renderBullet: (index, className) => {
              return `<button class="${className}" aria-label="Go to slide ${index + 1}"></button>`;
            },
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className='h-full w-full z-0'
          a11y={{
            prevSlideMessage: "Previous slide",
            nextSlideMessage: "Next slide",
            firstSlideMessage: "This is the first slide",
            lastSlideMessage: "This is the last slide",
            paginationBulletMessage: "Go to slide {{index}}",
          }}>
          {heroData.map((data, index) => {
            const imageUrl =
              fallbackSrc === data.imgUrl
                ? "/fallback.webp"
                : (data.imgUrl ?? "/fallback.webp");

            return (
              <SwiperSlide
                key={data._id}
                aria-label={`Slide ${index + 1}: ${data.title}`}>
                <div className='relative h-full w-full'>
                  <Image
                    src={imageUrl}
                    alt={data.alt || `Hero image: ${data.title}`}
                    fill
                    className='object-cover object-center absolute inset-0'
                    priority={index === 0}
                    quality={85}
                    sizes='100vw'
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
                          <motion.h2
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
                          </motion.h2>

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
      </section>
    </>
  );
}
