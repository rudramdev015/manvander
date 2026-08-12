import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '@/context/CMSContext';
import { SectionTitle } from '@/components/common';

const PartnersSection = () => {
  const { getPartners } = useCMS();
  const partners = getPartners() || [];
  
  const scrollRef = useRef(null);

  // Duplicate partners for infinite scroll effect (only if partners exist)
  const duplicatedPartners = partners.length > 0 ? [...partners, ...partners, ...partners] : [];

  return (
    <section className="py-20 lg:py-28 bg-gray-50 overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary-500 text-sm tracking-[0.2em] uppercase font-medium mb-4 block">
              Our Partners
            </span>
            <span className="font-serif italic text-4xl text-gray-200 block mb-2">
              Collaboration
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 -mt-4 relative z-10 mb-6">
              Trusted By
            </h2>
            <p className="text-gray-600 leading-relaxed">
              House of Echoes has been trusted by families across India for their most important celebrations, and by growing brands for their most important milestones.
            </p>
          </motion.div>

          {/* Partners Marquee */}
          <div className="lg:col-span-2 relative">
            {/* Gradient Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

            {/* Top Row - Left to Right */}
            <div className="overflow-hidden mb-6">
              <motion.div
                animate={{ x: [0, -50 * partners.length] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 30,
                    ease: "linear",
                  },
                }}
                className="flex gap-8"
              >
                {duplicatedPartners.map((partner, index) => (
                  <div
                    key={`top-${index}`}
                    className="flex-shrink-0 group"
                  >
                    <div className="px-8 py-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 grayscale hover:grayscale-0 opacity-60 hover:opacity-100">
                      <span className="font-serif italic text-2xl text-gray-700 whitespace-nowrap group-hover:text-primary-500 transition-colors">
                        {partner.name}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Bottom Row - Right to Left */}
            <div className="overflow-hidden">
              <motion.div
                animate={{ x: [-50 * partners.length, 0] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 25,
                    ease: "linear",
                  },
                }}
                className="flex gap-8"
              >
                {duplicatedPartners.map((partner, index) => (
                  <div
                    key={`bottom-${index}`}
                    className="flex-shrink-0 group"
                  >
                    <div className="px-8 py-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 grayscale hover:grayscale-0 opacity-60 hover:opacity-100">
                      <span className="font-serif italic text-2xl text-gray-700 whitespace-nowrap group-hover:text-primary-500 transition-colors">
                        {partner.name}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
