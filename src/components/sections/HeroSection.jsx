import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { OptimizedImage, Button } from '@/components/common';
import { cn } from '@/utils/helpers';

const HeroSection = () => {
  const { getHero } = useCMS();
  const heroContent = getHero();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = heroContent?.backgroundImages || [
    '/image/LUXIE_13.jpg',
    '/image/LUXIE_19.jpg',
    '/image/LUXIE_22.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <OptimizedImage
              src={heroImages[currentImageIndex]}
              alt="Cinematic wedding and event coverage"
              className="w-full h-full"
              containerClassName="w-full h-full"
              priority
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-dark-900/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-dark-900/40" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/10 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container-custom w-full h-screen flex flex-col justify-end pb-24 sm:pb-32">
        <div className="text-center max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/60 text-xs sm:text-sm tracking-[0.3em] uppercase mb-4"
          >
            {heroContent?.subtitle || "Every Echo Tells a Story."}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-serif italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary-400 leading-tight"
          >
            {heroContent?.title || "House of Echoes"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-6 text-base sm:text-lg text-white/80 max-w-3xl mx-auto leading-relaxed"
          >
            {heroContent?.description || "Pan-India event management and cinematic coverage for weddings, corporate events, and cultural celebrations."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => scrollToSection('contact')}
            >
              {heroContent?.ctaText || 'Enquire Now'}
            </Button>
            <Button
              variant="outline-white"
              size="lg"
              onClick={() => scrollToSection('portfolio')}
            >
              {heroContent?.ctaSecondaryText || 'View Our Work'}
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 hidden lg:flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-500',
              currentImageIndex === index
                ? 'w-6 bg-white/60'
                : 'bg-white/20 hover:bg-white/40'
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
