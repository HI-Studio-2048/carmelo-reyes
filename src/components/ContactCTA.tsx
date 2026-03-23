'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function ContactCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '#contact-text',
        { opacity: 0, y: 60, skewX: -4 },
        {
          opacity: 1, y: 0, skewX: 0,
          duration: 1.1, ease: 'power4.out',
          scrollTrigger: { trigger: '#contact-section', start: 'top 72%', once: true },
        }
      )
      gsap.fromTo(
        '#contact-row',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: '#contact-row', start: 'top 88%', once: true },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Mouse follow effect on the big text
  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    if (!section || !text) return

    const onMouseMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect()
      const x = e.clientX - r.left - r.width / 2
      const y = e.clientY - r.top - r.height / 2
      gsap.to(text, { x: x * 0.05, y: y * 0.05, duration: 0.6, ease: 'power2.out' })
    }
    const onMouseLeave = () => {
      gsap.to(text, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1,0.4)' })
    }

    section.addEventListener('mousemove', onMouseMove)
    section.addEventListener('mouseleave', onMouseLeave)
    return () => {
      section.removeEventListener('mousemove', onMouseMove)
      section.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="contact-section"
      className="py-24 px-6 border-t border-[#262626] bg-[#0d0d0d] relative overflow-hidden min-h-[50vh] flex flex-col justify-center"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse at 25% 60%, rgba(232,93,38,0.05) 0%, transparent 55%), radial-gradient(ellipse at 75% 40%, rgba(255,107,53,0.03) 0%, transparent 55%)',
        }}
      />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <p className="text-xs tracking-[0.3em] uppercase text-[#E85D26] mb-6">
          Get in Touch
        </p>

        {/* Large text */}
        <div id="contact-text" ref={textRef} className="mb-16 opacity-0">
          <span className="text-6xl sm:text-8xl md:text-[clamp(72px,13vw,170px)] font-bold leading-[0.85] tracking-tight block">
            <span className="text-white">HIT </span>
            <span className="text-[#E85D26]">ME </span>
            <span className="text-transparent" style={{ WebkitTextStroke: '2px #E85D26' }}>UP</span>
          </span>
        </div>

        {/* Contact row */}
        <div id="contact-row" className="flex flex-col md:flex-row gap-12 md:gap-16 items-start md:items-end opacity-0">
          <div>
            <h3 className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-2">
              Collabs & Brand Deals
            </h3>
            <a
              href="mailto:collabs@carmeloreyes.com"
              className="text-xl font-bold hover:text-[#E85D26] transition-colors"
            >
              collabs@carmeloreyes.com
            </a>
          </div>
          <div>
            <h3 className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-2">
              Management
            </h3>
            <a
              href="mailto:mgmt@carmeloreyes.com"
              className="text-xl font-bold hover:text-[#E85D26] transition-colors"
            >
              mgmt@carmeloreyes.com
            </a>
          </div>
          <div>
            <h3 className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 mb-2">
              Based In
            </h3>
            <p className="text-xl font-bold">Miami, FL</p>
          </div>
          <div className="md:ml-auto">
            <a
              href="mailto:collabs@carmeloreyes.com"
              className="group relative inline-flex items-center gap-3 bg-[#E85D26] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#FF6B35] transition-colors overflow-hidden"
            >
              <span className="relative z-10">Send It</span>
              <span className="relative z-10 transition-transform group-hover:translate-x-1">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
