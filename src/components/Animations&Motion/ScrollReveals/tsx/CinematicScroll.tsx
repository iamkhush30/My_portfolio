"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
    {
        title: "Intelligence",
        tagline: "The Brain of the Operation",
        description:
            "Our neural networks process billions of data points in milliseconds, providing you with actionable insights before the competition even blinks.",
        image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=2000&q=80",
        accentColor: "#3b82f6",
    },
    {
        title: "Velocity",
        tagline: "Blazing Fast Performance",
        description:
            "Built on edge-computing architecture, ensuring your application stays responsive no matter where your users are located globally.",
        image:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2000&q=80",
        accentColor: "#a855f7",
    },
    {
        title: "Security",
        tagline: "Fort-Knox Level Protection",
        description:
            "Zero-trust security models integrated at every layer of the stack. Your data isn't just encrypted; it's invisible to the outside world.",
        image:
            "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=2000&q=80",
        accentColor: "#10b981",
    },
    {
        title: "Scale",
        tagline: "Infinity is the Limit",
        description:
            "Elastic infrastructure that grows with you. From your first 100 users to your first 100 million, we handle the heavy lifting seamlessly.",
        image:
            "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80",
        accentColor: "#f43f5e",
    },
];

export default function LayeredPanelReveal() {
    const stickyRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const ctaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cards = cardsRef.current;
        const total = SECTIONS.length;

        gsap.config({ force3D: true });

        // Set initial states before ScrollTrigger initialises
        gsap.set(cards[0], { yPercent: 0, scale: 1, visibility: "visible", force3D: true });
        gsap.set(cards.slice(1), { yPercent: 100, scale: 1, visibility: "visible", force3D: true });
        gsap.set(ctaRef.current, { yPercent: 100, visibility: "visible", force3D: true });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: stickyRef.current,
                start: "top top",
                end: `+=${total * 180}vh`,
                scrub: 1,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        });

        // Hold at start so first card is fully visible before transitions begin
        tl.to({}, { duration: 0.5 });

        cards.forEach((card, i) => {
            const isLast = i === total - 1;
            const nextEl = isLast ? ctaRef.current! : cards[i + 1];

            tl.to(
                nextEl,
                { yPercent: 0, ease: "power2.inOut", duration: 1 },
                `card${i}`
            )
            .to(
                card,
                { scale: 0.85, z: -150, ease: "power2.inOut", duration: 1 },
                `card${i}`
            )
            .set(card, { visibility: "hidden" }, `card${i}+=1`);
        });

        ScrollTrigger.refresh();

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, []);

    return (
        <div
            ref={stickyRef}
            className="relative w-full overflow-hidden"
            style={{ height: "100vh", perspective: "1200px" }}
        >
            {SECTIONS.map((section, i) => (
                <div
                    key={i}
                    ref={(el) => { if (el) cardsRef.current[i] = el; }}
                    className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-10"
                    style={{
                        zIndex: i + 1,
                        transformOrigin: "center center",
                        willChange: "transform",
                    }}
                >
                    <Card section={section} index={i} />
                </div>
            ))}

            <div
                ref={ctaRef}
                className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-white"
                style={{ zIndex: SECTIONS.length + 1, willChange: "transform" }}
            >
                <p className="text-xs tracking-[0.4em] uppercase text-slate-400 mb-6 font-mono">
                    End of story
                </p>
                <h2 className="text-[#0f172a] text-5xl md:text-8xl font-black tracking-tighter mb-10 leading-none">
                    READY TO<br />BUILD?
                </h2>
                <button className="px-12 py-5 bg-[#0f172a] text-white rounded-full font-bold text-base hover:scale-105 transition-transform shadow-2xl">
                    Start Your Journey
                </button>
            </div>
        </div>
    );
}

function Card({
    section,
    index,
}: {
    section: (typeof SECTIONS)[0];
    index: number;
}) {
    return (
        <div className="relative w-full max-w-[min(90vw,1120px)] h-[clamp(320px,60vh,720px)] overflow-hidden rounded-[1.5rem] bg-[#05070b] shadow-[0_24px_80px_rgba(0,0,0,0.32)]">
            <div className="relative grid h-full lg:grid-cols-[1fr_1.1fr]">
                {/* Left: text */}
                <div className="flex h-full flex-col justify-between gap-5 px-7 py-7 sm:px-9 sm:py-9 lg:px-10 lg:py-10">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-white/45">
                            <span className="font-mono text-[0.68rem] tracking-[0.38em] uppercase">
                                0{index + 1}
                            </span>
                            <span className="h-px w-10 bg-white/20" />
                            <span className="font-mono text-[0.68rem] tracking-[0.3em] uppercase text-white/50">
                                {section.tagline}
                            </span>
                        </div>

                        <h2 className="max-w-[11ch] text-4xl font-black tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl leading-none">
                            {section.title}
                        </h2>

                        <p className="max-w-sm text-[0.83rem] leading-6 text-white/58 sm:text-sm">
                            {section.description}
                        </p>
                    </div>

                    <div className="space-y-5">
                        <div className="flex flex-wrap gap-2 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/50">
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                                Scroll-locked reveal
                            </span>
                            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                                GSAP ScrollTrigger
                            </span>
                        </div>

                        <div className="h-px w-full bg-white/10" />

                        <div className="flex items-center justify-between text-[0.7rem] text-white/40">
                            <span>Scroll to reveal the next card</span>
                            <span className="hidden sm:inline">{section.tagline}</span>
                        </div>

                        <div
                            className="h-[3px] w-16 rounded-full"
                            style={{ backgroundColor: section.accentColor }}
                        />
                    </div>
                </div>

                {/* Right: image */}
                <div className="relative h-full min-h-[240px] overflow-hidden lg:border-l lg:border-white/10">
                    <img
                        src={section.image}
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        alt={section.title}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,11,0.08)_0%,rgba(5,7,11,0.55)_100%)]" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 px-7 py-7 sm:px-9">
                        <div className="max-w-xs space-y-1.5">
                            <p className="font-mono text-[0.58rem] uppercase tracking-[0.34em] text-white/65">
                                Visual reference
                            </p>
                            <p className="text-base font-semibold tracking-[-0.03em] text-white sm:text-lg">
                                {section.tagline}
                            </p>
                        </div>
                        <div className="hidden rounded-full border border-white/15 bg-black/25 px-3 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.28em] text-white/85 sm:block">
                            {String(index + 1).padStart(2, "0")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}