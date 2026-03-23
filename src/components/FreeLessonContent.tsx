'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'

interface FreeLessonContentProps {
  lessonHtml: string
}

export default function FreeLessonContent({
  lessonHtml,
}: FreeLessonContentProps) {
  const [unlocked, setUnlocked] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Something went wrong. Try again.')
      }

      setUnlocked(true)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong. Try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  // GATED STATE
  if (!unlocked) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-3">
              Free Lesson
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              The Secrets I Used to Build My eSIM Empire
            </h1>
            <p className="text-lg text-neutral-400 max-w-xl mx-auto">
              I&apos;m sharing everything &mdash; the failures, the $500 bet, the
              exact platform that changed my life. Enter your email and I&apos;ll
              give you the full story, for free.
            </p>
          </div>

          {/* Email Gate Form */}
          <div className="bg-[#141414] border border-[#262626] rounded-xl p-8">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 mb-4"
            >
              <input
                type="email"
                required
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-lg bg-[#1A1A1A] border border-[#262626] px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#E85D26] transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-[#E85D26] hover:bg-[#FF6B35] text-white font-semibold px-6 py-3 text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {loading ? 'Unlocking...' : 'Get Free Access'}
              </button>
            </form>

            {error && <p className="text-sm text-red-400 mb-3">{error}</p>}

            <p className="text-xs text-neutral-500 text-center">
              Join 10,000+ people who&apos;ve already read this. No spam, ever.
            </p>
          </div>

          {/* What you'll learn */}
          <div className="mt-12 space-y-4">
            <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">
              What you&apos;ll learn
            </h3>
            <ul className="space-y-3">
              {[
                'How I went from $47 in my bank account to $1.2M+ in revenue',
                'Why the eSIM industry is a $125B opportunity most people are sleeping on',
                'The exact platform I used to launch my store in a day',
                'How I scaled from $800/month to $40K/month in under a year',
                'Why this is different from dropshipping, crypto, and Amazon FBA',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-[#E85D26] mt-0.5">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <span className="text-neutral-300 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    )
  }

  // UNLOCKED STATE
  return (
    <main className="min-h-screen bg-background">
      <article className="max-w-3xl mx-auto px-4 py-20">
        {/* Lesson header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              FREE
            </span>
            <span className="text-xs text-neutral-500">25 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            The Secrets I Used to Build My eSIM Empire
          </h1>
        </div>

        {/* Lesson content */}
        <div
          className="prose prose-invert prose-orange prose-lg max-w-none prose-headings:font-semibold prose-a:text-[#E85D26] prose-a:no-underline hover:prose-a:text-[#FF6B35] prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white"
          dangerouslySetInnerHTML={{ __html: lessonHtml }}
        />

        {/* Course CTA */}
        <div className="mt-16 rounded-xl border border-[#262626] bg-[#141414] p-8">
          <h3 className="text-xl font-semibold mb-2">Ready for more?</h3>
          <p className="text-neutral-400 mb-6">
            Lessons 2&ndash;5 go deep on exactly how to launch and scale your
            eSIM business. The full playbook, step by step.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/course"
              className="inline-block rounded-lg bg-[#E85D26] hover:bg-[#FF6B35] text-white font-semibold px-6 py-3 text-sm text-center transition-colors"
            >
              View the Full Course &rarr;
            </Link>
            <a
              href="https://www.esimlaunch.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg border border-[#262626] hover:border-[#E85D26]/30 text-neutral-300 hover:text-white font-semibold px-6 py-3 text-sm text-center transition-colors"
            >
              Or skip ahead and start building &rarr;
            </a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 rounded-2xl border border-[#262626] bg-[#141414] p-8">
          <h3 className="text-xl font-semibold mb-2">
            You&apos;re already on the list
          </h3>
          <p className="text-sm text-neutral-400">
            Keep an eye on your inbox &mdash; I send weekly tips every Tuesday
            on growing your eSIM business.
          </p>
        </div>
      </article>
    </main>
  )
}
