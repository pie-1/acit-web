// src/components/home/HeroField.jsx
// A living dot-grid with drifting code glyphs. The grid lights up (teal to orange) around the pointer,
// clicks send out a ring, and touch screens get a slow scanner that roams by itself.
// It reads its colour from the page theme, so light and dark both work, and it replaces tsparticles.
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const GAP = 34;
const REACH = 190;
const TEAL = [15, 138, 133];
const ORANGE = [211, 84, 0];
const GLYPHS = ["{}", "</>", "git", "npm", "0x", "=>", "01", ";", "fn()", "&&", "#!", "[]"];
const mix = (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
const rgba = (c, a) => `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a.toFixed(3)})`;

export default function HeroField({ className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const touch = window.matchMedia("(hover: none)").matches;
    let W = 0, H = 0, dpr = 1, raf = 0, visible = true, last = performance.now();
    let ink = [139, 148, 158];
    let glyphs = [];
    const ripples = [];
    const p = { x: -999, y: -999, tx: -999, ty: -999, on: 0, want: 0, seen: false, idleSince: performance.now() };

    const readInk = () => {
      const m = getComputedStyle(canvas).color.match(/[\d.]+/g);
      if (m) ink = [+m[0], +m[1], +m[2]];
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      const n = Math.max(8, Math.min(22, Math.round(W / 80)));
      glyphs = Array.from({ length: n }, (_, i) => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vy: 6 + Math.random() * 14,
        size: 11 + Math.random() * 9,
        depth: 0.4 + Math.random() * 0.6,
        t: GLYPHS[i % GLYPHS.length],
        c: i % 3 === 0 ? TEAL : i % 3 === 1 ? ORANGE : null,
        a: 0.1 + Math.random() * 0.16,
        ox: 0,
        oy: 0,
      }));
      readInk();
      if (reduce) frame(performance.now(), true);
    };

    const onMove = (e) => {
      if (e.pointerType === "touch") return;
      const r = canvas.getBoundingClientRect();
      p.tx = e.clientX - r.left;
      p.ty = e.clientY - r.top;
      if (!p.seen || !p.want) { p.x = p.tx; p.y = p.ty; }
      p.seen = true;
      p.want = 1;
      p.idleSince = performance.now();
    };
    const onLeave = () => (p.want = 0);
    const onClick = (e) => {
      if (e.target.closest?.("a,button")) return;
      const r = canvas.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) return;
      ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, t0: performance.now() / 1000 });
      if (ripples.length > 5) ripples.shift();
    };

    function frame(ts, once = false) {
      if (!once) raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (ts - last) / 1000);
      last = ts;
      if (!visible && !once) return;
      const t = ts / 1000;

      // a roaming scanner for touch screens, and for a desktop visitor who has not moved the mouse yet
      if (!reduce && (touch || (!p.seen && ts > 1500))) {
        p.tx = W * (0.5 + 0.28 * Math.sin(t * 0.35)) ;
        p.ty = H * (0.5 + 0.22 * Math.sin(t * 0.52 + 1));
        if (!p.want) { p.x = p.tx; p.y = p.ty; }
        p.want = 1;
      }
      p.x += (p.tx - p.x) * 0.12;
      p.y += (p.ty - p.y) * 0.12;
      p.on += (p.want - p.on) * 0.08;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const cols = Math.ceil(W / GAP) + 1;
      const rows = Math.ceil(H / GAP) + 1;
      const offX = (W % GAP) / 2;
      const offY = (H % GAP) / 2;
      const nowS = performance.now() / 1000;
      const live = ripples.filter((r) => nowS - r.t0 < 1.7);
      ripples.length = 0;
      ripples.push(...live);

      // pass 1: every quiet dot in one path
      ctx.fillStyle = rgba(ink, 0.2);
      ctx.beginPath();
      const hot = [];
      for (let j = 0; j < rows; j++) {
        const y = offY + j * GAP;
        for (let i = 0; i < cols; i++) {
          const x = offX + i * GAP;
          const dx = x - p.x;
          const dy = y - p.y;
          const d = Math.hypot(dx, dy);
          let f = d < REACH ? (1 - d / REACH) * p.on : 0;
          f *= f;
          let ring = 0;
          for (const r of live) {
            const age = nowS - r.t0;
            const rd = Math.hypot(x - r.x, y - r.y);
            const g = (rd - age * 420) / 28;
            if (g > -3 && g < 3) ring = Math.max(ring, Math.exp(-g * g) * (1 - age / 1.7));
          }
          if (f < 0.02 && ring < 0.02) ctx.rect(x - 1, y - 1, 2, 2);
          else hot.push(x, y, f, ring);
        }
      }
      ctx.fill();

      // pass 2: the dots the pointer or a ripple has reached
      for (let k = 0; k < hot.length; k += 4) {
        const f = hot[k + 2];
        const ring = hot[k + 3];
        const c = ring > f ? mix(TEAL, ORANGE, Math.min(1, ring * 1.2)) : mix(mix(ink, TEAL, Math.min(1, f * 2.2)), ORANGE, Math.max(0, f - 0.55) * 2);
        const s = 2 + 3.4 * f + 4.5 * ring;
        ctx.fillStyle = rgba(c, Math.min(0.95, 0.2 + 0.7 * f + 0.8 * ring));
        ctx.fillRect(hot[k] - s / 2, hot[k + 1] - s / 2, s, s);
      }

      // drifting glyphs
      ctx.font = "500 13px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.textBaseline = "middle";
      for (const g of glyphs) {
        if (!reduce) {
          g.y -= g.vy * g.depth * dt;
          if (g.y < -30) { g.y = H + 30; g.x = Math.random() * W; }
        }
        const px = g.x + (p.x - W / 2) * -0.03 * g.depth + g.ox;
        const py = g.y + g.oy;
        const dx = px - p.x;
        const dy = py - p.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < 150 && p.on > 0.05) {
          const push = ((150 - d) / 150) * 40 * p.on;
          g.ox += (dx / d * push - g.ox) * 0.08;
          g.oy += (dy / d * push - g.oy) * 0.08;
        } else {
          g.ox *= 0.94;
          g.oy *= 0.94;
        }
        const edge = Math.min(1, py / 90, (H - py) / 90);
        ctx.font = `500 ${g.size}px ui-monospace, SFMono-Regular, Menlo, monospace`;
        ctx.fillStyle = rgba(g.c || ink, g.a * Math.max(0, edge) * (g.c ? 1.4 : 1));
        ctx.fillText(g.t, px, py);
      }

      // the scanner ring and its readout
      if (p.on > 0.05 && !reduce) {
        ctx.strokeStyle = rgba(TEAL, 0.35 * p.on);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 34 + Math.sin(t * 3) * 2, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(p.x - 46, p.y); ctx.lineTo(p.x - 24, p.y);
        ctx.moveTo(p.x + 24, p.y); ctx.lineTo(p.x + 46, p.y);
        ctx.moveTo(p.x, p.y - 46); ctx.lineTo(p.x, p.y - 24);
        ctx.moveTo(p.x, p.y + 24); ctx.lineTo(p.x, p.y + 46);
        ctx.stroke();
        ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.fillStyle = rgba(TEAL, 0.7 * p.on);
        ctx.textBaseline = "alphabetic";
        ctx.fillText(`x:${Math.round(p.x)} y:${Math.round(p.y)}`, p.x + 40, p.y - 40);
      }
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    // follow the site theme (the toggle changes a class or data attribute on <html>)
    const mo = new MutationObserver(() => requestAnimationFrame(() => { readInk(); if (reduce) frame(performance.now(), true); }));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme", "style"] });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("click", onClick);
    if (!reduce) raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("click", onClick);
    };
  }, [reduce]);

  // the colour class gives the canvas its ink: it follows --acit-muted in both themes
  return <canvas ref={ref} aria-hidden className={`pointer-events-none text-[var(--acit-muted)] ${className}`} />;
}