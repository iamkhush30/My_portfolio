"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "My Lab", href: "/#lab" },
  { label: "Vault", href: "/#vault" },
  { label: "Resume", href: "/Khush_Makwana_Resume.pdf", external: true },
];

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/iamkhush30", handle: "@iamkhush30" },
  { label: "LinkedIn", href: "https://linkedin.com/in/khush30", handle: "in/khush30" },
  { label: "Mail", href: "mailto:khushmakwana1980@gmail.com", handle: "khushmakwana1980@gmail.com" },
];

export const Footer: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());

    const timer = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const currentYear = mounted && currentTime ? currentTime.getFullYear() : new Date().getFullYear();

  const dayDate =
    mounted && currentTime
      ? new Intl.DateTimeFormat("en-GB", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Kolkata",
      }).format(currentTime)
      : "Active System";

  const timeZoneLabel =
    mounted && currentTime
      ? new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        timeZoneName: "short",
      }).formatToParts(currentTime).find((part) => part.type === "timeZoneName")?.value ?? "IST"
      : "IST (Asia/Kolkata)";

  return (
    <footer
      id="contact"
      className="relative bg-[var(--dark-bg)] border-t border-[var(--dark-border)] overflow-hidden"
      aria-label="Site footer"
    >
      {/* ── Main Grid: 3 columns on desktop ── */}
      <div
        className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] md:gap-x-8 lg:gap-x-12"
        style={{ borderBottom: "1px solid var(--footer-line)" }}
      >
        {/* Col 1 — Brand */}
        <div className="footer-box min-h-[180px] md:min-h-[320px] px-[var(--space-md)] py-[var(--space-lg)] sm:px-[var(--space-lg)] sm:py-[var(--space-xl)]">
          <p className="text-heading text-[var(--dark-text)]">
            Khush Makwana
          </p>
          <p className="text-body text-[var(--dark-text-muted)] mt-[var(--space-md)] max-w-[320px]">
            Specializing in AWS cloud infrastructure, automated CI/CD pipelines, and intuitive design systems. Open to engineering roles and ambitious collaborations.
          </p>
          <div className="mt-4 pt-3 border-t border-white/5">
            <a
              href="mailto:khushmakwana1980@gmail.com"
              className="text-primary hover:text-blue-400 font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors"
              aria-label="Send email to khushmakwana1980@gmail.com"
            >
              <span>khushmakwana1980@gmail.com</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* Col 2 — Navigation */}
        <div className="footer-box min-h-[180px] md:min-h-[320px] px-[var(--space-md)] py-[var(--space-lg)] sm:px-[var(--space-lg)] sm:py-[var(--space-xl)]">
          <p className="text-label text-[var(--dark-text-muted)] mb-[var(--space-lg)] uppercase font-mono text-xs tracking-wider">
            Navigation
          </p>
          <nav className="flex flex-col gap-[var(--space-md)]" aria-label="Footer navigation">
            {NAV_LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} (opens in new tab)`}
                  className="text-nav text-[var(--dark-text)] opacity-70 hover:opacity-100 hover:text-[hsl(var(--primary))] transition-all duration-[var(--duration-fast)] w-fit relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-[hsl(var(--primary))] after:transition-all after:duration-[var(--duration-base)] group flex items-center justify-between gap-2"
                >
                  <span>{link.label}</span>
                  <span className="arrow-icon transition-transform duration-[var(--duration-base)] group-hover:rotate-45 inline-block" aria-hidden="true">
                    ↗
                  </span>
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-label={link.label}
                  className="text-nav text-[var(--dark-text)] opacity-70 hover:opacity-100 hover:text-[hsl(var(--primary))] transition-all duration-[var(--duration-fast)] w-fit relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-[hsl(var(--primary))] after:transition-all after:duration-[var(--duration-base)] group flex items-center justify-between gap-2"
                >
                  <span>{link.label}</span>
                  <span className="arrow-icon transition-transform duration-[var(--duration-base)] group-hover:rotate-45 inline-block" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              )
            )}
          </nav>
        </div>

        {/* Col 3 — Connect */}
        <div
          className="footer-box min-h-[180px] md:min-h-[320px] px-[var(--space-md)] py-[var(--space-lg)] sm:px-[var(--space-lg)] sm:py-[var(--space-xl)]"
          style={{ borderRight: "none" }}
        >
          <p className="text-label text-[var(--dark-text-muted)] mb-[var(--space-lg)] uppercase font-mono text-xs tracking-wider">
            Connect
          </p>
          <div className="flex flex-col gap-[var(--space-md)]">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label !== "Mail" ? "_blank" : undefined}
                rel={link.label !== "Mail" ? "noopener noreferrer" : undefined}
                aria-label={`${link.label}: ${link.handle}`}
                className="text-nav text-[var(--dark-text)] opacity-70 hover:opacity-100 hover:text-[hsl(var(--primary))] transition-all duration-[var(--duration-fast)] w-fit relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 hover:after:w-full after:bg-[hsl(var(--primary))] after:transition-all after:duration-[var(--duration-base)] group flex items-center justify-between gap-2"
              >
                <span>{link.label}</span>
                <span className="arrow-icon transition-transform duration-[var(--duration-base)] group-hover:rotate-45 inline-block" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div
          className="footer-box px-[var(--space-md)] py-[var(--space-lg)] sm:px-[var(--space-lg)] sm:py-[var(--space-xl)]"
          style={{ borderBottom: "none" }}
        >
          <p className="text-label text-[var(--dark-text-muted)]">
            © {currentYear} Khush Makwana · All rights reserved.
          </p>
        </div>
        <div
          className="footer-box flex flex-col items-start md:items-end justify-center gap-1 md:gap-0 px-[var(--space-md)] py-[var(--space-lg)] sm:px-[var(--space-lg)] sm:py-[var(--space-xl)]"
          style={{ borderRight: "none", borderBottom: "none" }}
        >
          <p className="text-nav text-[var(--dark-text-muted)]">{dayDate}</p>
          <p className="text-label text-[var(--dark-text-muted)] mt-1 opacity-70 font-mono text-xs">
            {timeZoneLabel}
          </p>
        </div>
      </div>

      {/* ── Ambient glow ── */}
      <div
        className="pointer-events-none absolute top-0 right-0"
        style={{
          width: "600px",
          height: "400px",
          background:
            "radial-gradient(ellipse at 100% 0%, rgba(37, 99, 235, 0.4) 0%, rgba(37, 99, 235, 0.15) 40%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.6,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0"
        style={{
          width: "500px",
          height: "300px",
          background:
            "radial-gradient(ellipse at 0% 100%, rgba(37, 99, 235, 0.3) 0%, rgba(37, 99, 235, 0.08) 50%, transparent 80%)",
          filter: "blur(70px)",
          opacity: 0.5,
        }}
        aria-hidden="true"
      />
    </footer>
  );
};
