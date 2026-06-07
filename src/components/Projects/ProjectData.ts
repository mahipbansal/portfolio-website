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
    tagline: 'Resume to portfolio generator — AI resumes, cover letters, resume insights, live portfolio deployment & jobs matching (in dev).',
    executiveSummary:
      'LinkLift transforms resumes into live deployed portfolios, generates AI-tailored resumes, cover letters, and deep resume insights. Integrated AI jobs matching engine currently under development.',
    problemStatement:
      'Job seekers waste hours manually building portfolios, writing custom cover letters, and formatting resumes for distinct job roles.',
    solution:
      'Engineered an autonomous AI engine that parses resume PDFs, generates custom portfolios deployed directly to web subdomains, and creates AI cover letters and resume insights.',
    architecture:
      'Next.js 15 App Router frontend paired with a Python FastAPI microservice architecture backed by PostgreSQL database and Vercel edge deployment.',
    challenges:
      'Optimizing PDF parsing extraction accuracy and zero-latency live portfolio code generation.',
    impact: [
      'Instant live portfolio deployment',
      'AI cover letter & resume insights generation',
      'Integrated jobs matching engine (under dev)'
    ],
    githubUrl: 'https://github.com/mahipbansal/LinkLift',
    demoUrl: 'https://link-lift.vercel.app'
  },

  // ASSET // 02: PA Roxxx OS
  {
    id: 'nova-os',
    assetNumber: 'ASSET // 02',
    name: 'PA Roxxx OS (Nova)',
    subtitle: 'All-in-One Executive Assistant OS',
    sector: 'Executive Productivity OS',
    status: 'ACTIVE',
    marketSignal: '↗ ACTIVE',
    technologies: ['Next.js 15', 'TypeScript', 'Node.js', 'PostgreSQL', 'AI Agents', 'WebSockets', 'Tailwind CSS'],
    sparklineData: [12, 24, 45, 68, 92, 120],
    tagline: 'All-in-one personal assistant platform managing notes, tasks, health, finance, emails, projects & personal goals.',
    executiveSummary:
      'PA Roxxx OS is a unified executive operating system that eliminates app-switching friction by consolidating daily notes, task queues, health metrics, financial portfolios, AI email triage, project milestones, and personal goals into a single intelligent dashboard.',
    problemStatement:
      'Executives and power creators waste up to 2 hours daily context-switching across 7+ fragmented tools for notes, finance tracking, health logs, email triage, and goal management.',
    solution:
      'Engineered an all-in-one personal assistant platform with background AI triage workers, unified PostgreSQL state management, live WebSocket telemetry, and automated task priorities.',
    architecture:
      'Next.js 15 App Router with TypeScript frontend, PostgreSQL user data store, real-time WebSocket event bus for finance/health feeds, and background AI workers for inbox & task triage.',
    challenges:
      'Synthesizing 7 complex domain modules (Notes, Finance, Health, Email, Tasks, Projects, Goals) into a single zero-clutter executive workspace with sub-50ms tab switching.',
    impact: [
      '7-in-1 consolidated executive operating system workspace',
      'Automated real-time email & task AI triage engine',
      'Unified live tracking for finance, health & personal goals'
    ],
    githubUrl: 'https://github.com/mahipbansal/Nova',
    demoUrl: 'https://nova-os-mahip.vercel.app/'
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
    tagline: 'Autonomous multi-modal AI voice assistant capable of multi-step task execution & desktop automation.',
    executiveSummary:
      'JARVIS is an advanced stateful LLM agent framework designed for automated code generation, complex environment control, voice commands, and self-correcting workflow execution loops.',
    problemStatement:
      'Standard conversational AI models lack persistent memory state and active tool-execution capabilities in real-time developer workflows.',
    solution:
      'Built a stateful agentic system equipped with tool-calling capabilities, short/long-term memory buffer, voice interaction, and dynamic self-reflection loops.',
    architecture:
      'Event-driven Python architecture utilizing LangChain, custom PyTorch embeddings, WebSockets stream synchronization, and Docker sandbox execution containers.',
    challenges:
      'Preventing context window degradation and managing multi-turn agent hallucinations during autonomous execution loops.',
    impact: [
      '88% task completion rate without human intervention',
      '< 1.2s response time for tool execution',
      'Integrated with 25+ external APIs'
    ],
    githubUrl: 'https://github.com/mahipbansal/Jarvis-Personal-Assistant-Bot'
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
    tagline: '',
    executiveSummary:
      'A stealth R&D initiative exploring novel multi-agent orchestration architectures and local zero-latency vector execution engines.',
    problemStatement:
      'Current multi-agent frameworks incur high cloud API latencies and token costs during autonomous multi-step reasoning cycles.',
    solution:
      'Designing a local-first hybrid model routing architecture combining quantized local SLMs with high-capacity cloud LLMs.',
    architecture:
      'Conceptual architecture combining Rust local execution daemons with event-driven WebSockets telemetry.',
    challenges:
      'Optimizing dynamic token routing thresholds between edge and cloud LLM models.',
    impact: [
      'In initial R&D conceptual architecture phase',
      'Targeting sub-20ms local routing decisions',
      'Zero-cloud fallback execution mode'
    ]
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
    tagline: '',
    executiveSummary:
      'An exploratory research protocol focused on ultra-low latency inter-process communication for autonomous trading kernels.',
    problemStatement:
      'Traditional IPC messaging bottlenecks during microsecond-level market tick bursts.',
    solution:
      'Building shared memory IPC ring buffers in C++ for zero-copy message passing between neural inference modules.',
    architecture:
      'C++ 20 shared memory execution kernel with lock-free lockless queues.',
    challenges:
      'Eliminating CPU thread contention during high-frequency volatility spikes.',
    impact: [
      'In early research & design phase',
      'Targeting microsecond IPC latency',
      'Lockless shared-memory data pipeline'
    ]
  }
];
