import React, { useState } from 'react';
import { Terminal, Github, Linkedin, Twitter, Facebook, Sun, Moon, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { COMPANY_NAME, NAV_ITEMS, SERVICES, ADDRESS } from '../constants';
import { Link } from 'react-router-dom';

interface FooterProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div 
      role="status"
      aria-live="polite"
      className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border ${type === 'success' ? 'bg-green-600 border-green-500' : 'bg-red-600 border-red-500'} text-white animate-in slide-in-from-bottom-10 duration-500`}
    >
      {type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
      <p className="font-bold text-sm tracking-tight">{message}</p>
    </div>
  );
};

const SocialLink = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => (
  <a 
    href={href} 
    className="group relative p-3 rounded-xl hover:bg-slate-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
    aria-label={label}
  >
    <div className="group-hover:scale-115 group-hover:rotate-6 transition-transform duration-300">
      <Icon size={20} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
    </div>
    
    {/* Enhanced Tooltip with Scale Animation */}
    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-white bg-blue-600 rounded-lg opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-xl scale-75 group-hover:scale-100 group-focus:scale-100 origin-bottom z-20">
      {label}
      <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-[6px] border-transparent border-t-blue-600"></span>
    </span>
  </a>
);

const FooterLink = ({ href, children, 'aria-label': ariaLabel }: { href: string; children?: React.ReactNode; 'aria-label'?: string }) => {
  const content = (
    <span className="inline-block transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue-400">
      {children}
    </span>
  );

  return (
    <Link 
      to={href} 
      aria-label={ariaLabel}
      className="group flex items-center text-slate-400 hover:text-blue-400 transition-all py-1.5 font-medium text-sm"
    >
      {content}
    </Link>
  );
};

export const Footer: React.FC<FooterProps> = ({ theme, toggleTheme }) => {
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const [projectsDelivered, setProjectsDelivered] = useState(0);
  const [happyClients, setHappyClients] = useState(0);
  const [yearsExperience, setYearsExperience] = useState(0);

  React.useEffect(() => {
    let startTime: number | null = null;
    const duration = 1500; // 1.5 seconds animation duration
    const targets = { projects: 150, clients: 85, experience: 10 };

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // easeOutQuad curve
      const easing = percentage * (2 - percentage);

      setProjectsDelivered(Math.floor(easing * targets.projects));
      setHappyClients(Math.floor(easing * targets.clients));
      setYearsExperience(Math.floor(easing * targets.experience));

      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        setProjectsDelivered(targets.projects);
        setHappyClients(targets.clients);
        setYearsExperience(targets.experience);
      }
    };

    const animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setToast({ message: 'Welcome to our engineering insight collective!', type: 'success' });
      setEmail('');
    } else {
      setToast({ message: 'Please enter a valid work email address.', type: 'error' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 py-24 border-t border-slate-900 overflow-hidden">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="container mx-auto px-6">
        
        {/* State-driven Metrics Counter Dashboard Row */}
        <div className="bg-slate-900/45 border border-slate-900/80 rounded-3xl p-8 mb-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          <div className="space-y-1 relative z-10">
            <p className="text-4xl md:text-5xl font-black text-blue-500 font-mono tracking-tighter">
              {projectsDelivered}+
            </p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Projects Delivered</p>
          </div>
          <div className="space-y-1 sm:border-l border-slate-900 sm:pl-8 relative z-10">
            <p className="text-4xl md:text-5xl font-black text-emerald-500 font-mono tracking-tighter">
              {happyClients}+
            </p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Happy Clients</p>
          </div>
          <div className="space-y-1 sm:border-l border-slate-900 sm:pl-8 relative z-10">
            <p className="text-4xl md:text-5xl font-black text-purple-500 font-mono tracking-tighter">
              {yearsExperience}+
            </p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Years of Experience</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3 text-white group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                <Terminal size={20} className="text-white" />
              </div>
              <span className="text-2xl font-black tracking-tighter">{COMPANY_NAME}</span>
            </Link>
            <div className="flex flex-col gap-4">
              <p className="text-sm leading-relaxed text-slate-400 font-medium">
                We architect resilient digital systems that power the world's most innovative brands. From concept to scale, we are your strategic engineering partner.
              </p>
              <a 
                href={`https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-xs font-bold text-slate-500 hover:text-blue-400 transition-colors"
                aria-label="View our office location on Google Maps"
              >
                <MapPin size={14} className="mt-0.5 shrink-0" />
                <span>{ADDRESS}</span>
              </a>
            </div>
            
            <div className="flex gap-2">
              <SocialLink href="#" icon={Github} label="GitHub" />
              <SocialLink href="#" icon={Linkedin} label="LinkedIn" />
              <SocialLink href="#" icon={Twitter} label="Twitter" />
              <SocialLink href="#" icon={Facebook} label="Facebook" />
            </div>
            
            <div className="pt-4">
               <button
                  onClick={toggleTheme}
                  className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] bg-slate-900 px-6 py-3.5 rounded-2xl border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800 transition-all duration-500 group shadow-xl hover:shadow-blue-500/5"
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
               >
                  <div className="transition-transform duration-500 group-hover:rotate-45">
                    {theme === 'dark' ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} className="text-blue-400" />}
                  </div>
                  <span className="group-hover:text-white transition-colors">
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </span>
               </button>
            </div>
          </div>

          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-10">Company</h4>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <FooterLink href={item.href} aria-label={`Go to ${item.label} page`}>{item.label}</FooterLink>
                </li>
              ))}
              <li>
                <FooterLink href="/about" aria-label="Go to careers section on the about page">
                  <div className="flex items-center gap-2">
                    Careers 
                    <span className="text-[9px] bg-blue-600/20 text-blue-400 px-2.5 py-0.5 rounded-full font-black uppercase tracking-widest animate-pulse">Hiring</span>
                  </div>
                </FooterLink>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-10">Engineering</h4>
            <ul className="space-y-2">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <FooterLink href={`/services#${service.id}`} aria-label={`View our ${service.title} service`}>
                    {service.title}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-10">Stay Informed</h4>
            <p className="text-sm mb-8 text-slate-400 font-medium leading-relaxed">Join our engineering collective for bi-weekly deep dives into modern tech stacks.</p>
            <form className="space-y-4 group/form" aria-label="Newsletter Subscription Form" onSubmit={handleSubscribe}>
              <div className="relative">
                <input 
                  id="newsletter-email"
                  type="email" 
                  placeholder="Work email address" 
                  aria-label="Email for newsletter"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 focus:pl-8 transition-all duration-500 peer"
                />
                {/* Border pulse effect on focus */}
                <div className="absolute inset-0 rounded-2xl border border-blue-600 opacity-0 peer-focus:opacity-100 transition-all duration-500 pointer-events-none scale-105 peer-focus:scale-100"></div>
              </div>
              <button 
                type="submit" 
                aria-label="Subscribe to our insights newsletter"
                className="w-full bg-blue-600 text-white px-8 py-4.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-blue-50 transition-all duration-300 shadow-2xl shadow-blue-600/20 active:scale-95 active:shadow-none"
              >
                Subscribe to Insights
              </button>
            </form>
          </div>

        </div>
        
        <div className="pt-12 border-t border-slate-900/50 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
          <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. Digital Engineering Excellence.</p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            <Link to="#" className="hover:text-blue-400 transition-all hover:scale-105" aria-label="Read our Privacy Policy">Privacy Policy</Link>
            <Link to="#" className="hover:text-blue-400 transition-all hover:scale-105" aria-label="Read our Terms of Service">Terms of Service</Link>
            <Link to="#" className="hover:text-blue-400 transition-all hover:scale-105" aria-label="Read our Legal Compliance disclosures">Legal Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
