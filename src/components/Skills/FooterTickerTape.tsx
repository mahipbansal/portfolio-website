'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SkillLogo from './SkillLogo';

const footerSkills = [
  { symbol: 'POSTGRES', name: 'PostgreSQL' },
  { symbol: 'MONGO', name: 'MongoDB' },
  { symbol: 'TAILWIND', name: 'Tailwind CSS' },
  { symbol: 'DOCKER', name: 'Docker' },
  { symbol: 'RAG', name: 'RAG Architecture' },
  { symbol: 'ML', name: 'Machine Learning' },
  { symbol: 'VERCEL', name: 'Vercel' },
  { symbol: 'GIT', name: 'Git & GitHub' },
  { symbol: 'EXPRESS', name: 'Express.js' },
  { symbol: 'SQL', name: 'SQL' },
  { symbol: 'BOOTSTRAP', name: 'Bootstrap' },
  { symbol: 'POSTMAN', name: 'Postman' },
];

export default function FooterTickerTape() {
  return (
    <div className="w-full bg-[#0a0a0a] border-t border-[#D4AF37]/20 py-2.5 overflow-hidden flex items-center">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["-50%", "0%"] }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          ease: 'linear',
          duration: 42,
        }}
      >
        {/* Duplicated list for 100% seamless continuous loop in reverse direction */}
        {[...footerSkills, ...footerSkills].map((item, idx) => (
          <div key={idx} className="flex items-center space-x-3 mx-8 font-mono text-sm shrink-0">
            <SkillLogo ticker={item.symbol} className="w-6 h-6 shrink-0" />
            <span className="text-white font-bold tracking-wider">{item.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
