"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
}

export default function AnimatedCounter({ target, duration = 2, suffix = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const paused = useRef(false);
  const startTime = useRef(0);
  const elapsed = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          paused.current = false;
          startTime.current = performance.now() - elapsed.current;
          const animate = (now: number) => {
            if (paused.current) return;
            elapsed.current = now - startTime.current;
            const progress = Math.min(elapsed.current / (duration * 1000), 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) {
              rafRef.current = requestAnimationFrame(animate);
            }
          };
          rafRef.current = requestAnimationFrame(animate);
        } else if (!entry.isIntersecting && hasStarted) {
          paused.current = true;
          if (rafRef.current) cancelAnimationFrame(rafRef.current);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, hasStarted]);

  return (
    <div ref={ref} className="stat-number text-3xl md:text-4xl font-bold bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
      {count}{suffix}
    </div>
  );
}
