
"use client";

import React from 'react';

export const UIUXVisual = () => {
  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center group">
      {/* Background Architectural Grid */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(#2515D8 1px, transparent 1px), linear-gradient(90deg, #2515D8 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}
      ></div>

      {/* Rotating Measurement Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[90%] h-[90%] border border-primary/5 rounded-full animate-spin-slow opacity-20"></div>
        <div className="absolute w-[72%] h-[72%] border border-primary/10 rounded-full animate-reverse-spin opacity-30"></div>
        <div className="absolute w-[54%] h-[54%] border-t-2 border-primary/30 rounded-full animate-spin-fast"></div>
        
        {/* Crosshair accents */}
        <div className="absolute w-[95%] h-px bg-primary/5"></div>
        <div className="absolute h-[95%] w-px bg-primary/5"></div>
      </div>

      {/* Central Interactive "Core" - Representing a refined UI component */}
      <div className="relative z-10 w-52 h-52 bg-white/80 backdrop-blur-xl border border-border shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-[2.5rem] flex items-center justify-center group-hover:scale-105 transition-transform duration-1000 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
        
        {/* Animated UI Elements Inside Core */}
        <div className="relative flex flex-col gap-5 w-full p-8">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-primary/40"></div>
              <div className="w-14 h-2.5 rounded-full bg-primary/10"></div>
            </div>
            <div className="w-4 h-4 rounded-md border-2 border-primary/20"></div>
          </div>
          
          <div className="w-full h-1.5 bg-primary/5 rounded-full overflow-hidden">
            <div className="h-full bg-primary/30 w-1/3 animate-progress-slide"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="h-12 bg-primary/5 rounded-2xl border border-primary/10 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-primary/5 animate-pulse"></div>
            </div>
            <div className="h-12 bg-primary/20 rounded-2xl flex items-center justify-center shadow-inner">
               <div className="w-5 h-5 border-2 border-white/60 rounded-full"></div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className="h-2 w-full bg-primary/5 rounded-full"></div>
            <div className="h-2 w-1/2 bg-primary/5 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Floating "Orbits" - Representing modular disciplines */}
      <div className="absolute w-full h-full pointer-events-none">
        {/* Orbit 1: Code Component */}
        <div className="absolute top-[12%] left-[18%] p-3.5 bg-white border border-border rounded-xl shadow-xl animate-float-slow backdrop-blur-md">
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
             <span className="text-[10px] font-code text-primary font-bold tracking-tighter">component.tsx</span>
           </div>
        </div>
        
        {/* Orbit 2: Design Token / Color Swatch */}
        <div className="absolute bottom-[18%] right-[12%] p-2.5 bg-white border border-border rounded-2xl shadow-xl animate-float-delayed flex items-center gap-2">
           <div className="flex -space-x-2">
             <div className="w-4 h-4 rounded-full bg-[#2515D8] border-2 border-white shadow-sm"></div>
             <div className="w-4 h-4 rounded-full bg-[#F59E0B] border-2 border-white shadow-sm"></div>
             <div className="w-4 h-4 rounded-full bg-[#10B981] border-2 border-white shadow-sm"></div>
           </div>
           <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Tokens</span>
        </div>

        {/* Orbit 3: Layout Grid Indicator */}
        <div className="absolute top-[25%] right-[15%] w-14 h-14 bg-white border border-border rounded-2xl shadow-2xl animate-float flex items-center justify-center backdrop-blur-md">
           <div className="grid grid-cols-2 gap-1.5 w-7 h-7">
              <div className="bg-primary/5 rounded-sm border border-primary/10"></div>
              <div className="bg-primary/40 rounded-sm"></div>
              <div className="bg-primary/20 rounded-sm"></div>
              <div className="bg-primary/10 rounded-sm border border-primary/10"></div>
           </div>
        </div>
        
        {/* Orbit 4: Measurement Label */}
        <div className="absolute bottom-[25%] left-[15%] px-2 py-1 bg-primary text-white text-[8px] font-bold rounded-sm animate-float-slow shadow-lg">
          800px
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
        @keyframes progress-slide {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(300%); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(8px, -18px) rotate(2deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-12px, 12px) rotate(-3deg); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(6px, 10px); }
        }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-reverse-spin { animation: reverse-spin 15s linear infinite; }
        .animate-spin-fast { animation: spin-fast 6s linear infinite; }
        .animate-progress-slide { animation: progress-slide 4s infinite ease-in-out; }
        .animate-float-slow { animation: float-slow 7s infinite ease-in-out; }
        .animate-float-delayed { animation: float-delayed 9s infinite ease-in-out; animation-delay: 1s; }
        .animate-float { animation: float 6s infinite ease-in-out; }
      `}</style>
    </div>
  );
};
