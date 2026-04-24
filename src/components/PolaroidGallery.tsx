'use client'

import Image from 'next/image'
import { useRef, useState, useCallback } from 'react'

const polaroids = [
  { caption: 'Miami Sunsets', date: '2026-03', imageSrc: '/images/carmelo/gallery/miami_sunsets.png' },
  { caption: 'Brickell Views', date: '2026-01', imageSrc: '/images/carmelo/gallery/brickell_views.png' },
  { caption: 'Office Setup', date: '2025-12', imageSrc: '/images/carmelo/gallery/office_setup.png' },
  { caption: 'The M4', date: '2025-11', imageSrc: '/images/carmelo/gallery/the_m4.png' },
  { caption: 'First $1M', date: '2025-09', gradient: 'linear-gradient(90deg, #FF6B35, #E85D26 50%, #FFD700)' },
  { caption: 'Launch Day', date: '2025-07', gradient: 'linear-gradient(225deg, #E85D26, #0A0A0A 50%, #FF6B35)' },
  { caption: 'Gym Session', date: '2025-05', gradient: 'linear-gradient(315deg, #FFD700, #E85D26 60%, #141414)' },
  { caption: 'Day One', date: '2024-12', gradient: 'linear-gradient(45deg, #E85D26, #FF6B35 30%, #FFD700 70%, #E85D26)' },
] as const

const rotations = [-3, 2, -1.5, 3, -2.5, 1, -4, 2.5]

export default function PolaroidGallery() {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const gallery = galleryRef.current
    if (!gallery) return
    setIsDragging(true)
    startX.current = e.pageX - gallery.offsetLeft
    scrollLeft.current = gallery.scrollLeft
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !galleryRef.current) return
    e.preventDefault()
    const x = e.pageX - galleryRef.current.offsetLeft
    galleryRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.4
  }, [isDragging])

  const onMouseUp = useCallback(() => setIsDragging(false), [])

  return (
    <div className="mt-16">
      <div
        ref={galleryRef}
        className="flex gap-7 px-6 pb-12 pt-6 overflow-x-auto scrollbar-hide select-none"
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {polaroids.map((p, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[210px] bg-white p-[10px] pb-11 relative shadow-2xl transition-all duration-300 hover:rotate-0 hover:-translate-y-5 hover:scale-105 hover:shadow-[0_40px_80px_rgba(0,0,0,0.8),0_0_32px_rgba(232,93,38,0.2)] z-0 hover:z-10"
            style={{ transform: `rotate(${rotations[i]}deg) translateY(${i % 2 === 0 ? 8 : -6}px)` }}
          >
            {/* Tape effect */}
            <div className="absolute -top-[10px] left-1/2 -translate-x-1/2 w-9 h-4 bg-amber-100/40 z-10" />

            {/* Photo or gradient placeholder */}
            <div className="relative w-full aspect-square overflow-hidden bg-neutral-100">
              {'imageSrc' in p && p.imageSrc ? (
                <Image
                  src={p.imageSrc}
                  alt={p.caption}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  sizes="210px"
                  unoptimized
                />
              ) : (
                <div
                  className="w-full h-full transition-transform duration-500 hover:scale-110"
                  style={{ background: 'gradient' in p ? p.gradient : undefined }}
                />
              )}
            </div>

            {/* Date */}
            <span className="absolute top-2 right-2 font-mono text-[10px] text-neutral-400">
              {p.date}
            </span>

            {/* Caption */}
            <p className="absolute bottom-2.5 left-2.5 right-2.5 text-center text-sm text-neutral-600" style={{ fontFamily: 'cursive' }}>
              {p.caption}
            </p>
          </div>
        ))}
      </div>
      <p className="text-center text-[10px] tracking-[0.25em] uppercase text-neutral-600 -mt-4">
        ← Drag to explore →
      </p>
    </div>
  )
}
