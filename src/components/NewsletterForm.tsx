'use client';

import { useState, FormEvent } from 'react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;

    setState('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong. Try again.');
      }

      setState('success');
      setEmail('');
    } catch (err) {
      setState('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Try again.'
      );
    }
  }

  if (state === 'success') {
    return (
      <div className="rounded-2xl border border-[#262626] bg-surface p-8 text-center">
        <p className="text-xl font-semibold mb-2">You&apos;re in! Check your inbox 🚀</p>
        <p className="text-sm text-text-secondary">
          Keep an eye out for next Tuesday&apos;s drop.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[#262626] bg-surface p-8">
      <h3 className="text-xl font-semibold mb-2">
        Join 10,000+ people getting my weekly eSIM tips
      </h3>
      <p className="text-sm text-text-secondary mb-6">
        Every Tuesday, I share one tip that helped me build a 7-figure business.
        No spam, no BS &mdash; just real game.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-lg bg-surface-light border border-[#262626] px-4 py-3 text-sm text-white placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
        />
        <button
          type="submit"
          disabled={state === 'loading'}
          className="rounded-lg bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-3 text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {state === 'loading' ? 'Joining...' : "I'm In"}
        </button>
      </form>

      {state === 'error' && (
        <p className="mt-3 text-sm text-red-400">{errorMessage}</p>
      )}
    </div>
  );
}
