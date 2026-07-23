import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Layers, Code, ShieldCheck, Rocket, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PROCESS_STEPS } from '../constants';
import { SectionId } from '../types';
import { ScrollReveal } from './ui/ScrollReveal';
import { InteractiveTimeline } from './ui/InteractiveTimeline';

const iconMap: Record<string, React.ReactNode> = {
  Search: <Search className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Code: <Code className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  Rocket: <Rocket className="w-6 h-6" />,
};

const STEP_DELIVERABLES: Record<string, string[]> = {
  discovery: [
    'Initial technical consultation & requirement gathering',
    'Scope definition & feasibility analysis',
    'System architecture roadmap & tech stack selection'
  ],
  design: [
    'User flow mapping & low-fidelity wireframes',
    'High-fidelity UI mockups & design system creation',
    'Clickable interactive prototypes for early feedback'
  ],
  development: [
    'Sprint-based agile engineering in two-week cycles',
    'Clean code architecture & continuous integration',
    'Transparent task tracking via Jira & Slack updates'
  ],
  testing: [
    'Automated unit, integration, and E2E test suites',
    'OWASP top 10 security audit & vulnerability scanning',
    'Cross-browser and multi-device performance tuning'
  ],
  deployment: [
    'CI/CD deployment to cloud infrastructure (AWS/GCP)',
    'Zero-downtime release orchestration & monitoring setup',
    'SLA-backed post-launch maintenance & continuous scaling'
  ]
};

export const Process: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<any | null>(null);

  return (
    <section id={SectionId.PROCESS} className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6 relative z-10">
        
        <ScrollReveal className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] font-mono">End-To-End Workflow</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight mb-6">
            From Initial Consultation <br/> To Project Delivery
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-medium">
            A battle-tested 5-stage agile software lifecycle engineered for velocity, security, and institutional quality.
          </p>
        </ScrollReveal>

        {/* Interactive Software Development Lifecycle Timeline */}
        <ScrollReveal className="max-w-4xl mx-auto mb-20">
          <InteractiveTimeline />
        </ScrollReveal>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-600 to-indigo-600 -translate-x-1/2 z-0 opacity-30 dark:opacity-40" />

          <div className="space-y-12 md:space-y-20">
            {PROCESS_STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              const deliverables = STEP_DELIVERABLES[step.id] || [];

              return (
                <ScrollReveal 
                  key={step.id} 
                  delay={index * 0.1}
                  direction={isEven ? 'right' : 'left'}
                  className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16 group"
                >
                  {/* Content Card */}
                  <div className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-end text-left md:text-right' : 'md:justify-start order-last text-left'}`}>
                    <div 
                      onClick={() => setSelectedStep(step)}
                      className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-blue-500/40 transition-all duration-500 max-w-md w-full cursor-pointer hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-4xl font-black font-mono text-blue-600/30 dark:text-blue-400/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {step.number}
                        </span>
                        <span className="text-[10px] font-mono font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200/50 dark:border-blue-900/50">
                          Stage {index + 1}
                        </span>
                      </div>

                      <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {step.title}
                      </h3>

                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm font-medium mb-6">
                        {step.description}
                      </p>

                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                        <span>View Key Deliverables</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>

                  {/* Center Icon Badge */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 border-2 border-blue-500/30 items-center justify-center text-blue-600 dark:text-blue-400 shadow-xl shadow-blue-500/10 z-20 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    {iconMap[step.icon]}
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className={`hidden md:block w-1/2 ${isEven ? 'order-last' : ''}`} />
                </ScrollReveal>
              );
            })}
          </div>
        </div>
        
        {/* Step Deliverables Modal */}
        <AnimatePresence>
          {selectedStep && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStep(null)}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 max-w-lg w-full relative shadow-2xl"
              >
                <button 
                  onClick={() => setSelectedStep(null)} 
                  className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>

                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                    STAGE {selectedStep.number}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
                  {selectedStep.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                  {selectedStep.description}
                </p>

                <div className="space-y-3 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <h4 className="text-xs font-mono font-black text-slate-400 uppercase tracking-widest mb-3">
                    Key Stage Deliverables
                  </h4>
                  {(STEP_DELIVERABLES[selectedStep.id] || []).map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedStep(null)}
                  className="w-full mt-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-mono font-black text-xs uppercase tracking-wider transition-all"
                >
                  Got It
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <ScrollReveal delay={0.3} className="mt-28 p-10 md:p-14 rounded-[3rem] bg-slate-900 dark:bg-slate-900/90 text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
           <div className="max-w-xl relative z-10 text-center md:text-left space-y-3">
             <span className="text-[10px] font-mono font-black text-blue-400 uppercase tracking-[0.25em]">Consultation Phase</span>
             <h4 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Ready to kick off Stage 01?</h4>
             <p className="text-slate-400 text-sm md:text-base font-medium">Schedule a technical discovery session with our software architect to map your exact roadmap.</p>
           </div>
           <button 
             onClick={() => {
               const el = document.getElementById(SectionId.CONTACT);
               if (el) {
                 el.scrollIntoView({ behavior: 'smooth' });
               } else {
                 window.location.href = '/contact';
               }
             }}
             className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-mono font-black text-xs uppercase tracking-wider transition-all shadow-xl shadow-blue-600/30 hover:scale-105 active:scale-95 relative z-10 whitespace-nowrap"
             aria-label="Book a technical consultation with OITS Dhaka"
           >
             Book Discovery Call
           </button>
        </ScrollReveal>

      </div>
    </section>
  );
};
