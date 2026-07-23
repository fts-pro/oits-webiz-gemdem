import React, { useState } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  enableSearch?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ 
  items, 
  className = "", 
  enableSearch = true 
}) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredItems = items.filter(item => 
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {enableSearch && (
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or keywords..."
            className="w-full pl-11 pr-10 py-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      )}

      {filteredItems.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            No matching questions found for "{searchQuery}".
          </p>
          <button 
            onClick={() => setSearchQuery("")}
            className="mt-3 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div 
                key={item.id} 
                className="border border-slate-200 dark:border-slate-800/80 rounded-2xl overflow-hidden transition-all duration-300 bg-white dark:bg-slate-900 shadow-sm hover:border-blue-500/30"
              >
                <button 
                  id={`accordion-button-${item.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`accordion-panel-${item.id}`}
                  onClick={() => toggleItem(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleItem(item.id);
                    }
                  }}
                  className="w-full flex items-center justify-between p-6 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors"
                >
                  <span className={`font-bold text-base md:text-lg transition-colors pr-4 ${isOpen ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400'}`}>
                    {item.question}
                  </span>
                  <div className={`p-2 rounded-xl transition-all duration-300 shrink-0 ${isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-blue-50 dark:group-hover:bg-slate-700'}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                <div 
                  id={`accordion-panel-${item.id}`}
                  role="region"
                  aria-labelledby={`accordion-button-${item.id}`}
                  className={`transition-all duration-400 ease-in-out ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                >
                  <div className="p-6 pt-0 border-t border-slate-100 dark:border-slate-800/60 mt-1">
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base font-medium">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
