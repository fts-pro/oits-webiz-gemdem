import React from 'react';
import { TRUSTED_PARTNERS } from '../constants';
import { ScrollReveal } from './ui/ScrollReveal';

export const TrustedBy: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-6" aria-label="Trusted Partners">
        <ScrollReveal direction="up" className="text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-12">
          Trusted By Emerging Global Leaders
        </ScrollReveal>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20">
          {TRUSTED_PARTNERS.map((logo, index) => (
            <ScrollReveal 
              key={logo.name} 
              delay={index * 0.05}
              className="flex items-center gap-3 group cursor-default transition-all"
            >
              <div 
                className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-xs font-black text-slate-400 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:scale-115 group-hover:rotate-3 shadow-sm group-hover:shadow-lg group-hover:shadow-blue-500/20"
                aria-hidden="true"
              >
                {logo.icon}
              </div>
              {/* Darker slate-500 for better visibility in light mode */}
              <span 
                className="text-sm font-black text-slate-500 dark:text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300 tracking-tight"
                aria-label={`Partner: ${logo.name}`}
              >
                {logo.name}
              </span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
