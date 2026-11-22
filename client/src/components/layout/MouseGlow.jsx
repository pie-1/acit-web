// src/components/layout/MouseGlow.jsx
import { useEffect, useRef } from 'react';

export function MouseGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf;
    let tx = 0, ty = 0, x = 0, y = 0;
    let active = false;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!active) {
        x = tx; y = ty;
        active = true;
        el.style.opacity = '1';
      }
    };

    const onLeave = () => {
      active = false;
      el.style.opacity = '0';
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-300"
      style={{
        background:
          'radial-gradient(circle, rgba(15,138,133,0.15) 0%, rgba(15,138,133,0.05) 40%, transparent 70%)',
        filter: 'blur(60px)',
      }}
    />
  );
}