// src/components/layout/Footer.jsx
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaDiscord,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { SITE_CONFIG, NAV_LINKS } from "@/config/constants";

export function Footer() {
  const { contact } = SITE_CONFIG;

  return (
    <footer className="border-t border-[var(--acit-border)] bg-[var(--acit-surface)]/30 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <img src={SITE_CONFIG.logo} alt="ACIT Logo" className="h-8 w-8 rounded-md object-contain" />
              <span className="font-heading font-bold text-lg">
                {SITE_CONFIG.name}
                <span className="text-acit-teal">.</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--acit-muted)] mb-4">{SITE_CONFIG.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_LINKS.slice(0, 5).map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-[var(--acit-muted)] hover:text-acit-teal transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-[var(--acit-muted)]">
              <li className="flex items-center gap-3">
                <FaPhone className="text-acit-teal shrink-0" />
                <span>{contact.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-acit-teal shrink-0" />
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-acit-teal transition-colors break-all"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href={contact.facebook}
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--acit-border)] text-[var(--acit-muted)] hover:text-acit-teal hover:border-acit-teal transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--acit-border)] text-[var(--acit-muted)] hover:text-acit-teal hover:border-acit-teal transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={14} />
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--acit-border)] text-[var(--acit-muted)] hover:text-acit-teal hover:border-acit-teal transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={14} />
              </a>
              <a
                href={contact.discord}
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--acit-border)] text-[var(--acit-muted)] hover:text-acit-teal hover:border-acit-teal transition-colors"
                aria-label="Discord"
              >
                <FaDiscord size={14} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--acit-border)] mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-[var(--acit-muted)]">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.fullName}. All rights reserved.
          </p>
          <p className="mt-2 md:mt-0">Built by the ACIT Research Chair</p>
        </div>
      </div>
    </footer>
  );
}