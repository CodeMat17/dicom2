"use client";

// The two effects that genuinely need a pointer position. Everything else in
// the motion vocabulary is CSS — see ./motion-primitives.
import { cn } from "@/lib/utils";
import { useRef, type ReactNode } from "react";

/**
 * Surface that tracks the cursor with a soft azure bloom and lifts on hover.
 * The bloom is a CSS gradient positioned from two custom properties; writing
 * them straight onto the node keeps React out of the pointer path.
 */
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
    <div
      ref={ref}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className={cn(
        "group relative overflow-hidden rounded-3xl edge-light spotlight",
        "bg-gradient-to-b from-white/[0.07] to-white/[0.02]",
        "border border-white/10 shadow-card",
        "transition-[border-color,box-shadow,transform] duration-500 ease-out-quint",
        "hover:border-azure/30 hover:shadow-lift",
        lift && "motion-safe:hover:-translate-y-1.5",
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * The pointer subtly pulls the control toward it. Reserved for primary CTAs
 * so the gesture stays meaningful. Touch pointers are left alone.
 */
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

  return (
    <div
      ref={ref}
      className={cn(
        "inline-block transition-transform duration-300 ease-out-quint",
        className
      )}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * strength;
        const y = (e.clientY - (r.top + r.height / 2)) * strength;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }}
      onPointerLeave={() => {
        const el = ref.current;
        if (el) el.style.transform = "";
      }}
    >
      {children}
    </div>
  );
}
