import type { Team } from "@/types/team";
import { Aurora, Reveal, Stagger } from "../ui/motion-primitives";
import DirectorProfile from "./DirectorProfile";
import StaffMemberProfile from "./StaffMemberProfile";

export default function StaffProfile({ team }: { team: Team | null }) {
  return (
    <section
      className="relative overflow-hidden bg-ink-800 px-5 py-24 grain sm:px-6 md:py-32"
      aria-labelledby="team-heading"
    >
      <Aurora className="-left-40 top-20 h-[460px] w-[460px]" color="brand" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <h2 id="team-heading" className="sr-only">
          Our team
        </h2>

        {!team ? (
          <p className="py-16 text-center text-white/70">
            Team profiles are not available right now.
          </p>
        ) : (
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            {team.director?.imageUrl && (
              <DirectorProfile director={team.director} />
            )}

            <Stagger
              as="ul"
              className="grid flex-1 grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-2 xl:grid-cols-3"
              gap={0.07}
            >
              {team.staff.map((member) => (
                <Reveal key={member._id} as="li" variant="card">
                  <StaffMemberProfile member={member} />
                </Reveal>
              ))}
            </Stagger>
          </div>
        )}
      </div>
    </section>
  );
}
