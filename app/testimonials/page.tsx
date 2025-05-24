"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function TestimonialsPage() {
const testimonials = useQuery(api.testimonials.getTestimonials)

  return (
    <div className='min-h-screen bg-purple-50 dark:bg-slate-950'>
      {/* Hero Section */}
      <section className='pt-20 pb-6 px-4 max-w-4xl mx-auto text-center'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6'>
            <Quote className='w-8 h-8 text-primary' />
          </div>
          <h1 className='text-4xl md:text-5xl font-bold mb-3'>
            Voices of Success
          </h1>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Hear from students, faculty, and alumni about their DICOM
            experiences
          </p>
        </motion.div>
      </section>

      {/* Testimonial Grid */}
      <section className='py-12 px-4 max-w-5xl mx-auto'>
        <h2 className='text-3xl font-bold text-center mb-12'>Testimonials</h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {testimonials === undefined ? (
            <div className='italic text-center animate-pulse'>
              Testimonials loading...
            </div>
          ) : testimonials.length === 0 ? (
            <div className='italic text-center animate-pulse'>
              No testimonials found.
            </div>
          ) : testimonials?.map((testimonial) => (
            <motion.div
              key={testimonial._id}
              whileHover={{ y: -5 }}
              className='bg-white dark:bg-gray-700 p-8 rounded-xl shadow-md flex flex-col h-full'>
              <Quote className='w-8 h-8 text-primary/70 mb-4' />
              <p className=' mb-6 flex-1'>&quot;{testimonial.body}&quot;</p>

              <div className="mt-auto">
                <h3 className='font-bold'>{testimonial.name}</h3>
                <p className='text-sm text-muted-foreground'>
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
