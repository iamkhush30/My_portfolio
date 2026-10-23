"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/shared/ui/badge';
import {
  Server,
  Cloud,
  Palette,
  ArrowRight,
  GitBranch,
  Settings,
  Box,
  Database,
  Rocket,
  Activity,
  Search,
  Layout,
  Smartphone,
  CheckCircle2,
} from 'lucide-react';
import { cn } from '@/shared/lib/utils';

interface StackNode {
  id: string;
  label: string;
  tool: string;
  desc: string;
  icon: React.ReactNode;
}

const DEVOPS_NODES: StackNode[] = [
  {
    id: 'source',
    label: 'Source',
    tool: 'GitLab / Git',
    desc: 'Version-controlled codebase with branch protections and commit triggers.',
    icon: <GitBranch className="w-4 h-4 text-blue-400" />,
  },
  {
    id: 'build',
    label: 'Build',
    tool: 'Jenkins CI',
    desc: 'Declarative pipelines running automated tests and artifact compilation.',
    icon: <Settings className="w-4 h-4 text-blue-400" />,
  },
  {
    id: 'package',
    label: 'Package',
    tool: 'Docker',
    desc: 'Immutable, multi-stage container images built for deterministic runs.',
    icon: <Box className="w-4 h-4 text-blue-400" />,
  },
  {
    id: 'registry',
    label: 'Registry',
    tool: 'Nexus / ECR',
    desc: 'Encrypted artifact storage with semantic build-ID version tagging.',
    icon: <Database className="w-4 h-4 text-blue-400" />,
  },
  {
    id: 'deploy',
    label: 'Deploy',
    tool: 'Kubernetes / AWS',
    desc: 'Zero-downtime rolling deployments and declarative cluster workloads.',
    icon: <Rocket className="w-4 h-4 text-blue-400" />,
  },
  {
    id: 'monitor',
    label: 'Monitor',
    tool: 'CloudWatch / Prom',
    desc: 'Real-time telemetry, automated health probes, and alert thresholds.',
    icon: <Activity className="w-4 h-4 text-blue-400" />,
  },
];

const DESIGN_NODES: StackNode[] = [
  {
    id: 'research',
    label: 'Research',
    tool: 'User Discovery',
    desc: 'User journey mapping, cognitive heuristics, and workflow analysis.',
    icon: <Search className="w-4 h-4 text-indigo-400" />,
  },
  {
    id: 'wireframe',
    label: 'Wireframe',
    tool: 'Figma Low-Fi',
    desc: 'Rapid structural architecture, layout hierarchy, and user flows.',
    icon: <Layout className="w-4 h-4 text-indigo-400" />,
  },
  {
    id: 'prototype',
    label: 'Prototype',
    tool: 'Figma Hi-Fi',
    desc: 'Interactive micro-animations, design tokens, and density testing.',
    icon: <Smartphone className="w-4 h-4 text-indigo-400" />,
  },
  {
    id: 'handoff',
    label: 'Handoff',
    tool: 'Tokens & Specs',
    desc: 'CSS variable tokens, responsive spacing, and component contracts.',
    icon: <CheckCircle2 className="w-4 h-4 text-indigo-400" />,
  },
];

interface CapabilityCardData {
  title: string;
  bgTitle: string;
  outcome: string; // Max 12 words
  tools: string[];
  proofHref: string;
  stat: string;
  statLabel: string;
  icon: React.ReactNode;
}

const CAPABILITIES: CapabilityCardData[] = [
  {
    title: 'Cloud & DevOps Engineering',
    bgTitle: 'DevOps',
    outcome:
      'Automated end-to-end CI/CD pipelines shipping tested code without manual intervention.',
    tools: ['GitLab CI', 'Jenkins', 'Docker', 'Kubernetes', 'Nexus'],
    proofHref: '/cicd-pipeline-ml-app',
    stat: '100%',
    statLabel: 'Automated Delivery',
    icon: <Server className="w-8 h-8 text-primary" />,
  },
  {
    title: 'AWS Cloud Infrastructure',
    bgTitle: 'AWS',
    outcome:
      'Modular AWS infrastructure with Terraform: dynamic Ubuntu AMIs, Nginx compute, encrypted S3, and DynamoDB.',
    tools: ['Terraform', 'AWS EC2', 'AWS S3', 'DynamoDB', 'Nginx'],
    proofHref: '/aws-terraform-infrastructure',
    stat: 'ap-south-1',
    statLabel: 'Primary Region',
    icon: <Cloud className="w-8 h-8 text-primary" />,
  },
  {
    title: 'UI/UX & Design Systems',
    bgTitle: 'Design',
    outcome:
      'Data-dense interfaces, wireframes, and design systems engineered for cognitive clarity.',
    tools: ['Figma', 'Wireframing', 'Design Systems', 'User Research', 'Prototyping'],
    proofHref: '/preed-financial-intelligence',
    stat: 'Atomic',
    statLabel: 'Design System Architecture',
    icon: <Palette className="w-8 h-8 text-primary" />,
  },
];

export const SkillsParallax = () => {
  const [activeDevopsNode, setActiveDevopsNode] = useState<string>('build');
  const [activeDesignNode, setActiveDesignNode] = useState<string>('wireframe');

  const selectedDevops =
    DEVOPS_NODES.find((n) => n.id === activeDevopsNode) || DEVOPS_NODES[0];
  const selectedDesign =
    DESIGN_NODES.find((n) => n.id === activeDesignNode) || DESIGN_NODES[0];

  return (
    <div className="relative z-10 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 space-y-3">
          <span className="text-label text-primary uppercase tracking-widest font-mono text-xs">
            Architecture & Capabilities
          </span>
          <h2 className="text-heading text-foreground tracking-tight">
            My Lab
          </h2>
          <p className="text-body text-muted-foreground max-w-2xl text-sm sm:text-base">
            Interactive system architecture and core competencies. Scan the pipeline stages below, or explore verified case studies.
          </p>
        </div>

        {/* ── 3 SCANNABLE CAPABILITY CARDS (Scan-First) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 md:mb-24">
          {CAPABILITIES.map((cap, idx) => (
            <div
              key={idx}
              className="relative rounded-2xl bg-white border border-border p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-primary/50 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    {cap.icon}
                  </div>
                  <div className="text-right">
                    <span className="block text-2xl font-bold font-mono text-primary">
                      {cap.stat}
                    </span>
                    <span className="block text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                      {cap.statLabel}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">
                  {cap.title}
                </h3>

                {/* Scannable one-line outcome (Max 12 words) */}
                <p className="text-sm text-foreground/80 font-medium leading-relaxed mb-6">
                  {cap.outcome}
                </p>

                {/* 3-5 Tool Chips */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {cap.tools.map((t, ti) => (
                    <Badge
                      key={ti}
                      variant="capsule"
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200 text-xs py-1 px-3"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* One "See proof →" link to matching Vault project */}
              <div className="pt-4 border-t border-border">
                <Link
                  href={cap.proofHref}
                  className="inline-flex items-center gap-2 text-primary hover:text-blue-700 font-semibold text-sm group-hover:gap-3 transition-all"
                  aria-label={`See proof for ${cap.title}`}
                >
                  <span>See proof</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ── INTERACTIVE STACK DIAGRAM (3D Cyber Style) ── */}
        <div className="rounded-2xl bg-[#080B14] border border-blue-900/40 p-6 md:p-10 shadow-2xl relative overflow-hidden">
          {/* Ambient Glow Effects */}
          <div
            className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 space-y-10">
            {/* Diagram Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-blue-400">
                  Interactive Pipeline Architecture
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Full-Cycle DevOps & Design Flow
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Hover any node for details</span>
              </div>
            </div>

            {/* Row 1: DevOps Nodes */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-blue-400 uppercase tracking-wider">
                <span>01. DevOps Delivery Pipeline</span>
                <span className="text-slate-400 hidden sm:inline">Source → Deploy</span>
              </div>

              <div
                role="tablist"
                aria-label="DevOps Delivery Stages"
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3"
              >
                {DEVOPS_NODES.map((node) => {
                  const isActive = activeDevopsNode === node.id;
                  return (
                    <button
                      key={node.id}
                      role="tab"
                      aria-selected={isActive}
                      tabIndex={0}
                      onClick={() => setActiveDevopsNode(node.id)}
                      onMouseEnter={() => setActiveDevopsNode(node.id)}
                      className={cn(
                        "group relative flex flex-col items-start p-3.5 rounded-xl border transition-all duration-200 text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                        isActive
                          ? "bg-blue-950/50 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.25)] translate-y-[-2px]"
                          : "bg-white/[0.03] border-white/10 hover:border-blue-500/50 hover:bg-white/[0.06]"
                      )}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <div className={cn("p-1.5 rounded-lg", isActive ? "bg-blue-600/30" : "bg-white/5")}>
                          {node.icon}
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 group-hover:text-blue-300">
                          {node.id.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-white group-hover:text-blue-200">
                        {node.label}
                      </span>
                      <span className="text-xs text-blue-400/90 font-mono mt-0.5 truncate w-full">
                        {node.tool}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* DevOps Active Detail Card */}
              <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                    {selectedDevops.icon}
                  </div>
                  <div>
                    <span className="font-semibold text-white">
                      {selectedDevops.label} ({selectedDevops.tool}):
                    </span>{" "}
                    <span className="text-slate-300">{selectedDevops.desc}</span>
                  </div>
                </div>
                <Link
                  href="/cicd-pipeline-ml-app"
                  className="shrink-0 text-blue-400 hover:text-blue-300 font-mono text-xs flex items-center gap-1.5 group font-medium"
                >
                  <span>See Pipeline Proof</span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Row 2: Design Nodes */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between text-xs font-mono text-indigo-400 uppercase tracking-wider">
                <span>02. UI/UX Design Lifecycle</span>
                <span className="text-slate-400 hidden sm:inline">Research → Handoff</span>
              </div>

              <div
                role="tablist"
                aria-label="UI/UX Design Lifecycle Stages"
                className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3"
              >
                {DESIGN_NODES.map((node) => {
                  const isActive = activeDesignNode === node.id;
                  return (
                    <button
                      key={node.id}
                      role="tab"
                      aria-selected={isActive}
                      tabIndex={0}
                      onClick={() => setActiveDesignNode(node.id)}
                      onMouseEnter={() => setActiveDesignNode(node.id)}
                      className={cn(
                        "group relative flex flex-col items-start p-3.5 rounded-xl border transition-all duration-200 text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                        isActive
                          ? "bg-indigo-950/50 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.25)] translate-y-[-2px]"
                          : "bg-white/[0.03] border-white/10 hover:border-indigo-500/50 hover:bg-white/[0.06]"
                      )}
                    >
                      <div className="flex items-center justify-between w-full mb-2">
                        <div className={cn("p-1.5 rounded-lg", isActive ? "bg-indigo-600/30" : "bg-white/5")}>
                          {node.icon}
                        </div>
                        <span className="text-[10px] font-mono text-slate-400 group-hover:text-indigo-300">
                          {node.id.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-white group-hover:text-indigo-200">
                        {node.label}
                      </span>
                      <span className="text-xs text-indigo-400/90 font-mono mt-0.5 truncate w-full">
                        {node.tool}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Design Active Detail Card */}
              <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                    {selectedDesign.icon}
                  </div>
                  <div>
                    <span className="font-semibold text-white">
                      {selectedDesign.label} ({selectedDesign.tool}):
                    </span>{" "}
                    <span className="text-slate-300">{selectedDesign.desc}</span>
                  </div>
                </div>
                <Link
                  href="/preed-financial-intelligence"
                  className="shrink-0 text-indigo-400 hover:text-indigo-300 font-mono text-xs flex items-center gap-1.5 group font-medium"
                >
                  <span>See Design Proof</span>
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
