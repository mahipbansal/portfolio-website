'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Sparkles, BrainCircuit, Code, Rocket, Mail, ChevronRight } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const PREDEFINED_QUESTIONS = [
  "👨‍💻 Who is Mahip Bansal?",
  "⚡ Current Focus",
  "🛠️ Tech Stack",
  "🚀 Featured Projects",
  "📬 Contact & Schedule",
];

const BOT_KNOWLEDGE: Record<string, string> = {
  "who is mahip bansal?": 
    "Mahip Bansal is a Computer Science student and builder driven by curiosity to turn ideas into real, working products. He specializes in Artificial Intelligence, software development, and intelligent systems, exploring how technology solves practical problems.",
  
  "current focus": 
    "Mahip's active focus areas:\n1. 🧠 01. AI / GenAI (LLMs & Agentic Workflows)\n2. 🚀 02. PROJECTS (LinkLift & Smart Systems)\n3. ⚡ 03. DSA PRACTICE (LeetCode & Algorithm Problem Solving)\n4. 🏗️ 04. ARCHITECTURE (Scalable System Design)",

  "tech stack": 
    "Mahip's core technical toolkit:\n• Frontend & Core: Next.js 15, React, TypeScript, TailwindCSS\n• AI & Backend: Python, PyTorch, LLMs, Agentic Workflows, Node.js\n• Computer Science: C++, Data Structures & Algorithms, WebGL Graphics Engines",

  "featured projects": 
    "Key Projects built by Mahip:\n• LinkLift — Intelligent URL & Link Management Platform\n• Autonomous AI Assistant Workflows & Synthesizers\n• Real-Time WebGL Interactive Engines & Portfolio Suite",

  "philosophy": 
    "Mahip's building philosophy:\n'Still learning, still experimenting, and still building — one idea at a time. For me, every project is another opportunity to learn something new, solve a problem, and build something better than what existed before.'",

  "contact": 
    "You can get in touch with Mahip directly:\n• Email: bansalmahip84@gmail.com\n• Schedule a Meeting: Click the 'Schedule a Meeting' button in the contact section at the bottom of this website to pick a date & time!",

  "default": 
    "I didn't quite catch that! I specialize in answering questions about Mahip Bansal's background, AI projects, tech stack, or booking a meeting with him. Feel free to click one of the quick prompts below!"
};

// Web Audio API helper for subtle chat blip sounds
const playChatBlip = () => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (err) {
    // Ignore audio policy restrictions
  }
};

export default function AssistantBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "Hi, I'm Mahip Bansal's personal AI assistant. How may I help you?",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getBotResponse = (userQuery: string): string => {
    const q = userQuery.toLowerCase().trim();
    if (q.includes('who') || q.includes('about') || q.includes('mahip') || q.includes('background') || q.includes('student') || q.includes('bio')) {
      return BOT_KNOWLEDGE["who is mahip bansal?"];
    } else if (q.includes('focus') || q.includes('position') || q.includes('current') || q.includes('doing') || q.includes('role')) {
      return BOT_KNOWLEDGE["current focus"];
    } else if (q.includes('stack') || q.includes('tech') || q.includes('skill') || q.includes('language') || q.includes('tool') || q.includes('code') || q.includes('react') || q.includes('python') || q.includes('next')) {
      return BOT_KNOWLEDGE["tech stack"];
    } else if (q.includes('project') || q.includes('linklift') || q.includes('built') || q.includes('work') || q.includes('app') || q.includes('demo')) {
      return BOT_KNOWLEDGE["featured projects"];
    } else if (q.includes('mindset') || q.includes('philosophy') || q.includes('idea') || q.includes('motto')) {
      return BOT_KNOWLEDGE["philosophy"];
    } else if (q.includes('contact') || q.includes('email') || q.includes('meeting') || q.includes('reach') || q.includes('schedule') || q.includes('hire') || q.includes('connect')) {
      return BOT_KNOWLEDGE["contact"];
    } else if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('greetings')) {
      return "Hello! I'm Mahip's AI Assistant. How can I help you explore Mahip's work or get in touch with him today?";
    }
    return BOT_KNOWLEDGE["default"];
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    playChatBlip();

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking and responding
    setTimeout(() => {
      const responseText = getBotResponse(text);

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: responseText,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
      playChatBlip();
    }, 700);
  };

  return (
    <>
      {/* Floating Toggle Button (Standalone Icon with Smooth Floating Movement) */}
      <motion.button
        onClick={() => {
          setIsOpen(true);
          playChatBlip();
        }}
        initial={{ scale: 0, y: 0 }}
        animate={{
          scale: isOpen ? 0 : 1,
          y: isOpen ? 0 : [0, -7, 0],
        }}
        transition={{
          scale: { duration: 0.2 },
          y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] p-3 text-white flex items-center justify-center cursor-pointer group touch-manipulation ${isOpen ? 'pointer-events-none' : ''}`}
      >
        <div className="relative flex items-center justify-center filter drop-shadow-[0_0_15px_rgba(56,189,248,0.75)]">
          <Bot className="w-8 h-8 sm:w-9 sm:h-9 text-[#38BDF8] group-hover:text-white group-hover:scale-110 transition-all duration-300" />
          <Sparkles className="w-3.5 h-3.5 text-white absolute -top-1.5 -right-2 animate-pulse" />
        </div>
      </motion.button>

      {/* Chat Window (Optimized for Android, iOS, Mac, PC, Laptops & Tablets) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-[9999] w-full sm:w-[420px] h-[100dvh] sm:h-[580px] sm:max-h-[85vh] bg-[#050505]/95 backdrop-blur-2xl border-0 sm:border-2 sm:border-white/20 sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden font-mono select-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 sm:px-4 sm:py-3.5 border-b border-white/15 bg-[#080b12] shrink-0">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#0a0a0a] border border-[#38BDF8]/40 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                    <Bot className="w-5 h-5 text-[#38BDF8]" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#00E676] border-2 border-[#050505] animate-pulse" />
                </div>
                <div>
                  <h3 className="text-white font-mono font-bold text-xs sm:text-sm tracking-wide flex items-center gap-1.5">
                    MAHIP'S AI AGENT
                  </h3>
                  <p className="text-[9px] sm:text-[10px] text-[#00E676] font-mono tracking-widest uppercase flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> ONLINE • KNOWLEDGE ENGINE
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  playChatBlip();
                }}
                className="p-2 rounded-xl hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer touch-manipulation"
              >
                <X className="w-5 h-5 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Messages Area (iOS Smooth Inertia Scroll & Touch Pan) */}
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3.5 sm:space-y-4 font-mono text-xs overscroll-contain touch-pan-y text-slate-200">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[88%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-2`}>
                    
                    {/* Avatar */}
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border ${
                      msg.sender === 'user'
                        ? 'bg-white text-black border-white'
                        : 'bg-[#0a0a0a] text-[#38BDF8] border-[#38BDF8]/40'
                    }`}>
                      {msg.sender === 'user' ? (
                        <User className="w-3.5 h-3.5 text-black" />
                      ) : (
                        <Bot className="w-3.5 h-3.5 text-[#38BDF8]" />
                      )}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`p-3 rounded-2xl text-xs sm:text-xs leading-relaxed whitespace-pre-line ${
                        msg.sender === 'user'
                          ? 'bg-white text-black font-semibold rounded-tr-none shadow-md'
                          : 'bg-[#0c1017] text-gray-200 border border-white/15 rounded-tl-none shadow-md'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center bg-[#0a0a0a] border border-[#38BDF8]/40 text-[#38BDF8]">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="bg-[#0c1017] border border-white/15 p-3 rounded-2xl rounded-tl-none flex space-x-1.5 items-center h-9">
                      <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full" />
                      <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full" />
                      <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {!isTyping && (
              <div className="px-3 pb-2 pt-1 border-t border-white/10 bg-[#06080d]/90 flex items-center gap-1.5 overflow-x-auto no-scrollbar scrollbar-none shrink-0 touch-pan-x">
                {PREDEFINED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-[10px] font-mono px-2.5 py-1.5 rounded-xl border border-white/20 text-slate-300 hover:text-white hover:border-[#38BDF8] hover:bg-[#38BDF8]/10 transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1 touch-manipulation"
                  >
                    <span>{q}</span>
                    <ChevronRight className="w-2.5 h-2.5 text-gray-400" />
                  </button>
                ))}
              </div>
            )}

            {/* Input Area (iOS Keyboard & Safe Area Inset Optimization) */}
            <div className="p-3 sm:p-3.5 border-t border-white/15 bg-[#050505] shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="flex items-center space-x-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Mahip's AI Agent..."
                  className="flex-1 bg-[#0a0a0a] border border-white/20 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#38BDF8] transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="p-2.5 sm:p-2.5 rounded-xl bg-[#38BDF8] text-black disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-all cursor-pointer font-bold touch-manipulation shrink-0"
                >
                  <Send className="w-4 h-4 text-black" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
