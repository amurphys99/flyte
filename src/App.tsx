/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, AlertCircle, Mail, Tag, Clock, Zap, Users } from 'lucide-react';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}

const TOTAL_SPOTS = 100;
const INITIAL_CLAIMED = 68;
const INITIAL_WAITLIST = 247;

const perks = [
  { icon: Tag, label: 'Founding member rates' },
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
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [waitlistCount, setWaitlistCount] = useState(INITIAL_WAITLIST);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.55) {
        setWaitlistCount(c => c + 1);
      }
    }, 28000);
    return () => clearInterval(interval);
  }, []);

  const validate = (): boolean => {
    if (!email.trim()) {
      setError('Please enter your email address.');
      return false;
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validate()) return;

    setIsLoading(true);

    try {
      await fetch('https://services.leadconnectorhq.com/hooks/eGMcJ5uiCn23PTvKzhM6/webhook-trigger/28744af6-11a8-4f7f-924f-661446c5bc38', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      setIsSubmitted(true);
      setEmail('');
    } catch (err) {
      console.error('Error saving lead:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(null);
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-6 relative overflow-x-hidden bg-[#050505]">
      {/* Thank you modal */}
      <AnimatePresence>
        {isSubmitted && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.88, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 10 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              className="fixed inset-0 z-50 flex items-center justify-center px-6"
            >
              <div className="bg-[#111] border border-white/15 rounded-[28px] p-10 max-w-sm w-full flex flex-col items-center gap-5 text-center shadow-2xl">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-8 h-8 text-white/80" />
                </motion.div>
                <div className="space-y-2">
                  <h3 id="modal-title" className="text-2xl font-light text-white tracking-wide">
                    You're on the list.
                  </h3>
                  <p className="text-white/40 text-sm font-light leading-relaxed">
                    Your founding member spot is reserved. We'll be in touch with priority booking access, exclusive rates, and launch details before anyone else.
                  </p>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2 px-6 py-2.5 rounded-full border border-white/15 text-white/50 text-sm font-light hover:border-white/30 hover:text-white/70 transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {grainOverlay}
      {backgroundGradients}

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl text-center z-10 py-16 md:py-24">

        {/* Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="mb-10 md:mb-14"
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
          className="space-y-4 mb-8 md:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white/90 leading-snug">
            Cork's Only 5-Bay<br />TrackMan Facility.
          </h2>
          <p className="text-base sm:text-lg text-white/50 font-light leading-relaxed max-w-md mx-auto">
            Play on tour-grade technology — five simulators, one world-class venue. Coming soon to Cork City.
          </p>
        </motion.div>

        {/* Location Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-10 md:mb-12"
        >
          <span className="px-5 py-2 rounded-full border border-white/20 text-white/50 text-xs sm:text-sm tracking-widest uppercase font-light">
            Cork City, Ireland
          </span>
        </motion.div>

        {/* Perks */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="w-full max-w-md mb-8 md:mb-10"
        >
          {/* Mobile: horizontal pill list */}
          <div className="flex flex-col items-center gap-2 sm:hidden">
            {perks.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.55 + i * 0.1 }}
                className="flex items-center gap-2.5"
              >
                <Icon className="w-3.5 h-3.5 text-white/40 shrink-0" />
                <span className="text-white/55 text-sm font-light">{label}</span>
              </motion.div>
            ))}
          </div>

          {/* sm+: cards grid */}
          <div className="hidden sm:grid grid-cols-3 gap-3">
            {perks.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 + i * 0.1 }}
                className="flex flex-col items-center gap-2 px-3 py-4 rounded-2xl bg-white/[0.04] border border-white/[0.08]"
              >
                <Icon className="w-4 h-4 text-white/50" />
                <span className="text-white/60 text-xs font-light leading-snug text-center">{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social proof + Spots counter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="w-full max-w-md mb-10 md:mb-12 space-y-4"
        >
          {/* Social proof */}
          <div className="flex items-center justify-center gap-2">
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
          </div>

          {/* Founding spots progress bar */}
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
              {' '}— founding members receive discounted rates for life.
            </p>
          </div>
        </motion.div>

        {/* Email Capture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          className="w-full max-w-md px-2 sm:px-0"
        >
          <p className="text-white/40 text-sm font-light mb-4 leading-relaxed">
            Founding members get{' '}
            <span className="text-white/70">priority booking</span> and{' '}
            <span className="text-white/70">exclusive rates</span> — limited spots available.
          </p>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
            <div
              className={`flex flex-col sm:flex-row items-stretch gap-2 p-1.5 bg-white/[0.03] border rounded-[20px] backdrop-blur-md transition-all duration-500 ${
                error ? 'border-red-400/40' : 'border-white/10 focus-within:border-white/25'
              }`}
            >
              <div className="flex-1 flex items-center gap-2 px-4">
                <Mail className="w-4 h-4 text-white/20 shrink-0" />
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  className="flex-1 bg-transparent outline-none text-white placeholder:text-white/20 py-3 text-base font-light min-w-0"
                  aria-label="Email address"
                  aria-invalid={!!error}
                  aria-describedby={error ? 'email-error' : undefined}
                />
              </div>
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white text-black py-3 px-6 rounded-[14px] flex items-center justify-center gap-2 hover:bg-white/90 transition-colors duration-300 disabled:opacity-50 whitespace-nowrap shrink-0 relative overflow-hidden"
              >
                {/* Pulse ring */}
                <motion.span
                  className="absolute inset-0 rounded-[14px] border border-white/60"
                  animate={{ scale: [1, 1.12], opacity: [0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
                />
                <span className="text-sm font-medium tracking-wide relative z-10">
                  {isLoading ? 'Joining...' : 'Claim Your Spot'}
                </span>
                {!isLoading ? (
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    className="relative z-10"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                ) : null}
              </motion.button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  id="email-error"
                  role="alert"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="text-red-400/70 text-xs flex items-center gap-1.5 justify-center"
                >
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <p className="text-white/20 text-xs font-light text-center leading-relaxed pt-1">
              We'll only use your email to keep you updated. No spam, ever.
            </p>
          </form>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="pb-10 text-white/20 text-xs tracking-[0.2em] uppercase font-light z-10"
      >
        © Flyte Golf
      </motion.footer>
    </main>
  );
}
