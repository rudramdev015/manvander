import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { cn } from '@/utils/helpers';

/**
 * FAQSection - flat, alternating-row accordion (same font + layout
 * treatment as the "FAQS" section on reelsandframes.in), with our own
 * question/answer content.
 */
const FAQSection = () => {
  const { getFAQs } = useCMS();
  const faqs = getFAQs();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-5xl md:text-7xl text-dark-900 text-center tracking-[0.15em] mb-16"
        >
          FAQs
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.id || index} className={cn(index % 2 === 0 ? 'bg-gray-200/60' : 'bg-white')}>
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <span className="flex-shrink-0 text-gray-700">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
