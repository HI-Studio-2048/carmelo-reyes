import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog | Carmelo Reyes',
  description:
    'Real talk about building an eSIM business — tips, strategies, and lessons from a 22-year-old who turned $500 into 7 figures.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold tracking-widest text-accent uppercase mb-3">
            The Blog
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Real talk about building an eSIM business
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl">
            No fluff, no corporate jargon. Just the stuff I actually learned
            scaling from $0 to $1.2M+.
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-[#141414] border border-[#262626] rounded-xl p-6 hover:border-[#E85D26]/30 transition-colors"
              >
                <p className="text-xs text-neutral-500 mb-3">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">
                  {post.title}
                </h2>
                <p className="text-neutral-400 text-sm mb-4 line-clamp-3">
                  {post.description}
                </p>
                <span className="text-[#E85D26] text-sm font-medium">
                  Read more &rarr;
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-neutral-400 text-lg">
              Blog posts coming soon. Stay tuned.
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-neutral-500 text-sm">
            Want to start your own eSIM business?{' '}
            <a
              href="https://www.esimlaunch.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E85D26] hover:text-[#FF6B35] transition-colors"
            >
              Check out eSIM Launch &rarr;
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
