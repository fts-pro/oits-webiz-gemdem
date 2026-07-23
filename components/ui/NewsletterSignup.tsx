import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useSound } from '../SoundContext';
import { Check, Mail, Send, Loader2 } from 'lucide-react';

export const NewsletterSignup: React.FC = () => {
  const { playClickSound } = useSound();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'validating' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (input: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();

    if (!email) {
      setStatus('error');
      setErrorMessage('Email address is required.');
      return;
    }

    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid work email.');
      return;
    }

    setStatus('validating');
    
    // Simulate premium server ingestion delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setStatus('success');
    setEmail('');
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {status !== 'success' ? (
          <motion.form
            key="signup-form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="space-y-3 group/form"
            aria-label="Stay Informed Newsletter Form"
            noValidate
          >
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within/form:text-blue-500 transition-colors pointer-events-none">
                <Mail size={16} />
              </div>
              <input
                id="newsletter-email-input"
                type="email"
                required
                placeholder="Work email address"
                aria-label="Work email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                disabled={status === 'validating'}
                className={`w-full bg-slate-900 border ${
                  status === 'error' ? 'border-red-500/50 focus:border-red-500' : 'border-slate-800 focus:border-blue-500'
                } rounded-2xl pl-12 pr-6 py-4.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-600/10 transition-all duration-300`}
              />
              {/* Premium focused glow accent */}
              <div className="absolute inset-0 rounded-2xl border border-blue-500 opacity-0 peer-focus:opacity-100 transition-all duration-500 pointer-events-none scale-105 peer-focus:scale-100" />
            </div>

            {/* Live-announced error message block */}
            <AnimatePresence>
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-xs font-mono font-bold text-red-400 mt-1 pl-1"
                  role="alert"
                >
                  {errorMessage}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={status === 'validating'}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white disabled:bg-blue-800 disabled:cursor-not-allowed px-8 py-4.5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-2xl shadow-blue-600/10 active:scale-[0.98] flex items-center justify-center gap-2"
              aria-label={status === 'validating' ? 'Subscribing...' : 'Subscribe to insights'}
            >
              {status === 'validating' ? (
                <>
                  <Loader2 size={14} className="animate-spin text-white" />
                  <span>Securing Ingestion...</span>
                </>
              ) : (
                <>
                  <span>Subscribe to Insights</span>
                  <Send size={12} className="group-hover/form:translate-x-1 group-hover/form:-translate-y-0.5 transition-transform" />
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="signup-success"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 15 }}
            className="bg-slate-900 border border-emerald-500/30 rounded-[2rem] p-6 text-center space-y-4"
          >
            {/* Animated custom green check circle */}
            <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              >
                <Check className="text-emerald-400 w-6 h-6" />
              </motion.div>
            </div>
            
            <div className="space-y-1.5">
              <h5 className="text-white text-sm font-black tracking-tight uppercase font-mono">
                Ingestion Confirmed
              </h5>
              <p className="text-slate-400 text-xs font-semibold leading-relaxed">
                Welcome to our premium tech collective. Your work inbox has been secured for bi-weekly engineering briefings.
              </p>
            </div>

            <button
              onClick={() => {
                playClickSound();
                setStatus('idle');
              }}
              className="text-[9px] font-mono font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
              aria-label="Subscribe with another email"
            >
              Subscribe with another email
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
