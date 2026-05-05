"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Linkedin, Github, Instagram, Mail } from "lucide-react";
import "./hero.css";

/* ─── CMD lines ─── */
const CMD_LINES: { prefix: string; cmd: string; out: string; cls: string }[] = [
  { prefix: "$", cmd: " kubectl apply -f deploy.yml",       out: "✓ deployment.apps/portfolio created", cls: "tp" },
  { prefix: "",  cmd: "",                                    out: "✓ pods running  3/3",                 cls: "tp" },
  { prefix: "$", cmd: " figma export --tokens design.json", out: "↳ 42 tokens synced to codebase",      cls: "tw" },
  { prefix: "$", cmd: ' git commit -m "logic meets art"',   out: "✓ pipeline passing",                  cls: "tp" },
];

/* ─── Typewriter hook ─── */
function useTypewriter(lines: typeof CMD_LINES, active: boolean) {
  const [rendered, setRendered] = useState<
    { prefix: string; cmd: string; out: string; cls: string; cmdDone: boolean; outDone: boolean }[]
  >([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    setRendered([]);

    const delay = (ms: number) =>
      new Promise<void>((res) => { timerRef.current = setTimeout(res, ms); });

    (async () => {
      for (let i = 0; i < lines.length; i++) {
        if (cancelled) break;
        const line = lines[i];

        setRendered((prev) => [
          ...prev,
          { ...line, cmd: line.prefix ? line.prefix : "", out: "", cmdDone: false, outDone: false },
        ]);

        if (line.prefix && line.cmd) {
          for (let c = 0; c <= line.cmd.length; c++) {
            if (cancelled) break;
            const partial = line.cmd.slice(0, c);
            setRendered((prev) =>
              prev.map((r, idx) =>
                idx === i ? { ...r, cmd: line.prefix + partial } : r
              )
            );
            await delay(c === 0 ? 300 : 28 + Math.random() * 18);
          }
        }

        if (cancelled) break;
        setRendered((prev) =>
          prev.map((r, idx) => (idx === i ? { ...r, cmdDone: true } : r))
        );
        await delay(180);

        if (line.out) {
          setRendered((prev) =>
            prev.map((r, idx) =>
              idx === i ? { ...r, out: line.out, outDone: true } : r
            )
          );
        }
        await delay(i === lines.length - 1 ? 0 : 220);
      }
    })();

    return () => {
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active]);

  return rendered;
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════ */
export const Hero = () => {
  const stageRef  = useRef<HTMLDivElement>(null);
  const wireRef   = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const pctRef   = useRef(0);   // starts at 0 (left edge)
  const dragging = useRef(false);
  const introRaf = useRef(0);
  const dragRaf  = useRef(0);

  const [hintGone,  setHintGone]  = useState(false);
  const [cmdActive, setCmdActive] = useState(false);

  const cmdLines   = useTypewriter(CMD_LINES, cmdActive);
  const showCursor = cmdLines.length > 0 && cmdLines[cmdLines.length - 1]?.outDone;

  const pauseLenis  = useCallback(() => { try { (window as any).__lenis?.stop();  } catch {} }, []);
  const resumeLenis = useCallback(() => { try { (window as any).__lenis?.start(); } catch {} }, []);

  const introStartPct = 100;
  const introHoldMs = 220;
  // Keep intro motion within left → mid area (visual slider left ~20–35%)
  const introLeadPct = 70;   // forward (slider moves to ~30% from left)
  // We'll compute a halving sequence programmatically so each move is half the previous
  const introAmplitude = 30; // initial forward distance in pct-space (start 100 -> lead 70)

  const applyPct = useCallback((p: number) => {
    const c = Math.max(0, Math.min(100, p));
    pctRef.current = c;
    const wire   = wireRef.current;
    const slider = sliderRef.current;
    if (!wire || !slider) return;
    // Clip from the RIGHT side now — left portion stays wire
    wire.style.clipPath = `inset(0 ${c.toFixed(3)}% 0 0)`;
    slider.style.left   = `${(100 - c).toFixed(3)}%`;
  }, []);

  /* ── Easing curves ── */
  const easeOutExpo     = (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  const easeOutCubic    = (t: number) => 1 - Math.pow(1 - t, 3);
  const easeInOutCubic  = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  // Smooth, effortless curve (easeInOutSine)
  const easeSmooth = (t: number) => 0.5 - 0.5 * Math.cos(Math.PI * t);
  const easeOutBack     = (t: number) => {
    const c1 = 1.70158, c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  };

  const animateTo = useCallback(
    (to: number, duration: number, ease: (t: number) => number) =>
      new Promise<boolean>((resolve) => {
        const from  = pctRef.current;
        const start = performance.now();
        const step  = (now: number) => {
          if (dragging.current) { resolve(false); return; }
          const t = Math.min((now - start) / duration, 1);
          applyPct(from + (to - from) * ease(t));
          if (t < 1) { introRaf.current = requestAnimationFrame(step); }
          else        { resolve(true); }
        };
        introRaf.current = requestAnimationFrame(step);
      }),
    [applyPct]
  );

  /*
    Intro sequence (LEFT → RIGHT read):
    - Start: pct=0 (wire covers all, slider at left=100% which is left edge... wait)
    
    Actually with new logic:
      slider.style.left = (100 - pct)%
      pct=0  → slider.left=100% → right edge (wrong for "starting from left")
    
    So let me flip: slider starts at LEFT=0 visually.
    We set wire clipPath = inset(0 RIGHT% 0 0) where RIGHT = pct
    pct=100 → RIGHT=100% → wire clipped fully (hidden) — start FULLY wire shown means RIGHT=0
    
    Let me re-think cleanly:
    - Wire shows on LEFT side
    - slider.left = visual position of the line
    - Start: slider at left edge (left=0%) → wire shows everything
    - Slide TO: slider at ~20-25% → wire occupies left 20-25%
    - Wire clips from RIGHT: inset(0 RIGHT% 0 0) — RIGHT = 100-sliderLeftPct
    
    So: sliderLeftPct stored in pctRef
    wire.clipPath = inset(0 ${100-pctRef}% 0 0)
    slider.left   = pctRef%
    
    pctRef=0  → slider at 0% (left edge), wire inset(0 100% 0 0) = wire HIDDEN ← wrong start
    
    SIMPLEST: just swap interpretation.
    pctRef = how much of LEFT is WIRE (0→100)
    wire clipPath = inset(0 ${100-pctRef}% 0 0)  — clip from right, keep left portion
    slider.left = pctRef%
    
    pctRef=100 → inset(0 0% 0 0) = full wire, slider at 100% (right edge)  ← old start
    pctRef=0   → inset(0 100% 0 0) = no wire, slider at 0% (left edge)
    
    For "start from LEFT": start pctRef=0 (slider at left edge, no wire visible initially)
    Then animate TO pctRef ~78-80 (slider at 78-80%, wire covers 78-80% of screen)
    Wait 22% visible color on right → that's 78% wire on left — so ~75-80% is the "20-25% color showing"
    
    This is correct. But the wire START would be invisible.
    We want: wire starts at LEFT covering 100% → slides so only LEFT 20-25% remains.
    So start at pctRef=100, animate TO pctRef=75-80.
    
    But user says "line should start from LEFT side of screen" — the LINE (slider handle) starts at left.
    Currently pctRef=100 puts slider at RIGHT. So we need to INVERT so pctRef=100 → slider at LEFT.
    
    NEW applyPct above does:
      clipPath: inset(0 c% 0 0)  →  RIGHT clip = c  → wire occupies left (100-c)%
      slider.left = (100-c)%
    
    pctRef=0   → RIGHT=0%   clip = inset(0 0 0 0) = full wire, slider.left=100% (right)
    pctRef=100 → RIGHT=100% clip = inset(0 100% 0 0) = no wire, slider.left=0% (left) ← start here
    
    So: START pctRef=100 (slider at left=0%), animate TO pctRef=20-25 (slider at left=75-80%, wire on left 20-25%)
    This matches: slider starts at LEFT, slides RIGHT to settle at ~75-80% position showing 20-25% wire.
    
    Update applyPct and intro sequence below.
  */

  /* ── Global pointermove / pointerup ── */
  useEffect(() => {
    const getPct = (clientX: number) => {
      if (!stageRef.current) return pctRef.current;
      const r = stageRef.current.getBoundingClientRect();
      const sliderLeftPct = ((clientX - r.left) / r.width) * 100;
      // Convert visual slider position to pctRef space: pctRef = 100 - sliderLeftPct
      return 100 - sliderLeftPct;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      cancelAnimationFrame(dragRaf.current);
      dragRaf.current = requestAnimationFrame(() => applyPct(getPct(e.clientX)));
    };

    const onPointerUp = () => {
      if (!dragging.current) return;
      dragging.current = false;
      resumeLenis();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup",   onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup",   onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [applyPct, resumeLenis]);

  /* ── Intro sequence: content animates first, then slider from left to right ── */
  useEffect(() => {
    applyPct(introStartPct); // slider starts at the left edge
    (async () => {
      // Wait for content animations to complete (0.7s + buffer)
      await new Promise((r) => setTimeout(r, 1000));

      // Pause briefly at the start before motion begins.
      await new Promise((r) => setTimeout(r, introHoldMs));

      // Compute halving travel distances: forward D, back D/2, forward D/4, back D/8
      const start = introStartPct;
      const a1 = introAmplitude;
      const t1 = start - a1;               // forward (D)
      // first back should be half's half (D/4), then each subsequent move halves
      const t2 = t1 + a1 / 4;              // back (D/4)
      const t3 = t2 - a1 / 8;              // forward (D/8)
      const t4 = t3 + a1 / 16;             // back (D/16)

      // Base duration for the largest move; scale smaller moves proportionally, with a sensible minimum
      const baseDur = 900;
      const d1 = Math.abs(t1 - start); // a1
      const durations = [
        baseDur,
        Math.max(220, Math.round(baseDur * (Math.abs(t2 - t1) / d1))),
        Math.max(220, Math.round(baseDur * (Math.abs(t3 - t2) / d1))),
        Math.max(220, Math.round(baseDur * (Math.abs(t4 - t3) / d1))),
      ];

      if (await animateTo(t1, durations[0], easeSmooth)) {
        if (await animateTo(t2, durations[1], easeSmooth)) {
          if (await animateTo(t3, durations[2], easeSmooth)) {
            if (await animateTo(t4, durations[3], easeSmooth)) {
              setCmdActive(true);
            }
          }
        }
      }
    })();
    return () => cancelAnimationFrame(introRaf.current);
  }, [animateTo, applyPct]);

  /* ── Handle: start drag ── */
  const startDrag = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      cancelAnimationFrame(introRaf.current);
      dragging.current = true;
      pauseLenis();

      if (!hintGone)  setHintGone(true);
      if (!cmdActive) setCmdActive(true);

      try { e.currentTarget.setPointerCapture(e.pointerId); } catch {}

      if (stageRef.current) {
        const r = stageRef.current.getBoundingClientRect();
        const sliderLeftPct = ((e.clientX - r.left) / r.width) * 100;
        applyPct(100 - sliderLeftPct);
      }
    },
    [applyPct, hintGone, cmdActive, pauseLenis]
  );

  return (
    <section id="hero" className="hero-stage snap-start" ref={stageRef}>

      {/* ══ SCREEN A — FULL COLOR (z:1, behind) ══ */}
      <div className="hero-screen screen-color">
        <div className="hero-body">
          <div className="hero-left">
            <h1 className="hero-name text-display text-left">
              <span className="hero-name-first">Khush</span>
              <span className="hero-name-last">Makwana</span>
            </h1>
            <p className="text-label text-primary mt-3 mb-4 tracking-widest uppercase">DevOps Engineer & UI/UX Designer</p>
            <p className="hero-tagline text-body text-left">Where infrastructure meets intention — I build CI/CD pipelines, containerized systems, and interfaces people actually enjoy using.</p>
            <div className="hero-availability">Open to select projects — let's talk</div>
            <div className="hero-btns">
              <a href="#vault" className="hero-btn-primary text-button">View Archive →</a>
            </div>
            <div className="hero-socials">
              <a href="https://linkedin.com/in/iamkhush30" target="_blank" rel="noopener noreferrer" className="hero-social-icon">
                <Linkedin size={18} />
              </a>
              <a href="https://github.com/iamkhush30" target="_blank" rel="noopener noreferrer" className="hero-social-icon">
                <Github size={18} />
              </a>
              <a href="https://instagram.com/iamkhush30" target="_blank" rel="noopener noreferrer" className="hero-social-icon">
                <Instagram size={18} />
              </a>
              <a href="mailto:khushmakwana1980@gmail.com" className="hero-social-icon">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-terminal">
              <div className="term-bar">
                <div className="term-dot" /><div className="term-dot" /><div className="term-dot" />
                <span className="term-title">PIPELINE · MAIN</span>
              </div>
              <div className="term-body">
                {cmdLines.map((line, i) => (
                  <React.Fragment key={i}>
                    {line.prefix && (
                      <div className="tl">
                        <span className="tc">$</span>
                        {line.cmd.replace(/^\$\s*/, "").split(" ").map((word, wi) => {
                          if (wi === 0) return <span key={wi} className="tok"> {word}</span>;
                          if (word.startsWith("-") || word.startsWith('"'))
                            return <span key={wi} className="tw"> {word}</span>;
                          return <span key={wi} className="tm"> {word}</span>;
                        })}
                        {!line.cmdDone && <span className="tcur hero-cursor" />}
                      </div>
                    )}
                    {line.outDone && (
                      <div className="tl">
                        <span className={line.cls}>{line.out}</span>
                      </div>
                    )}
                  </React.Fragment>
                ))}
                {showCursor && (
                  <div className="tl">
                    <span className="tc">$ </span>
                    <span className="tcur hero-cursor" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ SCREEN B — WIREFRAME B&W (z:2, front, clipped) ══ */}
      <div className="hero-screen screen-wire" ref={wireRef}>
        <div className="hero-body">
          <div className="hero-left">
            <h1 className="hero-name text-display text-left">
              <span className="hero-name-first">Khush</span>
              <span className="hero-name-last">Makwana</span>
            </h1>
            <p className="text-label text-primary mt-3 mb-4 tracking-widest uppercase">DevOps Engineer & UI/UX Designer</p>
            <p className="hero-tagline text-body text-left">Where infrastructure meets intention — I build CI/CD pipelines, containerized systems, and interfaces people actually enjoy using.</p>
            <div className="hero-availability">Open to select projects — let's talk</div>
            <div className="hero-btns">
              <a href="#vault" className="hero-btn-primary text-button">View Archive →</a>
            </div>
            <div className="hero-socials">
              <a href="https://linkedin.com/in/iamkhush30" target="_blank" rel="noopener noreferrer" className="hero-social-icon">in</a>
              <a href="https://github.com/iamkhush30" target="_blank" rel="noopener noreferrer" className="hero-social-icon">gh</a>
              <a href="https://instagram.com/iamkhush30" target="_blank" rel="noopener noreferrer" className="hero-social-icon">ig</a>
              <a href="mailto:khushmakwana1980@gmail.com" className="hero-social-icon">@</a>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-terminal">
              <div className="term-bar">
                <div className="term-dot" /><div className="term-dot" /><div className="term-dot" />
                <span className="term-title">PIPELINE · MAIN</span>
              </div>
              <div className="wterm-lines" aria-hidden="true">
                <div className="wterm-line prompt" style={{ width: "88%" }} />
                <div className="wterm-line"        style={{ width: "72%" }} />
                <div className="wterm-line"        style={{ width: "58%" }} />
                <div className="wterm-line prompt" style={{ width: "80%" }} />
                <div className="wterm-line"        style={{ width: "68%" }} />
                <div className="wterm-line prompt" style={{ width: "76%" }} />
                <div className="wterm-line"        style={{ width: "52%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ SLIDER (z:100) ══ */}
      <div className="hero-slider" ref={sliderRef}>
        <div
          className="slider-handle"
          onPointerDown={startDrag}
        >
          {/* Split-view icon — double vertical bars */}
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="3" width="2.5" height="14" rx="1" fill="#2563EB"/>
            <rect x="11.5" y="3" width="2.5" height="14" rx="1" fill="#2563EB"/>
          </svg>
        </div>
        <div className="slider-hint" style={{ opacity: hintGone ? 0 : 1 }}>
          drag to reveal
        </div>
      </div>

      {/* Ambient glows matching footer */}
      <div
        className="pointer-events-none absolute top-0 right-0"
        style={{
          width: "600px",
          height: "400px",
          background: "radial-gradient(ellipse at 100% 0%, rgba(37, 99, 235, 0.4) 0%, rgba(37, 99, 235, 0.15) 40%, transparent 70%)",
          filter: "blur(92px)",
          opacity: 0.6,
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute bottom-0 left-0"
        style={{
          width: "500px",
          height: "300px",
          background: "radial-gradient(ellipse at 0% 100%, rgba(37, 99, 235, 0.3) 0%, rgba(37, 99, 235, 0.08) 50%, transparent 80%)",
          filter: "blur(82px)",
          opacity: 0.5,
        }}
        aria-hidden
      />

    </section>
  );
};
