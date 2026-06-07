'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Sparkline from './Sparkline';
import SkillLogo from './SkillLogo';

interface StockRowProps {
  ticker: string;
  company: string;
  price: string;
  change: string;
  isPositive: boolean;
  trendData: number[];
  delay: number;
}

export default function StockRow({
  ticker,
  company,
  price,
  change,
  isPositive,
  trendData,
  delay
}: StockRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const colorClass = isPositive ? 'text-[#00E676]' : 'text-[#FF3D57]';
  const hexColor = isPositive ? '#00E676' : '#FF3D57';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative group border-b border-[#222] hover:border-[#D4AF37]/50 transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`grid grid-cols-3 gap-4 py-3.5 px-4 items-center transition-colors duration-300 ${isHovered ? 'bg-[#D4AF37]/5' : ''}`}>
        <div className="flex items-center gap-3 font-mono font-bold text-white text-sm tracking-wider min-w-0">
          <SkillLogo ticker={ticker} className="w-7 h-7 shrink-0" />
          <span className="truncate">{ticker}</span>
        </div>
        <div className="text-gray-300 text-sm font-medium truncate">{company}</div>
        <div className="flex justify-center">
          <Sparkline data={trendData} color={hexColor} />
        </div>
      </div>
    </motion.div>
  );
}
