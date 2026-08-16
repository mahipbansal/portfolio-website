'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SkillLogo from './SkillLogo';

const tickers = [
  { symbol: 'PY', name: 'Python' },
  { symbol: 'CPP', name: 'C++' },
  { symbol: 'AI', name: 'Artificial Intelligence' },
  { symbol: 'NEXT', name: 'Next.js' },
  { symbol: 'REACT', name: 'React' },
  { symbol: 'TS', name: 'TypeScript' },
  { symbol: 'DSA', name: 'Data Structures' },
  { symbol: 'NODE', name: 'Node.js' },
  { symbol: 'HTML', name: 'HTML5' },
  { symbol: 'CSS', name: 'CSS3' },
  { symbol: 'TAILWIND', name: 'Tailwind CSS' },
  { symbol: 'POSTGRES', name: 'PostgreSQL' },
];

export default function StockTickerTape() {
  return (
    <div className="w-full bg-[#0a0a0a] border-b border-[#D4AF37]/20 py-2.5 overflow-hidden flex items-center">
      <motion.div
        className="flex whitespace-nowrap will-change-transform transform-gpu"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: 'linear',
          duration: 38,
        }}
      >
        {/* Duplicated list for 100% seamless continuous loop */}
        {[...tickers, ...tickers].map((ticker, idx) => (
          <div key={idx} className="flex items-center space-x-3 mx-8 font-mono text-sm shrink-0">
            <SkillLogo ticker={ticker.symbol} className="w-6 h-6 shrink-0" />
            <span className="text-white font-bold tracking-wider">{ticker.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
