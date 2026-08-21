import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { OptimizedImage } from '@/components/common';

/**
 * WeddingStoriesSection - editorial 2-column grid of real weddings pulled
 * from the CMS portfolio collection, each linking through to its own full
 * story page (/portfolio/:id). Title styling matches the tall condensed
 * font-display pattern already used by TrustedBy/FAQ.
 */
const WeddingStoriesSection = () => {
  const { getPortfolio } = useCMS();
  const stories = (getPortfolio() || []).slice(0, 6);

  if (stories.length === 0) return null;

  return (
    <section className="py-24 lg:py-32 bg-[#f7f6f4]">
      <div className="container-custom">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-5xl md:text-7xl text-dark-900 text-center tracking-[0.15em] mb-16"
        >
          Wedding Stories
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14">
          {stories.map((story, index) => (
            <motion.div
              key={story.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
            >
              <Link to={`/portfolio/${story.id}`} className="group block">
                <div className="aspect-[3/2] overflow-hidden mb-5">
                  <OptimizedImage
                    src={story.image}
                    alt={story.names}
                    className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                    containerClassName="w-full h-full"
                  />
                </div>
                <h3 className="text-sm font-semibold tracking-[0.15em] uppercase text-dark-900 mb-2 group-hover:text-primary-500 transition-colors">
                  {story.names}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {story.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-16"
        >
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-dark-900 text-white text-sm font-medium tracking-wide hover:bg-primary-500 transition-colors duration-300"
          >
            See More Stories
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WeddingStoriesSection;
