"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
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

  // Limit visual progress to 95% so needle and ticks don't reach the absolute arc end
  const cappedProgress = Math.min(Math.max(0, scrollProgress), 1) * 0.92;
  const gaugeSweepDeg = cappedProgress * 220;
  const needleRotation = -110 + gaugeSweepDeg;

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
      const isActive = cappedProgress >= tickProgress;

      return { x1, y1, x2, y2, isMajor, isActive, i, edgeFade };
    });
  }, [scrollProgress]);

  return (
    <div id="potential-section" className="relative z-10 flex flex-col items-center justify-center overflow-visible py-4 sm:py-6">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #0F172A 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-12 relative z-10 flex flex-col items-center w-full">
        <div className="w-full text-center mb-8 pointer-events-none">
          <h2 className="select-none text-[#0F172A] tracking-wide text-[clamp(24px,8vw,30px)] sm:text-display">
            Working To Full Potential
          </h2>
        </div>

        <div className="relative w-[min(86vw,340px)] sm:w-full aspect-square sm:aspect-[2/1] md:aspect-[2.5/1] lg:aspect-[2.8/1] flex items-end justify-center overflow-hidden max-h-[360px] sm:max-h-[600px] md:max-h-[700px] mx-auto">

          <div className="absolute bottom-1 sm:bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center justify-center text-center gap-2 sm:gap-4 md:gap-8 w-full max-w-xs px-2">
            <p className="text-center text-[#475569] max-w-[260px] sm:max-w-[300px] md:max-w-[320px] leading-tight sm:leading-normal text-[clamp(12px,4vw,13px)] sm:text-quote">
              Pushing toward Sharper designs, more reliable systems, deeper understanding. The gauge never stays still.
            </p>

            <div className="flex items-center justify-center w-full">
              <RippleButton className="pill-btn group h-7 sm:h-10 md:h-12 lg:h-14 w-fit max-w-[160px] sm:max-w-none px-3 sm:px-6 md:px-8 lg:px-10 rounded-[45px] border-2 border-[#333] bg-[#111] cursor-pointer overflow-hidden outline-none flex items-center justify-center gap-1.5 sm:gap-3 md:gap-4 transition-all duration-200">
                <span className="whitespace-nowrap text-[#F5F5F7] text-[clamp(11px,3.5vw,12px)] sm:text-button">Resume</span>
                <ArrowRight className="text-white w-2.5 h-2.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </RippleButton>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <svg viewBox="0 70 500 180" preserveAspectRatio="xMidYMid meet" className="w-full h-full relative z-10">
              <defs>
                <linearGradient id="needle-gradient" x1="250" y1="250" x2="250" y2="70" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.35" />
                  <stop offset="45%" stopColor="#2563EB" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="1" />
                </linearGradient>

                <radialGradient id="needle-fan-gradient" cx="250" cy="250" r="185" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
                  <stop offset="55%" stopColor="#60A5FA" stopOpacity="0.18" />
                  <stop offset="85%" stopColor="#93C5FD" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#BFDBFE" stopOpacity="0" />
                </radialGradient>

                <filter id="needle-depth-shadow" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
                  <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#0F172A" floodOpacity="0.34" />
                  <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#2563EB" floodOpacity="0.18" />
                </filter>

                <filter id="sweep-blur" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>

                <linearGradient id="needle-fan-gradient" x1="210" y1="250" x2="250" y2="250" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#93C5FD" stopOpacity="0" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.55" />
                </linearGradient>

                <linearGradient id="needle-fan-fade-bottom" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="100%" stopColor="white" stopOpacity="1" />
                </linearGradient>


                <linearGradient id="needle-fan-fade-bottom-real" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>

                <filter id="fan-blur" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="14" />
                </filter>
                <filter id="fan-blur" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="14" />
                </filter>

                {/* ADD BELOW 👇 */}
                <linearGradient id="fog-fade-bottom" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="white" stopOpacity="1" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>

                <mask id="needle-fan-mask">
                  <rect x="0" y="70" width="500" height="100" fill="white" />
                  <rect x="0" y="170" width="500" height="80" fill="url(#fog-fade-bottom)" />
                </mask>

                <clipPath id="fog-clip-behind">
                  <path d={(() => {
                    const cx = 250, cy = 250, r = 300;
                    const startAngleDeg = -200;
                    const sweepDeg = gaugeSweepDeg;
                    const startRad = (startAngleDeg * Math.PI) / 180;
                    const endRad = ((startAngleDeg + sweepDeg) * Math.PI) / 180;
                    const x1 = cx + r * Math.cos(startRad);
                    const y1 = cy + r * Math.sin(startRad);
                    const x2 = cx + r * Math.cos(endRad);
                    const y2 = cy + r * Math.sin(endRad);
                    const largeArc = sweepDeg > 180 ? 1 : 0;
                    return `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
                  })()} />
                </clipPath>




                <clipPath id="gauge-clip">
                  <rect x="0" y="70" width="500" height="180" />
                </clipPath>
              </defs>

              {/* Gradient sweep arc behind the needle */}
              {cappedProgress > 0.01 && (() => {
                const cx = 250, cy = 250, r = 175;
                const startAngleDeg = -200; // gauge start angle
                const sweepDeg = gaugeSweepDeg; // how far to sweep
                const endAngleDeg = startAngleDeg + sweepDeg;

                const startRad = (startAngleDeg * Math.PI) / 180;
                const endRad = (endAngleDeg * Math.PI) / 180;

                const x1 = cx + r * Math.cos(startRad);
                const y1 = cy + r * Math.sin(startRad);
                const x2 = cx + r * Math.cos(endRad);
                const y2 = cy + r * Math.sin(endRad);

                const largeArc = sweepDeg > 180 ? 1 : 0;

                const d = [
                  `M ${cx} ${cy}`,
                  `L ${x1.toFixed(2)} ${y1.toFixed(2)}`,
                  `A ${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`,
                  `Z`
                ].join(' ');

                return (
                  <path
                    d={d}
                    fill="url(#sweep-gradient)"
                    filter="url(#sweep-blur)"
                    opacity={Math.min(1, cappedProgress * 2.5)}
                    className="transition-opacity duration-300"
                  />
                );
              })()}

              {ticks.map((tick) => (
                <line
                  key={tick.i}
                  x1={tick.x1} y1={tick.y1} x2={tick.x2} y2={tick.y2}
                  stroke="currentColor"
                  strokeWidth={tick.isMajor ? "2.2" : "1"}
                  strokeLinecap="round"
                  strokeOpacity={tick.isActive ? tick.edgeFade : tick.edgeFade * 0.3}
                  className="transition-all duration-200 ease-out text-[#0F172A]"
                />
              ))}

              {cappedProgress > 0.01 && (() => {
                const cx = 250, cy = 250, r = 185;
                const startAngleDeg = -200;
                const sweepDeg = gaugeSweepDeg;
                const endAngleDeg = startAngleDeg + sweepDeg;
                const startRad = (startAngleDeg * Math.PI) / 180;
                const endRad = (endAngleDeg * Math.PI) / 180;
                const x1 = cx + r * Math.cos(startRad);
                const y1 = cy + r * Math.sin(startRad);
                const x2 = cx + r * Math.cos(endRad);
                const y2 = cy + r * Math.sin(endRad);
                const largeArc = sweepDeg > 180 ? 1 : 0;
                const d = `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;
                return (
                  <path
                    d={d}
                    fill="url(#needle-fan-gradient)"
                    filter="url(#fan-blur)"
                    mask="url(#needle-fan-mask)"
                    clipPath="url(#fog-clip-behind)"
                    opacity={Math.min(0.9, 0.3 + cappedProgress * 0.7)}
                  />
                );
              })()}

              <g transform={`rotate(${needleRotation} 250 250)`} filter="url(#needle-depth-shadow)">
                <line x1="250" y1="250" x2="250" y2="78" stroke="url(#needle-gradient)" strokeWidth="2.50" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                <circle cx="250" cy="70" r="1.2" fill="#93C5FD" opacity="0.0" />
              </g>
            </svg>
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
