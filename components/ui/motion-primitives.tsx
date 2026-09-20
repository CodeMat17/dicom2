// Motion vocabulary for the whole site.
//
// These are server components: the entrances they describe are declared as
// CSS in globals.css and driven by one shared IntersectionObserver
// (<RevealObserver />, mounted in the root layout). Nothing here ships an
// animation runtime, and a page built from these primitives can render with
// no client JavaScript at all.
//
// The two genuinely pointer-driven effects — <Magnetic> and <SpotlightCard>
// — live in ./motion-interactions as small client components.
import { cn } from "@/lib/utils";
import type { CSSProperties, ReactNode } from "react";

export { Magnetic, SpotlightCard } from "./motion-interactions";

/** Entrance shapes. `up` is the workhorse; the rest are named at call sites. */
export type RevealVariant = "up" | "card" | "left" | "fade" | "pop";

type RevealTag =
  | "div"
  | "section"
  | "article"
  | "aside"
  | "ul"
  | "ol"
  | "li"
  | "span";

/* ------------------------------------------------------------------
   Reveal — scroll-triggered entrance.
------------------------------------------------------------------ */
export function Reveal({
  children,
  className,
  variant = "up",
  delay = 0,
  as: Tag = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  /** Seconds, matching the old motion prop. */
  delay?: number;
  as?: RevealTag;
  style?: CSSProperties;
}) {
  return (
    <Tag
      data-reveal={variant}
      className={className}
      style={
        delay
          ? ({
              ...style,
              "--reveal-delay": `${delay * 1000}ms`,
            } as CSSProperties)
          : style
      }
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   Stagger — releases its direct children in sequence. The offsets are
   assigned by nth-child in CSS, so the container never has to inspect
   or clone what it wraps.
------------------------------------------------------------------ */
export function Stagger({
  children,
  className,
  gap = 0.08,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  /** Seconds between children. */
  gap?: number;
  /** Seconds before the first child. */
  delay?: number;
  as?: RevealTag;
}) {
  return (
    <Tag
      data-stagger=""
      className={className}
      style={
        {
          "--stagger-gap": `${gap * 1000}ms`,
          ...(delay ? { "--reveal-delay": `${delay * 1000}ms` } : null),
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   SplitText — headline type.

   This used to reveal word by word from opacity 0. On a hero that word
   is the Largest Contentful Paint, so the entrance was costing roughly
   a second of measured load for an effect nobody waits around for; the
   headline now paints with the document.
------------------------------------------------------------------ */
export function SplitText({
  text,
  className,
  id,
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  id?: string;
  as?: "h1" | "h2" | "p";
}) {
  return (
    <Tag id={id} className={className}>
      {text}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   SectionHeading — one canonical header block.
------------------------------------------------------------------ */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  className,
  id,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** Set this when a <section> points at the heading with aria-labelledby. */
  id?: string;
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
          <span
            aria-hidden
            className="h-px w-10 bg-gradient-to-r from-transparent to-gold"
          />
          <span className="eyebrow text-gold">{eyebrow}</span>
          <span
            aria-hidden
            className="h-px w-10 bg-gradient-to-l from-transparent to-gold"
          />
        </div>
      </Reveal>

      <Reveal>
        <h2
          id={id}
          className={cn(
            "font-display text-fluid-2xl text-white leading-[1.08] text-balance",
            centered ? "max-w-3xl" : "max-w-2xl"
          )}
        >
          {title} {accent && <span className="text-shine">{accent}</span>}
        </h2>
      </Reveal>

      {description && (
        <Reveal>
          <p
            className={cn(
              "mt-5 text-fluid-base text-white/70 leading-relaxed text-pretty",
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
   ScrollProgress — hairline reading indicator pinned under the navbar.
   Scroll-driven in CSS where the browser supports it, and simply flat
   where it does not.
------------------------------------------------------------------ */
export function ScrollProgress() {
  return (
    <div
      aria-hidden
      className="scroll-progress fixed left-0 right-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-azure via-gold to-azure"
    />
  );
}

/* ------------------------------------------------------------------
   Aurora — decorative bloom layer.
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
