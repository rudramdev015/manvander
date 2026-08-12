import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '@/context/CMSContext';
import { OptimizedImage } from '@/components/common';

/**
 * TrustedBySection - couples who trusted us, styled after the tall
 * condensed statement-header + simple photo grid pattern.
 */
const TrustedBySection = () => {
  const { getTrustedBy } = useCMS();
  const trustedBy = getTrustedBy();
  const items = trustedBy?.items || [];

  if (items.length === 0) return null;

  return (
    <section className="py-24 lg:py-32 bg-gray-100">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-5xl md:text-7xl text-dark-900 text-center tracking-[0.15em] mb-16"
        >
          {trustedBy?.title || 'Trusted By'}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {items.map((item, index) => (
            <motion.div
              key={item.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-lg mb-4">
                <OptimizedImage
                  src={item.image}
                  alt={item.names}
                  className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                  containerClassName="w-full h-full"
                />
              </div>
              <p className="text-center font-display text-2xl tracking-[0.2em] text-dark-800">
                {item.names}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
