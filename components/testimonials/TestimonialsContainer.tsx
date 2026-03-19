"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useState } from "react";
import { TestimonialDialog } from "./TestimonialDialog";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  body: string;
}

function TestimonialsSkeleton() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="rounded-2xl bg-white/5 border border-white/8 animate-pulse p-7 h-56" />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.07, duration: 0.5 }}
        whileHover={{ y: -4 }}
        className="group relative bg-white/4 border border-white/10 rounded-2xl p-7 flex flex-col hover:border-[#179BD7]/30 hover:bg-white/6 transition-all duration-300 cursor-pointer"
        onClick={() => setIsOpen(true)}
        aria-label={`Testimonial from ${testimonial.name} — click to read full`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setIsOpen(true)}
      >
        {/* Top accent line */}
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#179BD7]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <Quote className="w-7 h-7 text-[#179BD7]/50 mb-4 shrink-0" aria-hidden="true" />

        <blockquote className="flex-1 mb-5">
          <p className="text-white/55 text-sm leading-relaxed line-clamp-4">{testimonial.body}</p>
        </blockquote>

        <button
          className="self-start text-xs text-[#179BD7] hover:text-white font-medium transition-colors mb-4"
          onClick={(e) => { e.stopPropagation(); setIsOpen(true); }}
        >
          Read full testimonial →
        </button>

        <footer className="border-t border-white/8 pt-4 mt-auto">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#213675] to-[#179BD7] flex items-center justify-center text-white font-bold text-sm shrink-0">
              {testimonial.name[0]?.toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-white text-sm">{testimonial.name}</p>
              <p className="text-white/35 text-xs">{testimonial.role}</p>
            </div>
          </div>
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
    <main className="min-h-screen bg-[#060e1e]" aria-labelledby="testimonials-heading">
      {/* Hero */}
      <section className="relative pt-28 pb-16 px-4 overflow-hidden" aria-labelledby="testimonials-heading">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#213675]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-2 mb-5">
              <div className="h-px w-8 bg-yellow-400" />
              <span className="text-yellow-400 text-sm font-mono tracking-widest uppercase">Stories</span>
              <div className="h-px w-8 bg-yellow-400" />
            </div>

            <h1
              id="testimonials-heading"
              className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4"
            >
              Voices of <span className="text-[#179BD7]">Success</span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Hear from students, alumni, sponsors and collaborators about their DICOM experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 px-4 max-w-7xl mx-auto pb-24">
        {testimonials === undefined ? (
          <TestimonialsSkeleton />
        ) : testimonials.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-white/25">
            <Quote className="w-12 h-12 mb-4" />
            <p className="text-lg">No testimonials available yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t._id} testimonial={t} index={i} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
