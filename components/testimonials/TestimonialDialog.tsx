import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Quote, X } from "lucide-react";

interface TestimonialDialogProps {
  isOpen: boolean;
  onClose: () => void;
  testimonial: {
    name: string;
    role: string;
    body: string;
  };
}

export function TestimonialDialog({ isOpen, onClose, testimonial }: TestimonialDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-[#0f1e3a] border border-white/10 text-white p-0 overflow-hidden rounded-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#213675] to-[#0a1628] px-7 pt-7 pb-6 shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 hover:bg-white/15 transition-colors text-white/50 hover:text-white"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#179BD7]/10 ring-1 ring-[#179BD7]/20 flex items-center justify-center shrink-0">
              <Quote className="w-5 h-5 text-[#179BD7]" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{testimonial.name}</h2>
              <p className="text-[#179BD7] text-sm">{testimonial.role}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-7 py-6">
          <blockquote className="text-white/65 leading-relaxed text-base">
            {testimonial.body}
          </blockquote>
        </div>

        {/* Footer */}
        <div className="px-7 py-4 border-t border-white/8 shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-sm font-medium transition-all"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
