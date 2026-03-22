import { readdirSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'
import yaml from 'js-yaml'

export interface PostMeta {
  date: string
  title_zh: string
  title_en: string
  tags: string[]
  year: string
  slug: string
}

function getContentDir(): string {
  // Try absolute path first
  const abs = '/root/.openclaw/workspace/claw-notes/content'
  if (existsSync(abs)) return abs
  // Fallback: relative from cwd
  return join(process.cwd(), '../../content')
}

export default defineEventHandler((): PostMeta[] => {
  const contentDir = getContentDir()
  const posts: PostMeta[] = []

  if (!existsSync(contentDir)) return posts

  const years = readdirSync(contentDir).filter((f) => /^\d{4}$/.test(f))

  for (const year of years) {
    const yearDir = join(contentDir, year)
    const files = readdirSync(yearDir)
    const metaFiles = files.filter((f) => f.endsWith('.meta.yaml'))

    for (const metaFile of metaFiles) {
      const slug = metaFile.replace('.meta.yaml', '')
      const raw = readFileSync(join(yearDir, metaFile), 'utf-8')
      const meta = yaml.load(raw) as Omit<PostMeta, 'year' | 'slug'>
      posts.push({ ...meta, year, slug })
    }
  }

  // Sort by date descending
  posts.sort((a, b) => b.date.localeCompare(a.date))

  return posts
})
