import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Video, Palette, Heart, ArrowRight } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { SectionTitle, Button, OptimizedImage, AnimatedSection, StaggerContainer, StaggerItem } from '@/components/common';
import { cn } from '@/utils/helpers';

const iconMap = {
  Camera: Camera,
  Video: Video,
  Brush: Palette,
  Heart: Heart,
};

const AboutSection = () => {
  const { getAbout, getServices } = useCMS();
  const aboutContent = getAbout();
  const services = getServices();

  // Default images if not from CMS
  const defaultImages = [
    '/image/LUXIE_11.jpg',
    '/image/LUXIE_12.jpg',
    '/image/LUXIE_29.jpg',
    '/image/LUXIE_30.jpg'
  ];
  const images = aboutContent?.images || defaultImages;

  // Get badge data from CMS or use defaults
  const badgeNumber = aboutContent?.badge?.number || aboutContent?.badgeNumber || '2026';
  const badgeLabel = aboutContent?.badge?.label || aboutContent?.badgeLabel || 'Since';
   
  // Get CTA data from CMS or use defaults
  const ctaText = aboutContent?.cta?.text || aboutContent?.ctaText || 'Enquire Now';
  const ctaLink = aboutContent?.cta?.link || aboutContent?.ctaLink || 'https://wa.me/919876543210?text=Hello%2C%20I%27d%20like%20to%20enquire%20about%20House%20of%20Echoes';

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -skew-x-12 transform origin-top-right" />
      
      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Content */}
          <div className="relative">
            <AnimatedSection animation="fadeInLeft" className="relative z-10">
              {/* Decorative Image Grid */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="space-y-4"
                >
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                    <OptimizedImage
                      src={images[0]}
                      alt="Wedding photography"
                      className="w-full h-full hover:scale-105 transition-transform duration-700"
                      containerClassName="w-full h-full"
                    />
                  </div>
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                    <OptimizedImage
                      src={images[1]}
                      alt="Couple portrait"
                      className="w-full h-full hover:scale-105 transition-transform duration-700"
                      containerClassName="w-full h-full"
                    />
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-4 pt-12"
                >
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                    <OptimizedImage
                      src={images[2]}
                      alt="Wedding moment"
                      className="w-full h-full hover:scale-105 transition-transform duration-700"
                      containerClassName="w-full h-full"
                    />
                  </div>
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                    <OptimizedImage
                      src={images[3]}
                      alt="Bridal portrait"
                      className="w-full h-full hover:scale-105 transition-transform duration-700"
                      containerClassName="w-full h-full"
                    />
                  </div>
                </motion.div>
              </div>

              {/* Experience Badge - Now from CMS */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-6 -right-6 lg:bottom-8 lg:-right-8 bg-primary-500 text-white rounded-2xl p-6 shadow-xl shadow-primary-500/30"
              >
                <div className="text-center">
                  <span className="block font-serif text-4xl lg:text-5xl font-bold">{badgeNumber}</span>
                  <span className="text-sm uppercase tracking-wider opacity-90">{badgeLabel}</span>
                </div>
              </motion.div>

              {/* Decorative Frame */}
              <div className="absolute -inset-4 border-2 border-primary-100 rounded-3xl -z-10" />
            </AnimatedSection>
          </div>

          {/* Right Content */}
          <div>
            <AnimatedSection animation="fadeInRight">
              <SectionTitle
                subtitle={aboutContent?.subtitle || 'About Us'}
                decorativeText={aboutContent?.decorativeText || 'Our Story'}
                title={aboutContent?.title || "Quiet Beginnings"}
                description={aboutContent?.description}
                alignment="left"
              />

              {/* Features */}
              <StaggerContainer className="space-y-4 mb-8" staggerDelay={0.1}>
                {(aboutContent?.features || []).map((feature, index) => (
                  <StaggerItem key={index}>
                    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-primary-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">{feature.title}</h4>
                        <p className="text-sm text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* Signature & CTA - Now from CMS */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-8 border-t border-gray-100">
                <div>
                  <span className="font-serif italic text-3xl text-gray-800 block mb-1">
                    {aboutContent?.signature || 'House of Echoes'}
                  </span>
                  <span className="text-sm text-gray-500">{aboutContent?.signatureRole || aboutContent?.experience || 'Lead Photographer'}</span>
                </div>
                <Button
                  variant="secondary"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => window.open(ctaLink, '_blank')}
                >
                  {ctaText}
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-32">
          <SectionTitle
            subtitle="Our Services"
            decorativeText="What We Do"
            title="End-to-End Event Management & Cinematic Coverage"
            description="From weddings and pre-wedding shoots to corporate events and cultural celebrations, we plan and capture your story across India."
          />

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.1}>
            {(services || []).map((service) => {
              const IconComponent = iconMap[service?.icon] || Camera;
              return (
                <StaggerItem key={service.id}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="group bg-white rounded-2xl p-6 shadow-soft hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center mb-5 group-hover:bg-primary-500 transition-colors duration-300">
                      <IconComponent className="w-7 h-7 text-primary-500 group-hover:text-white transition-colors duration-300" />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.description}</p>

                    {/* Features */}
                    {service.features && service.features.length > 0 && (
                      <ul className="space-y-2">
                        {service.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
