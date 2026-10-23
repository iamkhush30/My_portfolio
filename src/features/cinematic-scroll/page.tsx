"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import { PROJECTS, ProjectItem } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function LayeredPanelReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const cards = cardsRef.current.filter(Boolean);
    const total = cards.length;
    if (total === 0) return;

    // Use gsap.matchMedia for desktop-only pinning (768px and above)
    // On mobile (< 768px), we use native buttery-smooth scrolling with no pin trapping
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      cards.forEach((card, i) => {
        gsap.set(card, {
          yPercent: i === 0 ? 0 : 100,
          zIndex: i,
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${(total - 1) * window.innerHeight}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      cards.forEach((_, i) => {
        if (i === total - 1) return;

        tl.set(cards[i + 1], { zIndex: total + i });

        tl.to(cards[i + 1], {
          yPercent: 0,
          ease: "power3.inOut",
        }).to(
          cards[i],
          {
            scale: 0.92,
            opacity: 0.85,
          },
          "<"
        );
      });
    });

    ScrollTrigger.refresh();

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section aria-labelledby="vault-heading" className="relative w-full">
      {/* ── DESKTOP PINNED CINEMATIC CARDS (md and up) ── */}
      <div
        ref={sectionRef}
        className="hidden md:block relative w-full"
        style={{ height: "100vh" }}
      >
        <div className="absolute top-0 left-0 w-full z-20 px-6 md:px-12 pt-8">
          <div className="max-w-6xl mx-auto">
            <span className="text-label text-primary uppercase tracking-widest font-mono text-xs">
              Selected Archive
            </span>
            <h2 id="vault-heading" className="text-heading text-foreground mt-2">
              My Vault
            </h2>
          </div>
        </div>

        {PROJECTS.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className="absolute inset-0 flex items-start justify-center px-6 pt-[220px]"
          >
            <DesktopCard project={project} />
          </div>
        ))}
      </div>

      {/* ── MOBILE RESPONSIVE VAULT FEED (< md) ── */}
      {/* Free-scrolling, native momentum, touch-friendly, zero pinning glitches */}
      <div className="block md:hidden px-4 pt-10 pb-16">
        <div className="mb-6">
          <span className="text-label text-primary uppercase tracking-widest font-mono text-xs font-semibold">
            Selected Archive
          </span>
          <h2 className="text-3xl font-extrabold text-foreground mt-1 tracking-tight">
            My Vault
          </h2>
        </div>

        <div className="space-y-6">
          {PROJECTS.map((project) => (
            <MobileCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Desktop Card with Split Screen Presentation */
function DesktopCard({ project }: { project: ProjectItem }) {
  return (
    <Link
      href={`/${project.slug}`}
      className="w-full max-w-[1100px] h-[clamp(440px,55vh,520px)] rounded-2xl bg-white shadow-xl overflow-hidden grid grid-cols-[1.05fr_1fr] border border-border group hover:border-primary/50 transition-colors"
    >
      <div className="p-8 lg:p-10 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-widest font-mono text-primary font-bold">
              {project.category}
            </span>
            <span className="text-xs font-mono text-muted-foreground opacity-60">·</span>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider truncate">
              {project.tagline}
            </span>
          </div>

          <h3 className="mt-2 text-[clamp(24px,3.2vw,40px)] font-extrabold leading-tight text-slate-900 group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          <p className="mt-4 text-sm text-slate-600 max-w-[560px] line-clamp-3 leading-relaxed">
            {project.summary}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2.5">
          <Badge variant="capsule" className="bg-slate-900 text-white border-slate-900 text-[11px] font-mono">
            CASE STUDY
          </Badge>
          {project.hasLivePreview && (
            <Badge variant="capsule" className="bg-emerald-50 text-emerald-700 border-emerald-300 text-[11px] font-mono">
              LIVE PREVIEW
            </Badge>
          )}
          {project.isDraftSlot && (
            <Badge variant="capsule" className="bg-blue-50 text-blue-700 border-blue-200 text-[11px] font-mono">
              DEVOPS SLOT
            </Badge>
          )}
        </div>
      </div>

      <div className="relative bg-slate-950 overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} - ${project.category} case study showcase preview by Khush Makwana`}
          fill
          sizes="(max-width: 1024px) 50vw, 550px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </Link>
  );
}

/** Mobile Touch-Optimized Card - Crisp, Full Width, Native Scrolling */
function MobileCard({ project }: { project: ProjectItem }) {
  return (
    <Link
      href={`/${project.slug}`}
      className="block w-full rounded-2xl bg-white border border-border shadow-md overflow-hidden active:scale-[0.99] transition-transform"
    >
      {/* Top Project Visual */}
      <div className="relative w-full h-[180px] xs:h-[210px] bg-slate-950 overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} - ${project.category} mobile showcase preview by Khush Makwana`}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <Badge variant="capsule" className="bg-slate-900/90 text-white border-white/20 text-[10px] font-mono backdrop-blur-md">
            {project.category}
          </Badge>
        </div>
      </div>

      {/* Content Details */}
      <div className="p-4 xs:p-5 flex flex-col justify-between space-y-3">
        <div>
          <span className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider block">
            {project.tagline}
          </span>
          <h3 className="text-lg xs:text-xl font-bold text-slate-900 leading-snug mt-1">
            {project.title}
          </h3>
          <p className="mt-2 text-xs xs:text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Card Footer with CTA */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-primary">CASE STUDY</span>
            {project.hasLivePreview && (
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                LIVE
              </span>
            )}
          </div>
          <span className="text-xs font-mono text-primary font-semibold flex items-center gap-1">
            <span>Explore</span>
            <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </Link>
  );
}
