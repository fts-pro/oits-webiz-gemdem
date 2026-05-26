import React, { useState } from 'react';

interface TooltipProps {
  content: string | React.ReactNode;
  children: React.ReactNode;
  delay?: number;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  delay = 100,
  position = 'top',
}) => {
  const [active, setActive] = useState(false);
  let timeout: any;

  const showTip = () => {
    timeout = setTimeout(() => {
      setActive(true);
    }, delay);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-3',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-3',
    left: 'right-full top-1/2 -translate-y-1/2 mr-3',
    right: 'left-full top-1/2 -translate-y-1/2 ml-3',
  };

  const arrowStyles = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-slate-950 dark:border-t-slate-800 border-x-transparent border-x-[6px] border-t-[6px] border-b-0',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-slate-950 dark:border-b-slate-800 border-x-transparent border-x-[6px] border-b-[6px] border-t-0',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-slate-950 dark:border-l-slate-800 border-y-transparent border-y-[6px] border-l-[6px] border-r-0',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-slate-950 dark:border-r-slate-800 border-y-transparent border-y-[6px] border-r-[6px] border-l-0',
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
      onFocus={showTip}
      onBlur={hideTip}
    >
      {children}
      {active && (
        <div
          className={`absolute z-[100] w-72 p-4 text-xs font-bold text-slate-100 bg-slate-950 dark:bg-slate-850 rounded-2xl shadow-2xl border border-slate-800/80 pointer-events-none transition-all duration-300 animate-in fade-in zoom-in-95 cursor-default ${positionStyles[position]}`}
          role="tooltip"
        >
          <div className="leading-relaxed whitespace-normal break-words">{content}</div>
          <div className={`absolute ${arrowStyles[position]} w-0 h-0 border-solid`} />
        </div>
      )}
    </div>
  );
};
