import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header, Footer } from '@/components/layout';
import {
  HeroSection,
  IntroSection,
  AboutSection,
  ServicesSection,
  WhyChooseUsSection,
  TrustedBySection,
  WeddingStoriesSection,
  FAQSection,
  ContactSection,
  FollowAlongSection,
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

        {/* Intro - Editorial statement, 3 lines, accent font */}
        <IntroSection />

        {/* Trusted By - real couples, right after the intro */}
        <section id="trusted-by">
          <TrustedBySection />
        </section>

        {/* Wedding Stories - real weddings, each linking to its own story page */}
        <section id="portfolio">
          <WeddingStoriesSection />
        </section>

        {/* About - Who we are */}
        <section id="about">
          <AboutSection />
        </section>

        {/* Services - What we offer */}
        <section id="services">
          <ServicesSection />
        </section>

        {/* Why Choose Us - USPs */}
        <WhyChooseUsSection />

        {/* FAQ */}
        <FAQSection />

        {/* Contact - Get in touch */}
        <section id="contact">
          <ContactSection />
        </section>

        {/* Follow Along - Instagram CTA */}
        <FollowAlongSection />
      </main>

      <Footer />
    </motion.div>
  );
};

export default HomePage;
