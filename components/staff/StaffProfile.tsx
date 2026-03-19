"use client";

import { api } from "@/convex/_generated/api";
import type { Team } from "@/types/team";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import DirectorProfile from "./DirectorProfile";
import StaffMemberProfile from "./StaffMemberProfile";
import StaffSkeleton from "./StaffSkeleton";

export default function StaffProfile() {
  const team = useQuery(api.teamMembers.getTeam) as Team | undefined;

  return (
    <section className="w-full py-12 max-w-7xl mx-auto px-4" aria-label="Staff profiles">
      <h2 className="sr-only">Our Team</h2>
      {!team ? (
        <StaffSkeleton />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row gap-8 items-start"
        >
          {team.director?.imageUrl && (
            <DirectorProfile director={team.director} />
          )}
          <div
            className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            role="list"
            aria-label="Staff members"
          >
            {team.staff.map((member, i) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
              >
                <StaffMemberProfile member={member} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
