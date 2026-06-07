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

const PROJECT_ICON_COLORS: Record<string, string> = {
  'link-lift': 'text-[#38BDF8] filter drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]',
  'nova-os': 'text-purple-400 filter drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]',
  'jarvis': 'text-[#00E676] filter drop-shadow-[0_0_8px_rgba(0,230,118,0.5)]',
  'future-project-1': 'text-[#D4AF37] filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]',
  'future-project-2': 'text-slate-400 filter drop-shadow-[0_0_8px_rgba(148,163,184,0.4)]',
};

interface ProjectRowProps {
  asset: ProjectAsset;
  onSelect: (asset: ProjectAsset) => void;
  delay: number;
}

export default function ProjectRow({ asset, onSelect, delay }: ProjectRowProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = ASSET_ICONS[asset.id] || Wand2;

  // Color-coded status indicator dot & text badge
  const isGreen = asset.status === 'ACTIVE';
  const isRed = asset.status === 'UNDER CONSTRUCTION';
  const isFuture = asset.status === 'FUTURE VISION';
  
  const dotColorClass = isGreen ? 'bg-[#00E676]' : isRed ? 'bg-[#FF3D57]' : 'bg-white';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={`relative group border-b border-[#222] transition-colors ${
        isFuture ? 'cursor-default opacity-85' : 'hover:border-[#D4AF37]/50 cursor-pointer'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (!isFuture) onSelect(asset);
      }}
    >
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5 sm:py-4.5 px-4 sm:px-5 min-h-[86px] transition-colors duration-300 ${isHovered && !isFuture ? 'bg-[#D4AF37]/5' : ''}`}>
        
        {/* Left: Frameless Colored Project Icon, Status Dot + Name, & Description */}
        <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 min-w-0 flex-1">
          {/* Frameless Pure Icon */}
          <div className="shrink-0 flex items-center justify-center p-1 pt-0.5 sm:pt-1">
            {isFuture ? (
              <Lock className="w-5 h-5 text-gray-500" />
            ) : (
              <Icon className={`w-5.5 h-5.5 transition-transform duration-300 group-hover:scale-115 ${PROJECT_ICON_COLORS[asset.id] || 'text-[#D4AF37]'}`} />
            )}
          </div>

          <div className="flex flex-col justify-center min-w-0 space-y-0.5 flex-1">
            {/* Title Row with Status Indicator Dot before Name */}
            <div className="flex items-center space-x-2.5">
              {/* Pulsing Status Dot */}
              <span className="relative flex h-2.5 w-2.5 shrink-0" title={`Status: ${asset.status}`}>
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColorClass}`} />
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${dotColorClass}`} />
              </span>

              {/* Project Name */}
              <span className="font-mono font-extrabold text-white text-sm sm:text-base tracking-tight break-words">
                {asset.name}
              </span>
            </div>

            {/* Subtitle / Description */}
            {asset.tagline ? (
              <p className="text-gray-400 text-xs font-mono leading-relaxed font-normal sm:line-clamp-1">
                {asset.tagline}
              </p>
            ) : (
              <p className="text-gray-400 text-xs font-mono tracking-wide flex items-center gap-1.5 font-normal flex-wrap">
                <span className="text-[#D4AF37]/80">⚡</span> {asset.subtitle} • {asset.sector}
              </p>
            )}
          </div>
        </div>

        {/* Right: Action Symbols */}
        <div className="flex items-center justify-end space-x-3.5 font-mono text-xs shrink-0 self-end sm:self-center pl-8 sm:pl-0 pt-1 sm:pt-0">
          {/* Live Demo Pure Symbol */}
          {asset.demoUrl && (
            <a
              href={asset.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[#00E676] hover:text-[#00E676]/80 hover:scale-115 transition-all p-1"
              title="Live Demo Platform"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}

          {/* GitHub Repo Pure Symbol */}
          {asset.githubUrl && (
            <a
              href={asset.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-slate-300 hover:text-white hover:scale-115 transition-all p-1"
              title="GitHub Repository"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
          )}

          {/* Details Modal Opener Pure Symbol */}
          {!isFuture && (
            <button
              onClick={() => onSelect(asset)}
              className="text-[#D4AF37] hover:text-[#e5c158] hover:scale-115 transition-all p-1 cursor-pointer"
              title="Project Details"
            >
              <FileText className="w-5 h-5" />
            </button>
          )}
        </div>

      </div>
    </motion.div>
  );
}
