import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering over interactive element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = !!target.closest(
          'a, button, input, textarea, select, [role="button"], .group, [data-hover="true"]'
        );
        setIsHovered(isInteractive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-blue-500/60 dark:border-blue-400/80 pointer-events-none mix-blend-difference"
        animate={{
          x: position.x - (isHovered ? 24 : 16),
          y: position.y - (isHovered ? 24 : 16),
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          scale: isClicking ? 0.8 : 1,
          backgroundColor: isHovered ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 350,
          mass: 0.2,
        }}
      />

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-blue-600 dark:bg-blue-400 pointer-events-none"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
          width: isHovered ? 8 : 6,
          height: isHovered ? 8 : 6,
          opacity: isHovered ? 0.9 : 0.7,
        }}
        transition={{
          type: 'spring',
          damping: 40,
          stiffness: 500,
          mass: 0.1,
        }}
      />
    </div>
  );
};
