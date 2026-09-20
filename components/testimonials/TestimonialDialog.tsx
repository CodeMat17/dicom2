import {
  Dialog,
  DialogContent,
  DialogTitle,
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

export function TestimonialDialog({
  isOpen,
  onClose,
  testimonial,
}: TestimonialDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex max-h-[85vh] max-w-lg flex-col overflow-hidden rounded-4xl border border-white/10 bg-ink-700 p-0 text-white shadow-lift">
        {/* Header */}
        <div className="relative shrink-0 overflow-hidden bg-gradient-to-br from-brand via-ink-700 to-ink-800 px-7 pb-6 pt-7">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-azure/25 blur-[70px]"
          />

          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full bg-white/5 p-2 text-white/55 transition-colors hover:bg-white/15 hover:text-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-azure/15 ring-1 ring-azure/25">
              <Quote className="h-5 w-5 text-azure" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <DialogTitle className="truncate font-display text-fluid-lg text-white">
                {testimonial.name}
              </DialogTitle>
              <p className="truncate text-sm text-azure">{testimonial.role}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-7 py-6">
          <blockquote className="border-l-2 border-azure/40 pl-5 text-base leading-relaxed text-white/70">
            {testimonial.body}
          </blockquote>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-white/8 px-7 py-4">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-white/5 py-3 text-sm font-medium text-white/60 transition-all duration-300 hover:bg-white/10 hover:text-white"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
