"use client";

import { cn } from "@/lib/utils";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Aurora, Reveal, SplitText, Stagger } from "./motion-primitives";

/* ------------------------------------------------------------------
   PageHero — the single masthead used by every inner page, so they all
   open with the same cadence instead of each rolling its own header.
------------------------------------------------------------------ */
export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  children,
  id,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  children?: ReactNode;
  id?: string;
}) {
  return (
    <section
      className="relative overflow-hidden bg-ink-900 px-5 pb-20 pt-36 grain sm:px-6 md:pb-28 md:pt-44"
      aria-labelledby={id}
    >
      <Aurora className="-top-24 left-1/2 h-[520px] w-[760px] -translate-x-1/2" color="brand" />
      <Aurora
        className="right-0 top-40 h-[320px] w-[320px]"
        color="azure"
        float={false}
      />

      {/* Faint grid to give the empty upper area structure */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.15] [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--azure)/0.25) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--azure)/0.25) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex items-center justify-center gap-3"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold" />
          <span className="eyebrow text-gold">{eyebrow}</span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold" />
        </motion.div>

        <SplitText
          text={accent ? `${title} ${accent}` : title}
          as="h1"
          delay={0.1}
          className="font-display text-fluid-3xl leading-[1.05] tracking-tightest text-white text-balance"
        />

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-7 max-w-2xl text-fluid-base leading-relaxed text-white/60 text-pretty"
          >
            {description}
          </motion.p>
        )}

    

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Counter — counts up once the value scrolls into view. Static numbers
   on a stat card look inert; the tick is what sells the achievement.
------------------------------------------------------------------ */
export function Counter({
  value,
  className,
  duration = 1600,
}: {
  value: number;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (reduce || value === 0) {
      setDisplay(value);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // Ease-out cubic: fast start, gentle landing on the final figure.
      setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value, duration, reduce]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {display}
    </span>
  );
}

/* ------------------------------------------------------------------
   CtaBand — the closing call-to-action shared by inner pages.
------------------------------------------------------------------ */
export function CtaBand({
  title,
  accent,
  description,
  children,
}: {
  title: string;
  accent?: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="relative bg-ink-900 px-5 py-24 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="edge-light relative overflow-hidden rounded-4xl border border-azure/20 bg-gradient-to-br from-brand via-ink-700 to-ink-800 px-8 py-16 text-center shadow-lift md:px-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-azure/20 blur-[80px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/12 blur-[80px]"
            />
            <Stagger className="relative" gap={0.1}>
              <Reveal>
                <h2 className="font-display text-fluid-2xl leading-tight text-white text-balance">
                  {title} {accent && <span className="text-shine">{accent}</span>}
                </h2>
              </Reveal>
              {description && (
                <Reveal>
                  <p className="mx-auto mt-4 max-w-xl text-fluid-base text-white/60 text-pretty">
                    {description}
                  </p>
                </Reveal>
              )}
              <Reveal>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                  {children}
                </div>
              </Reveal>
            </Stagger>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   GoldButton / GhostButton — the two CTA treatments, shared.
------------------------------------------------------------------ */
export function GoldButton({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gold px-8 py-4 font-semibold text-ink-900 shadow-gold transition-shadow duration-300 hover:shadow-[0_12px_44px_-6px_hsl(var(--gold)/0.6)]",
        className
      )}
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out-quint group-hover:translate-x-full" />
      <span className="relative flex items-center gap-2.5">{children}</span>
    </a>
  );
}
