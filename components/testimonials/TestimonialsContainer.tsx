"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Suspense, useState } from "react";
import { TestimonialDialog } from "./TestimonialDialog";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  body: string;
}

// Loading skeleton for testimonials
function TestimonialsSkeleton() {
  return (
    <div
      className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'
      role='status'
      aria-label='Loading testimonials'
      aria-busy='true'>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className='bg-white dark:bg-gray-700 p-8 rounded-xl shadow-md animate-pulse h-64'>
          <div className='w-8 h-8 bg-primary/10 rounded-full mb-4' />
          <div className='space-y-3'>
            <div className='h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4' />
            <div className='h-4 bg-gray-200 dark:bg-gray-600 rounded w-full' />
            <div className='h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6' />
          </div>
          <div className='mt-6'>
            <div className='h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/3' />
            <div className='h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/4 mt-2' />
          </div>
        </div>
      ))}
    </div>
  );
}

// Empty state component
function NoTestimonials() {
  return (
    <div
      className='text-center py-12 bg-white dark:bg-gray-700 rounded-xl shadow-md'
      role='status'
      aria-label='No testimonials available'>
      <Quote
        className='w-12 h-12 text-primary/70 mx-auto mb-4'
        aria-hidden='true'
      />
      <p className='text-lg text-muted-foreground'>
        No testimonials available at the moment
      </p>
    </div>
  );
}

// Testimonial card component
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className='bg-white dark:bg-gray-700 p-8 rounded-xl shadow-md flex flex-col h-full'
        role='article'
        aria-label={`Testimonial from ${testimonial.name}`}>
        <Quote className='w-8 h-8 text-primary/70 mb-4' aria-hidden='true' />
        <div className='flex-1 flex flex-col'>
          <blockquote className='mb-4'>
            <p className='line-clamp-5'>{testimonial.body}</p>
          </blockquote>
          <Button
            variant='ghost'
            size='sm'
            className='self-start text-primary hover:text-primary/80 -mt-2 mb-4 pl-0 hover:bg-transparent'
            onClick={() => setIsDialogOpen(true)}>
            Read full testimonial →
          </Button>
        </div>
        <footer className='mt-auto border-t dark:border-gray-600 pt-4'>
          <cite className='not-italic'>
            <p className='font-bold'>{testimonial.name}</p>
            <p className='text-sm text-muted-foreground'>{testimonial.role}</p>
          </cite>
        </footer>
      </motion.div>

      <TestimonialDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        testimonial={testimonial}
      />
    </>
  );
}

export default function TestimonialsContainer() {
  const testimonials = useQuery(api.testimonials.getTestimonials);

  return (
    <main
      className='min-h-screen bg-gray-50 dark:bg-slate-900'
      aria-labelledby='testimonials-heading'>
      {/* Hero Section */}
      <section
        className='pt-20 pb-6 px-4 max-w-4xl mx-auto text-center'
        aria-labelledby='hero-heading'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <div
            className='inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6'
            aria-hidden='true'>
            <Quote className='w-8 h-8 text-primary' />
          </div>
          <h1
            id='testimonials-heading'
            className='text-4xl md:text-5xl font-bold mb-3'>
            Voices of Success
          </h1>
          <p
            className='text-xl text-muted-foreground max-w-3xl mx-auto'
            role='doc-subtitle'>
            Hear from students, alumni, sponsors and collaborators about their DICOM
            experiences
          </p>
        </motion.div>
      </section>

      {/* Testimonial Grid */}
      <section
        className='py-12 px-4 max-w-5xl mx-auto'
        aria-labelledby='testimonials-grid-heading'>
        <Suspense fallback={<TestimonialsSkeleton />}>
          {testimonials === undefined ? (
            <TestimonialsSkeleton />
          ) : testimonials.length === 0 ? (
            <NoTestimonials />
          ) : (
            <div
              className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'
              role='feed'
              aria-label='Testimonials grid'>
              {testimonials?.map((testimonial) => (
                <TestimonialCard
                  key={testimonial._id}
                  testimonial={testimonial}
                />
              ))}
            </div>
          )}
        </Suspense>
      </section>
    </main>
  );
}
