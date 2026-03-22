import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const CONTENT_DIR = path.resolve(process.cwd(), '../../content');

export interface PostMeta {
  date: string;
  title_zh: string;
  title_en: string;
  tags: string[];
  year: string;
  slug: string; // e.g. "03-22"
}

export interface Post extends PostMeta {
  contentZh: string;
  contentEn: string;
}

function getContentDir(): string {
  // Support both dev (cwd = web/nextjs) and direct invocation
  const candidates = [
    path.resolve(process.cwd(), '../../content'),
    path.resolve('/root/.openclaw/workspace/claw-notes/content'),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return candidates[0];
}

export function getAllPosts(): PostMeta[] {
  const contentDir = getContentDir();
  if (!fs.existsSync(contentDir)) return [];

  const posts: PostMeta[] = [];

  const years = fs
    .readdirSync(contentDir)
    .filter((name) => /^\d{4}$/.test(name))
    .sort();

  for (const year of years) {
    const yearDir = path.join(contentDir, year);
    const files = fs.readdirSync(yearDir);
    const metaFiles = files.filter((f) => f.endsWith('.meta.yaml'));

    for (const metaFile of metaFiles) {
      const slug = metaFile.replace('.meta.yaml', '');
      const metaPath = path.join(yearDir, metaFile);
      const raw = fs.readFileSync(metaPath, 'utf-8');
      const meta = yaml.load(raw) as Omit<PostMeta, 'year' | 'slug'>;

      posts.push({
        ...meta,
        date: String(meta.date),
        tags: meta.tags || [],
        year,
        slug,
      });
    }
  }

  // Sort newest first
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(year: string, slug: string): Post | null {
  const contentDir = getContentDir();
  const yearDir = path.join(contentDir, year);
  const metaPath = path.join(yearDir, `${slug}.meta.yaml`);
  const zhPath = path.join(yearDir, `${slug}.zh.md`);
  const enPath = path.join(yearDir, `${slug}.en.md`);

  if (!fs.existsSync(metaPath)) return null;

  const raw = fs.readFileSync(metaPath, 'utf-8');
  const meta = yaml.load(raw) as Omit<PostMeta, 'year' | 'slug'>;

  const contentZh = fs.existsSync(zhPath)
    ? fs.readFileSync(zhPath, 'utf-8')
    : '';
  const contentEn = fs.existsSync(enPath)
    ? fs.readFileSync(enPath, 'utf-8')
    : '';

  return {
    ...meta,
    date: String(meta.date),
    tags: meta.tags || [],
    year,
    slug,
    contentZh,
    contentEn,
  };
}

export function getAllStaticParams(): { year: string; slug: string }[] {
  return getAllPosts().map(({ year, slug }) => ({ year, slug }));
}
