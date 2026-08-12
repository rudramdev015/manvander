import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin, Calendar, Tag, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { Header, Footer } from '@/components/layout';
import { OptimizedImage, Button } from '@/components/common';
import { formatDate } from '@/utils/helpers';

const PortfolioDetailPage = () => {
  const { id } = useParams();
  const { getPortfolio } = useCMS();
  const allStories = getPortfolio();
  const story = allStories.find((item) => item.id === id);

  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    if (story) {
      document.title = `${story.names} — ${story.location} | House of Echoes`;
    }
    return () => {
      document.title = 'House of Echoes | Cinematic Wedding Photography & Event Management, India';
    };
  }, [story]);

  const gallery = story?.gallery?.length > 0 ? story.gallery : (story ? [story.image] : []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const nextImage = useCallback(
    (e) => {
      e?.stopPropagation();
      setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % gallery.length));
    },
    [gallery.length]
  );
  const prevImage = useCallback(
    (e) => {
      e?.stopPropagation();
      setLightboxIndex((prev) => (prev === null ? 0 : (prev - 1 + gallery.length) % gallery.length));
    },
    [gallery.length]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, nextImage, prevImage, closeLightbox]);

  if (!story) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center text-center px-6 pt-32 pb-24">
          <div>
            <h1 className="font-serif text-3xl text-gray-900 mb-4">Story not found</h1>
            <p className="text-gray-500 mb-8">This story may have been moved or renamed.</p>
            <Link to="/#portfolio">
              <Button variant="primary" icon={ArrowLeft}>Back to Portfolio</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const otherStories = allStories.filter((item) => item.id !== story.id).slice(0, 3);
  const paragraphs = (story.story || story.description || '')
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative h-[85vh] min-h-[560px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src={story.image}
            alt={story.names}
            className="w-full h-full"
            containerClassName="w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/30 to-dark-900/10" />
        </div>

        <div className="relative z-10 container-custom pb-16 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary-500/90 text-white text-xs font-medium tracking-wider uppercase">
              <Tag className="w-3 h-3" />
              {story.category}
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs font-medium tracking-wider uppercase border border-white/20">
              <MapPin className="w-3 h-3" />
              {story.location}
            </span>
            {story.date && (
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs font-medium tracking-wider uppercase border border-white/20">
                <Calendar className="w-3 h-3" />
                {formatDate(story.date)}
              </span>
            )}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-serif italic text-5xl sm:text-6xl lg:text-8xl text-white leading-none"
          >
            {story.names}
          </motion.h1>
        </div>
      </section>

      {/* Narrative + meta */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <Link
            to="/#portfolio"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-500 transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2 space-y-6">
              {paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="text-gray-700 text-lg leading-relaxed"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:border-l lg:border-gray-100 lg:pl-10 space-y-6"
            >
              <div>
                <span className="text-xs uppercase tracking-widest text-gray-400 block mb-1">Location</span>
                <span className="text-gray-900 font-medium">{story.location}</span>
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-gray-400 block mb-1">Category</span>
                <span className="text-gray-900 font-medium">{story.category}</span>
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-gray-400 block mb-1">Photos in this story</span>
                <span className="text-gray-900 font-medium">{gallery.length}</span>
              </div>
              <a href="/#contact" className="block pt-2">
                <Button variant="primary" size="md" icon={ArrowRight} iconPosition="right" className="w-full">
                  Enquire About Your Story
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="container-custom">
            <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-10">
              The Full Story, In Frames
            </h2>
            <div className="columns-2 md:columns-3 gap-4 space-y-4">
              {gallery.map((image, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (index % 6) * 0.05 }}
                  onClick={() => setLightboxIndex(index)}
                  className="block w-full break-inside-avoid overflow-hidden rounded-xl group"
                >
                  <OptimizedImage
                    src={image}
                    alt={`${story.names} - photo ${index + 1}`}
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                    containerClassName="w-full"
                  />
                </motion.button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* More stories */}
      {otherStories.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="container-custom">
            <h2 className="font-serif text-2xl md:text-3xl text-gray-900 mb-10">More Stories</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherStories.map((item) => (
                <Link
                  key={item.id}
                  to={`/portfolio/${item.id}`}
                  className="group block"
                >
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden mb-4">
                    <OptimizedImage
                      src={item.image}
                      alt={item.names}
                      className="w-full h-full transition-transform duration-700 group-hover:scale-110"
                      containerClassName="w-full h-full"
                    />
                  </div>
                  <h3 className="font-serif text-xl text-gray-900 group-hover:text-primary-500 transition-colors">
                    {item.names}
                  </h3>
                  <span className="text-sm text-gray-500">{item.location}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            {gallery.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="max-w-6xl w-full max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <OptimizedImage
                src={gallery[lightboxIndex]}
                alt={`${story.names} - photo ${lightboxIndex + 1}`}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
                containerClassName="w-full h-full flex items-center justify-center"
              />
            </motion.div>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {lightboxIndex + 1} / {gallery.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioDetailPage;
