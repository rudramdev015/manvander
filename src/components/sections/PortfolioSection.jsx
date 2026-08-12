import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, MapPin, Eye, Heart } from 'lucide-react';
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

  const [hoveredId, setHoveredId] = useState(null);

  // Get all items without category filter
  const displayItems = portfolioItems;

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
          description="A curated collection of weddings, cultural celebrations, and brand moments remembered through film and frame. Click a story to read it in full."
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
                    <Link
                      to={`/portfolio/${item.id}`}
                      className={cn(
                        'relative block overflow-hidden rounded-2xl cursor-pointer shadow-lg group-hover:shadow-2xl group-hover:shadow-primary-900/30 transition-shadow duration-500',
                        isLarge ? 'aspect-[3/5]' : 'aspect-[3/4]'
                      )}
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
                        <span className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white group-hover:text-primary-500 transition-all">
                          <Eye className="w-4 h-4" />
                        </span>
                        <span className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all">
                          <Heart className="w-4 h-4" />
                        </span>
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
                    </Link>

                    {/* Info Below Image (visible on non-hover) */}
                    <Link to={`/portfolio/${item.id}`} className="block mt-4 text-center group-hover:opacity-0 transition-opacity">
                      <span className="font-serif italic text-2xl text-gray-200 block">
                        {item.location}
                      </span>
                      <h3 className="font-serif text-lg text-gray-900 -mt-2 relative z-10">
                        {item.names}
                      </h3>
                    </Link>
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
    </section>
  );
};

export default PortfolioSection;
