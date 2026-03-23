import type { Metadata } from 'next'
import { lessons } from '@/lib/lessons'
import LessonCard from '@/components/LessonCard'

export const metadata: Metadata = {
  title: 'Course: Build Your eSIM Empire | Carmelo Reyes',
  description:
    '5 lessons. Zero fluff. The exact playbook I used to go from $0 to $1.2M+ selling eSIMs. Start with a free lesson.',
}

export default function CoursePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-3">
            The Course
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Everything I know about building a 7-figure eSIM business
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl">
            5 lessons. Zero fluff. I&apos;m sharing the exact playbook I used to
            go from $0 to $1.2M+.
          </p>
        </div>

        {/* Lesson list */}
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center space-y-4">
          <p className="text-neutral-500 text-sm">
            Don&apos;t want to wait? Skip the course and start building right
            now.
          </p>
          <a
            href="https://www.esimlaunch.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg border border-[#262626] hover:border-[#E85D26]/30 text-neutral-300 hover:text-white font-semibold px-6 py-3 text-sm transition-colors"
          >
            Launch your eSIM store on eSIM Launch &rarr;
          </a>
        </div>
      </div>
    </main>
  )
}
