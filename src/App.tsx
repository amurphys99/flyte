/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, AlertCircle, Mail } from 'lucide-react';
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}

export default function App() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      await Promise.all([
        addDoc(collection(db, 'leads'), {
          email: email.trim().toLowerCase(),
          createdAt: serverTimestamp(),
        }),
        fetch('https://services.leadconnectorhq.com/hooks/eGMcJ5uiCn23PTvKzhM6/webhook-trigger/28744af6-11a8-4f7f-924f-661446c5bc38', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email.trim().toLowerCase() }),
        }),
      ]);
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
                    Thank you for joining!
                  </h3>
                  <p className="text-white/40 text-sm font-light leading-relaxed">
                    You're in. Flyte early access is yours — be the first to know when we open, get exclusive updates, and hear about founding member perks before anyone else.
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

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] bg-white/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl text-center z-10 py-16 md:py-24">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="mb-10 md:mb-14"
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-light tracking-[0.3em] text-white uppercase">
            Flyte
          </h1>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="space-y-4 mb-8 md:mb-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white/90 leading-snug">
            Elevate Your Game.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/40 font-light tracking-wide max-w-md mx-auto">
            Premium indoor golf simulators. Coming soon.
          </p>
        </motion.div>

        {/* Location Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-12 md:mb-16"
        >
          <span className="px-5 py-2 rounded-full border border-white/10 text-white/30 text-xs sm:text-sm tracking-widest uppercase font-light">
            Cork City, Ireland
          </span>
        </motion.div>

        {/* Email Capture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="w-full max-w-md px-2 sm:px-0"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
                <p className="text-white/30 text-sm font-light mb-4 tracking-wide">
                  Be the first to know when we open.
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
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-white text-black py-3 px-6 rounded-[14px] flex items-center justify-center gap-2 hover:bg-white/90 active:scale-[0.97] transition-all duration-300 disabled:opacity-50 disabled:scale-100 whitespace-nowrap shrink-0"
                    >
                      <span className="text-sm font-medium tracking-wide">
                        {isLoading ? 'Joining...' : 'Get Early Access'}
                      </span>
                      {!isLoading && (
                        <motion.div
                          animate={{ x: [0, 3, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      )}
                    </button>
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
                </form>
            </motion.div>
          </AnimatePresence>
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
