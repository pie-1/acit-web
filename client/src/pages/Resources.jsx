// src/pages/Resources.jsx
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FiLoader, FiAlertCircle, FiExternalLink, FiFileText, FiCalendar, FiBookOpen } from 'react-icons/fi';
import { getResources } from '@/api/resources';

const EASE = [0.22, 1, 0.36, 1];

export function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getResources()
      .then((data) => setResources(data.data || data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const classroom = useMemo(() => resources.find((r) => r.type === 'classroom_link'), [resources]);
  const notes = useMemo(
    () => resources.filter((r) => r.type === 'meeting_note').sort((a, b) => new Date(b.date) - new Date(a.date)),
    [resources]
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="mb-10">
        <p className="font-mono text-sm tracking-widest text-acit-teal mb-3">// the vault</p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
          Club <span className="text-acit-teal">Resources</span>
        </h1>
        <p className="text-[var(--acit-muted)] max-w-2xl">
          Meeting notes, schedules, and the Google Classroom — all in one place.
        </p>
      </motion.div>

      {loading && (
        <div className="flex items-center justify-center py-20 text-acit-teal">
          <FiLoader className="animate-spin mr-3" size={24} /> Loading resources...
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center py-20 text-red-400 bg-red-500/10 rounded-xl border border-red-500/20">
          <FiAlertCircle className="mr-3" size={20} /> {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Classroom Card */}
          {classroom && (
            <motion.a
              href={classroom.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              className="group relative block overflow-hidden rounded-2xl border border-acit-teal/30 bg-gradient-to-br from-acit-teal/10 via-[var(--acit-surface)] to-[var(--acit-surface)] p-8 mb-8 hover:border-acit-teal transition-colors"
            >
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-acit-teal/20 blur-3xl group-hover:bg-acit-teal/30 transition-colors" />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FiBookOpen size={20} className="text-acit-teal" />
                    <span className="font-mono text-[11px] uppercase tracking-widest text-acit-teal">Google Classroom</span>
                  </div>
                  <h2 className="font-heading text-2xl font-bold mb-2">{classroom.title}</h2>
                  <p className="text-sm text-[var(--acit-muted)]">Access the live classroom for materials, assignments, and updates.</p>
                </div>
                <FiExternalLink size={20} className="shrink-0 text-acit-teal group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </motion.a>
          )}

          {/* Notes List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
          >
            <h2 className="font-heading text-2xl font-bold mb-6 flex items-center gap-2">
              <FiFileText className="text-acit-teal" size={20} />
              Meeting Notes
            </h2>

            {notes.length === 0 ? (
              <div className="text-center py-12 text-[var(--acit-muted)] border border-dashed border-[var(--acit-border)] rounded-xl">
                No meeting notes published yet.
              </div>
            ) : (
              <div className="space-y-3">
                {notes.map((note, i) => (
                  <motion.div
                    key={note._id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05, ease: EASE }}
                    className="group rounded-xl border border-[var(--acit-border)] bg-[var(--acit-surface)] p-5 hover:border-acit-teal/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-heading font-semibold mb-1 group-hover:text-acit-teal transition-colors">
                          {note.title}
                        </h3>
                        <p className="text-sm text-[var(--acit-muted)] whitespace-pre-line line-clamp-4">
                          {note.content}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[var(--acit-muted)] shrink-0">
                        <FiCalendar size={12} />
                        {new Date(note.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </>
      )}
    </div>
  );
}