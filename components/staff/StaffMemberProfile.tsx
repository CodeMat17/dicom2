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
      className="group edge-light spotlight relative flex h-full flex-col items-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] px-5 py-7 text-center shadow-card transition-all duration-500 ease-out-quint hover:-translate-y-1.5 hover:border-azure/30 hover:shadow-lift"
      aria-labelledby={`staff-name-${member._id}`}
    >
      <div className="relative mb-4 h-24 w-24 shrink-0 overflow-hidden rounded-full ring-2 ring-white/12 transition-all duration-500 group-hover:ring-azure/50">
        <Image
          src={member.imageUrl}
          alt={`${member.name}, ${member.position}`}
          fill
          className="object-cover transition-transform duration-700 ease-out-quint group-hover:scale-105"
          loading="lazy"
          sizes="96px"
        />
      </div>

      <h3
        id={`staff-name-${member._id}`}
        className="text-sm font-semibold leading-snug text-white"
      >
        {member.name}
      </h3>
      <p className="mt-1 line-clamp-2 text-xs text-azure">{member.position}</p>

      <div className="mt-auto w-full pt-5">
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
