// src/pages/Team.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLoader, FiAlertCircle, FiUsers } from 'react-icons/fi';
import { getTeamMembers } from '@/api/team';
import { TeamCard } from '@/components/team/TeamCard';

const EASE = [0.22, 1, 0.36, 1];

export function Team() {
  const [type, setType] = useState('current');
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getTeamMembers(type)
      .then((data) => {
        if (cancelled) return;
        setMembers(data.data || data);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [type]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="text-center mb-12">
        <p className="font-mono text-sm tracking-widest text-acit-teal mb-3">// the humans behind the code</p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
          Meet the <span className="text-acit-teal">Team</span>
        </h1>
        <p className="text-[var(--acit-muted)] max-w-2xl mx-auto">
          The people building ACIT — one commit, one event, one idea at a time.
        </p>
      </motion.div>

      {/* Toggle */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex items-center gap-1 p-1 rounded-full border border-[var(--acit-border)] bg-[var(--acit-surface)]">
          {['current', 'legacy'].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                type === t ? 'text-white' : 'text-[var(--acit-muted)] hover:text-[var(--acit-text)]'
              }`}
            >
              {type === t && (
                <motion.span
                  layoutId="team-toggle"
                  className="absolute inset-0 rounded-full bg-acit-teal shadow-lg shadow-acit-teal/30"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative capitalize">{t === 'current' ? 'Current' : 'Legacy'}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {loading && (
        <div className="flex items-center justify-center py-20 text-acit-teal">
          <FiLoader className="animate-spin mr-3" size={24} /> Loading team...
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center py-20 text-red-400 bg-red-500/10 rounded-xl border border-red-500/20">
          <FiAlertCircle className="mr-3" size={20} /> {error}
        </div>
      )}

      {!loading && !error && members.length === 0 && (
        <div className="text-center py-20 text-[var(--acit-muted)]">
          <FiUsers size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg mb-2">No {type} members yet.</p>
          <p className="text-sm">Check back soon.</p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!loading && !error && members.length > 0 && (
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {members.map((m, i) => (
              <TeamCard key={m._id} member={m} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}