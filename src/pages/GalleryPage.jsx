import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, X, ChevronLeft, ChevronRight, Grid, LayoutGrid } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { OptimizedImage } from '@/components/common';
import { cn } from '@/utils/helpers';

const GalleryPage = () => {
  const { getPortfolio, getSiteSettings } = useCMS();
  const portfolioItems = getPortfolio() || [];
  const settings = getSiteSettings();
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState('grid');

  // Collect all images from all portfolios
  const allGalleryImages = portfolioItems.flatMap(item => {
    const images = item.gallery && item.gallery.length > 0 
      ? item.gallery 
      : [item.image];
    return images.map(img => ({
      image: img,
      portfolio: item
    }));
  });

  const openLightbox = (item, imageIndex = 0) => {
    setSelectedItem(item);
    setCurrentImageIndex(imageIndex);
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <a href="/" className="font-serif text-2xl italic">
              {settings?.siteName || 'House of Echoes'}
            </a>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-2 rounded-lg transition-colors',
                  viewMode === 'grid' ? 'bg-white/20' : 'hover:bg-white/10'
                )}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={cn(
                  'p-2 rounded-lg transition-colors',
                  viewMode === 'masonry' ? 'bg-white/20' : 'hover:bg-white/10'
                )}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-700 to-primary-600 text-white py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary-200 text-sm uppercase tracking-[0.3em] mb-4 block"
          >
            Our Collection
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl lg:text-6xl mb-4"
          >
            Full Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 max-w-2xl mx-auto"
          >
            Explore our complete collection of beautiful wedding photography moments
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-primary-200"
          >
            {allGalleryImages.length} Photos • {portfolioItems.length} Stories
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          {/* Portfolio Stories */}
          {portfolioItems.map((item, portfolioIndex) => {
            const gallery = item.gallery && item.gallery.length > 0 
              ? item.gallery 
              : [item.image];
            
            return (
              <motion.div
                key={item.id || portfolioIndex}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: portfolioIndex * 0.1 }}
                className="mb-16 last:mb-0"
              >
                {/* Story Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-serif text-2xl lg:text-3xl text-gray-900">
                      {item.names}
                    </h2>
                    <div className="flex items-center text-gray-500 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                  <span className="text-sm text-primary-500 font-medium">
                    {gallery.length} Photos
                  </span>
                </div>

                {/* Story Description */}
                {item.description && (
                  <p className="text-gray-600 mb-6 max-w-3xl">
                    {item.description}
                  </p>
                )}

                {/* Gallery Grid */}
                <div className={cn(
                  viewMode === 'grid' 
                    ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
                    : 'columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4'
                )}>
                  {gallery.map((image, imageIndex) => (
                    <motion.div
                      key={imageIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: imageIndex * 0.05 }}
                      className={cn(
                        'group relative overflow-hidden rounded-xl cursor-pointer',
                        viewMode === 'grid' ? 'aspect-square' : 'break-inside-avoid'
                      )}
                      onClick={() => openLightbox(item, imageIndex)}
                    >
                      <OptimizedImage
                        src={image}
                        alt={`${item.names} - Photo ${imageIndex + 1}`}
                        className={cn(
                          'w-full h-full object-cover transition-transform duration-500 group-hover:scale-110',
                          viewMode === 'masonry' && 'aspect-auto'
                        )}
                        containerClassName="w-full h-full"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-sm font-medium bg-black/50 px-4 py-2 rounded-full">
                          View
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Divider */}
                {portfolioIndex < portfolioItems.length - 1 && (
                  <div className="mt-16 flex items-center justify-center">
                    <div className="h-px bg-gray-200 flex-1" />
                    <span className="px-4 text-gray-400 text-sm">✦</span>
                    <div className="h-px bg-gray-200 flex-1" />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 bg-primary-500 text-white px-8 py-4 rounded-full font-medium hover:bg-primary-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="font-serif text-xl italic mb-2">
            {settings?.siteName || 'House of Echoes'}
          </p>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>

      {/* Lightbox Modal with Gallery Slider */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
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
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
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
              className="relative max-w-6xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Main Image */}
              <div className="aspect-[4/3] lg:aspect-[16/10] rounded-2xl overflow-hidden bg-black">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                  >
                    <OptimizedImage
                      src={
                        selectedItem.gallery && selectedItem.gallery.length > 0
                          ? selectedItem.gallery[currentImageIndex]
                          : selectedItem.image
                      }
                      alt={`${selectedItem.names} - Photo ${currentImageIndex + 1}`}
                      className="w-full h-full object-contain"
                      containerClassName="w-full h-full"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Info & Thumbnails */}
              <div className="mt-6 text-center text-white">
                <h3 className="font-serif text-2xl lg:text-3xl">{selectedItem.names}</h3>
                <div className="flex items-center justify-center text-gray-400 mt-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  {selectedItem.location}
                </div>

                {/* Thumbnail Navigation */}
                {(() => {
                  const gallery = selectedItem.gallery && selectedItem.gallery.length > 0 
                    ? selectedItem.gallery 
                    : [selectedItem.image];
                  
                  if (gallery.length > 1) {
                    return (
                      <div className="mt-6">
                        <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
                          {gallery.map((img, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentImageIndex(idx)}
                              className={cn(
                                'w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all',
                                currentImageIndex === idx 
                                  ? 'ring-2 ring-primary-500 ring-offset-2 ring-offset-black' 
                                  : 'opacity-50 hover:opacity-100'
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
                        <p className="text-gray-500 text-sm mt-3">
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
    </div>
  );
};

export default GalleryPage;
