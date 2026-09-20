// Entirely static copy — server-rendered, no client JavaScript.
import { Award, ArrowUpRight, Handshake, Mail, Rocket, Users } from "lucide-react";
import Link from "next/link";
import { Aurora, Reveal, SectionHeading, Stagger } from "../ui/motion-primitives";
import { CtaBand, GoldButton, PageHero } from "../ui/page-hero";

const benefits = [
  {
    icon: Users,
    text: "text-azure",
    bg: "bg-azure/10",
    ring: "ring-azure/25",
    title: "Expanded Reach",
    desc: "Access our network of talented students and academic professionals.",
  },
  {
    icon: Rocket,
    text: "text-gold",
    bg: "bg-gold/10",
    ring: "ring-gold/25",
    title: "Innovation Boost",
    desc: "Collaborate on cutting-edge projects and research initiatives.",
  },
  {
    icon: Award,
    text: "text-emerald-400",
    bg: "bg-emerald-400/10",
    ring: "ring-emerald-400/25",
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
    <div className="min-h-screen bg-ink-900">
      <PageHero
        eyebrow="Collaborate"
        title="Strategic"
        accent="Partnerships"
        description="Building bridges for academic excellence and innovation through meaningful collaboration."
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-azure/10 ring-1 ring-azure/25">
          <Handshake aria-hidden className="h-7 w-7 text-azure" />
        </span>
      </PageHero>

      <section className="relative overflow-hidden bg-ink-800 px-5 py-24 grain sm:px-6 md:py-32">
        <Aurora className="-right-40 top-20 h-[460px] w-[460px]" color="azure" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Why partner */}
            <div>
              <SectionHeading
                eyebrow="The case"
                title="Why partner"
                accent="with us?"
                description="DICOM thrives on meaningful collaborations that create opportunities for students, faculty, and the broader academic community. Together, we achieve more."
              />

              <Stagger className="mt-10 space-y-4" gap={0.1}>
                {benefits.map(({ icon: Icon, text, bg, ring, title, desc }) => (
                  <Reveal
                    key={title}
                    variant="card"
                    className="group flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-5 transition-all duration-500 ease-out-quint hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
                  >
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ring-1 ${ring} transition-transform duration-500 ease-out-expo group-hover:scale-110`}
                    >
                      <Icon className={`h-5 w-5 ${text}`} />
                    </span>
                    <span>
                      <span className="block font-semibold text-white">
                        {title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-white/70">
                        {desc}
                      </span>
                    </span>
                  </Reveal>
                ))}
              </Stagger>
            </div>

            {/* Opportunities */}
            <Reveal delay={0.1}>
              <div className="edge-light sticky top-28 overflow-hidden rounded-4xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-8 shadow-card md:p-10">
                <h2 className="font-display text-fluid-xl text-white">
                  Partnership opportunities
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/70">
                  We welcome collaborations with departments, faculties, and
                  external organizations that share our commitment to academic
                  excellence and student development.
                </p>

                <Stagger className="mt-8 space-y-3" gap={0.09}>
                  {opportunities.map(({ title, desc }, i) => (
                    <Reveal
                      key={title}
                      variant="card"
                      className="group spotlight relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-5 transition-all duration-500 ease-out-quint hover:border-azure/30 hover:bg-white/[0.06]"
                    >
                      <span className="eyebrow mb-2 block text-[10px] text-white/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-semibold text-white transition-colors duration-300 group-hover:text-azure">
                        {title}
                      </h3>
                      <p className="mt-1.5 text-sm text-white/70">{desc}</p>
                    </Reveal>
                  ))}
                </Stagger>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to"
        accent="collaborate?"
        description="Let's discuss how we can work together to create impactful academic experiences."
      >
        <GoldButton href="mailto:dicom@gouni.edu.ng?subject=Partnership%20Inquiry">
          <Mail aria-hidden className="h-4 w-4" />
          Contact our partnership team
        </GoldButton>
        <Link
          href="/about-us"
          className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-4 text-sm font-medium text-white/80 transition-all duration-300 hover:border-white/40 hover:bg-white/5 hover:text-white"
        >
          Learn about DICOM
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </CtaBand>
    </div>
  );
}
