"use client";

import { api } from "@/convex/_generated/api";
import { cardRise } from "@/lib/motion";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";
import { useState } from "react";
import { Aurora, Stagger } from "../ui/motion-primitives";
import { PageHero } from "../ui/page-hero";
import { TestimonialDialog } from "./TestimonialDialog";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  body: string;
}

function TestimonialsSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="shimmer h-64 rounded-3xl border border-white/10 bg-white/[0.04]"
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.article
        variants={cardRise}
        onClick={() => setIsOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Read the full testimonial from ${testimonial.name}`}
        className="group edge-light spotlight relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-7 shadow-card transition-all duration-500 ease-out-quint hover:-translate-y-1.5 hover:border-azure/30 hover:shadow-lift"
      >
        {/* Oversized glyph as a watermark rather than a small icon */}
        <Quote
          className="absolute -right-3 -top-3 h-24 w-24 text-white/[0.04] transition-colors duration-500 group-hover:text-azure/10"
          aria-hidden="true"
        />

        <Quote className="mb-5 h-6 w-6 shrink-0 text-azure/60" aria-hidden="true" />

        <blockquote className="relative flex-1">
          <p className="line-clamp-5 text-sm leading-relaxed text-white/60">
            {testimonial.body}
          </p>
        </blockquote>

        <span className="relative mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-azure transition-colors group-hover:text-gold">
          Read full testimonial
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>

        <footer className="relative mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-azure text-sm font-bold text-white ring-1 ring-white/10">
            {testimonial.name[0]?.toUpperCase()}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-white">
              {testimonial.name}
            </span>
            <span className="block truncate text-xs text-white/35">
              {testimonial.role}
            </span>
          </span>
        </footer>
      </motion.article>

      <TestimonialDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        testimonial={testimonial}
      />
    </>
  );
}

export default function TestimonialsContainer() {
  const testimonials = useQuery(api.testimonials.getTestimonials);

  return (
    <main className="min-h-screen bg-ink-900">
      <PageHero
        id="testimonials-heading"
        eyebrow="Stories"
        title="Voices of"
        accent="Success"
        description="Hear from students, alumni, sponsors and collaborators about their DICOM experiences."
      />

      <section className="relative overflow-hidden bg-ink-800 px-5 py-24 grain sm:px-6 md:py-32">
        <Aurora className="-right-40 top-10 h-[460px] w-[460px]" color="azure" />

        <div className="relative z-10 mx-auto max-w-7xl">
          {testimonials === undefined ? (
            <TestimonialsSkeleton />
          ) : testimonials.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 py-24 text-center">
              <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
                <Quote className="h-7 w-7 text-white/25" />
              </span>
              <p className="font-display text-fluid-lg text-white/60">
                No testimonials available yet
              </p>
            </div>
          ) : (
            <Stagger
              className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
              gap={0.08}
            >
              {testimonials.map((t) => (
                <TestimonialCard key={t._id} testimonial={t} />
              ))}
            </Stagger>
          )}
        </div>
      </section>
    </main>
  );
}
