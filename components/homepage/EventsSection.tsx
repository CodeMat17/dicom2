"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Calendar, MapPin } from "lucide-react";

// interface Event {
//   id: number;
//   title: string;
//   date: string;
//   location: string;
// }

export function EventsSection() {
  const events = useQuery(api.events.getEvents);

  return (
    <section className='bg-purple-50 dark:bg-slate-950'>
      <section className='py-20 px-4 max-w-5xl mx-auto'>
        <div className='flex items-center gap-2 mb-12'>
          <Calendar className='w-8 h-8 text-primary' />
          <h2 className='text-3xl font-bold text-[#213675] dark:text-blue-500'>Upcoming Events</h2>
        </div>

        {events === undefined ? (
          <p className=' pl-6 text-muted-foreground italic'>
            Events loading...
          </p>
        ) : events.length === 0 ? (
          <p className='pl-6 text-muted-foreground italic'>
            No event scheduled at the moment
          </p>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-6'>
            {events.map((event, index) => (
              <div key={index}>
                <div className='w-full  bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mb-6 lg:mb-0'>
                  <h3 className='text-xl font-semibold mb-3'>{event.title}</h3>
                  <div className='space-y-2'>
                    <p className='flex items-center gap-2 text-muted-foreground'>
                      <Calendar className='w-4 h-4' /> {event.date}
                    </p>
                    <p className='flex items-center gap-2 text-muted-foreground'>
                      <MapPin className='w-4 h-4' /> {event.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )} 
      </section>
    </section>
  );
}
