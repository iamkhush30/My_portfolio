
"use client";

import React, { useMemo } from 'react';
import { GitBranch, Cpu, Package, Layers, Rocket, CheckCircle2, Terminal as TerminalIcon } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface PipelineVisualProps {
  progress: number;
}

export const PipelineVisual = ({ progress }: PipelineVisualProps) => {
  // Define stages with associated commands and messages
  // x: 42 and 58 percentages create a narrower horizontal spread
  const stages = useMemo(() => [
    { 
      id: 'git', 
      label: 'Git Commit', 
      icon: <GitBranch className="w-5 h-5" />, 
      y: 10, 
      x: 42, 
      start: 0, 
      end: 0.15,
      cmds: [
        'git add .',
        'git commit -m "feat: core-engine system architecture"',
        'git push origin main'
      ],
      status: 'Changes staged and committed to main branch.',
      cmdColor: 'text-blue-400'
    },
    { 
      id: 'jenkins', 
      label: 'Jenkins Build', 
      icon: <Cpu className="w-5 h-5" />, 
      y: 28, 
      x: 58,
      start: 0.20, 
      end: 0.35,
      cmds: [
        'pipeline { agent any }',
        'steps { sh \'mvn clean install -DskipTests\' }',
        'post { success { echo \'Build SUCCESS\' } }'
      ],
      status: 'Building workspace... Build SUCCESS in 14.2s',
      cmdColor: 'text-amber-400'
    },
    { 
      id: 'nexus', 
      label: 'Nexus Artifact', 
      icon: <Package className="w-5 h-5" />, 
      y: 46, 
      x: 42,
      start: 0.40, 
      end: 0.55,
      cmds: [
        'curl -v -u admin:admin123 --upload-file \\',
        '  target/app-v1.0.jar \\',
        '  http://nexus.local/repository/maven-releases/'
      ],
      status: 'Artifact app.v1.0.jar published to repository.',
      cmdColor: 'text-indigo-400'
    },
    { 
      id: 'docker', 
      label: 'Docker Image', 
      icon: <Layers className="w-5 h-5" />, 
      y: 64, 
      x: 58,
      start: 0.60, 
      end: 0.75,
      cmds: [
        'docker build --pull --rm -f "Dockerfile" -t km/app:latest .',
        'docker tag km/app:latest registry.io/km/app:v1.0',
        'docker push registry.io/km/app:v1.0'
      ],
      status: 'Layers cached. Image pushed to registry.',
      cmdColor: 'text-cyan-400'
    },
    { 
      id: 'deploy', 
      label: 'Production Deploy', 
      icon: <Rocket className="w-5 h-5" />, 
      y: 82, 
      x: 42,
      start: 0.80, 
      end: 1.0,
      cmds: [
        'kubectl apply -f ./k8s/deployment.yaml -n prod',
        'kubectl rollout status deployment/web-app -n prod',
        'kubectl get pods -n prod'
      ],
      status: 'Deployment stable. Rolling update complete.',
      cmdColor: 'text-emerald-400'
    },
  ], []);

  // Construct the SVG path for the zigzag
  const pathD = useMemo(() => {
    let d = `M ${stages[0].x} ${stages[0].y}`;
    for (let i = 0; i < stages.length - 1; i++) {
      const current = stages[i];
      const next = stages[i+1];
      const midY = (current.y + next.y) / 2;
      // Use cubic bezier for smooth wavy zigzag
      d += ` C ${current.x} ${midY}, ${next.x} ${midY}, ${next.x} ${next.y}`;
    }
    return d;
  }, [stages]);

  // Determine active terminal output based on progress
  const activeStage = [...stages].reverse().find(s => progress >= s.start);

  return (
    <div className="relative w-full h-[550px] lg:h-[650px] flex flex-col items-center justify-between bg-[#050505] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
      {/* Architectural Dotted Grid Background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{ 
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', 
          backgroundSize: '24px 24px',
        }}
      ></div>

      {/* Pipeline Visualization Area */}
      <div className="relative flex-grow w-full overflow-hidden">
        
        {/* SVG Zigzag Path */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
        >
          {/* Background Path (Dotted) */}
          <path
            d={pathD}
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="0.5"
            strokeDasharray="1, 1"
          />
          {/* Animated Glowing Path */}
          <path
            d={pathD}
            fill="none"
            stroke="#3730A3"
            strokeWidth="0.8"
            strokeLinecap="round"
            style={{ 
              strokeDasharray: '200',
              strokeDashoffset: 200 - (progress * 200),
              filter: 'drop-shadow(0 0 6px rgba(55, 48, 163, 0.8))',
              transition: 'stroke-dashoffset 0.1s linear'
            }}
          />
        </svg>

        {/* Nodes and Labels */}
        <div className="relative z-10 w-full h-full">
          {stages.map((stage, idx) => {
            const isReached = progress >= stage.start;
            const isActive = progress >= stage.start && (idx === stages.length - 1 ? true : progress < stages[idx+1].start);
            
            return (
              <div 
                key={stage.id}
                className={cn(
                  "absolute flex flex-col items-center transition-all duration-700 ease-out",
                  isReached ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ 
                  top: `${stage.y}%`, 
                  left: `${stage.x}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="relative flex items-center justify-center group">
                  {/* Node Label (Alternating Left/Right) */}
                  <div className={cn(
                    "absolute whitespace-nowrap transition-all duration-500",
                    idx % 2 === 0 ? "left-full ml-8" : "right-full mr-8",
                    isReached ? "opacity-80 translate-x-0" : "opacity-0 translate-x-2"
                  )}>
                    <div className={cn(
                      "flex flex-col",
                      idx % 2 !== 0 && "items-end text-right"
                    )}>
                      <span className="text-[10px] font-headline font-bold text-white tracking-[0.2em] uppercase">
                        {stage.label}
                      </span>
                      <span className="text-[8px] font-code text-muted-foreground/60 uppercase">
                        Phase_0{idx + 1}
                      </span>
                    </div>
                  </div>

                  {/* The Circular Node */}
                  <div 
                    className={cn(
                      "relative w-10 h-10 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-all duration-700 overflow-hidden",
                      isReached ? "border-[#3730A3] bg-[#050505]" : "border-[#1A1A1A] bg-[#1A1A1A]/10",
                      isActive && "scale-110 shadow-[0_0_30px_rgba(55,48,163,0.4)] animate-pulse-gentle"
                    )}
                  >
                    <div className={cn(
                      "transition-all duration-500",
                      isReached ? "text-[#3730A3] drop-shadow-[0_0_8px_rgba(55,48,163,0.5)]" : "text-[#1A1A1A]"
                    )}>
                      {stage.id === 'deploy' && progress >= 0.95 ? (
                        <CheckCircle2 className="w-5 h-5 text-[#10B981] animate-in zoom-in-50 duration-500" />
                      ) : (
                        stage.icon
                      )}
                    </div>
                    
                    {isActive && (
                      <div className="absolute inset-0 bg-[#3730A3]/10 blur-xl animate-pulse" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Integrated Technical Console */}
      <div className="relative z-20 w-full bg-[#030303] border-t border-white/5 p-4 md:p-6 min-h-[140px] md:min-h-[160px] flex flex-col gap-3 font-code">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-3 h-3 text-primary opacity-50" />
            <span className="text-[9px] text-white/40 tracking-widest uppercase font-bold">Pipeline Runner v2.5.0</span>
          </div>
          {progress >= 0.95 && (
            <div className="flex items-center gap-2 px-2 py-0.5 bg-[#10B981]/10 border border-[#10B981]/20 rounded-sm animate-in zoom-in duration-500">
              <span className="text-[8px] font-bold text-[#10B981] uppercase tracking-tighter">STABLE</span>
            </div>
          )}
        </div>
        
        {activeStage ? (
          <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-start gap-2">
              <span className="text-white/20 text-[10px] md:text-[11px] font-bold shrink-0">km@dev-vm:~$</span>
              <div className="flex flex-col gap-1">
                {activeStage.cmds.map((line, idx) => (
                  <span key={idx} className={cn("text-[10px] md:text-[11px] leading-tight break-all font-bold tracking-tight", activeStage.cmdColor)}>
                    {line}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 pl-4 border-l border-white/10">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-white/40 text-[9px] md:text-[10px] italic">
                {activeStage.status}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 opacity-20">
            <span className="text-[10px] md:text-[11px] text-white/50 animate-pulse">Waiting for initial git commit...</span>
          </div>
        )}

        {/* Global Progress Line in Console */}
        <div className="absolute bottom-0 left-0 h-[2px] bg-primary/20 w-full">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse-gentle {
          0%, 100% { transform: scale(1.0); }
          50% { transform: scale(1.12); }
        }
        .animate-pulse-gentle {
          animation: pulse-gentle 2.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};
