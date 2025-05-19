"use client";

import { Handshake, Users, Rocket, Award, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function PartnershipPage() {
  return (
    <div className='min-h-screen bg-purple-50 dark:bg-slate-950'>
      {/* Hero Section */}
      <section className='relative pt-12 pb-20 px-4 max-w-5xl mx-auto text-center'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6'>
            <Handshake className='w-8 h-8' />
          </div>
          <h1 className='text-4xl md:text-5xl font-bold mb-3'>
            Strategic Partnerships
          </h1>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto'>
            Building bridges for academic excellence and innovation through
            collaboration
          </p>
        </motion.div>
      </section>

      {/* Partnership Benefits */}
      <section className='pb-16 px-4 max-w-5xl mx-auto'>
        <div className='grid md:grid-cols-2 gap-12'>
          <div>
            <h2 className='text-3xl font-bold mb-6'>Why Partner With Us?</h2>
            <p className='text-lg text-muted-foreground mb-8'>
              DICOM thrives on meaningful collaborations that create
              opportunities for students, faculty, and the broader academic
              community. Together, we can achieve more.
            </p>

            <div className='space-y-6'>
              <div className='flex items-start gap-4'>
                <div className='flex-shrink-0 mt-1'>
                  <Users className='w-6 h-6 text-primary' />
                </div>
                <div>
                  <h3 className='text-xl font-semibold mb-2'>Expanded Reach</h3>
                  <p className='text-muted-foreground'>
                    Access our network of talented students and academic
                    professionals
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='flex-shrink-0 mt-1'>
                  <Rocket className='w-6 h-6 text-primary' />
                </div>
                <div>
                  <h3 className='text-xl font-semibold mb-2'>
                    Innovation Boost
                  </h3>
                  <p className='text-muted-foreground'>
                    Collaborate on cutting-edge projects and research
                    initiatives
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-4'>
                <div className='flex-shrink-0 mt-1'>
                  <Award className='w-6 h-6 text-primary' />
                </div>
                <div>
                  <h3 className='text-xl font-semibold mb-2'>Recognition</h3>
                  <p className='text-muted-foreground'>
                    Gain visibility through our platforms and events
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8'>
            <h3 className='text-2xl font-bold mb-4'>
              Partnership Opportunities
            </h3>
            <p className='text-muted-foreground mb-6'>
              We welcome collaborations with departments, faculties, and
              external organizations that share our commitment to academic
              excellence and student development.
            </p>

            <div className='space-y-4'>
              <div className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
                <h4 className='font-semibold mb-1'>Academic Departments</h4>
                <p className='text-sm text-muted-foreground'>
                  Co-create specialized competitions and learning programs
                </p>
              </div>

              <div className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
                <h4 className='font-semibold mb-1'>Corporate Partners</h4>
                <p className='text-sm text-muted-foreground'>
                  Sponsor events, provide industry expertise, and discover
                  talent
                </p>
              </div>

              <div className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'>
                <h4 className='font-semibold mb-1'>Research Institutions</h4>
                <p className='text-sm text-muted-foreground'>
                  Joint research initiatives and knowledge exchange
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 px-4 bg-gradient-to-r from-blue-950 to-sky-900 text-white'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-6'>Ready to Collaborate?</h2>
          <p className='text-xl mb-8 max-w-2xl mx-auto'>
            Let&apos;s discuss how we can work together to create impactful academic
            experiences
          </p>
          <motion.a
            href='mailto:partnerships@dicom.edu?subject=Partnership Inquiry'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='inline-flex items-center gap-2 px-8 py-3 bg-white text-slate-900 rounded-full font-medium hover:bg-gray-100 transition-all shadow-lg'>
            <Mail className='w-5 h-5' />
            Contact Our Partnership Team
          </motion.a>
        </div>
      </section>
    </div>
  );
}
