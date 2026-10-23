"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/features/header';
import { Footer } from '@/features/footer';
import { Badge } from '@/shared/ui/badge';
import { Breadcrumbs } from '@/features/case-study/breadcrumbs';
import { StickySectionNav, SectionLink } from '@/features/case-study/sticky-section-nav';
import { ProjectNav } from '@/features/case-study/project-nav';
import { ProjectItem } from '@/data/projects';
import { siteConfig } from '@/shared/lib/site-config';
import {
  Gitlab,
  Zap,
  Settings,
  Box,
  Database,
  Activity,
  Layers,
  ShieldCheck,
  Terminal,
  User,
  GitBranch,
  Wrench,
  CheckCircle2,
  FileCode,
  Github,
  ExternalLink,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';

const ICON_MAP: Record<string, React.ReactNode> = {
  Gitlab: <Gitlab className="w-5 h-5 text-primary" />,
  Zap: <Zap className="w-5 h-5 text-primary" />,
  Settings: <Settings className="w-5 h-5 text-primary" />,
  Box: <Box className="w-5 h-5 text-primary" />,
  Database: <Database className="w-5 h-5 text-primary" />,
  Activity: <Activity className="w-5 h-5 text-primary" />,
  Layers: <Layers className="w-5 h-5 text-primary" />,
};

export const DevOpsProjectTemplate: React.FC<{ project: ProjectItem }> = ({ project }) => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const baseUrl = siteConfig.url.replace(/\/$/, '');

  const hasVerification = Boolean(project.isDraftSlot);
  const isTerraform = project.slug.includes('terraform');

  const sections: SectionLink[] = isTerraform
    ? [
        { id: 'overview', label: '01. Overview' },
        { id: 'architecture', label: '02. Architecture' },
        { id: 'challenges', label: '03. Engineering Challenges' },
        { id: 'specifications', label: '04. Production Guardrails' },
        ...(project.iacWorkflow && project.iacWorkflow.length > 0
          ? [{ id: 'lifecycle', label: '05. IaC Lifecycle & CLI' }]
          : []),
      ]
    : [
      { id: 'overview', label: '01. Overview' },
      ...(project.stages && project.stages.length > 0
        ? [{ id: 'architecture', label: '02. Architecture' }]
        : []),
      ...(project.breakdown && project.breakdown.length > 0
        ? [{ id: 'execution', label: '03. Execution Flow' }]
        : []),
      ...(project.infrastructureSpecs && project.infrastructureSpecs.length > 0
        ? [{ id: 'specifications', label: '04. Technical Specs' }]
        : []),
      ...(project.engineeringChallenges && project.engineeringChallenges.length > 0
        ? [{ id: 'challenges', label: '05. Engineering Challenges' }]
        : project.codeSnippets && project.codeSnippets.length > 0
          ? [{ id: 'manifests', label: '05. Code & Manifests' }]
          : []),
      ...(hasVerification ? [{ id: 'verification', label: '06. Verification' }] : []),
    ];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: project.title,
    description: project.seoDescription,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: baseUrl,
    },
    datePublished: `${project.date}-01-01`,
    image: `${baseUrl}${project.image}`,
    url: `${baseUrl}/${project.slug}`,
    keywords: project.tools.join(', '),
  };

  return (
    <main className="relative min-h-screen bg-background overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Header />

      <div className="relative z-10 pt-28 sm:pt-36 pb-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
          {/* Breadcrumbs */}
          <Breadcrumbs projectTitle={project.title} projectSlug={project.slug} />

          {/* Top Hero Section */}
          <div className="mb-14 sm:mb-20">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                {project.category} Case Study
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono text-muted-foreground bg-slate-100 border border-slate-200">
                {project.role}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-[1.1] mb-6 max-w-4xl">
              {project.title}
            </h1>

            <p className="text-base sm:text-xl text-muted-foreground max-w-3xl leading-relaxed mb-8">
              {project.subtitle}
            </p>

            {/* Quick Action Links / Repo */}
            <div className="flex flex-wrap items-center gap-3">
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors text-xs font-mono font-semibold"
                >
                  <Github size={15} />
                  <span>View Repository</span>
                  <ExternalLink size={12} className="opacity-60" />
                </a>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-mono">
                  <AlertCircle size={14} />
                  <span>TODO: Add project repository link</span>
                </div>
              )}
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 pt-8 border-t border-border">
              {project.metrics.map((metric, i) => (
                <div key={i} className="p-5 rounded-xl bg-white border border-border">
                  <span className="block text-2xl sm:text-3xl font-extrabold font-mono text-primary">
                    {metric.value}
                  </span>
                  <span className="block text-xs font-mono uppercase tracking-wider text-foreground font-semibold mt-1">
                    {metric.label}
                  </span>
                  {metric.note && (
                    <span className="block text-xs text-muted-foreground mt-1">
                      {metric.note}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Layout: Sticky TOC + Content Body */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start relative">
            {/* Sticky TOC on desktop */}
            <StickySectionNav sections={sections} />

            {/* Content Body */}
            <div className="flex-1 min-w-0 space-y-16 sm:space-y-24">
              {/* Draft / TODO Notification if slot */}
              {project.isDraftSlot && (
                <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <span className="font-bold block mb-1">
                      DevOps Template Slot (Ready for Custom Data)
                    </span>
                    <p className="text-blue-800">
                      This project page is pre-structured with the complete DevOps architecture layout. Review the TODO placeholders below to inject your live diagrams, repository URL, and custom metrics.
                    </p>
                  </div>
                </div>
              )}

              {/* 01. Overview */}
              <section id="overview" className="scroll-mt-32 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-primary uppercase tracking-widest">
                    01 · Context & Architecture
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                    Project Overview
                  </h2>
                </div>

                <div className="prose prose-slate max-w-none text-foreground/80 leading-relaxed space-y-4">
                  <p className="text-base sm:text-lg font-medium text-foreground">
                    {project.summary}
                  </p>
                  {project.archivedParagraph && (
                    <div className="p-5 rounded-xl bg-slate-50 border-l-4 border-primary text-sm sm:text-base text-foreground/90 my-4 leading-relaxed">
                      {project.archivedParagraph}
                    </div>
                  )}
                </div>

                {/* Tool Stack Badges */}
                <div className="pt-4">
                  <span className="text-xs font-mono uppercase text-muted-foreground tracking-wider block mb-3 font-semibold">
                    Core Technology Stack
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <Badge
                        key={tool}
                        variant="outline"
                        className="rounded-full border-primary/20 text-primary bg-primary/5 px-4 py-1 text-xs font-mono font-bold tracking-wider uppercase"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </section>

              {/* 02. Architecture Pipeline Diagram */}
              {project.stages && (
                <section id="architecture" className="scroll-mt-32 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-primary uppercase tracking-widest">
                      02 · {project.slug.includes('terraform') ? 'Provisioning Flow' : 'Automated Flow'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                      {project.slug.includes('terraform') ? 'Infrastructure Architecture' : 'Pipeline Architecture'}
                    </h2>
                  </div>

                  {/* Dark Cyber Architecture Console */}
                  <div className="rounded-2xl bg-[#080B14] p-6 sm:p-10 border border-blue-900/40 shadow-2xl relative overflow-hidden">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs font-mono text-blue-400 uppercase tracking-widest font-semibold">
                          {project.pipelineFlow || 'End-to-End Pipeline'}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        {project.stages.length} Stages Verified
                      </span>
                    </div>

                    {/* Hover-Driven Stage Nodes (Non-Clickable) */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                      {project.stages.map((stage, idx) => {
                        const isCurrent = activeStage === idx;
                        return (
                          <div
                            key={idx}
                            onMouseEnter={() => setActiveStage(idx)}
                            onFocus={() => setActiveStage(idx)}
                            tabIndex={0}
                            className={cn(
                              "p-4 rounded-xl border text-left transition-all duration-200 cursor-default outline-none select-none",
                              isCurrent
                                ? "bg-blue-950/70 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.35)]"
                                : "bg-white/[0.03] border-white/10 hover:border-blue-400/40 hover:bg-white/[0.06]"
                            )}
                          >
                            <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400 w-fit mb-3">
                              {ICON_MAP[stage.iconName] || <Settings className="w-5 h-5 text-blue-400" />}
                            </div>
                            <span className="block text-xs font-mono uppercase text-blue-400/90 tracking-wider">
                              {stage.name}
                            </span>
                            <span className="block text-sm font-bold text-white mt-0.5 truncate">
                              {stage.tool}
                            </span>
                            <span className="block text-[11px] font-mono text-slate-400 mt-2 truncate">
                              {stage.detail}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Live Stage Telemetry & Mechanics Inspection Panel */}
                    {project.stages[activeStage] && (
                      <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 font-mono text-xs font-bold flex items-center justify-center border border-blue-500/30">
                              {String(activeStage + 1).padStart(2, '0')}
                            </span>
                            <div>
                              <span className="text-[11px] font-mono text-blue-400 uppercase tracking-widest block font-semibold">
                                Stage Telemetry · {project.stages[activeStage].name}
                              </span>
                              <h4 className="text-base font-bold text-white">
                                {project.stages[activeStage].tool}
                              </h4>
                            </div>
                          </div>

                          {project.stages[activeStage].command && (
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 text-emerald-400 font-mono text-xs border border-emerald-900/40 shrink-0 self-start sm:self-auto">
                              <Terminal size={13} className="text-emerald-400 shrink-0" />
                              <code>{project.stages[activeStage].command}</code>
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Responsibility / Action */}
                          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                              Operational Responsibility
                            </span>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                              {project.stages[activeStage].responsibility || project.stages[activeStage].detail}
                            </p>
                          </div>

                          {/* Reliability & Guardrail */}
                          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400/90 flex items-center gap-1.5 font-semibold">
                              <ShieldCheck size={14} className="text-emerald-400" />
                              Reliability & Security Guardrail
                            </span>
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                              {project.stages[activeStage].guardrail || 'Strict automated validation enforced at this stage.'}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* 03. Execution Flow Breakdown (only rendered if project.breakdown exists and not Terraform) */}
              {!isTerraform && project.breakdown && (
                <section id="execution" className="scroll-mt-32 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-primary uppercase tracking-widest">
                      03 · Step-by-Step Delivery
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                      Execution Flow Breakdown
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {project.breakdown.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl bg-white border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-primary/40 transition-colors"
                      >
                        <div className="flex items-start sm:items-center gap-3.5">
                          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-primary/20">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <div>
                            <span className="text-xs font-mono text-primary font-bold block uppercase tracking-wider">
                              {item.stage.replace(/^\d+\s*·\s*/, '')}
                            </span>
                            <span className="text-sm font-semibold text-foreground">
                              {item.action}
                            </span>
                          </div>
                        </div>
                        <code className="text-xs font-mono bg-slate-100 text-slate-800 px-3 py-1.5 rounded-md border border-slate-200 shrink-0 self-start sm:self-auto">
                          {item.detail}
                        </code>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Engineering Challenges & Solutions (Rendered as 03 for Terraform, or 05 for other projects) */}
              {isTerraform && project.engineeringChallenges && project.engineeringChallenges.length > 0 && (
                <section id="challenges" className="scroll-mt-32 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-primary uppercase tracking-widest">
                      03 · Troubleshooting & Resilience
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                      Engineering Challenges & Architectural Solutions
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-2xl">
                      Real-world architectural hurdles resolved during infrastructure automation, addressed at the dynamic provider, AMI resolution, and modular composition layers.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {project.engineeringChallenges.map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                      >
                        {/* Header bar */}
                        <div className="px-6 py-4 bg-slate-50/80 border-b border-border flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary font-mono text-xs font-bold flex items-center justify-center">
                              {item.id}
                            </span>
                            <h3 className="text-base font-bold text-foreground">
                              {item.title}
                            </h3>
                          </div>
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-blue-50 text-blue-700 border border-blue-200">
                            {item.category}
                          </span>
                        </div>

                        {/* Content Grid */}
                        <div className="p-6 space-y-5">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Problem Card */}
                            <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200/70 space-y-2">
                              <div className="flex items-center gap-2 text-rose-700 font-semibold text-xs uppercase tracking-wider">
                                <AlertCircle size={15} />
                                <span>The Challenge</span>
                              </div>
                              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                                {item.problem}
                              </p>
                            </div>

                            {/* Solution Card */}
                            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/70 space-y-2">
                              <div className="flex items-center gap-2 text-blue-700 font-semibold text-xs uppercase tracking-wider">
                                <CheckCircle2 size={15} />
                                <span>Architectural Solution</span>
                              </div>
                              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                                {item.solution}
                              </p>
                            </div>
                          </div>

                          {/* Impact footer */}
                          <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground border-t border-slate-100">
                            <span className="font-semibold text-foreground">Outcome:</span>
                            <span>{item.impact}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Technical Specifications / Production Guardrails */}
              {project.infrastructureSpecs && (
                <section id="specifications" className="scroll-mt-32 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-primary uppercase tracking-widest">
                      {isTerraform ? '04 · Enterprise Readiness' : '04 · Systems Infrastructure'}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                      {isTerraform ? 'Production Guardrails & Governance' : 'Technical Specifications'}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.infrastructureSpecs.map((group, idx) => (
                      <div
                        key={idx}
                        className="p-6 rounded-2xl bg-white border border-border space-y-4"
                      >
                        <h3 className="text-base font-bold text-foreground flex items-center gap-2 pb-3 border-b border-border">
                          <Layers size={18} className="text-primary" />
                          <span>{group.category}</span>
                        </h3>
                        <ul className="space-y-2.5">
                          {group.items.map((item, ii) => (
                            <li key={ii} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/80">
                              <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 05. IaC Lifecycle & CLI for Terraform */}
              {isTerraform && project.iacWorkflow && project.iacWorkflow.length > 0 && (
                <section id="lifecycle" className="scroll-mt-32 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-primary uppercase tracking-widest">
                      05 · CLI Operations & Safe Rollouts
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                      IaC Lifecycle & Deployment Operations
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-2xl">
                      Deterministic provisioning lifecycle from static syntax and schema pre-flight checks to cryptographic plan locking, endpoint telemetry verification, and zero-cost teardown.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {project.iacWorkflow.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl bg-white border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-primary/40 transition-colors"
                      >
                        <div className="flex items-start sm:items-center gap-3.5">
                          <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-mono text-xs font-bold flex items-center justify-center shrink-0 border border-primary/20">
                            {item.step}
                          </span>
                          <div>
                            <span className="text-xs font-mono text-primary font-bold block uppercase tracking-wider">
                              Phase {item.step} · {item.phase}
                            </span>
                            <span className="text-sm font-semibold text-foreground">
                              {item.action}
                            </span>
                          </div>
                        </div>
                        <code className="text-xs font-mono bg-slate-100 text-slate-800 px-3 py-1.5 rounded-md border border-slate-200 shrink-0 self-start sm:self-auto">
                          {item.command}
                        </code>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 05. Engineering Challenges & Solutions for non-Terraform */}
              {!isTerraform && project.engineeringChallenges && project.engineeringChallenges.length > 0 ? (
                <section id="challenges" className="scroll-mt-32 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-primary uppercase tracking-widest">
                      05 · Troubleshooting & Resilience
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                      Engineering Challenges & Solutions
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-2xl">
                      Real-world production hurdles encountered during pipeline construction, diagnosed at the container, orchestrator, and registry layers.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {project.engineeringChallenges.map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                      >
                        {/* Header bar */}
                        <div className="px-6 py-4 bg-slate-50/80 border-b border-border flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary font-mono text-xs font-bold flex items-center justify-center">
                              {item.id}
                            </span>
                            <h3 className="text-base font-bold text-foreground">
                              {item.title}
                            </h3>
                          </div>
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-blue-50 text-blue-700 border border-blue-200">
                            {item.category}
                          </span>
                        </div>

                        {/* Content Grid */}
                        <div className="p-6 space-y-5">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Problem Card */}
                            <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200/70 space-y-2">
                              <div className="flex items-center gap-2 text-rose-700 font-semibold text-xs uppercase tracking-wider">
                                <AlertCircle size={15} />
                                <span>The Challenge</span>
                              </div>
                              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                                {item.problem}
                              </p>
                            </div>

                            {/* Solution Card */}
                            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/70 space-y-2">
                              <div className="flex items-center gap-2 text-blue-700 font-semibold text-xs uppercase tracking-wider">
                                <CheckCircle2 size={15} />
                                <span>Architectural Solution</span>
                              </div>
                              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                                {item.solution}
                              </p>
                            </div>
                          </div>

                          {/* Code implementation fix */}
                          {item.codeSnippet && (
                            <div className="rounded-xl bg-[#080B14] border border-blue-900/30 overflow-hidden shadow-inner">
                              <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-white/10 text-[11px] font-mono text-slate-400">
                                <div className="flex items-center gap-2">
                                  <FileCode size={13} className="text-blue-400" />
                                  <span>Implementation Fix</span>
                                </div>
                                <span className="uppercase text-[10px] text-slate-500 font-semibold">
                                  {item.codeSnippet.language}
                                </span>
                              </div>
                              <pre className="p-4 overflow-x-auto text-xs font-mono text-slate-200 leading-relaxed">
                                <code>{item.codeSnippet.code}</code>
                              </pre>
                            </div>
                          )}

                          {/* Impact footer */}
                          <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground border-t border-slate-100">
                            <span className="font-semibold text-foreground">Outcome:</span>
                            <span>{item.impact}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : !isTerraform && project.codeSnippets && (
                <section id="manifests" className="scroll-mt-32 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-primary uppercase tracking-widest">
                      05 · Declarative Code
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                      {project.slug.includes('terraform')
                        ? 'Terraform Manifests & Configurations'
                        : 'Pipeline & Manifest Files'}
                    </h2>
                  </div>

                  {project.codeSnippets.map((snippet, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl bg-[#080B14] border border-blue-900/40 overflow-hidden shadow-xl"
                    >
                      <div className="flex items-center justify-between px-6 py-3.5 bg-black/40 border-b border-white/10 text-xs font-mono text-slate-300">
                        <div className="flex items-center gap-2">
                          <FileCode size={15} className="text-blue-400" />
                          <span>{snippet.title}</span>
                        </div>
                        <span className="uppercase text-[11px] text-slate-500">
                          {snippet.language}
                        </span>
                      </div>
                      <pre className="p-6 overflow-x-auto text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
                        <code>{snippet.code}</code>
                      </pre>
                    </div>
                  ))}
                </section>
              )}

              {/* 06. Verification & Diagram Placeholders */}
              {hasVerification && (
                <section id="verification" className="scroll-mt-32 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-primary uppercase tracking-widest">
                      06 · Verification & Observability
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                      Architecture Proof & Telemetry
                    </h2>
                  </div>

                  {/* Screenshots or Diagram Placeholder */}
                  <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 sm:p-12 text-center space-y-4">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <Terminal size={22} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-foreground">
                        Architecture Diagram & Console Proof
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mt-1">
                        {project.todoPlaceholders && project.todoPlaceholders.length > 0
                          ? project.todoPlaceholders[0]
                          : 'Verified pipeline outputs and telemetry snapshots available in repository.'}
                      </p>
                    </div>
                    {project.todoPlaceholders && (
                      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                        {project.todoPlaceholders.map((todo, ti) => (
                          <span
                            key={ti}
                            className="px-3 py-1 rounded-full text-[11px] font-mono bg-amber-100 text-amber-800 border border-amber-300"
                          >
                            {todo}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* Previous / Next Project Navigation */}
              <ProjectNav currentSlug={project.slug} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
};
