import React, { useState } from 'react';
import { Search, Layers, Code, ShieldCheck, Rocket, X } from 'lucide-react';
import { PROCESS_STEPS } from '../constants';
import { SectionId } from '../types';
import { ScrollReveal } from './ui/ScrollReveal';

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Code: <Code className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  Rocket: <Rocket className="w-6 h-6" />,
};

export const Process: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<any | null>(null);

  return (
    <section id={SectionId.PROCESS} className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
          <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">Our Workflow</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">How we bring your vision to life.</h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            A structured, agile development lifecycle designed for speed, transparency, and high-quality outcomes.
          </p>
        </ScrollReveal>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 -translate-x-1/2 z-0"></div>

          <div className="space-y-12 md:space-y-24">
            {PROCESS_STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <ScrollReveal 
                  key={step.id} 
                  delay={index * 0.1}
                  direction={isEven ? 'right' : 'left'}
                  className={`relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16 cursor-pointer`}
                  onClick={() => setSelectedStep(step)}
                >
                  {/* Left Content (or Right on mobile) */}
                  <div className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-end text-left md:text-right' : 'md:justify-start md order-last text-left'}`}>
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-shadow max-w-md w-full group">
                      <div className={`text-5xl font-black text-slate-100 dark:text-slate-800/50 mb-4 transition-colors group-hover:text-blue-50 dark:group-hover:text-blue-900/20 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                        {step.number}
                      </div>
                      <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{step.title}</h4>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Icon */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border-4 border-slate-50 dark:border-slate-950 items-center justify-center text-blue-600 dark:text-blue-400 shadow-xl shadow-blue-500/10 z-20">
                    {iconMap[step.icon]}
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className={`hidden md:block w-1/2 ${isEven ? 'order-last' : ''}`}></div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
        
        {selectedStep && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl max-w-lg w-full relative">
                    <button onClick={() => setSelectedStep(null)} className="absolute top-4 right-4"><X /></button>
                    <h3 className="text-2xl font-bold mb-4">{selectedStep.title}</h3>
                    <p>{selectedStep.description}</p>
                    <p className="mt-4 text-sm text-slate-500">More detailed information about {selectedStep.title}...</p>
                </div>
            </div>
        )}

        <ScrollReveal delay={0.5} className="mt-32 p-10 md:p-12 rounded-[3rem] bg-blue-600 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-blue-600/20 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
           <div className="max-w-xl relative z-10 text-center md:text-left">
             <h4 className="text-3xl font-bold mb-4">Ready to start the discovery?</h4>
             <p className="text-blue-100 text-lg">Schedule a 30-minute consultation with our lead architect to discuss your project requirements.</p>
           </div>
           <button 
             onClick={() => document.getElementById(SectionId.CONTACT)?.scrollIntoView({ behavior: 'smooth' })}
             className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold hover:bg-blue-50 transition-all shadow-xl hover:scale-105 active:scale-95 relative z-10 whitespace-nowrap"
             aria-label="Book a consultation with OITS Dhaka"
           >
             Book Consultation
           </button>
        </ScrollReveal>
      </div>
    </section>
  );
};
