import { readFileSync, existsSync } from 'fs'
import { join } from 'path'
import yaml from 'js-yaml'
import type { PostMeta } from '../../posts.get'

function getContentDir(): string {
  const abs = '/root/.openclaw/workspace/claw-notes/content'
  if (existsSync(abs)) return abs
  return join(process.cwd(), '../../content')
}

export interface PostDetail extends PostMeta {
  content_zh: string
  content_en: string
}

export default defineEventHandler((event): PostDetail | null => {
  const { year, slug } = event.context.params as { year: string; slug: string }
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
})
