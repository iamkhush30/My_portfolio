"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { ArrowDown } from 'lucide-react';
import { RippleButton } from '@/shared/ui/ripple-button';

export const PotentialSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('potential-section');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalDist = windowHeight + rect.height;
      const currentDist = windowHeight - rect.top;
      const rawProgress = currentDist / totalDist;

      const clampedProgress = Math.max(0, Math.min(1, rawProgress));
      setScrollProgress(clampedProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const needleRotation = -110 + (scrollProgress * 220);

  const ticks = useMemo(() => {
    const round = (n: number) => parseFloat(n.toFixed(4));
    return Array.from({ length: 51 }).map((_, i) => {
      const angle = -200 + (i * 4.4);
      const isMajor = i % 10 === 0;
      const length = isMajor ? 18 : 8;

      const radius = 180;
      const x1 = round(250 + radius * Math.cos((angle * Math.PI) / 180));
      const y1 = round(250 + radius * Math.sin((angle * Math.PI) / 180));
      const x2 = round(250 + (radius - length) * Math.cos((angle * Math.PI) / 180));
      const y2 = round(250 + (radius - length) * Math.sin((angle * Math.PI) / 180));

      const distanceFromCenter = Math.abs(i - 25);
      const edgeFade = Math.max(0, 1 - (distanceFromCenter / 25));
      const tickProgress = i / 50;
      const isActive = scrollProgress >= tickProgress;

      return { x1, y1, x2, y2, isMajor, isActive, i, edgeFade };
    });
  }, [scrollProgress]);

  return (
    <div id="potential-section" className="relative z-10 flex flex-col items-center justify-center overflow-visible py-6">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #0F172A 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        <div className="w-full text-center mb-10 pointer-events-none">
          <h2 className="text-display select-none text-[#0F172A] tracking-wide">
            Working To Full Potential
          </h2>
        </div>

        <div className="relative w-full max-w-7xl aspect-[2/1] md:aspect-[2.8/1] flex items-end justify-center overflow-hidden">

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center justify-center text-center gap-8 w-full max-w-sm md:max-w-md">
              <p className="text-quote text-center text-[#475569] max-w-[320px]">
                Pushing toward Sharper designs, more reliable systems, deeper 
                
                understanding. The gauge never stays still.
              </p>

            <div className="flex items-center justify-center w-full">
              <RippleButton className="pill-btn group h-14 px-10 rounded-[45px] border-2 border-[#333] bg-[#111] cursor-pointer overflow-hidden outline-none flex items-center justify-center gap-4 transition-all duration-200 min-w-[200px]">
                <div className="relative z-20 flex items-center gap-4 pill-text transition-colors duration-700 group-hover:text-[#111]">
                  <span className="text-button lowercase tracking-widest text-[#F5F5F7]">Resume</span>
                  <div className="w-6 h-6 bg-[#F5F5F7] rounded-full flex items-center justify-center transition-colors duration-700">
                    <ArrowDown className="text-[#2563EB] w-4 h-4" />
                  </div>
                </div>
              </RippleButton>
            </div>
          </div>

          <div className="absolute inset-0 flex items-end justify-center">
            <svg viewBox="0 70 500 180" className="w-full h-full relative z-10">
              {ticks.map((tick) => (
                <line
                  key={tick.i}
                  x1={tick.x1} y1={tick.y1} x2={tick.x2} y2={tick.y2}
                  stroke="currentColor"
                  strokeWidth={tick.isMajor ? "2.5" : "1"}
                  strokeOpacity={tick.isActive ? tick.edgeFade : tick.edgeFade * 0.3}
                  className="transition-all duration-200 ease-out text-[#0F172A]"
                />
              ))}
            </svg>
          </div>

          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] aspect-square pointer-events-none z-[15] transition-transform duration-200 ease-out"
            style={{
              transformOrigin: '50% 100%',
              transform: `translateX(-50%) rotate(${needleRotation}deg)`,
              background: `conic-gradient(from -2deg at 50% 50%, transparent 0deg, rgba(37, 99, 235, 0.05) 2deg, transparent 4deg)`,
              maskImage: 'radial-gradient(circle at 50% 100%, black 0%, black 36%, transparent 37%)',
              WebkitMaskImage: 'radial-gradient(circle at 50% 100%, black 0%, black 36%, transparent 37%)',
            }}
          />

          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 origin-bottom w-[2px] h-full transition-transform duration-200 ease-out z-20 flex flex-col items-center"
            style={{ transform: `translateX(-50%) rotate(${needleRotation}deg)` }}
          >
            {/* Needle line with gradient */}
            <div className="w-full h-full bg-gradient-to-t from-[#2563EB]/40 via-[#2563EB] to-[#2563EB] shadow-[0_0_12px_rgba(37,99,235,0.6)]"></div>
          </div>


        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute -bottom-px left-0 right-0 h-16 md:h-24 pointer-events-none z-[1]"
        style={{
          background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.96) 22%, rgba(255,255,255,0.75) 55%, rgba(255,255,255,0) 100%)',
        }}
      />
    </div>
  );
};
