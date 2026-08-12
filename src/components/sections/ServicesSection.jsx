import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '@/context/CMSContext';
import { SectionTitle } from '@/components/common';

/**
 * ServicesSection - editorial, numbered breakdown of what House of Echoes
 * offers. Each service gets a large index number, an intro line, grouped
 * tag pills of what's included, and a closing statement line.
 */
const ServicesSection = () => {
  const { getServices } = useCMS();
  const services = getServices();

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="container-custom relative">
        <SectionTitle
          subtitle="What We Offer"
          decorativeText="What We Do"
          title="Our Services"
        />

        <div className="max-w-5xl mx-auto divide-y divide-gray-100">
          {services.map((service, index) => (
            <motion.div
              key={service.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-[auto,1fr] gap-6 md:gap-12 py-12 first:pt-0 last:pb-0"
            >
              {/* Index */}
              <span className="font-serif text-6xl md:text-7xl text-primary-100 leading-none select-none">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div>
                <h3 className="font-serif text-2xl md:text-3xl text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6 max-w-2xl">
                  {service.intro}
                </p>

                {/* Tag Groups */}
                {(service.tagGroups || []).map((group, gi) => (
                  <div key={gi} className="flex flex-wrap gap-2 mb-3">
                    {group.map((tag, ti) => (
                      <span
                        key={ti}
                        className="px-4 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-gray-700 text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ))}

                {/* Closing statement */}
                {service.closing && (
                  <p className="mt-6 text-primary-600 italic leading-relaxed whitespace-pre-line">
                    {service.closing}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
