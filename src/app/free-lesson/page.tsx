import type { Metadata } from 'next'
import { getLesson } from '@/lib/lessons'
import FreeLessonContent from '@/components/FreeLessonContent'

export const metadata: Metadata = {
  title: 'Free Lesson: The Secrets I Used to Build My eSIM Empire | Carmelo Reyes',
  description:
    'Get the full story of how I went from $47 in my bank account to $1.2M+ selling eSIMs. Free lesson — just enter your email.',
  openGraph: {
    title: 'Free Lesson: The Secrets I Used to Build My eSIM Empire',
    description:
      'Get the full story of how I went from $47 in my bank account to $1.2M+ selling eSIMs.',
  },
}

export default function FreeLessonPage() {
  const lesson = getLesson(1)!

  return <FreeLessonContent lessonHtml={lesson.content!} />
}
