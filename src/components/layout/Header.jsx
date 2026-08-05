import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navigationLinks } from '@/data/mock';
import { useCMS } from '@/context/CMSContext';
import { useScrollPosition } from '@/hooks';
import { cn } from '@/utils/helpers';
import Button from '@/components/common/Button';

const Header = () => {
  const { getSiteSettings } = useCMS();
  const settings = getSiteSettings();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { isScrolled } = useScrollPosition();
  const location = useLocation();
  
  const isHomePage = location.pathname === '/';
  const headerBg = isScrolled || !isHomePage || mobileMenuOpen;

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationLinks.map(link => link.path.replace('#', ''));
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Smooth scroll to section
  const scrollToSection = useCallback((e, path) => {
    e.preventDefault();
    const sectionId = path.replace('#', '');
    const element = document.getElementById(sectionId);
    
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    
    setMobileMenuOpen(false);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          headerBg
            ? 'bg-white/95 backdrop-blur-md shadow-soft py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="relative z-10 flex items-center gap-3 group"
            >
              {(settings?.logoLight || settings?.logoDark) && (
                <img
                  src={headerBg
                    ? (settings.logoDark || settings.logoLight)
                    : (settings.logoLight || settings.logoDark)}
                  alt={settings.siteName || 'House of Echoes'}
                  style={{
                    height: `${headerBg
                      ? (settings.logoDarkHeight || 40)
                      : (settings.logoLightHeight || 40)}px`,
                    // The brand mark is a dark red ring - on the transparent
                    // header it sits over photos and can vanish into dark
                    // areas, so give it a soft white halo for contrast there.
                    filter: headerBg
                      ? 'none'
                      : 'drop-shadow(0 1px 2px rgba(0,0,0,.35)) drop-shadow(0 0 6px rgba(255,255,255,.85))',
                  }}
                  className="w-auto transition-all duration-300"
                />
              )}
              <motion.span
                className={cn(
                  'font-serif text-2xl md:text-3xl italic tracking-wide transition-colors duration-300',
                  headerBg ? 'text-dark-900' : 'text-white'
                )}
                whileHover={{ scale: 1.02 }}
              >
              House
              <span className="text-primary-500"> of Echoes</span>
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => scrollToSection(e, link.path)}
                  className={cn(
                    'flex items-center px-4 py-2 text-sm font-medium tracking-wider uppercase transition-all duration-300 rounded-md',
                    headerBg
                      ? activeSection === link.path.replace('#', '')
                        ? 'text-primary-500 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-500 hover:bg-gray-50'
                      : activeSection === link.path.replace('#', '')
                        ? 'text-white bg-white/20'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                  )}
                >
                  <span>{link.name}</span>
                </a>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:block">
              <Button
                variant={headerBg ? 'primary' : 'outline-white'}
                size="sm"
                onClick={(e) => scrollToSection(e, '#contact')}
              >
                Enquire Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative z-10 p-2 -mr-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <motion.div
                animate={mobileMenuOpen ? 'open' : 'closed'}
              >
                {mobileMenuOpen ? (
                  <X className={cn(
                    'w-6 h-6 transition-colors',
                    'text-dark-900'
                  )} />
                ) : (
                  <Menu className={cn(
                    'w-6 h-6 transition-colors',
                    headerBg ? 'text-dark-900' : 'text-white'
                  )} />
                )}
              </motion.div>
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <span className="flex items-center gap-2 font-serif text-2xl italic text-dark-900">
                    {(settings?.logoDark || settings?.logoLight) && (
                      <img
                        src={settings.logoDark || settings.logoLight}
                        alt={settings.siteName || 'House of Echoes'}
                        className="h-8 w-auto"
                      />
                    )}
                    House<span className="text-primary-500"> of Echoes</span>
                  </span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-6">
                  <div className="space-y-1 px-4">
                    {navigationLinks.map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 + 0.1 }}
                      >
                        <a
                          href={link.path}
                          onClick={(e) => scrollToSection(e, link.path)}
                          className={cn(
                            'block px-4 py-3 font-medium rounded-lg transition-colors',
                            activeSection === link.path.replace('#', '')
                              ? 'text-primary-500 bg-primary-50'
                              : 'text-gray-800 hover:bg-gray-50'
                          )}
                        >
                          {link.name}
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </nav>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={(e) => scrollToSection(e, '#contact')}
                  >
                    Enquire Now
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
