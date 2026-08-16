'use client';

import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import ContactCard, { CONTACT_CARDS_DATA } from './ContactCard';
import { Calendar, ArrowUpRight, X, Clock, User, Mail, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ExecutiveBoardroomContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  const [mounted, setMounted] = useState(false);
  const [viewCount, setViewCount] = useState<number | null>(null);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [meetingSubmitted, setMeetingSubmitted] = useState(false);

  // Form State for Schedule Meeting Modal
  const [meetingName, setMeetingName] = useState('');
  const [meetingEmail, setMeetingEmail] = useState('');
  const [meetingDateTime, setMeetingDateTime] = useState('');
  const [meetingNotes, setMeetingNotes] = useState('');

  // Real-Time Live View Counter with LocalStorage & Hydration Safety (Zero Flash)
  useEffect(() => {
    setMounted(true);
    try {
      const storedViews = localStorage.getItem('mahip_portfolio_views');
      let count = storedViews ? parseInt(storedViews, 10) : 1485;
      count += 1;
      localStorage.setItem('mahip_portfolio_views', count.toString());
      setViewCount(count);

      // Periodic live count tick (+1 every ~45s) for live visitor simulation
      const interval = setInterval(() => {
        setViewCount((prev) => {
          if (prev === null) return 1485;
          const next = prev + 1;
          localStorage.setItem('mahip_portfolio_views', next.toString());
          return next;
        });
      }, 45000);
      return () => clearInterval(interval);
    } catch {
      setViewCount(1485);
    }
  }, []);

  // Scroll Lock, Hide Navbar, & Freeze Background Scroll when Schedule Meeting Modal is Open
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('meeting-modal-toggle', { detail: { open: isMeetingModalOpen } }));
    }
    if (isMeetingModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('meeting-modal-toggle', { detail: { open: false } }));
      }
    };
  }, [isMeetingModalOpen]);

  const [submittedMailUrls, setSubmittedMailUrls] = useState({ mailtoUrl: '', webGmailUrl: '' });

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingName.trim() || !meetingEmail.trim() || !meetingDateTime) return;

    const formattedDate = new Date(meetingDateTime).toLocaleString('en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
    });

    const payload = {
      name: meetingName.trim(),
      email: meetingEmail.trim(),
      dateTime: formattedDate,
      notes: meetingNotes.trim() || 'No specific agenda provided.',
      timestamp: new Date().toISOString(),
    };

    // Save meeting request in localStorage
    try {
      const stored = localStorage.getItem('mahip_portfolio_meetings');
      const existing = stored ? JSON.parse(stored) : [];
      existing.push(payload);
      localStorage.setItem('mahip_portfolio_meetings', JSON.stringify(existing));
    } catch (err) {
      console.error('Failed to save meeting request:', err);
    }

    // Direct Native Gmail App / Mail App Launcher
    const subject = `Meeting Schedule Request from ${meetingName.trim()}`;
    const body = `Meeting Schedule Request\n\nRequester Name: ${meetingName.trim()}\nRequester Email: ${meetingEmail.trim()}\nRequested Date & Time: ${formattedDate}\nAgenda / Notes: ${meetingNotes.trim() || 'N/A'}\nSubmitted On: ${new Date().toLocaleString()}\n\nPlease click Send to confirm your meeting request. Thank you!`;

    const mailtoUrl = `mailto:bansalmahip84@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const webGmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=bansalmahip84@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setSubmittedMailUrls({ mailtoUrl, webGmailUrl });

    // Open native Gmail App / Email Client directly on mobile phones
    try {
      window.location.href = mailtoUrl;
    } catch {
      window.open(webGmailUrl, '_blank');
    }

    setMeetingSubmitted(true);
  };

  const availabilityTags = [
    'AI Projects',
    'Software Engineering',
    'Full Stack Development',
    'Research Collaboration',
    'Freelancing',
  ];

  return (
    <section
      id="contact-boardroom"
      ref={sectionRef}
      className="w-full pt-4 pb-8 px-4 sm:px-8 relative bg-[#050505] flex flex-col justify-between z-20 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col justify-between space-y-10 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-1.5 text-left"
        >
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
            <h3 className="text-slate-200 text-xs font-mono tracking-[0.2em] uppercase font-bold">
              FINAL INVESTMENT
            </h3>
          </div>
          <h2 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-200">
            Let's Build Something Valuable Together
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-2xl mt-1 leading-relaxed font-mono">
            "Great partnerships begin with a conversation. Let's discuss your next product, idea or opportunity."
          </p>
        </motion.div>

        {/* Parallel Frameless Layout: Heading on Far Left | Logos Centered in Middle */}
        <div className="w-full relative flex flex-col md:flex-row items-center justify-center py-4 bg-[#050505] overflow-visible min-h-[60px]">
          {/* Heading on Far Left */}
          <h3 className="md:absolute md:left-0 text-base sm:text-lg font-bold text-slate-200 font-mono tracking-tight text-center md:text-left mb-3 md:mb-0">
            Connect & Collaborate
          </h3>

          {/* Logos Centered in the Middle */}
          <div className="flex items-center justify-center gap-6 sm:gap-12 overflow-visible">
            {CONTACT_CARDS_DATA.map((card, idx) => (
              <ContactCard
                key={card.id}
                card={card}
                index={idx}
                onCustomClick={
                  card.id === 'meeting'
                    ? () => {
                        setMeetingSubmitted(false);
                        setIsMeetingModalOpen(true);
                      }
                    : undefined
                }
              />
            ))}
          </div>
        </div>



        {/* Executive Minimal Footer */}
        <footer className="pt-10 pb-4 w-full flex flex-col items-center justify-center space-y-4 border-t border-white/10 font-mono text-center">
          {/* Quote Line */}
          <p className="text-gray-300 italic text-sm sm:text-base font-serif tracking-wide">
            "Your time is an investment. Let’s make it worth it"
          </p>

          {/* Designed & Made by Mahip Bansal */}
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-white font-mono font-medium">
            <span>Designed & Made by</span>
            <span className="font-bold text-slate-100 underline decoration-white underline-offset-4 decoration-2">Mahip Bansal</span>
          </div>

          {/* Bottom Bar: Rights & Live Views Counter (Centered Under Name with Outer Spread) */}
          <div className="w-full pt-3 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-[11px] text-gray-500 font-mono">
            <span>2026. All rights reserved</span>
            <span className="flex items-center gap-1.5" title="Real-Time Portfolio Views">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E676] animate-pulse" />
              <span className="font-semibold text-gray-400">
                Views #{mounted && viewCount !== null ? viewCount.toLocaleString() : '...'}
              </span>
            </span>
          </div>
        </footer>

      </div>

      {/* Schedule A Meeting Interactive Modal Portal (Attached directly to document.body with z-[99999]) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isMeetingModalOpen && (
              /* Executive Pure Black Modal Overlay (z-[99999] - 100% Solid Black Backdrop, hides navbar & all content) */
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-[#050505]"
                onClick={() => setIsMeetingModalOpen(false)}
              >
                {/* Centered Calendar Executive Booking Card */}
                <motion.div
                  initial={{ scale: 0.95, opacity: 0, y: 15 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.95, opacity: 0, y: 15 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-lg bg-[#0a0d14] border border-white/20 rounded-2xl p-6 sm:p-7 shadow-[0_0_60px_rgba(0,0,0,0.95)] space-y-5 font-mono text-xs relative overflow-hidden"
                >
                  {/* Top Modal Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-[#00E676]" />
                      <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
                        Schedule Executive Meeting
                      </h3>
                    </div>
                    <button
                      onClick={() => setIsMeetingModalOpen(false)}
                      className="p-1 rounded-lg text-gray-400 hover:text-white bg-[#0a0a0a] border border-white/10 hover:border-white/30 transition-all cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {meetingSubmitted ? (
                    <div className="py-6 flex flex-col items-center justify-center text-center space-y-4 font-mono">
                      <CheckCircle2 className="w-12 h-12 text-[#00E676] animate-bounce" />
                      <div className="space-y-1">
                        <h4 className="text-base font-bold text-slate-100">
                          Meeting Request Prepared — Thank you, {meetingName}!
                        </h4>
                        <p className="text-xs text-gray-400 max-w-md leading-relaxed">
                          Your email client has been launched with your pre-filled meeting request for <span className="text-[#00E676] font-bold">{new Date(meetingDateTime).toLocaleString()}</span>. Simply click <span className="text-white font-bold">Send</span> to deliver it directly to Mahip Bansal.
                        </p>
                      </div>

                      {/* Dual Mail Launch Options: Direct Native Gmail App & Web Gmail */}
                      <div className="flex items-center gap-3 justify-center pt-2 flex-wrap">
                        <a
                          href={submittedMailUrls.mailtoUrl}
                          className="px-4 py-2.5 rounded-xl bg-[#00E676] text-black font-extrabold text-xs tracking-wider hover:bg-[#00E676]/90 transition-all flex items-center gap-1.5 shadow-lg shadow-[#00E676]/20"
                        >
                          <Mail className="w-4 h-4" /> Open Gmail / Mail App
                        </a>
                        <a
                          href={submittedMailUrls.webGmailUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2.5 rounded-xl bg-gray-800 text-gray-200 font-extrabold text-xs tracking-wider hover:bg-gray-700 hover:text-white transition-all flex items-center gap-1.5 border border-white/15"
                        >
                          Open Web Gmail
                        </a>
                      </div>

                      <button
                        onClick={() => setIsMeetingModalOpen(false)}
                        className="mt-2 px-5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 text-xs font-semibold transition-all border border-white/10"
                      >
                        Close Window
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleScheduleSubmit} className="space-y-4">
                      {/* Requester Identity: Name */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400 uppercase tracking-widest flex items-center gap-1">
                          <User className="w-3 h-3 text-slate-200" />
                          <span>Your Full Name *</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={meetingName}
                          onChange={(e) => setMeetingName(e.target.value)}
                          placeholder="e.g. John Doe / Alex Vance"
                          className="w-full bg-[#0a0a0a] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all"
                        />
                      </div>

                      {/* Requester Identity: Email */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400 uppercase tracking-widest flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-200" />
                          <span>Your Email Address *</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={meetingEmail}
                          onChange={(e) => setMeetingEmail(e.target.value)}
                          placeholder="name@company.com"
                          className="w-full bg-[#0a0a0a] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all"
                        />
                      </div>

                      {/* Meeting Date & Time Selector */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400 uppercase tracking-widest flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#00E676]" />
                          <span>Select Preferred Date & Time *</span>
                        </label>
                        <input
                          type="datetime-local"
                          required
                          value={meetingDateTime}
                          onChange={(e) => setMeetingDateTime(e.target.value)}
                          className="w-full bg-[#0a0a0a] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/50 transition-all [color-scheme:dark]"
                        />
                      </div>

                      {/* Topic / Agenda Notes */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-gray-400 uppercase tracking-widest flex items-center gap-1">
                          <MessageSquare className="w-3 h-3 text-slate-200" />
                          <span>Meeting Topic / Agenda (Optional)</span>
                        </label>
                        <textarea
                          rows={2}
                          value={meetingNotes}
                          onChange={(e) => setMeetingNotes(e.target.value)}
                          placeholder="Briefly describe what you'd like to discuss..."
                          className="w-full bg-[#0a0a0a] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white/50 transition-all resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2 flex items-center justify-end space-x-2">
                        <button
                          type="button"
                          onClick={() => setIsMeetingModalOpen(false)}
                          className="px-4 py-2 rounded-xl bg-transparent border border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-200 text-black font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 cursor-pointer shadow-lg"
                        >
                          <span>Open Gmail & Confirm Schedule</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </form>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}
