"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/portfolio/header';
import { Footer } from '@/components/portfolio/footer';
import { PlaceHolderImages } from '@/app/lib/placeholder-images';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { cn } from '@/lib/utils';

export default function GlobalCloudOrchestration() {
  const projectImage = PlaceHolderImages.find(img => img.id === 'project-1');
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <Header />

      <div className="relative z-10 pt-[var(--space)] pb-[var(--space)]">
        <div className="container-padding mx-auto">
          <nav className="flex items-center gap-2 mb-16 opacity-0 animate-entrance-fade-up">
            <Link href="/#work" className="text-label text-primary hover:underline">
              My Vault
            </Link>
            <span className="text-label text-muted-foreground">/</span>
            <span className="text-label text-muted-foreground">Global Cloud Orchestration</span>
          </nav>

          <div ref={heroRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16">
            <div className={cn(
              "lg:col-span-6 flex flex-col transition-all duration-700",
              heroVisible ? "opacity-100" : "opacity-0 translate-y-6"
            )}>
              <div className="space-y-6 mb-8">
                <span className="text-label text-primary">Selected Archive · Cloud Architecture</span>
                <h1 className="text-heading">
                  Global Cloud<br />Orchestration
                </h1>
                <div className="w-12 h-1 bg-primary my-10"></div>
                <p className="text-body max-w-[480px]">
                  A cloud infrastructure case study focused on orchestration, automation, and operational visibility across distributed environments.
                </p>
              </div>
            </div>

            <div className={cn(
              "lg:col-span-6 transition-all duration-700 delay-100",
              heroVisible ? "opacity-100" : "opacity-0 translate-y-6"
            )}>
              <div className="relative w-full aspect-[3/4] overflow-hidden border border-border rounded-2xl bg-secondary/40 shadow-2xl">
                {projectImage && (
                  <>
                    <Image
                      src={projectImage.imageUrl}
                      alt={projectImage.description}
                      fill
                      className="object-cover opacity-70"
                      data-ai-hint={projectImage.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
                  </>
                )}
                <div className="absolute bottom-8 left-8 z-20">
                  <span className="text-label text-foreground/60">Project Artifact</span>
                </div>
              </div>
            </div>
          </div>

          <section className="mt-[var(--space-lg)] border-t border-border py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Scope', value: 'Multi-region orchestration' },
                { label: 'Focus', value: 'Automation and governance' },
                { label: 'Outcome', value: 'Unified operational control' },
              ].map((item) => (
                <div key={item.label} className="bg-secondary/40 border border-border rounded-2xl p-8">
                  <span className="text-label text-primary">{item.label}</span>
                  <p className="text-body mt-3">{item.value}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-6 pt-4 border-t border-border flex flex-col md:flex-row items-center justify-between gap-8">
            <Link href="/#work" className="text-label text-muted-foreground flex items-center gap-2 group hover:text-foreground transition-colors uppercase">
              <span className="text-lg transition-transform group-hover:-translate-x-1">←</span>
              <span>Back to Vault</span>
            </Link>
            <div className="text-label text-muted-foreground">
              Global Cloud Orchestration · Cloud · Platform
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}