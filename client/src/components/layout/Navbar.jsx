// src/components/layout/Navbar.jsx
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { SITE_CONFIG, NAV_LINKS } from "@/config/constants";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid || open
          ? "border-b border-[var(--acit-border)] bg-[var(--acit-bg)]/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 ${
          solid ? "h-14" : "h-16"
        }`}
        aria-label="Main"
      >
        <Link to="/" className="flex items-center gap-2.5 font-heading text-lg font-bold">
          <img src={SITE_CONFIG.logo} alt="ACIT Logo" className="h-8 w-8 rounded-md object-contain" />
          <span>
            {SITE_CONFIG.name}
            <span className="text-acit-teal">.</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.path}>
              <NavLink
                to={l.path}
                end={l.path === "/"}
                className={({ isActive }) =>
                  `relative block rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive ? "text-acit-teal" : "text-[var(--acit-muted)] hover:text-[var(--acit-text)]"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.name}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-acit-teal"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="grid h-10 w-10 place-items-center rounded-lg md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </nav>

      <motion.div
        aria-hidden
        style={{ scaleX: bar }}
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-acit-teal to-[#D35400]"
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100svh - 56px)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden md:hidden"
          >
            <ul className="space-y-1 px-6 pt-6">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.path}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <NavLink
                    to={l.path}
                    end={l.path === "/"}
                    className={({ isActive }) =>
                      `block rounded-xl px-3 py-3.5 font-heading text-2xl font-semibold ${
                        isActive ? "text-acit-teal" : ""
                      }`
                    }
                  >
                    {l.name}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}