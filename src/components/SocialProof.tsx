'use client';

import ScrollReveal from '@/components/ScrollReveal';

const stats = [
  { value: '$1.2M+', label: 'Revenue Generated' },
  { value: '190+', label: 'Countries Covered' },
  { value: '$500', label: 'Starting Investment' },
  { value: '22', label: 'Years Old When I Hit 7 Figures' },
];

export default function SocialProof() {
  return (
    <section className="py-24 px-6 border-t border-[#262626]">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <p className="text-xs tracking-[0.3em] uppercase text-[#E85D26] mb-12">
          THE NUMBERS
        </p>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 100}>
              <div className="bg-[#141414] border border-[#262626] rounded-xl p-8 text-center hover:border-[#E85D26]/30 transition-colors">
                <p className="text-4xl md:text-5xl font-bold text-white">
                  {stat.value}
                </p>
                <p className="text-sm text-neutral-500 mt-2">{stat.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Quote */}
        <ScrollReveal delay={400}>
          <p className="text-lg text-neutral-400 italic max-w-xl mx-auto mt-16 text-center">
            &ldquo;The craziest part? I built this whole thing from my phone and a $500
            investment.&rdquo;
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
