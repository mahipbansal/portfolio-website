'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Calendar } from 'lucide-react';

const GithubIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
  </svg>
);

export interface ContactCardData {
  id: string;
  type: 'email' | 'phone' | 'linkedin' | 'github' | 'meeting';
  title: string;
  value: string;
  description: string;
  actionUrl: string;
}

export const CONTACT_CARDS_DATA: ContactCardData[] = [
  {
    id: 'email',
    type: 'email',
    title: 'Email',
    value: 'bansalmahip84@gmail.com',
    description: '',
    actionUrl: 'mailto:bansalmahip84@gmail.com',
  },
  {
    id: 'phone',
    type: 'phone',
    title: 'WhatsApp',
    value: '+91 80000 19771',
    description: '',
    actionUrl: 'https://wa.me/918000019771',
  },
  {
    id: 'linkedin',
    type: 'linkedin',
    title: 'LinkedIn',
    value: 'linkedin.com/in/mahip-bansal',
    description: '',
    actionUrl: 'https://www.linkedin.com/in/mahip-bansal',
  },
  {
    id: 'github',
    type: 'github',
    title: 'GitHub',
    value: 'github.com/mahipbansal',
    description: '',
    actionUrl: 'https://github.com/mahipbansal',
  },
  {
    id: 'meeting',
    type: 'meeting',
    title: 'Schedule Meeting',
    value: 'Schedule 1:1 Meeting',
    description: '',
    actionUrl: '#schedule-meeting',
  },
];

interface ContactCardProps {
  card: ContactCardData;
  index: number;
  onCustomClick?: () => void;
}

export default function ContactCard({ card, index, onCustomClick }: ContactCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setMouseOffset({ x: x * 14, y: y * 10 });
  };

  const handleCardClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 500);

    if (onCustomClick) {
      onCustomClick();
      return;
    }
    if (card.actionUrl && card.actionUrl.startsWith('http')) {
      window.open(card.actionUrl, '_blank', 'noopener,noreferrer');
    } else if (card.actionUrl && card.actionUrl.startsWith('mailto:')) {
      window.location.href = card.actionUrl;
    }
  };

  const getTooltipColorClass = () => {
    switch (card.type) {
      case 'email':
        return 'text-slate-200 border-slate-300/40 shadow-[0_0_15px_rgba(255,255,255,0.2)]';
      case 'phone':
        return 'text-[#00E676] border-[#00E676]/40 shadow-[0_0_15px_rgba(0,230,118,0.3)]';
      case 'linkedin':
        return 'text-[#38BDF8] border-[#38BDF8]/40 shadow-[0_0_15px_rgba(56,189,248,0.3)]';
      case 'github':
        return 'text-purple-400 border-purple-400/40 shadow-[0_0_15px_rgba(168,85,247,0.3)]';
      case 'meeting':
        return 'text-amber-400 border-amber-400/40 shadow-[0_0_15px_rgba(245,158,11,0.3)]';
    }
  };

  const getIcon = () => {
    switch (card.type) {
      case 'email':
        return <Mail className="w-10 h-10 sm:w-12 sm:h-12 text-slate-200 filter drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]" />;
      case 'phone':
        return <Phone className="w-10 h-10 sm:w-12 sm:h-12 text-[#00E676] filter drop-shadow-[0_0_12px_rgba(0,230,118,0.5)]" />;
      case 'linkedin':
        return <LinkedinIcon className="w-10 h-10 sm:w-12 sm:h-12 text-[#38BDF8] filter drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]" />;
      case 'github':
        return <GithubIcon className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400 filter drop-shadow-[0_0_12px_rgba(168,85,247,0.5)]" />;
      case 'meeting':
        return <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-amber-400 filter drop-shadow-[0_0_12px_rgba(245,158,11,0.5)]" />;
    }
  };

  return (
    <div
      onClick={handleCardClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMouseOffset({ x: 0, y: 0 });
      }}
      className="p-1 sm:p-2 cursor-pointer select-none relative flex items-center justify-center"
    >
      {/* Centered Floating Tooltip Positioned JUST ABOVE the Logo */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute bottom-full mb-1 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-[#0a0e1a]/98 border ${getTooltipColorClass()} backdrop-blur-md pointer-events-none whitespace-nowrap z-50 flex items-center justify-center font-mono text-[10px] sm:text-[11px] font-semibold tracking-tight`}
          >
            {/* Tooltip Down Arrow - Perfectly Centered */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-3 border-x-transparent border-t-3 border-t-[#0a0e1a]/98" />
            <span>{card.value}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* QUANTUM WAVE ORBIT & MAGNETIC PULSE */}
      <motion.div
        animate={
          isHovered
            ? {
                x: mouseOffset.x,
                y: mouseOffset.y,
                scale: 1.28,
                rotate: 360,
              }
            : {
                x: index % 2 === 0 ? [-7, 5, -7] : [6, -6, 6],
                y: [0, -7, 2, -7, 0],
                rotate: index % 2 === 0 ? [-5, 5, -5] : [5, -5, 5],
                scale: 1.0,
              }
        }
        transition={
          isHovered
            ? {
                x: { type: 'spring', stiffness: 220, damping: 18 },
                y: { type: 'spring', stiffness: 220, damping: 18 },
                scale: { duration: 0.25, ease: 'easeOut' },
                rotate: { repeat: Infinity, duration: 4, ease: 'linear' },
              }
            : {
                x: { duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 },
                y: { duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 },
                rotate: { duration: 4.0, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 },
                scale: { duration: 0.3, ease: 'easeOut' },
              }
        }
        className="flex items-center justify-center relative"
      >
        {getIcon()}

        {/* Click Shockwave Pulse Ring */}
        <AnimatePresence>
          {isClicked && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0.9 }}
              animate={{ scale: 2.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border-2 border-white pointer-events-none"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
