import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllSlugs, getPostBySlug } from '@/lib/blog'
import NewsletterForm from '@/components/NewsletterForm'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: `${post.title} | Carmelo Reyes`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Carmelo Reyes'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: 'Carmelo Reyes',
      url: 'https://carmeloreyes.com',
    },
    publisher: {
      '@type': 'Person',
      name: 'Carmelo Reyes',
    },
    keywords: post.keywords.join(', '),
  }

  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-3xl mx-auto px-4 py-20">
        {/* Back link */}
        <Link
          href="/blog"
          className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors mb-8 inline-block"
        >
          &larr; Back to blog
        </Link>

        {/* Post header */}
        <header className="mb-12">
          <p className="text-sm text-neutral-500 mb-3">
            {new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <p className="text-lg text-neutral-400">{post.description}</p>
        </header>

        {/* Post content */}
        <div className="prose prose-invert prose-orange prose-lg max-w-none prose-headings:font-semibold prose-a:text-[#E85D26] prose-a:no-underline hover:prose-a:text-[#FF6B35] prose-p:text-neutral-300 prose-li:text-neutral-300 prose-strong:text-white">
          <MDXRemote source={post.content} />
        </div>

        {/* CTA Banner */}
        <div className="mt-16 rounded-xl border border-[#262626] bg-[#141414] p-8 text-center">
          <p className="text-xl font-semibold mb-2">
            Ready to start your own eSIM business?
          </p>
          <p className="text-neutral-400 mb-6">
            This is the exact platform I used to go from $0 to $1.2M+.
          </p>
          <a
            href="https://www.esimlaunch.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-3 transition-colors"
          >
            Check out the platform I used &rarr;
          </a>
        </div>

        {/* Newsletter */}
        <div className="mt-12">
          <NewsletterForm />
        </div>

        {/* Back link */}
        <div className="mt-12">
          <Link
            href="/blog"
            className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            &larr; Back to blog
          </Link>
        </div>
      </article>
    </main>
  )
}
