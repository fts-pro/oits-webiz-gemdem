import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSound } from '../SoundContext';
import { Search, Compass, Cpu, ShieldAlert, Rocket, CheckCircle2, Milestone, ArrowRight } from 'lucide-react';

interface TimelineNode {
  id: string;
  stage: string;
  title: string;
  duration: string;
  icon: React.ReactNode;
  shortDesc: string;
  fullDetails: string[];
  color: string;
}

const TIMELINE_NODES: TimelineNode[] = [
  {
    id: 'stage1',
    stage: '01',
    title: 'Discovery & Architecture',
    duration: 'Week 1-2',
    icon: <Search className="w-5 h-5" />,
    shortDesc: 'Deep-dive alignment, user flows, data schemas, and fixed SLA definitions.',
    fullDetails: [
      'Comprehensive workshop to map user stories & functional scope',
      'High-level technical design document (TDD) detailing microservices',
      'Selection of technology stack with security and cost optimization guidelines',
      'Creation of initial product backlog and estimation matrix'
    ],
    color: 'from-blue-500 to-indigo-500'
  },
  {
    id: 'stage2',
    stage: '02',
    title: 'Interactive Prototyping',
    duration: 'Week 3-4',
    icon: <Compass className="w-5 h-5" />,
    shortDesc: 'Bespoke UI designs, typography pairings, and functional system wireframes.',
    fullDetails: [
      'Interactive Figma flows mirroring final component states',
      'Implementation of design system tokens (colors, typography, spacing)',
      'A/B feedback sessions on key visual views and layouts',
      'Finalized interactive click-through prototypes'
    ],
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'stage3',
    stage: '03',
    title: 'Sprint Development',
    duration: 'Week 5-10',
    icon: <Cpu className="w-5 h-5" />,
    shortDesc: 'Agile engineering with bi-weekly client demo sessions and transparent metrics.',
    fullDetails: [
      'Clean TypeScript engineering with test-driven parameters',
      'Continuous Integration / Continuous Deployment (CI/CD) pipelines active',
      'Bi-weekly staging demos showing clickable, working system features',
      'Comprehensive code reviews and automated lint compliance checks'
    ],
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'stage4',
    stage: '04',
    title: 'Security & QA Hardening',
    duration: 'Week 11-12',
    icon: <ShieldAlert className="w-5 h-5" />,
    shortDesc: 'OWASP penetration checks, automated load testing, and edge-case handling.',
    fullDetails: [
      'OWASP Top 10 compliance audits to secure API and user vectors',
      'Automated load testing simulating concurrent transaction spikes',
      'Multi-browser and mobile device optical parity verification',
      'Full-scope functional acceptance testing'
    ],
    color: 'from-pink-500 to-amber-500'
  },
  {
    id: 'stage5',
    stage: '05',
    title: 'Production Handover & SLA',
    duration: 'Ongoing Support',
    icon: <Rocket className="w-5 h-5" />,
    shortDesc: 'Zero-downtime cloud infrastructure deployment with real-time alerting systems.',
    fullDetails: [
      'Zero-downtime deployment orchestration using containerized platforms',
      'Setup of performance monitoring dashboards (uptime, response metrics)',
      'Training and handoff of administrative consoles and code repositories',
      'SLA active: continuous security patches and active scaling response'
    ],
    color: 'from-amber-500 to-emerald-500'
  }
];

export const InteractiveTimeline: React.FC = () => {
  const { playClickSound } = useSound();
  const [activeStageId, setActiveStageId] = useState<string>('stage1');

  const activeStage = TIMELINE_NODES.find(node => node.id === activeStageId) || TIMELINE_NODES[0];

  const handleNodeClick = (id: string) => {
    playClickSound();
    setActiveStageId(id);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200/80 dark:border-slate-800 p-8 sm:p-12 shadow-xl shadow-slate-200/20 dark:shadow-none transition-all">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-[10px] font-mono font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-900/20 px-3.5 py-1 rounded-full border border-blue-200/30">
          Interactive Roadmap
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-3">
          Explore Our SDLC Timeline
        </h3>
        <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-2">
          Click any node below to inspect specific deliverables, milestones, and timeline expectations.
        </p>
      </div>

      {/* Timeline Nav Track */}
      <div className="relative w-full mb-12 py-6">
        {/* Continuous Horizontal Background Line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] bg-slate-100 dark:bg-slate-800 z-0 rounded-full" />
        
        {/* Filled active progress bar */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-[3px] bg-gradient-to-r from-blue-500 to-blue-600 z-0 rounded-full transition-all duration-500 ease-out" 
          style={{ 
            width: `${(TIMELINE_NODES.findIndex(node => node.id === activeStageId) / (TIMELINE_NODES.length - 1)) * 100}%` 
          }}
        />

        {/* Nodes Grid */}
        <div className="relative z-10 flex justify-between items-center max-w-4xl mx-auto px-4">
          {TIMELINE_NODES.map((node) => {
            const isActive = node.id === activeStageId;
            const index = TIMELINE_NODES.findIndex(n => n.id === node.id);
            const activeIndex = TIMELINE_NODES.findIndex(n => n.id === activeStageId);
            const isCompleted = index < activeIndex;

            return (
              <button
                key={node.id}
                onClick={() => handleNodeClick(node.id)}
                className="flex flex-col items-center group relative focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-full p-1"
                aria-label={`Show details for Stage ${node.stage}: ${node.title}`}
              >
                {/* Node Outer Wrapper with dynamic background highlights */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${
                  isActive 
                    ? 'bg-blue-600 border-blue-600 text-white scale-125 shadow-[0_0_15px_rgba(59,130,246,0.5)]' 
                    : isCompleted
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-600 group-hover:scale-110 group-hover:border-blue-500 group-hover:text-blue-500'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : node.icon}
                </div>

                {/* Stage Badge on Top */}
                <div className={`absolute -top-6 px-2 py-0.5 rounded text-[10px] font-mono font-black transition-colors ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-400 dark:text-slate-500'
                }`}>
                  STG {node.stage}
                </div>

                {/* Node Label (Responsive, Hidden on Extra Small screens) */}
                <span className={`hidden md:block absolute -bottom-7 font-sans text-[11px] font-black tracking-wide whitespace-nowrap transition-colors uppercase ${
                  isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300'
                }`}>
                  {node.title.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Info Display area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStageId}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-8 border-t border-slate-100 dark:border-slate-800"
        >
          {/* Main Info Card */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-[10px] font-mono font-black px-2.5 py-1 text-white bg-gradient-to-r ${activeStage.color} rounded-full uppercase tracking-widest`}>
                  Stage {activeStage.stage}
                </span>
                <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500">
                  {activeStage.duration}
                </span>
              </div>
              <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none mb-4">
                {activeStage.title}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                {activeStage.shortDesc}
              </p>
            </div>

            {/* Quick summary metric */}
            <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800">
              <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-mono text-[10px] font-black uppercase tracking-wider mb-2">
                <Milestone size={14} />
                <span>Primary Focus Parameter</span>
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                Our main objective here is establishing robust blueprint definitions & verification frameworks to ensure predictable development velocity.
              </p>
            </div>
          </div>

          {/* Deliverables Bullet List */}
          <div className="lg:col-span-7 bg-slate-50/50 dark:bg-slate-950/20 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <h5 className="text-[10px] font-mono font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block mb-4 border-b border-slate-200/60 dark:border-slate-800 pb-3">
                Action Items & Handover Items
              </h5>
              <div className="space-y-3.5">
                {activeStage.fullDetails.map((detail, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    key={idx} 
                    className="flex items-start gap-3.5"
                  >
                    <div className={`w-5 h-5 rounded-md bg-gradient-to-r ${activeStage.color} flex items-center justify-center text-white shrink-0 mt-0.5 text-[9px] font-black`}>
                      {idx + 1}
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-300 leading-snug">
                      {detail}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-slate-400 dark:text-slate-500">
                Guaranteed Quality Handover
              </span>
              <button 
                onClick={() => {
                  const contactEl = document.getElementById('contact');
                  if (contactEl) {
                    contactEl.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.hash = 'contact';
                  }
                }}
                className="flex items-center gap-1.5 text-xs font-mono font-black text-blue-600 dark:text-blue-400 hover:text-blue-700"
              >
                <span>Initiate Project</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
