export default function StaffSkeleton() {
  return (
    <div
      className="w-full py-10 max-w-7xl mx-auto px-4 animate-pulse"
      role="status"
      aria-label="Loading staff profiles"
      aria-busy="true"
    >
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Director skeleton */}
        <div className="w-full md:w-72 shrink-0">
          <div className="flex flex-col items-center bg-white/5 border border-white/8 rounded-2xl pt-6 px-6 pb-6">
            <div className="text-xs h-3 w-16 bg-white/10 rounded mb-4" />
            <div className="w-44 h-44 rounded-full bg-white/10 mb-4" />
            <div className="h-4 w-36 bg-white/10 rounded mb-2" />
            <div className="h-3 w-24 bg-white/10 rounded" />
          </div>
        </div>

        {/* Staff skeletons */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center py-6 px-4 bg-white/4 border border-white/8 rounded-2xl">
              <div className="w-24 h-24 rounded-full bg-white/10 mb-4" />
              <div className="h-4 w-28 bg-white/10 rounded mb-2" />
              <div className="h-3 w-20 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
