"use client";

import { api } from "@/convex/_generated/api";
import { cardRise } from "@/lib/motion";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, MapPin, StickyNote } from "lucide-react";
import Link from "next/link";
import {
  Aurora,
  Magnetic,
  Reveal,
  SectionHeading,
  Stagger,
} from "../ui/motion-primitives";

interface Event {
  _id: string;
  title: string;
  date?: string;
  location?: string;
  note?: string;
}

function EventsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="shimmer rounded-3xl border border-white/10 bg-white/[0.04] p-6"
        >
          <div className="h-5 w-2/3 rounded-lg bg-white/[0.06]" />
          <div className="mt-4 flex gap-4">
            <div className="h-3 w-32 rounded bg-white/[0.06]" />
            <div className="h-3 w-40 rounded bg-white/[0.06]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function EventsSection() {
  const events = useQuery(api.events.getEvents);

  return (
    <section
      className="relative overflow-hidden bg-ink-800 py-28 grain md:py-36"
      aria-labelledby="events-heading"
    >
      <Aurora className="-right-40 top-1/4 h-[520px] w-[520px]" color="azure" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          {/* Sticky intro rail — the header stays with the list as it scrolls */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Calendar"
              title="Upcoming"
              accent="events"
              description="Stay informed about our upcoming competitions, seminars, and institutional events."
            />

            <Reveal>
              <Magnetic>
                <Link
                  href="/contact-us"
                  className="group mt-9 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-6 py-3.5 text-sm font-medium text-white ring-1 ring-white/15 transition-all duration-300 hover:bg-azure/15 hover:ring-azure/50"
                >
                  Register your interest
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Magnetic>
            </Reveal>
          </div>

          {/* Timeline */}
          <div>
            {events === undefined ? (
              <EventsSkeleton />
            ) : events.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 py-20 text-center">
                <span className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
                  <Calendar className="h-7 w-7 text-white/25" />
                </span>
                <p className="font-display text-fluid-lg text-white/60">
                  No upcoming events
                </p>
                <p className="mt-2 text-sm text-white/35">
                  New dates are announced here first.
                </p>
              </div>
            ) : (
              <Stagger className="relative" gap={0.09}>
                {/* Spine the entries hang from */}
                <span
                  aria-hidden
                  className="absolute left-[11px] top-3 bottom-3 w-px bg-gradient-to-b from-azure/60 via-white/10 to-transparent"
                />

                <ul className="space-y-4">
                  {events.map((event: Event) => (
                    <motion.li
                      key={event._id}
                      variants={cardRise}
                      className="relative pl-10"
                    >
                      {/* Node */}
                      <span
                        aria-hidden
                        className="absolute left-0 top-7 flex h-6 w-6 items-center justify-center rounded-full border border-azure/40 bg-ink-800"
                      >
                        <span className="h-2 w-2 rounded-full bg-azure transition-transform duration-500 group-hover/item:scale-150" />
                      </span>

                      <article className="group/item edge-light spotlight relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 shadow-card transition-all duration-500 ease-out-quint hover:-translate-y-1 hover:border-azure/30 hover:shadow-lift">
                        <h3 className="font-display text-fluid-lg leading-snug text-white transition-colors duration-300 group-hover/item:text-azure">
                          {event.title}
                        </h3>

                        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                          {event.date && (
                            <Meta icon={Calendar} tone="gold">
                              {event.date}
                            </Meta>
                          )}
                          {event.location && (
                            <Meta icon={MapPin} tone="azure">
                              {event.location}
                            </Meta>
                          )}
                        </div>

                        {event.note && (
                          <div className="mt-5 flex items-start gap-3 rounded-2xl bg-white/[0.03] p-4">
                            <StickyNote className="mt-0.5 h-4 w-4 shrink-0 text-white/30" />
                            <p className="text-sm leading-relaxed text-white/45">
                              {event.note}
                            </p>
                          </div>
                        )}
                      </article>
                    </motion.li>
                  ))}
                </ul>
              </Stagger>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Meta({
  icon: Icon,
  tone,
  children,
}: {
  icon: React.ElementType;
  tone: "gold" | "azure";
  children: React.ReactNode;
}) {
  const color = tone === "gold" ? "text-gold" : "text-azure";
  return (
    <span className="flex items-center gap-2.5 text-sm text-white/55">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05]">
        <Icon className={`h-3.5 w-3.5 ${color}`} />
      </span>
      {children}
    </span>
  );
}
