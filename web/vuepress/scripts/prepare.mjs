import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import yaml from 'js-yaml'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const contentDir = path.resolve(__dirname, '../../../content')
const postsDir = path.resolve(__dirname, '../src/posts')
const publicDir = path.resolve(__dirname, '../src/.vuepress/public')

fs.mkdirSync(postsDir, { recursive: true })
fs.mkdirSync(publicDir, { recursive: true })

// Clear old generated posts (keep .gitkeep)
for (const f of fs.readdirSync(postsDir)) {
  if (f !== '.gitkeep') fs.unlinkSync(path.join(postsDir, f))
}

const posts = []

for (const year of fs.readdirSync(contentDir).sort()) {
  const yearDir = path.join(contentDir, year)
  if (!fs.statSync(yearDir).isDirectory()) continue

  for (const file of fs.readdirSync(yearDir).sort()) {
    if (!file.endsWith('.meta.yaml')) continue
    const slug = file.replace('.meta.yaml', '') // e.g. 03-22
    const dateSlug = `${year}-${slug}` // e.g. 2026-03-22

    const metaPath = path.join(yearDir, file)
    const zhPath = path.join(yearDir, `${slug}.zh.md`)
    const enPath = path.join(yearDir, `${slug}.en.md`)

    const meta = yaml.load(fs.readFileSync(metaPath, 'utf-8'))
    // Normalize date to YYYY-MM-DD string
    if (meta.date instanceof Date) {
      const d = meta.date
      meta.date = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`
    }
    const zhContent = fs.existsSync(zhPath) ? fs.readFileSync(zhPath, 'utf-8') : ''
    const enContent = fs.existsSync(enPath) ? fs.readFileSync(enPath, 'utf-8') : ''

    const tags = Array.isArray(meta.tags) ? meta.tags : []

    const mdContent = `---
title: ${meta.title_zh}
title_zh: "${meta.title_zh}"
title_en: "${meta.title_en}"
date: ${meta.date}
tags: [${tags.map(t => `"${t}"`).join(', ')}]
---

<div class="lang-zh">

${zhContent.trim()}

</div>

<div class="lang-en">

${enContent.trim()}

</div>
`

    fs.writeFileSync(path.join(postsDir, `${dateSlug}.md`), mdContent, 'utf-8')
    posts.push({ slug: dateSlug, ...meta })
    console.log(`Generated: ${dateSlug}.md`)
  }
}

const sorted = posts.sort((a, b) => b.date.localeCompare(a.date))

// Write to .vuepress/public so it's served as a static asset
fs.writeFileSync(
  path.join(publicDir, 'posts.json'),
  JSON.stringify(sorted, null, 2),
  'utf-8'
)
console.log(`Done. ${posts.length} post(s) generated.`)
