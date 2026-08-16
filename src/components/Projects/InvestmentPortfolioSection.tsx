'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { PROJECT_ASSETS, ProjectAsset } from './ProjectData';
import ProjectTable from './ProjectTable';
import ProjectModal from './ProjectModal';

export default function InvestmentPortfolioSection() {
  const [selectedAsset, setSelectedAsset] = useState<ProjectAsset | null>(null);

  return (
    <section
      id="projects-portfolio"
      className="w-full min-h-[85vh] pt-14 pb-28 px-4 sm:px-8 relative bg-[#050505] flex flex-col justify-center items-center z-40"
    >
      {/* 2-COLUMN PARALLEL LAYOUT: Heading & Overview (Left) | Project Stock Exchange Table (Right) */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* LEFT COLUMN: Heading & Executive Overview */}
        <motion.div
          initial={{ opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-4 space-y-3 text-left"
        >
          {/* Bolder, Clean Non-Yellowish Heading Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#050505] border-2 border-white/20 hover:border-white/40 shadow-md transition-all">
            <Sparkles className="w-3.5 h-3.5 text-slate-200" />
            <span className="text-[10px] font-mono tracking-[0.2em] text-slate-200 uppercase font-extrabold">
              INVESTMENT PORTFOLIO
            </span>
          </div>

          {/* Dark White Main Heading */}
          <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-200 leading-tight">
            Digital Asset Exchange
          </h2>

          {/* Compact Glassmorphic Market Legend Card */}
          <div className="p-4 rounded-xl bg-[#050505] border border-white/15 max-w-xs space-y-3 font-mono shadow-xl">
            <div className="text-[10px] uppercase tracking-widest font-bold border-b border-white/10 pb-2 flex items-center justify-between">
              <span className="text-slate-200">MARKET LEGEND</span>
              <span className="text-gray-400">INDICATORS</span>
            </div>
            
            <div className="space-y-2 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00E676] shadow-[0_0_6px_#00E676]" />
                <span className="text-[#00E676] font-bold">Green:</span>
                <span className="text-gray-400">Active & Deployed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF3D57] shadow-[0_0_6px_#FF3D57]" />
                <span className="text-[#FF3D57] font-bold">Red:</span>
                <span className="text-gray-400">Under Construction</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
                <span className="text-slate-200 font-bold">White:</span>
                <span className="text-gray-400">Future Vision</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Pure Dark Black Project Stock Market Dashboard Table (Parallel) */}
        <motion.div
          className="lg:col-span-8 w-full flex flex-col relative z-10 overflow-hidden shadow-2xl shadow-black/80 bg-[#050505] rounded-2xl border border-white/15"
          initial={{ opacity: 1, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Main Table Container */}
          <div className="w-full flex flex-col">
            <ProjectTable onSelect={(selected) => setSelectedAsset(selected)} />
          </div>
        </motion.div>

      </div>

      {/* Modal Popup View for Selected Project Asset */}
      <ProjectModal asset={selectedAsset} onClose={() => setSelectedAsset(null)} />
    </section>
  );
}
