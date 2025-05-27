"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Lightbulb, Rocket, Shield, Trophy } from "lucide-react";
import { Suspense } from "react";

// Loading skeleton component for better UX
function StatementsSkeleton() {
  return (
    <div
      className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'
      role='status'
      aria-label='Loading statements'>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg animate-pulse'>
          <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4'></div>
          <div className='space-y-3'>
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded'></div>
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6'></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AboutUsContainer() {
  const statements = useQuery(api.statements.getStatements);

  const mission = statements?.find((s) => s.type === "mission");
  const vision = statements?.find((s) => s.type === "vision");
  const coreValues = statements?.find((s) => s.type === "core-values");

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-slate-700'>
      {/* Hero Section */}
      <section
        className='relative pt-20 px-4 max-w-6xl mx-auto'
        aria-labelledby='about-heading'>
        <div
          className='absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 to-transparent opacity-20'
          aria-hidden='true'
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='relative z-10 text-center'>
          <h1
            id='about-heading'
            className='text-5xl md:text-6xl font-bold mb-6 text-[#213675] dark:text-blue-500 font-poppins'>
            About DICOM
          </h1>
          <p className='text-xl max-w-3xl mx-auto mb-2'>
            We provide platforms that allow students to compete, learn, and
            foster an environment that challenges them to improve beyond their
            limits as they journey into spheres unknown.
          </p>
          <p className='text-lg text-muted-foreground italic max-w-2xl mx-auto'>
            &quot;Join us on this transformational journey, where competition
            sparks growth and excellence is a pursuit for the rest of
            life.&quot;
          </p>
        </motion.div>
      </section>

      {/* Mission, Vision, Values */}
      <section
        className='py-16 px-4 max-w-6xl mx-auto'
        aria-label='Mission, Vision, and Values'>
        <Suspense fallback={<StatementsSkeleton />}>
          {statements === undefined ? (
            <StatementsSkeleton />
          ) : statements.length === 0 ? (
            <div className='text-center py-20 italic' role='alert'>
              No statements found.
            </div>
          ) : (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {/* Mission */}
              {mission && (
                <motion.div
                  whileHover={{ y: -5 }}
                  className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg'
                  role='article'
                  aria-labelledby='mission-title'>
                  <div className='flex items-center gap-3 mb-4'>
                    <Rocket
                      className='w-8 h-8 text-primary'
                      aria-hidden='true'
                    />
                    <h2
                      id='mission-title'
                      className='text-2xl font-bold text-[#213675] dark:text-blue-500'>
                      {mission.title}
                    </h2>
                  </div>
                  <p className='text-muted-foreground'>{mission.content}</p>
                </motion.div>
              )}

              {/* Vision */}
              {vision && (
                <motion.div
                  whileHover={{ y: -5 }}
                  className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg'
                  role='article'
                  aria-labelledby='vision-title'>
                  <div className='flex items-center gap-3 mb-4'>
                    <Trophy
                      className='w-8 h-8 text-primary'
                      aria-hidden='true'
                    />
                    <h2
                      id='vision-title'
                      className='text-2xl font-bold text-[#213675] dark:text-blue-500'>
                      {vision.title}
                    </h2>
                  </div>
                  <p className='text-muted-foreground'>{vision.content}</p>
                </motion.div>
              )}

              {/* Core Values */}
              {coreValues && (
                <motion.div
                  whileHover={{ y: -5 }}
                  className='bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg'
                  role='article'
                  aria-labelledby='values-title'>
                  <div className='flex items-center gap-3 mb-4'>
                    <Lightbulb
                      className='w-8 h-8 text-primary'
                      aria-hidden='true'
                    />
                    <h2
                      id='values-title'
                      className='text-2xl font-bold text-[#213675] dark:text-blue-500'>
                      {coreValues.title}
                    </h2>
                  </div>
                  <ul className='space-y-3 text-muted-foreground' role='list'>
                    {coreValues.values?.map((value, i) => (
                      <li key={i} className='flex items-center gap-2'>
                        <Shield
                          className='w-4 h-4 text-primary'
                          aria-hidden='true'
                        />
                        {value}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          )}
        </Suspense>
      </section>

      {/* Call to Action */}
      <section
        className='py-20 px-4 bg-gradient-to-r from-blue-950 to-sky-900 text-white'
        aria-labelledby='cta-heading'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 id='cta-heading' className='text-3xl font-bold mb-6'>
            Ready to Join the Journey?
          </h2>
          <p className='text-xl mb-8'>
            Become part of a community that pushes boundaries and celebrates
            academic excellence.
          </p>
          <a
            href='mailto:dicom@gouni.edu.ng'
            className='inline-block px-8 py-3 bg-white dark:text-gray-900 text-primary rounded-full font-medium hover:bg-gray-100 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary'
            aria-label='Contact DICOM via email'>
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
}
