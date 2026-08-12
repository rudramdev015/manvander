import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { SectionTitle, StaggerContainer, StaggerItem } from '@/components/common';
import { cn } from '@/utils/helpers';

/**
 * FAQSection - Accordion of frequently asked questions
 */
const FAQSection = () => {
  const { getFAQs } = useCMS();
  const faqs = getFAQs();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 lg:py-32 bg-gray-50">
      <div className="container-custom">
        <SectionTitle
          subtitle="Questions"
          decorativeText="Good to Know"
          title="Frequently Asked Questions"
        />

        <StaggerContainer className="max-w-3xl mx-auto space-y-4" staggerDelay={0.08}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <StaggerItem key={faq.id || index}>
                <div
                  className={cn(
                    'rounded-2xl border transition-colors duration-300 overflow-hidden',
                    isOpen ? 'border-primary-200 bg-white shadow-soft' : 'border-gray-200 bg-white'
                  )}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                        isOpen ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'
                      )}
                    >
                      <Plus className="w-4 h-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default FAQSection;
