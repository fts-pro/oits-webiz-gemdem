import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { ScrollReveal } from './ui/ScrollReveal';

const PUBLICATIONS = [
  { name: 'TechCrunch', ariaLabel: 'Recognized by TechCrunch - Leading technology media' },
  { name: 'Wired', ariaLabel: 'Recognized by Wired Magazine - Future-focused tech publication' },
  { name: 'Forbes', ariaLabel: 'Recognized by Forbes - Global business and tech insights' },
  { name: 'Business Insider', ariaLabel: 'Recognized by Business Insider - Tech and innovation news' },
  { name: 'The Verge', ariaLabel: 'Recognized by The Verge - Technology and lifestyle media' },
];

export const FeaturedIn: React.FC = () => {
  return (
    <section 
      className="relative py-28 md:py-36 lg:py-48 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header text with entry animation */}
          <ScrollReveal className="text-center mb-20">
            <p className="text-[10px] md:text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.4em] mb-4">
              Industry Recognition
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Recognized by Global Tech Media
            </h2>
          </ScrollReveal>
          
          {/* Responsive grid for logos with individual stagger animations */}
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-12 sm:gap-x-16 md:gap-x-20 lg:gap-x-24 mb-24" aria-label="Media Publications">
            {PUBLICATIONS.map((pub, index) => (
              <ScrollReveal 
                key={pub.name} 
                delay={index * 0.1}
                direction="none"
                className="group flex items-center justify-center transition-all"
              >
                {/* Fixed color contrast: Slate-400 for light mode, Slate-600 for dark mode */}
                <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-400 dark:text-slate-600 tracking-tighter transition-all duration-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:scale-105 group-hover:-rotate-1 cursor-default select-none relative" aria-label={pub.ariaLabel}>
                  {pub.name}
                  {/* Subtle underline hover effect */}
                  <span className="absolute -bottom-2 left-0 w-0 h-1 bg-blue-600 dark:bg-blue-400 transition-all duration-500 group-hover:w-full opacity-40 rounded-full" />
                </span>
              </ScrollReveal>
            ))}
          </div>

          {/* Call to action with slide-up effect */}
          <ScrollReveal delay={0.4} className="flex flex-col items-center pt-16 border-t border-slate-100 dark:border-slate-800/50">
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 font-medium max-w-md text-center">
              Our engineering standards are vetted by the industry's most demanding critics and innovative leaders.
            </p>
            <Link to="/portfolio" aria-label="Navigate to portfolio to view our work">
              <Button 
                variant="outline" 
                size="lg" 
                className="group rounded-full px-12 py-7 transition-all hover:bg-slate-950 hover:text-white dark:hover:bg-blue-600 dark:hover:border-blue-600 shadow-xl shadow-blue-500/10 active:scale-95 border-2 hover:shadow-blue-500/20"
              >
                <span className="flex items-center gap-2">
                  View Our Work
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
                </span>
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
