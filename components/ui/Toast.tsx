import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  type = 'success', 
  onClose, 
  duration = 5000 
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-500 shrink-0" />
  };

  const borders = {
    success: 'border-emerald-500/30 bg-emerald-50/95 dark:bg-slate-900/95 text-emerald-950 dark:text-emerald-50',
    error: 'border-red-500/30 bg-red-50/95 dark:bg-slate-900/95 text-red-950 dark:text-red-50',
    info: 'border-blue-500/30 bg-blue-50/95 dark:bg-slate-900/95 text-blue-950 dark:text-blue-50'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      role="status"
      aria-live="polite"
      className={`fixed bottom-8 right-8 z-[1002] flex items-center gap-3.5 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md max-w-sm md:max-w-md ${borders[type]}`}
    >
      <div className="flex items-center gap-3 flex-1">
        {icons[type]}
        <p className="font-sans font-bold text-xs md:text-sm tracking-tight leading-snug">
          {message}
        </p>
      </div>
      <button 
        onClick={onClose} 
        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 rounded-lg focus-visible:ring-2 focus-visible:ring-blue-500 outline-none"
        aria-label="Close notification"
      >
        <X size={15} />
      </button>
    </motion.div>
  );
};
