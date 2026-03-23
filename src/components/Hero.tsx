'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import HeroCanvas from './HeroCanvas'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.fromTo('#hero-eyebrow', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
        .fromTo('#hero-headline', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.35')
        .fromTo('#hero-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.35')
        .fromTo('#hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .fromTo('#hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.2')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Three.js Background */}
      <HeroCanvas />

      {/* Vignette overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none hero-vignette" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-[2] max-w-5xl mx-auto w-full px-6 pt-24">
        {/* Eyebrow */}
        <p id="hero-eyebrow" className="text-[#E85D26] text-xs tracking-[0.3em] uppercase font-mono mb-6 opacity-0">
          // MIAMI, FL — EST. 2024
        </p>

        {/* Marquee - decorative */}
        <div className="overflow-hidden mb-6">
          <div className="marquee-track">
            {[...Array(6)].map((_, i) => (
              <span
                key={i}
                className={`text-[clamp(48px,10vw,120px)] font-bold leading-none tracking-tight pr-8 ${
                  i % 3 === 0
                    ? 'text-white/[0.04]'
                    : i % 3 === 1
                    ? 'text-transparent'
                    : 'text-transparent'
                }`}
                style={
                  i % 3 !== 0
                    ? { WebkitTextStroke: i % 3 === 1 ? '1px rgba(232,93,38,0.15)' : '1px rgba(255,107,53,0.08)' }
                    : undefined
                }
              >
                CARMELO REYES&nbsp;&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* Main headline */}
        <div id="hero-headline" className="opacity-0">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight">
            I built a 7-figure telecom
            <br />
            company at 22.
          </h1>
          <p className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-[#E85D26] mt-2">
            Let me show you how.
          </p>
        </div>

        {/* Subtitle */}
        <p id="hero-subtitle" className="text-lg text-neutral-400 max-w-2xl mt-8 leading-relaxed opacity-0">
          No trust fund. No connections. Just a $500 investment and the right opportunity.
          I went from $47 in my bank account to $1.2M+ in under two years selling eSIMs.
        </p>

        {/* CTA */}
        <div id="hero-cta" className="mt-10 flex flex-col items-start gap-4 opacity-0">
          <Link
            href="/free-lesson"
            className="group relative inline-flex items-center gap-3 bg-[#E85D26] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#FF6B35] transition-colors overflow-hidden"
          >
            <span className="relative z-10">Watch the Free Lesson</span>
            <span className="relative z-10 transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>

          <a
            href="https://www.esimlaunch.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-500 hover:text-[#E85D26] underline transition-colors"
          >
            or check out my eSIM platform &rarr;
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div id="hero-scroll" className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[2] opacity-0">
        <span className="block w-px h-8 bg-gradient-to-b from-transparent to-neutral-600 animate-pulse" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-600">Scroll</span>
      </div>
    </section>
  )
}
