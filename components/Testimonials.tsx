import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../constants';
import { ScrollReveal } from './ui/ScrollReveal';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextTestimonial();
    } else if (isRightSwipe) {
      prevTestimonial();
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-900 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6">
        <ScrollReveal className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">Testimonials</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">What our clients say.</h3>
          </div>
          <div className="flex gap-4 items-center">
            <button 
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </ScrollReveal>

        <div 
          className="relative overflow-hidden cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ touchAction: 'pan-y' }}
        >
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            aria-live="polite"
          >
            {TESTIMONIALS.map((t, index) => (
              <div 
                key={t.id} 
                className="w-full flex-shrink-0 px-4"
                aria-hidden={currentIndex !== index}
              >
                <ScrollReveal 
                  delay={0.1}
                  className={`bg-slate-50 dark:bg-slate-800 p-8 md:p-12 rounded-3xl relative max-w-4xl mx-auto shadow-sm hover:shadow-md`}
                >
                  <Quote className="text-blue-100 dark:text-blue-900/50 w-16 h-16 mb-8" />
                  <blockquote className="text-slate-700 dark:text-slate-300 italic mb-10 text-xl md:text-2xl relative z-10 leading-relaxed font-medium">"{t.content}"</blockquote>
                  
                  <div className="flex items-center gap-5 mt-auto">
                    <img 
                      src={t.avatar} 
                      alt={`${t.name} from ${t.company}`} 
                      className="w-14 h-14 rounded-full object-cover shadow-sm bg-slate-200" 
                      loading="lazy"
                    />
                    <div>
                      <p className="font-bold text-lg text-slate-900 dark:text-white">{t.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{t.role}, {t.company}</p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center gap-3 mt-12" role="tablist" aria-label="Testimonial pagination">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              role="tab"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-selected={currentIndex === index}
              className={`w-3 h-3 rounded-full transition-all duration-300 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${currentIndex === index ? 'bg-blue-600 w-8' : 'bg-slate-200 dark:bg-slate-700 hover:bg-blue-400'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
