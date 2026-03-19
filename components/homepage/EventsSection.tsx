"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Calendar, MapPin, StickyNote } from "lucide-react";

interface Event {
  _id: string;
  title: string;
  date?: string;
  location?: string;
  note?: string;
}

function EventsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="rounded-2xl bg-white/5 animate-pulse p-6 space-y-4 border border-white/5">
          <div className="h-5 w-3/4 bg-white/10 rounded" />
          <div className="h-3 w-1/2 bg-white/10 rounded" />
          <div className="h-3 w-2/3 bg-white/10 rounded" />
        </div>
      ))}
    </div>
  );
}

export function EventsSection() {
  const events = useQuery(api.events.getEvents);

  return (
    <section className="bg-[#0a1628] py-24 px-4" aria-labelledby="events-heading">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-yellow-400" />
            <span className="text-yellow-400 text-sm font-mono tracking-widest uppercase">Calendar</span>
          </div>
          <h2
            id="events-heading"
            className="text-4xl md:text-5xl font-bold text-white leading-tight"
          >
            Upcoming <span className="text-[#179BD7]">Events</span>
          </h2>
          <p className="mt-3 text-white/50 max-w-lg">
            Stay informed about our upcoming competitions, seminars, and institutional events.
          </p>
        </motion.div>

        {/* Content */}
        {events === undefined ? (
          <EventsSkeleton />
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-white/30">
            <Calendar className="w-12 h-12 mb-4" />
            <p className="text-lg">No upcoming events at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event: Event, index: number) => (
              <motion.article
                key={event._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 hover:border-[#179BD7]/30 transition-all duration-300 overflow-hidden"
              >
                {/* Subtle accent line */}
                <div className="absolute top-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#179BD7] to-yellow-400 group-hover:w-full transition-all duration-500 rounded-t-2xl" />

                <h3 className="text-lg font-semibold text-white mb-4 leading-snug group-hover:text-[#179BD7] transition-colors">
                  {event.title}
                </h3>

                <div className="space-y-2.5">
                  {event.date && (
                    <div className="flex items-center gap-2.5 text-white/50 text-sm">
                      <div className="w-7 h-7 rounded-lg bg-yellow-400/10 flex items-center justify-center shrink-0">
                        <Calendar className="w-3.5 h-3.5 text-yellow-400" />
                      </div>
                      <span>{event.date}</span>
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-center gap-2.5 text-white/50 text-sm">
                      <div className="w-7 h-7 rounded-lg bg-[#179BD7]/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-3.5 h-3.5 text-[#179BD7]" />
                      </div>
                      <span>{event.location}</span>
                    </div>
                  )}
                  {event.note && (
                    <div className="flex items-start gap-2.5 mt-3">
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                        <StickyNote className="w-3.5 h-3.5 text-white/30" />
                      </div>
                      <p className="text-sm text-white/40 italic leading-relaxed">{event.note}</p>
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
