import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Server, Code, Layers, Cloud, ChevronRight, Check } from 'lucide-react';
import { ScrollReveal } from './ui/ScrollReveal';

interface TechItem {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Mobile' | 'Infrastructure';
  proficiency: string;
  description: string;
  experience: string;
  keyProjects: string[];
}

const TECH_STACK_ITEMS: TechItem[] = [
  {
    id: 'react',
    name: 'React & Next.js',
    category: 'Frontend',
    proficiency: 'Core mastery',
    description: 'Our primary tool for high-performance enterprise dashboard structures and single-page applications. We employ atomic component architectures and customized state engines.',
    experience: 'Over 5 years of shipping production platforms handling millions of state updates smoothly with precise SEO setup.',
    keyProjects: ['FinTech Analytics Hub', 'EduStream Pro', 'E-Commerce Engine']
  },
  {
    id: 'golang',
    name: 'Go (Golang)',
    category: 'Backend',
    proficiency: 'Highly advanced',
    description: 'We code resilient, concurrency-heavy web servers and low-latency microservices using Go. Excellent for handling severe traffic peaks with tiny memory footprint.',
    experience: 'Powering automated routing engines and telemetry servers with sub-millisecond route resolution speeds.',
    keyProjects: ['Global Logistics Engine', 'CloudScale Infrastructure']
  },
  {
    id: 'node',
    name: 'Node.js & NestJS',
    category: 'Backend',
    proficiency: 'Advanced standard',
    description: 'Ideal for rapid scaling and backend-for-frontend (BFF) layers. We prefer NestJS or TypeScript-configured Express frameworks paired with strict dependency injection rules.',
    experience: 'Designing domain-driven design server logic, websocket pipelines, and bulletproof micro-services setups.',
    keyProjects: ['Luma Healthcare App', 'MediVision Diagnosis']
  },
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'Mobile',
    proficiency: 'Expert delivery',
    description: 'A multi-platform framework to output incredibly fluid, beautifully drawn UI states on iOS and Android alike, compiled directly from a single clean codebase.',
    experience: 'Building offline-first databases, custom animations, and seamless external API integrations.',
    keyProjects: ['Luma Healthcare App']
  },
  {
    id: 'kubernetes',
    name: 'Kubernetes & Docker',
    category: 'Infrastructure',
    proficiency: 'Infrastructure baseline',
    description: 'We packetize every software delivery pipeline into decoupled, lightweight Docker containers, securely scheduled and orchestrated across cloud hosts.',
    experience: 'Standardized automated canary deployments, rolling updates, and self-healing cluster services for complete high availability.',
    keyProjects: ['CloudScale Infrastructure', 'Global Logistics Engine']
  },
  {
    id: 'terraform',
    name: 'Terraform (IaC)',
    category: 'Infrastructure',
    proficiency: 'Core deployment',
    description: 'Infrastructure-as-Code is a core company policy. We construct completely reproducible environments on AWS, Google Cloud, and Azure using declarative syntax.',
    experience: 'Managing robust enterprise cloud configurations with automated zero-drift server replication cycles.',
    keyProjects: ['CloudScale Infrastructure', 'EcoTrack IoT']
  }
];

export const TechStackInteractive: React.FC = () => {
  const [selectedTech, setSelectedTech] = useState<TechItem>(TECH_STACK_ITEMS[0]);
  const [activeCategory, setActiveCategory] = useState<'All' | 'Frontend' | 'Backend' | 'Mobile' | 'Infrastructure'>('All');

  const filteredItems = TECH_STACK_ITEMS.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  );

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950/40 border-t border-b border-slate-100 dark:border-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-6">
        
        <ScrollReveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full mb-4">
            <Cpu size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] font-mono">Competencies</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-none tracking-tighter mb-4">
            Our Tech Stack Expertise
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-base">
            Click on a technology to explore our deep engineering specialization, deployment tactics, and proven production statistics.
          </p>
        </ScrollReveal>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" role="tablist" aria-label="Technology Categories">
          {(['All', 'Frontend', 'Backend', 'Mobile', 'Infrastructure'] as const).map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 hover:scale-105 ${
                activeCategory === cat
                  ? 'bg-slate-900 dark:bg-blue-600 text-white shadow-xl shadow-blue-500/10'
                  : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800'
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Tech Grid List Selection (Cols 1-5) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((tech) => {
                const isSelected = selectedTech.id === tech.id;
                return (
                  <motion.button
                    key={tech.id}
                    layoutId={`tech-${tech.id}`}
                    onClick={() => setSelectedTech(tech)}
                    className={`p-5 rounded-2xl border text-left flex flex-col justify-between transition-all duration-500 focus-visible:ring-2 focus-visible:ring-blue-500 outline-none hover:-translate-y-1 ${
                      isSelected
                        ? 'bg-white dark:bg-slate-900 border-blue-500/60 shadow-xl shadow-blue-500/5'
                        : 'bg-white/50 dark:bg-slate-900/45 border-slate-200/60 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-3">
                      <span className={`text-[9px] font-mono font-black uppercase tracking-wider px-2 py-1 rounded-md ${
                        isSelected 
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                          : 'bg-slate-100 dark:bg-slate-800/80 text-slate-500'
                      }`}>
                        {tech.category}
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="font-extrabold text-slate-900 dark:text-white text-lg tracking-tight leading-none mb-1">
                        {tech.name}
                      </h4>
                      <p className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest">
                        {tech.proficiency}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Interactive details card (Cols 6-12) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTech.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/20 dark:shadow-none relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/3 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
                
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                      <span className="text-[10px] font-mono font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.25em] block mb-2">
                        {selectedTech.category} Specialization
                      </span>
                      <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                        {selectedTech.name}
                      </h3>
                    </div>
                    <span className="self-start sm:self-center px-4 py-2 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-black uppercase tracking-wider rounded-xl border border-emerald-150 dark:border-emerald-900/30">
                      {selectedTech.proficiency}
                    </span>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">Overview & Architecture</h5>
                      <p className="text-slate-650 dark:text-slate-300 text-base leading-relaxed font-medium">
                        {selectedTech.description}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-slate-100 dark:border-slate-800/60">
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 font-mono">Production Track Record</h5>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {selectedTech.experience}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-slate-100 dark:border-slate-800/60">
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 font-mono">Delivered Cases</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedTech.keyProjects.map((proj) => (
                          <span
                            key={proj}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-150/50 dark:border-slate-800"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                            {proj}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
