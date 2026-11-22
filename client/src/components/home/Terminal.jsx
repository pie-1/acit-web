// src/components/home/Terminal.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SCRIPT = [
  { type: "cmd", text: "acit init --research-module" },
  { type: "out", text: "✓ module loaded", tone: "ok" },
  { type: "cmd", text: "ls ~/club" },
  { type: "links" },
  { type: "cmd", text: "acit join" },
  { type: "out", text: "✓ access granted. welcome, builder.", tone: "ok" },
];
const LINKS = [
  { to: "/events", label: "events/" },
  { to: "/projects", label: "projects/" },
  { to: "/funzone", label: "funzone/" },
];

function useTerminal(animated) {
  const [lines, setLines] = useState(() =>
    animated ? [] : SCRIPT.map((s) => ({ ...s, shown: s.text || "" }))
  );
  const [done, setDone] = useState(!animated);

  useEffect(() => {
    if (!animated) return;
    let off = false;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      await sleep(900);
      for (let i = 0; i < SCRIPT.length; i++) {
        if (off) return;
        const s = SCRIPT[i];
        if (s.type === "cmd") {
          setLines((l) => [...l, { ...s, shown: "" }]);
          for (let c = 1; c <= s.text.length; c++) {
            await sleep(26 + Math.random() * 38);
            if (off) return;
            setLines((l) => l.map((x, k) => (k === i ? { ...x, shown: s.text.slice(0, c) } : x)));
          }
          await sleep(360);
        } else {
          setLines((l) => [...l, { ...s, shown: s.text || "" }]);
          await sleep(520);
        }
      }
      if (!off) setDone(true);
    })();
    return () => { off = true; };
  }, [animated]);

  return { lines, done };
}

function Caret() {
  return (
    <motion.span
      aria-hidden
      className="ml-0.5 inline-block h-[1.05em] w-[0.55em] translate-y-[2px] bg-acit-teal"
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
    />
  );
}

export function Terminal({ reduce }) {
  const { lines, done } = useTerminal(!reduce);
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1117] shadow-[0_30px_80px_-30px_rgba(15,138,133,.45)]">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] text-white/40">acit@club: ~</span>
      </div>
      <div className="min-h-[250px] space-y-2 p-5 font-mono text-[13px] leading-relaxed text-[#E6EDF3] sm:min-h-[270px] sm:text-sm" aria-label="Terminal showing how to join the club">
        {lines.map((l, i) => {
          const last = i === lines.length - 1;
          if (l.type === "cmd") {
            return (
              <p key={i}>
                <span className="text-acit-teal">$</span> {l.shown}
                {last && !done && <Caret />}
              </p>
            );
          }
          if (l.type === "links") {
            return (
              <motion.p key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="flex flex-wrap gap-x-5 gap-y-1 pl-3">
                {LINKS.map((k) => (
                  <Link key={k.to} to={k.to} className="text-[#7dd3cf] underline decoration-[#7dd3cf]/30 underline-offset-4 transition-colors hover:text-[#ff9a5c] hover:decoration-[#ff9a5c]/60">
                    {k.label}
                  </Link>
                ))}
              </motion.p>
            );
          }
          return (
            <motion.p key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className={`pl-3 ${l.tone === "ok" ? "text-[#4ade80]" : "text-white/60"}`}>
              {l.shown}
            </motion.p>
          );
        })}
        {done && (
          <p>
            <span className="text-acit-teal">$</span> <Caret />
          </p>
        )}
      </div>
    </div>
  );
}