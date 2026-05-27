import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal, Sun, Moon, Home } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { COMPANY_NAME } from '../constants';
import { Tooltip } from './ui/Tooltip';
import { Button } from './ui/Button';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '/', aria: 'Navigate to home page', icon: Home },
  { label: 'Services', href: '/services', aria: 'View our software engineering services' },
  { label: 'Portfolio', href: '/portfolio', aria: 'Browse our past projects and case studies' },
  { label: 'About', href: '/about', aria: 'Learn about OITS Dhaka and our mission' },
  { label: 'Contact', href: '/contact', aria: 'Get in touch with our engineering team' },
];

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 15);
      });
    };
    
    // Check initial scroll offset immediately on mount or location shift
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Dynamic text color classes based on scroll state
  // When transparent (top): Always white text because it sits on dark Hero sections
  // When scrolled: Slate-900 in light mode, White in dark mode
  const textColorClass = isScrolled 
    ? 'text-slate-900 dark:text-white' 
    : 'text-white';

  const navLinkClass = (href: string) => {
    const isActive = location.pathname === href;
    
    if (isScrolled) {
      return isActive 
        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800' 
        : 'text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800';
    } else {
      // Transparent header styles
      return isActive 
        ? 'text-white bg-white/20 backdrop-blur-md' 
        : 'text-white/80 hover:text-white hover:bg-white/10';
    }
  };

  const logoBgClass = isScrolled 
    ? 'bg-slate-900 dark:bg-blue-600 text-white' 
    : 'bg-white text-slate-900'; // White logo box on dark hero for contrast

  const themeButtonClass = isScrolled
    ? 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
    : 'text-white hover:bg-white/20';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-out border-b ${
        isScrolled 
          ? 'bg-slate-50/80 dark:bg-slate-950/85 backdrop-blur-xl border-slate-200/40 dark:border-slate-800/40 py-3 shadow-lg shadow-slate-955/5' 
          : 'bg-transparent border-transparent py-6 md:py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2 group" 
          aria-label={`${COMPANY_NAME} home`}
        >
          <div className={`${logoBgClass} rounded-xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${isScrolled ? 'w-10 h-10' : 'w-11 h-11'}`}>
            <Terminal size={isScrolled ? 20 : 22} />
          </div>
          <span className={`font-black tracking-tighter transition-all duration-300 ${textColorClass} ${isScrolled ? 'text-xl' : 'text-2xl'}`}>
            {COMPANY_NAME}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {NAV_LINKS.map((item) => (
            <Tooltip key={item.label} content={item.label} position="bottom">
              <Link 
                to={item.href}
                aria-label={item.aria || `Navigate to ${item.label}`}
                onClick={handleLinkClick}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-305 hover:scale-105 active:scale-95 ${navLinkClass(item.href)} ${item.label === 'Home' ? 'hidden' : ''}`}
              >
                {item.icon ? <item.icon size={18} /> : item.label}
              </Link>
            </Tooltip>
          ))}
          
          <div className={`ml-4 pl-4 border-l flex items-center gap-4 ${isScrolled ? 'border-slate-200 dark:border-slate-700' : 'border-white/20'}`}>
             <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-full transition-all active:rotate-12 hover:scale-110 ${themeButtonClass}`}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
             >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <Link to="/contact" aria-label="Start a project with OITS Dhaka">
              <Button 
                variant="primary" 
                size="sm" 
                className={`transition-all duration-500 rounded-full font-black ${isScrolled ? 'px-6 py-2 bg-blue-600 hover:bg-blue-700' : 'scale-100 px-8 hover:bg-white hover:text-blue-900 bg-blue-600 text-white border-none'}`}
              >
                Let's Build
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            className={`w-11 h-11 flex items-center justify-center rounded-full transition-all focus-visible:ring-2 focus-visible:ring-blue-500 ${themeButtonClass}`}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button 
            className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all focus-visible:ring-2 focus-visible:ring-blue-500 ${isScrolled ? 'text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800' : 'text-white hover:bg-white/20'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            id="mobile-menu" 
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-0 right-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 md:hidden overflow-hidden shadow-2xl"
          >
            <div className="p-6">
              <nav className="flex flex-col gap-2" aria-label="Mobile Navigation Menu">
                {NAV_LINKS.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link 
                      to={item.href}
                      onClick={handleLinkClick}
                      aria-label={`Navigate to ${item.label}`}
                      className={`px-4 py-4 rounded-2xl text-lg font-bold flex items-center transition-all active:scale-[0.98] ${
                         location.pathname === item.href 
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-slate-900/80' 
                          : 'text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900/50'
                      }`}
                    >
                      {item.icon ? <item.icon size={22} /> : item.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.05 }}
                  className="mt-4"
                >
                  <Link to="/contact" onClick={handleLinkClick} aria-label="Start a project with OITS Dhaka">
                    <Button className="w-full py-6 text-lg rounded-2xl shadow-xl shadow-blue-500/20">
                      Start a Project
                    </Button>
                  </Link>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};