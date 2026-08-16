import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CMSProvider } from '@/context/CMSContext';
import { DynamicFavicon, FloatingWhatsApp } from '@/components/common';
import { AuthProvider } from '@/dashboard/context/AuthContext';
import ProtectedRoute from '@/dashboard/components/ProtectedRoute';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('@/pages/HomePage'));
const GalleryPage = lazy(() => import('@/pages/GalleryPage'));
const PortfolioDetailPage = lazy(() => import('@/pages/PortfolioDetailPage'));

// Dashboard is its own code-split chunk - never loaded for regular visitors
const LoginPage = lazy(() => import('@/dashboard/pages/LoginPage'));
const DashboardLayout = lazy(() => import('@/dashboard/components/DashboardLayout'));
const DashboardHome = lazy(() => import('@/dashboard/pages/DashboardHome'));
const SectionEditorPage = lazy(() => import('@/dashboard/pages/SectionEditorPage'));
const ItemsListPage = lazy(() => import('@/dashboard/pages/ItemsListPage'));

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

// Keeps the floating WhatsApp bubble off the admin dashboard - it has
// nothing to do with the public site there.
const SiteChrome = () => {
  const { pathname } = useLocation();
  if (pathname.startsWith('/dashboard')) return null;
  return <FloatingWhatsApp />;
};

function App() {
  return (
    <CMSProvider>
      <DynamicFavicon />
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <SiteChrome />
          <AnimatePresence mode="wait">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/portfolio/:id" element={<PortfolioDetailPage />} />

                <Route path="/dashboard/login" element={<LoginPage />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<DashboardHome />} />
                  <Route path="section/:key" element={<SectionEditorPage />} />
                  <Route path="items/:collection" element={<ItemsListPage />} />
                </Route>
              </Routes>
            </Suspense>
          </AnimatePresence>
        </BrowserRouter>
      </AuthProvider>
    </CMSProvider>
  );
}

export default App;
