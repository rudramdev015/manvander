import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '@/context/CMSContext';
import { SectionTitle, StaggerContainer, StaggerItem } from '@/components/common';

/**
 * ServicesSection - boxy 3-column card grid, one card per service, each
 * with its index, intro, grouped tag pills of what's included, and a
 * closing statement pinned to the bottom of the card.
 */
const ServicesSection = () => {
  const { getServices } = useCMS();
  const services = getServices();

  return (
    <section className="py-24 lg:py-32 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        <SectionTitle
          subtitle="What We Offer"
          title="Our Services"
          description="Five ways we can be part of your story, from planning the day to capturing every second of it."
        />

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          staggerDelay={0.1}
        >
          {services.map((service, index) => (
            <StaggerItem key={service.id || index}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group h-full flex flex-col bg-white rounded-3xl p-8 border border-gray-100 shadow-soft hover:shadow-2xl hover:shadow-primary-900/10 hover:border-primary-200 transition-all duration-300"
              >
                {/* Index badge */}
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-6 group-hover:bg-primary-500 transition-colors duration-300">
                  <span className="font-serif text-lg text-primary-500 group-hover:text-white transition-colors duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="font-serif text-2xl text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  {service.intro}
                </p>

                {/* Tag Groups */}
                <div className="mb-5">
                  {(service.tagGroups || []).map((group, gi) => (
                    <div key={gi} className="flex flex-wrap gap-1.5 mb-1.5 last:mb-0">
                      {group.map((tag, ti) => (
                        <span
                          key={ti}
                          className="px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-600 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Closing statement - pinned to the bottom of the card */}
                {service.closing && (
                  <p className="mt-auto pt-5 border-t border-gray-100 text-primary-600 italic text-sm leading-relaxed whitespace-pre-line">
                    {service.closing}
                  </p>
                )}
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default ServicesSection;
