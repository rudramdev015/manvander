import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star, MapPin } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { SectionTitle, OptimizedImage } from '@/components/common';
import { useWindowSize } from '@/hooks';
import { cn } from '@/utils/helpers';

const TestimonialsSection = () => {
  const { getTestimonials } = useCMS();
  const testimonials = getTestimonials() || [];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const { isMobile } = useWindowSize();

  const nextSlide = useCallback(() => {
    if (testimonials.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    if (testimonials.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Auto-advance slides
  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [nextSlide, testimonials.length]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const currentTestimonial = testimonials[currentIndex] || {};

  // Don't render if no testimonials
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50" />
        
        {/* Decorative Quote */}
        <Quote className="absolute top-1/4 right-1/4 w-64 h-64 text-gray-100 rotate-12" />
      </div>

      <div className="container-custom relative">
        {/* Section Header */}
        <SectionTitle
          subtitle="Testimonials"
          decorativeText="In Their Words"
          title="What Clients Say"
          description="Hear from families, couples, and brands who trusted House of Echoes with their most meaningful moments."
        />

        {/* Testimonial Slider */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image Side */}
            <motion.div
              key={`image-${currentIndex}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                  >
                    <OptimizedImage
                      src={currentTestimonial.image}
                      alt={currentTestimonial.names}
                      className="w-full h-full"
                      containerClassName="w-full h-full"
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Decorative Frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary-200 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary-100 rounded-2xl -z-10" />

              {/* Location Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-lg"
              >
                <MapPin className="w-4 h-4 text-primary-500" />
                <span className="text-sm font-medium text-gray-700">{currentTestimonial.location}</span>
              </motion.div>
            </motion.div>

            {/* Content Side */}
            <div className="relative">
              {/* Quote Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/30">
                  <Quote className="w-8 h-8 text-white" />
                </div>
              </motion.div>

              {/* Testimonial Content */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(currentTestimonial?.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-xl lg:text-2xl text-gray-700 leading-relaxed mb-8 font-serif italic">
                    "{currentTestimonial.text}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full overflow-hidden ring-4 ring-primary-100">
                      <OptimizedImage
                        src={currentTestimonial.avatar}
                        alt={currentTestimonial.names}
                        className="w-full h-full"
                        containerClassName="w-full h-full"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-xl text-gray-900">
                        {currentTestimonial.names}
                      </h4>
                      <p className="text-primary-500 text-sm">{currentTestimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-10 pt-8 border-t border-gray-100">
                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setDirection(index > currentIndex ? 1 : -1);
                        setCurrentIndex(index);
                      }}
                      className={cn(
                        'transition-all duration-300 rounded-full',
                        index === currentIndex
                          ? 'w-8 h-2 bg-primary-500'
                          : 'w-2 h-2 bg-gray-300 hover:bg-primary-300'
                      )}
                    />
                  ))}
                </div>

                {/* Arrow Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={prevSlide}
                    className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary-500 hover:text-primary-500 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={nextSlide}
                    className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/30"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-gray-500 mb-4">Trusted by couples worldwide</p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="flex">
                {testimonials.slice(0, 4).map((t, i) => (
                  <div
                    key={i}
                    className={cn(
                      'w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-md',
                      i > 0 && '-ml-3'
                    )}
                  >
                    <OptimizedImage
                      src={t.avatar}
                      alt=""
                      className="w-full h-full"
                      containerClassName="w-full h-full"
                    />
                  </div>
                ))}
              </div>
              <span className="text-gray-600 text-sm">
                <strong>100+</strong> Events Covered
              </span>
            </div>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
              <span className="text-gray-600 text-sm">
                <strong>5.0</strong> Average Rating
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
