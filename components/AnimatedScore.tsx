'use client';

import { useEffect, useState, useRef } from 'react';

interface AnimatedScoreProps {
  value: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function AnimatedScore({
  value,
  duration = 1500,
  className = '',
  style = {}
}: AnimatedScoreProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const frameRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (easeOutCubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Math.round(value * easeProgress));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    startTimeRef.current = undefined;
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value, duration]);

  return <span className={className} style={style}>{displayValue}%</span>;
}
