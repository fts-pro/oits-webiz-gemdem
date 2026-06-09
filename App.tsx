import React, { useState, useEffect, Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AiAssistant } from './components/AiAssistant';
import { CookieConsent } from './components/CookieConsent';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import { PageTransition } from './components/PageTransition';
import { Breadcrumbs } from './components/ui/Breadcrumbs';
import { SEO } from './components/SEO';
import { COMPANY_NAME, TAGLINE } from './constants';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Scroll to top or hash on route change
const ScrollHandler = () => {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);
  
  return null;
};

function AppContent() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-blue-100 selection:text-blue-900 dark:selection:bg-blue-900 dark:selection:text-blue-100 transition-colors duration-300 relative">
      <SEO />
      <Header theme={theme} toggleTheme={toggleTheme} />
      <ScrollHandler />
      <div className="pt-24 lg:pt-32 transition-all duration-500 hover:bg-white/5 dark:hover:bg-white/[0.02] hover:backdrop-blur-xl hover:border-b hover:border-white/20 group cursor-default">
        <Breadcrumbs />
      </div>
      <main>
        <Suspense fallback={
          <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
            <Route path="/portfolio" element={<PageTransition><PortfolioPage /></PageTransition>} />
            <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
            <Route path="/careers" element={<PageTransition><CareersPage /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
          </Routes>
        </Suspense>
      </main>
      <Footer theme={theme} toggleTheme={toggleTheme} />
      <AiAssistant />
      <ScrollToTopButton />
      <CookieConsent />
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

export default App;