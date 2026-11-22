// src/components/auth/AuthLayout.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { SITE_CONFIG } from '@/config/constants';

const EASE = [0.22, 1, 0.36, 1];

const ROTATING_IMAGES = [
  '/images/rotate1.png',
  '/images/rotate2.jpeg',
  '/images/rotate3.webp',
];

export function AuthLayout({ children, mode = 'login' }) {
  const [imageIdx, setImageIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setImageIdx((i) => (i + 1) % ROTATING_IMAGES.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--acit-bg)] text-[var(--acit-text)] grid lg:grid-cols-2">
      {/* Left — Form */}
      <main className="relative flex flex-col px-6 py-8 md:px-12 lg:px-16">
        <div className="flex items-center justify-between mb-10">
          <Link to="/" className="flex items-center gap-2.5 font-heading text-lg font-bold">
            <img src={SITE_CONFIG.logo} alt="ACIT Logo" className="h-8 w-8 rounded-md object-contain" />
            <span>
              {SITE_CONFIG.name}
              <span className="text-acit-teal">.</span>
            </span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--acit-muted)] hover:text-[var(--acit-text)] transition-colors"
          >
            <FiArrowLeft size={16} /> Back to home
          </Link>
        </div>

        <div className="flex-1 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-10 text-xs text-[var(--acit-muted)] text-center lg:text-left">
          © {new Date().getFullYear()} {SITE_CONFIG.fullName}. All rights reserved.
        </p>
      </main>

      {/* Right — Rotating images */}
      <aside className="relative hidden lg:block overflow-hidden bg-[#0A0E14]">
        <AnimatePresence mode="wait">
          <motion.img
            key={imageIdx}
            src={ROTATING_IMAGES[imageIdx]}
            alt="ACIT club life"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 1.2, ease: EASE }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E14]/70 via-[#0A0E14]/30 to-[#0A0E14]/90" />

        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col justify-end p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            <p className="font-mono text-xs tracking-widest text-acit-teal mb-3">
              // together for it
            </p>
            <h2 className="font-heading text-4xl font-bold leading-tight mb-4 max-w-md">
              Build. Learn. Ship. Repeat.
            </h2>
            <p className="text-white/70 max-w-md">
              Join a community of builders turning curiosity into real projects.
            </p>
          </motion.div>

          {/* Dots indicator */}
          <div className="flex gap-2 mt-8">
            {ROTATING_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setImageIdx(i)}
                className={`h-1 rounded-full transition-all ${
                  i === imageIdx ? 'w-8 bg-acit-teal' : 'w-2 bg-white/30'
                }`}
                aria-label={`Show image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}