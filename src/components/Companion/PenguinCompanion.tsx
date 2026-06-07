'use client';

import React, { useEffect, useRef, useState } from 'react';

type DirectionState = 'FRONT' | 'BACK' | 'LEFT' | 'RIGHT' | 'UP_LEFT' | 'UP_RIGHT' | 'DOWN_LEFT' | 'DOWN_RIGHT';

interface IceParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  rotation: number;
  rotSpeed: number;
  color: string;
}

export type SoundMode = 'ICE_CHIME' | 'PENGUIN_CHIRP' | 'GLASS_POP' | 'TECH_BLIP' | 'WATER_DROP' | 'MUTE';

const playIceChime = (ctx: AudioContext) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(1600, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.07);
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.07);

  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(2400, ctx.currentTime);
  osc2.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.09);
  gain2.gain.setValueAtTime(0.08, ctx.currentTime);
  gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
  osc2.connect(gain2);
  gain2.connect(ctx.destination);
  osc2.start();
  osc2.stop(ctx.currentTime + 0.09);
};

const playPenguinChirp = (ctx: AudioContext) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(750, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1450, ctx.currentTime + 0.06);
  osc.frequency.exponentialRampToValueAtTime(950, ctx.currentTime + 0.12);
  gain.gain.setValueAtTime(0.18, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.12);
};

const playGlassPop = (ctx: AudioContext) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(650, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.08);
  gain.gain.setValueAtTime(0.25, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.08);
};

const playTechBlip = (ctx: AudioContext) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'square';
  osc.frequency.setValueAtTime(1800, ctx.currentTime);
  osc.frequency.setValueAtTime(2400, ctx.currentTime + 0.03);
  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.06);
};

const playWaterDrop = (ctx: AudioContext) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(450, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.07);
  gain.gain.setValueAtTime(0.22, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.07);
};

export const playSoundEffect = (mode: SoundMode) => {
  if (mode === 'MUTE') return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    if (mode === 'ICE_CHIME') playIceChime(ctx);
    else if (mode === 'PENGUIN_CHIRP') playPenguinChirp(ctx);
    else if (mode === 'GLASS_POP') playGlassPop(ctx);
    else if (mode === 'TECH_BLIP') playTechBlip(ctx);
    else if (mode === 'WATER_DROP') playWaterDrop(ctx);
  } catch (err) {
    // Ignore audio policy restrictions before user gesture
  }
};

export default function PenguinCompanion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [screenSize, setScreenSize] = useState({ width: 1200, height: 800 });
  const [soundMode, setSoundMode] = useState<SoundMode>('PENGUIN_CHIRP');
  
  // Position & Direction Physics (Full 2D Screen Space)
  const posRef = useRef({ x: 200, y: 500 });
  const targetPosRef = useRef({ x: 200, y: 500 });
  const mousePosRef = useRef({ x: 200, y: 500 });
  const dirRef = useRef<DirectionState>('FRONT');
  const isMovingRef = useRef(false);
  const isSittingRef = useRef(false);
  
  // Jump / Hop Physics for Click Reaction
  const jumpYRef = useRef(0);
  const jumpVyRef = useRef(0);

  // Ice Sparkle Particles (Walk Effect & Blank Space Tap Effect)
  const particlesRef = useRef<IceParticle[]>([]);

  // Timers & Cycles
  const frameRef = useRef(0);
  const blinkTimerRef = useRef(0);
  const isBlinkingRef = useRef(false);
  const happyTimerRef = useRef(0);
  const idleWanderTimerRef = useRef(0);

  const soundModeRef = useRef<SoundMode>(soundMode);
  useEffect(() => {
    soundModeRef.current = soundMode;
  }, [soundMode]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
      const initialX = Math.max(100, window.innerWidth - 180);
      const initialY = Math.max(100, window.innerHeight - 140);
      posRef.current = { x: initialX, y: initialY };
      targetPosRef.current = { x: initialX, y: initialY };
      mousePosRef.current = { x: initialX, y: initialY };
    }

    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setScreenSize({ width: window.innerWidth, height: window.innerHeight });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      const distToPenguin = Math.hypot(e.clientX - posRef.current.x, e.clientY - posRef.current.y);

      // If mouse is moved far away (> 140px), reset target to track new cursor position
      if (distToPenguin >= 140) {
        const offsetX = e.clientX > window.innerWidth / 2 ? -55 : 55;
        const offsetY = 45;

        targetPosRef.current = {
          x: Math.max(40, Math.min(window.innerWidth - 40, e.clientX + offsetX)),
          y: Math.max(50, Math.min(window.innerHeight - 50, e.clientY + offsetY)),
        };
        idleWanderTimerRef.current = 0;
      }
    };

    const handleWindowClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') !== null ||
        target.closest('a') !== null;

      if (!isInteractive) {
        // Play selected sound effect mode on tap!
        playSoundEffect(soundModeRef.current);

        // Keep friendly 55px offset distance from click location!
        const offsetX = e.clientX > window.innerWidth / 2 ? -55 : 55;
        const offsetY = 45;

        targetPosRef.current = {
          x: Math.max(40, Math.min(window.innerWidth - 40, e.clientX + offsetX)),
          y: Math.max(50, Math.min(window.innerHeight - 50, e.clientY + offsetY)),
        };
        happyTimerRef.current = 60;
        jumpVyRef.current = -4.2; // Hop bounce animation
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);

  const SOUND_OPTIONS: { id: SoundMode; label: string; icon: string; desc: string }[] = [
    { id: 'ICE_CHIME', label: '1. Ice Chime', icon: '❄️', desc: 'Crystalline High Pitch Sweep' },
    { id: 'PENGUIN_CHIRP', label: '2. Penguin Squeak', icon: '🐧', desc: 'Cute Double Tone Chirp' },
    { id: 'GLASS_POP', label: '3. Glass Pop', icon: '🍷', desc: 'Deep Resonant Glass Pop' },
    { id: 'TECH_BLIP', label: '4. Cyber Blip', icon: '⚡', desc: 'Digital Square Wave Pulse' },
    { id: 'WATER_DROP', label: '5. Water Drop', icon: '💧', desc: 'Soft Upward Liquid Drop' },
    { id: 'MUTE', label: 'Mute Sound', icon: '🔇', desc: 'Silent Mode' },
  ];

  useEffect(() => {
    let animationId: number;

    const render = () => {
      frameRef.current += 1;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Jump / Hop Physics Gravity Simulation
      if (jumpYRef.current < 0 || jumpVyRef.current !== 0) {
        jumpYRef.current += jumpVyRef.current;
        jumpVyRef.current += 0.4;
        if (jumpYRef.current >= 0) {
          jumpYRef.current = 0;
          jumpVyRef.current = 0;
        }
      }

      // 2D Navigation Vector Physics
      const dx = targetPosRef.current.x - posRef.current.x;
      const dy = targetPosRef.current.y - posRef.current.y;
      const dist = Math.hypot(dx, dy);

      blinkTimerRef.current += 1;

      // Blinking Timer (only when standing)
      if (blinkTimerRef.current > 180 + Math.sin(frameRef.current * 0.05) * 60) {
        isBlinkingRef.current = true;
        if (blinkTimerRef.current > 200 + Math.sin(frameRef.current * 0.05) * 60) {
          isBlinkingRef.current = false;
          blinkTimerRef.current = 0;
        }
      }

      if (happyTimerRef.current > 0) {
        happyTimerRef.current -= 1;
      }

      const STOP_DISTANCE = 12; // Stop when reached target spot

      if (dist > STOP_DISTANCE) {
        isMovingRef.current = true;
        isSittingRef.current = false;

        // Snappy Waddling Speed
        const moveSpeed = Math.min(1.8, Math.max(0.9, dist * 0.025));
        posRef.current.x += (dx / dist) * moveSpeed;
        posRef.current.y += (dy / dist) * moveSpeed;

        // 8-Directional Angle Orientation while walking
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        if (angle >= -22.5 && angle < 22.5) dirRef.current = 'RIGHT';
        else if (angle >= 22.5 && angle < 67.5) dirRef.current = 'DOWN_RIGHT';
        else if (angle >= 67.5 && angle < 112.5) dirRef.current = 'FRONT';
        else if (angle >= 112.5 && angle < 157.5) dirRef.current = 'DOWN_LEFT';
        else if (angle >= 157.5 || angle < -157.5) dirRef.current = 'LEFT';
        else if (angle >= -157.5 && angle < -112.5) dirRef.current = 'UP_LEFT';
        else if (angle >= -112.5 && angle < -67.5) dirRef.current = 'BACK';
        else if (angle >= -67.5 && angle < -22.5) dirRef.current = 'UP_RIGHT';
      } else {
        // Penguin has arrived at its target position!
        dirRef.current = 'FRONT';
        isMovingRef.current = false;

        const distToMouse = Math.hypot(mousePosRef.current.x - posRef.current.x, mousePosRef.current.y - posRef.current.y);

        // If mouse is nearby (< 140px):
        if (distToMouse < 140) {
          idleWanderTimerRef.current += 1;

          // Sit down cozy after arriving and resting at a spot
          if (idleWanderTimerRef.current > 50 && idleWanderTimerRef.current < 270) {
            isSittingRef.current = true;
          } else {
            isSittingRef.current = false;
          }

          // Stay resting at current position for 5 FULL SECONDS (300 frames)!
          // After 5 seconds, pick a new spot along the 55px circular radius around cursor and waddle over!
          if (idleWanderTimerRef.current > 300) {
            idleWanderTimerRef.current = 0;
            isSittingRef.current = false;

            // Pick a new spot along a 55px radius circle around the cursor
            const randomAngle = Math.random() * Math.PI * 2;
            const radius = 55;
            
            targetPosRef.current = {
              x: Math.max(40, Math.min(window.innerWidth - 40, mousePosRef.current.x + Math.cos(randomAngle) * radius)),
              y: Math.max(50, Math.min(window.innerHeight - 50, mousePosRef.current.y + Math.sin(randomAngle) * radius)),
            };
          }
        }
      }

      // -------------------------------------------------------------
      // ICE SPARKLE PARTICLES (Visible Trail While Walking)
      // -------------------------------------------------------------
      if (isMovingRef.current && frameRef.current % 5 === 0) {
        particlesRef.current.push({
          x: posRef.current.x + (Math.random() * 18 - 9),
          y: posRef.current.y + 16 + (Math.random() * 6 - 3),
          vx: (Math.random() - 0.5) * 0.7,
          vy: -Math.random() * 0.7 - 0.3,
          size: Math.random() * 2.5 + 1.8,
          life: 0,
          maxLife: Math.floor(Math.random() * 25 + 30),
          rotation: Math.random() * Math.PI,
          rotSpeed: (Math.random() - 0.5) * 0.1,
          color: Math.random() > 0.35 ? '#E0F2FE' : Math.random() > 0.5 ? '#38BDF8' : '#7DD3FC',
        });
      }

      // Draw & Update Ice Sparkles
      if (particlesRef.current.length > 0) {
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
          const p = particlesRef.current[i];
          p.x += p.vx;
          p.y += p.vy;
          p.rotation += p.rotSpeed;
          p.life += 1;

          const alpha = Math.max(0, 1 - p.life / p.maxLife);

          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = alpha * 0.9;
          
          // Icy Blue Glowing Aura
          ctx.shadowColor = '#38BDF8';
          ctx.shadowBlur = 6;
          ctx.fillStyle = p.color;

          // 4-Point Ice Diamond Sparkle
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 1.6);
          ctx.lineTo(p.size * 0.55, 0);
          ctx.lineTo(0, p.size * 1.6);
          ctx.lineTo(-p.size * 0.55, 0);
          ctx.closePath();
          ctx.fill();

          // Bright White Core Center
          ctx.shadowBlur = 0;
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();

          if (p.life >= p.maxLife) {
            particlesRef.current.splice(i, 1);
          }
        }
      }

      // -------------------------------------------------------------
      // DRAW HIGH-DEFINITION 3D PENGUIN ANATOMY
      // -------------------------------------------------------------
      ctx.save();
      
      const posX = Math.round(posRef.current.x);
      const posY = Math.round(posRef.current.y + jumpYRef.current);

      ctx.translate(posX, posY);
      ctx.scale(1.25, 1.25);

      const isWalking = isMovingRef.current;
      const isSitting = isSittingRef.current;
      const isHappyState = happyTimerRef.current > 0;

      // Snappy Waddling & Breathing Animation Cycles
      const waddleCycle = Math.sin(frameRef.current * 0.22);
      const breathCycle = Math.sin(frameRef.current * 0.06) * 1.2;
      
      const bodyYOffset = isSitting ? 3 : isWalking ? Math.abs(waddleCycle) * -2.2 : breathCycle;
      const tiltAngle = isWalking ? waddleCycle * 0.08 : isHappyState ? Math.sin(frameRef.current * 0.3) * 0.18 : 0;

      ctx.rotate(tiltAngle);

      // Color Palette
      const DARK_CHARCOAL = '#22222b';
      const OUTLINE = '#0e0e12';
      const WHITE_BELLY = '#ffffff';
      const ORANGE_BEAK = '#ff9f1c';
      const ROSY_CHEEK = 'rgba(255, 150, 175, 0.65)';
      const BLUE_SCARF = '#38bdf8';
      const BLUE_SCARF_DARK = '#0284c7';

      const dir = dirRef.current;
      const isBackView = dir === 'BACK';
      const isSideView = dir === 'LEFT' || dir === 'RIGHT' || dir === 'UP_LEFT' || dir === 'UP_RIGHT' || dir === 'DOWN_LEFT' || dir === 'DOWN_RIGHT';

      // Horizontal flip for left facing states
      if (dir === 'LEFT' || dir === 'UP_LEFT' || dir === 'DOWN_LEFT') {
        ctx.scale(-1, 1);
      }

      // =============================================================
      // 1. MAIN BODY & HEAD ANATOMY (Slightly Reduced Body)
      // =============================================================
      ctx.fillStyle = DARK_CHARCOAL;
      ctx.strokeStyle = OUTLINE;
      ctx.lineWidth = 2.2;

      if (isSideView) {
        ctx.beginPath();
        ctx.ellipse(-1, 7 + bodyYOffset, 13.5, 13.5, 0, 0, Math.PI * 2);
        ctx.ellipse(-1, -6 + bodyYOffset, 12, 11, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(-1, -6 + bodyYOffset, 12, Math.PI * 0.75, Math.PI * 2.25);
        ctx.arc(-1, 7 + bodyYOffset, 13.5, -Math.PI * 0.25, Math.PI * 1.25);
        ctx.closePath();
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.ellipse(0, 7.5 + bodyYOffset, 14.0, 13.5, 0, 0, Math.PI * 2);
        ctx.ellipse(0, -6 + bodyYOffset, 12.5, 11.5, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, -6 + bodyYOffset, 12.5, Math.PI * 0.75, Math.PI * 2.25);
        ctx.arc(0, 7.5 + bodyYOffset, 14.0, -Math.PI * 0.25, Math.PI * 1.25);
        ctx.closePath();
        ctx.stroke();
      }

      // =============================================================
      // 2. WHITE FACE & BELLY MASK (Proportionately Trimmed)
      // =============================================================
      if (!isBackView) {
        ctx.fillStyle = WHITE_BELLY;
        ctx.beginPath();
        if (isSideView) {
          ctx.ellipse(3.6, -5.5 + bodyYOffset, 7.2, 8.2, 0.12, 0, Math.PI * 2);
          ctx.ellipse(3.6, 7.0 + bodyYOffset, 7.2, 9.5, 0.12, 0, Math.PI * 2);
        } else {
          ctx.ellipse(0, -5.5 + bodyYOffset, 9.8, 9.0, 0, 0, Math.PI * 2);
          ctx.ellipse(0, 7.5 + bodyYOffset, 11.5, 10.8, 0, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      // =============================================================
      // 3. EYES & ROSY CHEEKS & BEAK (Larger Side Eye)
      // =============================================================
      if (!isBackView) {
        if (isSideView) {
          const eyeY = -6.0 + bodyYOffset;
          const eyeX = 3.5;

          if (isWalking || isHappyState) {
            ctx.lineWidth = 2.6;
            ctx.strokeStyle = OUTLINE;
            ctx.beginPath();
            ctx.arc(eyeX, eyeY, 3.6, Math.PI * 1.15, Math.PI * 1.85, false);
            ctx.stroke();
          } else if (isBlinkingRef.current) {
            ctx.lineWidth = 2.6;
            ctx.strokeStyle = OUTLINE;
            ctx.beginPath();
            ctx.arc(eyeX, eyeY, 3.6, Math.PI, 0);
            ctx.stroke();
          } else {
            // Open Side Eye - Larger Pupil & Dual Sparkle Glints
            ctx.fillStyle = OUTLINE;
            ctx.beginPath();
            ctx.arc(eyeX, eyeY, 4.8, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(eyeX - 1.5, eyeY - 1.5, 1.7, 0, Math.PI * 2);
            ctx.arc(eyeX + 1.5, eyeY + 1.5, 1.0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = OUTLINE;
            ctx.beginPath();
            ctx.arc(-2.2, eyeY + 0.2, 2.4, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(-2.8, eyeY - 0.6, 0.8, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.fillStyle = ROSY_CHEEK;
          ctx.beginPath();
          ctx.ellipse(eyeX - 0.5, eyeY + 4.2, 3.2, 2.2, 0, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = ORANGE_BEAK;
          ctx.strokeStyle = OUTLINE;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.ellipse(7.2, eyeY + 3.8, 3.8, 2.4, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        } else {
          const eyeY = -7.5 + bodyYOffset;

          if (isWalking || isHappyState) {
            ctx.lineWidth = 2.2;
            ctx.strokeStyle = OUTLINE;
            ctx.beginPath();
            ctx.arc(-5, eyeY - 0.5, 3.2, Math.PI * 1.15, Math.PI * 1.85, false);
            ctx.arc(5, eyeY - 0.5, 3.2, Math.PI * 1.15, Math.PI * 1.85, false);
            ctx.stroke();
          } else if (isBlinkingRef.current) {
            ctx.lineWidth = 2.2;
            ctx.strokeStyle = OUTLINE;
            ctx.beginPath();
            ctx.arc(-5, eyeY, 3.0, Math.PI, 0);
            ctx.arc(5, eyeY, 3.0, Math.PI, 0);
            ctx.stroke();
          } else {
            ctx.fillStyle = OUTLINE;
            ctx.beginPath();
            ctx.arc(-5, eyeY, 4.2, 0, Math.PI * 2);
            ctx.arc(5, eyeY, 4.2, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(-6.2, eyeY - 1.2, 1.5, 0, Math.PI * 2);
            ctx.arc(-3.8, eyeY + 1.2, 0.8, 0, Math.PI * 2);
            ctx.arc(3.8, eyeY - 1.2, 1.5, 0, Math.PI * 2);
            ctx.arc(6.2, eyeY + 1.2, 0.8, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.fillStyle = ROSY_CHEEK;
          ctx.beginPath();
          ctx.ellipse(-7.5, eyeY + 4.5, 3.8, 2.5, 0, 0, Math.PI * 2);
          ctx.ellipse(7.5, eyeY + 4.5, 3.8, 2.5, 0, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = ORANGE_BEAK;
          ctx.strokeStyle = OUTLINE;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.ellipse(0, eyeY + 4.2, 3.8, 2.6, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      } else {
        ctx.fillStyle = DARK_CHARCOAL;
        ctx.strokeStyle = OUTLINE;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.ellipse(0, 14.5 + bodyYOffset, 4.5, 5.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }

      // =============================================================
      // 4. COZY SLIM BLUE SCARF
      // =============================================================
      const scarfY = 1.5 + bodyYOffset;
      const scarfSway = isWalking ? Math.sin(frameRef.current * 0.22) * 2.2 : 0;

      ctx.fillStyle = BLUE_SCARF;
      ctx.strokeStyle = OUTLINE;
      ctx.lineWidth = 1.8;

      if (isSideView) {
        ctx.beginPath();
        ctx.ellipse(0.5, scarfY, 12.8, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = BLUE_SCARF_DARK;
        ctx.beginPath();
        ctx.roundRect(3.0 + scarfSway, scarfY + 0.5, 4.5, 7.5, 1.5);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.ellipse(0, scarfY, 13.5, 2.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        if (!isBackView) {
          ctx.fillStyle = BLUE_SCARF_DARK;
          ctx.beginPath();
          ctx.roundRect(1.5 + scarfSway, scarfY + 0.6, 5.0, 9.0, 1.8);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = BLUE_SCARF;
          ctx.beginPath();
          ctx.roundRect(6.0 + scarfSway * 1.2, scarfY + 0.1, 4.5, 7.5, 1.8);
          ctx.fill();
          ctx.stroke();

          ctx.strokeStyle = OUTLINE;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.moveTo(2.5 + scarfSway, scarfY + 9.6);
          ctx.lineTo(2.5 + scarfSway, scarfY + 11.6);
          ctx.moveTo(5.5 + scarfSway, scarfY + 9.6);
          ctx.lineTo(5.5 + scarfSway, scarfY + 11.6);
          ctx.stroke();
        }
      }

      // =============================================================
      // 5. WINGS / HANDS
      // =============================================================
      const wingY = scarfY + 3.5;
      const leftWingAngle = isHappyState ? -0.4 + Math.sin(frameRef.current * 0.4) * 0.15 : isWalking ? -waddleCycle * 0.15 : 0.08;
      const rightWingAngle = isHappyState ? 0.4 - Math.sin(frameRef.current * 0.4) * 0.15 : isWalking ? waddleCycle * 0.15 : -0.08;

      ctx.fillStyle = DARK_CHARCOAL;
      ctx.strokeStyle = OUTLINE;
      ctx.lineWidth = 1.8;

      if (isSideView) {
        ctx.save();
        ctx.translate(-4.0, wingY);
        ctx.rotate(isWalking ? waddleCycle * 0.15 : 0.05);
        ctx.beginPath();
        ctx.ellipse(0, 4.2, 3.5, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      } else {
        // Front View Left Wing
        ctx.save();
        ctx.translate(-13.5, wingY);
        ctx.rotate(leftWingAngle);
        ctx.beginPath();
        ctx.ellipse(0, 4.2, 3.5, 8, 0.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Front View Right Wing
        ctx.save();
        ctx.translate(13.5, wingY);
        ctx.rotate(rightWingAngle);
        ctx.beginPath();
        ctx.ellipse(0, 4.2, 3.5, 8, -0.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      // =============================================================
      // 6. BOTH FEET
      // =============================================================
      ctx.fillStyle = ORANGE_BEAK;
      ctx.strokeStyle = OUTLINE;
      ctx.lineWidth = 1.8;

      if (isSideView) {
        const frontFootX = isWalking ? 4.5 + waddleCycle * 3.5 : 4.5;
        const backFootX = isWalking ? -3.5 - waddleCycle * 3.5 : -3.5;
        const footY = 18.5 + bodyYOffset * 0.5;

        // Front Side Foot
        ctx.beginPath();
        ctx.ellipse(frontFootX, footY, 6.5, 3.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = OUTLINE;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(frontFootX - 1.5, footY - 1);
        ctx.lineTo(frontFootX - 1, footY + 2.8);
        ctx.stroke();

        // Back Side Foot
        ctx.fillStyle = ORANGE_BEAK;
        ctx.strokeStyle = OUTLINE;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.ellipse(backFootX, footY, 6.0, 3.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else {
        const leftFootX = isWalking ? -7.5 + waddleCycle * 3.5 : -7.5;
        const rightFootX = isWalking ? 7.5 - waddleCycle * 3.5 : 7.5;
        const footY = 18.5 + (isSitting ? -1.5 : 0) + bodyYOffset * 0.5;

        // Left Foot
        ctx.beginPath();
        ctx.ellipse(leftFootX, footY, 6.8, 4.0, -0.15, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = OUTLINE;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(leftFootX - 2, footY - 1);
        ctx.lineTo(leftFootX - 3.5, footY + 2.5);
        ctx.moveTo(leftFootX + 1.5, footY - 1);
        ctx.lineTo(leftFootX + 1, footY + 3);
        ctx.stroke();

        // Right Foot
        ctx.fillStyle = ORANGE_BEAK;
        ctx.strokeStyle = OUTLINE;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.ellipse(rightFootX, footY, 6.8, 4.0, 0.15, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = OUTLINE;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(rightFootX - 1.5, footY - 1);
        ctx.lineTo(rightFootX - 1, footY + 3);
        ctx.moveTo(rightFootX + 2, footY - 1);
        ctx.lineTo(rightFootX + 3.5, footY + 2.5);
        ctx.stroke();
      }

      ctx.restore();

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden select-none"
      style={{ width: '100vw', height: '100vh' }}
    >
      <canvas
        ref={canvasRef}
        width={screenSize.width}
        height={screenSize.height}
        className="pointer-events-none block"
      />
    </div>
  );
}
