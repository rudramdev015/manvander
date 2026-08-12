import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CMSProvider } from '@/context/CMSContext';
import { DynamicFavicon, FloatingWhatsApp } from '@/components/common';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('@/pages/HomePage'));
const GalleryPage = lazy(() => import('@/pages/GalleryPage'));
const PortfolioDetailPage = lazy(() => import('@/pages/PortfolioDetailPage'));

// Loading component
const PageLoader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
    <div className="text-center">
      <div className="relative w-16 h-16 mx-auto mb-4">
        <div className="absolute inset-0 border-4 border-primary-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <span className="font-serif text-2xl italic text-gray-800">
        House<span className="text-primary-500"> of Echoes</span>
      </span>
      <p className="text-gray-400 text-sm mt-2">Loading...</p>
    </div>
  </div>
);

// Scroll to top on every route change (hash-only navigation on the
// homepage, e.g. #portfolio, is left alone - see the hash check below)
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

function App() {
  return (
    <CMSProvider>
      <DynamicFavicon />
      <FloatingWhatsApp />
      <BrowserRouter>
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/portfolio/:id" element={<PortfolioDetailPage />} />
              {/* Future routes can be added here */}
              {/* <Route path="/about" element={<AboutPage />} /> */}
              {/* <Route path="/portfolio" element={<PortfolioPage />} /> */}
              {/* <Route path="/services" element={<ServicesPage />} /> */}
              {/* <Route path="/pricing" element={<PricingPage />} /> */}
              {/* <Route path="/blog" element={<BlogPage />} /> */}
              {/* <Route path="/blog/:id" element={<BlogPostPage />} /> */}
              {/* <Route path="/contact" element={<ContactPage />} /> */}
              {/* <Route path="*" element={<NotFoundPage />} /> */}
            </Routes>
          </Suspense>
        </AnimatePresence>
      </BrowserRouter>
    </CMSProvider>
  );
}

export default App;
