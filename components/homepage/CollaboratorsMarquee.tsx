"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

export interface Collaborator {
  _id: string;
  name: string;
  office: string;
  imgUrl: string | null;
}

const VC_OFFICE = "Vice Chancellor, GOUNI";

/**
 * Builds a track that is exactly two identical halves, so the CSS animation
 * to -50% loops with no visible jump regardless of how many collaborators
 * come back from the query.
 */
function buildTrack(list: Collaborator[]) {
  if (!list.length) return [];
  const half: Collaborator[] = [];
  while (half.length < Math.max(8, list.length)) half.push(...list);
  return [...half, ...half];
}

export function CollaboratorsMarquee({ list }: { list: Collaborator[] }) {
  const [selected, setSelected] = useState<Collaborator | null>(null);
  const close = useCallback(() => setSelected(null), []);

  // Offset the second row so the two rows never sit in lockstep.
  const rowA = buildTrack(list);
  const rowB = buildTrack([...list].reverse());

  return (
    <div className="marquee-wrapper relative z-10 space-y-5">
      <div className="mask-edges overflow-hidden">
        <ul className="marquee-track marquee-left">
          {rowA.map((collab, i) => (
            <CollaboratorCard
              key={`a-${collab._id}-${i}`}
              collaborator={collab}
              duplicate={i >= rowA.length / 2}
              onSelect={setSelected}
            />
          ))}
        </ul>
      </div>

      {/* Second row is decorative: every name in it already appears above. */}
      <div className="mask-edges overflow-hidden" aria-hidden>
        <ul className="marquee-track marquee-right">
          {rowB.map((collab, i) => (
            <CollaboratorCard
              key={`b-${collab._id}-${i}`}
              collaborator={collab}
              duplicate
              onSelect={setSelected}
            />
          ))}
        </ul>
      </div>

      {selected && <CollaboratorDialog collaborator={selected} onClose={close} />}
    </div>
  );
}

function CollaboratorCard({
  collaborator,
  duplicate,
  onSelect,
}: {
  collaborator: Collaborator;
  /** Repeated copy that exists only to keep the marquee seamless. */
  duplicate?: boolean;
  onSelect: (collaborator: Collaborator) => void;
}) {
  const isVC = collaborator.office === VC_OFFICE;

  return (
    <li className="shrink-0" aria-hidden={duplicate || undefined}>
      <button
        type="button"
        onClick={() => onSelect(collaborator)}
        tabIndex={duplicate ? -1 : 0}
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
          <span className="mt-0.5 block truncate text-xs text-white/70">
            {collaborator.office}
          </span>
        </span>
      </button>
    </li>
  );
}

function CollaboratorDialog({
  collaborator,
  onClose,
}: {
  collaborator: Collaborator;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  // A native <dialog> gives focus trapping, Escape handling and inertness for
  // the rest of the page without any of it being written here.
  useEffect(() => {
    const el = ref.current;
    if (!el?.open) el?.showModal();
  }, []);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close();
      }}
      aria-labelledby="collab-dialog-title"
      className="m-auto w-[min(24rem,calc(100vw-2rem))] bg-transparent p-0 text-white backdrop:bg-scrim/75 backdrop:backdrop-blur-md"
    >
      <div className="edge-light relative overflow-hidden rounded-4xl border border-white/10 bg-ink-700 p-8 text-center shadow-lift">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-azure/25 blur-[70px]"
        />

        <button
          type="button"
          className="absolute right-4 top-4 rounded-full bg-white/5 p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          onClick={() => ref.current?.close()}
        >
          <X aria-hidden className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <div className="relative mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full bg-ink-900 p-1 ring-2 ring-azure/40">
          <Image
            src={collaborator.imgUrl || "/logo.webp"}
            alt=""
            fill
            className="rounded-full object-contain p-1"
            sizes="112px"
          />
        </div>

        <h3
          id="collab-dialog-title"
          className="relative font-display text-fluid-xl leading-snug text-white"
        >
          {collaborator.name}
        </h3>
        <p className="relative mt-2 text-sm text-azure">{collaborator.office}</p>
      </div>
    </dialog>
  );
}
