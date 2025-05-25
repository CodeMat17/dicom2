import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Quote } from "lucide-react";

interface TestimonialDialogProps {
  isOpen: boolean;
  onClose: () => void;
  testimonial: {
    name: string;
    role: string;
    body: string;
  };
}

export function TestimonialDialog({
  isOpen,
  onClose,
  testimonial,
}: TestimonialDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='max-w-lg h-[80vh] flex flex-col p-0'>
        <DialogHeader className='p-6 pb-2'>
          <div className='flex items-center gap-4'>
            <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0'>
              <Quote className='w-6 h-6 text-primary' aria-hidden='true' />
            </div>
            <div>
              <DialogTitle className='text-2xl font-bold'>
                {testimonial.name}
              </DialogTitle>
              <p className='text-muted-foreground'>{testimonial.role}</p>
            </div>
          </div>
        </DialogHeader>
        <div className='overflow-y-auto flex-1 p-6 pt-2'>
          <div className='prose dark:prose-invert max-w-none'>
            <blockquote className='text-lg leading-relaxed border-none p-0 not-italic'>
              {testimonial.body}
            </blockquote>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
