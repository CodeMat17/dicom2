"use client";

// The hero is server-rendered from data the page already has: the headline,
// the subtitle and the first photograph are in the HTML that leaves the CDN,
// which is what the Largest Contentful Paint measures. Hydration only adds
// the rotation between slides.
//
// Crossfading is plain CSS opacity on stacked images, so this no longer pulls
// in a carousel library or an animation runtime for what is a fade.
import { cn } from "@/lib/utils";
import { ArrowRight, MoveDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Magnetic } from "../ui/motion-interactions";

export type HeroSlide = {
  _id: string;
  title: string;
  subtitle?: string;
  alt?: string;
  imgUrl?: string | null;
};

const SLIDE_MS = 6500;
const pad = (n: number) => String(n).padStart(2, "0");

const FALLBACK = {
  title: "Welcome to the Directorate of Competitions",
  subtitle:
    "Empowering students through competition and excellence at Godfrey Okoye University.",
};

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [failed, setFailed] = useState<Set<string>>(new Set());
  const [paused, setPaused] = useState(false);

  const total = slides.length;
  const hasSlides = total > 0;

  // Autoplay stops while the tab is hidden — a background tab should not be
  // repainting a full-bleed photograph every few seconds.
  useEffect(() => {
    if (total < 2 || paused) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const id = window.setInterval(
      () => setActiveIndex((i) => (i + 1) % total),
      SLIDE_MS
    );
    return () => window.clearInterval(id);
  }, [total, paused]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const markFailed = useCallback((id: string) => {
    setFailed((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const current = slides[activeIndex];
  const title = hasSlides ? (current?.title ?? "") : FALLBACK.title;
  const subtitle = hasSlides ? current?.subtitle : FALLBACK.subtitle;

  return (
    <section
      className="relative h-[100svh] w-full overflow-hidden grain"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0">
        {/* ---------- Layer 1: imagery ---------- */}
        <div className="absolute inset-0">
          {hasSlides ? (
            slides.map((slide, index) => {
              const src = failed.has(slide._id)
                ? "/fallback.webp"
                : (slide.imgUrl ?? "/fallback.webp");
              const isActive = index === activeIndex;
              return (
                <div
                  key={slide._id}
                  aria-hidden={!isActive}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-[1400ms] ease-out-quint",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                >
                  <Image
                    src={src}
                    alt={slide.alt || slide.title}
                    fill
                    // Slow push-in on the live slide keeps a static
                    // photograph from feeling like a dead backdrop.
                    className={cn(
                      "object-cover object-center",
                      isActive && "animate-ken-burns"
                    )}
                    priority={index === 0}
                    loading={index === 0 ? undefined : "lazy"}
                    quality={72}
                    sizes="100vw"
                    onError={() => markFailed(slide._id)}
                  />
                </div>
              );
            })
          ) : (
            <Image
              src="/fallback.webp"
              alt=""
              priority
              fill
              className="object-cover"
              sizes="100vw"
            />
          )}
        </div>

        {/* ---------- Layer 2: cinematic grading ---------- */}
        {/* Three stacked washes: a left-weighted scrim for text contrast,
            a floor gradient to seat the controls, and a navy tint that
            pulls the photography into the brand palette. */}
        <div
          aria-hidden
          className="absolute inset-0 z-10 bg-gradient-to-r from-ink-900 via-ink-900/75 to-ink-900/30"
        />
        <div
          aria-hidden
          className="absolute inset-0 z-10 bg-gradient-to-t from-ink-900 via-ink-900/20 to-ink-900/50"
        />
        <div aria-hidden className="absolute inset-0 z-10 bg-brand/20 mix-blend-color" />

        {/* ---------- Layer 3: content ---------- */}
        <div className="absolute inset-0 z-20 flex items-center">
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 md:px-12">
            <div className="max-w-4xl">
              {hasSlides && total > 1 && (
                <p className="mb-7 flex items-center gap-3">
                  <span className="font-mono text-sm text-gold">
                    {pad(activeIndex + 1)}
                  </span>
                  <span
                    aria-hidden
                    className="h-px w-12 bg-gradient-to-r from-gold to-transparent"
                  />
                  <span className="font-mono text-sm text-white/70">
                    {pad(total)}
                  </span>
                  <span className="sr-only">
                    Slide {activeIndex + 1} of {total}
                  </span>
                </p>
              )}

              <h1
                id="hero-heading"
                className="font-display text-fluid-4xl leading-[1.02] tracking-tightest text-white text-balance"
              >
                {title}
              </h1>

              {subtitle && (
                <p className="mt-6 max-w-xl text-fluid-lg leading-relaxed text-white/80 text-pretty">
                  {subtitle}
                </p>
              )}

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Link
                    href="/achievements"
                    className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gold px-8 py-4 font-semibold text-ink-900 shadow-gold transition-shadow duration-300 hover:shadow-[0_12px_44px_-6px_hsl(var(--gold)/0.6)]"
                  >
                    {/* Specular sweep on hover */}
                    <span
                      aria-hidden
                      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out-quint group-hover:translate-x-full"
                    />
                    <span className="relative">Explore Achievements</span>
                    <ArrowRight
                      aria-hidden
                      className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </Magnetic>

                <Link
                  href="/about-us"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-medium text-white transition-all duration-300 hover:border-white/50 hover:bg-white/10"
                >
                  Learn more
                  <ArrowRight
                    aria-hidden
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Layer 4: controls ---------- */}
        <div className="absolute inset-x-0 bottom-0 z-30">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 pb-8 sm:px-8 md:px-12">
            {hasSlides && total > 1 && (
              <div className="flex items-center gap-2.5">
                {slides.map((slide, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <button
                      key={slide._id}
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      aria-label={`Show slide ${i + 1}: ${slide.title}`}
                      aria-current={isActive ? "true" : undefined}
                      className="group relative h-8 overflow-hidden rounded-full py-3 transition-[width] duration-500 ease-out-quint"
                      style={{ width: isActive ? 56 : 24 }}
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full transition-colors",
                          isActive
                            ? "bg-gold"
                            : "bg-white/40 group-hover:bg-white/70"
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            )}

            <ScrollCue />
          </div>
        </div>
      </div>
    </section>
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
    <div
      aria-hidden
      className={cn(
        "ml-auto flex items-center gap-2.5 text-white/70 transition-opacity duration-500",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      <span className="eyebrow hidden sm:inline">Scroll</span>
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 animate-bob">
        <MoveDown className="h-3.5 w-3.5" />
      </span>
    </div>
  );
}
