"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Handshake, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Collaborator {
  _id: string;
  name: string;
  office: string;
  imgUrl: string | null;
}

export function CollaboratorsSection() {
  const collaborators = useQuery(api.collaborators.getCollaborators);
  const [selected, setSelected] = useState<Collaborator | null>(null);

  // Create repeated array only when data is available
  const repeatedCollaborators = collaborators
    ? Array(4).fill(collaborators).flat()
    : [];

  return (
    <section className='relative py-12 bg-purple-50 dark:bg-slate-950'>
      <div className='px-4 max-w-5xl mx-auto'>
        <div className='flex items-center gap-2 mb-12'>
          <Handshake className='w-8 h-8 text-primary' />
          <h2 className='text-3xl font-bold text-[#213675] dark:text-blue-500'>Our Valued Collaborators</h2>
        </div>

        {collaborators === undefined ? (
          <p className='pl-6 text-muted-foreground italic'>
            Collaborators loading...
          </p>
        ) : collaborators.length === 0 ? (
          <p className='pl-6 text-muted-foreground italic'>
            No collaborators found
          </p>
        ) : (
          <div className='space-y-6'>
            {/* Row 1 */}
            <div className='relative overflow-hidden marquee-wrapper'>
              <div className='absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-purple-50 dark:from-slate-950 to-transparent z-10 pointer-events-none' />
              <div className='absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-purple-50 dark:from-slate-950 to-transparent z-10 pointer-events-none' />

              <div className='marquee-left'>
                {repeatedCollaborators.map((collab, i) => (
                  <button
                    key={`left-${collab._id}-${i}`}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg shadow-md min-w-[220px] mr-6 transition hover:scale-105 focus:outline-none ${collab.office === "Vice Chancellor, GOUNI" ? "bg-amber-200 text-amber-950 dark:text-amber-950" : "bg-white dark:bg-slate-700"}`}
                    onClick={() => setSelected(collab)}>
                    <div className='w-20 h-20 relative mb-1'>
                      <Image
                        src={collab.imgUrl || "/fallback-logo.png"}
                        alt={collab.name}
                        fill
                        className='object-contain rounded-full'
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/fallback-logo.png";
                        }}
                      />
                    </div>
                    <p className='font-semibold text-sm text-center break-words max-w-[200px] line-clamp-2'>
                      {collab.name}
                    </p>
                    <p
                      className={`text-sm text-center break-words max-w-[200px] line-clamp-2  ${collab.office === "Vice Chancellor, GOUNI" ? "text-amber-950 dark:text-amber-950" : "text-muted-foreground"}`}>
                      {collab.office}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Row 2 (opposite direction) */}
            <div className='relative overflow-hidden marquee-wrapper'>
              <div className='absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-purple-50 dark:from-slate-950 to-transparent z-10 pointer-events-none' />
              <div className='absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-purple-50 dark:from-slate-950 to-transparent z-10 pointer-events-none' />
              <div className='marquee-right'>
                {repeatedCollaborators.map((collab, i) => (
                  <button
                    key={`right-${collab._id}-${i}`}
                    className={`flex flex-col items-center justify-center  ${collab.office === "Vice Chancellor, GOUNI" ? "bg-amber-200 text-amber-950 dark:text-amber-950" : "bg-white dark:bg-slate-700"} p-3 rounded-lg shadow-sm min-w-[220px] mr-6 transition hover:scale-105 focus:outline-none`}
                    onClick={() => setSelected(collab)}>
                    <div className='w-20 h-20 relative mb-1'>
                      <Image
                        src={collab.imgUrl || "/fallback-logo.png"}
                        alt={collab.name}
                        fill
                        className='object-contain rounded-full'
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/fallback-logo.png";
                        }}
                      />
                    </div>
                    <p className='font-semibold text-sm text-center break-words max-w-[200px] line-clamp-2'>
                      {collab.name}
                    </p>
                    <p
                      className={`text-sm text-center break-words max-w-[200px] line-clamp-2  ${collab.office === "Vice Chancellor, GOUNI" ? "text-amber-950 dark:text-amber-950" : "text-muted-foreground"}`}>
                      {collab.office}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50'>
          <div className='bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md relative shadow-lg text-center'>
            <button
              className='absolute top-2 right-2 text-gray-500 hover:text-black'
              onClick={() => setSelected(null)}
              aria-label='Close modal'>
              <X className='w-5 h-5 text-red-500' />
            </button>
            <div className='w-24 h-24 relative mx-auto mb-4'>
              <Image
                src={selected.imgUrl || "/fallback-logo.png"}
                alt={selected.name}
                fill
                className='object-contain rounded-full'
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/fallback-logo.png";
                }}
              />
            </div>
            <h3 className='text-xl font-bold mb-1 break-words max-w-xs mx-auto line-clamp-2'>
              {selected.name}
            </h3>
            <p className='text-sm text-muted-foreground break-words max-w-xs mx-auto line-clamp-2'>
              {selected.office}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
