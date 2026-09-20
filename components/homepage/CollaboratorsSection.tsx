import { Handshake } from "lucide-react";
import { Aurora, SectionHeading } from "../ui/motion-primitives";
import {
  CollaboratorsMarquee,
  type Collaborator,
} from "./CollaboratorsMarquee";

export type { Collaborator };

export function CollaboratorsSection({
  collaborators,
}: {
  collaborators: Collaborator[];
}) {
  return (
    <section
      className="relative overflow-hidden bg-ink-900 py-28 grain md:py-36"
      aria-labelledby="collaborators-heading"
    >
      <Aurora
        className="left-1/2 top-10 h-[460px] w-[680px] -translate-x-1/2"
        color="brand"
      />

      <div className="relative z-10 mx-auto mb-16 max-w-7xl px-5 sm:px-6">
        <SectionHeading
          id="collaborators-heading"
          eyebrow="Partners"
          title="Our valued"
          accent="collaborators"
          description="Working together with distinguished individuals and institutions to elevate student excellence."
          align="center"
          className="mx-auto"
        />
      </div>

      {collaborators.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-white/70">
          <Handshake aria-hidden className="mb-4 h-12 w-12" />
          <p className="text-lg">No collaborators found</p>
        </div>
      ) : (
        <CollaboratorsMarquee list={collaborators} />
      )}
    </section>
  );
}
