import Image from "next/image";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink-900">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/40 blur-[90px]"
      />

      <div className="relative flex flex-col items-center gap-6">
        <div className="relative h-20 w-20">
          {/* Orbiting ring reads as progress without claiming a percentage */}
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-white/10 border-t-azure [animation-duration:1.1s]" />
          <span className="absolute inset-0 flex items-center justify-center">
            <Image
              priority
              alt="DICOM"
              width={48}
              height={48}
              src="/logo.webp"
              className="rounded-full"
            />
          </span>
        </div>

        <p className="eyebrow animate-pulse text-white/40">Loading</p>
      </div>
    </div>
  );
};

export default Loading;
