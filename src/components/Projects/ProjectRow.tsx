'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectAsset } from './ProjectData';
import { ExternalLink, FileText, Wand2, Monitor, Bot, Boxes, Code2, Lock } from 'lucide-react';

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const ASSET_ICONS: Record<string, React.ElementType> = {
  'link-lift': Wand2,
  'nova-os': Monitor,
  'jarvis': Bot,
  'future-project-1': Boxes,
  'future-project-2': Code2,
};

interface ProjectRowProps {
  asset: ProjectAsset;
  onSelect: (asset: ProjectAsset) => void;
  delay: number;
}

export default function ProjectRow({ asset, onSelect, delay }: ProjectRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = ASSET_ICONS[asset.id] || Wand2;

  const isGreen = asset.status === 'ACTIVE';
  const isRed = asset.status === 'UNDER CONSTRUCTION';
  const isFuture = asset.status === 'FUTURE VISION';
  
  const dotColorClass = isGreen ? 'bg-[#00E676]' : isRed ? 'bg-[#FF3D57]' : 'bg-white';

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={`relative group rounded-xl border transition-all duration-300 overflow-hidden ${
        asset.borderColor
      } bg-gradient-to-br ${asset.bgGradient} ${
        isFuture ? 'cursor-default opacity-85' : 'cursor-pointer'
      }`}
      style={{
        boxShadow: isHovered && !isFuture
          ? `0 0 20px ${asset.glowColor}`
          : `0 0 10px ${asset.glowColor.replace('0.4', '0.12')}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (!isFuture) onSelect(asset);
      }}
    >
      <div className="flex flex-col gap-3 p-4 sm:p-5">
        {/* Top Header Row: Icon, Asset Info, Status & Action Icons */}
        <div className="flex items-start justify-between gap-3">
          
          <div className="flex items-center space-x-3.5 min-w-0 flex-1">
            {/* Styled Icon Container matching Profile Section DP Node buttons */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 bg-black/60 shadow-inner"
              style={{
                borderColor: `${asset.color}60`,
                backgroundColor: `${asset.color}15`,
              }}
            >
              {isFuture ? (
                <Lock className="w-5 h-5 text-gray-400" />
              ) : (
                <Icon
                  className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    color: asset.color,
                    filter: `drop-shadow(0 0 8px ${asset.color})`,
                  }}
                />
              )}
            </div>

            {/* Asset Header Titles */}
            <div className="flex flex-col min-w-0 space-y-1">
              <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                {/* Asset Number Badge */}
                <span
                  className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded border uppercase tracking-wider"
                  style={{
                    color: asset.color,
                    borderColor: `${asset.color}40`,
                    backgroundColor: `${asset.color}18`,
                  }}
                >
                  {asset.assetNumber}
                </span>

                {/* Pulsing Status Indicator Dot */}
                <span className="relative flex h-2 w-2 shrink-0" title={`Status: ${asset.status}`}>
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColorClass}`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColorClass}`} />
                </span>

                {/* Sector Badge */}
                <span className="text-[10px] font-mono text-gray-300 font-semibold uppercase">
                  {asset.sector}
                </span>
              </div>

              {/* Project Name */}
              <h3 className="font-mono font-extrabold text-white text-base sm:text-lg tracking-tight truncate group-hover:text-white">
                {asset.name}
              </h3>
            </div>
          </div>

          {/* Action Symbols (Top Right) */}
          <div className="flex items-center space-x-2 font-mono text-xs shrink-0 pt-0.5">
            {asset.demoUrl && (
              <a
                href={asset.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[#00E676] hover:text-[#00E676]/80 hover:scale-115 transition-all p-1.5 rounded-lg bg-black/40 border border-[#00E676]/30 hover:border-[#00E676]"
                title="Live Demo Platform"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {asset.githubUrl && (
              <a
                href={asset.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-slate-300 hover:text-white hover:scale-115 transition-all p-1.5 rounded-lg bg-black/40 border border-white/15 hover:border-white/40"
                title="GitHub Repository"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
            )}

            {!isFuture && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(asset);
                }}
                className="p-1.5 rounded-lg bg-black/40 border transition-all hover:scale-115 cursor-pointer"
                style={{
                  color: asset.color,
                  borderColor: `${asset.color}40`,
                }}
                title="Project Details"
              >
                <FileText className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

        {/* Description Tagline */}
        <p className="text-gray-300 text-xs sm:text-sm font-mono leading-relaxed line-clamp-2">
          {asset.tagline || `${asset.subtitle} • ${asset.executiveSummary}`}
        </p>

        {/* Technologies / Skill Stack Badges - Colorful Pill Tags like Profile Section */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {asset.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2.5 py-0.5 rounded-md border font-mono font-bold transition-all duration-300"
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
  );
}

