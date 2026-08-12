import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header, Footer } from '@/components/layout';
import {
  HeroSection,
  IntroSection,
  AboutSection,
  JourneySection,
  PortfolioSection,
  GallerySection,
  WhyChooseUsSection,
  PartnersSection,
  TestimonialsSection,
  FAQSection,
  ContactSection,
} from '@/components/sections';

const HomePage = () => {
  // Handle scroll to section on page load if hash exists
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <Header />
      
      <main>
        {/* Hero - Full viewport intro with video */}
        <section id="hero">
          <HeroSection />
        </section>

        {/* Intro - Editorial statement paragraph, accent font */}
        <IntroSection />

        {/* About - Who we are & services */}
        <section id="about">
          <AboutSection />
        </section>

        {/* Journey - Stats so far */}
        <JourneySection />

        {/* Portfolio - Gallery showcase */}
        <section id="portfolio">
          <PortfolioSection />
        </section>

        {/* Gallery - Mixed photos & videos */}
        <section id="gallery">
          <GallerySection />
        </section>

        {/* Why Choose Us - USPs */}
        <WhyChooseUsSection />

        {/* Partners - Trusted by */}
        <PartnersSection />

        {/* Testimonials - Social proof */}
        <section id="testimonials">
          <TestimonialsSection />
        </section>

        {/* FAQ */}
        <FAQSection />

        {/* Contact - Get in touch */}
        <section id="contact">
          <ContactSection />
        </section>
      </main>
      
      <Footer />
    </motion.div>
  );
};

export default HomePage;
