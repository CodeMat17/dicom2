"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Suspense } from "react";

// Lazy load the modal component
const ProfileModal = dynamic(() => import("./ProfileModal"), {
  ssr: true,
});

interface TeamMember {
  _id: string;
  name: string;
  position: string;
  imageUrl: string;
  email: string;
  profile: string;
}

interface Team {
  director: TeamMember;
  staff: TeamMember[];
}

// Loading skeleton component
function StaffSkeleton() {
  return (
    <div
      className='w-full py-10 max-w-6xl mx-auto animate-pulse'
      role='status'
      aria-label='Loading staff profiles'
      aria-busy='true'>
      <div className='flex flex-col md:flex-row justify-between gap-6'>
        {/* Director skeleton */}
        <div className='w-full md:max-w-[35%]'>
          <div className='flex flex-col justify-center items-center bg-white dark:bg-gray-700 rounded-xl shadow-md pt-4 px-6'>
            <div className='w-full sm:max-w-sm aspect-square rounded-full bg-gray-200 dark:bg-gray-600' />
            <div className='w-full px-6 pt-4 pb-4 space-y-2'>
              <div className='h-5 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mx-auto' />
              <div className='h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mx-auto' />
            </div>
          </div>
        </div>
        {/* Staff skeletons */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2'>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className='flex flex-col justify-center items-center py-2 px-2 bg-white dark:bg-gray-700 rounded-xl shadow-md'>
              <div className='w-[120px] h-[120px] rounded-full bg-gray-200 dark:bg-gray-600' />
              <div className='w-full px-3 pt-4 pb-2 space-y-2'>
                <div className='h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3 mx-auto' />
                <div className='h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mx-auto' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Director profile component
function DirectorProfile({ director }: { director: TeamMember }) {
  return (
    <div className='w-full md:max-w-[35%]'>
      <article
        className='flex flex-col justify-center items-center bg-white dark:bg-gray-700 rounded-xl shadow-md pt-4 px-6'
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
            className='text-lg font-medium'>
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

// Staff member profile component
function StaffMemberProfile({ member }: { member: TeamMember }) {
  return (
    <article
      className='flex flex-col justify-center items-center py-2 px-2 bg-white dark:bg-gray-700 rounded-xl shadow-md'
      aria-labelledby={`staff-name-${member._id}`}>
      {member?.imageUrl && (
        <div className='relative w-[120px] h-[120px]'>
          <Image
            src={member.imageUrl}
            alt={`${member.name}, ${member.position}`}
            width={120}
            height={120}
            className='object-cover rounded-full'
            loading='lazy'
          />
        </div>
      )}
      <div className='flex flex-col justify-center px-3 pt-1 pb-2 text-center'>
        <h3 id={`staff-name-${member._id}`} className='font-medium'>
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

export default function StaffProfile() {
  const team = useQuery(api.teamMembers.getTeam) as Team | undefined;

  return (
    <section
      className='w-full py-10 max-w-6xl mx-auto'
      aria-label='Staff profiles'>
      <h2 className='sr-only'>Our Team</h2>
      <Suspense fallback={<StaffSkeleton />}>
        {!team ? (
          <StaffSkeleton />
        ) : (
          <div className='flex flex-col md:flex-row justify-between gap-6'>
            {team.director?.imageUrl && (
              <DirectorProfile director={team.director} />
            )}
            <div
              className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2'
              role='list'
              aria-label='Staff members'>
              {team.staff.map((member) => (
                <StaffMemberProfile key={member._id} member={member} />
              ))}
            </div>
          </div>
        )}
      </Suspense>
    </section>
  );
}
