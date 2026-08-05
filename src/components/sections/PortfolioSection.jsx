import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, MapPin, Eye, Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { SectionTitle, Button, OptimizedImage, StaggerContainer, StaggerItem } from '@/components/common';
import { cn } from '@/utils/helpers';

// Subtle 3D tilt that tracks the cursor - lightweight alternative to a WebGL scene
const TiltCard = ({ children, onMouseEnter, onMouseLeave }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onMouseLeave?.();
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full will-change-transform"
    >
      {children}
    </motion.div>
  );
};

const PortfolioSection = () => {
  const { getPortfolio } = useCMS();
  const portfolioItems = getPortfolio() || [];
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hoveredId, setHoveredId] = useState(null);

  // Get all items without category filter
  const displayItems = portfolioItems;

  // Gallery navigation functions
  const openLightbox = (item) => {
    setSelectedItem(item);
    setCurrentImageIndex(0);
  };

  const closeLightbox = useCallback(() => {
    setSelectedItem(null);
    setCurrentImageIndex(0);
  }, []);

  const nextImage = useCallback((e) => {
    e.stopPropagation();
    if (!selectedItem) return;
    const gallery = selectedItem.gallery && selectedItem.gallery.length > 0 
      ? selectedItem.gallery 
      : [selectedItem.image];
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  }, [selectedItem]);

  const prevImage = useCallback((e) => {
    e.stopPropagation();
    if (!selectedItem) return;
    const gallery = selectedItem.gallery && selectedItem.gallery.length > 0 
      ? selectedItem.gallery 
      : [selectedItem.image];
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  }, [selectedItem]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedItem) return;
      if (e.key === 'ArrowRight') nextImage(e);
      if (e.key === 'ArrowLeft') prevImage(e);
      if (e.key === 'Escape') closeLightbox();
    };

    if (selectedItem) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedItem, nextImage, prevImage, closeLightbox]);

  return (
    <section className="py-24 lg:py-32 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        {/* Section Header */}
        <SectionTitle
          subtitle="Featured Stories"
          decorativeText="Portfolio"
          title="Stories We've Kept"
          description="A curated collection of weddings, cultural celebrations, and brand moments remembered through film and frame."
        />

        {/* Portfolio Grid */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          staggerDelay={0.08}
        >
          <AnimatePresence mode="popLayout">
            {displayItems.map((item, index) => {
              const isLarge = index === 1 || index === 6;
              
              return (
                <StaggerItem
                  key={item.id}
                  className={cn(isLarge && 'md:row-span-2')}
                >
                  <TiltCard
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    {/* Image Container */}
                    <div
                      className={cn(
                        'relative overflow-hidden rounded-2xl cursor-pointer shadow-lg group-hover:shadow-2xl group-hover:shadow-primary-900/30 transition-shadow duration-500',
                        isLarge ? 'aspect-[3/5]' : 'aspect-[3/4]'
                      )}
                      onClick={() => openLightbox(item)}
                      style={{ transform: 'translateZ(20px)' }}
                    >
                      <OptimizedImage
                        src={item.image}
                        alt={item.names}
                        className="w-full h-full transition-transform duration-700 group-hover:scale-110"
                        containerClassName="w-full h-full"
                      />
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Quick Actions */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: hoveredId === item.id ? 1 : 0,
                          y: hoveredId === item.id ? 0 : 20
                        }}
                        className="absolute top-4 right-4 flex gap-2"
                      >
                        <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-primary-500 transition-all">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-primary-500 transition-all">
                          <Heart className="w-4 h-4" />
                        </button>
                      </motion.div>

                      {/* Content Overlay */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: hoveredId === item.id ? 1 : 0,
                          y: hoveredId === item.id ? 0 : 20
                        }}
                        className="absolute bottom-0 left-0 right-0 p-6 text-white"
                      >
                        <h3 className="font-serif text-xl mb-2">{item.names}</h3>
                        <div className="flex items-center text-sm text-white/70">
                          <MapPin className="w-4 h-4 mr-1" />
                          {item.location}
                        </div>
                      </motion.div>
                    </div>

                    {/* Info Below Image (visible on non-hover) */}
                    <div className="mt-4 text-center group-hover:opacity-0 transition-opacity">
                      <span className="font-serif italic text-2xl text-gray-200 block">
                        {item.location}
                      </span>
                      <h3 className="font-serif text-lg text-gray-900 -mt-2 relative z-10">
                        {item.names}
                      </h3>
                    </div>
                  </TiltCard>
                </StaggerItem>
              );
            })}
          </AnimatePresence>
        </StaggerContainer>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Button
            variant="secondary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
            onClick={() => window.location.href = '/gallery'}
          >
            See More Stories
          </Button>
        </motion.div>
      </div>

      {/* Lightbox Modal with Gallery Slider */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/50 transition-all hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Arrows */}
            {(() => {
              const gallery = selectedItem.gallery && selectedItem.gallery.length > 0 
                ? selectedItem.gallery 
                : [selectedItem.image];
              
              if (gallery.length > 1) {
                return (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/50 transition-all hover:scale-110"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/50 transition-all hover:scale-110"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                );
              }
              return null;
            })()}

            {/* Main Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Main Image Container - Full Bleed No Background */}
              <div className="relative w-full h-full max-w-7xl max-h-[85vh] flex items-center justify-center"
>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <OptimizedImage
                      src={
                        selectedItem.gallery && selectedItem.gallery.length > 0
                          ? selectedItem.gallery[currentImageIndex]
                          : selectedItem.image
                      }
                      alt={`${selectedItem.names} - Photo ${currentImageIndex + 1}`}
                      className="max-w-full max-h-full w-auto h-auto object-contain"
                      containerClassName="w-full h-full flex items-center justify-center"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Info & Thumbnails - Bottom Overlay with Gradient */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent text-center text-white">
                <h3 className="font-serif text-lg md:text-xl lg:text-2xl drop-shadow-lg">{selectedItem.names}</h3>
                <div className="flex items-center justify-center text-gray-300 mt-1 text-xs md:text-sm drop-shadow">
                  <MapPin className="w-3 h-3 mr-1" />
                  {selectedItem.location}
                </div>
                <p className="text-gray-300 mt-1 max-w-2xl mx-auto text-xs md:text-sm drop-shadow line-clamp-2">
                  {selectedItem.description}
                </p>

                {/* Thumbnail Navigation */}
                {(() => {
                  const gallery = selectedItem.gallery && selectedItem.gallery.length > 0 
                    ? selectedItem.gallery 
                    : [selectedItem.image];
                  
                  if (gallery.length > 1) {
                    return (
                      <div className="mt-3">
                        <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 max-w-full scrollbar-hide">
                          {gallery.map((img, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentImageIndex(idx)}
                              className={cn(
                                'w-10 h-10 md:w-12 md:h-12 rounded-md overflow-hidden flex-shrink-0 transition-all',
                                currentImageIndex === idx 
                                  ? 'ring-2 ring-white/80 scale-110' 
                                  : 'opacity-60 hover:opacity-100'
                              )}
                            >
                              <OptimizedImage
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                className="w-full h-full object-cover"
                                containerClassName="w-full h-full"
                              />
                            </button>
                          ))}
                        </div>
                        <p className="text-gray-300 text-xs mt-1 drop-shadow">
                          {currentImageIndex + 1} / {gallery.length}
                        </p>
                      </div>
                    );
                  }
                  return null;
                })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioSection;
