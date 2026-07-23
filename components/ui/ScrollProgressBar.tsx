import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SectionMarker {
  id: string;
  label: string;
  percentage: number;
}

interface ScrollProgressBarProps {
  scrollProgress: number;
}

export const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({ scrollProgress }) => {
  const [markers, setMarkers] = useState<SectionMarker[]>([]);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  useEffect(() => {
    const updateMarkers = () => {
      // Find all elements with an ID that are present in the DOM
      const candidateIds = [
        { id: 'hero', label: 'Overview' },
        { id: 'services', label: 'Services' },
        { id: 'process', label: 'Process' },
        { id: 'portfolio', label: 'Portfolio' },
        { id: 'about', label: 'About' },
        { id: 'testimonials', label: 'Reviews' },
        { id: 'contact', label: 'Contact' },
        { id: 'faq', label: 'FAQ' },
      ];

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setMarkers([]);
        return;
      }

      const detectedMarkers: SectionMarker[] = [];

      candidateIds.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const elementOffsetTop = rect.top + scrollTop;
          const percentage = Math.min(Math.max((elementOffsetTop / docHeight) * 100, 0), 100);

          detectedMarkers.push({
            id: item.id,
            label: item.label,
            percentage: Math.round(percentage),
          });
        }
      });

      // Sort markers by position
      detectedMarkers.sort((a, b) => a.percentage - b.percentage);
      setMarkers(detectedMarkers);
    };

    updateMarkers();

    // Recalculate markers on window resize or dynamic content loads
    const timer = setTimeout(updateMarkers, 500);
    window.addEventListener('resize', updateMarkers);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateMarkers);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-[4px] bg-slate-200/40 dark:bg-slate-800/40 z-[1001]">
      {/* Active Fill Bar */}
      <div
        className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 transition-transform duration-75 origin-left shadow-[0_0_12px_rgba(37,99,235,0.8)]"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      {/* Section Markers */}
      <div className="absolute inset-0 pointer-events-none flex items-center">
        {markers.map((marker) => {
          const isPassed = scrollProgress >= marker.percentage - 2;
          return (
            <div
              key={marker.id}
              className="absolute -top-[3px] pointer-events-auto group cursor-pointer"
              style={{ left: `${marker.percentage}%` }}
              onClick={() => scrollToSection(marker.id)}
              onMouseEnter={() => setActiveTooltip(marker.id)}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              {/* Glowing Dot Marker */}
              <div
                className={`w-[10px] h-[10px] rounded-full border-2 transition-all duration-300 transform -translate-x-1/2 ${
                  isPassed
                    ? 'bg-blue-600 border-white dark:border-slate-900 scale-110 shadow-[0_0_8px_rgba(59,130,246,0.9)]'
                    : 'bg-slate-400 dark:bg-slate-600 border-white dark:border-slate-900 opacity-60 hover:opacity-100 hover:scale-125'
                }`}
              />

              {/* Hover Tooltip */}
              <AnimatePresence>
                {activeTooltip === marker.id && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-4 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-[10px] font-mono font-black uppercase tracking-wider rounded-md shadow-xl whitespace-nowrap z-50 pointer-events-none"
                  >
                    {marker.label} ({marker.percentage}%)
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};
