import { useMemo } from 'react';

import { cn } from '@/lib/utils';

export const Meteors = ({ number = 20, className }: { number?: number; className?: string }) => {
  const meteors = useMemo(() => {
    return Array.from({ length: number }).map(() => ({
      left: Math.floor(Math.random() * 800) - 400, // Range: [-400, 400]
      animationDelay: Math.random() * (0.8 - 0.2) + 0.2, // Range: [0.2s, 0.8s]
      animationDuration: Math.floor(Math.random() * (10 - 2) + 2) // Range: [2s, 10s]
    }));
  }, [number]); // Only recompute when `number` changes

  return (
    <>
      {meteors.map((meteor, idx) => (
        <span
          key={`meteor${idx}`}
          className={cn(
            'animate-meteor-effect absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]',
            "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
            className
          )}
          style={{
            top: -2,
            left: `${meteor.left}px`,
            animationDelay: `${meteor.animationDelay}s`,
            animationDuration: `${meteor.animationDuration}s`
          }}
        ></span>
      ))}
    </>
  );
};
