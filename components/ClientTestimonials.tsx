import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, ChevronLeft, ChevronRight, Briefcase, Landmark, ShieldCheck, HeartHandshake } from 'lucide-react';
import { ScrollReveal } from './ui/ScrollReveal';

interface PartnerTestimonial {
  id: string;
  partnerName: string;
  partnerCompany: string;
  partnerLogo: React.ElementType;
  logoText: string;
  quote: string;
  industry: string;
  rating: number;
  author: string;
  authorRole: string;
  avatar: string;
}

const PARTNER_TESTIMONIALS: PartnerTestimonial[] = [
  {
    id: 'partner-1',
    partnerName: 'Pathfinder FinTech',
    partnerCompany: 'Pathfinder',
    partnerLogo: Landmark,
    logoText: 'PATHFINDER',
    quote: "OITS Dhaka's senior engineers designed our low-latency ledger system with unparalleled focus on security. Our platform now processes millions of financial metrics effortlessly.",
    industry: 'Financial Technology',
    rating: 5,
    author: 'Tariq Al-Mansoor',
    authorRole: 'Director of Technology',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&fm=webp'
  },
  {
    id: 'partner-2',
    partnerName: 'Ascend Health Corp',
    partnerCompany: 'Ascend Health',
    partnerLogo: ShieldCheck,
    logoText: 'ASCEND',
    quote: "The interactive teleconsultation setup developed by their mobile division passed HIPAA auditing constraints with flying colors. Highly recommend their system architecture practices.",
    industry: 'Digital Healthcare',
    rating: 5,
    author: 'Dr. Helen Carter',
    authorRole: 'Chief Operations Officer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&fm=webp'
  },
  {
    id: 'partner-3',
    partnerName: 'Nova Global Logistics',
    partnerCompany: 'Nova Supply Chain',
    partnerLogo: Briefcase,
    logoText: 'NOVA LOGISTICS',
    quote: "By shifting our automated supply routing engines to Kubernetes-managed multi-region clouds managed by Go microservices, our monthly server costs dropped by over thirty percent.",
    industry: 'Logistics & Supply Chain',
    rating: 5,
    author: 'Farhan Rahman',
    authorRole: 'VP of Product Strategy',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=150&fm=webp'
  },
  {
    id: 'partner-4',
    partnerName: 'GreenState Ventures',
    partnerCompany: 'GreenState',
    partnerLogo: HeartHandshake,
    logoText: 'GREENSTATE',
    quote: "Constructing our smart carbon-tracking IoT dashboard on React and NestJS allowed us to aggregate over twenty thousand telemetry payloads second-by-second with zero lag indices.",
    industry: 'Sustainable Energy',
    rating: 5,
    author: 'Sophia Vance',
    authorRole: 'Investment Partner',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&fm=webp'
  }
];

export const ClientTestimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<(() => void) | null>(null);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PARTNER_TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PARTNER_TESTIMONIALS.length) % PARTNER_TESTIMONIALS.length);
  };

  // Safe Autoplay setup
  useEffect(() => {
    autoPlayRef.current = handleNext;
  });

  useEffect(() => {
    const play = () => {
      if (autoPlayRef.current) autoPlayRef.current();
    };
    const interval = setInterval(play, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 md:py-32 bg-white dark:bg-slate-950 overflow-hidden border-t border-b border-slate-100 dark:border-slate-900">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <ScrollReveal className="max-w-xl">
            <span className="text-[10px] font-mono font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.25em] block mb-3">
              Institutional Credibility
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-none tracking-tighter">
              Trusted by Top Innovators
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-4 text-base">
              A sample of direct feedback from business architects and engineering teams who partner with OITS Dhaka to power critical software infrastructure.
            </p>
          </ScrollReveal>

          {/* Nav Controls */}
          <ScrollReveal delay={0.2} className="flex gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous partner testimonial"
              className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white text-slate-700 dark:text-slate-300 flex items-center justify-center transition-all duration-300 shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500 hover:scale-110 active:scale-95"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next partner testimonial"
              className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white dark:hover:text-white text-slate-700 dark:text-slate-300 flex items-center justify-center transition-all duration-300 shadow-sm focus-visible:ring-2 focus-visible:ring-blue-500 hover:scale-110 active:scale-95"
            >
              <ChevronRight size={20} />
            </button>
          </ScrollReveal>
        </div>

        {/* Carousel Container */}
        <div ref={containerRef} className="max-w-5xl mx-auto relative min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="bg-slate-50 dark:bg-slate-900 rounded-[3rem] p-8 md:p-16 border border-slate-100 dark:border-slate-800/60 shadow-xl shadow-slate-100/40 dark:shadow-none flex flex-col md:flex-row gap-12 items-center"
            >
              
              {/* Partner Logo area */}
              <div className="w-full md:w-1/3 flex flex-col items-center text-center p-6 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 gap-4">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm">
                  {React.createElement(PARTNER_TESTIMONIALS[currentIndex].partnerLogo, { size: 32 })}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 dark:text-white tracking-widest text-xs uppercase font-mono mt-2">
                    {PARTNER_TESTIMONIALS[currentIndex].logoText}
                  </h4>
                  <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider font-mono">
                    {PARTNER_TESTIMONIALS[currentIndex].industry}
                  </p>
                </div>
              </div>

              {/* Quote area */}
              <div className="w-full md:w-2/3 flex-1">
                <div className="flex gap-1 mb-4 justify-center md:justify-start">
                  {[...Array(PARTNER_TESTIMONIALS[currentIndex].rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <div className="relative">
                  <div className="absolute -top-6 -left-6 text-blue-500/10 opacity-60 z-0 select-none">
                    <Quote size={80} strokeWidth={4} />
                  </div>
                  <p className="text-lg md:text-xl text-slate-700 dark:text-slate-200 font-medium leading-relaxed italic relative z-10 mb-8">
                    "{PARTNER_TESTIMONIALS[currentIndex].quote}"
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={PARTNER_TESTIMONIALS[currentIndex].avatar}
                    referrerPolicy="no-referrer"
                    alt={PARTNER_TESTIMONIALS[currentIndex].author}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-white dark:ring-slate-800 shadow-md"
                  />
                  <div>
                    <h5 className="font-extrabold text-slate-900 dark:text-white leading-none">
                      {PARTNER_TESTIMONIALS[currentIndex].author}
                    </h5>
                    <p className="text-xs font-mono font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mt-1.5">
                      {PARTNER_TESTIMONIALS[currentIndex].authorRole}, {PARTNER_TESTIMONIALS[currentIndex].partnerCompany}
                    </p>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {PARTNER_TESTIMONIALS.map((_, idx) => (
              <button
                key={_.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Show testimonial ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? 'w-8 bg-blue-600' : 'w-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-350'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
