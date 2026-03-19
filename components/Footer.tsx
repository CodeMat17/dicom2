"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Achievements", href: "/achievements" },
  { name: "Partnership", href: "/partnership" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Our Staff", href: "/our-staff" },
  { name: "Contact", href: "/contact-us" },
];

const contactInfo = [
  { icon: MapPin, text: "Thinkers Corner, Enugu", href: "https://maps.google.com/?q=Godfrey+Okoye+University+Enugu" },
  { icon: Mail, text: "dicom@gouni.edu.ng", href: "mailto:dicom@gouni.edu.ng" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#060e1e] border-t border-white/8 text-white">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="ring-2 ring-[#179BD7]/40 group-hover:ring-[#179BD7] transition-all rounded-full p-0.5">
                <Image alt="DICOM logo" priority width={52} height={52} src="/logo.webp" className="rounded-full" />
              </div>
              <div className="leading-tight">
                <p className="font-bold text-white text-base">Directorate of Competitions</p>
                <p className="text-white/40 text-xs">Godfrey Okoye University</p>
              </div>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Empowering students through competition and excellence at Godfrey Okoye University, Enugu.
            </p>

            {/* Accent bar */}
            <div className="flex gap-1.5 mt-6">
              <div className="h-1 w-8 rounded-full bg-[#213675]" />
              <div className="h-1 w-8 rounded-full bg-[#179BD7]" />
              <div className="h-1 w-8 rounded-full bg-yellow-400" />
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white/60 tracking-widest uppercase mb-5">Contact Us</h3>
            <ul className="space-y-3">
              {contactInfo.map(({ icon: Icon, text, href }, i) => (
                <li key={i}>
                  <Link
                    href={href}
                    className="flex items-center gap-3 text-sm text-white/50 hover:text-white transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-[#179BD7]/20 flex items-center justify-center shrink-0 transition-colors">
                      <Icon className="h-4 w-4 text-[#179BD7]" />
                    </div>
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold text-white/60 tracking-widest uppercase mb-5">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/40 hover:text-white transition-colors hover:translate-x-0.5 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/30">
            © {currentYear} Directorate of Competitions, Godfrey Okoye University. All rights reserved.
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-1.5 text-xs text-white/20"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            All systems operational
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
