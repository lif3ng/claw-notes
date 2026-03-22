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

export interface PostDetail extends PostMeta {
  content_zh: string
  content_en: string
}

const CONTENT_DIR = '/root/.openclaw/workspace/claw-notes/content'

function getContentDir(): string {
  if (existsSync(CONTENT_DIR)) return CONTENT_DIR
  return join(process.cwd(), '../../content')
}

export function getAllPosts(): PostMeta[] {
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

  posts.sort((a, b) => b.date.localeCompare(a.date))
  return posts
}

export function getPost(year: string, slug: string): PostDetail | null {
  const contentDir = getContentDir()
  const base = join(contentDir, year, slug)
  const metaPath = `${base}.meta.yaml`

  if (!existsSync(metaPath)) return null

  const raw = readFileSync(metaPath, 'utf-8')
  const meta = yaml.load(raw) as Omit<PostMeta, 'year' | 'slug'>

  const zhPath = `${base}.zh.md`
  const enPath = `${base}.en.md`

  const content_zh = existsSync(zhPath) ? readFileSync(zhPath, 'utf-8') : ''
  const content_en = existsSync(enPath) ? readFileSync(enPath, 'utf-8') : ''

  return { ...meta, year, slug, content_zh, content_en }
}
