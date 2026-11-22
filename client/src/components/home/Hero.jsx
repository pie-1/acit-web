// src/components/home/Hero.jsx
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { SITE_CONFIG } from "@/config/constants";
import HeroField from "./HeroField";
import { Terminal } from "./Terminal";

const EASE = [0.22, 1, 0.36, 1];

function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => { x.set(0); y.set(0); };
  return (
    <motion.div ref={ref} style={{ x, y }} onPointerMove={(e) => e.pointerType !== "touch" && onMove(e)} onPointerLeave={reset} className="inline-block">
      {children}
    </motion.div>
  );
}

const TOPICS = [
  { text: "React", color: "text-[#61DAFB]" },
  { text: "Node.js", color: "text-[#339933]" },
  { text: "Python", color: "text-[#3776AB]" },
  { text: "AI / ML", color: "text-[#FF6F00]" },
  { text: "IoT", color: "text-[#00A8E8]" },
  { text: "Cybersecurity", color: "text-[#D35400]" },
  { text: "Open Source", color: "text-[#F05032]" },
  { text: "Cloud", color: "text-[#0078D7]" },
  { text: "Research", color: "text-[#9C27B0]" },
  { text: "Hackathons", color: "text-[#E91E63]" },
];

function Ticker() {
  return (
    <div className="relative overflow-hidden border-y border-[var(--acit-border)] bg-[var(--acit-bg)]/60 py-3 backdrop-blur-sm">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex w-max items-center gap-10 whitespace-nowrap"
      >
        {[...TOPICS, ...TOPICS].map((t, i) => (
          <div key={i} className="flex items-center gap-10 font-mono text-xs uppercase tracking-[0.25em]">
            <span className={`${t.color} font-medium`}>{t.text}</span>
            <span className="text-[var(--acit-border)] text-lg">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export function Hero({ joinHref = "/join", eventsHref = "/events" }) {
  const reduce = useReducedMotion();
  const words = SITE_CONFIG.fullName.split(" ");

  // Ambient mouse glow
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 100, damping: 30 });
  const sy = useSpring(my, { stiffness: 100, damping: 30 });
  const glowX = useTransform(sx, (v) => v - 250);
  const glowY = useTransform(sy, (v) => v - 250);

  const onMove = (e) => {
    if (reduce) return;
    mx.set(e.clientX);
    my.set(e.clientY);
  };

  return (
    <section onPointerMove={onMove} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <HeroField className="absolute inset-0 -z-20 h-full w-full" />
      
      {/* Ambient glow that follows mouse */}
      <motion.div
        aria-hidden
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute left-0 top-0 -z-10 h-[500px] w-[500px] rounded-full bg-acit-teal/10 blur-[100px]"
      />
      <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 55% 60% at 28% 50%, var(--acit-bg) 20%, transparent 75%)", opacity: 0.85 }} />

      <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 px-6 pb-16 pt-28 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="max-w-2xl">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="mb-6 font-mono text-sm tracking-widest text-acit-teal">
            {"// build · break · learn · repeat"}
          </motion.p>

          <h1 className="mb-6 font-heading text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            <span className="sr-only">{SITE_CONFIG.fullName}</span>
            <span aria-hidden>
              {words.map((w, i) => (
                <span key={i} className="mr-[0.25em] inline-block overflow-hidden align-bottom">
                  <motion.span
                    className={`inline-block ${i === 0 ? "bg-gradient-to-r from-acit-teal via-[#2bb3ac] to-[#D35400] bg-clip-text text-transparent" : ""}`}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.09 }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55, ease: EASE }} className="mb-2 text-xl font-medium md:text-2xl text-[var(--acit-text)]">
            "{SITE_CONFIG.tagline}"
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65, ease: EASE }} className="mb-9 max-w-xl text-base text-[var(--acit-muted)] md:text-lg">
            A community of builders, dreamers, and problem solvers. We turn curiosity into code and ideas into real-world projects.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8, ease: EASE }} className="flex flex-col gap-4 sm:flex-row">
            <Magnetic>
              <Link to={eventsHref}>
                <Button variant="primary" size="lg" className="group gap-2 shadow-[0_12px_34px_-12px_rgba(15,138,133,.8)]">
                  Explore Events <FiArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
            </Magnetic>
            <Magnetic>
              <Link to={joinHref}>
                <Button variant="outline" size="lg" className="backdrop-blur-sm">
                  Join the Club
                </Button>
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, delay: 0.45, ease: EASE }} className="relative mx-auto w-full max-w-xl">
          <Terminal reduce={reduce} />
        </motion.div>
      </div>

      <Ticker />
    </section>
  );
}