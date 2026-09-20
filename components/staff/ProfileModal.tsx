"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail, X } from "lucide-react";
import Image from "next/image";

type StaffProps = {
  name: string;
  position: string;
  profile?: string;
  email?: string;
  imageUrl: string | null;
};

const ProfileModal = ({
  name,
  position,
  profile,
  email,
  imageUrl,
}: StaffProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full rounded-xl border border-azure/30 px-4 py-2.5 text-sm font-medium text-azure transition-all duration-300 hover:border-azure/60 hover:bg-azure/10 hover:text-white">
          View profile
        </button>
      </DialogTrigger>

      <DialogContent className="overflow-hidden rounded-4xl border border-white/10 bg-ink-700 p-0 text-white shadow-lift sm:max-w-md">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-brand via-ink-700 to-ink-800 px-8 pb-7 pt-9 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-azure/25 blur-[70px]"
          />

          <DialogClose className="absolute right-4 top-4 rounded-full bg-white/5 p-2 text-white/55 transition-colors hover:bg-white/15 hover:text-white">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>

          {imageUrl && (
            <div className="relative mx-auto mb-5 h-24 w-24 overflow-hidden rounded-full ring-4 ring-azure/30">
              <Image
                alt={name}
                priority
                fill
                src={imageUrl}
                className="object-cover"
                sizes="96px"
              />
            </div>
          )}

          <DialogTitle className="relative font-display text-fluid-lg leading-snug text-white">
            {name}
          </DialogTitle>
          <p className="relative mt-1.5 text-sm text-azure">{position}</p>
        </div>

        {/* Body */}
        <div className="max-h-[45vh] overflow-y-auto px-8 py-6">
          {profile && (
            <p className="text-sm leading-relaxed text-white/60">{profile}</p>
          )}

          {email && (
            <a
              href={`mailto:${email}`}
              className="group mt-6 flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-3.5 text-sm text-white/65 transition-all duration-300 hover:border-azure/30 hover:bg-white/[0.06] hover:text-white"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-azure/10 ring-1 ring-azure/20 transition-colors group-hover:bg-azure/20">
                <Mail className="h-4 w-4 text-azure" />
              </span>
              <span className="truncate">{email}</span>
            </a>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/8 px-8 py-4">
          <DialogClose asChild>
            <button className="w-full rounded-xl bg-white/5 py-3 text-sm font-medium text-white/60 transition-all duration-300 hover:bg-white/10 hover:text-white">
              Close
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
