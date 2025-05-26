import type { TeamMember } from "@/types/team";
import dynamic from "next/dynamic";
import Image from "next/image";
import { memo } from "react";

const ProfileModal = dynamic(() => import("./ProfileModal"), {
  ssr: true,
});

interface DirectorProfileProps {
  director: TeamMember;
}

function DirectorProfile({ director }: DirectorProfileProps) {
  return (
    <div className='w-full md:max-w-[35%]'>
      <article
        className='flex flex-col justify-center items-center bg-white dark:bg-gray-700 rounded-xl shadow-md pt-4 px-6 transition-colors duration-200'
        aria-labelledby={`director-name-${director._id}`}>
        <div className='relative w-full sm:max-w-sm aspect-square'>
          <Image
            src={director.imageUrl}
            alt={`${director.name}, ${director.position}`}
            fill
            className='object-cover rounded-full'
            priority
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 35vw'
          />
        </div>
        <div className='flex flex-col justify-center px-6 pt-1 pb-4 text-center'>
          <h3
            id={`director-name-${director._id}`}
            className='text-lg font-medium text-gray-900 dark:text-white'>
            {director.name}
          </h3>
          <p
            className='mb-2 text-gray-600 dark:text-gray-300'
            aria-label={`Position: ${director.position}`}>
            {director.position}
          </p>
          <ProfileModal
            name={director.name}
            imageUrl={director.imageUrl}
            position={director.position}
            email={director.email}
            profile={director.profile}
          />
        </div>
      </article>
    </div>
  );
}

export default memo(DirectorProfile);
