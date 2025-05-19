// app/our-staff/page.tsx
"use client";

import StaffProfile from "@/components/staff/StaffProfile";


// import { StaffProfile } from "@/components/staff/StaffProfile";

export default function StaffPage() {

  return (
    <main className='min-h-screen bg-purple-50 dark:bg-slate-950 py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h1 className='text-4xl font-bold text-center mb-12 text-foreground'>
       Meet Our Team
        </h1>
        <StaffProfile  />
    

     
      </div>
    </main>
  );
}
