'use client';

import React, { useState } from 'react';
import {
  Brain,
  Box,
  Cpu,
  Database,
  Layers,
  Sparkles,
  Code2,
  Terminal,
  Server,
  GitBranch,
  Container,
  Flame,
  Binary,
  Workflow,
} from 'lucide-react';

interface SkillLogoProps {
  ticker: string;
  className?: string;
}

const LOGO_CONFIG: Record<
  string,
  { url?: string; icon: React.ElementType; color: string; bg: string; invertInDark?: boolean }
> = {
  // 1. Core Languages & Foundations
  CPP: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
    icon: Binary,
    color: '#00599C',
    bg: 'rgba(0, 89, 156, 0.15)',
  },
  PY: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    icon: Terminal,
    color: '#3776AB',
    bg: 'rgba(55, 118, 171, 0.15)',
  },
  DSA: {
    url: 'https://api.iconify.design/carbon:data-structured.svg?color=%2300E676',
    icon: Workflow,
    color: '#00E676',
    bg: 'rgba(0, 230, 118, 0.15)',
  },

  // 2. Web & Frontend Foundations
  HTML: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    icon: Code2,
    color: '#E34F26',
    bg: 'rgba(227, 79, 38, 0.15)',
  },
  CSS: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    icon: Code2,
    color: '#1572B6',
    bg: 'rgba(21, 114, 182, 0.15)',
  },
  JS: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    icon: Code2,
    color: '#F7DF1E',
    bg: 'rgba(247, 223, 30, 0.15)',
  },
  TAILWIND: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    icon: Code2,
    color: '#06B6D4',
    bg: 'rgba(6, 182, 212, 0.15)',
  },
  BOOTSTRAP: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
    icon: Code2,
    color: '#7952B3',
    bg: 'rgba(121, 82, 179, 0.15)',
  },
  TS: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    icon: Code2,
    color: '#3178C6',
    bg: 'rgba(49, 120, 198, 0.15)',
  },

  // 3. Modern Frontend Frameworks
  REACT: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    icon: Code2,
    color: '#61DAFB',
    bg: 'rgba(97, 218, 251, 0.15)',
  },
  NEXT: {
    url: 'https://api.iconify.design/simple-icons:nextdotjs.svg?color=%23FFFFFF',
    icon: Code2,
    color: '#FFFFFF',
    bg: 'rgba(255, 255, 255, 0.15)',
  },

  // 4. Backend & Databases
  NODE: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    icon: Server,
    color: '#5FA04E',
    bg: 'rgba(95, 160, 78, 0.15)',
  },
  EXPRESS: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
    icon: Server,
    color: '#FFFFFF',
    bg: 'rgba(255, 255, 255, 0.15)',
    invertInDark: true,
  },
  POSTGRES: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    icon: Database,
    color: '#4169E1',
    bg: 'rgba(65, 105, 225, 0.15)',
  },
  MONGO: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    icon: Database,
    color: '#47A248',
    bg: 'rgba(71, 162, 72, 0.15)',
  },
  SQL: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azuresqldatabase/azuresqldatabase-original.svg',
    icon: Database,
    color: '#0078D4',
    bg: 'rgba(0, 120, 212, 0.15)',
  },

  // 5. AI / ML
  AI: {
    url: 'https://api.iconify.design/simple-icons:openai.svg?color=%23D4AF37',
    icon: Sparkles,
    color: '#D4AF37',
    bg: 'rgba(212, 175, 55, 0.15)',
  },
  ML: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    icon: Cpu,
    color: '#FF6F00',
    bg: 'rgba(255, 111, 0, 0.15)',
  },
  DL: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
    icon: Layers,
    color: '#EE4C2C',
    bg: 'rgba(238, 76, 44, 0.15)',
  },
  RAG: {
    url: 'https://api.iconify.design/simple-icons:langchain.svg?color=%23F59E0B',
    icon: Brain,
    color: '#F59E0B',
    bg: 'rgba(245, 158, 11, 0.15)',
  },

  // 6. Tools & DevOps
  DOCKER: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    icon: Container,
    color: '#2496ED',
    bg: 'rgba(36, 150, 237, 0.15)',
  },
  GIT: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    icon: GitBranch,
    color: '#F05032',
    bg: 'rgba(240, 80, 50, 0.15)',
  },
  GITHUB: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    icon: GitBranch,
    color: '#FFFFFF',
    bg: 'rgba(255, 255, 255, 0.15)',
    invertInDark: true,
  },
  POSTMAN: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg',
    icon: Server,
    color: '#FF6C37',
    bg: 'rgba(255, 108, 55, 0.15)',
  },
  VERCEL: {
    url: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
    icon: Code2,
    color: '#FFFFFF',
    bg: 'rgba(255, 255, 255, 0.15)',
    invertInDark: true,
  },
};

export default function SkillLogo({ ticker, className = 'w-6 h-6' }: SkillLogoProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const config = LOGO_CONFIG[ticker] || {
    icon: Code2,
    color: '#D4AF37',
    bg: 'rgba(212, 175, 55, 0.15)',
  };

  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110 ${className}`}>
      {config.url && !imgFailed ? (
        <img
          src={config.url}
          alt={`${ticker} logo`}
          className={`w-full h-full object-contain ${config.invertInDark ? 'brightness-0 invert' : ''}`}
          onError={() => setImgFailed(true)}
          loading="lazy"
        />
      ) : (
        <Icon className="w-full h-full" style={{ color: config.color }} />
      )}
    </div>
  );
}
