"use client";

import { Mail, MapPin,  Clock, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactUsPage() {
  return (
    <div className='min-h-screen bg-purple-50 dark:bg-slate-950'>
      {/* Hero Section */}
      <section className='relative pt-20 pb-6 px-4 max-w-6xl mx-auto text-center'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <h1 className='text-4xl md:text-5xl font-bold mb-3'>Contact Us</h1>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Get in touch with the DICOM team. We&apos;re here to help and answer
            any questions.
          </p>
        </motion.div>
      </section>

      {/* Contact Information */}
      <section className='py-12 px-4 max-w-4xl mx-auto'>
        <div className='grid md:grid-cols-2 gap-12'>
          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className='bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8'>
            <h2 className='text-2xl font-bold mb-6'>Our Office</h2>

            <div className='space-y-6'>
              <div className='flex items-start gap-4'>
                <div className='flex-shrink-0 mt-1'>
                  <MapPin className='w-5 h-5 text-primary' />
                </div>
                <div>
                  <h3 className='text-lg font-semibold mb-1'>Address</h3>
                  <p className='text-muted-foreground'>
                    Godfrey Okoye University
                    <br />
                    Thinkers Corner, Enugu
                    <br />
                    Enugu State, Nigeria
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='flex-shrink-0 mt-1'>
                  <Mail className='w-5 h-5 text-primary' />
                </div>
                <div>
                  <h3 className='text-lg font-semibold mb-1'>Email</h3>
                  <p className='text-muted-foreground'>dicom@gouni.edu.ng</p>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='flex-shrink-0 mt-1'>
                  <Clock className='w-5 h-5 text-primary' />
                </div>
                <div>
                  <h3 className='text-lg font-semibold mb-1'>Office Hours</h3>
                  <p className='text-muted-foreground'>
                    Monday - Friday: 8:00 AM - 4:00 PM
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='flex flex-col justify-center items-center bg-white dark:bg-gray-800 rounded-xl p-8'>
            <Mail className='w-12 h-12 text-primary mb-4' />
            <h3 className='text-2xl font-bold mb-2 text-center'>
              Send us a message
            </h3>
            <p className='text-muted-foreground mb-6 text-center'>
              Have questions or feedback? We&apos;d love to hear from you.
            </p>
            <motion.a
              href='mailto:dicom@gouni.edu.ng?subject=Contact%20Form%20Inquiry'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='inline-flex items-center gap-2 px-6 py-3 bg-primary text-white dark:text-gray-900 rounded-lg font-medium hover:bg-primary/90 transition-all shadow-sm'>
              <Send className='w-5 h-5' />
              Email Us
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
