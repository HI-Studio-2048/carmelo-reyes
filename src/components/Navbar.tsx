'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/free-lesson', label: 'Free Lesson' },
  { href: '/course', label: 'Course' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#262626]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight group">
          CR
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent ml-0.5 mb-2 live-dot group-hover:bg-accent-hover transition-colors" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${
              mobileOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-white transition-opacity duration-300 ${
              mobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${
              mobileOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-60' : 'max-h-0'
        }`}
      >
        <div className="px-6 pb-6 flex flex-col gap-4 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-[#262626]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-sm text-text-secondary hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
