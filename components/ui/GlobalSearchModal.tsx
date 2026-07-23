import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Layers, Code, Terminal, HelpCircle, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { SERVICES, PROJECTS, PROCESS_STEPS } from '../../constants';

interface SearchResultItem {
  id: string;
  type: 'service' | 'portfolio' | 'process' | 'faq';
  title: string;
  description: string;
  category?: string;
  link: string;
}

const FAQ_INDEX: SearchResultItem[] = [
  {
    id: 'faq-1',
    type: 'faq',
    title: 'How do you handle project timelines and estimation?',
    description: 'We provide detailed fixed-scope estimation after Stage 01 Discovery. Agile sprints deliver testable builds bi-weekly.',
    category: 'Process & SLA',
    link: '/services#faq',
  },
  {
    id: 'faq-2',
    type: 'faq',
    title: 'What tech stacks do you specialize in?',
    description: 'TypeScript, React, Node.js, Next.js, Python, PostgreSQL, AWS, GCP, Cloud SQL, Docker, and Kubernetes.',
    category: 'Technology',
    link: '/services#faq',
  },
  {
    id: 'faq-3',
    type: 'faq',
    title: 'Do you offer SLA-backed post-launch maintenance?',
    description: 'Yes. All enterprise deployments include 24/7 uptime monitoring, security updates, and guaranteed response SLAs.',
    category: 'Support & Maintenance',
    link: '/contact',
  },
  {
    id: 'faq-4',
    type: 'faq',
    title: 'How are IP rights and code ownership handled?',
    description: '100% full intellectual property and source code ownership transfer upon project sign-off and milestone delivery.',
    category: 'Legal & Security',
    link: '/services#faq',
  },
];

const CATEGORIES = [
  { id: 'all', label: 'All Results' },
  { id: 'service', label: 'Services' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'process', label: 'Workflow' },
  { id: 'faq', label: 'FAQs' },
];

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Helper to highlight matching keywords safely
const HighlightMatch: React.FC<{ text: string; query: string }> = ({ text, query }) => {
  if (!query.trim()) return <span>{text}</span>;

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            key={i}
            className="bg-blue-500/25 text-blue-700 dark:text-blue-300 font-extrabold px-1 py-0.5 rounded"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Build indexed items
  const indexedItems: SearchResultItem[] = [
    ...SERVICES.map((s) => ({
      id: `service-${s.id}`,
      type: 'service' as const,
      title: s.title,
      description: s.description,
      category: s.badge || 'Service Line',
      link: `/services?id=${s.id}`,
    })),
    ...PROJECTS.map((p) => ({
      id: `project-${p.id}`,
      type: 'portfolio' as const,
      title: p.title,
      description: `${p.description} - Tech: ${p.tech.join(', ')}`,
      category: p.category,
      link: '/portfolio',
    })),
    ...PROCESS_STEPS.map((step) => ({
      id: `step-${step.id}`,
      type: 'process' as const,
      title: `Stage ${step.number}: ${step.title}`,
      description: step.description,
      category: 'Workflow Stage',
      link: '/#process',
    })),
    ...FAQ_INDEX,
  ];

  // Filter items based on search query and active category
  const filteredResults = indexedItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory;
    if (!query.trim()) return matchesCategory;

    const q = query.toLowerCase();
    const matchesQuery =
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      (item.category && item.category.toLowerCase().includes(q));

    return matchesCategory && matchesQuery;
  });

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
      setSelectedCategory('all');
    }
  }, [isOpen]);

  // Global Keyboard Shortcuts (Cmd+K / Ctrl+K / Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open search modal
          const searchBtn = document.querySelector('[aria-label="Search services and portfolio"]') as HTMLButtonElement;
          if (searchBtn) searchBtn.click();
        }
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (filteredResults.length > 0 ? (prev + 1) % filteredResults.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (filteredResults.length > 0 ? (prev - 1 + filteredResults.length) % filteredResults.length : 0));
      } else if (e.key === 'Enter') {
        if (filteredResults[selectedIndex]) {
          e.preventDefault();
          const targetItem = filteredResults[selectedIndex];
          onClose();
          navigate(targetItem.link);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, navigate, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] bg-slate-950/75 backdrop-blur-2xl flex items-start justify-center pt-16 md:pt-24 px-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: -20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: -20, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 my-auto shadow-[0_0_80px_rgba(37,99,235,0.2)]"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          {/* Header Search Input */}
          <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4 relative">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <Search size={22} />
            </div>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Search services, stack, case studies, or FAQs..."
              className="w-full bg-transparent border-none focus:ring-0 text-lg md:text-xl font-bold text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={18} />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              aria-label="Close search"
            >
              <X size={20} />
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="px-6 md:px-8 py-3 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 flex items-center gap-2 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedIndex(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200/60 dark:border-slate-700/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-6 md:p-8 space-y-3 custom-scrollbar">
            {filteredResults.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                  <Search size={28} />
                </div>
                <p className="text-base font-bold text-slate-700 dark:text-slate-300">
                  No matches found for "{query}"
                </p>
                <p className="text-xs text-slate-400">
                  Try searching for keywords like <span className="text-blue-500 font-mono">React</span>, <span className="text-blue-500 font-mono">Cloud</span>, <span className="text-blue-500 font-mono">Agile</span>, or <span className="text-blue-500 font-mono">SLA</span>.
                </p>
              </div>
            ) : (
              filteredResults.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                const getTypeIcon = () => {
                  switch (item.type) {
                    case 'service':
                      return <Layers size={18} />;
                    case 'portfolio':
                      return <Code size={18} />;
                    case 'process':
                      return <Terminal size={18} />;
                    case 'faq':
                      return <HelpCircle size={18} />;
                  }
                };

                return (
                  <Link
                    key={item.id}
                    to={item.link}
                    onClick={onClose}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`block p-5 rounded-2xl border transition-all duration-200 ${
                      isSelected
                        ? 'bg-blue-600 text-white border-blue-500 shadow-xl shadow-blue-500/20 scale-[1.01]'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800/80 text-slate-900 dark:text-white hover:border-blue-500/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          }`}
                        >
                          {getTypeIcon()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                isSelected
                                  ? 'bg-white/20 text-white'
                                  : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                              }`}
                            >
                              {item.category || item.type}
                            </span>
                          </div>
                          <h4 className="font-extrabold text-base leading-snug">
                            <HighlightMatch text={item.title} query={query} />
                          </h4>
                          <p
                            className={`text-xs mt-1.5 leading-relaxed line-clamp-2 ${
                              isSelected ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'
                            }`}
                          >
                            <HighlightMatch text={item.description} query={query} />
                          </p>
                        </div>
                      </div>
                      <ArrowRight
                        size={18}
                        className={`shrink-0 transition-transform ${
                          isSelected ? 'translate-x-1 text-white' : 'text-slate-400'
                        }`}
                      />
                    </div>
                  </Link>
                );
              })
            )}
          </div>

          {/* Footer Shortcuts Bar */}
          <div className="p-4 bg-slate-100 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 px-6">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border rounded text-[10px] font-bold shadow-xs">↑↓</kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border rounded text-[10px] font-bold shadow-xs flex items-center">
                  <CornerDownLeft size={10} />
                </kbd>
                Select
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border rounded text-[10px] font-bold shadow-xs">ESC</kbd>
              Close
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
