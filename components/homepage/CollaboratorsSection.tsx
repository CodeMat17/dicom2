"use client";

import { api } from "@/convex/_generated/api";
import { popIn } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import { Handshake, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Aurora, SectionHeading } from "../ui/motion-primitives";

interface Collaborator {
  _id: string;
  name: string;
  office: string;
  imgUrl: string | null;
}

const VC_OFFICE = "Vice Chancellor, GOUNI";

/* ------------------------------------------------------------------ */

function CollaboratorsSkeleton() {
  return (
    <div className="space-y-5 px-5">
      {[0, 1].map((row) => (
        <div key={row} className="flex gap-5 overflow-hidden">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="shimmer flex min-w-[200px] shrink-0 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4"
            >
              <div className="h-12 w-12 shrink-0 rounded-full bg-white/[0.07]" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-24 rounded bg-white/[0.07]" />
                <div className="h-2 w-16 rounded bg-white/[0.07]" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function CollaboratorModal({
  collaborator,
  onClose,
}: {
  collaborator: Collaborator;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-900/85 p-4 backdrop-blur-md"
        role="dialog"
        aria-labelledby="collab-modal-title"
        aria-modal="true"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          variants={popIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="edge-light relative w-full max-w-sm overflow-hidden rounded-4xl border border-white/10 bg-ink-700 p-8 text-center shadow-lift"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-azure/25 blur-[70px]"
          />

          <button
            className="absolute right-4 top-4 rounded-full bg-white/5 p-2 text-white/55 transition-colors hover:bg-white/10 hover:text-white"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full bg-ink-900 p-1 ring-2 ring-azure/40">
            <Image
              src={collaborator.imgUrl || "/logo.webp"}
              alt={collaborator.name}
              fill
              className="rounded-full object-contain p-1"
              sizes="112px"
            />
          </div>

          <h3
            id="collab-modal-title"
            className="relative font-display text-fluid-xl leading-snug text-white"
          >
            {collaborator.name}
          </h3>
          <p className="relative mt-2 text-sm text-azure">{collaborator.office}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

/* ------------------------------------------------------------------ */

function CollaboratorCard({
  collaborator,
  onClick,
  ariaHidden,
}: {
  collaborator: Collaborator;
  onClick: () => void;
  ariaHidden?: boolean;
}) {
  const isVC = collaborator.office === VC_OFFICE;

  return (
    <button
      onClick={onClick}
      tabIndex={ariaHidden ? -1 : 0}
      aria-hidden={ariaHidden}
      aria-label={`View details for ${collaborator.name}`}
      className={cn(
        "group mr-5 flex w-[248px] shrink-0 items-center gap-3.5 rounded-2xl border p-4 text-left",
        "transition-all duration-500 ease-out-quint hover:-translate-y-1",
        isVC
          ? "border-gold/30 bg-gold/[0.07] hover:border-gold/60 hover:shadow-gold"
          : "border-white/10 bg-white/[0.04] hover:border-azure/40 hover:bg-white/[0.07] hover:shadow-glow"
      )}
    >
      <span
        className={cn(
          "relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-ink-900 ring-1 transition-all duration-500",
          isVC
            ? "ring-gold/40 group-hover:ring-gold"
            : "ring-white/15 group-hover:ring-azure/60"
        )}
      >
        <Image
          src={collaborator.imgUrl || "/logo.webp"}
          alt=""
          fill
          className="object-contain p-1"
          sizes="48px"
        />
      </span>

      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block truncate text-sm font-semibold",
            isVC ? "text-gold" : "text-white"
          )}
        >
          {collaborator.name}
        </span>
        <span className="mt-0.5 block truncate text-xs text-white/40">
          {collaborator.office}
        </span>
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Builds a track that is exactly two identical halves, so the CSS
 * animation to -50% loops with no visible jump regardless of how many
 * collaborators come back from the query.
 */
function buildTrack(list: Collaborator[]) {
  if (!list.length) return [];
  const half: Collaborator[] = [];
  while (half.length < Math.max(8, list.length)) half.push(...list);
  return [...half, ...half];
}

export function CollaboratorsSection() {
  const collaborators = useQuery(api.collaborators.getCollaborators);
  const [selected, setSelected] = useState<Collaborator | null>(null);
  const handleClose = useCallback(() => setSelected(null), []);

  const list = collaborators ?? [];
  // Offset the second row so the two rows never sit in lockstep.
  const rowA = buildTrack(list);
  const rowB = buildTrack([...list].reverse());

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
          eyebrow="Partners"
          title="Our valued"
          accent="collaborators"
          description="Working together with distinguished individuals and institutions to elevate student excellence."
          align="center"
          className="mx-auto"
        />
      </div>

      {collaborators === undefined ? (
        <CollaboratorsSkeleton />
      ) : list.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-white/30">
          <Handshake className="mb-4 h-12 w-12" />
          <p className="text-lg">No collaborators found</p>
        </div>
      ) : (
        <div className="marquee-wrapper relative z-10 space-y-5">
          <div className="mask-edges overflow-hidden">
            <div className="marquee-track marquee-left" aria-label="Collaborators">
              {rowA.map((collab, i) => (
                <CollaboratorCard
                  key={`a-${collab._id}-${i}`}
                  collaborator={collab}
                  ariaHidden={i >= rowA.length / 2}
                  onClick={() => setSelected(collab)}
                />
              ))}
            </div>
          </div>

          <div className="mask-edges overflow-hidden">
            <div className="marquee-track marquee-right" aria-hidden>
              {rowB.map((collab, i) => (
                <CollaboratorCard
                  key={`b-${collab._id}-${i}`}
                  collaborator={collab}
                  ariaHidden
                  onClick={() => setSelected(collab)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {selected && (
        <CollaboratorModal collaborator={selected} onClose={handleClose} />
      )}
    </section>
  );
}
