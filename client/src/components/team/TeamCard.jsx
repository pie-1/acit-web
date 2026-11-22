// src/components/team/TeamCard.jsx
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaInstagram, FaFacebook, FaLinkedin, FaTiktok } from 'react-icons/fa';

const EASE = [0.22, 1, 0.36, 1];

export function TeamCard({ member, index = 0 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-10, 10]);

  const onMouseMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const socials = [
    { icon: FaInstagram, href: member.socials?.instagram, label: 'Instagram' },
    { icon: FaFacebook, href: member.socials?.facebook, label: 'Facebook' },
    { icon: FaLinkedin, href: member.socials?.linkedin, label: 'LinkedIn' },
    { icon: FaTiktok, href: member.socials?.tiktok, label: 'TikTok' },
  ].filter((s) => s.href);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.06 }}
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className="group relative rounded-2xl border border-[var(--acit-border)] bg-[var(--acit-surface)] overflow-hidden [perspective:1000px] hover:border-acit-teal/50 transition-colors"
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-[var(--acit-bg)]">
        <img
          src={member.imageUrl}
          alt={member.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Socials overlay */}
        {socials.length > 0 && (
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 backdrop-blur-md text-white hover:bg-acit-teal transition-colors"
                aria-label={label}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        )}

        {/* Name + role overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-heading text-lg font-bold leading-tight">{member.name}</h3>
          <p className="text-xs text-white/70 mt-1">{member.position}</p>
        </div>
      </div>
    </motion.div>
  );
}