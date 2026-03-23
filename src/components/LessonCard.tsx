import Link from 'next/link'
import type { Lesson } from '@/lib/lessons'

interface LessonCardProps {
  lesson: Lesson
}

export default function LessonCard({ lesson }: LessonCardProps) {
  return (
    <div className="bg-[#141414] border border-[#262626] rounded-xl p-6 hover:border-[#E85D26]/30 transition-colors">
      <div className="flex items-start gap-4">
        {/* Lesson number badge */}
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
            lesson.free
              ? 'bg-[#E85D26] text-white'
              : 'bg-neutral-800 text-neutral-400'
          }`}
        >
          {lesson.id}
        </div>

        <div className="flex-1 min-w-0">
          {/* Title row with badges */}
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <h3 className="text-xl font-semibold">{lesson.title}</h3>
            {lesson.free && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                FREE
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-neutral-400 text-sm mb-3">{lesson.description}</p>

          {/* Duration */}
          <p className="text-xs text-neutral-500 mb-4">{lesson.duration}</p>

          {/* Action */}
          {lesson.free ? (
            <Link
              href="/free-lesson"
              className="inline-block text-sm font-semibold text-[#E85D26] hover:text-[#FF6B35] transition-colors"
            >
              Start Learning &rarr;
            </Link>
          ) : (
            <div className="flex items-center gap-2 text-neutral-500">
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <a
                href="#"
                className="text-sm font-semibold text-[#E85D26] hover:text-[#FF6B35] transition-colors"
              >
                $49 &mdash; Unlock All Lessons
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
