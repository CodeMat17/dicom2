import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion vocabulary.
 *
 * Every animated surface pulls its easing and variants from here so the
 * whole site moves with one personality instead of each component
 * inventing its own duration and curve.
 */

/** Decelerating curves. Expo is the "premium" feel: fast out, long settle. */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeOutQuint = [0.22, 1, 0.36, 1] as const;

export const springSoft: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 28,
  mass: 0.9,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 32,
};

/** Standard viewport trigger — fires slightly before the element is centred. */
export const inView = { once: true, margin: "-80px" } as const;

/** Parent that releases its children in sequence. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren, delayChildren },
  },
});

/** The workhorse: rise + fade, with a touch of blur for depth. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: easeOutExpo },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: easeOutExpo } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -36, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easeOutExpo },
  },
};

/** Cards settle in with a slight scale so they feel like objects, not text. */
export const cardRise: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: easeOutExpo },
  },
};

/** Per-word headline reveal, used by <SplitText />. */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: "0.6em", filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: easeOutExpo },
  },
};

/** Modal / dialog entrance. */
export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: springSoft },
  exit: { opacity: 0, scale: 0.96, y: 12, transition: { duration: 0.2 } },
};
