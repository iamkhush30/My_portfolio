"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/shared/ui/badge";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
    {
        title: "CI/CD Pipeline Analytics",
        tagline: "CI/CD Pipeline",
        description:
            "A real-time dashboard visualizing pipeline health, deployment frequency, and failure rates — turning DevOps telemetry into actionable engineering insight.",
        image: "/assets/CICD-Pipeline.png",
        href: "/cicd-pipeline-analytics",
    },
    {
        title: "Preed · Financial Intelligence",
        tagline: "UI/UX Case Study",
        description:
            "A full-featured AI-powered stock prediction web application — combining algorithmic signal analysis, portfolio tracking, and multi-stock comparison into a single, data-dense dashboard for retail investors.",
        image:
            "/assets/preed.png",
        href: "/preed-financial-intelligence",
    },
    {
        title: "Online Electronics Store",
        tagline: "E-Commerce",
        description:
            "A high-conversion storefront designed with behavioral science principles — precision-crafted product flows, micro-interactions, and a performance-first architecture.",
        image:
            "/assets/Electronic-Store.png",
        href: "/online-electronics-store",
    },
];

export default function LayeredPanelReveal() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const cards = cardsRef.current;
        const total = cards.length;

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
        >
            <div className="absolute top-0 left-0 w-full z-20 px-6 md:px-12 pt-8">
                <div className="max-w-6xl mx-auto">
                    <span className="text-label text-primary">Selected Archive</span>
                    <h2 className="text-heading text-foreground mt-4">My Vault</h2>
                </div>
            </div>

            {SECTIONS.map((section, i) => (
                <div
                    key={i}
                    ref={(el) => {
                        if (el) cardsRef.current[i] = el;
                    }}
                    className="absolute inset-0 flex items-start justify-center px-6 pt-[220px]"
                >
                    <Card section={section} />
                </div>
            ))}
        </section>
    );
}

function Card({ section }: any) {
    return (
        <Link
            href={section.href}
            className="w-full max-w-[1100px] h-[clamp(200px,60vh,520px)] md:h-[clamp(440px,55vh,520px)] rounded-2xl bg-white shadow-xl overflow-hidden grid lg:grid-cols-[1.05fr_1fr]"
        >
            <div className="p-8 lg:p-10 flex flex-col">
                <span className="text-sm uppercase tracking-widest text-gray-400">
                    {section.tagline}
                </span>

                <h2 className="mt-4 text-[clamp(30px,3.8vw,44px)] font-extrabold leading-tight text-slate-900">
                    {section.title}
                </h2>

                <p className="mt-6 text-gray-500 max-w-[560px]">{section.description}</p>

                <div className="mt-auto flex items-center gap-3">
                    <Badge variant="capsule">CASE STUDY</Badge>
                    <Badge variant="capsule">LIVE PREVIEW</Badge>
                </div>
            </div>

            <div className="relative">
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src={section.image}
                        className="absolute inset-0 w-full h-full object-cover"
                        aria-hidden
                    />
                </div>
            </div>
        </Link>
    );
}
