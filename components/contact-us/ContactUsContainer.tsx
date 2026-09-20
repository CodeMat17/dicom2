"use client";

import { cardRise } from "@/lib/motion";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Send } from "lucide-react";
import { Aurora, Reveal, Stagger } from "../ui/motion-primitives";
import { GoldButton, PageHero } from "../ui/page-hero";

const infoItems = [
  {
    icon: MapPin,
    label: "Address",
    text: "text-gold",
    bg: "bg-gold/10",
    ring: "ring-gold/25",
    href: "https://maps.google.com/?q=Godfrey+Okoye+University+Enugu",
    lines: ["Godfrey Okoye University", "Thinkers Corner, Enugu", "Enugu State, Nigeria"],
  },
  {
    icon: Mail,
    label: "Email",
    text: "text-azure",
    bg: "bg-azure/10",
    ring: "ring-azure/25",
    href: "mailto:dicom@gouni.edu.ng",
    lines: ["dicom@gouni.edu.ng"],
  },
  {
    icon: Clock,
    label: "Office Hours",
    text: "text-emerald-400",
    bg: "bg-emerald-400/10",
    ring: "ring-emerald-400/25",
    href: null,
    lines: ["Monday – Friday", "8:00 AM – 4:00 PM"],
  },
];

export default function ContactUsContainer() {
  return (
    <main className="min-h-screen bg-ink-900">
      <PageHero
        id="contact-heading"
        eyebrow="Reach Us"
        title="Contact"
        accent="Us"
        description="Get in touch with the DICOM team. We're here to help and answer any questions."
      />

      <section className="relative overflow-hidden bg-ink-800 px-5 py-24 grain sm:px-6 md:py-32">
        <Aurora className="-left-32 top-10 h-[440px] w-[440px]" color="brand" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="grid items-start gap-8 lg:grid-cols-2">
            {/* Office details */}
            <Reveal>
              <div className="edge-light relative h-full overflow-hidden rounded-4xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 shadow-card md:p-10">
                <h2 className="mb-8 font-display text-fluid-xl text-white">
                  Our office
                </h2>

                <Stagger className="space-y-3" gap={0.1}>
                  {infoItems.map(
                    ({ icon: Icon, label, text, bg, ring, href, lines }) => {
                      const body = (
                        <>
                          <span
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ring-1 ${ring} transition-transform duration-500 ease-out-expo group-hover:scale-110`}
                          >
                            <Icon
                              className={`h-[18px] w-[18px] ${text}`}
                              aria-hidden="true"
                            />
                          </span>
                          <span className="min-w-0">
                            <span className="eyebrow block text-[10px] text-white/35">
                              {label}
                            </span>
                            <span className="mt-1.5 block text-sm leading-relaxed text-white/60 transition-colors group-hover:text-white">
                              {lines.map((line) => (
                                <span key={line} className="block">
                                  {line}
                                </span>
                              ))}
                            </span>
                          </span>
                        </>
                      );

                      const cls =
                        "group flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4 transition-all duration-300 hover:border-azure/30 hover:bg-white/[0.06]";

                      return (
                        <motion.div key={label} variants={cardRise}>
                          {href ? (
                            <a href={href} className={cls}>
                              {body}
                            </a>
                          ) : (
                            <div className={cls}>{body}</div>
                          )}
                        </motion.div>
                      );
                    }
                  )}
                </Stagger>
              </div>
            </Reveal>

            {/* Message CTA */}
            <Reveal delay={0.1}>
              <div className="edge-light relative flex h-full flex-col items-center overflow-hidden rounded-4xl border border-azure/20 bg-gradient-to-br from-brand via-ink-700 to-ink-800 p-8 text-center shadow-lift md:p-10">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-azure/25 blur-[70px]"
                />

                <span className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-azure/15 ring-1 ring-azure/30">
                  <Mail className="h-7 w-7 text-azure" aria-hidden="true" />
                </span>

                <h2 className="relative font-display text-fluid-xl text-white">
                  Send us a message
                </h2>
                <p className="relative mt-4 max-w-sm leading-relaxed text-white/55">
                  Have questions or feedback? We&apos;d love to hear from you.
                  Our team typically responds within one business day.
                </p>

                <div className="relative mt-auto pt-9">
                  <GoldButton href="mailto:dicom@gouni.edu.ng?subject=Contact%20Form%20Inquiry">
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Email us
                  </GoldButton>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
