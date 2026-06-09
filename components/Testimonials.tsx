import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { ScrollReveal } from './ui/ScrollReveal';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'CTO, TechFlow Solutions',
    content: 'OITS Dhaka transformed our legacy systems into a high-performance cloud architecture. Their expertise in React and Node.js is world-class.',
    impact: '150% Performance Boost',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'Founder, EcoScale',
    content: 'The custom software they built for us has automated 60% of our manual tasks. The ROI was evident within the first quarter.',
    impact: '$200k Savings/Year',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Product VP, FinTrack',
    content: 'Their design team captured our brand perfectly. The UI/UX is not just beautiful, but incredibly intuitive for our fintech users.',
    impact: '4.8 App Store Rating',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
  },
];

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-6">
        <ScrollReveal className="text-center mb-20">
          <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">Social Proof</h3>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-tighter">What our clients say.</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            We build long-term partnerships through consistent delivery and technical excellence.
          </p>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel bg-white/60 dark:bg-slate-900/60 p-10 md:p-20 rounded-[3rem] border border-slate-200/50 dark:border-slate-800/50 shadow-2xl shadow-blue-500/5 flex flex-col md:flex-row gap-12 items-center"
            >
              <div className="relative shrink-0">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl z-20">
                  <Quote size={20} />
                </div>
                <img 
                  src={TESTIMONIALS[currentIndex].avatar} 
                  alt={TESTIMONIALS[currentIndex].name}
                  className="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] object-cover ring-4 ring-white dark:ring-slate-800 shadow-lg"
                  loading="lazy"
                />
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-blue-500 text-blue-500" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 mb-8 font-medium leading-relaxed italic">
                  "{TESTIMONIALS[currentIndex].content}"
                </p>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">{TESTIMONIALS[currentIndex].name}</h4>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">{TESTIMONIALS[currentIndex].role}</p>
                </div>
                
                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800/50 flex flex-col md:flex-row items-center gap-4">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Business Impact:</span>
                  <span className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-mono text-sm font-black">
                    {TESTIMONIALS[currentIndex].impact}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="mt-12 flex justify-center gap-4 relative z-20">
            <button 
              onClick={prev}
              className="w-14 h-14 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-900 dark:text-white hover:bg-blue-600 hover:text-white transition-all shadow-lg active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={next}
              className="w-14 h-14 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-900 dark:text-white hover:bg-blue-600 hover:text-white transition-all shadow-lg active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
