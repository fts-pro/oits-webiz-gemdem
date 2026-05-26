import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const MetricItem = ({ label, value, suffix }: { label: string; value: number; suffix: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div ref={ref} className="text-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div className="text-5xl font-black text-blue-600 dark:text-blue-400 mb-2"
        initial={{ count: 0 }}
        animate={isInView ? { count: value } : { count: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        {isInView ? value : 0}{suffix}
      </motion.div>
      <p className="text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">{label}</p>
    </motion.div>
  );
};

export const Metrics: React.FC = () => (
  <section className="py-24 bg-white dark:bg-slate-950">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <MetricItem label="Projects Delivered" value={150} suffix="+" />
        <MetricItem label="Global Clients" value={85} suffix="+" />
        <MetricItem label="Team Experts" value={40} suffix="+" />
        <MetricItem label="Years Industry" value={10} suffix="+" />
      </div>
    </div>
  </section>
);
