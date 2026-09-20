"use client";

import { api } from "@/convex/_generated/api";
import { cardRise } from "@/lib/motion";
import type { Team } from "@/types/team";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Aurora, Stagger } from "../ui/motion-primitives";
import DirectorProfile from "./DirectorProfile";
import StaffMemberProfile from "./StaffMemberProfile";
import StaffSkeleton from "./StaffSkeleton";

export default function StaffProfile() {
  const team = useQuery(api.teamMembers.getTeam) as Team | undefined;

  return (
    <section
      className="relative overflow-hidden bg-ink-800 px-5 py-24 grain sm:px-6 md:py-32"
      aria-label="Staff profiles"
    >
      <Aurora className="-left-40 top-20 h-[460px] w-[460px]" color="brand" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <h2 className="sr-only">Our Team</h2>

        {!team ? (
          <StaffSkeleton />
        ) : (
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            {team.director?.imageUrl && (
              <DirectorProfile director={team.director} />
            )}

            <Stagger
              className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
              gap={0.07}
            >
              {team.staff.map((member) => (
                <motion.div key={member._id} variants={cardRise}>
                  <StaffMemberProfile member={member} />
                </motion.div>
              ))}
            </Stagger>
          </div>
        )}
      </div>
    </section>
  );
}
