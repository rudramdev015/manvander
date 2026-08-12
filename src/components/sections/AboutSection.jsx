import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, ClipboardList, Heart, Globe2, Sparkles } from 'lucide-react';
import { useCMS } from '@/context/CMSContext';
import { SectionTitle, Button, StaggerContainer, StaggerItem } from '@/components/common';

// Rotating icon set for the feature pillars - features come from the CMS as
// plain title/description text with no icon field, so we cycle through a
// small fixed set rather than depending on content editors picking one.
const featureIcons = [MapPin, ClipboardList, Heart, Globe2, Sparkles];

const AboutSection = () => {
  const { getAbout } = useCMS();
  const aboutContent = getAbout();

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
        <div className="max-w-4xl mx-auto text-center relative">
          {/* Oversized decorative quote mark */}
          <span
            aria-hidden="true"
            className="hidden md:block absolute -top-16 left-1/2 -translate-x-1/2 font-serif text-[12rem] leading-none text-primary-50 select-none pointer-events-none"
          >
            &ldquo;
          </span>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative inline-flex flex-col items-center justify-center w-24 h-24 rounded-full bg-primary-500 text-white shadow-xl shadow-primary-500/30 mb-8"
          >
            <span className="font-serif text-2xl font-bold leading-none">{badgeNumber}</span>
            <span className="text-[10px] uppercase tracking-wider opacity-90 mt-1">{badgeLabel}</span>
          </motion.div>

          <SectionTitle
            subtitle={aboutContent?.subtitle || 'About Us'}
            decorativeText={aboutContent?.decorativeText || 'Our Story'}
            title={aboutContent?.title || 'Quiet Beginnings'}
            description={aboutContent?.description}
            align="center"
            className="mb-0"
          />

          {/* Feature Pillars */}
          <StaggerContainer
            className="grid sm:grid-cols-3 gap-6 mt-4 mb-16 text-left"
            staggerDelay={0.1}
          >
            {(aboutContent?.features || []).map((feature, index) => {
              const FeatureIcon = featureIcons[index % featureIcons.length];
              return (
                <StaggerItem key={index}>
                  <div className="h-full p-6 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-soft transition-all duration-300">
                    <div className="w-11 h-11 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                      <FeatureIcon className="w-5 h-5 text-primary-500" />
                    </div>
                    <h4 className="font-medium text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Signature & CTA - Now from CMS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 pt-10 border-t border-gray-100">
            <div className="text-center sm:text-right">
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
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
