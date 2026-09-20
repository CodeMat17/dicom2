import type { TeamMember } from "@/types/team";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { memo } from "react";

const ProfileModal = dynamic(() => import("./ProfileModal"), { ssr: true });

interface DirectorProfileProps {
  director: TeamMember;
}

function DirectorProfile({ director }: DirectorProfileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full shrink-0 lg:w-[320px]"
    >
      <article
        className="group edge-light spotlight relative flex flex-col items-center overflow-hidden rounded-4xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] p-8 shadow-card transition-all duration-500 ease-out-quint hover:border-azure/30 hover:shadow-lift lg:sticky lg:top-28"
        aria-labelledby={`director-name-${director._id}`}
      >
        {/* Bloom behind the portrait */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-azure/20 blur-[70px]"
        />

        <span className="eyebrow relative mb-5 rounded-full bg-gold/10 px-3 py-1 text-gold ring-1 ring-gold/25">
          Director
        </span>

        <div className="relative mb-6 h-44 w-44 overflow-hidden rounded-full ring-4 ring-azure/25 transition-all duration-500 group-hover:ring-azure/60">
          <Image
            src={director.imageUrl}
            alt={`${director.name}, ${director.position}`}
            fill
            className="object-cover transition-transform duration-700 ease-out-quint group-hover:scale-105"
            priority
            sizes="(max-width: 1024px) 100vw, 320px"
          />
        </div>

        <div className="relative w-full text-center">
          <h3
            id={`director-name-${director._id}`}
            className="font-display text-fluid-lg leading-snug text-white"
          >
            {director.name}
          </h3>
          <p className="mt-1.5 text-sm text-azure">{director.position}</p>

          <div className="mt-6">
            <ProfileModal
              name={director.name}
              imageUrl={director.imageUrl}
              position={director.position}
              email={director.email}
              profile={director.profile}
            />
          </div>
        </div>
      </article>
    </motion.div>
  );
}

export default memo(DirectorProfile);
