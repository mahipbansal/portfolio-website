'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Flag, CheckCircle2 } from 'lucide-react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isVictory, setIsVictory] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Check if user has already visited in this session
    const hasVisited = sessionStorage.getItem('mahip_portfolio_visited');
    const firstTime = !hasVisited;
    setIsFirstVisit(firstTime);
    sessionStorage.setItem('mahip_portfolio_visited', 'true');

    // 4.0 seconds for First Visit (3-5s range), 2.0 seconds for Reloads
    const totalDurationMs = firstTime ? 4000 : 2000;
    const intervalTimeMs = totalDurationMs / 100;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsVictory(true);
          setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = '';
          }, 450);
          return 100;
        }
        return prev + 1;
      });
    }, intervalTimeMs);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(8px)', scale: 1.02 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col justify-between items-center py-12 px-6 sm:px-12 font-mono select-none overflow-hidden"
        >
          {/* Subtle Mountain Background Overlay */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
            <img
              src="/images%20personal/mahip-background-only.jpg"
              alt="Mountain Scenery"
              className="w-full h-full object-cover filter contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]" />
          </div>

          {/* Glowing Ambient Background Spotlights */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#38BDF8]/10 rounded-full blur-[160px] pointer-events-none" />

          {/* Top Brand Tag */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-1 pt-4">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-white/15 backdrop-blur-md shadow-xl">
              <Sparkles className="w-4 h-4 text-[#38BDF8] animate-spin" />
              <span className="text-xs font-black tracking-widest text-white uppercase">
                MAHIP BANSAL — PORTFOLIO
              </span>
            </div>
            
            <p className="text-[11px] text-slate-400 font-bold tracking-widest uppercase pt-2">
              {progress < 100 ? 'PENGUIN SETTING UP WEBSITE ENGINE...' : 'OPTIMUM REACHED ✨'}
            </p>
          </div>

          {/* FULL SCREEN WIDE RUNNING TRACK AREA */}
          <div className="relative z-10 w-full max-w-4xl flex flex-col items-center space-y-4">
            
            {/* Live Percentage Counter & Finish Flag Header */}
            <div className="flex items-center justify-between w-full text-xs sm:text-sm font-bold font-mono px-2">
              <span className="text-[#38BDF8] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8] animate-ping" />
                START LINE
              </span>
              <span className="text-[#00E676] flex items-center gap-1">
                <Flag className="w-4 h-4 text-[#00E676]" />
                FINISH LINE
              </span>
            </div>

            {/* FULL-WIDTH RUNNING TRACK CONTAINER */}
            <div className="relative w-full py-12 flex flex-col justify-end">
              
              {/* RUNNING PENGUIN MASCOT WITH REAL ANIMATED LEGS & FLIPPERS */}
              <motion.div
                className="absolute top-0 z-20 -translate-x-1/2 flex flex-col items-center pointer-events-none"
                style={{ left: `${Math.min(95, Math.max(5, progress))}%` }}
                animate={
                  isVictory
                    ? { y: [-24, 0, -12, 0], rotate: [0, -15, 15, 0] }
                    : { y: [0, -6, 0, -6, 0] }
                }
                transition={
                  isVictory
                    ? { duration: 0.4 }
                    : { duration: 0.35, repeat: Infinity, ease: 'linear' }
                }
              >
                {/* Speech Bubble above Penguin */}
                <div className="px-3 py-1 rounded-full bg-gradient-to-r from-[#38BDF8] to-purple-500 text-black text-[11px] font-black tracking-wide shadow-lg shadow-[#38BDF8]/40 mb-2 whitespace-nowrap animate-bounce">
                  {progress < 100 ? `Running... ${progress}%` : 'Ready! 🚀'}
                </div>

                {/* 2D Vector Blue-Scarf Penguin SVG with Real Leg & Arm Animation */}
                <svg viewBox="0 0 64 64" className="w-14 h-14 sm:w-16 sm:h-16 overflow-visible filter drop-shadow-[0_6px_16px_rgba(56,189,248,0.6)]">
                  {/* Alternating Running Left Foot */}
                  <motion.ellipse
                    cx="24" cy="58" rx="6" ry="3.5" fill="#F59E0B"
                    animate={isVictory ? {} : { x: [-5, 6, -5], y: [-2, 2, -2] }}
                    transition={{ duration: 0.35, repeat: Infinity, ease: 'linear' }}
                  />
                  {/* Alternating Running Right Foot */}
                  <motion.ellipse
                    cx="40" cy="58" rx="6" ry="3.5" fill="#F59E0B"
                    animate={isVictory ? {} : { x: [6, -5, 6], y: [2, -2, 2] }}
                    transition={{ duration: 0.35, repeat: Infinity, ease: 'linear' }}
                  />
                  
                  {/* Outer Body (Dark Navy/Black) */}
                  <ellipse cx="32" cy="36" rx="20" ry="22" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
                  
                  {/* Inner Belly (White) */}
                  <ellipse cx="32" cy="39" rx="13" ry="16" fill="#FFFFFF" />
                  
                  {/* Eyes */}
                  <circle cx="25" cy="24" r="3.5" fill="#000000" />
                  <circle cx="26" cy="23" r="1.2" fill="#FFFFFF" />
                  <circle cx="39" cy="24" r="3.5" fill="#000000" />
                  <circle cx="40" cy="23" r="1.2" fill="#FFFFFF" />
                  
                  {/* Beak */}
                  <polygon points="32,27 27,33 37,33" fill="#F59E0B" stroke="#D97706" strokeWidth="0.8" />
                  
                  {/* Fluttering Scarf */}
                  <path d="M 16 33 Q 32 37 48 33 Q 50 37 46 41 Q 32 43 18 41 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
                  <motion.path
                    d="M 18 37 Q 10 40 4 35 Q 8 44 16 41 Z"
                    fill="#38BDF8"
                    stroke="#0284C7"
                    strokeWidth="0.8"
                    animate={{ d: ["M 18 37 Q 10 42 2 34 Q 8 46 16 41 Z", "M 18 37 Q 10 34 6 38 Q 8 42 16 41 Z", "M 18 37 Q 10 42 2 34 Q 8 46 16 41 Z"] }}
                    transition={{ duration: 0.25, repeat: Infinity }}
                  />

                  {/* Left & Right Flippers Flapping as Running */}
                  <motion.ellipse
                    cx="14" cy="38" rx="4" ry="10" fill="#0F172A"
                    animate={isVictory ? { rotate: -30 } : { rotate: [15, 50, 15] }}
                    transition={{ duration: 0.35, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.ellipse
                    cx="50" cy="38" rx="4" ry="10" fill="#0F172A"
                    animate={isVictory ? { rotate: 30 } : { rotate: [-50, -15, -50] }}
                    transition={{ duration: 0.35, repeat: Infinity, ease: 'linear' }}
                  />
                </svg>
              </motion.div>

              {/* Glowing Ice Track Line */}
              <div className="w-full h-4 rounded-full bg-white/10 overflow-hidden relative p-0.5 border border-white/15 shadow-2xl backdrop-blur-md">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#38BDF8] via-purple-500 via-[#00E676] to-[#EF4444]"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.05 }}
                />
              </div>

            </div>

            {/* Bottom Status Ticker */}
            <div className="flex items-center justify-between w-full text-xs text-gray-400 font-mono px-2">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00E676]" />
                <span>LOADED COMPONENTS</span>
              </span>
              <span className="text-white font-black font-mono">
                [ {progress}% ]
              </span>
            </div>

          </div>

          {/* Bottom Footer Credit */}
          <div className="relative z-10 text-[10px] text-gray-500 uppercase tracking-widest pb-2">
            DESIGNED & BUILT BY MAHIP BANSAL
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
