'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectAsset } from './ProjectData';
import { X, ExternalLink, ShieldCheck, TrendingUp, Layers, Cpu, Award } from 'lucide-react';

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

interface ProjectModalProps {
  asset: ProjectAsset | null;
  onClose: () => void;
}

export default function ProjectModal({ asset, onClose }: ProjectModalProps) {
  useEffect(() => {
    const header = document.querySelector('header');
    if (asset) {
      if (header) header.style.display = 'none';
      document.body.style.overflow = 'hidden';
    } else {
      if (header) header.style.display = '';
      document.body.style.overflow = '';
    }
    
    return () => {
      if (header) header.style.display = '';
      document.body.style.overflow = '';
    };
  }, [asset]);

  if (!asset) return null;

  const isActive = asset.status === 'ACTIVE';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70"
          onClick={onClose}
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0a0d14] border border-[#D4AF37]/30 rounded-2xl shadow-2xl z-10 text-white p-5 sm:p-7 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {/* Header Bar */}
          <div className="relative border-b border-[#D4AF37]/20 pb-5">
            <button
              onClick={onClose}
              className="absolute top-0 right-0 p-2 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors z-10 border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col lg:flex-row justify-between items-start gap-6 pr-12">
              {/* Left Column: Title and Actions */}
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center space-x-3">
                  <span className="text-[#D4AF37] font-mono text-xs tracking-widest uppercase font-bold">
                    {asset.assetNumber}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    isActive
                      ? 'bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/30'
                      : 'bg-[#FF3D57]/15 text-[#FF3D57] border border-[#FF3D57]/30'
                  }`}>
                    {asset.status}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                  {asset.name}
                </h2>
                <p className="text-gray-300 text-xs sm:text-sm font-mono leading-relaxed">{asset.tagline}</p>
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-3 pt-3">
                  {asset.githubUrl && (
                    <a
                      href={asset.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-white/15 text-white font-mono text-xs font-semibold transition-all hover:scale-[1.02]"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>GitHub Code</span>
                    </a>
                  )}

                  {asset.demoUrl && (
                    <a
                      href={asset.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B38F2D] hover:from-[#E5C148] hover:to-[#C4A03E] text-black font-mono text-xs font-bold transition-all hover:scale-[1.02] shadow-lg shadow-[#D4AF37]/20"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Clean Metadata Cards */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-[#05070c] border border-[#D4AF37]/20 w-full lg:w-auto shrink-0 font-mono text-xs">
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-medium">Domain / Sector</span>
                  <p className="font-bold text-white text-xs">{asset.sector}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-medium">Market Signal</span>
                  <p className="font-bold text-[#00E676] text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
                    {asset.marketSignal}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Core Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Executive Summary & Problem & Solution */}
            <div className="space-y-5">
              <div className="space-y-1.5">
                <h3 className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider flex items-center gap-2 font-bold">
                  <Award className="w-4 h-4 text-[#D4AF37]" /> Executive Overview
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm font-mono leading-relaxed">{asset.executiveSummary}</p>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xs font-mono text-[#FF3D57] uppercase tracking-wider flex items-center gap-2 font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#FF3D57]" /> Problem Statement
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm font-mono leading-relaxed">{asset.problemStatement}</p>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xs font-mono text-[#00E676] uppercase tracking-wider flex items-center gap-2 font-bold">
                  <TrendingUp className="w-4 h-4 text-[#00E676]" /> Architectural Solution
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm font-mono leading-relaxed">{asset.solution}</p>
              </div>
            </div>

            {/* Right Column: Architecture & Impact */}
            <div className="space-y-5">
              <div className="space-y-1.5">
                <h3 className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2 font-bold">
                  <Layers className="w-4 h-4 text-cyan-400" /> System Topology & Architecture
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm font-mono leading-relaxed">{asset.architecture}</p>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-xs font-mono text-[#D4AF37] uppercase tracking-wider flex items-center gap-2 font-bold">
                  <Cpu className="w-4 h-4 text-[#D4AF37]" /> Key Impact & Deliverables
                </h3>
                <ul className="space-y-1.5 font-mono text-xs text-gray-300">
                  {asset.impact.map((item, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span className="text-[#00E676] font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <h3 className="text-[10px] font-mono text-gray-400 uppercase tracking-wider font-semibold">Technology Stack</h3>
                <div className="flex flex-wrap gap-1.5">
                  {asset.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-[10px] font-mono rounded-md bg-[#080b12] border border-white/15 text-gray-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
