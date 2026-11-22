// src/components/home/Hero.jsx
import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
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

const TOPICS = ["React", "Node.js", "Python", "AI / ML", "IoT", "Cybersecurity", "Open Source", "Cloud", "Research", "Hackathons", "Linux", "Data"];

function Ticker({ items = TOPICS }) {
  const track = useRef(null);
  const reduce = useReducedMotion();
  // (Same as your code — keeping it identical)
  return (
    <div className="relative overflow-hidden border-y border-[var(--acit-border)] bg-[var(--acit-bg)]/60 py-3 backdrop-blur-sm"
         style={{ maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)" }}>
      <div ref={track} className="flex w-max items-center gap-8 whitespace-nowrap will-change-transform">
        {[...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-8 font-mono text-xs uppercase tracking-[0.25em] text-[var(--acit-muted)]">
            {t}
            <span className={i % 2 ? "text-[#D35400]" : "text-acit-teal"}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Hero({ joinHref = "/join", eventsHref = "/events" }) {
  const reduce = useReducedMotion();
  const words = SITE_CONFIG.fullName.split(" ");

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 20 });
  const sy = useSpring(my, { stiffness: 90, damping: 20 });
  const rotY = useTransform(sx, [-1, 1], [-6, 6]);
  const rotX = useTransform(sy, [-1, 1], [5, -5]);
  const onMove = (e) => {
    if (reduce || e.pointerType === "touch") return;
    mx.set((e.clientX / window.innerWidth - 0.5) * 2);
    my.set((e.clientY / window.innerHeight - 0.5) * 2);
  };

  return (
    <section onPointerMove={onMove} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <HeroField className="absolute inset-0 -z-20 h-full w-full" />
      <div aria-hidden className="absolute inset-0 -z-10" style={{ background: "radial-gradient(ellipse 55% 60% at 28% 50%, var(--acit-bg) 20%, transparent 75%)", opacity: 0.85 }} />
      <div aria-hidden className="absolute -right-40 top-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-acit-teal/20 blur-[110px]" />
      <div aria-hidden className="absolute -left-32 bottom-10 -z-10 h-[320px] w-[320px] rounded-full bg-[#D35400]/10 blur-[110px]" />

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
                    initial={{ y: "110%" }} animate={{ y: 0 }}
                    transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.09 }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55, ease: EASE }} className="mb-2 text-xl font-medium md:text-2xl">
            "{SITE_CONFIG.tagline}"
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65, ease: EASE }} className="mb-9 max-w-xl text-base text-[var(--acit-muted)] md:text-lg">
            Building tomorrow's innovators, one commit at a time.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8, ease: EASE }} className="flex flex-col gap-4 sm:flex-row">
            <Magnetic>
              <Link to={eventsHref}>
                <Button variant="primary" size="lg" className="group gap-2 shadow-[0_12px_34px_-12px_rgba(15,138,133,.8)]">
                  Explore Events <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
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

        <motion.div initial={{ opacity: 0, y: 40, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, delay: 0.45, ease: EASE }} className="relative mx-auto w-full max-w-xl [perspective:1000px]">
          <motion.div style={reduce ? undefined : { rotateX: rotX, rotateY: rotY }} className="relative">
            <Terminal reduce={reduce} />
          </motion.div>
        </motion.div>
      </div>

      <Ticker />
    </section>
  );
}

export { Ticker };