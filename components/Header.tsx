import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal, Sun, Moon, Home, Layers, BookOpen, Mail, User, Search } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { COMPANY_NAME, SERVICES, PROJECTS } from '../constants';
import { Tooltip } from './ui/Tooltip';
import { Button } from './ui/Button';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '/', aria: 'Navigate to home page', icon: Home },
  { 
    label: 'Services', 
    href: '/services', 
    aria: 'View our software engineering services', 
    icon: Layers,
    subLinks: [
      { label: 'Custom Software', href: '/services#custom-software' },
      { label: 'Cloud Solutions', href: '/services#cloud-solutions' },
      { label: 'UI/UX Design', href: '/services#ui-ux-design' },
      { label: 'Product Strategy', href: '/services#product-strategy' }
    ]
  },
  { label: 'Portfolio', href: '/portfolio', aria: 'Browse our past projects and case studies', icon: Terminal },
  { label: 'About', href: '/about', aria: 'Learn about OITS Dhaka and our mission', icon: BookOpen },
  { label: 'Contact', href: '/contact', aria: 'Get in touch with our engineering team', icon: Mail },
];

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load logo from localStorage if exists
    const savedLogo = localStorage.getItem('company_logo');
    if (savedLogo) setLogoUrl(savedLogo);
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setLogoUrl(base64String);
        localStorage.setItem('company_logo', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 15);
      });
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleLinkClick = (label: string) => {
    setActiveIcon(label);
    setIsMobileMenuOpen(false);
    setTimeout(() => setActiveIcon(null), 1000);
  };

  const filteredServices = SERVICES.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProjects = PROJECTS.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const textColorClass = isScrolled || location.pathname !== '/'
    ? 'text-white' 
    : 'text-slate-900 dark:text-white';

  const navLinkClass = (href: string) => {
    const isActive = location.pathname === href;
    
    if (isScrolled || location.pathname !== '/') {
      return isActive 
        ? 'text-blue-400 border-blue-400/40 bg-blue-400/5 shadow-[0_0_15px_rgba(96,165,250,0.1)]' 
        : 'text-white/70 border-white/10 hover:text-white hover:border-white/30 hover:bg-white/5';
    } else {
      return isActive 
        ? 'text-blue-600 dark:text-blue-400 border-blue-600/20 dark:border-blue-400/30 bg-blue-50/50 dark:bg-blue-900/10 shadow-sm' 
        : 'text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50/50 dark:hover:bg-white/5';
    }
  };

  const logoBgClass = isScrolled || location.pathname !== '/'
    ? 'bg-blue-600 text-white' 
    : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900';

  const themeButtonClass = isScrolled || location.pathname !== '/'
    ? 'text-white/70 hover:bg-white/10'
    : 'text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-out border-b font-normal ${
        isScrolled || location.pathname !== '/'
          ? 'bg-black/90 backdrop-blur-2xl border-slate-800/50 py-3 shadow-xl' 
          : 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl border-slate-100/50 dark:border-slate-900/50 py-6 md:py-8 shadow-[0_2px_40px_rgba(0,0,0,0.02)]'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="flex items-center gap-2 group" 
            aria-label={`${COMPANY_NAME} home`}
            onClick={() => handleLinkClick('HomeLogo')}
          >
            <div className={`rounded-xl flex items-center justify-center shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${isScrolled || location.pathname !== '/' ? 'w-9 h-9 bg-blue-600 shadow-blue-500/20' : 'w-10 h-10 bg-slate-900 shadow-slate-200/50'} text-white`}>
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="w-full h-full object-cover rounded-xl" />
              ) : (
                <Terminal size={isScrolled ? 18 : 20} />
              )}
            </div>
            <span className={`font-medium tracking-tight transition-all duration-300 ${isScrolled || location.pathname !== '/' ? 'text-white' : 'text-slate-900 dark:text-white'} ${isScrolled ? 'text-lg' : 'text-xl'}`}>
              {COMPANY_NAME}
            </span>
          </Link>

          {/* Admin Logo Upload Toggle */}
          <button 
            onClick={() => fileInputRef.current?.click()}
            className={`text-[8px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity p-1 border rounded hidden lg:block ${isScrolled ? 'text-blue-400 border-blue-400/30' : 'text-white/50 border-white/20'}`}
            title="Upload Custom Logo"
          >
            Edit Logo
          </button>
          <input 
            ref={fileInputRef}
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={handleLogoUpload}
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
          {NAV_LINKS.map((item) => (
            <Tooltip key={item.label} content={item.aria} position="bottom">
              <div 
                className="relative group"
                onMouseEnter={() => setActiveSubMenu(item.label)}
                onMouseLeave={() => setActiveSubMenu(null)}
              >
                <Link 
                  to={item.href}
                  aria-label={item.aria || `Navigate to ${item.label}`}
                  onClick={() => handleLinkClick(item.label)}
                  className={`relative ${['Home', 'Contact'].includes(item.label) ? 'px-3' : 'px-4'} py-2 rounded-2xl text-[9px] font-mono font-black uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-3 group-hover:scale-105 active:scale-95 border ${navLinkClass(item.href)}`}
                >
                  <div className={`transition-all duration-500 ${activeIcon === item.label ? 'scale-110' : ''}`}>
                    {item.icon && <item.icon size={15} />}
                  </div>
                  {!['Home', 'Contact'].includes(item.label) && <span>{item.label}</span>}
                </Link>

                {/* Advanced Sub-menu */}
                {item.subLinks && (
                  <AnimatePresence>
                    {activeSubMenu === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-56 z-50"
                      >
                        <div className="glass-panel-container bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-2 shadow-2xl">
                          {item.subLinks.map((sub) => (
                            <Link
                              key={sub.label}
                              to={sub.href}
                              className="block px-4 py-3 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all uppercase tracking-widest"
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            </Tooltip>
          ))}
          
          <div className={`ml-4 pl-4 border-l flex items-center gap-2 ${isScrolled ? 'border-slate-200 dark:border-slate-700' : 'border-white/20'}`}>
             <button
               onClick={() => setIsSearchOpen(true)}
               className={`p-2.5 rounded-full transition-all hover:scale-110 ${themeButtonClass}`}
               aria-label="Search services and portfolio"
             >
               <Search size={20} />
             </button>
             <button
               onClick={toggleTheme}
               className={`p-2.5 rounded-full transition-all active:rotate-12 hover:scale-110 ${themeButtonClass}`}
               aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
             >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <button
               className={`p-2.5 rounded-full transition-all hover:scale-110 ${themeButtonClass}`}
               aria-label="User account"
             >
               <User size={20} />
             </button>
             <Link to="/contact" aria-label="Start a project with OITS Dhaka">
              <Button 
                variant="primary" 
                size="sm" 
                className={`transition-all duration-500 rounded-full font-black ml-2 ${isScrolled ? 'px-6 py-2 bg-blue-600 hover:bg-blue-700' : 'px-8 bg-blue-600 text-white'}`}
              >
                Let's Build
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setIsSearchOpen(true)}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${themeButtonClass}`}
          >
            <Search size={20} />
          </button>
          <button
            onClick={toggleTheme}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${themeButtonClass}`}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all ${isScrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Global Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-slate-950/60 backdrop-blur-2xl flex items-start justify-center pt-20 px-4"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: -20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: -20, opacity: 0 }}
              className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50 glass-panel shadow-[0_0_80px_rgba(37,99,235,0.15)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center gap-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Search size={24} />
                </div>
                <input 
                  ref={searchInputRef}
                  type="text" 
                  placeholder="What can we build for you?"
                  className="w-full bg-transparent border-none focus:ring-0 text-2xl font-black text-slate-900 dark:text-white placeholder-slate-400 font-sans tracking-tight"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all hover:rotate-90"
                >
                  <X size={24} className="text-slate-400" />
                </button>
              </div>
              <div className="max-h-[70vh] overflow-y-auto p-8 custom-scrollbar">
                {!searchQuery ? (
                  <div className="py-12 text-center">
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-8">Trending Searches</p>
                    <div className="flex flex-wrap justify-center gap-3">
                      {['Custom Software', 'Three.js Portfolio', 'Cloud Architecture', 'UI/UX Design'].map(term => (
                        <button 
                          key={term}
                          onClick={() => setSearchQuery(term)}
                          className="px-6 py-3 rounded-full bg-slate-50 dark:bg-slate-800/50 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-10">
                    {filteredServices.length > 0 && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                        <h4 className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-6">Service Autocomplete</h4>
                        <div className="grid gap-4">
                          {filteredServices.map(s => (
                            <Link 
                              key={s.id} 
                              to={`/services?id=${s.id}`} 
                              onClick={() => setIsSearchOpen(false)}
                              className="p-5 rounded-3xl bg-slate-50/50 dark:bg-slate-800/30 hover:bg-blue-600 group transition-all duration-300 flex items-center justify-between border border-transparent hover:border-blue-400/30"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-slate-900 dark:text-white group-hover:scale-110 transition-transform">
                                  <Layers size={18} />
                                </div>
                                <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-white text-lg">{s.title}</span>
                              </div>
                              <Terminal size={16} className="text-slate-400 group-hover:text-white/80" />
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    {filteredProjects.length > 0 && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <h4 className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-6">Portfolio Insights</h4>
                        <div className="grid gap-4">
                          {filteredProjects.map(p => (
                            <Link 
                              key={p.id} 
                              to="/portfolio" 
                              onClick={() => setIsSearchOpen(false)}
                              className="p-5 rounded-3xl bg-slate-50/50 dark:bg-slate-800/30 hover:bg-blue-600 group transition-all duration-300 flex items-center justify-between border border-transparent hover:border-blue-400/30"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center text-slate-900 dark:text-white group-hover:scale-110 transition-transform">
                                  <Terminal size={18} />
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-white text-lg">{p.title}</span>
                                  <span className="text-xs text-slate-500 group-hover:text-white/60 font-mono">{p.category}</span>
                                </div>
                              </div>
                              <Terminal size={16} className="text-slate-400 group-hover:text-white/80" />
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                    {filteredServices.length === 0 && filteredProjects.length === 0 && (
                      <div className="text-center py-20">
                        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                           <Search size={32} className="text-slate-300" />
                        </div>
                        <p className="text-slate-500 font-bold">No exact matches for "{searchQuery}"</p>
                        <p className="text-sm text-slate-400 mt-2">Try searching for 'Software', 'Cloud', or 'React'</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[150] bg-slate-950/40 backdrop-blur-md md:hidden"
            />
            {/* Slide-over Drawer */}
            <motion.div 
              id="mobile-menu" 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-slate-950 z-[160] shadow-2xl border-l border-slate-200/50 dark:border-slate-800/50 md:hidden overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="font-black tracking-tighter text-slate-900 dark:text-white uppercase text-xl">Menu</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8">
                <nav className="flex flex-col gap-3" aria-label="Mobile Navigation Menu">
                  {NAV_LINKS.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link 
                        to={item.href}
                        onClick={() => handleLinkClick(item.label)}
                        className={`p-5 rounded-3xl text-xl font-bold flex items-center gap-5 transition-all active:scale-[0.98] ${
                           location.pathname === item.href 
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-slate-900/80' 
                            : 'text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900/50'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
                          {item.icon && <item.icon size={22} />}
                        </div>
                        {item.label}
                      </Link>
                      
                      {/* Mobile Sub-links (if any) */}
                      {item.subLinks && (
                        <div className="ml-20 mt-2 space-y-2">
                           {item.subLinks.map(sub => (
                             <Link 
                               key={sub.label} 
                               to={sub.href} 
                               onClick={() => setIsMobileMenuOpen(false)}
                               className="block py-2 text-sm font-bold text-slate-500 hover:text-blue-600"
                             >
                               {sub.label}
                             </Link>
                           ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </nav>
              </div>
              <div className="p-8 border-t border-slate-100 dark:border-slate-800">
                  <Link to="/contact" onClick={() => handleLinkClick('Contact')}>
                    <Button className="w-full py-6 text-lg rounded-3xl shadow-xl shadow-blue-500/20">
                      Let's Talk
                    </Button>
                  </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};