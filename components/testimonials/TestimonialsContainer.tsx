import { Quote } from "lucide-react";
import { Aurora, Reveal, Stagger } from "../ui/motion-primitives";
import { PageHero } from "../ui/page-hero";
import { TestimonialExpand, type Testimonial } from "./TestimonialDialog";

export type { Testimonial };

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Reveal
      as="article"
      variant="card"
      className="group edge-light spotlight relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-7 shadow-card transition-all duration-500 ease-out-quint hover:-translate-y-1.5 hover:border-azure/30 hover:shadow-lift"
    >
      {/* Oversized glyph as a watermark rather than a small icon */}
      <Quote
        aria-hidden
        className="absolute -right-3 -top-3 h-24 w-24 text-white/[0.04] transition-colors duration-500 group-hover:text-azure/10"
      />

      <Quote aria-hidden className="mb-5 h-6 w-6 shrink-0 text-azure/60" />

      <blockquote className="relative flex-1">
        <p className="line-clamp-5 text-sm leading-relaxed text-white/75">
          {testimonial.body}
        </p>
      </blockquote>

      <TestimonialExpand testimonial={testimonial} />

      <footer className="relative mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
        <span
          aria-hidden
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-azure text-sm font-bold text-white ring-1 ring-white/10"
        >
          {testimonial.name[0]?.toUpperCase()}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-white">
            {testimonial.name}
          </span>
          <span className="block truncate text-xs text-white/70">
            {testimonial.role}
          </span>
        </span>
      </footer>
    </Reveal>
  );
}

export default function TestimonialsContainer({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  return (
    <div className="min-h-screen bg-ink-900">
      <PageHero
        id="testimonials-heading"
        eyebrow="Stories"
        title="Voices of"
        accent="Success"
        description="Hear from students, alumni, sponsors and collaborators about their DICOM experiences."
      />

      <section
        className="relative overflow-hidden bg-ink-800 px-5 py-24 grain sm:px-6 md:py-32"
        aria-label="Testimonials"
      >
        <Aurora className="-right-40 top-10 h-[460px] w-[460px]" color="azure" />

        <div className="relative z-10 mx-auto max-w-7xl">
          {testimonials.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 py-24 text-center">
              <span
                aria-hidden
                className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5"
              >
                <Quote className="h-7 w-7 text-white/70" />
              </span>
              <p className="font-display text-fluid-lg text-white/70">
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
    </div>
  );
}
