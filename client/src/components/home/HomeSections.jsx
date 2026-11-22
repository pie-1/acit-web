// src/components/home/HomeSections.jsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { FiArrowRight, FiCalendar, FiMapPin, FiRotateCcw } from "react-icons/fi";

const EASE = [0.22, 1, 0.36, 1];
const day = (n) => new Date(Date.now() + n * 864e5).toISOString();

export const SAMPLE_EVENTS = [
  { _id: "e1", title: "Intro to Git & GitHub", date: day(4), location: "Lab 2", tag: "Workshop", blurb: "Fork, branch, merge. Stop emailing zip files to yourself." },
  { _id: "e2", title: "24h College Hackathon", date: day(16), location: "Main Hall", tag: "Hackathon", blurb: "Teams of four, one problem, too much chai." },
  { _id: "e3", title: "AI Paper Reading Night", date: day(27), location: "Seminar Room", tag: "Research", blurb: "One paper, one hour, everyone argues." },
];

export const SAMPLE_PROJECTS = [
  { _id: "p1", title: "CampusMap", stack: ["React", "Leaflet"], status: "Live", blurb: "Find any classroom in under 10 seconds.", big: true },
  { _id: "p2", title: "AttendBot", stack: ["Node", "Telegram"], status: "Beta", blurb: "Attendance without the paper sheet." },
  { _id: "p3", title: "NotesHub", stack: ["MERN"], status: "Building", blurb: "Past papers and notes, searchable." },
  { _id: "p4", title: "LabLink", stack: ["IoT", "Python"], status: "Idea", blurb: "Lab equipment booking with QR codes." },
];

const STATUS_CLS = {
  Live: "text-emerald-400 border-emerald-400/30",
  Beta: "text-amber-400 border-amber-400/30",
  Building: "text-sky-400 border-sky-400/30",
  Idea: "text-[var(--acit-muted)] border-[var(--acit-border)]",
};

function Heading({ kicker, title, sub, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="mb-12 flex flex-wrap items-end justify-between gap-4"
    >
      <div>
        <p className="mb-3 font-mono text-sm tracking-widest text-acit-teal">{kicker}</p>
        <h2 className="font-heading text-3xl font-bold md:text-5xl">{title}</h2>
        {sub && <p className="mt-3 max-w-xl text-[var(--acit-muted)]">{sub}</p>}
      </div>
      {action}
    </motion.div>
  );
}

const glow = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

const GlowLayer = () => (
  <div
    aria-hidden
    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [@media(hover:none)]:hidden"
    style={{
      background: "radial-gradient(280px circle at var(--mx,50%) var(--my,0%), rgba(15,138,133,.16), transparent 65%)",
    }}
  />
);

/* Countdown */
function useCountdown(iso) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const ms = new Date(iso).getTime() - now;
  if (!(ms > 0)) return null;
  const s = Math.floor(ms / 1000);
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}
const pad = (n) => String(n).padStart(2, "0");

function Countdown({ iso }) {
  const c = useCountdown(iso);
  if (!c) return <span className="font-mono text-xs text-[var(--acit-muted)]">happening now / done</span>;
  return (
    <div className="flex gap-2 font-mono" aria-label={`${c.d} days ${c.h} hours left`}>
      {[["d", c.d], ["h", c.h], ["m", c.m], ["s", c.s]].map(([k, v]) => (
        <div key={k} className="min-w-[44px] rounded-lg border border-[var(--acit-border)] bg-[var(--acit-bg)] px-2 py-1.5 text-center">
          <div className="text-lg font-bold tabular-nums leading-none text-acit-teal">{pad(v)}</div>
          <div className="mt-0.5 text-[9px] uppercase tracking-widest text-[var(--acit-muted)]">{k}</div>
        </div>
      ))}
    </div>
  );
}

/* Mission Briefs */
export function MissionBriefs({ events }) {
  const list = (events && events.length ? events : SAMPLE_EVENTS).slice(0, 3);
  const [first, ...rest] = list;
  const fmt = (d) => new Date(d).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Heading
        kicker="// 01 · mission briefs"
        title="What's happening next"
        sub="Workshops, hackathons and reading nights. Show up, build something, go home with a new skill."
        action={
          <Link to="/events" className="group inline-flex items-center gap-2 text-sm font-medium text-acit-teal">
            All events <FiArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        }
      />
      <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          onPointerMove={glow}
          className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[var(--acit-border)] bg-[var(--acit-surface)] p-8 transition-colors hover:border-acit-teal/50"
        >
          <GlowLayer />
          <div className="relative">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-acit-teal/30 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-acit-teal">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acit-teal opacity-60" />
                <span className="relative h-2 w-2 rounded-full bg-acit-teal" />
              </span>
              Next up · {first.tag}
            </span>
            <h3 className="mb-3 font-heading text-3xl font-bold md:text-4xl">{first.title}</h3>
            <p className="mb-6 max-w-md text-[var(--acit-muted)]">{first.blurb}</p>
            <p className="mb-6 flex flex-wrap gap-x-5 gap-y-1 text-sm text-[var(--acit-muted)]">
              <span className="inline-flex items-center gap-1.5"><FiCalendar size={14} />{fmt(first.date)}</span>
              <span className="inline-flex items-center gap-1.5"><FiMapPin size={14} />{first.location}</span>
            </p>
          </div>
          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <Countdown iso={first.date} />
            <Link to="/events" className="inline-flex items-center gap-2 rounded-xl bg-acit-teal px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5">
              Save my seat <FiArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
        <div className="flex flex-col gap-5">
          {rest.map((e, i) => (
            <motion.div
              key={e._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 + i * 0.1 }}
              onPointerMove={glow}
              className="group relative flex-1 overflow-hidden rounded-2xl border border-[var(--acit-border)] bg-[var(--acit-surface)] p-6 transition-colors hover:border-acit-teal/50"
            >
              <GlowLayer />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-[#D35400]">{e.tag}</p>
                  <h3 className="mb-1.5 font-heading text-xl font-bold">{e.title}</h3>
                  <p className="text-sm text-[var(--acit-muted)]">{fmt(e.date)} · {e.location}</p>
                </div>
                <FiArrowRight size={18} className="mt-1 shrink-0 text-[var(--acit-muted)] transition-all group-hover:translate-x-1 group-hover:text-acit-teal" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Active Prototypes */
export function ActivePrototypes({ projects }) {
  const list = (projects && projects.length ? projects : SAMPLE_PROJECTS).slice(0, 4);
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Heading
        kicker="// 02 · active prototypes"
        title="Built by members, used by the college"
        sub="Small tools that fix real campus annoyances. Some are live, some are still breaking."
        action={
          <Link to="/projects" className="group inline-flex items-center gap-2 text-sm font-medium text-acit-teal">
            All projects <FiArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        }
      />
      <div className="grid auto-rows-[200px] gap-5 md:grid-cols-3">
        {list.map((p, i) => (
          <motion.div
            key={p._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            onPointerMove={glow}
            className={`group relative overflow-hidden rounded-2xl border border-[var(--acit-border)] bg-[var(--acit-surface)] p-6 transition-colors hover:border-acit-teal/50 ${
              i === 0 ? "md:col-span-2 md:row-span-2" : i === 3 ? "md:col-span-3 md:!auto-rows-auto" : ""
            }`}
          >
            <GlowLayer />
            {i === 0 && <div aria-hidden className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-acit-teal/15 blur-3xl" />}
            <div className={`relative flex h-full ${i === 3 ? "flex-col justify-between md:flex-row md:items-center md:gap-8" : "flex-col justify-between"}`}>
              <div className="flex items-center justify-between">
                <span className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${STATUS_CLS[p.status] || STATUS_CLS.Idea}`}>
                  ● {p.status}
                </span>
                <FiArrowRight size={18} className="-rotate-45 text-[var(--acit-muted)] transition-all group-hover:rotate-0 group-hover:text-acit-teal" />
              </div>
              <div>
                <h3 className={`mb-2 font-heading font-bold ${i === 0 ? "text-3xl md:text-4xl" : "text-xl"}`}>{p.title}</h3>
                <p className="mb-3 text-sm text-[var(--acit-muted)]">{p.blurb}</p>
                <div className="flex flex-wrap gap-1.5">
                  {(p.stack || []).map((s) => (
                    <span key={s} className="rounded-md bg-[var(--acit-bg)] px-2 py-0.5 font-mono text-[11px] text-[var(--acit-muted)]">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* Neural Playground Quiz */
const QUIZ = [
  { q: "What does git commit -m do?", o: ["Deletes a branch", "Saves a snapshot with a message", "Uploads to GitHub"], a: 1 },
  { q: "Which one is NOT a JavaScript framework?", o: ["React", "Vue", "Django"], a: 2 },
  { q: "What does HTTP status 404 mean?", o: ["Not found", "Server crashed", "Unauthorised"], a: 0 },
  { q: "Big-O of binary search?", o: ["O(n)", "O(log n)", "O(n²)"], a: 1 },
];

export function NeuralPlayground() {
  const [i, setI] = useState(0);
  const [pick, setPick] = useState(null);
  const [score, setScore] = useState(0);
  const done = i >= QUIZ.length;
  const q = QUIZ[i];

  const choose = (k) => {
    if (pick !== null) return;
    setPick(k);
    if (k === q.a) setScore((s) => s + 1);
    setTimeout(() => { setPick(null); setI((n) => n + 1); }, 900);
  };
  const reset = () => { setI(0); setScore(0); setPick(null); };

  const rank = score === QUIZ.length ? "Senior engineer" : score >= 3 ? "Solid dev" : score >= 2 ? "Getting there" : "Fresh intern";

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <Heading kicker="// 03 · neural playground" title="Warm-up before you join" sub="Four questions. No sign-up. Find out which rank the club would give you." />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0b1117] font-mono text-[#E6EDF3] shadow-[0_30px_80px_-40px_rgba(15,138,133,.5)]"
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3 text-[11px] text-white/40">
          <span>quiz.sh</span>
          <span>{done ? "done" : `${i + 1}/${QUIZ.length}`}</span>
        </div>
        <div className="h-1 bg-white/5">
          <motion.div className="h-full bg-acit-teal" animate={{ width: `${(Math.min(i, QUIZ.length) / QUIZ.length) * 100}%` }} transition={{ duration: 0.5, ease: EASE }} />
        </div>
        <div className="min-h-[300px] p-6">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div key="end" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3 py-4">
                <p className="text-white/50">$ score --final</p>
                <p className="text-5xl font-bold text-acit-teal">{score}/{QUIZ.length}</p>
                <p className="text-[#4ade80]">✓ rank: {rank}</p>
                <div className="flex flex-wrap gap-3 pt-4">
                  <Link to="/join" className="rounded-xl bg-acit-teal px-5 py-2.5 text-sm font-semibold text-white">Join the club</Link>
                  <button onClick={reset} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-2.5 text-sm hover:border-white/40">
                    <FiRotateCcw size={14} /> Try again
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                <p className="mb-5 text-sm text-white/40">$ question --{i + 1}</p>
                <h3 className="mb-6 text-lg font-semibold leading-snug">{q.q}</h3>
                <div className="space-y-3">
                  {q.o.map((o, k) => {
                    const state = pick === null ? "" : k === q.a ? "border-[#4ade80] bg-[#4ade80]/10 text-[#4ade80]" : k === pick ? "border-red-400 bg-red-400/10 text-red-300" : "opacity-40";
                    return (
                      <button
                        key={k}
                        onClick={() => choose(k)}
                        disabled={pick !== null}
                        className={`flex w-full items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-left text-sm transition-colors ${
                          pick === null ? "hover:border-acit-teal hover:bg-acit-teal/10" : ""
                        } ${state}`}
                      >
                        <span className="text-white/40">{String.fromCharCode(97 + k)})</span>
                        {o}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}

/* Join CTA */
export function JoinCTA({ joinHref = "/join" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  return (
    <section ref={ref} className="px-6 pb-28 pt-12">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-acit-teal/30 bg-[var(--acit-surface)] px-8 py-16 text-center"
      >
        <motion.div
          aria-hidden
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 -z-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
          style={{ background: "conic-gradient(from 0deg, rgba(15,138,133,.5), transparent 40%, rgba(211,84,0,.35), transparent 80%)" }}
        />
        <div className="relative">
          <p className="mb-4 font-mono text-sm tracking-widest text-acit-teal">$ acit join --now</p>
          <h2 className="mx-auto mb-4 max-w-2xl font-heading text-3xl font-bold md:text-5xl">Your next project needs a team.</h2>
          <p className="mx-auto mb-8 max-w-lg text-[var(--acit-muted)]">No experience needed. Bring curiosity and a laptop, we bring the rest.</p>
          <Link
            to={joinHref}
            className="inline-flex items-center gap-2 rounded-xl bg-acit-teal px-7 py-3.5 font-semibold text-white shadow-[0_12px_34px_-12px_rgba(15,138,133,.8)] transition-transform hover:-translate-y-0.5"
          >
            Become a member <FiArrowRight size={18} />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}