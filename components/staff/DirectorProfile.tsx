import type { TeamMember } from "@/types/team";
import Image from "next/image";
import { memo } from "react";
import { Reveal } from "../ui/motion-primitives";
import ProfileModal from "./ProfileModal";

interface DirectorProfileProps {
  director: TeamMember;
}

function DirectorProfile({ director }: DirectorProfileProps) {
  return (
    <Reveal className="w-full shrink-0 lg:w-[380px]">
      <article
        className="group edge-light spotlight relative flex flex-col overflow-hidden rounded-4xl border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] shadow-card transition-all duration-500 ease-out-quint hover:border-azure/30 hover:shadow-lift lg:sticky lg:top-28"
        aria-labelledby={`director-name-${director._id}`}
      >
        {/* Large editorial portrait */}
        <div className="relative aspect-[4/5] w-full overflow-hidden lg:aspect-[3/4]">
          <Image
            src={director.imageUrl}
            alt={`${director.name}, ${director.position}`}
            fill
            className="object-cover object-top transition-transform duration-700 ease-out-quint group-hover:scale-[1.04]"
            priority
            sizes="(max-width: 1024px) 100vw, 380px"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-azure/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          <span className="eyebrow absolute left-5 top-5 rounded-full bg-gold/15 px-3 py-1 text-gold ring-1 ring-gold/30 backdrop-blur-md">
            Director
          </span>

          <div className="absolute inset-x-0 bottom-0 p-6">
            <h3
              id={`director-name-${director._id}`}
              className="font-display text-fluid-xl leading-tight text-white"
            >
              {director.name}
            </h3>
            <p className="mt-2 text-sm text-azure">{director.position}</p>
          </div>
        </div>

        <div className="p-6 pt-5">
          <ProfileModal
            name={director.name}
            imageUrl={director.imageUrl}
            position={director.position}
            email={director.email}
            profile={director.profile}
          />
        </div>
      </article>
    </Reveal>
  );
}

export default memo(DirectorProfile);
