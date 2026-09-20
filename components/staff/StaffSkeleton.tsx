export default function StaffSkeleton() {
  return (
    <div
      className="mx-auto w-full max-w-7xl"
      role="status"
      aria-label="Loading staff profiles"
      aria-busy="true"
    >
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Director */}
        <div className="w-full shrink-0 lg:w-[320px]">
          <div className="shimmer flex flex-col items-center rounded-4xl border border-white/10 bg-white/[0.04] p-8">
            <div className="mb-5 h-3 w-16 rounded bg-white/[0.06]" />
            <div className="mb-5 h-44 w-44 rounded-full bg-white/[0.06]" />
            <div className="mb-2 h-5 w-36 rounded bg-white/[0.06]" />
            <div className="h-3 w-24 rounded bg-white/[0.06]" />
          </div>
        </div>

        {/* Staff */}
        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="shimmer flex flex-col items-center rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-7"
            >
              <div className="mb-4 h-24 w-24 rounded-full bg-white/[0.06]" />
              <div className="mb-2 h-4 w-28 rounded bg-white/[0.06]" />
              <div className="h-3 w-20 rounded bg-white/[0.06]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
