"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Lightbulb, Rocket, Shield, Trophy } from "lucide-react";

function StatementsSkeleton() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-2xl bg-white/5 animate-pulse p-8 border border-white/8">
          <div className="h-10 w-10 rounded-xl bg-white/10 mb-5" />
          <div className="h-6 w-2/3 bg-white/10 rounded mb-4" />
          <div className="space-y-2">
            <div className="h-3 bg-white/10 rounded" />
            <div className="h-3 bg-white/10 rounded w-5/6" />
            <div className="h-3 bg-white/10 rounded w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

const cardConfig = [
  { type: "mission", Icon: Rocket, color: "text-[#179BD7]", bg: "bg-[#179BD7]/10", ring: "ring-[#179BD7]/20" },
  { type: "vision", Icon: Trophy, color: "text-yellow-400", bg: "bg-yellow-400/10", ring: "ring-yellow-400/20" },
  { type: "core-values", Icon: Lightbulb, color: "text-emerald-400", bg: "bg-emerald-400/10", ring: "ring-emerald-400/20" },
];

export default function AboutUsContainer() {
  const statements = useQuery(api.statements.getStatements);

  const mission = statements?.find((s) => s.type === "mission");
  const vision = statements?.find((s) => s.type === "vision");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Directorate of Competitions - Godfrey Okoye University",
    description: "We provide platforms that allow students to compete, learn, and foster an environment that challenges them to improve beyond their limits.",
    url: "https://dicom.gouni.edu.ng",
    logo: "https://dicom.gouni.edu.ng/logo.png",
    address: { "@type": "PostalAddress", streetAddress: "Thinkers Corner", addressLocality: "Enugu", addressCountry: "NG" },
    email: "dicom@gouni.edu.ng",
    mission: mission?.content,
    vision: vision?.content,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <main className="min-h-screen bg-[#060e1e]">
        {/* Hero */}
        <section className="relative pt-28 pb-20 px-4 overflow-hidden" aria-labelledby="about-heading">
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#213675]/40 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex items-center justify-center gap-2 mb-5">
                <div className="h-px w-8 bg-yellow-400" />
                <span className="text-yellow-400 text-sm font-mono tracking-widest uppercase">Our Story</span>
                <div className="h-px w-8 bg-yellow-400" />
              </div>

              <h1
                id="about-heading"
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
              >
                About <span className="text-[#179BD7]">DICOM</span>
              </h1>

              <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-4">
                We provide platforms that allow students to compete, learn, and foster an environment that challenges them to improve beyond their limits as they journey into spheres unknown.
              </p>

              <p className="text-base text-white/35 italic max-w-xl mx-auto">
                &quot;Join us on this transformational journey, where competition sparks growth and excellence is a pursuit for the rest of life.&quot;
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission / Vision / Values */}
        <section className="py-20 px-4 max-w-7xl mx-auto" aria-label="Mission, Vision, and Values">
          {statements === undefined ? (
            <StatementsSkeleton />
          ) : statements.length === 0 ? (
            <p className="text-center text-white/30 py-16">No statements found.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {cardConfig.map(({ type, Icon, color, bg, ring }, i) => {
                const s = statements.find((x) => x.type === type);
                if (!s) return null;
                return (
                  <motion.article
                    key={type}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4 }}
                    className="relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 group overflow-hidden"
                    aria-labelledby={`${type}-title`}
                  >
                    <div className={`w-12 h-12 rounded-xl ${bg} ring-1 ${ring} flex items-center justify-center mb-5`}>
                      <Icon className={`w-6 h-6 ${color}`} />
                    </div>

                    <h2 id={`${type}-title`} className="text-xl font-bold text-white mb-3">
                      {s.title}
                    </h2>

                    {type === "core-values" && s.values ? (
                      <ul className="space-y-2">
                        {s.values.map((value, j) => (
                          <li key={j} className="flex items-center gap-2 text-white/50 text-sm">
                            <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            {value}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-white/50 text-sm leading-relaxed">{s.content}</p>
                    )}

                    {/* Glow accent */}
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${bg} opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </motion.article>
                );
              })}
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="py-20 px-4" aria-labelledby="cta-heading">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-[#213675] to-[#0a1628] border border-[#179BD7]/20 rounded-3xl px-8 py-16 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#179BD7/8_0%,_transparent_70%)] pointer-events-none" />
              <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Join the Journey?
              </h2>
              <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
                Become part of a community that pushes boundaries and celebrates academic excellence.
              </p>
              <motion.a
                href="mailto:dicom@gouni.edu.ng"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-8 py-3.5 rounded-full transition-colors"
                aria-label="Contact DICOM via email"
              >
                Get Started
              </motion.a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
