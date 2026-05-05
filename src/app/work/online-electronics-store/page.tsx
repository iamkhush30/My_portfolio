
"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/features/portfolio/components/header';
import { Footer } from '@/features/portfolio/components/footer';
import { Badge } from '@/shared/ui/badge';
import { PlaceHolderImages } from '@/app/lib/placeholder-images';
import { cn } from '@/shared/lib/utils';
import { useScrollAnimation } from '@/shared/hooks/use-scroll-animation';
import { User, Zap, Smartphone, Layers } from 'lucide-react';

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
        // Reduced shadow intensity: multiplier changed from 2 to 0.8, blur from 50px to 25px
        boxShadow: tilt.x === 0 && tilt.y === 0
          ? '0 10px 20px -5px rgba(0,0,0,0.05)'
          : `${-tilt.y * 0.8}px ${tilt.x * 0.8}px 25px -8px rgba(0,0,0,0.2)`,
        transition: tilt.x === 0 && tilt.y === 0 ? 'transform 0.5s ease-out, box-shadow 0.5s ease' : 'transform 0.1s linear, box-shadow 0.1s linear',
        transformStyle: 'preserve-3d'
      }}
    >
      <div
        className="relative z-10 w-full h-full"
        style={{ transform: 'translateZ(15px)' }}
      >
        {children}
      </div>
    </div>
  );
};

const ScreenItem = ({ title, desc }: { title: string; desc: string }) => {
  return (
                <InteractiveCard className="flex-1 flex flex-col justify-center p-6 card-surface bg-white">
      <h4 className="text-body font-bold text-primary group-hover:text-primary transition-colors">
        {title}
      </h4>
      <p className="text-body">
        {desc}
      </p>
    </InteractiveCard>
  );
};

export default function OnlineElectronicsStore() {
  const projectImage = PlaceHolderImages.find(img => img.id === 'project-2');

  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
  const { ref: screenRef, isVisible: screenVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: processRef, isVisible: processVisible } = useScrollAnimation<HTMLDivElement>();

  const screens = [
    { title: "Login & Sign Up", desc: "Clean authentication with guided onboarding" },
    { title: "Home & Categories", desc: "Scannable product grid with smart category filtering" },
    { title: "Search Screen", desc: "Real-time search with product results and filters" },
    { title: "Cart & Checkout", desc: "Streamlined cart with address selection and payment flow" },
    { title: "25+ Screens", desc: "Including Profile, Orders, Notifications, and Admin views" }
  ];

  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <Header />

      <div className="relative z-10 pt-[var(--space)] pb-[var(--space)]">
        <div className="container-padding mx-auto">

          <nav className="flex items-center gap-2 mb-16 opacity-0 animate-entrance-fade-up">
            <Link href="/#vault" className="text-label text-primary hover:underline">
              My Vault
            </Link>
            <span className="text-label text-muted-foreground">/</span>
            <span className="text-label text-muted-foreground">Online Electronics Store</span>
          </nav>

          <div ref={heroRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16">

            <div className={cn(
              "lg:col-span-6 flex flex-col transition-all duration-700",
              heroVisible ? "opacity-100" : "opacity-0 translate-y-6"
            )}>
              <div className="space-y-6 mb-8">
                <h1 className="text-heading">
                  Online<br />Electronics<br />Store
                </h1>

                <div className="w-12 h-1 bg-primary my-10"></div>

                <p className="text-body max-w-[440px]">
                  A full-featured e-commerce mobile application designed from the ground up — combining intuitive user flows with high-fidelity visual design to eliminate friction and drive seamless shopping experiences.
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
                    <span className="text-body">UI/UX Designer</span>
                  </div>
                </InteractiveCard>
              </div>

              <div
                style={{
                  animation: `entrance-fade-up 0.6s cubic-bezier(0.23, 1, 0.32, 1) both`,
                  animationDelay: `${heroVisible ? '60ms' : '0ms'}`,
                }}
              >
                <InteractiveCard className="flex items-start py-5 px-8 card-surface bg-white group">
                  <div className="flex items-start w-full">
                    <Zap className="w-4 h-4 text-primary mr-4 mt-1 opacity-40 group-hover:opacity-100 transition-opacity" />
                    <span className="text-body font-bold text-primary w-32 shrink-0 mt-0.5">Focus</span>
                    <div className="flex flex-col">
                      <span className="text-body">User Research · Flows</span>
                      <span className="text-body">UI · Prototyping</span>
                    </div>
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
                    <Smartphone className="w-4 h-4 text-primary mr-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                    <span className="text-body font-bold text-primary w-32 shrink-0">Screens</span>
                    <span className="text-body">25+ Screens</span>
                  </div>
                </InteractiveCard>
              </div>

              <div
                style={{
                  animation: `entrance-fade-up 0.6s cubic-bezier(0.23, 1, 0.32, 1) both`,
                  animationDelay: `${heroVisible ? '180ms' : '0ms'}`,
                }}
              >
                <InteractiveCard className="flex items-center py-5 px-8 card-surface bg-white group">
                  <div className="flex items-center w-full">
                    <Layers className="w-4 h-4 text-primary mr-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                    <span className="text-body font-bold text-primary w-32 shrink-0">Tools</span>
                    <div className="flex flex-wrap gap-2">
                      {['FIGMA', 'USER RESEARCH', 'PROTOTYPING', 'A11Y'].map((tool) => (
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

          <section className="mt-[var(--space-lg)] border-t border-border">
            <div ref={screenRef} className={cn(
              "mb-16 space-y-4 transition-all duration-700",
              screenVisible ? "opacity-100" : "opacity-0 translate-y-8"
            )}>
              <span className="text-label text-muted-foreground">
                Case Study · Application Screens
              </span>
              <h2 className="text-heading font-bold">Screen Coverage</h2>
              <div className="w-16 h-1 bg-primary"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">

              <div className="lg:col-span-5 flex flex-col">
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-primary/10 card-surface group transition-transform duration-700 hover:scale-[1.01] hover:border-primary/50">
                  {projectImage && (
                    <>
                      <Image
                        src={projectImage.imageUrl}
                        alt={projectImage.description}
                        fill
                        className="object-cover opacity-60 transition-transform duration-700 group-hover:scale-110"
                        data-ai-hint={projectImage.imageHint}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-80 transition-opacity duration-500"></div>
                    </>
                  )}

                  <div className="absolute bottom-8 left-8 z-20">
                    <span className="text-label text-foreground/60">
                      Project Artifact
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col gap-4">
                {screens.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      animation: `entrance-fade-up 0.6s cubic-bezier(0.23, 1, 0.32, 1) both`,
                      animationDelay: `${screenVisible ? i * 60 : 0}ms`,
                    }}
                  >
                    <ScreenItem
                      title={item.title}
                      desc={item.desc}
                    />
                  </div>
                ))}
              </div>

            </div>
          </section>

          <section className="mt-[var(--space-xl)] border-t border-border">
            <div ref={processRef} className={cn(
              "mb-16 space-y-4 transition-all duration-700",
              processVisible ? "opacity-100" : "opacity-0 translate-y-8"
            )}>
              <span className="text-label text-primary">Process</span>
              <h2 className="text-heading">Design Process</h2>
              <div className="w-16 h-1 bg-primary"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  num: "01",
                  label: "Research",
                  title: "User Research",
                  desc: "Identified pain points in existing e-commerce UX through analysis and competitive research"
                },
                {
                  num: "02",
                  label: "Architecture",
                  title: "User Flow Design",
                  desc: "Mapped end-to-end journeys for both User and Admin personas with clear interaction paths"
                },
                {
                  num: "03",
                  label: "Design",
                  title: "UI Design",
                  desc: "Crafted high-fidelity screens with consistent design tokens, components and visual hierarchy"
                },
                {
                  num: "04",
                  label: "Validate",
                  title: "Prototyping",
                  desc: "Interactive prototypes validated usability before handoff — iterating until flows felt effortless"
                }
              ].map((step, i) => (
                <div
                  key={i}
                  style={{
                    animation: `entrance-scale 0.6s cubic-bezier(0.23, 1, 0.32, 1) both`,
                    animationDelay: `${processVisible ? i * 80 : 0}ms`,
                  }}
                >
                  <InteractiveCard
                    className="card-surface p-8 bg-white hover:border-primary/50 transition-colors"
                  >
                    <div className="space-y-4">
                      <h3 className="text-body font-bold text-primary leading-tight">{step.title}</h3>
                      <p className="text-body leading-relaxed">
                        <span className="font-bold">{step.label}:</span> {step.desc}
                      </p>
                    </div>
                  </InteractiveCard>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-6 pt-4 border-t border-border flex flex-col md:flex-row items-center justify-between gap-8">
            <Link
              href="/#vault"
              className="text-label text-secondary-foreground flex items-center gap-3 group hover:text-primary transition-colors uppercase"
            >
              <span className="text-lg transition-transform group-hover:-translate-x-1">←</span>
              <span>Back to Vault</span>
            </Link>

            <div className="text-label text-muted-foreground uppercase">
              Online Electronics Store · UI/UX · 2024
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
