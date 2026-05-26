import React, { useEffect, useRef, useState } from 'react';

interface AnimateScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // in milliseconds
  threshold?: number;
}

export const AnimateScroll: React.FC<AnimateScrollProps> = ({
  children,
  className = '',
  delay = 0,
  threshold = 0.1,
}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          // Once it intersects, stop observing
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.21,0.47,0.32,0.98)] transform ${
        isIntersecting
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};
