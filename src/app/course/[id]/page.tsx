import { redirect, notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getLesson } from '@/lib/lessons'

interface PageProps {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const lesson = getLesson(Number(id))

  if (!lesson) {
    return { title: 'Lesson Not Found' }
  }

  return {
    title: `${lesson.title} | Carmelo Reyes`,
    description: lesson.description,
  }
}

export default async function LessonPage({ params }: PageProps) {
  const { id } = await params
  const lessonId = Number(id)
  const lesson = getLesson(lessonId)

  if (!lesson) {
    notFound()
  }

  // Free lesson redirects to /free-lesson
  if (lesson.free) {
    redirect('/free-lesson')
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-20">
        {/* Back link */}
        <Link
          href="/course"
          className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors mb-8 inline-block"
        >
          &larr; Back to course
        </Link>

        {/* Lesson header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-sm font-bold text-neutral-400">
              {lesson.id}
            </span>
            <span className="text-xs text-neutral-500">{lesson.duration}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {lesson.title}
          </h1>
          <p className="text-neutral-400">{lesson.description}</p>
        </div>

        {/* Locked state */}
        <div className="rounded-xl border border-[#262626] bg-[#141414] p-8 text-center">
          <div className="mb-4">
            <svg
              className="w-12 h-12 mx-auto text-neutral-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <p className="text-lg font-semibold mb-2">This lesson is locked</p>
          <p className="text-neutral-400 text-sm mb-6">
            This lesson is part of the full course. Unlock all 4 premium lessons
            for $49.
          </p>
          <a
            href="#"
            className="inline-block rounded-lg bg-[#E85D26] hover:bg-[#FF6B35] text-white font-semibold px-8 py-3 transition-colors"
          >
            Unlock All Lessons &mdash; $49
          </a>
        </div>

        {/* Alternative CTAs */}
        <div className="mt-8 space-y-3 text-center">
          <p>
            <Link
              href="/free-lesson"
              className="text-sm text-neutral-400 hover:text-white transition-colors"
            >
              Not sure yet? Start with the free lesson &rarr;
            </Link>
          </p>
          <p>
            <a
              href="https://www.esimlaunch.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#E85D26] hover:text-[#FF6B35] transition-colors"
            >
              Or just start building your eSIM store &rarr;
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
