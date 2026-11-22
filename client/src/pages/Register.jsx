// src/pages/Register.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff, FiArrowRight, FiLoader } from 'react-icons/fi';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';

const EASE = [0.22, 1, 0.36, 1];
const INPUT = "w-full bg-[var(--acit-surface)] border border-[var(--acit-border)] rounded-xl px-4 py-3 text-[var(--acit-text)] placeholder-[var(--acit-muted)] focus:outline-none focus:border-acit-teal focus:ring-4 focus:ring-acit-teal/10 transition-all";
const LABEL = "block text-xs font-bold text-[var(--acit-muted)] uppercase tracking-widest mb-1.5";

const STRENGTH_LABELS = ['Too short', 'Weak', 'Okay', 'Good', 'Strong'];
const STRENGTH_COLORS = ['bg-red-500', 'bg-red-500', 'bg-orange-400', 'bg-lime-400', 'bg-emerald-400'];

function strength(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '', inviteCode: '' });

  const { register } = useAuth();
  const navigate = useNavigate();

  const pwScore = strength(form.password);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(form);
      toast.success('Account created! Welcome to ACIT.');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Check your invite code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout mode="register">
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold mb-2">Join ACIT</h1>
        <p className="text-[var(--acit-muted)]">Create your club account with the invite code.</p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
        >
          {error}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className={LABEL}>Full Name</label>
          <input
            id="name" type="text" name="name"
            value={form.name} onChange={handleChange}
            required autoComplete="name"
            className={INPUT} placeholder="Pawan Singh"
          />
        </div>

        <div>
          <label htmlFor="email" className={LABEL}>Email</label>
          <input
            id="email" type="email" name="email"
            value={form.email} onChange={handleChange}
            required autoComplete="email"
            className={INPUT} placeholder="you@acme.edu.np"
          />
        </div>

        <div>
          <label htmlFor="password" className={LABEL}>Password</label>
          <div className="relative">
            <input
              id="password" type={showPassword ? 'text' : 'password'} name="password"
              value={form.password} onChange={handleChange}
              required autoComplete="new-password"
              className={`${INPUT} pr-12`} placeholder="••••••••"
            />
            <button
              type="button" onClick={() => setShowPassword((s) => !s)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--acit-muted)] hover:text-[var(--acit-text)]"
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
          {form.password && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2">
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((n) => (
                  <span
                    key={n}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      pwScore >= n ? STRENGTH_COLORS[pwScore] : 'bg-[var(--acit-border)]'
                    }`}
                  />
                ))}
              </div>
              <p className="mt-1.5 text-[11px] text-[var(--acit-muted)]">
                {STRENGTH_LABELS[pwScore]}. Use 8+ chars, mixed case, a number and a symbol.
              </p>
            </motion.div>
          )}
        </div>

        <div>
          <label htmlFor="inviteCode" className={LABEL}>Invite Code</label>
          <input
            id="inviteCode" type="password" name="inviteCode"
            value={form.inviteCode} onChange={handleChange}
            required
            className={INPUT} placeholder="Enter club invite code"
          />
          <p className="mt-1.5 text-[11px] text-acit-orange">
            Ask the Research Chair for the code if you don't have one.
          </p>
        </div>

        <motion.button
          type="submit" disabled={loading}
          whileHover={loading ? undefined : { y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 bg-acit-teal hover:bg-acit-teal/90 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-acit-teal/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><FiLoader className="animate-spin" size={16} /> Creating account...</>
          ) : (
            <>Create account <FiArrowRight size={16} /></>
          )}
        </motion.button>
      </form>

      <p className="mt-8 text-center text-sm text-[var(--acit-muted)]">
        Already a member?{' '}
        <Link to="/login" className="text-acit-teal font-bold hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}