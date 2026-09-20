"use client";

import { api } from "@/convex/_generated/api";
import { cardRise } from "@/lib/motion";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Check, Lightbulb, Rocket, Trophy } from "lucide-react";
import Link from "next/link";
import { Aurora, Stagger } from "../ui/motion-primitives";
import { CtaBand, GoldButton, PageHero } from "../ui/page-hero";

function StatementsSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="shimmer rounded-3xl border border-white/10 bg-white/[0.04] p-8"
        >
          <div className="mb-6 h-12 w-12 rounded-2xl bg-white/[0.06]" />
          <div className="mb-4 h-6 w-2/3 rounded-lg bg-white/[0.06]" />
          <div className="space-y-2.5">
            <div className="h-3 rounded bg-white/[0.06]" />
            <div className="h-3 w-5/6 rounded bg-white/[0.06]" />
            <div className="h-3 w-4/5 rounded bg-white/[0.06]" />
          </div>
        </div>
      ))}
    </div>
  );
}

const cardConfig = [
  {
    type: "mission",
    Icon: Rocket,
    text: "text-azure",
    bg: "bg-azure/10",
    ring: "ring-azure/25",
    glow: "hover:shadow-glow hover:border-azure/35",
    bar: "from-azure",
  },
  {
    type: "vision",
    Icon: Trophy,
    text: "text-gold",
    bg: "bg-gold/10",
    ring: "ring-gold/25",
    glow: "hover:shadow-gold hover:border-gold/35",
    bar: "from-gold",
  },
  {
    type: "core-values",
    Icon: Lightbulb,
    text: "text-emerald-400",
    bg: "bg-emerald-400/10",
    ring: "ring-emerald-400/25",
    glow: "hover:border-emerald-400/35",
    bar: "from-emerald-400",
  },
] as const;

export default function AboutUsContainer() {
  const statements = useQuery(api.statements.getStatements);

  const mission = statements?.find((s) => s.type === "mission");
  const vision = statements?.find((s) => s.type === "vision");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Directorate of Competitions - Godfrey Okoye University",
    description:
      "We provide platforms that allow students to compete, learn, and foster an environment that challenges them to improve beyond their limits.",
    url: "https://dicom.gouni.edu.ng",
    logo: "https://dicom.gouni.edu.ng/logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Thinkers Corner",
      addressLocality: "Enugu",
      addressCountry: "NG",
    },
    email: "dicom@gouni.edu.ng",
    mission: mission?.content,
    vision: vision?.content,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="min-h-screen bg-ink-900">
        <PageHero
          id="about-heading"
          eyebrow="Our Story"
          title="About"
          accent="DICOM"
          description="We provide platforms that allow students to compete, learn, and foster an environment that challenges them to improve beyond their limits as they journey into spheres unknown."
          footnote="&ldquo;Join us on this transformational journey, where competition sparks growth and excellence is a pursuit for the rest of life.&rdquo;"
        />

        {/* Mission / Vision / Values */}
        <section
          className="relative overflow-hidden bg-ink-800 px-5 py-24 grain sm:px-6 md:py-32"
          aria-label="Mission, Vision, and Values"
        >
          <Aurora className="-left-40 top-0 h-[460px] w-[460px]" color="brand" />

          <div className="relative z-10 mx-auto max-w-7xl">
            {statements === undefined ? (
              <StatementsSkeleton />
            ) : statements.length === 0 ? (
              <p className="py-16 text-center text-white/30">
                No statements found.
              </p>
            ) : (
              <Stagger className="grid gap-6 md:grid-cols-3" gap={0.12}>
                {cardConfig.map(({ type, Icon, text, bg, ring, glow, bar }) => {
                  const s = statements.find((x) => x.type === type);
                  if (!s) return null;
                  return (
                    <motion.article
                      key={type}
                      variants={cardRise}
                      className={`group edge-light spotlight relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 shadow-card transition-all duration-500 ease-out-quint hover:-translate-y-1.5 ${glow}`}
                      aria-labelledby={`${type}-title`}
                    >
                      <span
                        className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl ${bg} ring-1 ${ring} transition-transform duration-500 ease-out-expo group-hover:scale-110`}
                      >
                        <Icon className={`h-6 w-6 ${text}`} />
                      </span>

                      <h2
                        id={`${type}-title`}
                        className="mb-4 font-display text-fluid-xl leading-snug text-white"
                      >
                        {s.title}
                      </h2>

                      {type === "core-values" && s.values ? (
                        <ul className="space-y-2.5">
                          {s.values.map((value, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-2.5 text-sm text-white/55"
                            >
                              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-400/15">
                                <Check className="h-2.5 w-2.5 text-emerald-400" />
                              </span>
                              {value}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm leading-relaxed text-white/50">
                          {s.content}
                        </p>
                      )}

                      {/* Accent bar wipes in on hover */}
                      <span
                        className={`absolute inset-x-0 bottom-0 h-0.5 w-0 bg-gradient-to-r ${bar} to-transparent transition-all duration-700 ease-out-quint group-hover:w-full`}
                      />
                    </motion.article>
                  );
                })}
              </Stagger>
            )}
          </div>
        </section>

        <CtaBand
          title="Ready to join the"
          accent="journey?"
          description="Become part of a community that pushes boundaries and celebrates academic excellence."
        >
          <GoldButton href="mailto:dicom@gouni.edu.ng">Get started</GoldButton>
          <Link
            href="/achievements"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-medium text-white/80 transition-all duration-300 hover:border-white/40 hover:bg-white/5 hover:text-white"
          >
            See our achievements
          </Link>
        </CtaBand>
      </main>
    </>
  );
}
