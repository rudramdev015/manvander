import React from 'react';
import { Check } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { SectionTitle, StaggerContainer, StaggerItem } from '@/components/common';

/**
 * WhyChooseUsSection - USP bullet grid
 */
const WhyChooseUsSection = () => {
  const { getWhyChooseUs } = useCMS();
  const whyChooseUs = getWhyChooseUs();
  const items = whyChooseUs?.items || [];

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="container-custom relative">
        <SectionTitle
          subtitle={whyChooseUs?.subtitle || 'Why Us'}
          decorativeText={whyChooseUs?.decorativeText || 'The Difference'}
          title={whyChooseUs?.title || 'Why House of Echoes'}
        />

        <StaggerContainer
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          staggerDelay={0.08}
        >
          {items.map((item, index) => (
            <StaggerItem key={index}>
              <div className="flex items-start gap-4 p-6 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-soft transition-all duration-300 h-full">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
