
"use client";

import React from 'react';
import { Palette, Server, Cpu, MousePointer2, Activity } from 'lucide-react';

export const HybridVisual = () => {
  return (
    <div className="relative w-full aspect-square max-w-[550px] mx-auto flex items-center justify-center group">
      {/* Rotating Measurement & Sync Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[95%] h-[95%] border border-primary/5 rounded-full animate-spin-slow opacity-20"></div>
        <div className="absolute w-[75%] h-[75%] border border-dashed border-primary/10 rounded-full animate-reverse-spin opacity-40"></div>
        <div className="absolute w-[55%] h-[55%] border-t border-primary/40 rounded-full animate-spin-fast"></div>
        
        {/* Radar Sweep Effect */}
        <div className="absolute w-[45%] h-[45%] rounded-full bg-conic-gradient from-primary/5 to-transparent animate-spin-slow"></div>
      </div>

      {/* Central "Core" - Squarish Redesign */}
      <div className="relative z-40 w-48 h-48 bg-white/95 backdrop-blur-3xl border border-primary/20 shadow-[0_32px_100px_-20px_rgba(37,21,216,0.3)] rounded-[3rem] flex items-center justify-center group-hover:scale-110 transition-transform duration-1000 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/20"></div>
        
        <div className="relative flex flex-col items-center gap-3">
           <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <Cpu className="w-10 h-10 text-primary animate-pulse" />
           </div>
           <div className="flex flex-col items-center">
             <span className="text-[10px] font-black text-primary tracking-[0.4em] uppercase">Core_System</span>
             <div className="w-12 h-1 bg-primary/20 mt-2 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-1/2 animate-progress-slide"></div>
             </div>
           </div>
        </div>
      </div>

      {/* DISCIPLINE NODES - Balanced layout with primary and secondary hierarchy */}

      {/* Node 1: UI/UX DESIGN (Top Primary - Small Satellite) */}
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
        <div className="p-3 bg-white border border-primary/10 rounded-xl shadow-lg animate-float-slow backdrop-blur-md flex flex-col gap-2 min-w-[160px]">
           <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-primary" />
                <span className="text-[9px] font-black text-[#1A1A1A] uppercase tracking-wider">UI/UX DESIGN</span>
              </div>
           </div>
           
           <div className="flex items-center justify-between border-t border-primary/5 pt-1.5">
             <div className="flex gap-1">
               {[1, 2, 3].map(i => (
                 <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: `hsl(var(--primary) / ${i * 0.3})` }} />
               ))}
             </div>
             <MousePointer2 className="w-3 h-3 text-primary/30" />
           </div>
        </div>
        <div className="w-px h-12 bg-gradient-to-t from-primary/30 to-transparent"></div>
      </div>

      {/* Node 3: DEVOPS (Bottom Right Primary - Small Satellite) */}
      <div className="absolute bottom-[10%] right-[5%] z-30 flex flex-col items-center">
        <div className="w-px h-12 bg-gradient-to-b from-primary/30 to-transparent mb-1 -rotate-[30deg] origin-top"></div>
        <div className="p-3 bg-white border border-primary/10 rounded-xl shadow-lg animate-float-delayed flex flex-col gap-2 min-w-[160px]">
           <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-primary" />
                <span className="text-[9px] font-black text-[#1A1A1A] uppercase tracking-wider">DEVOPS</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
           </div>
           
           <div className="flex items-center justify-between px-1.5 py-0.5 bg-primary/5 rounded border border-primary/5">
              <Activity className="w-2.5 h-2.5 text-primary/30" />
              <span className="text-[8px] font-black text-primary">12ms</span>
           </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes spin-fast {
          from { transform: rotate(0deg); }
          to { transform: rotate(720deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(5px, -10px) rotate(1deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-8px, 8px) rotate(-1.5deg); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(4px, 6px); }
        }
        @keyframes progress-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-spin-slow { animation: spin-slow 25s linear infinite; }
        .animate-reverse-spin { animation: reverse-spin 18s linear infinite; }
        .animate-spin-fast { animation: spin-fast 8s linear infinite; }
        .animate-float-slow { animation: float-slow 8s infinite ease-in-out; }
        .animate-float-delayed { animation: float-delayed 10s infinite ease-in-out; animation-delay: 1.5s; }
        .animate-float { animation: float 7s infinite ease-in-out; }
        .animate-progress-slide { animation: progress-slide 3s infinite linear; }
        .bg-conic-gradient {
          background-image: conic-gradient(var(--tw-gradient-from), var(--tw-gradient-to));
        }
      `}</style>
    </div>
  );
};
