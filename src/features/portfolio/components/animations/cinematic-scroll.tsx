"use client";
import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/shared/ui/badge";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  {
    title: "Global Cloud Orchestration",
    tagline: "Platform Pipeline",
    description: "A multi-region cloud pipeline with automated rollback, zero-downtime deploys, and real-time observability across distributed services.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80",
    accentColor: "#2563EB",
    href: "/work/global-cloud-orchestration",
  },
  {
    title: "Online Electronics Store",
    tagline: "E-Commerce",
    description: "A high-conversion storefront designed with behavioral science principles — precision-crafted product flows, micro-interactions, and a performance-first architecture.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80",
    accentColor: "#7C3AED",
    href: "/work/online-electronics-store",
  },
  {
    title: "CI/CD Pipeline Analytics",
    tagline: "CI/CD Pipeline",
    description: "A real-time dashboard visualizing pipeline health, deployment frequency, and failure rates — turning DevOps telemetry into actionable engineering insight.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=2000&q=80",
    accentColor: "#0891B2",
    href: "/work/cicd-pipeline-analytics",
  },
];

export default function LayeredPanelReveal() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cards = cardsRef.current;
    const total = SECTIONS.length;

    gsap.config({ force3D: true });

    // Card 0 is on top. Cards below start offscreen (yPercent: 100).
    cards.forEach((card, i) => {
      gsap.set(card, {
        yPercent: i === 0 ? 0 : 100,
        scale: 1,
        zIndex: total - i,          // card 0 = highest z, sits on top
        transformOrigin: "50% 0%",  // shrink from top so it feels "pushed back"
        force3D: true,
      });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stickyRef.current,
        start: "top top",
        end: `+=${(total - 1) * 100}vh`,
        scrub: 0.5,
        pin: true,
        pinSpacing: true,       // ← this is critical: adds scroll height OUTSIDE the pin
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // For each transition: next card slides up from bottom, current card scales back
    cards.forEach((_, i) => {
      if (i === total - 1) return; // last card has nothing after it
      tl.to(
        cards[i + 1],
        { yPercent: 0, ease: "power2.inOut", duration: 1 },
        `step${i}`
      ).to(
        cards[i],
        { scale: 0.9, ease: "power2.inOut", duration: 1 },
        `step${i}`
      );
    });

    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(raf);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      tl.kill();
    };
  }, []);

  // wrapperRef gives GSAP a clean block-level ancestor with no height constraints
  return (
    <div ref={wrapperRef}>
      <div
        ref={stickyRef}
        className="relative w-full overflow-hidden"
        style={{ height: "100vh" }}
      >
        {SECTIONS.map((section, i) => (
          <div
            key={i}
            ref={(el) => { if (el) cardsRef.current[i] = el; }}
            className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-10"
            style={{ willChange: "transform" }}
          >
            <Card section={section} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Card({
  section,
}: {
  section: (typeof SECTIONS)[0];
  index: number;
}) {
  return (
    <Link
      href={section.href}
      className="relative w-full max-w-[min(90vw,1120px)] h-[clamp(280px,55vh,560px)] overflow-hidden rounded-2xl bg-white shadow-[0_8px_40px_rgba(0,0,0,0.10)] border border-slate-200 block group"
    >
      <div className="relative grid h-full lg:grid-cols-[1.1fr_1fr]">
        {/* Left: text */}
        <div className="flex h-full flex-col justify-between gap-5 px-8 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
          <div className="space-y-6">
            <span className="text-label text-[#0F172A]/40 uppercase tracking-widest">
              {section.tagline}
            </span>
            <h2 className="text-card-title text-[#0F172A] max-w-[15ch] leading-tight">
              {section.title}
            </h2>
            <p className="max-w-md text-body text-[#64748B]">
              {section.description}
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="capsule">Case Study</Badge>
              <Badge variant="capsule">Live Preview</Badge>
            </div>
          </div>
        </div>

        {/* Right: image */}
        <div className="relative h-full min-h-[240px] overflow-hidden bg-slate-50 lg:border-l lg:border-slate-200">
          <img
            src={section.image}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            alt={section.title}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
        </div>
      </div>
    </Link>
  );
}