// src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff, FiArrowRight, FiLoader } from 'react-icons/fi';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';

const INPUT = "w-full bg-[var(--acit-surface)] border border-[var(--acit-border)] rounded-xl px-4 py-3 text-[var(--acit-text)] placeholder-[var(--acit-muted)] focus:outline-none focus:border-acit-teal focus:ring-4 focus:ring-acit-teal/10 transition-all";
const LABEL = "block text-xs font-bold text-[var(--acit-muted)] uppercase tracking-widest mb-1.5";

export function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ email: '', password: '' });

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout mode="login">
      <div className="mb-8">
        <h1 className="text-4xl font-heading font-bold mb-2">Welcome back</h1>
        <p className="text-[var(--acit-muted)]">Sign in to continue to your club dashboard.</p>
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
          <label htmlFor="email" className={LABEL}>Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
            className={INPUT}
            placeholder="you@acme.edu.np"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className={LABEL + " !mb-0"}>Password</label>
            <button type="button" className="text-xs text-acit-teal hover:underline font-medium">
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className={`${INPUT} pr-12`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--acit-muted)] hover:text-[var(--acit-text)] transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          </div>
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={loading ? undefined : { y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 bg-acit-teal hover:bg-acit-teal/90 text-white font-bold py-3.5 rounded-xl transition-colors shadow-lg shadow-acit-teal/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><FiLoader className="animate-spin" size={16} /> Signing in...</>
          ) : (
            <>Sign in <FiArrowRight size={16} /></>
          )}
        </motion.button>
      </form>

      <p className="mt-8 text-center text-sm text-[var(--acit-muted)]">
        Don't have an account?{' '}
        <Link to="/register" className="text-acit-teal font-bold hover:underline">
          Create one
        </Link>
      </p>
    </AuthLayout>
  );
}