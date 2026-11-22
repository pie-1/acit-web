// src/pages/Events.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiMapPin, FiArrowRight, FiLoader, FiAlertCircle } from 'react-icons/fi';
import { getEvents } from '@/api/events';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const STATUS_COLORS = {
  upcoming: 'border-acit-teal text-acit-teal bg-acit-teal/10',
  past: 'border-[var(--acit-border)] text-[var(--acit-muted)] bg-[var(--acit-bg)]',
  live: 'border-[#D35400] text-[#D35400] bg-[#D35400]/10',
};

export function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        setEvents(data.data || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
          Our <span className="text-acit-teal">Events Hub</span>
        </h1>
        <p className="text-[var(--acit-muted)] max-w-2xl">
          Workshops, hackathons, and tech talks organized by the ACME Club of IT.
        </p>
      </motion.div>

      {loading && (
        <div className="flex items-center justify-center py-20 text-acit-teal">
          <FiLoader className="animate-spin mr-3" size={24} /> Loading events...
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center py-20 text-red-400 bg-red-500/10 rounded-xl border border-red-500/20">
          <FiAlertCircle className="mr-3" size={20} /> {error}
        </div>
      )}

      {!loading && !error && events.length === 0 && (
        <div className="text-center py-20 text-[var(--acit-muted)]">
          <p className="text-lg mb-4">No events found yet.</p>
          <p className="text-sm">Check back soon or ask an admin to add one!</p>
        </div>
      )}

      <div className="space-y-6">
        <AnimatePresence>
          {events.map((event, i) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="group hover:border-acit-teal/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-[var(--acit-bg)] border border-[var(--acit-border)] flex flex-col items-center justify-center text-center">
                    <span className="text-xs uppercase tracking-widest text-[var(--acit-muted)]">
                      {new Date(event.date).toLocaleString('default', { month: 'short' })}
                    </span>
                    <span className="text-2xl font-bold text-acit-teal">
                      {new Date(event.date).getDate()}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className={`px-2 py-0.5 text-xs font-mono rounded border ${STATUS_COLORS[event.status] || STATUS_COLORS.upcoming}`}>
                        {event.status.toUpperCase()}
                      </span>
                      <span className="text-xs font-mono text-acit-orange bg-[#D35400]/10 px-2 py-0.5 rounded">
                        #{event.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-heading font-bold mb-1 group-hover:text-acit-teal transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-[var(--acit-muted)] line-clamp-2 mb-3">
                      {event.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-[var(--acit-muted)]">
                      <span className="flex items-center gap-1"><FiClock size={14} /> {event.time}</span>
                      <span className="flex items-center gap-1"><FiMapPin size={14} /> {event.location}</span>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <a href={event.registrationLink || "#"} target="_blank" rel="noreferrer">
                      <Button variant="outline" size="sm" className="gap-2">
                        View Details <FiArrowRight size={14} />
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}