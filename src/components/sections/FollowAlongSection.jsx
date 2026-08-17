import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { OptimizedImage } from '@/components/common';

/**
 * FollowAlongSection - Instagram follow CTA with a mosaic of real work,
 * sits right above the footer. The mosaic is its own curated photo list
 * (dashboard -> Instagram Feed), independent of Portfolio/Trusted By, so
 * it always matches what's actually posted on Instagram rather than
 * whatever happens to be in other sections.
 */
const FollowAlongSection = () => {
  const { getSocialMedia, getSiteSettings, getInstagramFeed } = useCMS();
  const social = getSocialMedia();
  const settings = getSiteSettings();

  const mosaicImages = getInstagramFeed().map((item) => item.image).filter(Boolean);
  const instagramUrl = social?.instagram || 'https://instagram.com/houseofechoes';
  const handle = instagramUrl.replace(/^https?:\/\/(www\.)?instagram\.com\//, '@').replace(/\/$/, '');

  return (
    <section className="py-24 lg:py-32 bg-dark-900 text-white relative overflow-hidden">
      <div className="container-custom relative text-center mb-12">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-primary-400 text-sm tracking-[0.2em] uppercase font-medium mb-4 block"
        >
          Follow Along
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl md:text-5xl mb-6"
        >
          More Stories, <span className="italic text-primary-400">In Real Time</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/60 max-w-xl mx-auto mb-8"
        >
          {settings?.siteName || 'House of Echoes'} on Instagram — behind the scenes, fresh weddings, and everything that doesn't make it to the website.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-dark-900 font-medium tracking-wide hover:bg-primary-500 hover:text-white transition-colors duration-300"
        >
          <Instagram className="w-5 h-5" />
          {handle}
          <ArrowUpRight className="w-4 h-4" />
        </motion.a>
      </div>

      {/* Mosaic strip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid grid-cols-3 sm:grid-cols-6 gap-1"
      >
        {mosaicImages.map((src, index) => (
          <a
            key={index}
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square overflow-hidden block"
          >
            <OptimizedImage
              src={src}
              alt="Recent work from House of Echoes"
              className="w-full h-full transition-transform duration-500 group-hover:scale-110"
              containerClassName="w-full h-full"
            />
            <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/50 transition-colors duration-300 flex items-center justify-center">
              <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </a>
        ))}
      </motion.div>
    </section>
  );
};

export default FollowAlongSection;
