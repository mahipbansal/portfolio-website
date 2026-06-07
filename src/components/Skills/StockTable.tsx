'use client';

import React from 'react';
import StockRow from './StockRow';

// Temporally synchronized skill dataset across 6 career time steps [t1, t2, t3, t4, t5, t6]:
// t1: C++/DSA Foundation -> t2: Frontend Core -> t3: Node/Database Era -> t4: TypeScript & Next.js -> t5: AI/RAG Surge -> t6: Present Baseline
const skillsData = [
  // 1. Core Languages & Foundations
  // C++ & DSA: Directly connected because DSA is done in C++
  { ticker: 'CPP', company: 'C++', price: '', change: '', isPositive: true, trendData: [10, 48, 28, 22, 58, 58] },
  { ticker: 'PY', company: 'Python', price: '', change: '', isPositive: true, trendData: [12, 18, 15, 38, 78, 78] },
  { ticker: 'DSA', company: 'Data Structures & Algo', price: '', change: '', isPositive: true, trendData: [10, 48, 28, 22, 58, 58] },

  // 2. Web & Frontend Foundations
  // HTML5: Mastered early in t1-t2 (green), steady foundation in t2-t6 (white)
  { ticker: 'HTML', company: 'HTML5', price: '', change: '', isPositive: true, trendData: [10, 40, 40, 40, 40, 40] },
  // CSS3: Learned early in t1-t2 (green), shifted to Tailwind in t3-t4 (red), custom keyframe usage (white)
  { ticker: 'CSS', company: 'CSS3', price: '', change: '', isPositive: true, trendData: [10, 36, 36, 24, 24, 24] },
  // JS: Web surge in t1-t3 (green), typing shift to TS in t3-t4 (red), Node/React runtime surge in t4-t5 (green), active (white)
  { ticker: 'JS', company: 'JavaScript', price: '', change: '', isPositive: true, trendData: [10, 32, 48, 26, 52, 52] },
  // Tailwind: Replaced Bootstrap in t2-t5 (green), primary styling stack (white)
  { ticker: 'TAILWIND', company: 'Tailwind CSS', price: '', change: '', isPositive: true, trendData: [10, 10, 32, 58, 86, 86] },
  // Bootstrap: Early usage in t1-t2 (green), replaced by Tailwind in t3-t5 (red), legacy maintenance (white)
  { ticker: 'BOOTSTRAP', company: 'Bootstrap', price: '', change: '', isPositive: true, trendData: [10, 38, 38, 18, 12, 12] },
  // TS: Replaced plain JS in t2-t5 (green), primary language (white)
  { ticker: 'TS', company: 'TypeScript', price: '', change: '', isPositive: true, trendData: [10, 10, 22, 54, 92, 92] },

  // 3. Modern Frontend Frameworks
  // React: Component architecture surge in t2-t5 (green), active frontend core (white)
  { ticker: 'REACT', company: 'React', price: '', change: '', isPositive: true, trendData: [10, 15, 38, 68, 98, 98] },
  // Next.js: App Router & SSR production surge in t2-t5 (green), primary framework (white)
  { ticker: 'NEXT', company: 'Next.js', price: '', change: '', isPositive: true, trendData: [8, 8, 22, 58, 115, 115] },

  // 4. Backend & Databases
  // Node.js: Backend API building surge in t2-t5 (green), active server stack (white)
  { ticker: 'NODE', company: 'Node.js', price: '', change: '', isPositive: true, trendData: [10, 12, 36, 56, 76, 76] },
  // Express.js: Early Node framework surge in t1-t3 (green), shifted to Next.js API routes & FastAPI in t3-t4 (red), active (white)
  { ticker: 'EXPRESS', company: 'Express.js', price: '', change: '', isPositive: true, trendData: [10, 12, 42, 24, 24, 24] },
  // PostgreSQL: Primary relational database surge in t2-t5 (green), active database (white)
  { ticker: 'POSTGRES', company: 'PostgreSQL', price: '', change: '', isPositive: true, trendData: [10, 10, 24, 58, 88, 88] },
  // MongoDB: Early NoSQL surge in t1-t3 (green), shifted to Postgres in t3-t4 (red), document store maintenance (white)
  { ticker: 'MONGO', company: 'MongoDB', price: '', change: '', isPositive: true, trendData: [10, 12, 44, 24, 24, 24] },
  // SQL: Database query language surge in t2-t4 (green), steady baseline in t4-t6 (white)
  { ticker: 'SQL', company: 'SQL', price: '', change: '', isPositive: true, trendData: [10, 10, 36, 48, 48, 48] },

  // 5. AI / ML
  // AI: Exponential surge in LLMs & agentic workflows in t3-t5 (green), active domain (white)
  { ticker: 'AI', company: 'Artificial Intelligence', price: '', change: '', isPositive: true, trendData: [6, 6, 14, 48, 118, 118] },
  // ML: PyTorch training surge in t2-t4 (green), LLM pivot dip in t4-t5 (red), fine-tuning (green), active (white)
  { ticker: 'ML', company: 'Machine Learning', price: '', change: '', isPositive: true, trendData: [8, 8, 22, 54, 40, 80, 80] },
  // DL: Neural network surge in t2-t5 (green), active domain (white)
  { ticker: 'DL', company: 'Deep Learning', price: '', change: '', isPositive: true, trendData: [8, 8, 18, 46, 82, 82] },
  // RAG: Vector database & RAG platform surge in t3-t5 (green), active domain (white)
  { ticker: 'RAG', company: 'Retrieval Augmented Gen', price: '', change: '', isPositive: true, trendData: [4, 4, 8, 42, 125, 125] },

  // 6. Tools & DevOps
  // Docker: Containerization surge in t2-t4 (green), steady DevOps tool in t4-t6 (white)
  { ticker: 'DOCKER', company: 'Docker', price: '', change: '', isPositive: true, trendData: [10, 10, 24, 46, 46, 46] },
  // Git: Learned early in t1-t2 (green), steady workflow in t2-t6 (white)
  { ticker: 'GIT', company: 'Git', price: '', change: '', isPositive: true, trendData: [12, 34, 34, 34, 34, 34] },
  // GitHub: Code hosting & deployment surge in t1-t3 (green), steady platform in t3-t6 (white)
  { ticker: 'GITHUB', company: 'GitHub', price: '', change: '', isPositive: true, trendData: [10, 36, 42, 42, 42, 42] },
  // Postman: API testing surge in t1-t3 (green), steady developer tool in t3-t6 (white)
  { ticker: 'POSTMAN', company: 'Postman', price: '', change: '', isPositive: true, trendData: [10, 12, 32, 32, 32, 32] },
  // Vercel: Deployment platform surge in t2-t4 (green), steady deployment tool in t4-t6 (white)
  { ticker: 'VERCEL', company: 'Vercel', price: '', change: '', isPositive: true, trendData: [8, 8, 24, 52, 52, 52] },
];

export default function StockTable() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-3 gap-4 p-4 text-[10px] text-gray-300 uppercase tracking-widest font-mono font-semibold border-b border-[#D4AF37]/20">
        <div>Ticker</div>
        <div>Skill</div>
        <div className="text-center">Trend</div>
      </div>

      {/* Table Body - Scrollable Container */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden max-h-[420px] p-1 pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {skillsData.map((skill, idx) => (
          <StockRow
            key={skill.ticker}
            ticker={skill.ticker}
            company={skill.company}
            price={skill.price}
            change={skill.change}
            isPositive={skill.isPositive}
            trendData={skill.trendData}
            delay={idx * 0.05}
          />
        ))}
      </div>
    </div>
  );
}
