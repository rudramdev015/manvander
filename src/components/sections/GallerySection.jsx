import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, X } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { SectionTitle, Button, OptimizedImage, StaggerContainer, StaggerItem } from '@/components/common';
import { getVideoEmbedUrl } from '@/utils/video';

const GallerySection = () => {
  const { getGallery } = useCMS();
  const galleryItems = getGallery();

  const [selectedItem, setSelectedItem] = useState(null);

  const closeLightbox = useCallback(() => setSelectedItem(null), []);

  useEffect(() => {
    const handleKeyDown = (e) => {
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
  }, [selectedItem, closeLightbox]);

  if (galleryItems.length === 0) return null;

  const embedUrl = selectedItem?.mediaType === 'Video' ? getVideoEmbedUrl(selectedItem.videoUrl) : null;

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="container-custom relative">
        <SectionTitle
          subtitle="Photos & Films"
          decorativeText="Gallery"
          title="Moments Worth Reliving"
          description="A mixed reel of photography and video from real weddings and shoots."
        />

        <StaggerContainer
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          staggerDelay={0.06}
        >
          {galleryItems.map((item, index) => {
            const isVideo = item.mediaType === 'Video';

            return (
              <StaggerItem key={item.id || `${item.title}-${index}`}>
                <div
                  className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-500"
                  onClick={() => setSelectedItem(item)}
                >
                  {item.image ? (
                    <OptimizedImage
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full transition-transform duration-700 group-hover:scale-110"
                      containerClassName="w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-900" />
                  )}

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

                  {isVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-5 h-5 text-primary-600 ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="text-white text-sm font-medium truncate">{item.title}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

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
            View Full Gallery
          </Button>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/50 transition-all hover:scale-110"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedItem.mediaType === 'Video' ? (
                embedUrl ? (
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
                    <iframe
                      src={embedUrl}
                      title={selectedItem.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="aspect-video w-full rounded-xl bg-gray-900 flex items-center justify-center text-white/70 text-sm px-6 text-center">
                    This video link couldn't be embedded. Add a valid YouTube or Vimeo URL in the admin panel.
                  </div>
                )
              ) : (
                <div className="max-h-[85vh] rounded-xl overflow-hidden flex items-center justify-center bg-black">
                  <OptimizedImage
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
                    containerClassName="w-full h-full flex items-center justify-center"
                  />
                </div>
              )}

              {selectedItem.title && (
                <p className="text-center text-white/80 mt-4 font-serif text-lg">
                  {selectedItem.title}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;
