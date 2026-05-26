import React from 'react';
import { TECH_STACK } from '../constants';

export const Marquee: React.FC = () => {
  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-300">
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-12 px-6">
          {TECH_STACK.map((tech) => (
            <span key={tech} className="text-2xl md:text-3xl font-bold text-slate-300 dark:text-slate-700 uppercase tracking-tight hover:text-blue-500 dark:hover:text-blue-400 transition-colors cursor-default">
              {tech}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {TECH_STACK.map((tech) => (
            <span key={`${tech}-dup`} className="text-2xl md:text-3xl font-bold text-slate-300 dark:text-slate-700 uppercase tracking-tight hover:text-blue-500 dark:hover:text-blue-400 transition-colors cursor-default">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};