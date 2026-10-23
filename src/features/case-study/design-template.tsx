"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/features/header';
import { Footer } from '@/features/footer';
import { Badge } from '@/shared/ui/badge';
import { Breadcrumbs } from '@/features/case-study/breadcrumbs';
import { StickySectionNav, SectionLink } from '@/features/case-study/sticky-section-nav';
import { ProjectNav } from '@/features/case-study/project-nav';
import { ProjectItem } from '@/data/projects';
import { siteConfig } from '@/shared/lib/site-config';
import { cn } from '@/shared/lib/utils';
import {
  Palette,
  Layout,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  BarChart2,
  LayoutDashboard,
  Briefcase,
  ArrowLeftRight,
  FileText,
  User,
  Layers,
  Zap,
  Smartphone,
  Sparkles,
} from 'lucide-react';

const DESIGN_ICONS: Record<string, React.ReactNode> = {
  BarChart2: <BarChart2 className="w-5 h-5 text-primary" />,
  LayoutDashboard: <LayoutDashboard className="w-5 h-5 text-primary" />,
  Briefcase: <Briefcase className="w-5 h-5 text-primary" />,
  ArrowLeftRight: <ArrowLeftRight className="w-5 h-5 text-primary" />,
  FileText: <FileText className="w-5 h-5 text-primary" />,
  User: <User className="w-5 h-5 text-primary" />,
  Layers: <Layers className="w-5 h-5 text-primary" />,
  Zap: <Zap className="w-5 h-5 text-primary" />,
  Smartphone: <Smartphone className="w-5 h-5 text-primary" />,
  Sparkles: <Sparkles className="w-5 h-5 text-primary" />,
};

export const DesignProjectTemplate: React.FC<{ project: ProjectItem }> = ({ project }) => {
  const [activeScreenIndex, setActiveScreenIndex] = useState<number>(0);
  const baseUrl = siteConfig.url.replace(/\/$/, '');

  const sections: SectionLink[] = [
    { id: 'overview', label: '01. Overview' },
    { id: 'screens', label: '02. Screen Breakdown' },
    { id: 'design-system', label: '03. Design System' },
    { id: 'research', label: '04. Insights & Heuristics' },
    {
      id: 'prototype',
      label: project.proofScreens
        ? '05. Production Interface'
        : project.uxDecisions
        ? '05. Design Architecture'
        : '05. Interactive Prototype',
    },
  ];

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
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

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              {project.figmaUrl ? (
                <a
                  href={project.figmaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-xs font-mono font-semibold"
                >
                  <Palette size={15} />
                  <span>Explore Figma Design</span>
                  <ExternalLink size={12} className="opacity-60" />
                </a>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-mono">
                  <AlertCircle size={14} />
                  <span>TODO: Add direct Figma prototype URL</span>
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
              {/* 01. Overview */}
              <section id="overview" className="scroll-mt-32 space-y-8">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
                    01 · Design Narrative & Challenge
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

                {/* Challenge & Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.challenge && (
                    <div className="p-6 rounded-2xl bg-white border border-border space-y-3">
                      <div className="flex items-center gap-2 text-rose-600 font-mono text-xs uppercase tracking-wider font-bold">
                        <AlertCircle size={15} />
                        <span>The Challenge</span>
                      </div>
                      <p className="text-sm text-foreground/85 leading-relaxed">
                        {project.challenge}
                      </p>
                    </div>
                  )}
                  {project.solution && (
                    <div className="p-6 rounded-2xl bg-white border border-border space-y-3">
                      <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-wider font-bold">
                        <Sparkles size={15} />
                        <span>The Design Solution</span>
                      </div>
                      <p className="text-sm text-foreground/85 leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  )}
                </div>

                {/* Tools Stack */}
                <div className="pt-2">
                  <span className="text-xs font-mono uppercase text-muted-foreground tracking-wider block mb-3 font-semibold">
                    Design & Prototyping Tools
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <Badge
                        key={tool}
                        variant="outline"
                        className="rounded-full border-primary/20 text-primary bg-primary/10 px-4 py-1 text-xs font-mono font-bold tracking-wider uppercase"
                      >
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>
              </section>

              {/* 02. Screen Breakdown */}
              {project.screens && (
                <section id="screens" className="scroll-mt-32 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
                      02 · Interface Architecture
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                      Screen Breakdown & Flows
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.screens.map((screen, idx) => (
                      <div
                        key={idx}
                        className="p-6 rounded-2xl bg-white border border-border space-y-3 hover:border-primary/40 hover:shadow-md transition-all group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            {screen.iconName && DESIGN_ICONS[screen.iconName]
                              ? DESIGN_ICONS[screen.iconName]
                              : <Layout className="w-5 h-5 text-primary" />}
                          </div>
                          <span className="text-xs font-mono text-muted-foreground">
                            Screen 0{idx + 1}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                          {screen.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                          {screen.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 03. Design System & Tokens */}
              {project.designSystemTokens && (
                <section id="design-system" className="scroll-mt-32 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
                      03 · Design Foundation
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                      Design System & Tokens
                    </h2>
                  </div>

                  <div className="p-6 sm:p-8 rounded-2xl bg-white border border-border space-y-6">
                    {/* Typography */}
                    <div>
                      <span className="text-xs font-mono uppercase text-muted-foreground tracking-wider block mb-3 font-semibold">
                        Typography Stack
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {project.designSystemTokens.typography.map((font, fi) => (
                          <span
                            key={fi}
                            className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono"
                          >
                            {font}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Color Tokens */}
                    <div>
                      <span className="text-xs font-mono uppercase text-muted-foreground tracking-wider block mb-3 font-semibold">
                        Core Color Tokens
                        {project.designSystemTokens.tokensCount
                          ? ` (${project.designSystemTokens.tokensCount} total tokens)`
                          : ''}
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {project.designSystemTokens.colors.map((c, ci) => (
                          <div
                            key={ci}
                            className="p-3.5 rounded-xl border border-border flex items-center gap-3 bg-slate-50"
                          >
                            <span
                              className="w-7 h-7 rounded-lg border border-black/10 shrink-0 shadow-sm"
                              style={{ backgroundColor: c.hex }}
                            />
                            <div className="overflow-hidden">
                              <span className="block text-xs font-semibold text-foreground truncate">
                                {c.name}
                              </span>
                              <span className="block text-[11px] font-mono text-muted-foreground uppercase">
                                {c.hex}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* 04. Research & Findings */}
              {project.keyFindings && (
                <section id="research" className="scroll-mt-32 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
                      04 · User Insights
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                      Heuristic Evaluation & Research Findings
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {project.keyFindings.map((finding, idx) => (
                      <div
                        key={idx}
                        className="p-5 rounded-xl bg-white border border-border flex items-start gap-3.5"
                      >
                        <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed font-medium">
                          {finding}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 05. Production Implementation & Visual Proof */}
              <section id="prototype" className="scroll-mt-32 space-y-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold">
                      {project.proofSectionSubtitle || '05 · Code Implementation & Visual Proof'}
                    </span>
                    {project.proofSectionBadge && (
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        {project.proofSectionBadge}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                    {project.proofSectionTitle || 'Prototype Walkthrough & Visual Proof'}
                  </h2>
                </div>

                {project.proofScreens && project.proofScreens.length > 0 ? (
                  <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 space-y-6">
                    {/* Interactive Tab Switcher (Approach A) */}
                    <div className="flex flex-wrap gap-2 p-1.5 rounded-xl bg-slate-100 border border-slate-200">
                      {project.proofScreens.map((screen, sIdx) => {
                        const isSelected = activeScreenIndex === sIdx;
                        return (
                          <button
                            key={sIdx}
                            type="button"
                            onClick={() => setActiveScreenIndex(sIdx)}
                            className={cn(
                              "flex-1 min-w-[140px] px-4 py-2.5 rounded-lg text-xs font-mono font-bold transition-all text-center flex items-center justify-center cursor-pointer",
                              isSelected
                                ? "bg-white text-blue-600 shadow-sm border border-slate-200"
                                : "text-slate-600 hover:text-slate-900 hover:bg-white/60 border border-transparent"
                            )}
                          >
                            <span>{screen.title}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Active Screen Display inside Browser Window Frame */}
                    {project.proofScreens[activeScreenIndex] && (
                      <div className="space-y-5">
                        <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#0A0F1E] shadow-2xl">
                          {/* Browser Window Chrome */}
                          <div className="px-4 py-3 bg-[#0E172C] border-b border-slate-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                              <span className="ml-3 text-[11px] font-mono text-slate-400 bg-[#080D1A] px-3 py-1 rounded border border-slate-800">
                                preed.app / {project.proofScreens[activeScreenIndex].title.toLowerCase().replace(/\s+/g, '-')}
                              </span>
                            </div>
                            <span className="hidden sm:inline-block text-[10px] font-mono text-blue-400 font-semibold uppercase tracking-wider">
                              React Client View
                            </span>
                          </div>

                          {/* Screenshot Container */}
                          <div className="relative w-full overflow-hidden bg-[#0B1326] flex items-center justify-center">
                            <Image
                              src={project.proofScreens[activeScreenIndex].image}
                              alt={project.proofScreens[activeScreenIndex].title}
                              width={1920}
                              height={880}
                              className="w-full h-auto object-contain block"
                              sizes="(max-width: 1200px) 100vw, 1200px"
                              priority
                              unoptimized
                            />
                          </div>
                        </div>

                        {/* Technical Highlights & Implementation Notes */}
                        <div className="p-5 rounded-xl bg-slate-50 border border-border space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <h4 className="text-sm font-bold text-foreground">
                              {project.proofScreens[activeScreenIndex].title}
                            </h4>
                            <span className="text-xs font-mono text-muted-foreground">
                              Screen 0{activeScreenIndex + 1} of 0{project.proofScreens.length}
                            </span>
                          </div>

                          <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                            {project.proofScreens[activeScreenIndex].desc}
                          </p>

                          {project.proofScreens[activeScreenIndex].highlights && (
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-200">
                              {project.proofScreens[activeScreenIndex].highlights.map((hl, hIdx) => (
                                <div key={hIdx} className="flex items-start gap-2 text-[11px] font-medium text-slate-700">
                                  <CheckCircle2 size={13} className="text-blue-600 shrink-0 mt-0.5" />
                                  <span>{hl}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                  </div>
                ) : project.uxDecisions && project.uxDecisions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.uxDecisions.map((decision) => (
                      <div
                        key={decision.id}
                        className="p-6 sm:p-7 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-5"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between gap-2">
                            <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary font-mono text-xs font-bold flex items-center justify-center">
                              {decision.id}
                            </span>
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-blue-50 text-blue-700 border border-blue-200">
                              {decision.tag}
                            </span>
                          </div>

                          <div>
                            <h3 className="text-lg font-bold text-foreground">
                              {decision.title}
                            </h3>
                            <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                              {decision.overview}
                            </p>
                          </div>

                          <div className="space-y-3 pt-3 border-t border-slate-100">
                            {decision.keyPoints.map((point, pIdx) => (
                              <div key={pIdx} className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 size={14} className="text-primary shrink-0" />
                                  <h4 className="text-xs font-semibold text-foreground">
                                    {point.title}
                                  </h4>
                                </div>
                                <p className="text-xs text-muted-foreground pl-5 leading-relaxed">
                                  {point.detail}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-border bg-white p-6 sm:p-8 space-y-6">
                    <div className="relative aspect-[16/10] sm:aspect-[21/9] rounded-xl overflow-hidden bg-slate-900 border border-border">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1200px) 100vw, 1000px"
                      />
                    </div>
                  </div>
                )}
              </section>

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
