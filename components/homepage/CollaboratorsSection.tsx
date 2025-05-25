"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Handshake, X } from "lucide-react";
import Image from "next/image";
import { Suspense, useCallback, useState } from "react";
import { createPortal } from "react-dom";

interface Collaborator {
  _id: string;
  name: string;
  office: string;
  imgUrl: string | null;
}

// Loading skeleton component for better UX
function CollaboratorsSkeleton() {
  return (
    <div className='space-y-6' role='status' aria-label='Loading collaborators'>
      {[1, 2].map((row) => (
        <div key={row} className='relative overflow-hidden'>
          <div className='flex gap-6'>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className='flex flex-col items-center justify-center p-3 rounded-lg shadow-md min-w-[220px] bg-white dark:bg-slate-700 animate-pulse'>
                <div className='w-20 h-20 bg-gray-200 dark:bg-gray-600 rounded-full mb-1' />
                <div className='h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-2' />
                <div className='h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2' />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Empty state component
function NoCollaborators() {
  return (
    <div
      className='text-center py-8 bg-white dark:bg-slate-800 rounded-xl shadow-md'
      role='status'
      aria-label='No collaborators found'>
      <Handshake
        className='w-12 h-12 text-gray-400 mx-auto mb-4'
        aria-hidden='true'
      />
      <p className='text-lg text-muted-foreground'>No collaborators found</p>
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
    <div
      className='fixed inset-0 bg-black/60 flex items-center justify-center z-50'
      role='dialog'
      aria-labelledby='modal-title'
      aria-modal='true'
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className='bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md relative shadow-lg text-center'>
        <button
          className='absolute top-2 right-2 p-2 text-gray-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
          onClick={onClose}
          aria-label='Close modal'>
          <X className='w-5 h-5 text-red-500' aria-hidden='true' />
        </button>
        <div className='w-24 h-24 relative mx-auto mb-4'>
          <Image
            src={collaborator.imgUrl || "/logo.webp"}
            alt={`${collaborator.name}'s profile`}
            fill
            className='object-contain rounded-full'
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/logo.webp";
            }}
          />
        </div>
        <h3
          id='modal-title'
          className='text-xl font-bold mb-1 break-words max-w-xs mx-auto line-clamp-2'>
          {collaborator.name}
        </h3>
        <p className='text-sm text-muted-foreground break-words max-w-xs mx-auto line-clamp-2'>
          {collaborator.office}
        </p>
      </div>
    </div>,
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
      className={`flex flex-col items-center justify-center p-3 rounded-lg shadow-md min-w-[220px] mr-6 transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
        isVC ? "bg-amber-200 text-amber-950" : "bg-white dark:bg-slate-700"
      }`}
      onClick={onClick}
      aria-label={`View details for ${collaborator.name}`}>
      <div className='w-20 h-20 relative mb-1'>
        <Image
          src={collaborator.imgUrl || "/logo.webp"}
          alt={`${collaborator.name}'s profile`}
          fill
          className='object-contain rounded-full'
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/logo.webp";
          }}
        />
      </div>
      <p className='font-semibold text-sm text-center break-words max-w-[200px] line-clamp-2'>
        {collaborator.name}
      </p>
      <p
        className={`text-sm text-center break-words max-w-[200px] line-clamp-2 ${
          isVC ? "text-amber-950" : "text-muted-foreground"
        }`}>
        {collaborator.office}
      </p>
    </button>
  );
}

export function CollaboratorsSection() {
  const collaborators = useQuery(api.collaborators.getCollaborators);
  const [selected, setSelected] = useState<Collaborator | null>(null);

  const handleClose = useCallback(() => setSelected(null), []);

  // Create repeated array only when data is available
  const repeatedCollaborators = collaborators
    ? Array(4).fill(collaborators).flat()
    : [];

  return (
    <section
      className='bg-blue-100 dark:bg-slate-900'
      aria-labelledby='collaborators-heading'>
      <div className='px-4 py-12 max-w-5xl mx-auto'>
        <header className='flex items-center gap-2 mb-12'>
          <Handshake className='w-8 h-8 text-primary' aria-hidden='true' />
          <h2
            id='collaborators-heading'
            className='text-3xl font-bold text-[#213675] dark:text-blue-500'>
            Our Valued Collaborators
          </h2>
        </header>

        <Suspense fallback={<CollaboratorsSkeleton />}>
          {collaborators === undefined ? (
            <CollaboratorsSkeleton />
          ) : collaborators.length === 0 ? (
            <NoCollaborators />
          ) : (
            <div className='space-y-6'>
              {/* Row 1 */}
              <div className='relative overflow-hidden marquee-wrapper'>
                <div
                  className='absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-blue-100 dark:from-slate-900 to-transparent z-10'
                  aria-hidden='true'
                />
                <div
                  className='absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-blue-100 dark:from-slate-900 to-transparent z-10'
                  aria-hidden='true'
                />
                <div
                  className='marquee-left'
                  role='region'
                  aria-label='Collaborators row 1'>
                  {repeatedCollaborators.map((collab, i) => (
                    <CollaboratorCard
                      key={`left-${collab._id}-${i}`}
                      collaborator={collab}
                      onClick={() => setSelected(collab)}
                    />
                  ))}
                </div>
              </div>

              {/* Row 2 (opposite direction) */}
              <div className='relative overflow-hidden marquee-wrapper'>
                <div
                  className='absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-blue-100 dark:from-slate-900 to-transparent z-10'
                  aria-hidden='true'
                />
                <div
                  className='absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-blue-100 dark:from-slate-900 to-transparent z-10'
                  aria-hidden='true'
                />
                <div
                  className='marquee-right'
                  role='region'
                  aria-label='Collaborators row 2'>
                  {repeatedCollaborators.map((collab, i) => (
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
        </Suspense>
      </div>

      {/* Modal */}
      {selected && (
        <CollaboratorModal collaborator={selected} onClose={handleClose} />
      )}
    </section>
  );
}
