"use client";

import React, { useState, useEffect } from 'react';

/**
 * @fileOverview A high-fidelity CI/CD pipeline animation component.
 * Replicates a DevOps console with real-time log cycling and infrastructure visualization.
 */

const lines = [
  { p: '$', cls: 'text-[#2563eb]', txt: 'git status' },
  { p: '$', cls: 'text-[#2563eb]', txt: 'git add .' },
  { p: '$', cls: 'text-[#2563eb]', txt: 'git commit -m "fix: correct nginx upstream timeout"' },
  { p: '$', cls: 'text-[#2563eb]', txt: 'git push origin main' },
  { p: '›', cls: 'text-[#2563eb]', txt: 'webhook received · build #118 triggered' },
  { p: '$', cls: 'text-[#2563eb]', txt: 'docker build -t app:118 .' },
  { p: '›', cls: 'text-[#334155]', txt: 'step 3/9 — RUN apt-get install -y curl' },
  { p: '›', cls: 'text-[#334155]', txt: 'step 6/9 — COPY . /app' },
  { p: '›', cls: 'text-[#334155]', txt: 'step 9/9 — CMD ["node", "server.js"]' },
  { p: '›', cls: 'text-[#4a7c59]', txt: 'docker build done · 41.7s' },
  { p: '$', cls: 'text-[#2563eb]', txt: 'docker tag app:118 registry.local/app:118' },
  { p: '$', cls: 'text-[#2563eb]', txt: 'docker push registry.local/app:118' },
  { p: '›', cls: 'text-[#4a7c59]', txt: 'pushed · digest sha256:c7d3a2…' },
  { p: '›', cls: 'text-[#2563eb]', txt: 'jenkins: job build-test #118 started' },
  { p: '›', cls: 'text-[#334155]', txt: 'jenkins: git checkout main' },
  { p: '›', cls: 'text-[#2563eb]', txt: 'jenkins: mvn clean package' },
  { p: '›', cls: 'text-[#334155]', txt: 'jenkins: [INFO] Building app 2.4.1' },
  { p: '›', cls: 'text-[#4a7c59]', txt: 'jenkins: BUILD SUCCESS · 18.2s' },
  { p: '›', cls: 'text-[#2563eb]', txt: 'jenkins: running unit tests · 87 cases' },
  { p: '›', cls: 'text-[#4a7c59]', txt: 'jenkins: tests passed 87/87 · 14.3s' },
  { p: '›', cls: 'text-[#4a7c59]', txt: 'jenkins: coverage 84% · report saved' },
  { p: '$', cls: 'text-[#2563eb]', txt: 'ansible-playbook deploy.yml -i hosts/prod' },
  { p: '›', cls: 'text-[#4a7c59]', txt: 'TASK [update env config] ··· ok' },
  { p: '›', cls: 'text-[#4a7c59]', txt: 'TASK [reload systemd daemon] ··· ok' },
  { p: '›', cls: 'text-[#4a7c59]', txt: 'PLAY RECAP · prod-01: ok=4  failed=0' },
  { p: '$', cls: 'text-[#2563eb]', txt: 'kubectl apply -f k8s/deployment.yaml' },
  { p: '›', cls: 'text-[#4a7c59]', txt: 'deployment.apps/app configured' },
  { p: '$', cls: 'text-[#2563eb]', txt: 'kubectl rollout status deployment/app' },
  { p: '›', cls: 'text-[#d97706]', txt: 'waiting · 1 of 3 pods updated…' },
  { p: '›', cls: 'text-[#d97706]', txt: 'waiting · 2 of 3 pods updated…' },
  { p: '›', cls: 'text-[#4a7c59]', txt: 'rollout complete · 3/3 pods ready' },
  { p: '$', cls: 'text-[#2563eb]', txt: 'kubectl get pods -n production' },
  { p: '›', cls: 'text-[#334155]', txt: 'app-9c4d7f-xk2p   Running   2m' },
  { p: '›', cls: 'text-[#334155]', txt: 'app-9c4d7f-mnr8   Running   2m' },
  { p: '›', cls: 'text-[#334155]', txt: 'app-9c4d7f-qt1z   Running   1m' },
  { p: '$', cls: 'text-[#2563eb]', txt: 'kubectl logs app-9c4d7f-xk2p --tail=20' },
  { p: '›', cls: 'text-[#4a7c59]', txt: 'server listening on port 8080' },
  { p: '›', cls: 'text-[#4a7c59]', txt: 'connected to postgres · pool size 10' },
  { p: '$', cls: 'text-[#2563eb]', txt: 'kubectl top pods -n production' },
  { p: '›', cls: 'text-[#334155]', txt: 'app-9c4d7f-xk2p   cpu:14m   mem:128Mi' },
  { p: '$', cls: 'text-[#2563eb]', txt: 'curl -s http://10.0.1.42:8080/health' },
  { p: '›', cls: 'text-[#4a7c59]', txt: '{"status":"ok","uptime":"6d 3h"}' },
  { p: '$', cls: 'text-[#2563eb]', txt: 'journalctl -u nginx --since "10 min ago"' },
  { p: '›', cls: 'text-[#4a7c59]', txt: 'nginx: 200 GET /api/status · 9ms' },
  { p: '›', cls: 'text-[#4a7c59]', txt: 'nginx: 200 POST /api/login · 24ms' },
  { p: '$', cls: 'text-[#2563eb]', txt: 'systemctl status app.service' },
  { p: '›', cls: 'text-[#4a7c59]', txt: 'app.service · active (running) · 6 days' },
  { p: '$', cls: 'text-[#2563eb]', txt: 'df -h /' },
  { p: '›', cls: 'text-[#334155]', txt: '/dev/sda1  50G  19G  31G  38%  /' },
  { p: '$', cls: 'text-[#2563eb]', txt: 'free -h' },
  { p: '›', cls: 'text-[#334155]', txt: 'Mem:  2.9G used / 7.8G total · 37%' },
  { p: '$', cls: 'text-[#2563eb]', txt: 'docker system prune -f' },
  { p: '›', cls: 'text-[#d97706]', txt: 'deleted 2 containers · freed 820 MB' },
  { p: '$', cls: 'text-[#2563eb]', txt: 'git log --oneline -3' },
  { p: '›', cls: 'text-[#334155]', txt: 'c7d3a2e fix: correct nginx upstream timeout' },
  { p: '›', cls: 'text-[#334155]', txt: 'b8d2e4f feat: add /health endpoint' },
  { p: '›', cls: 'text-[#4a7c59]', txt: 'pipeline #118 · all stages passed ✓' },
];

export const PipelineAnimation = () => {
  const [idx, setIdx] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(0.15);
      setTimeout(() => {
        setIdx((prev) => (prev + 1) % lines.length);
        setOpacity(1);
      }, 200);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const total = lines.length;
  const currentLines = [
    lines[idx % total],
    lines[(idx + 1) % total],
    lines[(idx + 2) % total],
  ];

  return (
    <div className="relative overflow-hidden bg-[#070c18] w-full max-w-[480px] h-[400px] rounded-xl border border-blue-600/10 shadow-[0_32px_80px_-20px_rgba(37,21,216,0.15)]">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-[#0f172a]/90 border-b border-blue-600/15 flex items-center px-3.5 gap-1.5 z-30">
        <div className="w-[7px] h-[7px] rounded-full bg-[#e84040]"></div>
        <div className="w-[7px] h-[7px] rounded-full bg-[#d97706]"></div>
        <div className="w-[7px] h-[7px] rounded-full bg-[#4a7c59]"></div>
        <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-slate-500 ml-1.5">pipeline · main branch</span>
        <div className="ml-auto text-[9px] font-medium text-[#4a7c59] flex items-center gap-1">
          <div className="w-[5px] h-[5px] rounded-full bg-[#4a7c59] animate-blink"></div>
          passing
        </div>
      </div>

      <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-600/25 to-transparent animate-scan top-8 z-5 pointer-events-none"></div>
      <div className="absolute top-10 left-2 w-3 h-3 border-t border-l border-blue-600/40"></div>
      <div className="absolute bottom-[70px] right-2 w-3 h-3 border-b border-r border-blue-600/40"></div>

      <svg className="absolute top-8 left-0 w-full h-[calc(100%-96px)]" viewBox="0 0 360 250" preserveAspectRatio="xMidYMid meet">
        <defs>
          <path id="main-path" d="M 35 72 L 320 72"/>
          <path id="branch-path" d="M 125 72 L 125 138 L 215 138 L 215 72"/>
          <path id="infra-path" d="M 35 72 L 35 182 L 125 182 L 125 72"/>
        </defs>

        {/* stage dividers */}
        {[60, 150, 240, 310].map((x) => (
          <line key={x} x1={x} y1="8" x2={x} y2="245" stroke="rgba(37,99,235,0.05)" strokeWidth="0.5" strokeDasharray="3 4"/>
        ))}

        {/* stage labels */}
        <text x="35" y="15" fontSize="7" fill="rgba(37,99,235,0.3)" fontFamily="monospace" textAnchor="middle" letterSpacing="1">CODE</text>
        <text x="125" y="15" fontSize="7" fill="rgba(37,99,235,0.3)" fontFamily="monospace" textAnchor="middle" letterSpacing="1">BUILD</text>
        <text x="215" y="15" fontSize="7" fill="rgba(37,99,235,0.3)" fontFamily="monospace" textAnchor="middle" letterSpacing="1">TEST</text>
        <text x="290" y="15" fontSize="7" fill="rgba(37,99,235,0.3)" fontFamily="monospace" textAnchor="middle" letterSpacing="1">DEPLOY</text>

        {/* main trunk */}
        <path d="M 35 72 L 320 72" fill="none" stroke="rgba(37,99,235,0.15)" strokeWidth="1"/>

        {/* main trunk packets */}
        <circle r="3" fill="#2563eb">
          <animateMotion dur="3s" repeatCount="indefinite" begin="0s"><mpath href="#main-path"/></animateMotion>
          <animate attributeName="opacity" values="0;0.9;0.9;0" dur="3s" repeatCount="indefinite" begin="0s"/>
        </circle>
        <circle r="3" fill="#2563eb">
          <animateMotion dur="3s" repeatCount="indefinite" begin="1.5s"><mpath href="#main-path"/></animateMotion>
          <animate attributeName="opacity" values="0;0.9;0.9;0" dur="3s" repeatCount="indefinite" begin="1.5s"/>
        </circle>
        <circle r="2.5" fill="#93c5fd">
          <animateMotion dur="3s" repeatCount="indefinite" begin="0.9s"><mpath href="#main-path"/></animateMotion>
          <animate attributeName="opacity" values="0;0.6;0.6;0" dur="3s" repeatCount="indefinite" begin="0.9s"/>
        </circle>

        {/* Jenkins branch line BUILD ↔ TEST */}
        <path d="M 125 72 L 125 138 L 215 138 L 215 72" fill="none" stroke="rgba(37,99,235,0.12)" strokeWidth="0.8" strokeDasharray="3 3"/>
        <circle r="2" fill="#93c5fd">
          <animateMotion dur="4s" repeatCount="indefinite" begin="1s"><mpath href="#branch-path"/></animateMotion>
          <animate attributeName="opacity" values="0;0.7;0.7;0" dur="4s" repeatCount="indefinite" begin="1s"/>
        </circle>
        <circle r="2" fill="#93c5fd">
          <animateMotion dur="4s" repeatCount="indefinite" begin="3s"><mpath href="#branch-path"/></animateMotion>
          <animate attributeName="opacity" values="0;0.7;0.7;0" dur="4s" repeatCount="indefinite" begin="3s"/>
        </circle>

        {/* Infra branch CODE ↔ BUILD */}
        <path d="M 35 72 L 35 182 L 125 182 L 125 72" fill="none" stroke="rgba(74,124,89,0.15)" strokeWidth="0.8" strokeDasharray="3 3"/>
        <circle r="2" fill="#4a7c59">
          <animateMotion dur="5s" repeatCount="indefinite" begin="2s"><mpath href="#infra-path"/></animateMotion>
          <animate attributeName="opacity" values="0;0.6;0.6;0" dur="5s" repeatCount="indefinite" begin="2s"/>
        </circle>

        {/* Nodes */}
        <circle cx="35" cy="72" r="6" fill="#0a0f1e" stroke="#2563eb" strokeWidth="1.2"/>
        <circle cx="35" cy="72" r="3" fill="#2563eb"><animate attributeName="r" values="3;4;3" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite"/></circle>

        <circle cx="125" cy="72" r="6" fill="#0a0f1e" stroke="#2563eb" strokeWidth="1.2"/>
        <circle cx="125" cy="72" r="3" fill="#2563eb"><animate attributeName="r" values="3;4;3" dur="2.5s" repeatCount="indefinite" begin="0.3s"/><animate attributeName="opacity" values="0.7;1;0.7" dur="2.5s" repeatCount="indefinite" begin="0.3s"/></circle>

        <circle cx="215" cy="72" r="6" fill="#0a0f1e" stroke="#2563eb" strokeWidth="1.2"/>
        <circle cx="215" cy="72" r="3" fill="#2563eb"><animate attributeName="r" values="3;4;3" dur="3s" repeatCount="indefinite" begin="0.6s"/><animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" begin="0.6s"/></circle>

        <circle cx="305" cy="72" r="7" fill="#0a0f1e" stroke="#4a7c59" strokeWidth="1.5"/>
        <circle cx="305" cy="72" r="3.5" fill="#4a7c59"><animate attributeName="r" values="3.5;5;3.5" dur="3s" repeatCount="indefinite" begin="1s"/><animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" begin="1s"/></circle>
        <circle cx="305" cy="72" r="10" fill="none" stroke="#4a7c59" strokeWidth="0.5"><animate attributeName="r" values="7;14;7" dur="3s" repeatCount="indefinite" begin="1s"/><animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" begin="1s"/></circle>

        {/* Jenkins unit-test node */}
        <circle cx="125" cy="138" r="4" fill="#0a0f1e" stroke="rgba(37,99,235,0.45)" strokeWidth="0.8"/>
        <circle cx="125" cy="138" r="2" fill="#2563eb"><animate attributeName="opacity" values="0.4;0.9;0.4" dur="3s" repeatCount="indefinite" begin="0.5s"/></circle>
        <text x="135" y="142" fontSize="7.5" fill="rgba(148,163,184,0.5)" fontFamily="monospace">jenkins · unit tests</text>

        {/* Infra nodes */}
        <circle cx="35" cy="182" r="4" fill="#0a0f1e" stroke="rgba(74,124,89,0.4)" strokeWidth="0.8"/>
        <circle cx="35" cy="182" r="2" fill="#4a7c59"><animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite" begin="1s"/></circle>
        <text x="46" y="186" fontSize="7.5" fill="rgba(74,124,89,0.5)" fontFamily="monospace">ansible playbook</text>

        <circle cx="125" cy="182" r="4" fill="#0a0f1e" stroke="rgba(74,124,89,0.4)" strokeWidth="0.8"/>
        <circle cx="125" cy="182" r="2" fill="#4a7c59"><animate attributeName="opacity" values="0.4;0.8;0.4" dur="3.5s" repeatCount="indefinite" begin="1.5s"/></circle>
        <text x="136" y="186" fontSize="7.5" fill="rgba(74,124,89,0.5)" fontFamily="monospace">env config sync</text>

        {/* Stage badges */}
        <rect x="16" y="83" width="38" height="12" rx="3" fill="rgba(37,99,235,0.1)" stroke="rgba(37,99,235,0.2)" strokeWidth="0.5"/>
        <text x="35" y="92" fontSize="6.5" fill="#2563eb" fontFamily="monospace" textAnchor="middle">git push</text>

        <rect x="106" y="83" width="40" height="12" rx="3" fill="rgba(37,99,235,0.1)" stroke="rgba(37,99,235,0.2)" strokeWidth="0.5"/>
        <text x="126" y="92" fontSize="6.5" fill="#2563eb" fontFamily="monospace" textAnchor="middle">docker build</text>

        <rect x="196" y="83" width="40" height="12" rx="3" fill="rgba(37,99,235,0.08)" stroke="rgba(37,99,235,0.2)" strokeWidth="0.5"/>
        <text x="216" y="92" fontSize="6.5" fill="#2563eb" fontFamily="monospace" textAnchor="middle">jenkins ci</text>

        <rect x="284" y="83" width="42" height="12" rx="3" fill="rgba(74,124,89,0.12)" stroke="rgba(74,124,89,0.3)" strokeWidth="0.5"/>
        <text x="305" y="92" fontSize="6.5" fill="#4a7c59" fontFamily="monospace" textAnchor="middle">kubectl apply</text>

        {/* Floating metrics */}
        <text x="270" y="148" fontSize="7" fill="rgba(37,99,235,0.35)" fontFamily="monospace">↑ 99.9% uptime</text>
        <text x="270" y="162" fontSize="7" fill="rgba(74,124,89,0.35)" fontFamily="monospace">✓ 87 tests pass</text>
        <text x="270" y="176" fontSize="7" fill="rgba(148,163,184,0.25)" fontFamily="monospace">~6 min deploy</text>
        <text x="270" y="190" fontSize="7" fill="rgba(37,99,235,0.2)" fontFamily="monospace">3 pods running</text>
      </svg>

      {/* Log strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#070c18]/95 border-t border-blue-600/10 p-2 md:p-3 z-25 h-16 overflow-hidden">
        {currentLines.map((line, i) => (
          <div key={`${idx}-${i}`} className="text-[9px] font-mono leading-relaxed whitespace-nowrap overflow-hidden transition-opacity duration-300" style={{ opacity: opacity }}>
            <span className="text-[#2563eb]">{line.p}</span> <span className={line.cls}>{line.txt}</span>
            {i === 2 && <span className="inline-block w-[5px] h-[9px] bg-[#2563eb] align-middle rounded-[1px] animate-blink ml-1"></span>}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes scan {
          0%   { transform: translateY(-10px); opacity: 0; }
          5%   { opacity: 0.6; }
          95%  { opacity: 0.6; }
          100% { transform: translateY(340px); opacity: 0; }
        }
        .animate-blink { animation: blink 2s ease-in-out infinite; }
        .animate-scan { animation: scan 9s linear infinite 0.5s; }
      `}</style>
    </div>
  );
};
