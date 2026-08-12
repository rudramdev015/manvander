import React from 'react';
import { motion } from 'framer-motion';
import { useCMS } from '@/context/CMSContext';

/**
 * IntroSection - Editorial statement paragraph right under the hero,
 * set in the warm accent font so it reads distinctly from the rest of
 * the page (mirrors the intro-paragraph treatment on reelsandframes.in).
 */
const IntroSection = () => {
  const { getIntro } = useCMS();
  const intro = getIntro();

  if (!intro?.text) return null;

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container-custom">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="font-accent max-w-4xl mx-auto text-center text-lg md:text-xl lg:text-2xl leading-relaxed md:leading-relaxed tracking-wide text-dark-800"
          style={{ wordSpacing: '0.15em' }}
        >
          {intro.text}
        </motion.p>
      </div>
    </section>
  );
};

export default IntroSection;
