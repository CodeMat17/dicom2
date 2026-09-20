// Shared page furniture: the masthead every inner page opens with, the
// closing call-to-action band, and the two button treatments.
//
// All server components. The masthead in particular used to fade its own
// headline in from opacity 0, which delayed the Largest Contentful Paint on
// every inner page by the length of the animation; it now paints with the
// document and only the supporting copy animates.
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";
import { Aurora, Reveal, SplitText, Stagger } from "./motion-primitives";

export { Counter } from "./counter";

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
  /** Id given to the <h1>, so the section can label itself with it. */
  id?: string;
}) {
  return (
    <section
      className="relative overflow-hidden bg-ink-900 px-5 pb-20 pt-36 grain sm:px-6 md:pb-28 md:pt-44"
      aria-labelledby={id}
    >
      <Aurora
        className="-top-24 left-1/2 h-[520px] w-[760px] -translate-x-1/2"
        color="brand"
      />
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
        <p className="mb-6 flex items-center justify-center gap-3">
          <span
            aria-hidden
            className="h-px w-10 bg-gradient-to-r from-transparent to-gold"
          />
          <span className="eyebrow text-gold">{eyebrow}</span>
          <span
            aria-hidden
            className="h-px w-10 bg-gradient-to-l from-transparent to-gold"
          />
        </p>

        <SplitText
          id={id}
          text={accent ? `${title} ${accent}` : title}
          as="h1"
          className="font-display text-fluid-3xl leading-[1.05] tracking-tightest text-white text-balance"
        />

        {description && (
          <p className="mx-auto mt-7 max-w-2xl text-fluid-base leading-relaxed text-white/70 text-pretty">
            {description}
          </p>
        )}

        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
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
                  {title}{" "}
                  {accent && <span className="text-shine">{accent}</span>}
                </h2>
              </Reveal>
              {description && (
                <Reveal>
                  <p className="mx-auto mt-4 max-w-xl text-fluid-base text-white/70 text-pretty">
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

   Internal destinations route through <Link> so an in-app CTA is a
   client navigation rather than a full document load; mail and tel
   links stay as anchors.
------------------------------------------------------------------ */
const goldClasses =
  "group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gold px-8 py-4 font-semibold text-ink-900 shadow-gold transition-shadow duration-300 hover:shadow-[0_12px_44px_-6px_hsl(var(--gold)/0.6)]";

export function GoldButton({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const inner = (
    <>
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out-quint group-hover:translate-x-full"
      />
      <span className="relative flex items-center gap-2.5">{children}</span>
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cn(goldClasses, className)}>
        {inner}
      </Link>
    );
  }

  return (
    <a href={href} className={cn(goldClasses, className)}>
      {inner}
    </a>
  );
}
