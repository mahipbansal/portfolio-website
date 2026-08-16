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
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto bg-[#080b12] border rounded-2xl z-10 text-white p-5 sm:p-6 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          style={{
            borderColor: `${asset.color}50`,
            boxShadow: `0 0 35px ${asset.glowColor}`,
          }}
        >
          {/* Header Bar */}
          <div className="relative border-b pb-4" style={{ borderColor: `${asset.color}30` }}>
            <button
              onClick={onClose}
              className="absolute top-0 right-0 p-1.5 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors z-10 border border-white/10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pr-10">
              <div className="space-y-1 max-w-lg">
                <div className="flex items-center space-x-2.5">
                  <span
                    className="font-mono text-[10px] tracking-widest uppercase font-extrabold px-2 py-0.5 rounded border"
                    style={{
                      color: asset.color,
                      borderColor: `${asset.color}40`,
                      backgroundColor: `${asset.color}15`,
                    }}
                  >
                    {asset.assetNumber}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    isActive
                      ? 'bg-[#00E676]/15 text-[#00E676] border border-[#00E676]/30'
                      : 'bg-[#FF3D57]/15 text-[#FF3D57] border border-[#FF3D57]/30'
                  }`}>
                    {asset.status}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400 font-medium">
                    {asset.sector}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
                  {asset.name}
                </h2>
                <p className="text-gray-300 text-xs font-mono leading-relaxed">{asset.tagline}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2.5 shrink-0">
                {asset.githubUrl && (
                  <a
                    href={asset.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 border border-white/15 text-white font-mono text-xs font-semibold transition-all hover:scale-[1.02]"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                )}

                {asset.demoUrl && (
                  <a
                    href={asset.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-black font-mono text-xs font-extrabold transition-all hover:scale-[1.02]"
                    style={{
                      backgroundColor: asset.color,
                      boxShadow: `0 0 12px ${asset.glowColor}`,
                    }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Executive Overview Highlight Banner */}
          <div
            className="p-3.5 sm:p-4 rounded-xl border border-white/10 bg-black/40 flex items-start gap-3"
            style={{ borderLeftColor: asset.color, borderLeftWidth: '4px' }}
          >
            <Award className="w-5 h-5 shrink-0 mt-0.5" style={{ color: asset.color }} />
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase tracking-wider block font-bold" style={{ color: asset.color }}>
                EXECUTIVE OVERVIEW
              </span>
              <p className="text-gray-200 text-xs sm:text-sm font-mono leading-relaxed">
                {asset.executiveSummary}
              </p>
            </div>
          </div>

          {/* Problem & Solution 2-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* The Challenge */}
            <div className="bg-[#FF3D57]/08 border border-[#FF3D57]/25 p-3.5 rounded-xl space-y-1">
              <h4 className="text-xs font-mono text-[#FF3D57] font-bold uppercase flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FF3D57]" /> The Challenge
              </h4>
              <p className="text-gray-300 text-xs font-mono leading-relaxed">
                {asset.problemStatement}
              </p>
            </div>

            {/* The Solution */}
            <div className="bg-[#00E676]/08 border border-[#00E676]/25 p-3.5 rounded-xl space-y-1">
              <h4 className="text-xs font-mono text-[#00E676] font-bold uppercase flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#00E676]" /> Architectural Solution
              </h4>
              <p className="text-gray-300 text-xs font-mono leading-relaxed">
                {asset.solution}
              </p>
            </div>
          </div>

          {/* Architecture & Deliverables 2-Column Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* System Topology */}
            <div className="bg-cyan-950/20 border border-cyan-500/25 p-3.5 rounded-xl space-y-1">
              <h4 className="text-xs font-mono text-cyan-400 font-bold uppercase flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" /> System Topology
              </h4>
              <p className="text-gray-300 text-xs font-mono leading-relaxed">
                {asset.architecture}
              </p>
            </div>

            {/* Key Deliverables & Impact */}
            <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl space-y-1">
              <h4
                className="text-xs font-mono font-bold uppercase flex items-center gap-1.5"
                style={{ color: asset.color }}
              >
                <Cpu className="w-4 h-4" style={{ color: asset.color }} /> Key Impact & Deliverables
              </h4>
              <ul className="space-y-1 font-mono text-xs text-gray-300">
                {asset.impact.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="text-[#00E676] font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technology Stack Footer */}
          <div className="pt-2 border-t border-white/10 space-y-1.5">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider font-semibold block">
              TECHNOLOGY STACK
            </span>
            <div className="flex flex-wrap gap-1.5">
              {asset.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 text-[11px] font-mono font-bold rounded-md border"
                  style={{
                    color: asset.color,
                    backgroundColor: `${asset.color}15`,
                    borderColor: `${asset.color}35`,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}


