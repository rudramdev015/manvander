import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, X } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { OptimizedImage, Button } from '@/components/common';
import { cn } from '@/utils/helpers';
import { getVideoEmbedUrl } from '@/utils/video';

const HeroSection = () => {
  const { getHero } = useCMS();
  const heroContent = getHero();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // The video element only gets a src once this flips true, so the poster
  // image (already loaded via OptimizedImage's own priority path) is what
  // paints first - the multi-MB video never competes for bandwidth during
  // first paint. It then crossfades in once it's actually able to play.
  const [videoRequested, setVideoRequested] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [showreelOpen, setShowreelOpen] = useState(false);
  const videoRef = useRef(null);

  const heroImages = heroContent?.backgroundImages || [
    '/image/LUXIE_13.jpg',
    '/image/LUXIE_19.jpg',
    '/image/LUXIE_22.jpg',
  ];

  const backgroundVideo = heroContent?.backgroundVideo;
  const videoPoster = heroContent?.videoPoster || heroImages[0];
  const showreelEmbedUrl = getVideoEmbedUrl(heroContent?.showreelUrl);

  // Defer the video request to right after the hero has painted, instead
  // of requesting it in the same tick as everything else.
  useEffect(() => {
    if (!backgroundVideo?.mp4) return undefined;
    const id = requestAnimationFrame(() => setVideoRequested(true));
    return () => cancelAnimationFrame(id);
  }, [backgroundVideo?.mp4]);

  useEffect(() => {
    if (backgroundVideo?.mp4) return undefined; // video handles its own loop
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroImages.length, backgroundVideo?.mp4]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        {/* Poster / slideshow layer - always the first thing painted */}
        {backgroundVideo?.mp4 ? (
          <OptimizedImage
            src={videoPoster}
            alt="Cinematic wedding and event coverage"
            className="w-full h-full"
            containerClassName="w-full h-full"
            priority
          />
        ) : (
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
        )}

        {/* Video layer - src only attached after first paint, fades in
            once it can actually play so there's never a blank/loading gap */}
        {backgroundVideo?.mp4 && (
          <motion.video
            ref={videoRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: videoReady ? 1 : 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={videoPoster}
            onCanPlay={() => setVideoReady(true)}
          >
            {videoRequested && backgroundVideo.webm && (
              <source src={backgroundVideo.webm} type="video/webm" />
            )}
            {videoRequested && (
              <source src={backgroundVideo.mp4} type="video/mp4" />
            )}
          </motion.video>
        )}

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
              onClick={() => scrollToSection('trusted-by')}
            >
              {heroContent?.ctaSecondaryText || 'View Our Work'}
            </Button>
          </motion.div>

          {showreelEmbedUrl && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.05 }}
              onClick={() => setShowreelOpen(true)}
              className="group mt-10 inline-flex items-center gap-3 text-white/80 hover:text-white transition-colors mx-auto"
            >
              <span className="relative w-14 h-14 rounded-full border border-white/40 flex items-center justify-center group-hover:border-white group-hover:bg-white/10 transition-all">
                <span className="absolute inset-0 rounded-full bg-white/10 animate-pulse-slow" />
                <Play className="w-5 h-5 ml-0.5 fill-current" />
              </span>
              <span className="text-sm tracking-widest uppercase">Watch Our Showreel</span>
            </motion.button>
          )}
        </div>
      </div>

      {!backgroundVideo?.mp4 && (
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
      )}

      {/* Showreel lightbox */}
      <AnimatePresence>
        {showreelOpen && showreelEmbedUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setShowreelOpen(false)}
          >
            <button
              onClick={() => setShowreelOpen(false)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              aria-label="Close showreel"
            >
              <X className="w-5 h-5" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={showreelEmbedUrl}
                title="House of Echoes Showreel"
                className="w-full h-full rounded-xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
