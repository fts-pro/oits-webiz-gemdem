import React, { useState, useEffect } from 'react';
import { Clock, ShieldCheck, Zap, AlertCircle, Headphones } from 'lucide-react';

export const SupportStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [dayName, setDayName] = useState<string>('');

  useEffect(() => {
    const updateTimeAndStatus = () => {
      // Get current date/time in Dhaka timezone (GMT+6)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };

      const dayOptions: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dhaka',
        weekday: 'long',
      };

      const now = new Date();
      const timeStr = new Intl.DateTimeFormat('en-US', options).format(now);
      const dayStr = new Intl.DateTimeFormat('en-US', dayOptions).format(now);

      setCurrentTime(timeStr);
      setDayName(dayStr);

      // Extract hour in 24h format for Dhaka timezone
      const dhakaHourStr = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: 'numeric',
        hour12: false,
      }).format(now);

      const dhakaHour = parseInt(dhakaHourStr, 10);

      // Business hours: Mon-Fri, 9am - 6pm (09:00 - 18:00)
      const isWeekday = !['Saturday', 'Sunday'].includes(dayStr);
      const isWithinHours = dhakaHour >= 9 && dhakaHour < 18;

      setIsOnline(isWeekday && isWithinHours);
    };

    updateTimeAndStatus();
    const interval = setInterval(updateTimeAndStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden transition-all shadow-sm hover:border-blue-500/30">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
            <Headphones size={20} />
          </div>
          <div>
            <span className="text-[10px] font-mono font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest block">
              Engineering Support Status
            </span>
            <h4 className="text-lg font-black text-slate-900 dark:text-white">
              Live Desk Status
            </h4>
          </div>
        </div>

        {/* Live Pulse Badge */}
        <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full font-mono text-xs font-black uppercase tracking-wider border ${
          isOnline 
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' 
            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
        }`}>
          <span className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOnline ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isOnline ? 'bg-emerald-500' : 'bg-amber-500'}`} />
          </span>
          <span>{isOnline ? 'ONLINE' : 'AFTER HOURS (ASYNC)'}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
        <div className="flex items-center gap-3 bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800">
          <Clock size={18} className="text-blue-600 dark:text-blue-400 shrink-0" />
          <div>
            <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase">Dhaka Time (GMT+6)</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
              {currentTime ? `${dayName}, ${currentTime}` : 'Loading time...'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800">
          <Zap size={18} className="text-yellow-500 shrink-0" />
          <div>
            <span className="text-[10px] font-mono text-slate-400 block font-bold uppercase">Expected Initial Response</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
              {isOnline ? '< 15 Minutes' : 'Next Business Morning (09:00 BST)'}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
        <ShieldCheck size={14} className="text-blue-600 dark:text-blue-400 shrink-0" />
        <span>SLA Managed Clients have 24/7 priority emergency dispatch via dedicated portal.</span>
      </div>
    </div>
  );
};
