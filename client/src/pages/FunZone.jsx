// src/pages/FunZone.jsx
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiLoader, FiAlertCircle, FiHeart, FiExternalLink, FiImage } from 'react-icons/fi';
import { FaGamepad } from 'react-icons/fa';
import { getMemes, toggleMemeUpvote, getGames } from '@/api/funzone';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';

const EASE = [0.22, 1, 0.36, 1];

export function FunZone() {
  const [tab, setTab] = useState('memes');
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }} className="mb-10">
        <p className="font-mono text-sm tracking-widest text-acit-teal mb-3">// neural playground</p>
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
          Fun <span className="text-acit-teal">Zone</span>
        </h1>
        <p className="text-[var(--acit-muted)] max-w-2xl">
          Memes, games, and chaos — the lighter side of ACIT.
        </p>
      </motion.div>

      {/* Tab toggle */}
      <div className="inline-flex items-center gap-1 p-1 rounded-full border border-[var(--acit-border)] bg-[var(--acit-surface)] mb-8">
        {['memes', 'games'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              tab === t ? 'text-white' : 'text-[var(--acit-muted)] hover:text-[var(--acit-text)]'
            }`}
          >
            {tab === t && (
              <motion.span
                layoutId="funzone-tab"
                className="absolute inset-0 rounded-full bg-acit-teal"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative capitalize">{t}</span>
          </button>
        ))}
      </div>

      {tab === 'memes' ? <MemeWall user={user} /> : <GamesList />}
    </div>
  );
}

/* ─────────── Meme Wall ─────────── */
function MemeWall({ user }) {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getMemes()
      .then((data) => setMemes(data.data || data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleUpvote = async (memeId) => {
    if (!user) {
      toast.error('Login to upvote memes');
      return;
    }
    try {
      const res = await toggleMemeUpvote(memeId);
      setMemes((ms) =>
        ms.map((m) =>
          m._id === memeId
            ? { ...m, upvotes: Array(res.upvotes).fill(null), hasUpvoted: res.hasUpvoted }
            : m
        )
      );
    } catch {
      toast.error('Could not upvote');
    }
  };

  if (loading) return <div className="flex items-center justify-center py-20 text-acit-teal"><FiLoader className="animate-spin mr-3" size={24} /> Loading memes...</div>;
  if (error) return <div className="flex items-center justify-center py-20 text-red-400"><FiAlertCircle className="mr-3" size={20} /> {error}</div>;
  if (memes.length === 0) return (
    <div className="text-center py-20 text-[var(--acit-muted)]">
      <FiImage size={48} className="mx-auto mb-4 opacity-30" />
      <p className="text-lg mb-2">No memes yet.</p>
      <p className="text-sm">Members can post from the dashboard.</p>
    </div>
  );

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [&>*]:mb-4">
      {memes.map((m, i) => {
        const upvoteCount = Array.isArray(m.upvotes) ? m.upvotes.length : m.upvotes || 0;
        return (
          <motion.div
            key={m._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.04 }}
            className="break-inside-avoid group relative rounded-xl overflow-hidden border border-[var(--acit-border)] bg-[var(--acit-surface)] hover:border-acit-teal/50 transition-colors"
          >
            <img src={m.imageUrl} alt={m.title} className="w-full h-auto object-cover" loading="lazy" />
            <div className="p-4">
              <h3 className="font-heading font-semibold text-sm mb-2">{m.title}</h3>
              <div className="flex items-center justify-between text-xs text-[var(--acit-muted)]">
                <span>{m.author?.name || 'Anonymous'}</span>
                <button
                  onClick={() => handleUpvote(m._id)}
                  className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-lg transition-colors ${
                    m.hasUpvoted ? 'text-acit-orange' : 'hover:text-acit-teal'
                  }`}
                >
                  <FiHeart size={14} fill={m.hasUpvoted ? 'currentColor' : 'none'} />
                  {upvoteCount}
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─────────── Games List ─────────── */
function GamesList() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getGames()
      .then((data) => setGames(data.data || data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center py-20 text-acit-teal"><FiLoader className="animate-spin mr-3" size={24} /> Loading games...</div>;
  if (error) return <div className="flex items-center justify-center py-20 text-red-400"><FiAlertCircle className="mr-3" size={20} /> {error}</div>;
  if (games.length === 0) return (
    <div className="text-center py-20 text-[var(--acit-muted)]">
      <FaGamepad size={48} className="mx-auto mb-4 opacity-30" />
      <p className="text-lg mb-2">No games yet.</p>
    </div>
  );

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {games.map((g, i) => (
        <motion.a
          key={g._id}
          href={g.url}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
          className="group relative rounded-2xl border border-[var(--acit-border)] bg-[var(--acit-surface)] overflow-hidden hover:border-acit-teal/50 transition-colors"
        >
          {g.imageUrl && (
            <div className="aspect-video overflow-hidden bg-[var(--acit-bg)]">
              <img src={g.imageUrl} alt={g.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            </div>
          )}
          <div className="p-5">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="font-heading font-bold group-hover:text-acit-teal transition-colors">{g.name}</h3>
              <FiExternalLink size={16} className="shrink-0 text-[var(--acit-muted)] group-hover:text-acit-teal" />
            </div>
            <p className="text-sm text-[var(--acit-muted)] mb-3 line-clamp-2">{g.description}</p>
            <span className="inline-block rounded-md bg-[var(--acit-bg)] px-2 py-0.5 font-mono text-[11px] text-[var(--acit-muted)]">
              {g.category}
            </span>
          </div>
        </motion.a>
      ))}
    </div>
  );
}