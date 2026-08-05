import React, { createContext, useContext, useState, useEffect } from 'react';
import { applyThemeColors, DEFAULT_BRAND_COLOR } from '@/utils/colorTheme';

// Default data (fallback)
import * as mockData from '@/data/mock';

// Import content from JSON files
import heroContent from '../../content/hero/hero.json';
import aboutContent from '../../content/about/about.json';
import contactContent from '../../content/contact/contact.json';
import settingsContent from '../../content/settings/general.json';
import socialContent from '../../content/settings/social.json';

// Import Portfolio from _data.json (single source of truth)
import portfolioDataFile from '../../content/portfolio/_data.json';

// Import Testimonials from _data.json
import testimonialsDataFile from '../../content/testimonials/_data.json';

// Services, Pricing and Partners are each one file per item (folder-based CMS
// collections). Glob-import every file in the folder instead of naming each
// one, so a new service/plan/partner added from the CMS admin shows up on
// the site with no code change required. _data.json is excluded - portfolio
// and testimonials use that filename for their single combined array, and a
// couple of these folders have an old, unrelated `_data.json` left over from
// an earlier content pass that would otherwise get read in as a bogus item.
const serviceModules = import.meta.glob('../../content/services/*.json', { eager: true });
const pricingModules = import.meta.glob('../../content/pricing/*.json', { eager: true });
const partnerModules = import.meta.glob('../../content/partners/*.json', { eager: true });

const notDataJson = ([path]) => !path.endsWith('/_data.json');
const servicesData = Object.entries(serviceModules).filter(notDataJson).map(([, m]) => m.default ?? m);
const pricingData = Object.entries(pricingModules).filter(notDataJson).map(([, m]) => m.default ?? m);
const partnersData = Object.entries(partnerModules).filter(notDataJson).map(([, m]) => m.default ?? m);

// Extract items from data files (support both array format and {items: []} format)
const portfolioData = Array.isArray(portfolioDataFile) 
  ? portfolioDataFile 
  : (portfolioDataFile?.items || []);
const testimonialsData = Array.isArray(testimonialsDataFile) 
  ? testimonialsDataFile 
  : (testimonialsDataFile?.items || []);

const CMSContext = createContext(null);

// Initialize content immediately to avoid null issues on first render
const initialContent = {
  hero: heroContent,
  about: aboutContent,
  contact: contactContent,
  settings: settingsContent,
  social: socialContent,
  services: servicesData || [],
  portfolio: portfolioData || [],
  testimonials: testimonialsData || [],
  pricing: pricingData || [],
  partners: partnersData || []
};

export function CMSProvider({ children }) {
  const [content, setContent] = useState(initialContent);
  const [loading, setLoading] = useState(false);

  // Apply CMS colors as CSS variables (drives every primary-* Tailwind class)
  useEffect(() => {
    applyThemeColors(content?.settings?.colors || {});
  }, [content?.settings?.colors]);

  // Provide CMS data with mock data as fallback
  const value = {
    loading,
    content,
    
    // Helper getters that return CMS data or mock data
    getSiteSettings: () => content?.settings || {
      siteName: 'House of Echoes',
      primaryColor: DEFAULT_BRAND_COLOR,
      fontHeading: 'Playfair Display',
      fontBody: 'Poppins'
    },

    // Get Brand Colors
    getColors: () => content?.settings?.colors || {
      primary: DEFAULT_BRAND_COLOR,
      gold: '#FFD700',
      forest: '#001b0e',
      dark: '#1a1a1a',
      white: '#ffffff'
    },
    
    // Social Media - centralized for all components
    getSocialMedia: () => content?.social || {
      instagram: '',
      facebook: '',
      youtube: '',
      tiktok: '',
      twitter: '',
      pinterest: '',
      whatsapp: '',
      telegram: '',
      linkedin: ''
    },
    
    getHero: () => content?.hero || mockData.heroContent,
    
    getAbout: () => content?.about || mockData.aboutContent,
    
    // Services - sorted by order, always returns array
    getServices: () => {
      const services = content?.services || mockData.services || [];
      return [...services].sort((a, b) => (a.order || 0) - (b.order || 0));
    },
    
    // Portfolio - with optional filter for featured, always returns array
    getPortfolio: (featuredOnly = false) => {
      const portfolio = content?.portfolio || mockData.portfolioItems || [];
      if (featuredOnly) {
        return portfolio.filter(item => item.featured);
      }
      return portfolio;
    },
    
    // Testimonials - always returns array
    getTestimonials: () => content?.testimonials || mockData.testimonials || [],
    
    // Partners - sorted by order, always returns array
    getPartners: () => {
      const partners = content?.partners || mockData.partners || [];
      return [...partners].sort((a, b) => (a.order || 0) - (b.order || 0));
    },
    
    // Pricing - sorted by order, always returns array
    getPricing: () => {
      const pricing = content?.pricing || mockData.pricingPlans || [];
      return [...pricing].sort((a, b) => (a.order || 0) - (b.order || 0));
    },
    
    getContact: () => content?.contact || mockData.contactInfo,
    
    getFooter: () => ({
      description: content?.contact?.description || mockData.contactInfo?.description,
      copyright: '© 2026 House of Echoes. All rights reserved.'
    }),
    
    getNavigation: () => mockData.navigationLinks
  };

  return (
    <CMSContext.Provider value={value}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}

export default CMSContext;
