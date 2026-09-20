import type { TeamMember } from "@/types/team";
import Image from "next/image";
import { memo } from "react";
import ProfileModal from "./ProfileModal";

interface StaffMemberProfileProps {
  member: TeamMember;
}

function StaffMemberProfile({ member }: StaffMemberProfileProps) {
  if (!member?.imageUrl) return null;

  return (
    <article
      className="group edge-light spotlight relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] shadow-card transition-all duration-500 ease-out-quint hover:-translate-y-1.5 hover:border-azure/30 hover:shadow-lift"
      aria-labelledby={`staff-name-${member._id}`}
    >
      {/* Full-bleed portrait */}
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <Image
          src={member.imageUrl}
          alt={`${member.name}, ${member.position}`}
          fill
          className="object-cover object-top transition-transform duration-700 ease-out-quint group-hover:scale-[1.06]"
          loading="lazy"
          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 320px"
        />

        {/* Legibility scrim + brand wash on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/45 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-azure/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <h3
            id={`staff-name-${member._id}`}
            className="font-display text-fluid-base leading-snug text-white drop-shadow-sm"
          >
            {member.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-azure sm:text-sm">
            {member.position}
          </p>
        </div>
      </div>

      <div className="mt-auto p-4 pt-3 sm:p-5 sm:pt-4">
        <ProfileModal
          name={member.name}
          imageUrl={member.imageUrl}
          position={member.position}
          email={member.email}
          profile={member.profile}
        />
      </div>
    </article>
  );
}

export default memo(StaffMemberProfile);
