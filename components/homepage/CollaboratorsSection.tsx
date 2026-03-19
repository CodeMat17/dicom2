"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import { Handshake, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { createPortal } from "react-dom";

interface Collaborator {
  _id: string;
  name: string;
  office: string;
  imgUrl: string | null;
}

function CollaboratorsSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2].map((row) => (
        <div key={row} className="flex gap-6 overflow-hidden">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex-shrink-0 flex flex-col items-center p-4 rounded-2xl bg-white/5 animate-pulse min-w-[180px]"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 mb-3" />
              <div className="h-3 w-24 bg-white/10 rounded mb-2" />
              <div className="h-2 w-16 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function CollaboratorModal({
  collaborator,
  onClose,
}: {
  collaborator: Collaborator;
  onClose: () => void;
}) {
  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-[#0f1e3a] border border-white/10 rounded-2xl p-8 max-w-sm w-full relative text-center shadow-2xl"
        >
          <button
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-24 h-24 relative mx-auto mb-5 ring-4 ring-[#179BD7]/30 rounded-full overflow-hidden">
            <Image
              src={collaborator.imgUrl || "/logo.webp"}
              alt={collaborator.name}
              fill
              className="object-contain"
              onError={(e) => { (e.target as HTMLImageElement).src = "/logo.webp"; }}
            />
          </div>

          <h3 id="modal-title" className="text-xl font-bold text-white mb-1 line-clamp-2">
            {collaborator.name}
          </h3>
          <p className="text-[#179BD7] text-sm">{collaborator.office}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

function CollaboratorCard({
  collaborator,
  onClick,
}: {
  collaborator: Collaborator;
  onClick: () => void;
}) {
  const isVC = collaborator.office === "Vice Chancellor, GOUNI";

  return (
    <button
      onClick={onClick}
      aria-label={`View details for ${collaborator.name}`}
      className={`flex-shrink-0 flex flex-col items-center p-4 rounded-2xl min-w-[170px] mr-5 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#179BD7] ${
        isVC
          ? "bg-yellow-400/10 border border-yellow-400/30 hover:bg-yellow-400/20"
          : "bg-white/5 border border-white/10 hover:bg-white/10"
      }`}
    >
      <div className="w-16 h-16 relative mb-3 rounded-full overflow-hidden ring-2 ring-white/10">
        <Image
          src={collaborator.imgUrl || "/logo.webp"}
          alt={collaborator.name}
          fill
          className="object-contain"
          onError={(e) => { (e.target as HTMLImageElement).src = "/logo.webp"; }}
        />
      </div>
      <p className={`font-semibold text-sm text-center line-clamp-2 max-w-[150px] ${isVC ? "text-yellow-300" : "text-white"}`}>
        {collaborator.name}
      </p>
      <p className="text-xs text-white/40 text-center line-clamp-2 max-w-[150px] mt-0.5">
        {collaborator.office}
      </p>
    </button>
  );
}

export function CollaboratorsSection() {
  const collaborators = useQuery(api.collaborators.getCollaborators);
  const [selected, setSelected] = useState<Collaborator | null>(null);
  const handleClose = useCallback(() => setSelected(null), []);

  const repeated = collaborators ? Array(5).fill(collaborators).flat() : [];

  return (
    <section className="bg-[#060e1e] py-24 overflow-hidden" aria-labelledby="collaborators-heading">
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="h-px w-8 bg-yellow-400" />
            <span className="text-yellow-400 text-sm font-mono tracking-widest uppercase">Partners</span>
          </div>
          <h2
            id="collaborators-heading"
            className="text-4xl md:text-5xl font-bold text-white leading-tight"
          >
            Our Valued <span className="text-[#179BD7]">Collaborators</span>
          </h2>
          <p className="mt-3 text-white/50 max-w-lg">
            Working together with distinguished individuals and institutions to elevate student excellence.
          </p>
        </motion.div>
      </div>

      {collaborators === undefined ? (
        <div className="px-4">
          <CollaboratorsSkeleton />
        </div>
      ) : collaborators.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-white/30 px-4">
          <Handshake className="w-12 h-12 mb-4" />
          <p className="text-lg">No collaborators found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Row 1 — scrolls left */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#060e1e] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#060e1e] to-transparent z-10 pointer-events-none" />
            <div className="marquee-left" role="region" aria-label="Collaborators row 1">
              {repeated.map((collab, i) => (
                <CollaboratorCard
                  key={`left-${collab._id}-${i}`}
                  collaborator={collab}
                  onClick={() => setSelected(collab)}
                />
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#060e1e] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#060e1e] to-transparent z-10 pointer-events-none" />
            <div className="marquee-right" role="region" aria-label="Collaborators row 2">
              {repeated.map((collab, i) => (
                <CollaboratorCard
                  key={`right-${collab._id}-${i}`}
                  collaborator={collab}
                  onClick={() => setSelected(collab)}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {selected && <CollaboratorModal collaborator={selected} onClose={handleClose} />}
    </section>
  );
}
