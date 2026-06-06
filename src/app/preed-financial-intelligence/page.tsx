"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/features/header';
import { Footer } from '@/features/footer';
import { Badge } from '@/shared/ui/badge';
import { cn } from '@/shared/lib/utils';
import { PlaceHolderImages } from '@/shared/lib/placeholder-images';
import { useScrollAnimation } from '@/shared/hooks/use-scroll-animation';
import {
	User,
	Lightbulb,
	Layers,
	Wrench,
	Monitor,
	AlertTriangle,
	Award,
	ArrowRight,
	BarChart2,
	LayoutDashboard,
	Briefcase,
	ArrowLeftRight,
	FileText,
	ChevronRight,
} from 'lucide-react';
 
/**
 * @fileOverview Preed — Financial Intelligence App
 * UI/UX Case Study page.
 * Matches the design system of the CI/CD Pipeline Analytics project page.
 */
 
const InteractiveCard = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	const [tilt, setTilt] = useState({ x: 0, y: 0 });
 
	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const card = e.currentTarget;
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
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
				'relative overflow-hidden group transition-all duration-300',
				className
			)}
			style={{
				transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
				boxShadow:
					tilt.x === 0 && tilt.y === 0
						? '0 10px 20px -5px rgba(0,0,0,0.05)'
						: `${-tilt.y * 0.8}px ${tilt.x * 0.8}px 25px -8px rgba(0,0,0,0.2)`,
				transition:
					tilt.x === 0 && tilt.y === 0
						? 'transform 0.5s ease-out, box-shadow 0.5s ease'
						: 'transform 0.1s linear, box-shadow 0.1s linear',
				transformStyle: 'preserve-3d',
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
 
/* ─── Data ─────────────────────────────────────────────────────────────────── */
 
const screens = [
	{
		icon: <BarChart2 className="w-4 h-4 text-primary" />,
		title: 'Prediction Analysis',
		desc: 'Input form for stock symbol and investment amount. The algorithmic engine returns a BUY / HOLD / SELL signal with a confidence score, predicted price, and recommendation rationale.',
	},
	{
		icon: <LayoutDashboard className="w-4 h-4 text-primary" />,
		title: 'Dashboard',
		desc: 'Signal analysis with prioritised trade recommendations, portfolio distribution chart, sentiment trend analysis, comprehensive price analysis, RSI technical indicators, and market activity charts.',
	},
	{
		icon: <Briefcase className="w-4 h-4 text-primary" />,
		title: 'Portfolio Tracker',
		desc: 'Live KPIs — portfolio value, total invested, total return, and prediction accuracy. Data tables for analysed stocks and active / completed investments with inline Hold and Sell actions.',
	},
	{
		icon: <ArrowLeftRight className="w-4 h-4 text-primary" />,
		title: 'Stock Comparison',
		desc: 'Compare up to 6 stocks side-by-side. Predicted price path chart, historical performance chart, and a full metrics comparison table including news impact analysis and sentiment scores.',
	},
	{
		icon: <FileText className="w-4 h-4 text-primary" />,
		title: 'Prediction Logs',
		desc: 'Historical log of every prediction — start price, predicted vs actual price, variance, accuracy %, news headline used. Searchable, filterable, and exportable as CSV.',
	},
];
 
const processSteps = [
	{
		phase: 'UX Research',
		action: 'Understand the problem space',
		detail: 'Interviews · Competitive audit · Pain-point mapping',
	},
	{
		phase: 'Information Architecture',
		action: 'Structure the 5-screen user journey',
		detail: 'Site map · User flows · Navigation model',
	},
	{
		phase: 'Wireframing',
		action: 'Sketch layout and hierarchy',
		detail: 'Low-fidelity frames · Content priority · Data density',
	},
	{
		phase: 'UI Design',
		action: 'Build a dark-mode-first dashboard language',
		detail: 'Design tokens · Component library · Colour semantics',
	},
	{
		phase: 'Prototyping',
		action: 'Validate flows before handoff',
		detail: 'Interactive prototype · Usability testing · Iteration',
	},
];
 
const processCards = [
	{
		title: 'UX Research',
		body: (
			<>
				<span className="font-bold">Research:</span> Studied how retail investors
				consume stock data. Identified pain points with information overload in
				existing trading platforms and charting tools — key insight: users needed
				clear signal recommendations, not raw data dumps.
			</>
		),
	},
	{
		title: 'Information Architecture',
		body: (
			<>
				<span className="font-bold">Architecture:</span> Structured 5 core
				modules around a clear user journey — Prediction Input → Dashboard
				Insight → Portfolio Action → Comparison → Historical Audit — each with a
				single, focused user goal.
			</>
		),
	},
	{
		title: 'UI Design',
		body: (
			<>
				<span className="font-bold">Design:</span> Built a dark-mode-first data
				dashboard using consistent colour semantics — green for BUY, amber for
				HOLD, red for SELL — to minimise cognitive load and enable instant
				decision-making.
			</>
		),
	},
];
 
/* ─── Page ──────────────────────────────────────────────────────────────────── */
 
export default function PreedFinancialIntelligence() {
	const projectImage = PlaceHolderImages.find(img => img.id === 'preed');
	const { ref: heroRef, isVisible: heroVisible } =
		useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });
	const { ref: screensRef, isVisible: screensVisible } =
		useScrollAnimation<HTMLDivElement>();
	const { ref: processRef, isVisible: processVisible } =
		useScrollAnimation<HTMLDivElement>();
	const { ref: flowRef, isVisible: flowVisible } =
		useScrollAnimation<HTMLDivElement>();
	const { ref: reflectRef, isVisible: reflectVisible } =
		useScrollAnimation<HTMLDivElement>();
 
	return (
		<main className="relative min-h-screen bg-background overflow-x-hidden">
			<Header />
 
			<div
				className="relative z-10 pt-[var(--space)] pb-[var(--space)] animate-fade-in"
				style={{ animationDuration: '1.5s' }}
			>
				{/* ── Container ───────────────────────────────────────────────── */}
				<div className="container-padding mx-auto">
 
					{/* ── Breadcrumb ───────────────────────────────────────────── */}
					<nav className="flex items-center gap-2 mb-16 opacity-0 animate-entrance-fade-up">
						<Link
							href="/#vault"
							className="text-label text-primary hover:underline"
						>
							My Vault
						</Link>
						<span className="text-label text-muted-foreground opacity-40">/</span>
						<span className="text-label text-muted-foreground">
							Preed · Financial Intelligence
						</span>
					</nav>
 
					{/* ── Hero ─────────────────────────────────────────────────── */}
					<div
						ref={heroRef}
						className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16"
					>
						{/* Left — title + description */}
						<div
							className={cn(
								'lg:col-span-6 flex flex-col transition-all duration-700',
								heroVisible ? 'opacity-100' : 'opacity-0 translate-y-6'
							)}
						>
							<div className="space-y-6 mb-8">
								<h1 className="text-heading">
									Preed<br />
									Financial<br />
									Intelligence
								</h1>
 
								<div className="w-12 h-1 bg-primary my-10" />
 
								<p className="text-body max-w-[480px]">
									A full-featured AI-powered stock prediction web application for
									Indian markets — combining algorithmic signal analysis,
									portfolio tracking, and multi-stock comparison into a single,
									data-dense dashboard experience designed for retail investors.
								</p>
							</div>
						</div>
 
						{/* Right — meta cards */}
						<div
							className={cn(
								'lg:col-span-6 flex flex-col gap-4 transition-all duration-700 delay-100',
								heroVisible ? 'opacity-100' : 'opacity-0 translate-y-6'
							)}
						>
							{[
								{
									icon: <User className="w-4 h-4 text-primary" />,
									label: 'Role',
									value: 'UI/UX Designer',
								},
								{
									icon: <Lightbulb className="w-4 h-4 text-primary" />,
									label: 'Focus',
									value: 'UX Research · UI Design · Information Architecture',
								},
								{
									icon: <Monitor className="w-4 h-4 text-primary" />,
									label: 'Screens',
									value: '5 Core Screens',
								},
							].map((item, i) => (
								<div
									key={i}
									style={{
										animation: `entrance-fade-up 0.6s cubic-bezier(0.23, 1, 0.32, 1) both`,
										animationDelay: `${heroVisible ? i * 60 : 0}ms`,
									}}
								>
									<InteractiveCard className="flex items-center py-5 px-8 card-surface bg-white group">
										<div className="flex items-center w-full">
											<span className="mr-4 opacity-40 group-hover:opacity-100 transition-opacity">
												{item.icon}
											</span>
											<span className="text-body font-bold text-primary w-32 shrink-0">
												{item.label}
											</span>
											<span className="text-body">{item.value}</span>
										</div>
									</InteractiveCard>
								</div>
							))}
 
							{/* Tools card */}
							<div
								style={{
									animation: `entrance-fade-up 0.6s cubic-bezier(0.23, 1, 0.32, 1) both`,
									animationDelay: `${heroVisible ? 180 : 0}ms`,
								}}
							>
								<InteractiveCard className="flex items-start py-5 px-8 card-surface bg-white group">
									<div className="flex items-start w-full">
										<Wrench className="w-4 h-4 text-primary mr-4 mt-1 opacity-40 group-hover:opacity-100 transition-opacity" />
										<span className="text-body font-bold text-primary w-32 shrink-0 mt-1">
											Tools
										</span>
										<div className="flex flex-wrap gap-2">
											{['FIGMA', 'UX RESEARCH', 'INFO ARCH', 'UI DESIGN'].map(
												(tool) => (
													<Badge
														key={tool}
														variant="outline"
														className="rounded-full border-[#2564EB]/20 text-[#2564EB] bg-[#2564EB]/5 px-4 py-1 text-[12px] font-bold tracking-widest uppercase"
													>
														{tool}
													</Badge>
												)
											)}
										</div>
									</div>
								</InteractiveCard>
							</div>
						</div>
					</div>
 
					{/* ── Screen Coverage ───────────────────────────────────────── */}
					<section className="mt-[var(--space-lg)] border-t border-border mb-16">
						<div
							ref={screensRef}
							className={cn(
								'mb-12 space-y-4 transition-all duration-700',
								screensVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
							)}
						>
							<span className="text-label text-muted-foreground">
								Case Study · Application Screens
							</span>
							<h2 className="text-heading">Screen Coverage</h2>
							<div className="w-16 h-1 bg-primary" />
						</div>
 
						<div
							className={cn(
								'grid grid-cols-1 lg:grid-cols-12 gap-10 items-start transition-all duration-700',
								screensVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
							)}
						>
							{/* App image */}
							<div className="lg:col-span-5 flex flex-col">
								<div className="relative w-full aspect-[1/1] md:aspect-[1/1] overflow-hidden bg-[#F4F6F8] card-surface group transition-transform duration-700 hover:scale-[1.01] hover:border-primary/50">
									{projectImage && (
										<Image
											src={projectImage.imageUrl}
											alt={projectImage.description}
											fill
											className="object-contain transition-transform duration-700 group-hover:scale-110"
											data-ai-hint={projectImage.imageHint}
										/>
									)}

									<div className="absolute bottom-8 left-8 z-20">
										<span className="text-label text-foreground/60">
											Project Artifact
										</span>
									</div>
								</div>
							</div>
 
							{/* Screen list */}
							<div className="lg:col-span-7 flex flex-col gap-3">
								{screens.map((screen, i) => (
									<div
										key={i}
										style={{
											animation: `entrance-fade-up 0.6s cubic-bezier(0.23, 1, 0.32, 1) both`,
											animationDelay: `${screensVisible ? i * 70 : 0}ms`,
										}}
									>
										<InteractiveCard className="card-surface bg-white hover:border-primary/50 transition-colors p-6 group">
											<div className="flex items-start gap-4">
												<div className="opacity-40 group-hover:opacity-100 transition-opacity mt-0.5 shrink-0">
													{screen.icon}
												</div>
												<div>
													<h3 className="text-body font-bold text-primary mb-1.5">
														{screen.title}
													</h3>
													<p className="text-body leading-relaxed">
														{screen.desc}
													</p>
												</div>
											</div>
										</InteractiveCard>
									</div>
								))}
							</div>
						</div>
					</section>
 
					{/* ── Design Process cards ──────────────────────────────────── */}
					<section className="mt-[var(--space-lg)] border-t border-border mb-16">
						<div
							ref={processRef}
							className={cn(
								'mb-12 space-y-4 transition-all duration-700',
								processVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
							)}
						>
							<span className="text-label text-muted-foreground">Process</span>
							<h2 className="text-heading">Design Process</h2>
							<div className="w-16 h-1 bg-primary" />
						</div>
 
						<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
							{processCards.map((card, i) => (
								<div
									key={i}
									style={{
										animation: `entrance-scale 0.6s cubic-bezier(0.23, 1, 0.32, 1) both`,
										animationDelay: `${processVisible ? i * 80 : 0}ms`,
									}}
								>
									<InteractiveCard className="card-surface p-8 bg-white hover:border-primary/50 transition-colors h-full">
										<div className="space-y-4">
											<h3 className="text-body font-bold text-primary leading-tight">
												{card.title}
											</h3>
											<p className="text-body leading-relaxed">{card.body}</p>
										</div>
									</InteractiveCard>
								</div>
							))}
						</div>
					</section>
				</div>
 
				{/* ── Dark panel — User Flow Breakdown ──────────────────────────── */}
				<section className="relative min-h-fit flex flex-col justify-center bg-[#0A0F1E] border-y border-white/5 overflow-hidden shadow-2xl py-20">
					<div
						className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none"
						style={{
							backgroundImage:
								'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
							backgroundSize: '40px 40px',
						}}
					/>
 
					<div className="container-padding mx-auto relative z-10">
						<div
							ref={flowRef}
							className={cn(
								'mb-12 space-y-4 transition-all duration-700',
								flowVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
							)}
						>
							<span className="text-label text-white/25">Architecture</span>
							<h2 className="text-heading text-white">User Flow Breakdown</h2>
							<div className="w-16 h-1 bg-white/10" />
						</div>
 
						<div
							className={cn(
								'w-full max-w-none border border-white/10 rounded-xl overflow-hidden bg-transparent transition-all duration-700',
								flowVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
							)}
						>
							{/* Header row */}
							<div className="grid grid-cols-1 md:grid-cols-[240px_minmax(0,1.4fr)_minmax(0,1fr)] bg-white/5 border-b border-white/10 p-3 items-center">
								<span className="text-[10px] font-mono tracking-[0.14em] uppercase text-white/40 md:border-r md:border-white/10 h-full flex items-center pr-4">
									Screen
								</span>
								<span className="text-[10px] font-mono tracking-[0.14em] uppercase text-white/40 md:border-r md:border-white/10 h-full flex items-center px-4">
									User Goal
								</span>
								<span className="text-[10px] font-mono tracking-[0.14em] uppercase text-white/40 h-full flex items-center pl-4">
									Key Interaction
								</span>
							</div>
 
							{processSteps.map((row, i) => (
								<div
									key={i}
									className="grid grid-cols-1 md:grid-cols-[240px_minmax(0,1.4fr)_minmax(0,1fr)] border-b border-white/10 last:border-none hover:bg-white/[0.02] transition-colors"
								>
									<div className="p-3 md:border-r md:border-white/10 flex items-center">
										<span className="text-label text-primary">{row.phase}</span>
									</div>
									<div className="p-3 md:border-r md:border-white/10 flex items-center">
										<span className="text-[13px] font-medium text-white">
											{row.action}
										</span>
									</div>
									<div className="p-3 flex items-center">
										<span className="text-[12px] font-mono text-white/30">
											{row.detail}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
 
				{/* ── Reflection ────────────────────────────────────────────────── */}
				<div className="container-padding mx-auto">
					<section className="mt-[var(--space-xl)] border-t border-border mb-16">
						<div
							ref={reflectRef}
							className={cn(
								'mb-12 space-y-4 transition-all duration-700',
								reflectVisible ? 'opacity-100' : 'opacity-0 translate-y-8'
							)}
						>
							<span className="text-label text-primary">Reflection</span>
							<h2 className="text-heading">Challenge & Outcome</h2>
							<div className="w-16 h-1 bg-primary" />
						</div>
 
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<InteractiveCard className="card-surface p-8 bg-white hover:border-primary/50 transition-colors group">
								<div className="flex gap-6 items-start">
									<div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 mt-1">
										<AlertTriangle className="w-5 h-5 text-amber-600" />
									</div>
									<div className="space-y-3">
										<h3 className="text-body font-bold text-primary">
											The Challenge
										</h3>
										<p className="text-body leading-relaxed">
											Financial data is inherently dense — multiple confidence
											scores, technical indicators, and time-series charts must
											coexist without overwhelming a retail investor who is not a
											professional trader. Every screen competes for attention.
										</p>
									</div>
								</div>
							</InteractiveCard>
 
							<InteractiveCard className="card-surface p-8 bg-white hover:border-primary/50 transition-colors group">
								<div className="flex gap-6 items-start">
									<div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 mt-1">
										<Award className="w-5 h-5 text-emerald-600" />
									</div>
									<div className="space-y-3">
										<h3 className="text-body font-bold text-primary">
											The Outcome
										</h3>
										<p className="text-body leading-relaxed">
											A structured 5-screen information architecture with a
											consistent dark dashboard language, colour-coded signal
											semantics (green BUY · amber HOLD · red SELL), and a
											clear flow from prediction input through to historical audit.
										</p>
									</div>
								</div>
							</InteractiveCard>
						</div>
					</section>
 
					{/* ── Bottom nav ────────────────────────────────────────────── */}
					<div className="mt-6 pt-4 border-t border-border flex flex-col md:flex-row items-center justify-between gap-8">
						<Link
							href="/#vault"
							className="text-label text-muted-foreground flex items-center gap-2 group hover:text-foreground transition-colors uppercase"
						>
							<span className="text-lg transition-transform group-hover:-translate-x-1">
								←
							</span>
							<span>Back to Vault</span>
						</Link>
						<div className="text-label text-muted-foreground">
							Preed · UI/UX · Financial Intelligence · 2025
						</div>
					</div>
				</div>
			</div>
 
			<Footer />
		</main>
	);
}