"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Cpu, Layers, Terminal, Globe } from 'lucide-react';
import { PlaceHolderImages } from '@/app/lib/placeholder-images';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  imageId: string;
  icon: React.ReactNode;
}

const projects: Project[] = [
  {
    id: "01",
    title: "Helios Cloud Infrastructure",
    category: "DevOps & Systems Architecture",
    description: "Architecting a multi-region AWS environment using Terraform and Kubernetes. Optimized for high availability and automated scaling, reducing operational overhead by 40%. All infrastructure is defined as code for reproducible precision.",
    tags: ["Terraform", "AWS", "EKS", "GitHub Actions"],
    imageId: "project-1",
    icon: <Cpu className="w-4 h-4 text-primary" />
  },
  {
    id: "02",
    title: "Nexus Visual Language",
    category: "UI/UX & Product Design",
    description: "Developing a comprehensive design system focused on accessibility and cognitive load. Bridging the gap between complex data visualization and intuitive user journeys through rigorous prototyping.",
    tags: ["Figma", "Design Systems", "React", "A11y"],
    imageId: "project-2",
    icon: <Layers className="w-4 h-4 text-primary" />
  },
  {
    id: "03",
    title: "Infrastructure Pipeline Monitoring",
    category: "Full-Stack Development",
    description: "A real-time observability platform for CI/CD pipelines. Visualizing system health through a high-performance interface with predictive failure analytics and smooth motion design.",
    tags: ["Next.js", "Genkit", "Firebase", "Go"],
    imageId: "project-4",
    icon: <Terminal className="w-4 h-4 text-primary" />
  }
];

const ProjectSection = ({ project, index }: { project: Project, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const image = PlaceHolderImages.find(img => img.id === project.imageId);

  return (
    <div 
      ref={cardRef}
      className="relative w-full py-16 md:py-24 border-b border-border/50 bg-white"
    >
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Visual Content */}
        <div className="relative lg:col-span-4 aspect-video rounded-sm overflow-hidden shadow-xl border border-border group lg:order-1">
          {image && (
            <Image 
              src={image.imageUrl}
              alt={image.description}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
              data-ai-hint={image.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 via-transparent to-transparent pointer-events-none"></div>
          
          <div className="absolute bottom-3 left-3 flex flex-col gap-1 z-10">
            <div className="bg-white/95 backdrop-blur px-1.5 py-0.5 border-l-2 border-primary shadow-sm">
              <span className="text-[8px] font-bold text-primary uppercase tracking-[0.2em]">{project.category}</span>
            </div>
            <div className="bg-[#0F172A]/90 backdrop-blur px-1.5 py-0.5 border-l-2 border-white/20">
              <span className="text-[8px] font-code text-white/70 uppercase tracking-widest">REF: {project.id}</span>
            </div>
          </div>
        </div>

        {/* Narrative Content */}
        <div className="lg:col-span-8 flex flex-col gap-6 lg:order-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center bg-primary/5 text-primary">
              {project.icon}
            </div>
            <h3 className="text-card-title group-hover:text-primary transition-colors">
              {project.title}
            </h3>
          </div>

          <p className="text-body text-[#334155] leading-relaxed font-body font-medium">
            {project.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-border pt-6">
            <div className="space-y-2">
              <h4 className="text-[9px] font-bold uppercase tracking-[0.3em] text-primary/40">Core Stack</h4>
              <div className="flex flex-wrap gap-1">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[8px] font-bold tracking-widest uppercase px-1.5 py-0.5 bg-secondary text-primary/80 border border-primary/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-end justify-start md:justify-end">
              <button className="group flex items-center gap-3 w-fit">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#0F172A] group-hover:text-primary transition-colors">Case Study</span>
                <div className="w-8 h-8 rounded-full border border-[#0F172A]/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#0F172A] group-hover:text-white transition-colors" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const WorkParallax = () => {
  return (
    <section id="work" className="relative z-20 bg-[#FFFFFF] py-24 overflow-hidden border-t">
      <div className="container mx-auto px-6 mb-16 md:mb-20">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-[1px] bg-primary"></div>
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-primary/40">Technical Portfolio</span>
          </div>
          <h2 className="text-heading text-[#0F172A]">
            Selected Artifacts
          </h2>
          <p className="max-w-xl text-muted-foreground text-body">
            A comprehensive look at systems architected and experiences designed. High performance, meeting high fidelity.
          </p>
        </div>
      </div>

      <div className="space-y-0">
        {projects.map((project, index) => (
          <ProjectSection key={project.id} project={project} index={index} />
        ))}
      </div>

      <div className="container mx-auto px-6 py-16 flex flex-col items-center justify-center text-center">
        <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent mb-8"></div>
        <span className="text-[9px] font-code text-[#0F172A]/30 tracking-[1em] uppercase">System Archive Complete</span>
        <Globe className="w-5 h-5 text-[#0F172A]/10 mt-6 animate-spin-slow" />
      </div>
    </section>
  );
};
