import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Award, Users, CheckCircle2, Calendar, TrendingUp } from 'lucide-react';
import { ScrollReveal } from './ui/ScrollReveal';

interface MetricItemProps {
  label: string;
  value: number;
  suffix: string;
  icon: React.ElementType;
  description: string;
  delay?: number;
}

const AnimatedCounter: React.FC<{ target: number; suffix: string }> = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const frameRate = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad
      const currentCount = Math.round(target * (1 - Math.pow(1 - progress, 3)));

      setCount(currentCount);

      if (frame >= totalFrames) {
        setCount(target);
        clearInterval(timer);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
};

const METRICS_DATA = [
  {
    label: 'Projects Completed',
    value: 150,
    suffix: '+',
    icon: CheckCircle2,
    description: 'Enterprise & startup digital products deployed globally'
  },
  {
    label: 'Happy Clients',
    value: 85,
    suffix: '+',
    icon: Users,
    description: 'Long-term corporate & high-growth venture partnerships'
  },
  {
    label: 'Years of Experience',
    value: 10,
    suffix: '+',
    icon: Calendar,
    description: 'A decade of precision software architecture mastery'
  },
  {
    label: 'Team Experts',
    value: 40,
    suffix: '+',
    icon: Award,
    description: 'Senior architects, full-stack engineers & UI strategists'
  }
];

export const Metrics: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-slate-950 border-t border-b border-slate-100 dark:border-slate-900 relative overflow-hidden">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full mb-3">
            <TrendingUp size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] font-mono">Proven Impact</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter leading-tight">
            Engineering By The Numbers
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-4 text-base">
            Quantifiable achievements representing our relentless focus on performance, scale, and client satisfaction.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {METRICS_DATA.map((item, idx) => {
            const Icon = item.icon;
            return (
              <ScrollReveal
                key={item.label}
                delay={idx * 0.1}
                className="group p-8 bg-slate-50 dark:bg-slate-900/60 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/80 hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <Icon size={26} />
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2 font-mono">
                    <AnimatedCounter target={item.value} suffix={item.suffix} />
                  </div>
                  <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                    {item.label}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-800">
                  {item.description}
                </p>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
