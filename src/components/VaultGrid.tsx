'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const vaultItems = [
  {
    name: 'eSIM Launch',
    icon: '🚀',
    stat: 'THE PLATFORM I USED',
    href: 'https://www.esimlaunch.com/',
    hoverColor: '#E85D26',
    span: 'col-span-2 row-span-2',
    nameSize: 'text-3xl',
  },
  {
    name: 'Free Lesson',
    icon: '📖',
    stat: 'START HERE — FREE',
    href: '/free-lesson',
    hoverColor: '#10B981',
    span: '',
    nameSize: 'text-xl',
  },
  {
    name: 'The Course',
    icon: '🎓',
    stat: '5 LESSONS · $49',
    href: '/course',
    hoverColor: '#FF6B35',
    span: '',
    nameSize: 'text-xl',
  },
  {
    name: 'Instagram',
    icon: '◉',
    stat: '@CARMELOREYES',
    href: '#',
    hoverColor: '#E1306C',
    span: 'col-span-2',
    nameSize: 'text-xl',
  },
  {
    name: 'TikTok',
    icon: '♪',
    stat: '@CARMELOREYES',
    href: '#',
    hoverColor: '#00F2EA',
    span: '',
    nameSize: 'text-xl',
  },
  {
    name: 'Blog',
    icon: '✦',
    stat: 'ESIM TIPS & INSIGHTS',
    href: '/blog',
    hoverColor: '#E85D26',
    span: '',
    nameSize: 'text-xl',
  },
  {
    name: 'Newsletter',
    icon: '📧',
    stat: 'WEEKLY DROPS',
    href: '#newsletter',
    hoverColor: '#FF8C00',
    span: '',
    nameSize: 'text-xl',
  },
  {
    name: 'Twitter/X',
    icon: '𝕏',
    stat: '@CARMELOREYES',
    href: '#',
    hoverColor: '#1DA1F2',
    span: '',
    nameSize: 'text-xl',
  },
]

export default function VaultGrid() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.vault-card',
        { opacity: 0, y: 44, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.5, stagger: 0.07, ease: 'power3.out',
          scrollTrigger: { trigger: '.vault-grid', start: 'top 80%', once: true },
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 px-6 border-t border-[#262626]">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.3em] uppercase text-[#E85D26] mb-4">
          The Vault
        </p>
        <h2 className="text-3xl md:text-5xl font-bold mb-12">
          Everything in one place.
        </h2>

        <div className="vault-grid grid grid-cols-2 md:grid-cols-4 gap-3">
          {vaultItems.map((item, i) => {
            const isExternal = item.href.startsWith('http')
            const Tag = isExternal ? 'a' : 'a'
            return (
              <Tag
                key={i}
                href={item.href}
                {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`vault-card group relative flex flex-col justify-between min-h-[150px] p-6 bg-[#141414] border border-[#262626] rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.01] ${item.span}`}
                style={{
                  // @ts-expect-error CSS custom property
                  '--hover-color': item.hoverColor,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = item.hoverColor
                  el.style.boxShadow = `0 12px 48px rgba(0,0,0,0.5), 0 0 40px ${item.hoverColor}25`
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = '#262626'
                  el.style.boxShadow = 'none'
                }}
              >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent pointer-events-none" />

                <div className="relative">
                  <div className="text-2xl mb-1.5">{item.icon}</div>
                  <div className={`font-bold ${item.nameSize} transition-colors`}
                    style={{ color: 'white' }}
                    ref={(el) => {
                      if (!el) return
                      const parent = el.closest('.vault-card')
                      parent?.addEventListener('mouseenter', () => { el.style.color = item.hoverColor })
                      parent?.addEventListener('mouseleave', () => { el.style.color = 'white' })
                    }}
                  >
                    {item.name}
                  </div>
                </div>

                <div className="relative flex items-end justify-between">
                  <span className="text-[11px] text-neutral-500 tracking-wider">
                    {item.stat}
                  </span>
                  <span className="text-base opacity-0 -translate-x-1 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0">
                    ↗
                  </span>
                </div>
              </Tag>
            )
          })}
        </div>
      </div>
    </section>
  )
}
