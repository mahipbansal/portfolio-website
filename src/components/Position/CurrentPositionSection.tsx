'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Sparkles, Brain, Rocket, Binary, Layers, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

interface PositionCard {
  id: string;
  label: string;
  shortLabel: string;
  main: string;
  description: string;
  status: string;
  statusColor: 'green' | 'amber' | 'gold';
  tags: string[];
  isTrend?: boolean;
  icon: React.ElementType;
  iconColor: string;
  containerBg: string;
  tagStyle: string;
  statusBadgeStyle: string;
  dotBg: string;
  progressBarBg: string;
  tabActiveStyle: string;
}

const POSITION_CARDS: PositionCard[] = [
  {
    id: 'current-focus',
    label: 'PRIMARY FOCUS',
    shortLabel: 'AI / GenAI',
    main: 'AI & GenAI Applications',
    description: 'Building practical AI applications, exploring agentic workflows, and integrating LLMs beyond basic wrapper APIs.',
    status: '● BUILDING',
    statusColor: 'green',
    tags: ['LLMs', 'Agentic Workflows', 'PyTorch', 'FastAPI', 'LangChain'],
    isTrend: true,
    icon: Brain,
    iconColor: 'text-[#00E676] filter drop-shadow-[0_0_10px_rgba(0,230,118,0.6)]',
    containerBg: 'bg-[#00E676]/10 border-[#00E676]/40',
    tagStyle: 'bg-[#00E676]/12 text-[#00E676] border border-[#00E676]/40 shadow-[0_0_10px_rgba(0,230,118,0.2)]',
    statusBadgeStyle: 'bg-[#00E676]/15 text-[#00E676] border-[#00E676]/40 shadow-[0_0_10px_rgba(0,230,118,0.3)]',
    dotBg: 'bg-[#00E676]',
    progressBarBg: 'bg-[#00E676] shadow-[0_0_12px_rgba(0,230,118,0.8)]',
    tabActiveStyle: 'bg-[#00E676]/15 text-[#00E676] border-[#00E676]/50 shadow-[0_0_15px_rgba(0,230,118,0.3)]',
  },
  {
    id: 'active-builds',
    label: 'SOFTWARE DEPLOYMENTS',
    shortLabel: 'PROJECTS',
    main: 'Developing Production-Grade Products',
    description: 'Engineering systems like LinkLift, PA Roxxx OS & JARVIS — transforming complex user needs into high-performance software.',
    status: '● ACTIVE',
    statusColor: 'green',
    tags: ['LinkLift', 'PA Roxxx OS', 'JARVIS', 'Next.js 15', 'PostgreSQL'],
    icon: Rocket,
    iconColor: 'text-[#38BDF8] filter drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]',
    containerBg: 'bg-[#38BDF8]/10 border-[#38BDF8]/40',
    tagStyle: 'bg-[#38BDF8]/12 text-[#38BDF8] border border-[#38BDF8]/40 shadow-[0_0_10px_rgba(56,189,248,0.2)]',
    statusBadgeStyle: 'bg-[#38BDF8]/15 text-[#38BDF8] border-[#38BDF8]/40 shadow-[0_0_10px_rgba(56,189,248,0.3)]',
    dotBg: 'bg-[#38BDF8]',
    progressBarBg: 'bg-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.8)]',
    tabActiveStyle: 'bg-[#38BDF8]/15 text-[#38BDF8] border-[#38BDF8]/50 shadow-[0_0_15px_rgba(56,189,248,0.3)]',
  },
  {
    id: 'dsa-practicing',
    label: 'ALGORITHMIC RIGOR',
    shortLabel: 'DSA PRACTICE',
    main: 'Data Structures & Algorithms',
    description: 'Solving complex algorithmic problems daily in C++ and Python to hone computational intuition and optimal space/time efficiency.',
    status: '● PRACTICING',
    statusColor: 'gold',
    tags: ['C++', 'Python', 'Trees & Graphs', 'Dynamic Programming', 'O(N) Optimization'],
    isTrend: true,
    icon: Binary,
    iconColor: 'text-[#F59E0B] filter drop-shadow-[0_0_10px_rgba(245,158,11,0.6)]',
    containerBg: 'bg-[#F59E0B]/10 border-[#F59E0B]/40',
    tagStyle: 'bg-[#F59E0B]/12 text-[#F59E0B] border border-[#F59E0B]/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]',
    statusBadgeStyle: 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/40 shadow-[0_0_10px_rgba(245,158,11,0.3)]',
    dotBg: 'bg-[#F59E0B]',
    progressBarBg: 'bg-[#F59E0B] shadow-[0_0_12px_rgba(245,158,11,0.8)]',
    tabActiveStyle: 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]',
  },
  {
    id: 'system-architecture',
    label: 'INFRASTRUCTURE',
    shortLabel: 'ARCHITECTURE',
    main: 'Full-Stack & Systems Architecture',
    description: 'Designing end-to-end distributed applications with robust databases, secure API layers, and responsive UI components.',
    status: '● ONGOING',
    statusColor: 'green',
    tags: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    icon: Layers,
    iconColor: 'text-purple-400 filter drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]',
    containerBg: 'bg-purple-400/10 border-purple-400/40',
    tagStyle: 'bg-purple-400/12 text-purple-400 border border-purple-400/40 shadow-[0_0_10px_rgba(168,85,247,0.2)]',
    statusBadgeStyle: 'bg-purple-400/15 text-purple-400 border-purple-400/40 shadow-[0_0_10px_rgba(168,85,247,0.3)]',
    dotBg: 'bg-purple-400',
    progressBarBg: 'bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]',
    tabActiveStyle: 'bg-purple-400/15 text-purple-400 border-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]',
  },
];

export default function CurrentPositionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-rotating deck timer (5 seconds)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % POSITION_CARDS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeCard = POSITION_CARDS[activeIndex];
  const Icon = activeCard.icon;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % POSITION_CARDS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + POSITION_CARDS.length) % POSITION_CARDS.length);
  };

  return (
    <section
      id="current-position"
      ref={sectionRef}
      className="w-full pt-8 pb-16 px-4 sm:px-8 relative bg-[#050505] flex flex-col justify-center items-center z-40"
    >
      <div className="max-w-3xl w-full mx-auto relative z-10 space-y-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center space-y-2"
        >
          {/* Heading Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#050505] border-2 border-white/20 hover:border-white/40 shadow-md transition-all">
            <Sparkles className="w-3.5 h-3.5 text-slate-200" />
            <span className="text-[10px] font-mono tracking-[0.2em] text-slate-200 uppercase font-extrabold">
              CURRENT POSITION
            </span>
          </div>

          {/* Dark White Main Heading */}
          <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-200 leading-tight">
            Building My Next Position
          </h2>

          {/* Grayish Subtitle Description */}
          <p className="text-gray-400 font-mono text-xs max-w-xl mx-auto leading-relaxed">
            Real-time telemetry of active technical focus areas, algorithms practice, and software deployments.
          </p>
        </motion.div>

        {/* Interactive Pill Tabs Navigation (Dynamic Tab Theme Colors) */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 font-mono text-xs pt-2">
          {POSITION_CARDS.map((card, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={card.id}
                onClick={() => setActiveIndex(idx)}
                className={`px-3.5 py-1.5 rounded-xl transition-all duration-300 font-semibold tracking-wider flex items-center space-x-2 text-[11px] cursor-pointer border ${
                  isActive
                    ? `${card.tabActiveStyle} scale-105 font-bold`
                    : 'bg-[#050505] text-gray-400 border-white/10 hover:text-slate-200 hover:border-white/30'
                }`}
              >
                <span className={`text-[10px] font-bold ${isActive ? '' : 'text-slate-400'}`}>0{idx + 1}.</span>
                <span>{card.shortLabel}</span>
                {isActive && <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${card.dotBg}`} />}
              </button>
            );
          })}
        </div>

        {/* Pure Dark Black Executive Deck Container */}
        <div
          className="relative w-full max-w-2xl sm:max-w-3xl mx-auto rounded-2xl bg-[#050505] border-2 border-white/20 hover:border-white/40 backdrop-blur-xl pt-5 px-6 pb-3 sm:pt-6 sm:px-7 sm:pb-3.5 shadow-2xl min-h-[200px] flex flex-col justify-between overflow-hidden transition-all duration-300"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Animated Card Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCard.id}
              initial={{ opacity: 0, x: 25, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -25, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3 relative z-10"
            >
              {/* Card Meta Header */}
              <div className="flex items-center justify-between font-mono text-xs">
                <div className="flex items-center space-x-2.5">
                  <div className={`w-9.5 h-9.5 rounded-xl border flex items-center justify-center shadow-md transition-all ${activeCard.containerBg}`}>
                    <Icon className={`w-5 h-5 ${activeCard.iconColor}`} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-200 font-extrabold tracking-[0.2em] uppercase block">
                      {activeCard.label}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      POSITION // 0{activeIndex + 1} OF 0{POSITION_CARDS.length}
                    </span>
                  </div>
                </div>

                {/* Status Indicator Badge (Dynamic Tab Color) */}
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 transition-all duration-300 ${activeCard.statusBadgeStyle}`}>
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${activeCard.dotBg}`} />
                    {activeCard.status}
                  </span>
                </div>
              </div>

              {/* Dark White Card Main Title */}
              <h3 className="text-lg sm:text-xl font-bold text-slate-200 tracking-tight leading-tight">
                {activeCard.main}
              </h3>

              {/* Grayish Card Description */}
              <p className="text-gray-400 font-mono text-xs sm:text-sm leading-relaxed max-w-xl">
                {activeCard.description}
              </p>

              {/* Tech Tags Badge Strip */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {activeCard.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 ${activeCard.tagStyle}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Footer Controls & Progress Telemetry */}
          <div className="relative z-10 pt-2 mt-1.5 border-t border-white/10 flex items-center justify-between font-mono text-xs text-gray-400">
            <div className="flex items-center space-x-2">
              <Zap className="w-3 h-3 text-slate-200" />
              <span className="text-[10px] text-slate-200 font-bold uppercase tracking-wider">
                {isPaused ? 'PAUSED (HOVERED)' : 'ROTATING (5S)'}
              </span>
            </div>

            {/* Left & Right Card Arrow Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-lg bg-[#050505] border border-white/20 hover:border-white/50 text-slate-200 hover:text-white transition-all cursor-pointer"
                title="Previous Position"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>

              <span className="text-[10px] font-bold text-slate-200 px-1 font-mono">
                0{activeIndex + 1} / 0{POSITION_CARDS.length}
              </span>

              <button
                onClick={handleNext}
                className="p-1.5 rounded-lg bg-[#050505] border border-white/20 hover:border-white/50 text-slate-200 hover:text-white transition-all cursor-pointer"
                title="Next Position"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bottom Card Progress Bar Line (Dynamic Tab Color) */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
            <motion.div
              key={`${activeIndex}-${isPaused}`}
              initial={{ width: '0%' }}
              animate={{ width: isPaused ? '100%' : '100%' }}
              transition={{ duration: isPaused ? 0 : 5, ease: 'linear' }}
              className={`h-full transition-colors duration-300 ${activeCard.progressBarBg}`}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
