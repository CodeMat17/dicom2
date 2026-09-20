// Server-rendered: the only interactive part is the <Magnetic> CTA wrapper.
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Aurora, Magnetic, Reveal, Stagger } from "./ui/motion-primitives";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Achievements", href: "/achievements" },
  { name: "Gallery", href: "/gallery" },
  { name: "Partnership", href: "/partnership" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Our Staff", href: "/our-staff" },
  { name: "Contact", href: "/contact-us" },
];

const contactInfo = [
  {
    icon: MapPin,
    label: "Visit",
    text: "Thinkers Corner, Enugu",
    href: "https://maps.google.com/?q=Godfrey+Okoye+University+Enugu",
  },
  {
    icon: Mail,
    label: "Email",
    text: "dicom@gouni.edu.ng",
    href: "mailto:dicom@gouni.edu.ng",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-900 grain">
      <Aurora
        className="-bottom-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2"
        color="brand"
      />

      {/* ---------- Closing CTA ---------- */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-24 sm:px-6">
        <Reveal>
          <div className="edge-light relative overflow-hidden rounded-4xl border border-azure/20 bg-gradient-to-br from-brand via-ink-700 to-ink-800 p-10 text-center shadow-lift md:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/15 blur-[80px]"
            />
            <h2 className="relative font-display text-fluid-2xl leading-tight text-white text-balance">
              Ready to compete at your <span className="text-shine">highest level</span>?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-fluid-base text-white/70 text-pretty">
              Join a community of students turning ambition into national and
              international recognition.
            </p>
            <Magnetic className="relative mt-9">
              <Link
                href="/contact-us"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gold px-8 py-4 font-semibold text-ink-900 shadow-gold transition-shadow duration-300 hover:shadow-[0_12px_44px_-6px_hsl(var(--gold)/0.6)]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out-quint group-hover:translate-x-full" />
                <span className="relative">Get in touch</span>
                <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Magnetic>
          </div>
        </Reveal>
      </div>

      {/* ---------- Columns ---------- */}
      <Stagger
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 pb-12 pt-20 sm:px-6 md:grid-cols-12"
        gap={0.09}
      >
        {/* Brand */}
        <Reveal className="md:col-span-5">
          <Link href="/" className="group mb-6 inline-flex items-center gap-3">
            <span className="relative rounded-full bg-gradient-to-br from-azure via-azure/40 to-gold/60 p-[2px] transition-transform duration-500 ease-out-expo group-hover:scale-105">
              <Image
                alt="DICOM logo"
                width={48}
                height={48}
                src="/logo.webp"
                className="rounded-full bg-ink-900"
              />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-base text-white">
                Directorate of Competitions
              </span>
              <span className="eyebrow mt-1 block text-[10px] text-white/70">
                Godfrey Okoye University
              </span>
            </span>
          </Link>

          <p className="max-w-sm text-sm leading-relaxed text-white/70">
            Empowering students through competition and excellence at Godfrey
            Okoye University, Enugu.
          </p>

          <div className="mt-7 flex gap-1.5" aria-hidden>
            <span className="h-1 w-10 rounded-full bg-brand" />
            <span className="h-1 w-10 rounded-full bg-azure" />
            <span className="h-1 w-10 rounded-full bg-gold" />
          </div>
        </Reveal>

        {/* Contact */}
        <Reveal className="md:col-span-4">
          <h3 className="eyebrow mb-6 text-white/70">Contact</h3>
          <ul className="space-y-3">
            {contactInfo.map(({ icon: Icon, label, text, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="group flex items-center gap-3.5 rounded-2xl border border-white/8 bg-white/[0.03] p-3.5 transition-all duration-300 hover:border-azure/30 hover:bg-white/[0.06]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-azure/10 ring-1 ring-azure/20 transition-colors duration-300 group-hover:bg-azure/20">
                    <Icon className="h-4 w-4 text-azure" />
                  </span>
                  <span className="min-w-0">
                    <span className="eyebrow block text-[10px] text-white/70">
                      {label}
                    </span>
                    <span className="block truncate text-sm text-white/70 transition-colors group-hover:text-white">
                      {text}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Links */}
        <Reveal className="md:col-span-3">
          <h3 className="eyebrow mb-6 text-white/70">Explore</h3>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 md:grid-cols-1">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors duration-300 hover:text-white"
                >
                  <span className="h-px w-0 bg-gold transition-all duration-300 group-hover:w-3" />
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Stagger>

      {/* ---------- Bottom bar ---------- */}
      <div className="relative z-10 border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 sm:flex-row sm:px-6">
          <p className="text-center text-xs text-white/70 sm:text-left">
            © {currentYear} Directorate of Competitions, Godfrey Okoye
            University. All rights reserved.
          </p>
          <p className="flex items-center gap-2 text-xs text-white/70">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
