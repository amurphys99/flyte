/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tag, Clock, Zap, Users } from 'lucide-react';

const TOTAL_SPOTS = 100;
const INITIAL_CLAIMED = 68;
const INITIAL_WAITLIST = 247;

const perks = [
  { icon: Tag, label: 'Founding member access' },
  { icon: Clock, label: 'Priority booking' },
  { icon: Zap, label: 'Exclusive launch events' },
];

const claimedPct = (INITIAL_CLAIMED / TOTAL_SPOTS) * 100;

// Static — hoisted to avoid recreation on every render (rendering-hoist-jsx)
const grainOverlay = (
  <div
    className="fixed inset-0 pointer-events-none z-20 opacity-[0.035]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
      backgroundSize: '128px 128px',
    }}
  />
);

const backgroundGradients = (
  <div className="absolute inset-0 pointer-events-none">
    <div
      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[55%]"
      style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(22,48,32,0.22) 0%, transparent 70%)' }}
    />
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[45%]"
      style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(12,18,38,0.28) 0%, transparent 70%)' }}
    />
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
      style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.03) 0%, transparent 65%)' }}
    />
  </div>
);

export default function App() {
  const [waitlistCount, setWaitlistCount] = useState(INITIAL_WAITLIST);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.55) {
        setWaitlistCount(c => c + 1);
      }
    }, 28000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded focus:outline-none"
      >
        Skip to main content
      </a>
      <main id="main-content" className="min-h-screen flex flex-col items-center px-6 relative overflow-x-hidden bg-[#050505]">
      {grainOverlay}
      {backgroundGradients}

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl text-center z-10 py-12 md:py-20">

        {/* Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="mb-6 md:mb-8"
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-light tracking-[0.3em] text-white uppercase">
            Flyte
            <span className="sr-only"> Golf — TrackMan Golf Simulator, Cork City</span>
          </h1>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
            className="mt-4 mx-auto h-px w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="space-y-3 mb-8 md:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white/90 leading-snug">
            Cork's Only 5-Bay<br />TrackMan Facility.
          </h2>
          <p className="text-base sm:text-lg text-white/50 font-light leading-relaxed max-w-md mx-auto">
            Play on tour-grade technology — five simulators, one world-class venue. Coming soon to Cork City.
          </p>
        </motion.div>

        {/* Klaviyo Email Capture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
          className="w-full max-w-md px-2 sm:px-0 mb-10 md:mb-14"
        >
          <div className="klaviyo-form-WNgWZF"></div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full max-w-md h-px bg-white/[0.06] mb-10 md:mb-14"
        />

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex items-center justify-center gap-2 mb-6"
        >
          <Users className="w-3.5 h-3.5 text-white/30 shrink-0" />
          <p className="text-white/40 text-sm font-light">
            <AnimatePresence mode="wait">
              <motion.span
                key={waitlistCount}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.3 }}
                className="text-white/70 font-normal"
              >
                {waitlistCount.toLocaleString()}
              </motion.span>
            </AnimatePresence>
            {' '}Cork golfers already on the waitlist
          </p>
        </motion.div>

        {/* Founding spots progress bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-md mb-8 md:mb-10"
        >
          <div className="px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white/55 text-xs font-light tracking-wide">Founding member spots</span>
              <span className="text-white/45 text-xs font-light">
                <span className="text-white/80 font-normal">{INITIAL_CLAIMED}</span>
                {' '}/ {TOTAL_SPOTS} claimed
              </span>
            </div>
            <div className="w-full h-1 bg-white/[0.08] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${claimedPct}%` }}
                transition={{ duration: 1.4, delay: 0.9, ease: 'easeOut' }}
                className="h-full bg-white/55 rounded-full"
              />
            </div>
            <p className="text-white/35 text-xs font-light text-left">
              Only{' '}
              <span className="text-white/65">{TOTAL_SPOTS - INITIAL_CLAIMED} spots remaining</span>
              {' '}— secure your spot before we open to the public.
            </p>
          </div>
        </motion.div>

        {/* Perks */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: 'easeOut' }}
          className="w-full max-w-md mb-8"
        >
          {/* Mobile */}
          <div className="flex flex-col items-center gap-2 sm:hidden">
            {perks.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                className="flex items-center gap-2.5"
              >
                <Icon className="w-3.5 h-3.5 text-white/40 shrink-0" />
                <span className="text-white/55 text-sm font-light">{label}</span>
              </motion.div>
            ))}
          </div>

          {/* sm+ */}
          <div className="hidden sm:grid grid-cols-3 gap-3">
            {perks.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
                className="flex flex-col items-center gap-2 px-3 py-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]"
              >
                <Icon className="w-4 h-4 text-white/50" />
                <span className="text-white/60 text-xs font-light leading-snug text-center">{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Location Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <span className="px-5 py-2 rounded-full border border-white/20 text-white/50 text-xs sm:text-sm tracking-widest uppercase font-light">
            Cork City, Ireland
          </span>
        </motion.div>

      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="pb-10 flex items-center gap-6 text-white/20 text-xs tracking-[0.2em] uppercase font-light z-10"
      >
        <span>© Flyte Golf</span>
        <a href="/privacy" className="hover:text-white/40 transition-colors">Privacy Policy</a>
      </motion.footer>
    </main>
    </>
  );
}
