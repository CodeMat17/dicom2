"use client";

import { motion } from "framer-motion";
import { Award, Handshake, Mail, Rocket, Users } from "lucide-react";

const benefits = [
  {
    icon: Users,
    color: "text-[#179BD7]",
    bg: "bg-[#179BD7]/10",
    ring: "ring-[#179BD7]/20",
    title: "Expanded Reach",
    desc: "Access our network of talented students and academic professionals.",
  },
  {
    icon: Rocket,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    ring: "ring-yellow-400/20",
    title: "Innovation Boost",
    desc: "Collaborate on cutting-edge projects and research initiatives.",
  },
  {
    icon: Award,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    ring: "ring-emerald-400/20",
    title: "Recognition",
    desc: "Gain visibility through our platforms, events, and publications.",
  },
];

const opportunities = [
  {
    title: "Academic Departments",
    desc: "Co-create specialized competitions and learning programs.",
  },
  {
    title: "Corporate Partners",
    desc: "Sponsor events, provide industry expertise, and discover talent.",
  },
  {
    title: "Research Institutions",
    desc: "Joint research initiatives and knowledge exchange programs.",
  },
];

export default function PartnershipContainer() {
  return (
    <main className="min-h-screen bg-[#060e1e]">
      {/* Hero */}
      <section className="relative pt-28 pb-20 px-4 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#213675]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-2 mb-5">
              <div className="h-px w-8 bg-yellow-400" />
              <span className="text-yellow-400 text-sm font-mono tracking-widest uppercase">Collaborate</span>
              <div className="h-px w-8 bg-yellow-400" />
            </div>

            <div className="w-16 h-16 rounded-2xl bg-[#179BD7]/10 ring-1 ring-[#179BD7]/20 flex items-center justify-center mx-auto mb-6">
              <Handshake className="w-8 h-8 text-[#179BD7]" />
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
              Strategic <span className="text-[#179BD7]">Partnerships</span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Building bridges for academic excellence and innovation through meaningful collaboration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits + Opportunities */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10">

          {/* Left: Why partner */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-3">Why Partner With Us?</h2>
            <p className="text-white/45 mb-8 leading-relaxed">
              DICOM thrives on meaningful collaborations that create opportunities for students, faculty, and the broader academic community. Together, we achieve more.
            </p>

            <div className="space-y-5">
              {benefits.map(({ icon: Icon, color, bg, ring, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-start gap-4"
                >
                  <div className={`w-10 h-10 rounded-xl ${bg} ring-1 ${ring} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{title}</h3>
                    <p className="text-white/45 text-sm">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Opportunities */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/4 border border-white/10 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-2">Partnership Opportunities</h3>
            <p className="text-white/40 text-sm mb-6 leading-relaxed">
              We welcome collaborations with departments, faculties, and external organizations that share our commitment to academic excellence and student development.
            </p>

            <div className="space-y-3">
              {opportunities.map(({ title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="p-4 bg-white/4 border border-white/8 rounded-xl hover:border-white/15 transition-colors group"
                >
                  <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-[#179BD7] transition-colors">{title}</h4>
                  <p className="text-white/40 text-xs">{desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 pb-28">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-[#213675] to-[#0a1628] border border-[#179BD7]/20 rounded-3xl px-8 py-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#179BD7_0%,_transparent_60%)] opacity-5 pointer-events-none" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Collaborate?</h2>
            <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
              Let&apos;s discuss how we can work together to create impactful academic experiences.
            </p>
            <motion.a
              href="mailto:dicom@gouni.edu.ng?subject=Partnership Inquiry"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-8 py-3.5 rounded-full transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contact Our Partnership Team
            </motion.a>
          </div>
        </div>
      </section>
    </main>
  );
}
