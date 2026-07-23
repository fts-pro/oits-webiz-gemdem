import React from 'react';
import { motion } from 'motion/react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  size?: number;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme, size = 20 }) => {
  const isDark = theme === 'dark';

  // Framer Motion Spring settings for fluid, high-end organic feel
  const springConfig = { type: 'spring', stiffness: 200, damping: 15 };

  // Sun and Moon paths, angles, and ray animations
  const sunTransform = {
    rotate: isDark ? 40 : 0,
    scale: isDark ? 0.8 : 1,
  };

  const centerCircleRadius = isDark ? 5 : 9;
  const centerCircleX = isDark ? 12 : 12;
  const centerCircleY = isDark ? 12 : 12;

  // Mask coordinates to cut out the crescent shape of the moon
  const maskX = isDark ? 16 : 28;
  const maskY = isDark ? 8 : 0;
  const maskRadius = isDark ? 6 : 0;

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-full transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 active:scale-95 text-slate-800 dark:text-yellow-400 focus-visible:ring-2 focus-visible:ring-blue-500 outline-none flex items-center justify-center shrink-0"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={sunTransform}
        transition={springConfig}
        className="cursor-pointer"
      >
        <mask id="theme-toggle-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <motion.circle
            cx={maskX}
            cy={maskY}
            r={maskRadius}
            fill="black"
            transition={springConfig}
          />
        </mask>

        {/* Center body (Sun base or Moon crescent) */}
        <motion.circle
          cx={centerCircleX}
          cy={centerCircleY}
          r={centerCircleRadius}
          mask="url(#theme-toggle-mask)"
          fill="currentColor"
          transition={springConfig}
        />

        {/* Sun Rays */}
        <g stroke="currentColor" className="origin-center">
          {/* We render 8 rays that spring out when transitioning to light mode */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => {
            const rad = (angle * Math.PI) / 180;
            const cos = Math.cos(rad);
            const sin = Math.sin(rad);
            // Starting point on the center circle
            const x1 = 12 + cos * 5;
            const y1 = 12 + sin * 5;
            // Endpoint of the ray
            const x2 = 12 + cos * 9;
            const y2 = 12 + sin * 9;

            return (
              <motion.line
                key={angle}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: isDark ? 0 : 1,
                  scale: isDark ? 0 : 1,
                }}
                transition={{
                  ...springConfig,
                  delay: isDark ? 0 : index * 0.02,
                }}
                className="origin-center"
              />
            );
          })}
        </g>
      </motion.svg>
    </button>
  );
};
