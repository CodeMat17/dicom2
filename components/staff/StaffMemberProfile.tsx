import type { TeamMember } from "@/types/team";
import dynamic from "next/dynamic";
import Image from "next/image";
import { memo } from "react";

const ProfileModal = dynamic(() => import("./ProfileModal"), {
  ssr: true,
});

interface StaffMemberProfileProps {
  member: TeamMember;
}

function StaffMemberProfile({ member }: StaffMemberProfileProps) {
  if (!member?.imageUrl) return null;

  return (
    <article
      className='flex flex-col justify-center items-center py-2 px-2 bg-white dark:bg-gray-700 rounded-xl shadow-md transition-colors duration-200'
      aria-labelledby={`staff-name-${member._id}`}>
      <div className='relative w-[120px] aspect-square'>
        <Image
          src={member.imageUrl}
          alt={`${member.name}, ${member.position}`}
          width={120}
          height={120}
          className='object-cover rounded-full'
          loading='lazy'
        />
      </div>
      <div className='flex flex-col justify-center px-3 pt-1 pb-2 text-center'>
        <h3
          id={`staff-name-${member._id}`}
          className='font-medium text-gray-900 dark:text-white'>
          {member.name}
        </h3>
        <p
          className='mb-2 text-gray-600 dark:text-gray-300'
          aria-label={`Position: ${member.position}`}>
          {member.position}
        </p>
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
