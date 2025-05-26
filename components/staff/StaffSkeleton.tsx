export default function StaffSkeleton() {
  return (
    <div
      className='w-full py-10 max-w-6xl mx-auto animate-pulse'
      role='status'
      aria-label='Loading staff profiles'
      aria-busy='true'>
      <div className='flex flex-col md:flex-row justify-between gap-6'>
        {/* Director skeleton */}
        <div className='w-full md:max-w-[35%]'>
          <div className='flex flex-col justify-center items-center bg-white dark:bg-gray-700 rounded-xl shadow-md pt-4 px-6'>
            <div className='w-full sm:max-w-sm aspect-square rounded-full bg-gray-200 dark:bg-gray-600' />
            <div className='w-full px-6 pt-4 pb-4 space-y-2'>
              <div className='h-5 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mx-auto' />
              <div className='h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mx-auto' />
            </div>
          </div>
        </div>

        {/* Staff skeletons */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className='flex flex-col justify-center items-center py-2 px-2 bg-white dark:bg-gray-700 rounded-xl shadow-md'>
              <div className='w-[120px] h-[120px] rounded-full bg-gray-200 dark:bg-gray-600' />
              <div className='w-full px-3 pt-4 pb-2 space-y-2'>
                <div className='h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3 mx-auto' />
                <div className='h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mx-auto' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
