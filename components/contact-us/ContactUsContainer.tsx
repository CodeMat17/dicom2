"use client";

import { motion } from "framer-motion";
import { Clock, Mail, MapPin, Send } from "lucide-react";

// Contact information card component
function ContactCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className='bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8'
      role='region'
      aria-labelledby='office-info-heading'>
      <h2 id='office-info-heading' className='text-2xl font-bold mb-6'>
        Our Office
      </h2>

      <div className='space-y-6'>
        <div className='flex items-start gap-4'>
          <div className='flex-shrink-0 mt-1'>
            <MapPin
              className='w-5 h-5 text-primary'
              aria-hidden='true'
              role='img'
            />
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-1'>Address</h3>
            <address className='text-muted-foreground not-italic'>
              Godfrey Okoye University
              <br />
              Thinkers Corner, Enugu
              <br />
              Enugu State, Nigeria
            </address>
          </div>
        </div>

        <div className='flex items-start gap-4'>
          <div className='flex-shrink-0 mt-1'>
            <Mail
              className='w-5 h-5 text-primary'
              aria-hidden='true'
              role='img'
            />
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-1'>Email</h3>
            <p className='text-muted-foreground'>
              <a
                href='mailto:dicom@gouni.edu.ng'
                className='hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded'
                aria-label='Send email to DICOM'>
                dicom@gouni.edu.ng
              </a>
            </p>
          </div>
        </div>

        <div className='flex items-start gap-4'>
          <div className='flex-shrink-0 mt-1'>
            <Clock
              className='w-5 h-5 text-primary'
              aria-hidden='true'
              role='img'
            />
          </div>
          <div>
            <h3 className='text-lg font-semibold mb-1'>Office Hours</h3>
            <p className='text-muted-foreground'>
              <time>Monday - Friday: 8:00 AM - 4:00 PM</time>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Contact form component
function ContactForm() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className='flex flex-col justify-center items-center bg-white dark:bg-gray-800 rounded-xl p-8'
      role='region'
      aria-labelledby='contact-form-heading'>
      <Mail
        className='w-12 h-12 text-primary mb-4'
        aria-hidden='true'
        role='img'
      />
      <h3
        id='contact-form-heading'
        className='text-2xl font-bold mb-2 text-center'>
        Send us a message
      </h3>
      <p className='text-muted-foreground mb-6 text-center'>
        Have questions or feedback? We&apos;d love to hear from you.
      </p>
      <motion.a
        href='mailto:dicom@gouni.edu.ng?subject=Contact%20Form%20Inquiry'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className='inline-flex items-center gap-2 px-6 py-3 bg-primary text-white dark:text-gray-900 rounded-lg font-medium hover:bg-primary/90 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
        aria-label='Send us an email'>
        <Send className='w-5 h-5' aria-hidden='true' />
        Email Us
      </motion.a>
    </motion.div>
  );
}

export default function ContactUsContainer() {
  return (
    <main
      className='min-h-screen bg-gray-50 dark:bg-slate-900'
      aria-labelledby='contact-heading'>
      {/* Hero Section */}
      <section
        className='relative pt-20 pb-6 px-4 max-w-6xl mx-auto text-center'
        aria-labelledby='contact-heading'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <h1
            id='contact-heading'
            className='text-4xl md:text-5xl font-bold mb-3'>
            Contact Us
          </h1>
          <p
            className='text-xl text-muted-foreground max-w-3xl mx-auto'
            role='doc-subtitle'>
            Get in touch with the DICOM team. We&apos;re here to help and answer
            any questions.
          </p>
        </motion.div>
      </section>

      {/* Contact Information */}
      <section
        className='py-12 px-4 max-w-4xl mx-auto'
        aria-label='Contact information'>
        <div className='grid md:grid-cols-2 gap-12' role='presentation'>
          <ContactCard />
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
