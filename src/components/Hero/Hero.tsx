'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 (left) to +0.5 (right)
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 (top) to +0.5 (bottom)
    setMousePos({ x, y });
  };

  return (
    <section
      id="hero-container"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      className="h-screen w-full overflow-hidden relative flex flex-col justify-center items-center bg-[#050505] select-none"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-[#050505]">
        {/* Layer 1: Static Pure Mountain Scenery Background */}
        <img
          src="/images%20personal/mahip-background-only.jpg"
          alt="Mountain Scenery Background"
          className="w-full h-full object-cover object-center scale-[1.02] filter contrast-[1.02]"
        />

        {/* Layer 1.5 (z-5): TOP ROW - THINK BUILD EVOLVE (Without dots, streaming Left to Right) */}
        <div className="absolute top-[8%] sm:top-[7%] left-0 right-0 z-5 pointer-events-none overflow-hidden whitespace-nowrap">
          <motion.div
            animate={{ x: ['-50%', '0%'] }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex items-center space-x-16 sm:space-x-24 w-max"
          >
            {[1, 2, 3, 4].map((item) => (
              <React.Fragment key={item}>
                <span className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-extrabold font-mono tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-slate-150 to-white opacity-70">
                  THINK
                </span>
                <span className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-extrabold font-mono tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-white opacity-70">
                  BUILD
                </span>
                <span className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-extrabold font-mono tracking-[0.35em] text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-150 to-slate-300 opacity-70">
                  EVOLVE
                </span>
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* Layer 1.6 (z-5): LOWER ROW - MAHIP BANSAL (Starts in the Middle on Page Refresh) */}
        <div className="absolute top-[24%] sm:top-[22%] left-0 right-0 z-5 pointer-events-none overflow-hidden whitespace-nowrap">
          <motion.div
            animate={{ x: ['-25%', '-75%'] }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex items-center space-x-16 sm:space-x-24 w-max"
          >
            {[1, 2, 3, 4].map((item) => (
              <React.Fragment key={item}>
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-100 to-white opacity-70">
                  MAHIP
                </h1>
                <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-200 opacity-70">
                  BANSAL
                </h1>
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* Layer 2 (z-10): 3D Z-AXIS ROTATION & DIRECTIONAL PARALLAX */}
        <motion.div
          style={{ perspective: 1000 }}
          animate={{
            x: isHovered ? mousePos.x * 16 - 3 : -3,
            y: isHovered ? mousePos.y * 10 : 0,
            rotateZ: isHovered ? mousePos.x * 4 : 0,
            rotateY: isHovered ? mousePos.x * 10 : 0,
            rotateX: isHovered ? -mousePos.y * 7 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 180,
            damping: 22,
            mass: 0.4,
          }}
          className="absolute inset-0 w-full h-full pointer-events-none z-10 flex items-center justify-center select-none"
        >
          <img
            src="/images%20personal/mahip-snow-cutout.png"
            alt="Mahip Bansal Human Body"
            className="w-full h-full object-cover object-center scale-[1.02] filter contrast-[1.05] brightness-[1.02]"
          />
        </motion.div>

        {/* Subtle Dark Shadow Effect at the Bottom of 1st Page ONLY */}
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent pointer-events-none z-30" />
      </div>
    </section>
  );
}
