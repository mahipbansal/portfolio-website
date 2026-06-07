'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, User } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  targetId: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'OVERVIEW', targetId: 'hero-container' },
  { id: 'profile', label: 'PROFILE', targetId: 'about' },
  { id: 'market', label: 'SKILLS', targetId: 'skills-stock-exchange' },
  { id: 'portfolio', label: 'PROJECTS', targetId: 'projects-portfolio' },
  { id: 'positions', label: 'POSITIONS', targetId: 'current-position' },
  { id: 'contact', label: 'CONTACT', targetId: 'contact-boardroom' },
];

export default function ExecutiveNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portfolioValue, setPortfolioValue] = useState('$1,250,000');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [meetingModalOpen, setMeetingModalOpen] = useState(false);
  const isManualNavRef = React.useRef(false);

  useEffect(() => {
    const handleMeetingModalToggle = (e: Event) => {
      const customEvt = e as CustomEvent;
      setMeetingModalOpen(!!customEvt.detail?.open);
    };

    window.addEventListener('meeting-modal-toggle', handleMeetingModalToggle);
    return () => {
      window.removeEventListener('meeting-modal-toggle', handleMeetingModalToggle);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Navbar appears only after scrolling past the full height of Overview (window.innerHeight - 100)
      const overviewEnded = window.scrollY >= (window.innerHeight - 100);
      setScrolled(overviewEnded);

      // Dynamic Portfolio Value Calculation based on Scroll Progress
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
        const startVal = 1250000;
        const endVal = 25000000;
        const currentVal = Math.floor(startVal + (endVal - startVal) * Math.pow(progress, 0.85));

        if (progress >= 0.95) {
          setPortfolioValue('$25.0M');
        } else {
          setPortfolioValue(`$${(currentVal / 1000000).toFixed(2)}M`);
        }
      }

      if (isManualNavRef.current) return;

      // Precision Scroll Spy: Evaluates top offsets cleanly from bottom to top
      let currentActive = 'overview';
      const scrollPos = window.scrollY + 140;

      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const el = document.getElementById(item.targetId);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            currentActive = item.id;
            break;
          }
        }
      }

      setActiveSection(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (targetId: string, id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    isManualNavRef.current = true;

    setTimeout(() => {
      isManualNavRef.current = false;
    }, 1200);

    if (targetId === 'hero-container') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(targetId);
    if (el) {
      document.body.style.pointerEvents = 'none';
      let yOffset = -25;
      if (targetId === 'about' || targetId === 'projects-portfolio') {
        yOffset = -55; // Centered offset for Profile and Projects sections
      }
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });

      setTimeout(() => {
        document.body.style.pointerEvents = '';
      }, 1000);
    }
  };

  const isOverviewPage = (activeSection === 'overview' && !scrolled) || meetingModalOpen;

  return (
    <AnimatePresence>
      {!isOverviewPage && (
        <motion.header
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed top-1 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none"
        >
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        
        {/* LEFT CAPSULE: Profile Avatar + MAHIP BANSAL Branding (Borderless Glass Pill) */}
        <div className="pointer-events-auto flex items-center space-x-3 bg-[#050505]/90 backdrop-blur-xl rounded-2xl px-3.5 py-1.5 shadow-[0_8px_25px_rgba(0,0,0,0.8)] relative group select-none">
          {/* Profile Circle Avatar */}
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="w-8 h-8 rounded-full bg-[#080b12] flex items-center justify-center hover:scale-105 transition-all overflow-hidden cursor-pointer focus:outline-none shadow-md shrink-0"
          >
            <img 
              src="/profile-top.webp" 
              alt="Profile" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.querySelector('svg')?.classList.remove('hidden');
              }}
            />
            <User className="w-4 h-4 text-slate-200 hidden" />
          </button>

          <div
            onClick={() => handleNavClick('hero-container', 'overview')}
            className="flex flex-col cursor-pointer"
          >
            <div className="flex items-center space-x-1">
              <span className="font-mono font-extrabold text-xs tracking-wider text-white transition-colors">
                MAHIP BANSAL
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
            </div>
            <span className="text-[8px] font-mono text-gray-300 uppercase tracking-widest opacity-90">
              Digital Investment Bank
            </span>
          </div>

          {/* Profile Modal Dropdown */}
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-12 w-64 bg-[#080b12]/95 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50 pointer-events-auto"
              >
                <div className="p-4 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full border-2 border-white/30 overflow-hidden mb-3 bg-gray-800 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    <img 
                      src="/profile-top.webp" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.querySelector('svg')?.classList.remove('hidden');
                      }}
                    />
                    <User className="w-10 h-10 text-slate-200 hidden" />
                  </div>
                  <h3 className="text-white font-mono font-bold text-xs tracking-widest uppercase">MAHIP BANSAL</h3>
                  <p className="text-[9px] text-gray-400 font-mono tracking-widest uppercase mt-1 mb-2">Digital Investment Bank</p>
                </div>
                <div className="px-4 py-3 text-center bg-gradient-to-b from-transparent to-white/5 border-t border-white/10">
                  <p className="text-[11px] text-gray-300 italic font-serif leading-relaxed">
                    "Vision is the true capital. Everything else is just leverage."
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CENTER: Individual Floating Glass Pills for EACH Navigation Link */}
        <nav className="hidden lg:flex pointer-events-auto items-center space-x-2 font-mono text-xs">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.targetId, item.id)}
                className={`relative px-4 py-2 rounded-2xl transition-all duration-300 font-medium tracking-wider cursor-pointer shadow-[0_8px_20px_rgba(0,0,0,0.7)] backdrop-blur-xl ${
                  isActive
                    ? 'text-white bg-white/20 border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.2)] font-bold'
                    : 'text-gray-400 hover:text-white bg-[#050505]/85 hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* RIGHT CAPSULE: Status Badge (Borderless Glass Pill) */}
        <div className="pointer-events-auto flex items-center space-x-2">
          <div className="hidden sm:flex items-center space-x-2 text-xs font-mono px-4 py-2 rounded-2xl bg-[#050505]/90 backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.8)]">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E676] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E676]" />
            </span>
            <span className="font-bold text-[#00E676] text-[10px] tracking-wider uppercase">
              OPEN FOR OPPORTUNITIES
            </span>
          </div>

          {/* Mobile Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-2xl bg-[#050505]/90 backdrop-blur-xl text-gray-300 hover:text-white shadow-lg"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-white" /> : <Menu className="w-4 h-4 text-white" />}
          </button>
        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden pointer-events-auto max-w-6xl mx-auto mt-2 bg-[#080b12]/95 backdrop-blur-xl border border-white/20 rounded-2xl p-5 shadow-2xl space-y-3 font-mono text-xs"
          >
            <div className="space-y-1.5">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleNavClick(item.targetId, item.id)}
                    className={`p-2.5 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${
                      isActive
                        ? 'bg-white/20 text-white border border-white/30 font-bold'
                        : 'text-gray-300 hover:bg-gray-900'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-4 h-4 text-gray-500" />
                  </div>
                );
              })}
            </div>

            {/* Mobile Status Panel */}
            <div className="pt-3 border-t border-gray-800 flex justify-between items-center text-xs">
              <div>
                <span className="text-[9px] text-gray-400 uppercase block">Portfolio Value</span>
                <span className="font-bold text-[#00E676] font-mono">{portfolioValue}</span>
              </div>
              <div>
                <span className="text-[9px] text-gray-400 uppercase block">Market Status</span>
                <span className="font-bold text-[#00E676] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
                  OPEN
                </span>
              </div>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </motion.header>
    )}
  </AnimatePresence>
  );
}
