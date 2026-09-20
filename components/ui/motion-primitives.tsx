"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { createContext, useContext, useRef, type ReactNode } from "react";

/** Set inside a <Stagger> so descendant <Reveal>s defer to the parent. */
const StaggerContext = createContext(false);
import {
  fadeUp,
  inView,
  stagger,
  wordReveal,
} from "@/lib/motion";

/* ------------------------------------------------------------------
   Reveal — scroll-triggered entrance. Replaces the inline
   initial/whileInView/transition trio that was copy-pasted everywhere.
------------------------------------------------------------------ */
export function Reveal({
  children,
  className,
  variants = fadeUp,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  as?: "div" | "section" | "article" | "aside" | "li";
}) {
  const MotionTag = motion[as];
  const nested = useContext(StaggerContext);

  // A variant's own `transition` beats the component's `transition` prop, so
  // the delay has to be merged into the variant rather than passed alongside.
  const resolved = delay ? withDelay(variants, delay) : variants;

  // Inside a <Stagger>, the parent drives the animation. Declaring our own
  // initial/whileInView here would opt this element out of that sequence.
  const orchestration = nested
    ? {}
    : { initial: "hidden", whileInView: "visible", viewport: inView };

  return (
    <MotionTag className={className} variants={resolved} {...orchestration}>
      {children}
    </MotionTag>
  );
}

/** Returns a copy of `variants` with `delay` folded into its visible state. */
function withDelay(variants: Variants, delay: number): Variants {
  const visible = variants.visible;
  if (!visible || typeof visible === "function") return variants;

  const { transition, ...rest } = visible;
  return {
    ...variants,
    visible: { ...rest, transition: { ...transition, delay } },
  };
}

/* ------------------------------------------------------------------
   Stagger — parent wrapper that releases <Reveal> children in sequence.
------------------------------------------------------------------ */
export function Stagger({
  children,
  className,
  gap = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
}) {
  return (
    <StaggerContext.Provider value={true}>
      <motion.div
        className={className}
        variants={stagger(gap, delay)}
        initial="hidden"
        whileInView="visible"
        viewport={inView}
      >
        {children}
      </motion.div>
    </StaggerContext.Provider>
  );
}

/* ------------------------------------------------------------------
   SplitText — reveals a headline word by word. The single biggest
   upgrade to how "authored" a hero feels versus one block fading in.
------------------------------------------------------------------ */
export function SplitText({
  text,
  className,
  delay = 0,
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "p";
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag className={className}>
      <motion.span
        className="inline"
        variants={stagger(0.055, delay)}
        initial="hidden"
        animate="visible"
      >
        {words.map((word, i) => (
          // The clipping span lets each word rise out of its own line box.
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden align-bottom pb-[0.12em]"
          >
            <motion.span className="inline-block" variants={wordReveal}>
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/* ------------------------------------------------------------------
   SectionHeading — one canonical header block. Previously this markup
   was duplicated in three sections with slightly different spacing.
------------------------------------------------------------------ */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <Stagger
      className={cn(
        "relative z-10",
        centered && "text-center flex flex-col items-center",
        className
      )}
      gap={0.1}
    >
      <Reveal>
        <div
          className={cn(
            "flex items-center gap-3 mb-5",
            centered && "justify-center"
          )}
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold" />
          <span className="eyebrow text-gold">{eyebrow}</span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold" />
        </div>
      </Reveal>

      <Reveal>
        <h2
          className={cn(
            "font-display text-fluid-2xl text-white leading-[1.08] text-balance",
            centered ? "max-w-3xl" : "max-w-2xl"
          )}
        >
          {title}{" "}
          {accent && <span className="text-shine">{accent}</span>}
        </h2>
      </Reveal>

      {description && (
        <Reveal>
          <p
            className={cn(
              "mt-5 text-fluid-base text-white/55 leading-relaxed text-pretty",
              centered ? "max-w-2xl" : "max-w-xl"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </Stagger>
  );
}

/* ------------------------------------------------------------------
   SpotlightCard — surface that tracks the cursor with a soft azure
   bloom and lifts on hover. Gives cards physical presence.
------------------------------------------------------------------ */
export function SpotlightCard({
  children,
  className,
  lift = true,
}: {
  children: ReactNode;
  className?: string;
  lift?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      whileHover={lift ? { y: -6 } : undefined}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group relative overflow-hidden rounded-3xl edge-light spotlight",
        "bg-gradient-to-b from-white/[0.07] to-white/[0.02]",
        "border border-white/10 shadow-card",
        "transition-[border-color,box-shadow] duration-500 ease-out-quint",
        "hover:border-azure/30 hover:shadow-lift",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   MagneticButton — the pointer subtly pulls the control toward it.
   Reserved for primary CTAs so the gesture stays meaningful.
------------------------------------------------------------------ */
export function Magnetic({
  children,
  className,
  strength = 0.25,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20 });
  const sy = useSpring(y, { stiffness: 260, damping: 20 });

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className={cn("inline-block", className)}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   Parallax — translates content against scroll for layered depth.
------------------------------------------------------------------ */
export function Parallax({
  children,
  className,
  distance = 60,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------
   ScrollProgress — hairline reading indicator pinned under the navbar.
------------------------------------------------------------------ */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-azure via-gold to-azure"
      aria-hidden
    />
  );
}

/* ------------------------------------------------------------------
   Aurora — decorative bloom layer. Kept as a component so the blur
   radius and opacity stay consistent across every section.
------------------------------------------------------------------ */
export function Aurora({
  className,
  color = "brand",
  float = true,
}: {
  className?: string;
  color?: "brand" | "azure" | "gold";
  float?: boolean;
}) {
  const tint = {
    brand: "bg-brand/30",
    azure: "bg-azure/20",
    gold: "bg-gold/10",
  }[color];

  return (
    <div
      aria-hidden
      className={cn("aurora", tint, float && "animate-float-slow", className)}
    />
  );
}
