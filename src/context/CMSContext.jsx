import React, { createContext, useContext, useState, useEffect } from 'react';
import { applyThemeColors, DEFAULT_BRAND_COLOR } from '@/utils/colorTheme';
import { fetchAllSections, fetchItems, isApiConfigured } from '@/lib/api';

// Default data (fallback)
import * as mockData from '@/data/mock';

// Import content from JSON files
import heroContent from '../../content/hero/hero.json';
import introContent from '../../content/intro/intro.json';
import aboutContent from '../../content/about/about.json';
import journeyContent from '../../content/journey/journey.json';
import whyChooseUsContent from '../../content/why-choose-us/why-choose-us.json';
import contactContent from '../../content/contact/contact.json';
import settingsContent from '../../content/settings/general.json';
import socialContent from '../../content/settings/social.json';

// Import Portfolio from _data.json (single source of truth)
import portfolioDataFile from '../../content/portfolio/_data.json';

// Import Testimonials from _data.json
import testimonialsDataFile from '../../content/testimonials/_data.json';

// Import FAQs from _data.json
import faqDataFile from '../../content/faq/_data.json';

// Import Trusted By from _data.json
import trustedByDataFile from '../../content/trusted-by/_data.json';

// Import curated Instagram feed from _data.json
import instagramDataFile from '../../content/instagram/_data.json';

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
const galleryModules = import.meta.glob('../../content/gallery/*.json', { eager: true });

const notDataJson = ([path]) => !path.endsWith('/_data.json');
const servicesData = Object.entries(serviceModules).filter(notDataJson).map(([, m]) => m.default ?? m);
const pricingData = Object.entries(pricingModules).filter(notDataJson).map(([, m]) => m.default ?? m);
const partnersData = Object.entries(partnerModules).filter(notDataJson).map(([, m]) => m.default ?? m);
const galleryData = Object.entries(galleryModules).filter(notDataJson).map(([, m]) => m.default ?? m);

// Extract items from data files (support both array format and {items: []} format)
const portfolioData = Array.isArray(portfolioDataFile) 
  ? portfolioDataFile 
  : (portfolioDataFile?.items || []);
const testimonialsData = Array.isArray(testimonialsDataFile)
  ? testimonialsDataFile
  : (testimonialsDataFile?.items || []);
const faqData = Array.isArray(faqDataFile) ? faqDataFile : (faqDataFile?.items || []);
const instagramData = Array.isArray(instagramDataFile) ? instagramDataFile : (instagramDataFile?.items || []);

const CMSContext = createContext(null);

// Initialize content immediately to avoid null issues on first render
const initialContent = {
  hero: heroContent,
  intro: introContent,
  about: aboutContent,
  journey: journeyContent,
  whyChooseUs: whyChooseUsContent,
  contact: contactContent,
  settings: settingsContent,
  social: socialContent,
  services: servicesData || [],
  portfolio: portfolioData || [],
  testimonials: testimonialsData || [],
  pricing: pricingData || [],
  partners: partnersData || [],
  gallery: galleryData || [],
  faq: faqData || [],
  trustedBy: trustedByDataFile || { items: [] },
  instagram: instagramData || []
};

// Section keys and item collections served by the Node/Mongo backend.
// Kept separate from `initialContent`'s keys on purpose: `pricing` has no
// live backend collection (the section was removed from the site), so it
// stays on its static fallback only.
const SECTION_KEYS = ['settings', 'social', 'hero', 'intro', 'about', 'journey', 'whyChooseUs', 'contact', 'trustedBy'];
const ITEM_COLLECTIONS = ['services', 'portfolio', 'testimonials', 'partners', 'gallery', 'faq', 'trustedBy', 'instagram'];

export function CMSProvider({ children }) {
  const [content, setContent] = useState(initialContent);
  // True only while the very first live fetch is in flight - lets the
  // dashboard (or anything else) know a refresh is happening, without ever
  // blocking the initial render, which always uses the static content
  // baked into the build.
  const [loading, setLoading] = useState(isApiConfigured());

  // Apply CMS colors as CSS variables (drives every primary-* Tailwind class)
  useEffect(() => {
    applyThemeColors(content?.settings?.colors || {});
  }, [content?.settings?.colors]);

  // Fetches live data from the API and merges it into `content`. Used both
  // on mount (stale-while-revalidate) and on-demand by the dashboard right
  // after a save, so an editor sees their change reflected immediately.
  async function refreshContent() {
    if (!isApiConfigured()) return;

    const [sectionsResult, ...itemResults] = await Promise.allSettled([
      fetchAllSections(),
      ...ITEM_COLLECTIONS.map((collection) => fetchItems(collection)),
    ]);

    setContent((prev) => {
      const next = { ...prev };

      if (sectionsResult.status === 'fulfilled') {
        SECTION_KEYS.forEach((key) => {
          if (sectionsResult.value?.[key] !== undefined) {
            if (key === 'trustedBy') {
              next.trustedBy = { ...prev.trustedBy, ...sectionsResult.value.trustedBy };
            } else {
              next[key] = sectionsResult.value[key];
            }
          }
        });
      }

      ITEM_COLLECTIONS.forEach((collection, index) => {
        const result = itemResults[index];
        if (result?.status === 'fulfilled' && Array.isArray(result.value)) {
          if (collection === 'trustedBy') {
            next.trustedBy = { ...next.trustedBy, items: result.value };
          } else {
            next[collection] = result.value;
          }
        }
      });

      return next;
    });
  }

  // Stale-while-revalidate: the static content above renders immediately
  // (fast, and resilient if the API is down or cold-starting), then this
  // swaps in live data from the database once it arrives, so edits made in
  // the dashboard show up without a rebuild/redeploy.
  useEffect(() => {
    if (!isApiConfigured()) return;

    let cancelled = false;

    refreshContent()
      .catch((err) => {
        // Stay on the static fallback content - never let a down/cold-starting
        // API take the site down.
        console.warn('Live content fetch failed, using built-in content:', err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, []);

  // Provide CMS data with mock data as fallback
  const value = {
    loading,
    refreshContent,
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

    getIntro: () => content?.intro || { line1: '', line2: '', line3: '' },

    getAbout: () => content?.about || mockData.aboutContent,

    getJourney: () => content?.journey || { stats: [] },

    getWhyChooseUs: () => content?.whyChooseUs || { items: [] },

    getFAQs: () => content?.faq || mockData.faqItems || [],
    
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

    // Trusted By - real couples with photos, sorted by order
    getTrustedBy: () => {
      const trustedBy = content?.trustedBy || { title: 'Trusted By', items: [] };
      const items = [...(trustedBy.items || [])].sort((a, b) => (a.order || 0) - (b.order || 0));
      return { ...trustedBy, items };
    },
    
    // Pricing - sorted by order, always returns array
    getPricing: () => {
      const pricing = content?.pricing || mockData.pricingPlans || [];
      return [...pricing].sort((a, b) => (a.order || 0) - (b.order || 0));
    },
    
    // Gallery - photos & videos, sorted by order, always returns array
    getGallery: (featuredOnly = false) => {
      const gallery = [...(content?.gallery || [])].sort((a, b) => (a.order || 0) - (b.order || 0));
      return featuredOnly ? gallery.filter(item => item.featured) : gallery;
    },

    // Instagram feed - the exact photos to show in Follow Along, curated
    // separately from Portfolio/Trusted By so it's not automatically tied
    // to what's posted elsewhere on the site
    getInstagramFeed: () => {
      const items = [...(content?.instagram || [])].sort((a, b) => (a.order || 0) - (b.order || 0));
      return items;
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
