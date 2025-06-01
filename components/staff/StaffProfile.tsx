"use client";

import { api } from "@/convex/_generated/api";
import type { Team } from "@/types/team";
import { useQuery } from "convex/react";
import { Suspense } from "react";
import DirectorProfile from "./DirectorProfile";
import StaffMemberProfile from "./StaffMemberProfile";
import StaffSkeleton from "./StaffSkeleton";

export default function StaffProfile() {
  const team = useQuery(api.teamMembers.getTeam) as Team | undefined;

  return (
    <section 
      className='w-full py-10 max-w-7xl mx-auto'
      aria-label='Staff profiles'>
      <h2 className='sr-only'>Our Team</h2>
      <Suspense fallback={<StaffSkeleton />}>
        {!team ? (
          <StaffSkeleton />
        ) : (
          <div className='flex items-center flex-col md:flex-row justify-between gap-6'>
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
