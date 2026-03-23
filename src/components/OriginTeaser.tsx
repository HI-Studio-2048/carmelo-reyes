'use client';

import Link from 'next/link';
import ScrollReveal from '@/components/ScrollReveal';
import PolaroidGallery from './PolaroidGallery';

export default function OriginTeaser() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Left — Image placeholder */}
        <ScrollReveal>
          <div className="aspect-video bg-[#141414] rounded-2xl border border-[#262626] flex items-center justify-center">
            <span className="text-neutral-600 text-sm">Photo Coming Soon</span>
          </div>
        </ScrollReveal>

        {/* Right — Story */}
        <ScrollReveal delay={150}>
          <div>
            {/* Section label */}
            <p className="text-xs tracking-[0.3em] uppercase text-[#E85D26] mb-6">
              MY STORY
            </p>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              From $47 in my account to $1.2M+ in revenue
            </h2>

            <p className="text-neutral-400 mt-6 leading-relaxed">
              Real talk — two years ago I was a community college dropout with $47 to my name.
              I tried dropshipping, crypto, Amazon FBA. All of it flopped. I was running out of
              ideas and honestly starting to feel like maybe I just wasn&apos;t cut out for this.
            </p>

            <p className="text-neutral-400 mt-4 leading-relaxed">
              Then I found the eSIM industry. Put my last $500 into a white-label platform, learned
              the game, and started selling. Within a year I was doing $40K/month. No fancy degree,
              no investor money, no connections. Just a laptop, a phone, and the willingness to bet
              on something most people hadn&apos;t even heard of yet.
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/free-lesson"
                className="text-[#E85D26] hover:text-[#FF6B35] transition-colors font-medium"
              >
                Read the full story (it&apos;s free) &rarr;
              </Link>

              <a
                href="https://www.esimlaunch.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 text-sm hover:text-[#E85D26] transition-colors"
              >
                or start your own eSIM business &rarr;
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-12">
          {['eSIM', 'Telecom', 'Entrepreneur', 'Miami', 'Self-Taught', '22 Years Old', 'Brickell', '$1.2M+ Revenue'].map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 border border-[#262626] rounded-full text-xs tracking-wider uppercase text-neutral-500 hover:border-[#E85D26]/50 hover:text-[#E85D26] transition-colors cursor-default"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Polaroid Gallery */}
        <PolaroidGallery />
    </section>
  );
}
