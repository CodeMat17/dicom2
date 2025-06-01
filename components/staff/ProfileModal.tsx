"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail } from "lucide-react";
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
        <Button variant='outline'>View Profile</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md '>
        <DialogHeader>
         
          <div className="flex justify-center sm:justify-start">
            {imageUrl && (
              <Image
                alt=''
                priority
                width={90}
                height={90}
                src={imageUrl}
                className='rounded-full aspect-square'
              />
            )}
          </div>
          <DialogDescription>
            {name} <br /> {position}
          </DialogDescription>
        </DialogHeader>
        <div className='max-h-[50vh] overflow-y-scroll'>
          <p className='mb-4'>{profile}</p>
          {email && (
            <p className='mt-4 text-sm text-muted-foreground flex items-center'>
              <Mail className='w-4 h-4 mr-2' />
              {email}
            </p>
          )}
        </div>
        <DialogFooter className='sm:justify-end'>
          <DialogClose asChild>
            <Button type='button' variant='secondary'>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
