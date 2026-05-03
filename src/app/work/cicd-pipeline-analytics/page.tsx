
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/features/portfolio/components/header';
import { Footer } from '@/features/portfolio/components/footer';
import { Badge } from '@/shared/ui/badge';
import { cn } from '@/shared/lib/utils';
import { useScrollAnimation } from '@/shared/hooks/use-scroll-animation';
import { 
  Gitlab, 
  Terminal, 
  Settings, 
  Box, 
  Database, 
  Activity, 
  ArrowRight, 
  Zap,
  ShieldCheck,
  AlertTriangle,
  Award,
  User,
  GitBranch,
  Layers,
  Wrench,
  Smartphone,
  Search
} from 'lucide-react';

/**
 * @fileOverview High-fidelity CI/CD Pipeline Analytics project page.
 * Refactored for full-width technical breakdown and global design system alignment.
 */

const InteractiveCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Reduced intensity: multiplier changed from 10 to 4
    const tiltX = ((y - centerY) / centerY) * -4;
    const tiltY = ((x - centerX) / centerX) * 4;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden group transition-all duration-300",
        className
      )}
      style={{ 
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        // Reduced shadow intensity: multipliers changed from 1.5 to 0.8, blur from 40px to 25px
        boxShadow: tilt.x === 0 && tilt.y === 0 
          ? '0 10px 20px -5px rgba(0,0,0,0.05)' 
          : `${-tilt.y * 0.8}px ${tilt.x * 0.8}px 25px -10px rgba(0,0,0,0.15)`,
        transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.5s ease-out, box-shadow 0.5s ease' : 'transform 0.1s linear, box-shadow 0.1s linear',
        transformStyle: 'preserve-3d'
      }}
    >
      <div 
        className="relative z-10 w-full h-full"
        style={{ transform: 'translateZ(20px)' }}
      >
        {children}
      </div>
    </div>
  );
};

export default function CicdPipelineAnalytics() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { ref: flowRef, isVisible: flowVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: implementRef, isVisible: implementVisible } = useScrollAnimation<HTMLDivElement>();

  const stages = [
    { icon: <Gitlab className="w-5 h-5 text-primary" />, sn: "Source", st: "GitLab", ss: "git push" },
    { icon: <Zap className="w-5 h-5 text-primary" />, sn: "Trigger", st: "Webhook", ss: "auto trigger" },
    { icon: <Settings className="w-5 h-5 text-primary" />, sn: "Build", st: "Jenkins", ss: "Jenkinsfile" },
    { icon: <Box className="w-5 h-5 text-primary" />, sn: "Package", st: "Docker", ss: "Dockerfile" },
    { icon: <Database className="w-5 h-5 text-primary" />, sn: "Registry", st: "Nexus", ss: "docker image" },
  ];

  const breakdown = [
    { stage: "01 · Source", action: "Developer pushes code to GitLab", detail: "git push origin main" },
    { stage: "02 · Trigger", action: "GitLab webhook fires to Jenkins", detail: "POST /jenkins/webhook/" },
    { stage: "03 · Checkout", action: "Jenkins pulls repository from GitLab", detail: "Jenkinsfile · stage('Checkout')" },
    { stage: "04 · Build", action: "Docker image built from Dockerfile", detail: "docker build -t heart-predict ." },
    { stage: "05 · Tag", action: "Image tagged with Jenkins build ID", detail: "nexus:8082/heart-predict:$BUILD_ID" },
    { stage: "06 · Push", action: "Image pushed to Nexus Docker registry", detail: "docker push nexus:8082/heart-predict" },
  ];

  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      <div className="relative z-10 pt-[var(--space)] pb-[var(--space)] animate-fade-in" style={{ animationDuration: '1.5s' }}>
        
        <div className="container-padding mx-auto">
          
          <nav className="flex items-center gap-2 mb-16 opacity-0 animate-entrance-fade-up">
            <Link href="/#work" className="text-label text-primary hover:underline">
              My Vault
            </Link>
            <span className="text-label text-muted-foreground opacity-40">/</span>
            <span className="text-label text-muted-foreground">CI/CD Pipeline Analytics</span>
          </nav>

          <div ref={heroRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16">
            
            <div className={cn(
              "lg:col-span-6 flex flex-col transition-all duration-700",
              heroVisible ? "opacity-100" : "opacity-0 translate-y-6"
            )}>
              <div className="space-y-6 mb-8">
                <h1 className="text-heading">
                  CI/CD Pipeline<br />Analytics
                </h1>
                
                <div className="w-12 h-1 bg-primary my-10"></div>
                
                <p className="text-body max-w-[480px]">
                  Architected a complete CI/CD pipeline for a Machine Learning Heart Disease Prediction application — automating the entire journey from code commit to Docker image registry using GitLab, Jenkins, Docker, and Nexus.
                </p>
              </div>
            </div>

            <div className={cn(
              "lg:col-span-6 flex flex-col gap-4 transition-all duration-700 delay-100",
              heroVisible ? "opacity-100" : "opacity-0 translate-y-6"
            )}>
              <div
                style={{
                  animation: `entrance-fade-up 0.6s cubic-bezier(0.23, 1, 0.32, 1) both`,
                  animationDelay: `${heroVisible ? '0ms' : '0ms'}`,
                }}
              >
                <InteractiveCard className="flex items-center py-5 px-8 card-surface bg-white group">
                  <div className="flex items-center w-full">
                    <User className="w-4 h-4 text-primary mr-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                    <span className="text-body font-bold text-primary w-32 shrink-0">Role</span>
                    <span className="text-body">DevOps Engineer</span>
                  </div>
                </InteractiveCard>
              </div>

              <div
                style={{
                  animation: `entrance-fade-up 0.6s cubic-bezier(0.23, 1, 0.32, 1) both`,
                  animationDelay: `${heroVisible ? '60ms' : '0ms'}`,
                }}
              >
                <InteractiveCard className="flex items-center py-5 px-8 card-surface bg-white group">
                  <div className="flex items-center w-full">
                    <GitBranch className="w-4 h-4 text-primary mr-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                    <span className="text-body font-bold text-primary w-32 shrink-0">Pipeline</span>
                    <span className="text-body">GitLab → Jenkins → Docker → Nexus</span>
                  </div>
                </InteractiveCard>
              </div>

              <div
                style={{
                  animation: `entrance-fade-up 0.6s cubic-bezier(0.23, 1, 0.32, 1) both`,
                  animationDelay: `${heroVisible ? '120ms' : '0ms'}`,
                }}
              >
                <InteractiveCard className="flex items-center py-5 px-8 card-surface bg-white group">
                  <div className="flex items-center w-full">
                    <Layers className="w-4 h-4 text-primary mr-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                    <span className="text-body font-bold text-primary w-32 shrink-0">App Stack</span>
                    <span className="text-body">React · Flask API · ML Model</span>
                  </div>
                </InteractiveCard>
              </div>

              <div
                style={{
                  animation: `entrance-fade-up 0.6s cubic-bezier(0.23, 1, 0.32, 1) both`,
                  animationDelay: `${heroVisible ? '180ms' : '0ms'}`,
                }}
              >
                <InteractiveCard className="flex items-start py-5 px-8 card-surface bg-white group">
                  <div className="flex items-start w-full">
                    <Wrench className="w-4 h-4 text-primary mr-4 mt-1 opacity-40 group-hover:opacity-100 transition-opacity" />
                    <span className="text-body font-bold text-primary w-32 shrink-0 mt-1">Tools</span>
                    <div className="flex flex-wrap gap-2">
                      {['GITLAB CI', 'JENKINS', 'DOCKER', 'NEXUS', 'DOCKERFILE'].map((tool) => (
                        <Badge 
                          key={tool} 
                          variant="outline" 
                          className="rounded-full border-[#2564EB]/20 text-[#2564EB] bg-[#2564EB]/5 px-4 py-1 text-[12px] font-bold tracking-widest uppercase"
                        >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                  </div>
                </InteractiveCard>
              </div>
            </div>
          </div>

          <section className="mt-[var(--space-lg)] border-t border-border mb-16">
            <div ref={flowRef} className={cn(
              "mb-12 space-y-4 transition-all duration-700",
              flowVisible ? "opacity-100" : "opacity-0 translate-y-8"
            )}>
              <span className="text-label text-muted-foreground">Pipeline Architecture · Heart Prediction App</span>
              <h2 className="text-heading">The Flow</h2>
              <div className="w-16 h-1 bg-primary"></div>
            </div>

            <div className={cn(
              "relative bg-[#0A0F1E] rounded-[1.5rem] p-10 md:p-12 border border-white/5 overflow-hidden shadow-2xl transition-all duration-700",
              flowVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}>
              <div className="absolute top-[-60px] right-[-60px] w-[280px] h-[280px] bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
                  <span className="text-label text-white/20 tracking-[0.2em]">Pipeline · Main Branch · heart-predict-app</span>
                  <div className="flex items-center gap-3">
                    <div className="w-[6px] h-[6px] rounded-full bg-emerald-500 animate-blink shadow-[0_0_6px_#10B981]"></div>
                    <span className="text-label text-emerald-500">Pushed to Registry</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-0 relative mb-12">
                  <div className="hidden md:block absolute top-[27px] left-[10%] right-[10%] h-[1px] bg-primary/20 z-0"></div>
                  
                  {stages.map((stage, i) => (
                    <div key={i} className="flex flex-col items-center text-center group/stage relative z-10">
                      <div className={cn(
                        "w-[54px] h-[54px] rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover/stage:scale-[1.07]",
                        stage.faded ? "bg-white/5 border border-dashed border-white/10" : "bg-primary/10 border-[1.5px] border-primary/35"
                      )}>
                        {stage.icon}
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.12em] text-white/25 mb-1">{stage.sn}</span>
                      <h4 className="text-[13px] font-bold text-white mb-1 leading-tight">{stage.st}</h4>
                      <span className="text-[11px] font-mono text-white/30">{stage.ss}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-xl overflow-hidden border border-white/5">
                  {[
                    { k: "Trigger Event", v: "git push → main", color: "text-primary" },
                    { k: "Build Tool", v: "Jenkins · Jenkinsfile", color: "text-white/50" },
                    { k: "Final Artifact", v: "Docker Image · Nexus ✓", color: "text-emerald-400" },
                    { k: "Application", v: "Heart Disease Prediction", color: "text-white/50" },
                    { k: "App Stack", v: "React · Flask · ML Model", color: "text-white/50" },
                    { k: "Deployment", v: "Pending · Infra Required", color: "text-white/30" },
                  ].map((detail, i) => (
                    <div key={i} className="bg-[#0D1120] p-[1.1rem_1.4rem] flex flex-col gap-1.5">
                      <span className="text-[10px] font-mono tracking-[0.14em] uppercase text-white/20">{detail.k}</span>
                      <span className={cn("text-[12px] font-mono leading-relaxed", detail.color)}>{detail.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="mt-[var(--space-xl)] border-t border-border mb-16">
            <div ref={implementRef} className={cn(
              "mb-12 space-y-4 transition-all duration-700",
              implementVisible ? "opacity-100" : "opacity-0 translate-y-8"
            )}>
              <span className="text-label text-primary">Implementation</span>
              <h2 className="text-heading">What I Built</h2>
              <div className="w-16 h-1 bg-primary"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { tool: "GitLab", title: "Source & Version Control", desc: "Hosted the entire project on GitLab and configured webhook integration to automatically trigger the Jenkins pipeline on every push to the main branch." },
                { tool: "Jenkins", title: "Pipeline Orchestration", desc: "Authored a declarative Jenkinsfile defining all pipeline stages — checkout, build, and Docker image creation." },
                { tool: "Docker", title: "App Containerization", desc: "Wrote a Dockerfile containerizing both the React frontend and Flask ML API into a single deployable image." },
                { tool: "Nexus", title: "Docker Image Registry", desc: "Configured Nexus as a private Docker registry. Jenkins pushes the final versioned Docker image to Nexus." },
                { tool: "Flask API", title: "ML Model Backend", desc: "The Flask API serves the trained ML model that predicts heart disease risk from patient input parameters." },
                { tool: "React", title: "Frontend Interface", desc: "The React frontend collects patient health inputs and communicates with the Flask API to display risk predictions." },
              ].map((card, i) => (
                <div
                  key={i}
                  style={{
                    animation: `entrance-scale 0.6s cubic-bezier(0.23, 1, 0.32, 1) both`,
                    animationDelay: `${implementVisible ? i * 80 : 0}ms`,
                  }}
                >
                  <InteractiveCard className="card-surface p-8 bg-white hover:border-primary/50 transition-colors">
                    <div className="space-y-4">
                      <h3 className="text-body font-bold text-primary leading-tight">{card.title}</h3>
                      <p className="text-body leading-relaxed">
                        <span className="font-bold">{card.tool}:</span> {card.desc}
                      </p>
                    </div>
                  </InteractiveCard>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Breakdown Section - IMMERSIVE FULL VIEWPORT STRIP */}
        <section className="relative min-h-screen flex flex-col justify-center bg-[#0A0F1E] border-y border-white/5 overflow-hidden shadow-2xl">
           <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none" 
                style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
           
           <div className="container-padding mx-auto relative z-10">
              <div className="mb-12 space-y-4">
                <span className="text-label text-white/25">Architecture</span>
                <h2 className="text-heading text-white">Pipeline Stage Breakdown</h2>
                <div className="w-16 h-1 bg-white/10"></div>
              </div>

              {/* Table Container - Strict Bordered Layout */}
              <div className="border border-white/10 rounded-xl overflow-hidden bg-transparent">
                {/* Header Row - Color Identifier */}
                <div className="grid grid-cols-1 md:grid-cols-[160px_1fr_1fr] bg-white/5 border-b border-white/10 p-3 items-center">
                  <span className="text-[10px] font-mono tracking-[0.14em] uppercase text-white/40 md:border-r md:border-white/10 h-full flex items-center pr-4">Stage</span>
                  <span className="text-[10px] font-mono tracking-[0.14em] uppercase text-white/40 md:border-r md:border-white/10 h-full flex items-center px-4">Action</span>
                  <span className="text-[10px] font-mono tracking-[0.14em] uppercase text-white/40 h-full flex items-center pl-4">Command / Detail</span>
                </div>
                {/* Data Rows - Transparent with grid-aligned borders */}
                {breakdown.map((row, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-[160px_1fr_1fr] border-b border-white/10 last:border-none transition-colors hover:bg-white/[0.02]">
                    <div className="p-3 md:border-r md:border-white/10 flex items-center">
                      <span className="text-label text-primary">{row.stage}</span>
                    </div>
                    <div className="p-3 md:border-r md:border-white/10 flex items-center">
                      <span className="text-[13px] font-medium text-white">{row.action}</span>
                    </div>
                    <div className="p-3 flex items-center">
                      <span className="text-[12px] font-mono text-white/30">{row.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </section>

        <div className="container-padding mx-auto">
          <section className="mt-[var(--space-xl)] border-t border-border mb-16">
            <div className="mb-12 space-y-4">
              <span className="text-label text-primary">Reflection</span>
              <h2 className="text-heading">Challenge & Outcome</h2>
              <div className="w-16 h-1 bg-primary"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InteractiveCard className="card-surface p-8 bg-white hover:border-primary/50 transition-colors group">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 mt-1">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-body font-bold text-primary">The Challenge</h3>
                    <p className="text-body leading-relaxed">
                      ML applications introduce unique CI/CD complexity — the pipeline must containerize not just a web app but an entire Python ML environment alongside a React frontend.
                    </p>
                  </div>
                </div>
              </InteractiveCard>

              <InteractiveCard className="card-surface p-8 bg-white hover:border-primary/50 transition-colors group">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 mt-1">
                    <Award className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-body font-bold text-primary">The Outcome</h3>
                    <p className="text-body leading-relaxed">
                      A fully automated pipeline where every git push triggers a clean build, packages the application into a versioned Docker image, and stores it in the Nexus registry.
                    </p>
                  </div>
                </div>
              </InteractiveCard>
            </div>
          </section>

          <div className="mt-6 pt-4 border-t border-border flex flex-col md:flex-row items-center justify-between gap-8">
            <Link href="/#work" className="text-label text-muted-foreground flex items-center gap-2 group hover:text-foreground transition-colors uppercase">
              <span className="text-lg transition-transform group-hover:-translate-x-1">←</span>
              <span>Back to Vault</span>
            </Link>
            <div className="text-label text-muted-foreground">
              CI/CD Pipeline · DevOps · Heart Prediction App
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        .animate-blink {
          animation: blink 2s infinite;
        }
      `}</style>
    </main>
  );
}
