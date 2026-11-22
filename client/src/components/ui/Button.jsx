// src/components/ui/Button.jsx
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const variants = {
  primary: 'bg-acit-teal text-white hover:bg-acit-teal/90 shadow-[0_0_15px_rgba(15,138,133,0.3)]',
  secondary: 'bg-acit-orange text-white hover:bg-acit-orange/90 shadow-[0_0_15px_rgba(211,84,0,0.3)]',
  outline: 'border border-[var(--acit-border)] text-[var(--acit-text)] hover:border-acit-teal hover:text-acit-teal bg-transparent',
  ghost: 'text-[var(--acit-text)] hover:bg-black/5 dark:hover:bg-white/5',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-8 py-3 text-lg font-semibold',
};

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className, 
  ...props 
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-acit-teal/50 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

