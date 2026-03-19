import type { TeamMember } from "@/types/team";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { memo } from "react";

const ProfileModal = dynamic(() => import("./ProfileModal"), { ssr: true });

interface StaffMemberProfileProps {
  member: TeamMember;
}

function StaffMemberProfile({ member }: StaffMemberProfileProps) {
  if (!member?.imageUrl) return null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -3 }}
      className="flex flex-col items-center py-6 px-4 bg-white/4 border border-white/8 rounded-2xl hover:border-[#179BD7]/25 hover:bg-white/6 transition-all duration-300 group"
      aria-labelledby={`staff-name-${member._id}`}
    >
      {/* Photo */}
      <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden ring-2 ring-white/10 group-hover:ring-[#179BD7]/40 transition-all">
        <Image
          src={member.imageUrl}
          alt={`${member.name}, ${member.position}`}
          width={96}
          height={96}
          className="object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col items-center text-center flex-1 w-full">
        <h3
          id={`staff-name-${member._id}`}
          className="font-semibold text-white text-sm leading-snug mb-0.5"
        >
          {member.name}
        </h3>
        <p className="text-[#179BD7] text-xs mb-4 line-clamp-2">{member.position}</p>

        <div className="mt-auto w-full">
          <ProfileModal
            name={member.name}
            imageUrl={member.imageUrl}
            position={member.position}
            email={member.email}
            profile={member.profile}
          />
        </div>
      </div>
    </motion.article>
  );
}

export default memo(StaffMemberProfile);
