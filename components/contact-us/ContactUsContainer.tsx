"use client";

import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Send } from "lucide-react";

const infoItems = [
  {
    icon: MapPin,
    label: "Address",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    ring: "ring-yellow-400/20",
    content: (
      <a
        href="https://maps.google.com/?q=Godfrey+Okoye+University+Enugu"
        className="text-white/50 hover:text-white transition-colors not-italic text-sm leading-relaxed"
      >
        Godfrey Okoye University<br />
        Thinkers Corner, Enugu<br />
        Enugu State, Nigeria
      </a>
    ),
  },
  {
    icon: Mail,
    label: "Email",
    color: "text-[#179BD7]",
    bg: "bg-[#179BD7]/10",
    ring: "ring-[#179BD7]/20",
    content: (
      <a
        href="mailto:dicom@gouni.edu.ng"
        className="text-white/50 hover:text-white transition-colors text-sm"
        aria-label="Send email to DICOM"
      >
        dicom@gouni.edu.ng
      </a>
    ),
  },
  {
    icon: Clock,
    label: "Office Hours",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    ring: "ring-emerald-400/20",
    content: (
      <time className="text-white/50 text-sm">Monday – Friday: 8:00 AM – 4:00 PM</time>
    ),
  },
];

export default function ContactUsContainer() {
  return (
    <main className="min-h-screen bg-[#060e1e]" aria-labelledby="contact-heading">
      {/* Hero */}
      <section className="relative pt-28 pb-16 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#213675]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-2 mb-5">
              <div className="h-px w-8 bg-yellow-400" />
              <span className="text-yellow-400 text-sm font-mono tracking-widest uppercase">Reach Us</span>
              <div className="h-px w-8 bg-yellow-400" />
            </div>

            <h1
              id="contact-heading"
              className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4"
            >
              Contact <span className="text-[#179BD7]">Us</span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Get in touch with the DICOM team. We&apos;re here to help and answer any questions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-12 px-4 max-w-5xl mx-auto pb-24">
        <div className="grid md:grid-cols-2 gap-8 items-start">

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/4 border border-white/10 rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-8">Our Office</h2>
            <div className="space-y-6">
              {infoItems.map(({ icon: Icon, label, color, bg, ring, content }, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl ${bg} ring-1 ${ring} flex items-center justify-center shrink-0 mt-0.5`}>
                    <Icon className={`w-4.5 h-4.5 ${color}`} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">{label}</h3>
                    <address className="not-italic">{content}</address>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-br from-[#213675] to-[#0a1628] border border-[#179BD7]/20 rounded-2xl p-8 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#179BD7]/10 ring-1 ring-[#179BD7]/20 flex items-center justify-center mb-5">
              <Mail className="w-8 h-8 text-[#179BD7]" aria-hidden="true" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">Send us a message</h3>
            <p className="text-white/45 mb-8 leading-relaxed">
              Have questions or feedback? We&apos;d love to hear from you. Our team typically responds within one business day.
            </p>

            <motion.a
              href="mailto:dicom@gouni.edu.ng?subject=Contact%20Form%20Inquiry"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-7 py-3.5 rounded-full transition-colors"
              aria-label="Send us an email"
            >
              <Send className="w-4 h-4" aria-hidden="true" />
              Email Us
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
