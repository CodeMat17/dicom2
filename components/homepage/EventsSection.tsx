"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Calendar, MapPin } from "lucide-react";
import { Suspense } from "react";

interface Event {
  _id: string;
  title: string;
  date?: string;
  location?: string;
  note?: string;
}

// Loading skeleton component for better UX
function EventsSkeleton() {
  return (
    <div
      className='grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6'
      role='status'
      aria-label='Loading events'>
      {[1, 2].map((i) => (
        <div key={i} className='animate-pulse'>
          <div className='w-full bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mb-6 lg:mb-0'>
            <div className='h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4'></div>
            <div className='space-y-3'>
              <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2'></div>
              <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3'></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Empty state component
function NoEvents() {
  return (
    <div
      className='text-center py-8 bg-white dark:bg-slate-800 rounded-xl shadow-md'
      role='status'
      aria-label='No events available'>
      <Calendar
        className='w-12 h-12 text-gray-400 mx-auto mb-4'
        aria-hidden='true'
      />
      <p className='text-lg text-muted-foreground'>
        No events scheduled at the moment
      </p>
    </div>
  );
}

export function EventsSection() {
  const events = useQuery(api.events.getEvents);

  return (
    <section
      className='bg-purple-50 dark:bg-slate-950'
      aria-labelledby='events-heading'>
      <div className='py-20 px-4 max-w-5xl mx-auto'>
        <header className='flex items-center gap-2 mb-12'>
          <Calendar className='w-8 h-8 text-primary' aria-hidden='true' />
          <h2
            id='events-heading'
            className='text-3xl font-bold text-[#213675] dark:text-blue-500'>
            Upcoming Events
          </h2>
        </header>

        <Suspense fallback={<EventsSkeleton />}>
          {events === undefined ? (
            <EventsSkeleton />
          ) : events.length === 0 ? (
            <NoEvents />
          ) : (
            <div
              className='grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6'
              role='list'>
              {events.map((event: Event) => (
                <article
                  key={event._id}
                  className='w-full bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mb-6 lg:mb-0'
                  role='listitem'>
                  <h3 className='text-lg font-semibold mb-2'>{event.title}</h3>
                  <div className='space-y-2'>
                    {event.date && (
                      <p className='flex items-center gap-2 text-muted-foreground'>
                        <Calendar className='w-4 h-4' aria-hidden='true' />
                        <span>{event.date}</span>
                      </p>
                    )}
                    {event.location && (
                      <p className='flex items-center gap-2 text-muted-foreground'>
                        <MapPin className='w-4 h-4' aria-hidden='true' />
                        <span>{event.location}</span>
                      </p>
                    )}
                    {event.note && (
                      <div
                        className='bg-gray-100 dark:bg-gray-900 leading-5 text-sm italic px-3 py-2 mt-2 rounded-xl'
                        role='note'>
                        {event.note}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </Suspense>
      </div>
    </section>
  );
}
