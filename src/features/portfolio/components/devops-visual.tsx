
"use client";

import React from 'react';
import { Cpu, GitBranch, Layers, Server, ShieldCheck, Terminal } from 'lucide-react';

export const DevOpsVisual = () => {
  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center group">
      {/* Architectural Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#2515D8 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      ></div>

      {/* Rotating System Orbits */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[95%] h-[95%] border border-primary/10 rounded-full animate-spin-slow opacity-20"></div>
        <div className="absolute w-[75%] h-[75%] border border-dashed border-primary/20 rounded-full animate-reverse-spin opacity-40"></div>
        <div className="absolute w-[55%] h-[55%] border-t border-primary/40 rounded-full animate-spin-fast"></div>

        {/* Radar Sweeper Effect */}
        <div className="absolute w-[45%] h-[45%] rounded-full bg-conic-gradient from-primary/10 to-transparent animate-spin-slow"></div>
      </div>

      {/* Central "System Core" - Representing a high-availability cluster */}
      <div className="relative z-10 w-56 h-56 bg-white/90 backdrop-blur-2xl border border-primary/10 shadow-[0_32px_80px_-20px_rgba(37,21,216,0.15)] rounded-[3rem] flex items-center justify-center group-hover:scale-105 transition-transform duration-1000 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>

        {/* Animated System Nodes Inside Core */}
        <div className="relative flex flex-col gap-4 w-full p-8 font-code">
          <div className="flex items-center justify-between border-b border-primary/5 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-bold text-primary tracking-tighter uppercase">Cluster_Live</span>
            </div>
            <ShieldCheck className="w-4 h-4 text-primary/40" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-[8px] text-muted-foreground uppercase">Load_Balancing</span>
              <span className="text-[8px] font-bold text-primary">82%</span>
            </div>
            <div className="w-full h-1 bg-primary/5 rounded-full overflow-hidden">
              <div className="h-full bg-primary/40 w-4/5 animate-pulse"></div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 py-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-8 bg-primary/5 rounded-lg border border-primary/10 flex items-center justify-center">
                <div className="w-1 h-3 bg-primary/20 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 pt-2 text-[8px] text-primary/60 font-bold uppercase tracking-widest">
            <Terminal className="w-3 h-3" />
            <span>sys_metrics.v1.0</span>
          </div>
        </div>
      </div>

      {/* Floating Service Nodes - DevOps Ecosystem Components */}
      <div className="absolute w-full h-full pointer-events-none">

        {/* Node 1: Git/Version Control */}
        <div className="absolute top-[15%] left-[10%] p-4 bg-white border border-primary/10 rounded-2xl shadow-2xl animate-float-slow backdrop-blur-md flex flex-col items-center gap-1">
          <GitBranch className="w-5 h-5 text-primary" />
          <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-tighter">Source</span>
        </div>

        {/* Node 2: Docker/Containers */}
        <div className="absolute top-[20%] right-[8%] p-3.5 bg-white border border-primary/10 rounded-3xl shadow-2xl animate-float flex flex-col items-center gap-1">
          <Layers className="w-5 h-5 text-primary" />
          <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-tighter">Docker</span>
        </div>

        {/* Node 3: Infrastructure/Servers */}
        <div className="absolute bottom-[20%] right-[10%] p-4 bg-white border border-primary/10 rounded-2xl shadow-2xl animate-float-delayed flex flex-col items-center gap-1">
          <Server className="w-5 h-5 text-primary" />
          <span className="text-[8px] font-bold text-muted-foreground uppercase tracking-tighter">Infra</span>
        </div>

        {/* Node 4: Compute/Processing */}
        <div className="absolute bottom-[18%] left-[12%] p-3.5 bg-white border border-primary/10 rounded-full shadow-2xl animate-float-slow flex items-center justify-center">
          <Cpu className="w-5 h-5 text-primary" />
        </div>

        {/* Floating Data Labels */}
        <div className="absolute top-[45%] right-0 translate-x-1/2 px-2 py-1 bg-primary text-white text-[7px] font-bold rounded-sm animate-float shadow-lg tracking-widest uppercase">
          Latency: 12ms
        </div>
        <div className="absolute bottom-[40%] left-0 -translate-x-1/2 px-2 py-1 border border-primary/20 text-primary text-[7px] font-bold rounded-sm animate-float-delayed bg-white shadow-sm tracking-widest uppercase">
          Nodes: 24/24
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
          50% { transform: translate(10px, -20px) rotate(2deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-15px, 15px) rotate(-3deg); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(8px, 12px); }
        }
        .animate-spin-slow { animation: spin-slow 25s linear infinite; }
        .animate-reverse-spin { animation: reverse-spin 18s linear infinite; }
        .animate-spin-fast { animation: spin-fast 8s linear infinite; }
        .animate-float-slow { animation: float-slow 8s infinite ease-in-out; }
        .animate-float-delayed { animation: float-delayed 10s infinite ease-in-out; animation-delay: 1.5s; }
        .animate-float { animation: float 7s infinite ease-in-out; }
        .bg-conic-gradient {
          background-image: conic-gradient(var(--tw-gradient-from), var(--tw-gradient-to));
        }
      `}</style>
    </div>
  );
};
