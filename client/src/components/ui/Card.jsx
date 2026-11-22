// src/components/ui/Card.jsx
import { cn } from '../../utils/cn';

export function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-[var(--acit-border)] bg-[var(--acit-surface)]/50 backdrop-blur-sm p-6 shadow-sm overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}