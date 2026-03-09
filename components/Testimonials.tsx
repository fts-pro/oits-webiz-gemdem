import React, { useEffect, useRef, useState } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

export const Testimonials: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section ref={sectionRef} className="py-24 bg-white dark:bg-slate-900 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className={`flex flex-col md:flex-row items-end justify-between mb-16 gap-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
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
        </div>

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {TESTIMONIALS.map((t, index) => (
              <div 
                key={t.id} 
                className="w-full flex-shrink-0 px-4"
                aria-hidden={currentIndex !== index}
              >
                <div className={`bg-slate-50 dark:bg-slate-800 p-8 md:p-12 rounded-3xl relative transition-all duration-700 ease-out max-w-4xl mx-auto shadow-sm hover:shadow-md ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <Quote className="text-blue-100 dark:text-blue-900/50 w-16 h-16 mb-8" />
                  <p className="text-slate-700 dark:text-slate-300 italic mb-10 text-xl md:text-2xl relative z-10 leading-relaxed font-medium">"{t.content}"</p>
                  
                  <div className="flex items-center gap-5 mt-auto">
                    <img src={t.avatar} alt={`${t.name} avatar`} className="w-14 h-14 rounded-full object-cover shadow-sm" />
                    <div>
                      <p className="font-bold text-lg text-slate-900 dark:text-white">{t.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{t.role}, {t.company}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center gap-3 mt-12">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={currentIndex === index ? 'true' : 'false'}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-blue-600 w-8' : 'bg-slate-200 dark:bg-slate-700 hover:bg-blue-400'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};