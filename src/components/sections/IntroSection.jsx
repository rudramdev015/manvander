import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '@/context/CMSContext';

/**
 * IntroSection - Editorial statement right under the hero, set in the warm
 * accent font so it reads distinctly from the rest of the page (mirrors the
 * intro-paragraph treatment on reelsandframes.in). Always exactly 3 fixed
 * lines so the rhythm holds at any screen size instead of reflowing as one
 * long paragraph.
 */
const IntroSection = () => {
  const { getIntro } = useCMS();
  const intro = getIntro();

  const lines = [intro?.line1, intro?.line2, intro?.line3].filter(Boolean);
  if (lines.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto text-center space-y-3 sm:space-y-4">
          {lines.map((line, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.4, 0, 0.2, 1] }}
              className="font-accent text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed tracking-wide text-dark-800"
              style={{ wordSpacing: '0.1em' }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
