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
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full md:max-w-[300px] shrink-0"
    >
      <article
        className="flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl pt-6 px-6 pb-6 hover:border-[#179BD7]/30 transition-all duration-300 group"
        aria-labelledby={`director-name-${director._id}`}
      >
        {/* Badge */}
        <div className="text-xs font-mono tracking-widest text-yellow-400 uppercase mb-4">Director</div>

        {/* Photo */}
        <div className="relative w-44 h-44 mb-5 rounded-full overflow-hidden ring-4 ring-[#179BD7]/20 group-hover:ring-[#179BD7]/50 transition-all">
          <Image
            src={director.imageUrl}
            alt={`${director.name}, ${director.position}`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>

        <div className="text-center">
          <h3
            id={`director-name-${director._id}`}
            className="text-lg font-bold text-white mb-1"
          >
            {director.name}
          </h3>
          <p className="text-[#179BD7] text-sm mb-5">{director.position}</p>
          <ProfileModal
            name={director.name}
            imageUrl={director.imageUrl}
            position={director.position}
            email={director.email}
            profile={director.profile}
          />
        </div>
      </article>
    </motion.div>
  );
}

export default memo(DirectorProfile);
