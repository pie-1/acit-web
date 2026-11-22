// src/pages/Projects.jsx
import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLoader, FiAlertCircle, FiArrowRight, FiGithub, FiExternalLink } from 'react-icons/fi';
import { getProjects } from '@/api/projects';

const EASE = [0.22, 1, 0.36, 1];

export function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data.data || data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const allTechs = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => (p.techStack || []).forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [projects]);

  const filtered = filter
    ? projects.filter((p) => (p.techStack || []).includes(filter))
    : projects;

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="mb-10">
        <p className="font-mono text-sm tracking-widest text-acit-teal mb-3">// the codex</p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
          Active <span className="text-acit-teal">Prototypes</span>
        </h1>
        <p className="text-[var(--acit-muted)] max-w-2xl">
          Tools, apps, and experiments built by ACIT members. Real problems, real solutions.
        </p>
      </motion.div>

      {/* Filters */}
      {allTechs.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setFilter(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              !filter ? 'bg-acit-teal text-white' : 'border border-[var(--acit-border)] text-[var(--acit-muted)] hover:border-acit-teal'
            }`}
          >
            All
          </button>
          {allTechs.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t === filter ? null : t)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filter === t ? 'bg-acit-teal text-white' : 'border border-[var(--acit-border)] text-[var(--acit-muted)] hover:border-acit-teal'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-20 text-acit-teal">
          <FiLoader className="animate-spin mr-3" size={24} /> Loading projects...
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center py-20 text-red-400 bg-red-500/10 rounded-xl border border-red-500/20">
          <FiAlertCircle className="mr-3" size={20} /> {error}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-20 text-[var(--acit-muted)]">
          <p className="text-lg mb-2">No projects found.</p>
          <p className="text-sm">Try a different filter or check back later.</p>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filtered.map((p, i) => (
            <motion.div
              key={p._id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: EASE, delay: i * 0.04 }}
              className="group relative rounded-2xl border border-[var(--acit-border)] bg-[var(--acit-surface)] overflow-hidden hover:border-acit-teal/50 transition-colors flex flex-col"
            >
              {p.imageUrl && (
                <div className="aspect-video overflow-hidden bg-[var(--acit-bg)]">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-heading text-xl font-bold group-hover:text-acit-teal transition-colors">{p.title}</h3>
                  <FiArrowRight size={18} className="-rotate-45 shrink-0 text-[var(--acit-muted)] transition-all group-hover:rotate-0 group-hover:text-acit-teal" />
                </div>
                <p className="text-sm text-[var(--acit-muted)] mb-4 line-clamp-3 flex-1">{p.description}</p>

                {(p.techStack || []).length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.techStack.map((t) => (
                      <span key={t} className="rounded-md bg-[var(--acit-bg)] px-2 py-0.5 font-mono text-[11px] text-[var(--acit-muted)]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-3 mt-auto pt-3 border-t border-[var(--acit-border)]">
                  {p.githubLink && (
                    <a href={p.githubLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-[var(--acit-muted)] hover:text-acit-teal transition-colors">
                      <FiGithub size={14} /> Code
                    </a>
                  )}
                  {p.liveLink && (
                    <a href={p.liveLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-[var(--acit-muted)] hover:text-acit-teal transition-colors">
                      <FiExternalLink size={14} /> Live
                    </a>
                  )}
                  {(p.contributors || []).length > 0 && (
                    <span className="ml-auto text-[11px] text-[var(--acit-muted)]">
                      by {p.contributors.join(', ')}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}