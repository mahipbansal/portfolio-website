'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Sparkles,
  Terminal,
  Binary,
  Cpu,
  RefreshCcw,
  Zap,
  CheckCircle2,
  Brain,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface DPStateNode {
  id: string;
  index: number;
  label: string;
  tag: string;
  dpValue: number;
  icon: React.ElementType;
  color: string;
  glowColor: string;
  borderColor: string;
  bgGradient: string;
  summary: string;
  equation: string;
  skills: string[];
}

const DP_NODES: DPStateNode[] = [
  {
    id: 'dp0',
    index: 0,
    label: 'CURIOSITY & START',
    tag: 'INIT STATE',
    dpValue: 12,
    icon: Terminal,
    color: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    borderColor: 'border-sky-500/40',
    bgGradient: 'from-sky-950/40 to-slate-900/40',
    summary: 'Sparked interest in CS, writing first C++ scripts and understanding core computer architecture.',
    equation: 'dp[0] = Base_Curiosity() = 12',
    skills: ['C++', 'Logic Building', 'Algorithmic Thinking'],
  },
  {
    id: 'dp1',
    index: 1,
    label: 'FOUNDATION & DSA',
    tag: 'LOGIC STATE',
    dpValue: 35,
    icon: Binary,
    color: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    borderColor: 'border-purple-500/40',
    bgGradient: 'from-purple-950/40 to-slate-900/40',
    summary: 'Mastered Data Structures & Algorithms, recursion, trees, graphs, and memory management.',
    equation: 'dp[1] = dp[0] + Problem_Solving(DSA) = 35',
    skills: ['Data Structures', 'C++ STL', 'Algorithm Optimization'],
  },
  {
    id: 'dp2',
    index: 2,
    label: 'BUILD & DEPLOY',
    tag: 'BRANCH 2A',
    dpValue: 68,
    icon: Cpu,
    color: '#00E676',
    glowColor: 'rgba(0, 230, 118, 0.4)',
    borderColor: 'border-[#00E676]/40',
    bgGradient: 'from-emerald-950/40 to-slate-900/40',
    summary: 'Shifting logic into full-stack web applications, React, Next.js, and high-performance APIs.',
    equation: 'dp[2] = dp[1] + FullStack_Apps() = 68',
    skills: ['Next.js 15', 'React 19', 'TypeScript', 'Node.js'],
  },
  {
    id: 'dp3',
    index: 3,
    label: 'FAIL & REFACTOR',
    tag: 'BRANCH 2B',
    dpValue: 54,
    icon: RefreshCcw,
    color: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    borderColor: 'border-amber-500/40',
    bgGradient: 'from-amber-950/40 to-slate-900/40',
    summary: 'Debugging edge cases, performance profiling, refactoring code bases, and resilience.',
    equation: 'dp[3] = dp[1] + Iterative_Debugging() = 54',
    skills: ['Bug Diagnostics', 'State Refactoring', 'Performance Profiling'],
  },
  {
    id: 'dp4',
    index: 4,
    label: 'AI & INTELLIGENT SYSTEMS',
    tag: 'SURGE STATE',
    dpValue: 88,
    icon: Brain,
    color: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    borderColor: 'border-pink-500/40',
    bgGradient: 'from-pink-950/40 to-slate-900/40',
    summary: 'Integrating LLMs, Retrieval-Augmented Generation (RAG), and autonomous agentic workflows.',
    equation: 'dp[4] = max(dp[2], dp[3]) + AI_Agentics = 88',
    skills: ['LLMs', 'RAG Pipelines', 'PyTorch', 'Agentic Workflows'],
  },
  {
    id: 'dp5',
    index: 5,
    label: 'OPTIMAL STATE: CURRENT ME',
    tag: 'GLOBAL OPTIMUM',
    dpValue: 100,
    icon: Zap,
    color: '#EF4444',
    glowColor: 'rgba(239, 68, 68, 0.6)',
    borderColor: 'border-red-500/50',
    bgGradient: 'from-red-950/70 to-slate-950/80',
    summary: 'Computer Science student & active builder turning rough ideas into working, scalable products.',
    equation: 'dp[5] = dp[4] + Continuous_Evolution = 100%',
    skills: ['AI Systems', 'Full Stack Architecture', 'Product Creation'],
  },
];

export default function UnifiedAboutSection() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });
  const hasStartedRef = React.useRef(false);

  const [activeNode, setActiveNode] = useState<DPStateNode>(DP_NODES[0]);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [computedStep, setComputedStep] = useState<number>(-1);
  const [isUpward, setIsUpward] = useState<boolean>(false);
  const [upwardStep, setUpwardStep] = useState<number>(0);
  const timeoutsRef = React.useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  };

  const startLoopSequence = () => {
    clearAllTimers();
    setIsUpward(false);
    setUpwardStep(0);
    setComputedStep(-1);
    setIsExecuting(true);
    setIsPaused(false);

    // Pure Sequential Story Mode Pass (dp[2] BUILD & DEPLOY Green FIRST, then dp[3] FAIL & REFACTOR Amber SECOND)
    const steps = [
      { step: 0, delay: 300, nodeIdx: 0 },    // dp[0] CURIOSITY & START
      { step: 1, delay: 2600, nodeIdx: 0 },   // Connector 1 down (stays at dp[0] for 2.3s)
      { step: 2, delay: 3500, nodeIdx: 1 },   // dp[1] FOUNDATION & DSA
      { step: 3, delay: 5800, nodeIdx: 2 },   // Left branch into dp[2] (Green) FIRST (stays at dp[1] for 2.3s)
      { step: 4, delay: 8100, nodeIdx: 3 },   // Right branch into dp[3] (Amber) SECOND (stays at dp[2] for 2.3s)
      { step: 5, delay: 10400, nodeIdx: 3 },  // Merge branch lines (stays at dp[3] for 2.3s)
      { step: 6, delay: 11400, nodeIdx: 4 },  // dp[4] AI SYSTEMS
      { step: 7, delay: 13700, nodeIdx: 4 },  // Connector 4 down (stays at dp[4] for 2.3s)
      { step: 8, delay: 14700, nodeIdx: 5 },  // dp[5] OPTIMUM (Crimson Red)
    ];

    steps.forEach(({ step, delay, nodeIdx }) => {
      const t = setTimeout(() => {
        setComputedStep(step);
        setActiveNode(DP_NODES[nodeIdx]);
        if (step === 8) {
          // Pause 3.0 seconds at 100%, then start UPWARD REVERSE SLITHER!
          const tUp = setTimeout(() => {
            triggerUpwardReset();
          }, 3000);
          timeoutsRef.current.push(tUp);
        }
      }, delay);
      timeoutsRef.current.push(t);
    });
  };

  const triggerUpwardReset = () => {
    setIsUpward(true);
    const upwardSteps = [
      { uStep: 1, delay: 100, nodeIdx: 4 },  // Retract Connector 4 up to dp[4]
      { uStep: 2, delay: 800, nodeIdx: 2 },  // Retract Connector 3 up to dp[2]/dp[3]
      { uStep: 3, delay: 1500, nodeIdx: 1 }, // Retract Connector 2 up to dp[1]
      { uStep: 4, delay: 2200, nodeIdx: 0 }, // Retract Connector 1 up to dp[0]
      { uStep: 5, delay: 2900, nodeIdx: 0 }, // Reset dp[0]
    ];

    upwardSteps.forEach(({ uStep, delay, nodeIdx }) => {
      const t = setTimeout(() => {
        setUpwardStep(uStep);
        setActiveNode(DP_NODES[nodeIdx]);
        if (uStep === 5) {
          // Pause for 2.5 seconds gap before restarting the next sequential downward pass!
          const gapT = setTimeout(() => {
            startLoopSequence();
          }, 2500);
          timeoutsRef.current.push(gapT);
        }
      }, delay);
      timeoutsRef.current.push(t);
    });
  };

  const resumeLoopSequence = () => {
    clearAllTimers();
    setIsPaused(false);
    setIsExecuting(true);

    if (!isUpward) {
      const fullSteps = [
        { step: 0, delay: 300, nodeIdx: 0 },
        { step: 1, delay: 2600, nodeIdx: 0 },
        { step: 2, delay: 3500, nodeIdx: 1 },
        { step: 3, delay: 5800, nodeIdx: 2 },
        { step: 4, delay: 8100, nodeIdx: 3 },
        { step: 5, delay: 10400, nodeIdx: 3 },
        { step: 6, delay: 11400, nodeIdx: 4 },
        { step: 7, delay: 13700, nodeIdx: 4 },
        { step: 8, delay: 14700, nodeIdx: 5 },
      ];

      const remainingSteps = fullSteps.filter((s) => s.step > computedStep);
      if (remainingSteps.length === 0) {
        triggerUpwardReset();
        return;
      }

      const baseDelay = remainingSteps[0].delay;

      remainingSteps.forEach(({ step, delay, nodeIdx }) => {
        const relDelay = Math.max(100, delay - baseDelay + 200);
        const t = setTimeout(() => {
          setComputedStep(step);
          setActiveNode(DP_NODES[nodeIdx]);
          if (step === 8) {
            const tUp = setTimeout(() => {
              triggerUpwardReset();
            }, 2500);
            timeoutsRef.current.push(tUp);
          }
        }, relDelay);
        timeoutsRef.current.push(t);
      });
    } else {
      // Resuming Upward Reverse Pass!
      const fullUpward = [
        { uStep: 1, delay: 100, nodeIdx: 4 },
        { uStep: 2, delay: 700, nodeIdx: 2 },
        { uStep: 3, delay: 1300, nodeIdx: 1 },
        { uStep: 4, delay: 1900, nodeIdx: 0 },
        { uStep: 5, delay: 2500, nodeIdx: 0 },
      ];

      const remainingUpward = fullUpward.filter((s) => s.uStep > upwardStep);
      if (remainingUpward.length === 0) {
        const gapT = setTimeout(() => {
          startLoopSequence();
        }, 2500);
        timeoutsRef.current.push(gapT);
        return;
      }

      const baseDelay = remainingUpward[0].delay;

      remainingUpward.forEach(({ uStep, delay, nodeIdx }) => {
        const relDelay = Math.max(100, delay - baseDelay + 200);
        const t = setTimeout(() => {
          setUpwardStep(uStep);
          setActiveNode(DP_NODES[nodeIdx]);
          if (uStep === 5) {
            const gapT = setTimeout(() => {
              startLoopSequence();
            }, 2500);
            timeoutsRef.current.push(gapT);
          }
        }, relDelay);
        timeoutsRef.current.push(t);
      });
    }
  };

  React.useEffect(() => {
    if (isInView && !hasStartedRef.current) {
      hasStartedRef.current = true;
      startLoopSequence();
    }
    return () => {
      clearAllTimers();
    };
  }, [isInView]);

  const togglePlayPause = () => {
    if (isPaused) {
      resumeLoopSequence();
    } else {
      setIsPaused(true);
      clearAllTimers();
    }
  };

  const handleNodeClick = (node: DPStateNode) => {
    clearAllTimers();
    setIsPaused(true);
    setIsUpward(false);
    setActiveNode(node);

    if (node.id === 'dp0') setComputedStep(0);
    else if (node.id === 'dp1') setComputedStep(2);
    else if (node.id === 'dp2') setComputedStep(3);
    else if (node.id === 'dp3') setComputedStep(4);
    else if (node.id === 'dp4') setComputedStep(6);
    else if (node.id === 'dp5') setComputedStep(8);
  };

  const handlePrevState = () => {
    const currentIndex = DP_NODES.findIndex((n) => n.id === activeNode.id);
    const prevIndex = (currentIndex - 1 + DP_NODES.length) % DP_NODES.length;
    handleNodeClick(DP_NODES[prevIndex]);
  };

  const handleNextState = () => {
    const currentIndex = DP_NODES.findIndex((n) => n.id === activeNode.id);
    const nextIndex = (currentIndex + 1) % DP_NODES.length;
    handleNodeClick(DP_NODES[nextIndex]);
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full min-h-screen pt-14 pb-28 px-4 sm:px-8 relative overflow-hidden bg-[#050505] flex flex-col justify-center items-center z-20 select-none"
    >
      <div className="max-w-7xl w-full mx-auto z-10 relative">
        
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full flex flex-col space-y-4 font-mono"
        >
          <div className="w-full relative flex flex-col space-y-4">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              <div className="lg:col-span-7 relative w-full py-2 flex flex-col items-center space-y-0 px-2 sm:px-4 -translate-x-4 sm:-translate-x-6 lg:-translate-x-10">
                
                {/* Node dp[0]: START + Play/Pause Control Button */}
                <div className="w-full max-w-[280px] sm:max-w-[320px] flex justify-center relative">
                  <DPNodeButton
                    node={DP_NODES[0]}
                    isActive={activeNode.id === 'dp0'}
                    isComputed={isUpward ? upwardStep < 5 : computedStep >= 0}
                    onClick={() => handleNodeClick(DP_NODES[0])}
                  />

                  {/* PLAY / PAUSE CONTROL BUTTON */}
                  <button
                    onClick={togglePlayPause}
                    title={isPaused ? 'Resume Animation' : 'Pause Animation'}
                    className={`absolute -right-11 sm:-right-14 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border transition-all flex items-center justify-center cursor-pointer shadow-lg group ${
                      !isPaused
                        ? 'bg-[#00E676]/20 border-[#00E676] text-[#00E676] shadow-[0_0_12px_rgba(0,230,118,0.4)]'
                        : 'bg-white/5 border-white/20 text-gray-300 hover:text-white hover:border-[#00E676] hover:bg-[#00E676]/10'
                    }`}
                  >
                    {!isPaused ? (
                      <Pause className="w-4 h-4 text-[#00E676] fill-[#00E676] group-hover:scale-110 transition-transform" />
                    ) : (
                      <Play className="w-4 h-4 text-[#00E676] fill-[#00E676]/30 ml-0.5 group-hover:scale-110 transition-transform" />
                    )}
                  </button>
                </div>

                {/* Connector 1: dp[0] -> dp[1] Snake Line */}
                <div className="w-full flex justify-center relative z-10 py-0.5">
                  <svg viewBox="0 0 24 30" className="w-6 h-7.5 overflow-visible">
                    <defs>
                      <linearGradient id="grad01" gradientUnits="userSpaceOnUse" x1="12" y1="4" x2="12" y2="28">
                        <stop offset="0%" stopColor="#38BDF8" />
                        <stop offset="100%" stopColor="#A855F7" />
                      </linearGradient>
                    </defs>
                    <line x1="12" y1="4" x2="12" y2="28" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
                    <line
                      x1="12" y1="4" x2="12" y2="28"
                      stroke="url(#grad01)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="30"
                      strokeDashoffset={isUpward ? (upwardStep >= 4 ? 30 : 0) : (computedStep >= 1 ? 0 : 30)}
                      className="transition-[stroke-dashoffset] duration-900 ease-in-out"
                    />
                    <circle cx="12" cy="4" r="4" fill={isUpward ? (upwardStep < 5 ? '#38BDF8' : '#334155') : (computedStep >= 0 ? '#38BDF8' : '#334155')} className="transition-colors duration-700" />
                    <circle cx="12" cy="28" r="4" fill={isUpward ? (upwardStep < 4 ? '#A855F7' : '#334155') : (computedStep >= 1 ? '#A855F7' : '#334155')} className="transition-colors duration-700" />
                  </svg>
                </div>

                {/* Node dp[1]: LEARNING & DSA */}
                <div className="w-full max-w-[280px] sm:max-w-[320px] flex justify-center">
                  <DPNodeButton
                    node={DP_NODES[1]}
                    isActive={activeNode.id === 'dp1'}
                    isComputed={isUpward ? upwardStep < 4 : computedStep >= 2}
                    onClick={() => handleNodeClick(DP_NODES[1])}
                  />
                </div>

                {/* Connector 2: Branching dp[1] -> dp[2] & dp[3] */}
                <div className="w-full flex justify-center relative z-10 py-1">
                  <svg viewBox="0 0 300 36" className="w-full max-w-[480px] sm:max-w-[520px] h-9 overflow-visible" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="grad1To2" gradientUnits="userSpaceOnUse" x1="150" y1="4" x2="75" y2="36">
                        <stop offset="0%" stopColor="#A855F7" />
                        <stop offset="100%" stopColor="#00E676" />
                      </linearGradient>
                      <linearGradient id="grad1To3" gradientUnits="userSpaceOnUse" x1="150" y1="4" x2="225" y2="36">
                        <stop offset="0%" stopColor="#A855F7" />
                        <stop offset="100%" stopColor="#F59E0B" />
                      </linearGradient>
                    </defs>
                    <line x1="150" y1="4" x2="150" y2="18" stroke="#1F2937" strokeWidth="3" />
                    <path d="M 150 18 L 75 18 L 75 36" stroke="#1F2937" strokeWidth="3" fill="none" />
                    <path d="M 150 18 L 225 18 L 225 36" stroke="#1F2937" strokeWidth="3" fill="none" />

                    {/* Top Stem Snake */}
                    <line
                      x1="150" y1="4" x2="150" y2="18"
                      stroke="#A855F7"
                      strokeWidth="3"
                      strokeDasharray="20"
                      strokeDashoffset={isUpward ? (upwardStep >= 4 ? 20 : 0) : (computedStep >= 2 ? 0 : 20)}
                      className="transition-[stroke-dashoffset] duration-400 ease-in-out"
                    />

                    {/* Left Branch Snake (BUILD & DEPLOY - Green) */}
                    <path
                      d="M 150 18 L 75 18 L 75 36"
                      stroke="url(#grad1To2)"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="160"
                      strokeDashoffset={isUpward ? (upwardStep >= 3 ? 160 : 0) : (computedStep >= 3 ? 0 : 160)}
                      className="transition-[stroke-dashoffset] duration-900 ease-in-out"
                    />

                    {/* Right Branch Snake (FAIL & REFACTOR - Amber) */}
                    <path
                      d="M 150 18 L 225 18 L 225 36"
                      stroke="url(#grad1To3)"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="160"
                      strokeDashoffset={isUpward ? (upwardStep >= 3 ? 160 : 0) : (computedStep >= 4 ? 0 : 160)}
                      className="transition-[stroke-dashoffset] duration-900 ease-in-out"
                    />

                    {/* Top Dot */}
                    <circle cx="150" cy="4" r="4" fill={isUpward ? (upwardStep < 4 ? '#A855F7' : '#334155') : (computedStep >= 2 ? '#A855F7' : '#334155')} className="transition-colors duration-500" />

                    {/* Left Bottom Dot (Green) */}
                    <circle cx="75" cy="36" r="4" fill={isUpward ? (upwardStep < 3 ? '#00E676' : '#334155') : (computedStep >= 3 ? '#00E676' : '#334155')} className="transition-colors duration-500" />

                    {/* Right Bottom Dot (Amber) */}
                    <circle
                      cx="225" cy="36" r="4"
                      fill={isUpward ? (upwardStep < 3 ? '#F59E0B' : '#334155') : (computedStep >= 4 ? '#F59E0B' : '#334155')}
                      className="transition-colors duration-500"
                    />
                  </svg>
                </div>

                {/* PARALLEL BRANCH LAYER: dp[2] BUILD & dp[3] FAIL */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-[480px] sm:max-w-[520px]">
                  <DPNodeButton
                    node={DP_NODES[2]}
                    isActive={activeNode.id === 'dp2'}
                    isComputed={isUpward ? upwardStep < 3 : computedStep >= 3}
                    onClick={() => handleNodeClick(DP_NODES[2])}
                  />
                  <DPNodeButton
                    node={DP_NODES[3]}
                    isActive={activeNode.id === 'dp3'}
                    isComputed={isUpward ? upwardStep < 3 : computedStep >= 4}
                    onClick={() => handleNodeClick(DP_NODES[3])}
                  />
                </div>

                {/* Connector 3: Merge Branch Snake Lines dp[2] & dp[3] -> dp[4] */}
                <div className="w-full flex justify-center relative z-10 py-1">
                  <svg viewBox="0 0 300 36" className="w-full max-w-[480px] sm:max-w-[520px] h-9 overflow-visible" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="grad2To4" gradientUnits="userSpaceOnUse" x1="75" y1="4" x2="150" y2="36">
                        <stop offset="0%" stopColor="#00E676" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                      <linearGradient id="grad3To4" gradientUnits="userSpaceOnUse" x1="225" y1="4" x2="150" y2="36">
                        <stop offset="0%" stopColor="#F59E0B" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                    <path d="M 75 4 L 75 20 L 150 20" stroke="#1F2937" strokeWidth="3" fill="none" />
                    <path d="M 225 4 L 225 20 L 150 20" stroke="#1F2937" strokeWidth="3" fill="none" />
                    <line x1="150" y1="20" x2="150" y2="36" stroke="#1F2937" strokeWidth="3" />

                    {/* Left Top Dot (dp[2]) */}
                    <circle cx="75" cy="4" r="4" fill={isUpward ? (upwardStep < 3 ? '#00E676' : '#334155') : (computedStep >= 3 ? '#00E676' : '#334155')} className="transition-colors duration-500" />
                    {/* Right Top Dot (dp[3]) */}
                    <circle cx="225" cy="4" r="4" fill={isUpward ? (upwardStep < 3 ? '#F59E0B' : '#334155') : (computedStep >= 4 ? '#F59E0B' : '#334155')} className="transition-colors duration-500" />

                    {/* Left Merge Snake (Green from dp[2]) */}
                    <path
                      d="M 75 4 L 75 20 L 150 20"
                      stroke="url(#grad2To4)"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="160"
                      strokeDashoffset={isUpward ? (upwardStep >= 2 ? 160 : 0) : (computedStep >= 5 ? 0 : 160)}
                      className="transition-[stroke-dashoffset] duration-900 ease-in-out"
                    />

                    {/* Right Merge Snake (Amber from dp[3]) */}
                    <path
                      d="M 225 4 L 225 20 L 150 20"
                      stroke="url(#grad3To4)"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="160"
                      strokeDashoffset={isUpward ? (upwardStep >= 2 ? 160 : 0) : (computedStep >= 5 ? 0 : 160)}
                      className="transition-[stroke-dashoffset] duration-900 ease-in-out"
                    />

                    {/* Down Stem Snake to dp[4] */}
                    <line
                      x1="150" y1="20" x2="150" y2="36"
                      stroke="#EC4899"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="20"
                      strokeDashoffset={isUpward ? (upwardStep >= 2 ? 20 : 0) : (computedStep >= 5 ? 0 : 20)}
                      className="transition-[stroke-dashoffset] duration-400 ease-in-out delay-500"
                    />

                    {/* Bottom Dot (Pink) */}
                    <circle cx="150" cy="36" r="4" fill={isUpward ? (upwardStep < 2 ? '#EC4899' : '#334155') : (computedStep >= 5 ? '#EC4899' : '#334155')} className="transition-colors duration-500 delay-700" />
                  </svg>
                </div>

                {/* Node dp[4]: AI SYSTEMS */}
                <div className="w-full max-w-[280px] sm:max-w-[320px] flex justify-center">
                  <DPNodeButton
                    node={DP_NODES[4]}
                    isActive={activeNode.id === 'dp4'}
                    isComputed={isUpward ? upwardStep < 2 : computedStep >= 6}
                    onClick={() => handleNodeClick(DP_NODES[4])}
                  />
                </div>

                {/* Connector 4: dp[4] -> dp[5] Snake Line */}
                <div className="w-full flex justify-center relative z-10 py-0.5">
                  <svg viewBox="0 0 24 30" className="w-6 h-7.5 overflow-visible">
                    <defs>
                      <linearGradient id="grad45" gradientUnits="userSpaceOnUse" x1="12" y1="4" x2="12" y2="28">
                        <stop offset="0%" stopColor="#EC4899" />
                        <stop offset="100%" stopColor="#EF4444" />
                      </linearGradient>
                    </defs>
                    <line x1="12" y1="4" x2="12" y2="28" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
                    <line
                      x1="12" y1="4" x2="12" y2="28"
                      stroke="url(#grad45)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray="30"
                      strokeDashoffset={isUpward ? (upwardStep >= 1 ? 30 : 0) : (computedStep >= 7 ? 0 : 30)}
                      className="transition-[stroke-dashoffset] duration-900 ease-in-out"
                    />
                    <circle cx="12" cy="4" r="4" fill={isUpward ? (upwardStep < 2 ? '#EC4899' : '#334155') : (computedStep >= 6 ? '#EC4899' : '#334155')} className="transition-colors duration-700" />
                    <circle cx="12" cy="28" r="4" fill={isUpward ? (upwardStep < 1 ? '#EF4444' : '#334155') : (computedStep >= 7 ? '#EF4444' : '#334155')} className="transition-colors duration-700" />
                  </svg>
                </div>

                {/* Node dp[5]: CURRENT ME (OPTIMUM) */}
                <div className="w-full max-w-[280px] sm:max-w-[320px] flex justify-center">
                  <DPNodeButton
                    node={DP_NODES[5]}
                    isActive={activeNode.id === 'dp5'}
                    isComputed={isUpward ? upwardStep < 1 : computedStep >= 8}
                    isOptimum
                    onClick={() => handleNodeClick(DP_NODES[5])}
                  />
                </div>

              </div>

              <div className="lg:col-span-5 flex flex-col space-y-4 h-full">
                
                <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex flex-col space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 font-semibold">RECURRENCE FORMULA:</span>
                    <span className="text-[10px] text-gray-400">Time: <strong className="text-white">O(N)</strong></span>
                  </div>
                  <code
                    className="font-bold text-slate-100 p-2.5 rounded border block text-[11px] sm:text-xs break-all transition-all duration-500 font-mono"
                    style={{
                      backgroundColor: `${activeNode.color}18`,
                      borderColor: `${activeNode.color}50`,
                    }}
                  >
                    {activeNode.equation}
                  </code>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeNode.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                    className="w-full p-4 sm:p-4.5 rounded-xl bg-[#030303] border flex flex-col space-y-3 shadow-xl h-fit"
                    style={{ borderColor: `${activeNode.color}50` }}
                  >
                    <div className="flex flex-col space-y-3">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full animate-ping"
                            style={{ backgroundColor: activeNode.color }}
                          />
                          <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                            INSPECTING: {activeNode.id.toUpperCase()}
                          </span>
                        </div>
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded border uppercase"
                          style={{
                            color: activeNode.color,
                            borderColor: `${activeNode.color}40`,
                            backgroundColor: `${activeNode.color}15`,
                          }}
                        >
                          {activeNode.tag}
                        </span>
                      </div>

                        <h3 className="text-base sm:text-lg font-bold font-mono flex items-center justify-between gap-2">
                          <span style={{ color: activeNode.color }}>{activeNode.label}</span>
                          <span
                            className="px-2.5 py-0.5 rounded-lg text-xs sm:text-sm font-extrabold font-mono tracking-wide border shrink-0"
                            style={{
                              color: activeNode.color,
                              borderColor: `${activeNode.color}80`,
                              backgroundColor: `${activeNode.color}25`,
                              textShadow: `0 0 6px ${activeNode.glowColor}`,
                            }}
                          >
                            {activeNode.dpValue} pts
                          </span>
                        </h3>

                      <div className="p-2.5 rounded-lg bg-black/80 border border-white/10">
                        <span className="text-[10px] text-gray-400 block mb-1 font-mono uppercase">
                          STATE EQUATION:
                        </span>
                        <code className="text-xs font-mono font-bold text-gray-200 break-all block">
                          {activeNode.equation}
                        </code>
                      </div>

                      <p className="text-xs text-gray-300 leading-relaxed font-sans">
                        {activeNode.summary}
                      </p>

                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] text-gray-400 font-mono block uppercase">
                          ACQUIRED VECTOR SKILLS:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeNode.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] px-2.5 py-0.5 rounded-md border font-mono font-bold transition-all duration-500"
                              style={{
                                color: activeNode.color,
                                backgroundColor: `${activeNode.color}18`,
                                borderColor: `${activeNode.color}40`,
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400 font-mono">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" style={{ color: activeNode.color }} />
                        <span>MEMOIZED IN MEMORY</span>
                      </span>

                      {/* Interactive State Change Controls: < STATE [index/5] > */}
                      <div className="flex items-center space-x-1 bg-black/60 px-2 py-0.5 rounded-lg border border-white/15 shadow-inner">
                        <button
                          onClick={handlePrevState}
                          title="Previous State"
                          className="p-0.5 rounded hover:bg-white/15 text-gray-300 hover:text-white transition-all cursor-pointer hover:scale-110 active:scale-95"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>

                        <span className="text-gray-200 font-bold text-[10px] tracking-wider px-1">
                          STATE [{activeNode.index}/5]
                        </span>

                        <button
                          onClick={handleNextState}
                          title="Next State"
                          className="p-0.5 rounded hover:bg-white/15 text-gray-300 hover:text-white transition-all cursor-pointer hover:scale-110 active:scale-95"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

function DPNodeButton({
  node,
  isActive,
  isComputed,
  isOptimum,
  onClick,
}: {
  node: DPStateNode;
  isActive: boolean;
  isComputed: boolean;
  isOptimum?: boolean;
  onClick: () => void;
}) {
  const Icon = node.icon;

  return (
    <button
      onClick={onClick}
      className={`w-full max-w-[340px] sm:max-w-[380px] p-2.5 sm:p-3 rounded-xl border transition-all duration-500 cursor-pointer flex items-center justify-between text-left relative overflow-hidden group ${
        isComputed
          ? isActive
            ? `bg-gradient-to-r ${node.bgGradient} ${node.borderColor} shadow-lg`
            : `bg-[#0a0a0a] ${node.borderColor} text-white hover:border-white/60`
          : 'bg-[#060606] border-white/10 text-slate-500'
      }`}
      style={{
        boxShadow: isComputed && isActive ? `0 0 16px ${node.glowColor}` : undefined,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-all duration-500 ${
            isComputed
              ? isActive ? 'bg-black/60' : 'bg-white/5 border-white/20'
              : 'bg-white/5 border-white/5'
          }`}
          style={{ borderColor: isComputed ? node.color : undefined }}
        >
          <Icon className="w-4 h-4 transition-colors duration-500" style={{ color: isComputed ? node.color : '#475569' }} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <span className={`text-[11px] font-bold font-mono tracking-wide transition-colors duration-500 ${
              isComputed ? 'text-white' : 'text-slate-500'
            }`}>
              dp[{node.index}] = {isComputed ? node.dpValue : '?'}
            </span>
            {isOptimum && isComputed && (
              <span
                className="text-[9px] font-extrabold px-1.5 py-0.2 rounded border uppercase tracking-widest animate-pulse"
                style={{
                  color: node.color,
                  backgroundColor: `${node.color}25`,
                  borderColor: `${node.color}50`,
                }}
              >
                OPTIMUM
              </span>
            )}
          </div>
          <span
            className="text-[10px] font-mono block font-bold transition-colors duration-500"
            style={{ color: isComputed ? node.color : '#475569' }}
          >
            {node.label}
          </span>
        </div>
      </div>

      <div className="flex items-center shrink-0 ml-2">
        <div className="w-12 sm:w-16 h-1.5 rounded-full bg-white/10 overflow-hidden relative block">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: isComputed ? `${node.dpValue}%` : '0%',
              backgroundColor: isComputed ? node.color : '#334155',
            }}
          />
        </div>
      </div>
    </button>
  );
}
