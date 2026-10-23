"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "100vh" }}
      aria-labelledby="vault-heading"
    >
      <div className="absolute top-0 left-0 w-full z-20 px-4 sm:px-6 md:px-12 pt-8">
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
          className="absolute inset-0 flex items-start justify-center px-4 sm:px-6 pt-[180px] sm:pt-[220px]"
        >
          <Card project={project} />
        </div>
      ))}
    </section>
  );
}

function Card({ project }: { project: ProjectItem }) {
  return (
    <Link
      href={`/${project.slug}`}
      className="w-full max-w-[1100px] h-[clamp(240px,60vh,520px)] md:h-[clamp(440px,55vh,520px)] rounded-2xl bg-white shadow-xl overflow-hidden grid lg:grid-cols-[1.05fr_1fr] border border-border group hover:border-primary/50 transition-colors"
    >
      <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-widest font-mono text-primary font-bold">
              {project.category}
            </span>
            <span className="text-xs font-mono text-muted-foreground opacity-60">·</span>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              {project.tagline}
            </span>
          </div>

          <h3 className="mt-2 text-[clamp(22px,3.2vw,40px)] font-extrabold leading-tight text-slate-900 group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          <p className="mt-4 text-xs sm:text-sm text-slate-600 max-w-[560px] line-clamp-3 sm:line-clamp-4 leading-relaxed">
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

      <div className="relative hidden sm:block bg-slate-950 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 1024px) 50vw, 550px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    </Link>
  );
}
