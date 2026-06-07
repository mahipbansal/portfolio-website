'use client';

import React from 'react';
import { PROJECT_ASSETS, ProjectAsset } from './ProjectData';
import ProjectRow from './ProjectRow';

interface ProjectTableProps {
  onSelect: (asset: ProjectAsset) => void;
}

export default function ProjectTable({ onSelect }: ProjectTableProps) {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      {/* Table Body - Flexible on mobile, compact scroll container on desktop */}
      <div className="flex-1 max-h-none sm:max-h-[400px] overflow-y-auto overflow-x-hidden p-1 pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {PROJECT_ASSETS.map((asset, idx) => (
          <ProjectRow
            key={asset.id}
            asset={asset}
            onSelect={onSelect}
            delay={idx * 0.05}
          />
        ))}
      </div>
    </div>
  );
}
