"use client";

// A native <dialog> handles the modal semantics — focus trapping, Escape,
// inerting the page — which is what the dialog library here used to be for.
import { Quote, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  body: string;
}

/**
 * The card renders the quote on the server; this adds the control that opens
 * the unclamped version.
 */
export function TestimonialExpand({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (isOpen && !el.open) el.showModal();
    if (!isOpen && el.open) el.close();
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-azure transition-colors hover:text-gold"
      >
        Read {testimonial.name}&apos;s full testimonial
        <ArrowRight
          aria-hidden
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
        />
      </button>

      <dialog
        ref={ref}
        onClose={() => setIsOpen(false)}
        onClick={(e) => {
          if (e.target === ref.current) ref.current?.close();
        }}
        aria-labelledby={titleId}
        className="m-auto w-[min(32rem,calc(100vw-2rem))] max-h-[85vh] overflow-hidden rounded-4xl border border-white/10 bg-ink-700 p-0 text-white shadow-lift backdrop:bg-scrim/70 backdrop:backdrop-blur-md"
      >
        <div className="flex max-h-[85vh] flex-col">
          {/* Header */}
          <div className="relative shrink-0 overflow-hidden bg-gradient-to-br from-brand via-ink-700 to-ink-800 px-7 pb-6 pt-7">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-azure/25 blur-[70px]"
            />

            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="absolute right-4 top-4 rounded-full bg-white/5 p-2 text-white/70 transition-colors hover:bg-white/15 hover:text-white"
            >
              <X aria-hidden className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>

            <div className="relative flex items-center gap-4">
              <span
                aria-hidden
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-azure/15 ring-1 ring-azure/25"
              >
                <Quote className="h-5 w-5 text-azure" />
              </span>
              <div className="min-w-0">
                <p
                  id={titleId}
                  className="truncate font-display text-fluid-lg text-white"
                >
                  {testimonial.name}
                </p>
                <p className="truncate text-sm text-azure">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-7 py-6">
            <blockquote className="border-l-2 border-azure/40 pl-5 text-base leading-relaxed text-white/85">
              {testimonial.body}
            </blockquote>
          </div>

          {/* Footer */}
          <div className="shrink-0 border-t border-white/10 px-7 py-4">
            <button
              type="button"
              onClick={() => ref.current?.close()}
              className="w-full rounded-xl bg-white/5 py-3 text-sm font-medium text-white/80 transition-all duration-300 hover:bg-white/10 hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
