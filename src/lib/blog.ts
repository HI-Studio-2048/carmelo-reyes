import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  keywords: string[]
  content: string
}

const contentDir = path.join(process.cwd(), 'src', 'content', 'blog')

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(contentDir)) {
    return []
  }

  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.mdx'))

  const posts: BlogPost[] = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, '')
    const filePath = path.join(contentDir, filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)

    return {
      slug,
      title: data.title || '',
      date: data.date || '',
      description: data.description || '',
      keywords: data.keywords || [],
      content,
    }
  })

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(contentDir, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    description: data.description || '',
    keywords: data.keywords || [],
    content,
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(contentDir)) {
    return []
  }

  return fs
    .readdirSync(contentDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}
