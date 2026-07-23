import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, X, Send, CheckCircle2, DollarSign, Layers } from 'lucide-react';
import { Toast } from './ui/Toast';
import { SERVICES } from '../constants';

export const QuickQuoteModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: SERVICES[0]?.title || 'Custom Software Development',
    budget: '$15k - $50k',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Valid email is required';
    }
    if (!formData.message.trim()) errs.message = 'Brief project summary required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsOpen(false);
      setShowToast(true);
      setFormData({
        name: '',
        email: '',
        service: SERVICES[0]?.title || 'Custom Software Development',
        budget: '$15k - $50k',
        message: ''
      });
      setErrors({});
    }, 1200);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 z-[90] flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-mono font-black text-xs uppercase tracking-wider shadow-2xl shadow-blue-600/30 border border-blue-400/30 hover:from-blue-500 hover:to-indigo-500 transition-all focus-visible:ring-2 focus-visible:ring-blue-400 outline-none group"
        aria-label="Request a Quick Quote"
      >
        <Zap size={16} className="fill-current text-yellow-300 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">Quick Quote</span>
      </motion.button>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-6 sm:p-8 max-w-lg w-full shadow-2xl relative my-8"
              role="dialog"
              aria-modal="true"
              aria-labelledby="quick-quote-title"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 outline-none"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-mono text-[10px] font-black uppercase tracking-[0.25em] mb-2">
                <Zap size={14} className="fill-current text-yellow-500" />
                <span>Instant Estimate</span>
              </div>

              <h3 id="quick-quote-title" className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                Request a Quick Quote
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium mb-6">
                Receive an initial architectural scope & timeline estimate within 12 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border rounded-2xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-colors ${
                      errors.name ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.name && <p className="text-[10px] font-mono text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@company.com"
                    className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border rounded-2xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-colors ${
                      errors.email ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.email && <p className="text-[10px] font-mono text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Service Line
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="IT Consulting">IT Consulting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                      Estimated Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    >
                      <option value="$5k - $15k">$5k - $15k</option>
                      <option value="$15k - $50k">$15k - $50k</option>
                      <option value="$50k - $100k">$50k - $100k</option>
                      <option value="$100k+">$100k+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Brief Project Scope *
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe key goals, platform targets, and target completion timeline..."
                    className={`w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border rounded-2xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium transition-colors resize-none ${
                      errors.message ? 'border-red-500' : 'border-slate-200 dark:border-slate-800'
                    }`}
                  />
                  {errors.message && <p className="text-[10px] font-mono text-red-500 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-2xl font-mono font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Submit Request</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showToast && (
        <Toast
          message="Quote request received! Our engineering team will deliver your initial proposal within 12 hours."
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
};
