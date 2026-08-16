export interface ProjectAsset {
  id: string;
  assetNumber: string;
  name: string;
  subtitle: string;
  sector: string;
  status: 'ACTIVE' | 'UNDER CONSTRUCTION' | 'FUTURE VISION';
  marketSignal: string;
  technologies: string[];
  sparklineData: number[];
  tagline: string;
  executiveSummary: string;
  problemStatement: string;
  solution: string;
  architecture: string;
  challenges: string;
  impact: string[];
  githubUrl?: string;
  demoUrl?: string;
  image?: string;
  color: string;
  glowColor: string;
  borderColor: string;
  bgGradient: string;
}

export const PROJECT_ASSETS: ProjectAsset[] = [
  // ASSET // 01: LinkLift
  {
    id: 'link-lift',
    assetNumber: 'ASSET // 01',
    name: 'LinkLift Platform',
    subtitle: 'Resume to Portfolio & AI Career OS',
    sector: 'AI SaaS / RAG',
    status: 'ACTIVE',
    marketSignal: '↗ ACTIVE',
    technologies: ['Next.js', 'Python', 'AI / RAG', 'PostgreSQL', 'Tailwind CSS'],
    sparklineData: [10, 16, 26, 42, 64, 88, 110],
    tagline: 'Transforms resumes into deployed portfolios, AI cover letters & career insights.',
    executiveSummary:
      'Automates portfolio creation and career collateral by parsing resumes into live web subdomains and tailored application documents.',
    problemStatement:
      'Job seekers waste dozens of manual hours formatting portfolios and tailoring application documents for distinct roles.',
    solution:
      'Autonomous AI engine parsing PDF resumes to deploy custom subdomains, tailored cover letters, and deep ATS insights.',
    architecture:
      'Next.js 15 App Router paired with Python FastAPI microservices and PostgreSQL edge infrastructure.',
    challenges:
      'Optimizing PDF parsing extraction accuracy and zero-latency live portfolio code generation.',
    impact: [
      'Instant subdomain portfolio deployment',
      'AI cover letter & resume insights engine',
      'Automated job matching system (under dev)'
    ],
    githubUrl: 'https://github.com/mahipbansal/LinkLift',
    demoUrl: 'https://link-lift.vercel.app',
    color: '#00E5FF',
    glowColor: 'rgba(0, 229, 255, 0.45)',
    borderColor: 'border-cyan-400/40',
    bgGradient: 'from-cyan-950/50 via-slate-900/40 to-slate-950/80',
  },

  // ASSET // 02: Nova
  {
    id: 'nova-os',
    assetNumber: 'ASSET // 02',
    name: 'Nova',
    subtitle: 'All-in-One Executive Assistant OS',
    sector: 'Executive Productivity OS',
    status: 'ACTIVE',
    marketSignal: '↗ ACTIVE',
    technologies: ['Next.js 15', 'TypeScript', 'Node.js', 'PostgreSQL', 'AI Agents', 'WebSockets', 'Tailwind CSS'],
    sparklineData: [12, 24, 45, 68, 92, 120],
    tagline: 'Unified executive workspace managing notes, tasks, health, finance, emails & goals.',
    executiveSummary:
      'Consolidates 7 daily productivity modules into a single intelligent dashboard to eliminate context-switching friction.',
    problemStatement:
      'Executives waste up to 2 hours daily context-switching across fragmented tools for notes, tasks, finance, and email.',
    solution:
      'Integrated workspace with real-time WebSocket feeds, background AI triage workers, and unified state management.',
    architecture:
      'Next.js 15 App Router, TypeScript, PostgreSQL state layer, WebSockets event bus, and AI triage workers.',
    challenges:
      'Synthesizing 7 complex modules into a zero-clutter workspace with sub-50ms tab switching.',
    impact: [
      '7-in-1 consolidated executive workspace',
      'Automated AI email & task triage engine',
      'Real-time telemetry for finance & health goals'
    ],
    githubUrl: 'https://github.com/mahipbansal/Nova',
    demoUrl: 'https://nova-os-mahip.vercel.app/',
    color: '#FFB800',
    glowColor: 'rgba(255, 184, 0, 0.45)',
    borderColor: 'border-amber-400/40',
    bgGradient: 'from-amber-950/50 via-slate-900/40 to-slate-950/80',
  },

  // ASSET // 03: JARVIS
  {
    id: 'jarvis',
    assetNumber: 'ASSET // 03',
    name: 'JARVIS AI Assistant',
    subtitle: 'Autonomous Voice & System Assistant',
    sector: 'Autonomous AI',
    status: 'ACTIVE',
    marketSignal: '↗ ACTIVE',
    technologies: ['Python', 'LLMs', 'PyTorch', 'FastAPI', 'LangChain', 'WebSockets'],
    sparklineData: [15, 32, 60, 95, 135, 180],
    tagline: 'Multi-modal AI assistant executing system tasks, desktop automation & voice commands.',
    executiveSummary:
      'Stateful LLM agent framework built for automated task execution, system control, and self-correcting workflows.',
    problemStatement:
      'Standard LLMs lack persistent memory, real-time system interaction, and multi-turn execution tools.',
    solution:
      'Event-driven agent with tool execution, short/long-term memory buffer, voice interface, and dynamic self-reflection.',
    architecture:
      'Python microservice with PyTorch embeddings, WebSockets streaming, LangChain agents, and sandboxed execution.',
    challenges:
      'Preventing context window degradation and managing multi-turn agent hallucinations during autonomous execution loops.',
    impact: [
      '88% autonomous task completion rate',
      '< 1.2s rapid tool-execution response',
      'Integrated with 25+ external developer APIs'
    ],
    githubUrl: 'https://github.com/mahipbansal/Jarvis-Personal-Assistant-Bot',
    color: '#00FF9D',
    glowColor: 'rgba(0, 255, 157, 0.45)',
    borderColor: 'border-emerald-400/40',
    bgGradient: 'from-emerald-950/50 via-slate-900/40 to-slate-950/80',
  },

  // ASSET // 04: Future Project 01
  {
    id: 'future-project-1',
    assetNumber: 'ASSET // 04',
    name: 'Future Project // 01',
    subtitle: 'Stealth AI Infrastructure',
    sector: 'Next-Gen AI R&D',
    status: 'FUTURE VISION',
    marketSignal: '→ PLANNED',
    technologies: ['AI Architecture', 'R&D Modeling', 'System Design'],
    sparklineData: [10, 10, 10, 10, 10, 10],
    tagline: 'Next-gen hybrid local/cloud multi-agent orchestration architecture.',
    executiveSummary:
      'Exploring local-first hybrid model routing to achieve zero-latency multi-agent reasoning cycles.',
    problemStatement:
      'High cloud API latencies and token costs bottleneck multi-step autonomous agent workflows.',
    solution:
      'Routing queries between quantized local SLMs for instant execution and cloud LLMs for complex reasoning.',
    architecture:
      'Rust local execution daemons paired with WebSockets event telemetry.',
    challenges:
      'Optimizing dynamic token routing thresholds between edge and cloud LLM models.',
    impact: [
      'Targeting sub-20ms local routing decisions',
      'Zero-cloud fallback execution mode',
      'Hybrid local SLM + cloud LLM pipeline'
    ],
    color: '#E086FF',
    glowColor: 'rgba(224, 134, 255, 0.45)',
    borderColor: 'border-purple-400/40',
    bgGradient: 'from-purple-950/50 via-slate-900/40 to-slate-950/80',
  },

  // ASSET // 05: Future Project 02
  {
    id: 'future-project-2',
    assetNumber: 'ASSET // 05',
    name: 'Future Project // 02',
    subtitle: 'Autonomous Systems Protocol',
    sector: 'Distributed Systems',
    status: 'FUTURE VISION',
    marketSignal: '→ PLANNED',
    technologies: ['C++', 'Distributed IPC', 'Quant & AI'],
    sparklineData: [10, 10, 10, 10, 10, 10],
    tagline: 'Ultra-low latency inter-process communication protocol.',
    executiveSummary:
      'Research protocol building shared-memory IPC ring buffers for real-time neural inference kernels.',
    problemStatement:
      'Traditional IPC messaging creates severe latency bottlenecks during high-frequency data bursts.',
    solution:
      'C++ lock-free shared memory queues for zero-copy message passing between system modules.',
    architecture:
      'C++20 shared-memory kernel with lockless queue buffers.',
    challenges:
      'Eliminating CPU thread contention during high-frequency volatility spikes.',
    impact: [
      'Microsecond IPC message passing latency',
      'Lock-free zero-copy data architecture',
      'Designed for high-frequency neural inference'
    ],
    color: '#FF4365',
    glowColor: 'rgba(255, 67, 101, 0.45)',
    borderColor: 'border-rose-500/40',
    bgGradient: 'from-rose-950/50 via-slate-900/40 to-slate-950/80',
  }
];




