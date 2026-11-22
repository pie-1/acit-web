// src/components/ui/ThemeToggle.jsx
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext'; 
import { motion } from 'framer-motion';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme} // <-- Now passes the event automatically
      className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-[var(--acit-text)] transition-colors z-50 relative"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
  );
}