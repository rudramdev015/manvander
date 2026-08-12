import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '@/context/CMSContext';
import { SectionTitle } from '@/components/common';

/**
 * JourneySection - "The Echoes So Far" stats bar
 */
const JourneySection = () => {
  const { getJourney } = useCMS();
  const journey = getJourney();
  const stats = journey?.stats || [];

  return (
    <section className="py-24 lg:py-32 bg-dark-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        <SectionTitle
          subtitle={journey?.subtitle || 'Our Journey'}
          decorativeText={journey?.decorativeText || 'The Numbers'}
          title={journey?.title || 'The Echoes So Far'}
          dark
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-400 mb-3">
                {stat.number}
              </div>
              <div className="text-white/70 text-sm md:text-base uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {journey?.supportingLine && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center text-white/50 italic mt-16 max-w-xl mx-auto"
          >
            {journey.supportingLine}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default JourneySection;
