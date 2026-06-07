'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, TrendingUp, ShieldCheck, Cpu } from 'lucide-react';
import StockTickerTape from './StockTickerTape';
import StockTable from './StockTable';
import FooterTickerTape from './FooterTickerTape';

export default function TechnicalStockExchange() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      id="skills-stock-exchange"
      ref={sectionRef}
      className="w-full pt-6 pb-12 px-4 sm:px-8 relative bg-[#050505] flex flex-col justify-center items-center z-20"
    >
      {/* 2-COLUMN PARALLEL LAYOUT: Heading & Market Overview (Left) | Stock Exchange Table (Right) */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* LEFT COLUMN: Heading & Executive Market Overview */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-4 space-y-3 text-left"
        >
          {/* Bolder, Clean Non-Yellowish Heading Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#050505] border-2 border-white/20 hover:border-white/40 shadow-md transition-all">
            <Sparkles className="w-3 h-3 text-slate-200" />
            <span className="text-[9px] font-mono tracking-[0.2em] text-slate-200 uppercase font-extrabold">
              MARKET OVERVIEW
            </span>
          </div>

          {/* Dark White Main Heading */}
          <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-200 leading-tight">
            Tech Stock Exchange
          </h2>

          {/* Compact Glassmorphic Market Legend Card */}
          <div className="p-3 rounded-xl bg-[#050505] border border-white/15 backdrop-blur-md max-w-xs space-y-2 font-mono">
            <div className="text-[9px] uppercase tracking-widest text-slate-200 font-bold border-b border-white/10 pb-1.5 flex items-center justify-between">
              <span>MARKET LEGEND</span>
              <span className="text-gray-400">INDICATORS</span>
            </div>
            
            <div className="space-y-1.5 text-[10px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00E676] shadow-[0_0_6px_#00E676]" />
                <span className="text-[#00E676] font-bold">Green:</span>
                <span className="text-gray-400">Growing & building</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF3D57] shadow-[0_0_6px_#FF3D57]" />
                <span className="text-[#FF3D57] font-bold">Red:</span>
                <span className="text-gray-400">Proficient, less focused</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
                <span className="text-slate-200 font-bold">White:</span>
                <span className="text-gray-400">Steady periodic usage</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Pure Dark Black Stock Market Dashboard Table (Parallel) */}
        <motion.div 
          className="lg:col-span-8 w-full h-[520px] rounded-2xl border border-white/15 flex flex-col relative z-10 overflow-hidden shadow-2xl shadow-black/80"
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        >
          <div className="w-full h-full flex flex-col bg-[#050505] backdrop-blur-sm">
            {/* Top Ticker Tape */}
            <StockTickerTape />
            
            {/* Main Table */}
            <div className="flex-1 flex overflow-hidden">
              <StockTable />
            </div>

            {/* Bottom Ticker Tape */}
            <FooterTickerTape />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
