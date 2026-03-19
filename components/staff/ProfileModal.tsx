"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
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

const ProfileModal = ({ name, position, profile, email, imageUrl }: StaffProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full text-sm text-[#179BD7] border border-[#179BD7]/30 hover:bg-[#179BD7]/10 hover:border-[#179BD7]/60 rounded-xl py-2 px-4 transition-all duration-200 font-medium">
          View Profile
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-[#0f1e3a] border border-white/10 text-white p-0 overflow-hidden rounded-2xl">
        {/* Header with image */}
        <div className="relative bg-gradient-to-br from-[#213675] to-[#0a1628] px-8 pt-8 pb-6 text-center">
          <DialogClose className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/15 transition-colors text-white/50 hover:text-white">
            <X className="w-4 h-4" />
          </DialogClose>

          {imageUrl && (
            <div className="w-24 h-24 relative mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-[#179BD7]/30">
              <Image
                alt={name}
                priority
                fill
                src={imageUrl}
                className="object-cover"
              />
            </div>
          )}
          <h2 className="text-xl font-bold text-white">{name}</h2>
          <p className="text-[#179BD7] text-sm mt-1">{position}</p>
        </div>

        {/* Body */}
        <div className="px-8 py-6 max-h-[45vh] overflow-y-auto">
          {profile && (
            <p className="text-white/60 text-sm leading-relaxed">{profile}</p>
          )}

          {email && (
            <a
              href={`mailto:${email}`}
              className="mt-5 flex items-center gap-2.5 text-sm text-[#179BD7] hover:text-white transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#179BD7]/10 flex items-center justify-center shrink-0 group-hover:bg-[#179BD7]/20 transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              {email}
            </a>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-white/8">
          <DialogClose asChild>
            <button className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-sm font-medium transition-all">
              Close
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
